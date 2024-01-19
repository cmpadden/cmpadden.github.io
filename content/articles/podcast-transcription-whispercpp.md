---
title: 'Easily Transcribe Podcasts with Whisper.cpp'
draft: false
date: "2024-01-08"
tags: ["whisper.cpp", "ml"]
categories: ["programming"]
---

If you've ever had the need to transcribe a podcast, lecture, or some other audio recording, it turns out it's surprisingly easy with the extremely impressive [whisper.cpp](https://github.com/ggerganov/whisper.cpp) project. This high-performance fork of [OpenAI's Whisper](https://github.com/openai/whisper) can run on all sorts of hardware -- including my M1 Mac Mini. Let's walk through an example from start-to-finish of transcribing an episode of the [Alter Everything](https://podcasts.apple.com/us/podcast/alter-everything/id1356137854) podcast.

<!--more-->

## Obtain Audio File(s)

First, let's get the `wav` file from YouTube using the `youtube-dl` utility. It should be noted that `whisper.cpp` expects `wav` filetypes, and this utility defaults to `mp3`.

```sh
 $ youtube-dl \
    --extract-audio \
    --audio-format wav \
    --output podcast.wav \
    "https://www.youtube.com/watch?v=CoUN690wSYQ"
```

This file has a 44.1 kHz sample rate, and `whisper.cpp` expects 16 kHz, so let's go ahead and convert that.

```sh
 $ file podcast.wav
podcast.wav: RIFF (little-endian) data, WAVE audio, Microsoft PCM, 16 bit, stereo 44100 Hz

 $ ffmpeg -i podcast.wav -ar 16000 podcast-16khz.wav

 $ file podcast-16khz.wav
podcast-16khz.wav: RIFF (little-endian) data, WAVE audio, Microsoft PCM, 16 bit, stereo 16000 Hz

# NOTE: it looks like it's possible to specify this conversion as a post-process as a
# flag to the `youtube-dl` command -- I will explore this further next time...
# youtube-dl --extract-audio --audio-quality 0 --audio-format mp3 --postprocessor-args "-ar 44100" %dl%
```

## Build `whisper.cpp` & Transcribe Audio

Then, let's get the latest version of `whisper.cpp`, download the English Whisper model, and build the example.

```sh
# Clone the `whisper.cpp` repository
 $ git clone --depth 1 git@github.com:ggerganov/whisper.cpp && cd whisper.cpp

# Download the English Whisper model in `ggml` format
 $ bash ./models/download-ggml-model.sh base.en

# Build the main example
 $ make
```

And finally, let's transcribe that podcast!

```sh
 $ ./main \
    -m ~/workspace/whisper.cpp/models/ggml-base.en.bin \
    -f ~/Downloads/podcast-16khz.wav \
    --output-vtt \
    --output-file out

# whisper_print_timings:     load time =   114.71 ms
# whisper_print_timings:     fallbacks =   0 p /   0 h
# whisper_print_timings:      mel time =   692.20 ms
# whisper_print_timings:   sample time = 22278.10 ms / 27893 runs (    0.80 ms per run)
# whisper_print_timings:   encode time = 10000.75 ms /    55 runs (  181.83 ms per run)
# whisper_print_timings:   decode time =   331.77 ms /    54 runs (    6.14 ms per run)
# whisper_print_timings:   batchd time = 45236.73 ms / 27566 runs (    1.64 ms per run)
# whisper_print_timings:   prompt time =  1921.90 ms / 11832 runs (    0.16 ms per run)
# whisper_print_timings:    total time = 80709.54 ms
```

A full podcast transcribed in ~80 seconds on an M1 Mac Mini -- not too bad!

```txt
# out.vtt

00:00:00.000 --> 00:00:06.480
 >> Hi everyone. We recently launched a short engagement feedback survey for the Alter Everything

00:00:06.480 --> 00:00:11.360
 podcast. Click the link in the episode description wherever you're listening to let us know what

00:00:11.360 --> 00:00:16.320
 you think and help us improve our show.

00:00:16.320 --> 00:00:21.200
 Welcome to Alter Everything, a podcast about data science and analytics culture. I'm Megan

00:00:21.200 --> 00:00:26.440
 Dibble and today I'm talking with Nick Schrock, CTO and founder of Dagster Labs. We discussed

00:00:26.440 --> 00:00:31.560
 data engineering trends, challenges in the field, why he started his company, and what

00:00:31.560 --> 00:00:38.960
 makes him excited about the future of data engineering. Let's get started.

00:00:38.960 --> 00:00:42.720
 >> Hi, Nick. It's great to have you on our show today. Thanks for being here.

00:00:42.720 --> 00:00:43.920
 >> Thanks for having me.

00:00:43.920 --> 00:00:48.280
 >> Yeah. Could you start off by giving an introduction to yourself for our listeners?

00:00:48.280 --> 00:00:52.920
 >> Sure. My name is Nick Schrock. I'm the CTO and founder of Dagster Labs. There's the

00:00:52.920 --> 00:00:59.520
 company behind Dagster, which is a data orchestration framework. Prior to doing this, I was an engineer

00:00:59.520 --> 00:01:05.960
 at Facebook from 2009, 2017. While I was there, I found a team called product infrastructure

00:01:05.960 --> 00:01:09.800
 whose goal was to make our application developers more efficient and productive, and a bunch

00:01:09.800 --> 00:01:13.840
 of open source work came out of that actually, one of which was React, which I had nothing

00:01:13.840 --> 00:01:18.040
 to do with, but actually the CEO of Dagster Labs co-created and I personally co-created

00:01:18.040 --> 00:01:22.640
 GraphQL. So as I like to say, Pete and I were present at the creation of the full hipster

00:01:22.640 --> 00:01:28.680
 stack. I moved on to Facebook in 2017, figuring out what to do next, and this data engineering

00:01:28.680 --> 00:01:32.960
 and data orchestration problem really got me hooked actually quite soon after I left,

00:01:32.960 --> 00:01:36.280
 and the rest is history. I'm sure we'll get into that more.
```
