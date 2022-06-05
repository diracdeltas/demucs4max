# demucs for max (native version)

ableton max device for separating a clip into stems (vocals, bass, drums,
other) using https://github.com/facebookresearch/demucs.

## quickstart

all instructions were tested with Max 8.1 / Ableton 10.1 and will not work for earlier versions. this is beta software and may not work with all operating systems. 

### on windows:

if you previously set up https://github.com/diracdeltas/spleeter4max/tree/feature/native-spleeter, **skip to step 4.**

1. install ffmpeg following the instructions in https://github.com/diracdeltas/spleeter4max/wiki/Installing-ffmpeg-on-Windows.

> :white_check_mark: to test, run `where ffmpeg` in CMD.exe; it should show a location

2. install the latest **python 3.9** windows installer from https://www.python.org/downloads/. in the installer, make sure to enable the setting that adds Python to your path and disable the "path length variable limit" option when you get to the end of the install process.

> :white_check_mark: to test, run `python -V` or `py -V` in CMD.exe, if there is no output or something other than `Python 3.9.X` then something is wrong

3. open windows environment variable editor and remove `.JS;` from PATHEXT follwing [these instructions](https://web.archive.org/web/20201111203134/https://support.shotgunsoftware.com/hc/en-us/articles/114094235653-Setting-global-environment-variables-on-Windows). on some systems you may need to restart for these changes to take effect.

> :white_check_mark: to test, run `echo %pathext%` in CMD.exe and make sure `.JS` is not there

4. open CMD.exe and type `pip3 install demucs==3.0.4 PySoundFile` (hit enter)

> :white_check_mark: to test, run `where demucs` in CMD.exe; it should show a location


### on macOS:

if you previously set up https://github.com/diracdeltas/spleeter4max/tree/feature/native-spleeter, **skip to step 3.**

1. install homebrew: https://brew.sh/

2. open terminal and install python3 with the following commands:
```
brew install python@3.9
brew install ffmpeg
brew link --force python@3.9
```

3. to install demucs, enter `pip3 install demucs==3.0.4` in the terminal.

> :white_check_mark: to test, run `which demucs` in CMD.exe; it should show a location


## running

Note for MacOS M1 users: This device may not work if you are running Ableton in Rosetta.

1. unzip [demucs.zip](https://github.com/diracdeltas/demucs4max/releases/download/v0.1/demucs.zip) and add the `demucs/` folder to your Places menu in Ableton
2. put `demucs.amxd` onto any audio channel
3. select any audio clip in Ableton by clicking on it
4. press the start button in the demucs device and wait. this will take a long time the first time, probably many minutes, so i recommend separating a short audio clip to start.
5. if demucs has succeeded, it should automatically open the folder containing the stems. if not you can find them in the Max device location under a directory named `separated/`:

<img width="341" alt="separated results" src="https://user-images.githubusercontent.com/549654/170402865-5f4ef11c-60c9-4c83-85c2-6597a9a25894.png">


## troubleshooting

if you run into issues, see [here](https://github.com/diracdeltas/spleeter4max/tree/feature/native-spleeter#it-not-working-and-i-cant-figure-out-why) for instructions to get the full error message in the Max console. you can file a bug report [here](https://github.com/diracdeltas/demucs4max/issues/new).

## license (MIT)

Copyright 2022 Yan Zhu

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## credits

https://github.com/facebookresearch/demucs
