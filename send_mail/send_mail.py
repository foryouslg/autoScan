#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import smtplib
import sys
from email.mime.text import MIMEText
from send_mail.settings import MAIL_HOST, MAIL_PORT
from send_mail.settings import MAIL_SUBJECT, MAIL_CONTENT
# from send_mail.settings import RECEIVER_MAIL_LIST
from send_mail.settings import SENDER_MAIL, SENDER_PASS
from send_mail.settings import BANNER
from libs import color_def
from libs.xmlParse import XmlParse

receiver_list = []

def send_mail(to_list, sub, content):
    msg = MIMEText(content, _subtype='plain', _charset='utf-8')
    msg['Subject'] = sub
    msg['From'] = SENDER_MAIL
    msg['To'] = ';'.join(to_list)
    try:
        s = smtplib.SMTP(MAIL_HOST, MAIL_PORT)
        # s.connect(mail_host)
        # s.starttls()
        s.login(SENDER_MAIL, SENDER_PASS)

        s.sendmail(SENDER_MAIL, to_list, msg.as_string())
        s.close()
        print( '[+] Email sent successfully')
        print ('[+] Receiver: %s' % to_list)
        return True
    except Exception as e:
        print (str(e))
        banner()
        print (color_def.main('[-] Email sent failed'))
        return False


def banner():
    """
    This function prints send_mail banner
    """
    print (BANNER)


def send_mail_list():
    dom = XmlParse()
    return dom.get_mail()

# def main(emailList=None,emailSubject=None,emailContent=None):
def main(emailList=None):
    # banner()
    if(emailList == None):
        if (len(sys.argv) == 1):
            #RECEIVER_MAIL_LIST
            send_mail(send_mail_list(), MAIL_SUBJECT, MAIL_CONTENT)
        else:
            send_mail(sys.argv[1:], MAIL_SUBJECT, MAIL_CONTENT)
    else:
        send_mail(emailList, MAIL_SUBJECT, MAIL_CONTENT)


if __name__ == '__main__':
    main()

