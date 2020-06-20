# Project Planner [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Table of Contents

- Installation
    - Prerequisites
	- System:
		- Windows (10)
		- macOS
		- Ubuntu Linux
		- Debian Linux
		- Arch Linux
- Usage
    - Coming soon
- Contributing

## Installation

### Prerequisites
Python 3.8 and some modules are required for this application to run properly
While proper install instructions for the key components are described down below, some parts may vary from machine to machine.

##### Windows:
Download and install the latest Python version from here: https://www.python.org/downloads/windows/
Follow these steps to install python-pip on windows: https://phoenixnap.com/kb/install-pip-windows

##### macOS:
Download and install your proper JDK 11 version from here: https://www.python.org/downloads/mac-osx/
Execute this command in your terminal to install python-pip: ```curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py```

##### Ubuntu Linux:
```
$ sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
$ sudo apt -y install python3 python3-pip
```
##### Debian Linux:
```
$ sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
$ sudo apt -y install gnupg2
$ sudo apt -y install vim apt-transport-https dirmngr wget software-properties-common
$ sudo add-apt-repository ppa:deadsnakes/ppa
$ sudo apt update
$ sudo apt -y install python3.8
```



##### Arch Linux:
```
$ sudo pacman -Syu python python python-pip python-argon2_cffi python-django-environ python-django-filter python-phonenumbers python-pillow python-psycopg2 
$ pip install django-money django-phonenumberfield djangorestframeworks django-rest-knox django-cors-headers python-dotenv
```
[TheGoliath](https://github.com/GoliathLabs) will get the missing packages into the AUR as well as in his own repository so we don't have to use pip to update the dependencies but just use pacman :)

## Usage
A guide will be added soon

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

