Thank you for contributing to LibreNS++!

Compiling
=========
The `LibreNSpp.user.js` file in the base directory is updated by running `build.sh` from the `src` folder.
This requires copies of `m4`, `base64`, `tr` and `expand`.
These programs are provided by GNU on Linux systems.
On Windows, [Cygwin](https://cygwin.com/) will provide them.

Asset System
============
If you need to include an asset, such as a sound or image file,
the recommended way to do so is
to place the asset file, in its normal format, in `src/assets`
and access it using the syntax `asset(yourfilename.bin)`.
The build script will take care of the rest.
Please be aware that using this method, your 'call' to `asset()`
will be replaced inline by the base64-encoded version of your asset;
access it using a `data:` URI, like this:
```
data:audio/ogg;base64,asset(notify.ogg)
```

If you only need to play a sound to notify the user of something,
instead of adding a new file simply call `notifySound();` in your JS code.

On file formats
---------------
All file formats used in LibreNS++ must, at a minimum, be usable in both Chrome and Firefox, on Windows, Mac and Linux.
The recommended format for audio files is OGG Theora (MIME `audio/ogg`, usual extension `.ogg`).
The recommended format for images is PNG (MIME `image/png`, usual extension `.png`).

Code Style
==========
I'm not too fussed about code style, but I would appreciate it if you tried to be consistent with the existing code style. On my esoteric application of quotation marks, double quotation marks have been used for ordinary JavaScript strings, while single quotation marks have been used for HTML code as strings (so double quotes can be used in HTML).
