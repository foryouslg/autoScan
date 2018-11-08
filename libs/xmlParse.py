#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from xml.dom.minidom import parse
import inspect
import os

class XmlParse():

    def program_dir(self):
        return os.path.abspath(os.path.join(os.path.dirname(__file__),".."))

    def get_config_file(self):
        return self.program_dir() + "\\" + "config.xml"

    def get_dom(self):
        return parse(self.get_config_file())

    def get_ele(self,ele):
        return self.get_dom().getElementsByTagName(ele)

    def get_url(self):
        return self.get_dom().getElementsByTagName("scanUrl")[0].firstChild.data

    def get_mail(self):
        mail_list = []
        receiveMailList = self.get_dom().documentElement
        for i in receiveMailList.getElementsByTagName("receiveMailList"):
            for j in i.getElementsByTagName("mail"):
                # print(j.childNodes[0].data)
                mail_list.append(j.childNodes[0].data)
        return mail_list

    def get_cookie(self):
        cookie_list = []
        customCookieList = self.get_dom().getElementsByTagName("CustomCookies")
        for i in customCookieList[0].childNodes:
            if i.nodeType == 1:
                if i.firstChild != None:
                    cookie_list.append(i.firstChild.data)
                else:
                    cookie_list.append("")
        return cookie_list

    def get_filter_path(self):
        pass

    def get_filter_file(self):
        pass

if __name__ == "__main__":
    a = XmlParse()
    # print(a.get_url())
    # print(a.get_config_file())
    print(a.get_cookie())
