#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
from libs.color_def import main


end_timestamp = int(time.time())
end_time = time.strftime('%Y-%m-%d %H:%M:%S' ,time.localtime(time.time()))


if __name__ == "__main__":
    main("[+] Start time " + end_time)