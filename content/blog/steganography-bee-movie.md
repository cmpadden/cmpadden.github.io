---
title: "The entire Bee Movie script is hidden somewhere on this website"
date: "2026-05-26"
draft: false
tags: ["python", "steganography", "web"]
categories: ["programming"]
---

You probably didn't realize it, but the static noise visible on the home page of this website is not just noise. It's actually the entire script of the bee movie encoded with a technique called steganography.

<!--more-->


The image is a lossless PNG with the RGB pixels encoding the bytes of a small payload:

![Noise image containing the encoded Bee Movie script](/images/noise.png)

- a magic header
- the original text size
- the compressed text size
- the zlib-compressed script
- padding to fill a square image

Additionally, before writing the bytes to pixels, the payload is XORed against a deterministic SHA-256 byte stream to ensure we have an evenly distributed pattern of noise.

## Steganography

The term for this kind of idea is **steganography**, and is defined as the practice of hiding information inside another medium so that the carrier looks ordinary. In other words, cryptography tries to make a message unreadable, while steganography tries to make the message easy to miss.

Classic examples include hiding text in the least significant bits of an image, placing data in audio noise, or using metadata fields.

This version is especially uninteresting as the entire image is generated from the payload, but you could imagine the Bee Movie being hidden in other images with very little detection. Now _that's_ interesting.

## Encoder

Here's the encoder:

```shell
python3 encode.py script.txt noise.png
```

```python
# encode.py

import argparse
import binascii
import hashlib
import math
import struct
import zlib
from pathlib import Path


MAGIC = b"TXTIMG1\0"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
XOR_SEED = b"txtimg1-static-noise-v1"


def xor_stream(data: bytes) -> bytes:
    masked = bytearray(len(data))
    cursor = 0
    counter = 0

    while cursor < len(data):
        block = hashlib.sha256(XOR_SEED + struct.pack(">Q", counter)).digest()
        take = min(len(block), len(data) - cursor)
        for index in range(take):
            masked[cursor + index] = data[cursor + index] ^ block[index]
        cursor += take
        counter += 1

    return bytes(masked)


def png_chunk(chunk_type: bytes, data: bytes) -> bytes:
    crc = binascii.crc32(chunk_type)
    crc = binascii.crc32(data, crc) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", crc)


def write_rgb_png(path: Path, width: int, height: int, rgb: bytes) -> None:
    row_size = width * 3
    rows = [
        b"\x00" + rgb[row_start : row_start + row_size]
        for row_start in range(0, len(rgb), row_size)
    ]
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    png = (
        PNG_SIGNATURE
        + png_chunk(b"IHDR", ihdr)
        + png_chunk(b"IDAT", zlib.compress(b"".join(rows), level=9))
        + png_chunk(b"IEND", b"")
    )
    path.write_bytes(png)


def next_power_of_two(value: int) -> int:
    return 1 << (value - 1).bit_length()


def encode_text_to_png(input_txt: Path, output_png: Path) -> None:
    raw = input_txt.read_bytes()
    compressed = zlib.compress(raw, level=9)

    payload = MAGIC + struct.pack(">QQ", len(raw), len(compressed)) + compressed
    pixel_count = math.ceil(len(payload) / 3)
    side = next_power_of_two(math.ceil(math.sqrt(pixel_count)))
    capacity = side * side * 3
    padded = payload + bytes(capacity - len(payload))
    static = xor_stream(padded)

    output_png.parent.mkdir(parents=True, exist_ok=True)
    write_rgb_png(output_png, side, side, static)

    print(f"Original:   {len(raw):,} bytes")
    print(f"Compressed: {len(compressed):,} bytes")
    print(f"PNG size:   {output_png.stat().st_size:,} bytes")
    print(f"Image:      {side}x{side}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Encode a text file into a lossless static PNG image."
    )
    parser.add_argument("input_txt", type=Path, help="Path to the source text file.")
    parser.add_argument("output_png", type=Path, help="Path for the generated PNG.")
    args = parser.parse_args()

    encode_text_to_png(args.input_txt, args.output_png)


if __name__ == "__main__":
    main()
```

The script writes a minimal RGB PNG directly with the PNG signature, `IHDR`, `IDAT`, and `IEND` chunks.

## Decoder

And here's the decoder:

```shell
python3 decode.py noise.png decoded.txt
```

