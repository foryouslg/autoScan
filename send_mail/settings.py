import datetime

DATETIME_NOW = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

BANNER = """Usage: send_mail.py [options]
Option:
    python send_mail.py                             send to the default receiver
    python send_mail.py abc@qq.com def@163.com      send to the specified receiver,one or more

The commonly used:
    xxxxxx@163.com yanghao-bj@163.com liran@163.com huangyu-bj@163.com
"""

MAIL_HOST = 'smtp.163.com'
MAIL_PORT = '587'

SENDER_MAIL = '@163.com'
SENDER_PASS = 'xxxxxxxxx'

RECEIVER_MAIL_LIST = ['xxxxxxxx@163.com']

MAIL_CONTENT = """HI ALL:

WVS scan has been completed.

This email comes from the security automation test platform.
Please do not reply.

====================================
From:%s
Date:%s
""" % (SENDER_MAIL,DATETIME_NOW)
MAIL_SUBJECT = 'WVS scan has been completed'


