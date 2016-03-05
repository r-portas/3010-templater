# 3010-templater
Creates mylib and stage template files

## Installation

Clone the repo and run ```sudo sh install.sh```

## Usage
Run ```mylib-gen``` within any folder to generate templates

* Use ```mylib-gen stage``` to generate stage code (You want to run this command within ```repo/stage#/```)
* Use ```mylib-gen mylib``` to generate a mylib library (You want to run this command within ```repo/mylib/```)


## Examples

Create Stage 3
```
cd ~/repo
mkdir stage3
cd stage3
mylib-gen stage
```

Create a new mylib library
```
cd ~/repo/mylib
mylib-gen mylib
```