```python
# decode.py

import argparse
import hashlib
import struct
import zlib
from pathlib import Path


MAGIC = b"TXTIMG1\0"
PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
XOR_SEED = b"txtimg1-static-noise-v1"


def xor_stream(data: bytes) -> bytes:
    masked = bytearray(len(data))
    cursor = 0
    counter = 0

    while cursor < len(data):
        block = hashlib.sha256(XOR_SEED + struct.pack(">Q", counter)).digest()
        take = min(len(block), len(data) - cursor)
        for index in range(take):
            masked[cursor + index] = data[cursor + index] ^ block[index]
        cursor += take
        counter += 1

    return bytes(masked)


def paeth_predictor(left: int, above: int, upper_left: int) -> int:
    predictor = left + above - upper_left
    pa = abs(predictor - left)
    pb = abs(predictor - above)
    pc = abs(predictor - upper_left)
    if pa <= pb and pa <= pc:
        return left
    if pb <= pc:
        return above
    return upper_left


def read_rgb_png(path: Path) -> bytes:
    blob = path.read_bytes()
    if not blob.startswith(PNG_SIGNATURE):
        raise ValueError("Not a PNG file.")

    offset = len(PNG_SIGNATURE)
    width = height = bit_depth = color_type = interlace = None
    idat_parts = []

    while offset < len(blob):
        length = struct.unpack(">I", blob[offset : offset + 4])[0]
        chunk_type = blob[offset + 4 : offset + 8]
        data_start = offset + 8
        data_end = data_start + length
        chunk_data = blob[data_start:data_end]
        offset = data_end + 4

        if chunk_type == b"IHDR":
            width, height, bit_depth, color_type, _, _, interlace = struct.unpack(
                ">IIBBBBB", chunk_data
            )
        elif chunk_type == b"IDAT":
            idat_parts.append(chunk_data)
        elif chunk_type == b"IEND":
            break

    if (bit_depth, color_type, interlace) != (8, 2, 0):
        raise ValueError("Only non-interlaced 8-bit RGB PNG files are supported.")

    raw = zlib.decompress(b"".join(idat_parts))
    bytes_per_pixel = 3
    row_size = width * bytes_per_pixel
    result = bytearray()
    previous = bytearray(row_size)
    cursor = 0

    for _ in range(height):
        filter_type = raw[cursor]
        cursor += 1
        row = bytearray(raw[cursor : cursor + row_size])
        cursor += row_size

        for index, value in enumerate(row):
            left = row[index - bytes_per_pixel] if index >= bytes_per_pixel else 0
            above = previous[index]
            upper_left = previous[index - bytes_per_pixel] if index >= bytes_per_pixel else 0

            if filter_type == 1:
                row[index] = (value + left) & 0xFF
            elif filter_type == 2:
                row[index] = (value + above) & 0xFF
            elif filter_type == 3:
                row[index] = (value + ((left + above) // 2)) & 0xFF
            elif filter_type == 4:
                row[index] = (value + paeth_predictor(left, above, upper_left)) & 0xFF
            elif filter_type != 0:
                raise ValueError(f"Unsupported PNG filter type: {filter_type}.")

        result.extend(row)
        previous = row

    return bytes(result)


def decode_png_to_text(input_png: Path, output_txt: Path) -> None:
    data = xor_stream(read_rgb_png(input_png))

    if data[:8] != MAGIC:
        raise ValueError("Not a TXTIMG1 payload image.")

    original_size, compressed_size = struct.unpack(">QQ", data[8:24])
    compressed = data[24 : 24 + compressed_size]
    raw = zlib.decompress(compressed)

    if len(raw) != original_size:
        raise ValueError(
            f"Decoded size mismatch: expected {original_size}, got {len(raw)}."
        )

    output_txt.parent.mkdir(parents=True, exist_ok=True)
    output_txt.write_bytes(raw)
    print(f"Decoded {len(raw):,} bytes to {output_txt}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Decode a TXTIMG1 PNG image back into a text file."
    )
    parser.add_argument("input_png", type=Path, help="Path to the encoded PNG.")
    parser.add_argument("output_txt", type=Path, help="Path for the decoded text file.")
    args = parser.parse_args()

    decode_png_to_text(args.input_png, args.output_txt)


if __name__ == "__main__":
    main()
```

## Don't believe me?

First, download the image:

```shell
curl -fsSL https://cmpadden.github.io/images/noise.png -o noise.png
```

Save the `decode.py` snippet, and then run the following:

```shell
$ python decode.py noise.png out.txt && head -n10 out.txt
Decoded 49,474 bytes to out.txt
According to all known laws of aviation, there is no way a bee should be able to fly.
Its wings are too small to get its fat little body off the ground.
The bee, of course, flies anyway because bees don't care what humans think is impossible.
Yellow, black. Yellow, black. Yellow, black. Yellow, black.
Ooh, black and yellow!
Let's shake it up a little.
Barry! Breakfast is ready!
Coming!
Hang on a second.
Hello?
```

To hide your own text file inside of a noisy image, save `encode.py` and then run:

```shell
python encode.py my-super-secret-text.txt noise.png
```
