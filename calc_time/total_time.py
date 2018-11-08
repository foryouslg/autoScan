#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from libs.color_def import main
from calc_time.start_time import start_timestamp
from calc_time.end_time import end_timestamp


total_time = end_timestamp - start_timestamp


if __name__ == "__main__":
    main("[+] Total time " + str(total_time))