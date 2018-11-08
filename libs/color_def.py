#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from colorama import Style, Fore, init
import sys

color_fore = Fore.RED
color_back = ""
color_style = Style.NORMAL


def color_def(s, color_fore, color_back, color_style):
    init(True)
    color_pre = color_fore + color_back + color_style

    print(color_pre + s + Style.RESET_ALL)


def is_argv():
    if (len(sys.argv) > 1):
        return True
    else:
        return False


def main(red_s):
    if is_argv():
        s = sys.argv[1]
        color_def(s, color_fore, color_back, color_style)
    else:
        color_def(red_s, color_fore, color_back, color_style)

if __name__ == "__main__":
    # if is_argv():
    #     s = sys.argv[1]
    #     color_def(s, color_fore, color_back, color_style)
    s = "this is test"
    main(s)