#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
import datetime
from libs.color_def import main



start_timestamp = int(time.time())
start_time = time.strftime('%Y-%m-%d %H:%M:%S' ,time.localtime(time.time()))
__t1 = time.strptime(start_time, '%Y-%m-%d %H:%M:%S')
t1 = datetime.datetime(__t1[0],__t1[1],__t1[2],__t1[3],__t1[4],__t1[5])


if __name__ == "__main__":
    main("[+] Start time " + start_time)





