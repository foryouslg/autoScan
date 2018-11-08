#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import os
import sys
import time
import datetime
from calc_time import start_time
from libs import color_def
# from libs import xmlParse
from libs.xmlConfigParse import geturl
from libs.wvs_config_writed import set_custom_cookie_main
from send_mail import send_mail
import shutil
import re


SCAN_REMIND = "[+] Is scanning..."
SCAN_RESULT = "c:\\temp\\scanResults"

class TimeInit():
    """

    """

    def __startTime__(self):
        color_def.main("[+] Start time " + start_time.start_time)
        color_def.main(SCAN_REMIND)

    def __endTime__(self):
        end_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        __t2 = time.strptime(end_time, '%Y-%m-%d %H:%M:%S')
        t2 = datetime.datetime(__t2[0], __t2[1], __t2[2], __t2[3], __t2[4], __t2[5])

        color_def.main("[+] End time " + end_time)
        # color_def.main("[+] Total time is:" + str(end_timestamp - start_time.start_timestamp))
        color_def.main("[+] Total time is: " + str(t2 - start_time.t1))


def scan(url):
    # print(os.system("wvs_console /Scan {} /SaveFolder c:\\temp\\scanResults /Save".format(url)))
    # print(os.popen("wvs_console /Scan {} /SaveFolder c:\\temp\\scanResults /Save".format(url)))
    r = os.popen("wvs_console /Scan {} /SaveFolder {} /Save".format(url,SCAN_RESULT))
    for i in r.read().splitlines():
        print(i)

def get_curr_temp():
    temp_path = os.getcwd() + "\\temp"
    return temp_path

def add_program_dir():
    """add path

    :return: none
    """
    os.path.abspath(os.path.join(os.path.dirname(__file__),"send_mail"))
    os.path.abspath(os.path.join(os.path.dirname(__file__), "libs"))
    os.path.abspath(os.path.join(os.path.dirname(__file__), "calc_time"))

def save_scan_result():
    url = xmlParse.XmlParse().get_url()
    program_name = url.split("://")[1].split("/")[0]
    # print(program_name)
    scan_result_file = SCAN_RESULT + "\\scan-results.wvs"
    try:
        shutil.copyfile(scan_result_file, get_curr_temp() + "\\" + program_name + ".wvs")
    except:
        print(scan_result_file + " is error")


def main():
    add_program_dir()   #add program in path
    # xmlParse = xml_parse
    # print(xmlParse)
    set_custom_cookie_main()            #set the "C:\ProgramData\Acunetix WVS 10\Data\General\settings.xml" file form this program settings.xml
    t = TimeInit()
    t.__startTime__()   # set start time
    # url = xmlParse.XmlParse().get_url()
    url = geturl()
    # print(url)
    scan(url)           # start scan
    save_scan_result()  # save scan result into temp\program_name.wvs
    t.__endTime__()     # set scan is over
    print("-" * 20 + "The scan is over,sending mail" + "-" * 20)
    send_mail.main()        # scan result and send mail


if __name__ == "__main__":
    main()
    # save_scan_result()