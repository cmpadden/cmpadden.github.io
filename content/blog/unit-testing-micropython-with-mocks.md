---
title: "Unit Testing in MicroPython with Mocks"
date: "2020-02-07"
draft: false
tags: ["micropython", "testing", "mocks", "tutorial"]
categories: ["python", "embedded"]
---

Unit testing code for embedded systems can be challenging. While it's possible
to leverage emulators, write side-effect free code, or run tests on the
hardware itself, it's often easiest to unit test the code on your personal
computer with mocked hardware functionality.

<!--more-->

# Mocking

Mocks allow us to replace the hardware interfacing functionality under-the-hood
with predefined results and side-effects. For example, if there is a piece of
logic that retrieves values from an accelerometer to get a device's
orientation, it would be possible to mock the returned values of the
accelerometer -- allowing us to run the unit tests on a device that does not
have an accelerometer sensor installed.

# A MicroPython Mocking Example

In this example, we will be unit testing a module named `time_logger`, that
depends on the MicroPython library `utime` to log the most recent Epoch time to
a file.

```python
# time_logger.py

class TimeLogger(object):

    def save_time(self):
        """ Overwrite a file with the most recent Epoch timestamp from `utime`
        """
        with open("LAST_KNOWN_TIME", "w+") as f:
            f.write(str(utime.time()))
```

First, because the `utime` module is not installed on the machine that the unit
tests on, we must mock `utime` module before importing `time_logger` in our
unit test file.

```python
# test_time_logger.py

import unittest

from unittest.mock import MagicMock

sys.modules['utime'] = MagicMock()
from time_logger import TimeLogger
```

Then, we can write a test that patches the `utime.time` functionality so that
it returns a value of our choosing -- in this case, `1234`.

```python
class TestTimeLogger(unittest.TestCase):

    def test_save_time(self):
        """ Verify that the Epoch time is written to file
        """
        with unittest.mock.patch("utime.time", return_value=1234):
            t = TimeLogger()
            t.save_time()
            with open("LAST_KNOWN_TIME") as f:
                self.assertEqual("1234", f.read())
```

Now, when the `save_time` method gets the latest time from `utime.time()`, the
value will be patched to return `1234`. That value will be written to a file,
and our unit test will pass!

## References

1. [`unittest` — Unit testing framework](https://docs.python.org/3/library/unittest.html)
