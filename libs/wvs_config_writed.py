#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from xml.dom.minidom import parse
from libs.xmlParse import XmlParse

WVS_SETTINGS = "C:\ProgramData\Acunetix WVS 10\Data\General\settings.xml"


def get_wvs_settings_dom():
    dom = parse(WVS_SETTINGS)
    return dom




def clear_custom_cookie():
    dom = get_wvs_settings_dom()
    custom_cookie = dom.getElementsByTagName("CustomCookies")
    if not custom_cookie:
        CustomCookieNode = dom.createElement("CustomCookies")
        CustomCookieNodeParent = dom.getElementsByTagName("ScanSettings")[0]
        CustomCookieNodeParent.appendChild(CustomCookieNode)

        with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
            dom.writexml(ws,encoding='utf-8')


def clear_cookie():
    dom = get_wvs_settings_dom()
    clear_custom_cookie()
    CustomCookies = dom.getElementsByTagName("CustomCookies")

    if not CustomCookies[0].getElementsByTagName("Cookie"):
        new_Cookies = dom.createElement("Cookie")
        CustomCookies[0].appendChild(new_Cookies)

        with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
            dom.writexml(ws,encoding='utf-8')


def set_custom_cookie_attributes_name(cookie_url="", cookie_string="", cookie_enable="0"):
    dom = get_wvs_settings_dom()
    cookie_ele = dom.getElementsByTagName("Cookie")[0]
    # print(cookie_ele.firstChild)

    cookie_ele.setAttribute("Url",cookie_url)
    cookie_ele.setAttribute("CookieString",cookie_string)
    cookie_ele.setAttribute("Enabled",cookie_enable)

    with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
        dom.writexml(ws,encoding='utf-8')


def set_custom_cookie_main():
    xmlParse = XmlParse()
    cookie_list = xmlParse.get_cookie()
    cookie_url = cookie_list[0]
    cookie_string = cookie_list[1]
    cookie_enable = cookie_list[2]
    clear_custom_cookie()           #init customCookies
    clear_cookie()                  #init cookie
    set_custom_cookie_attributes_name(cookie_url,cookie_string,cookie_enable)       #add value for cookie_ in CustomCookie


def get_filter_path():
        pass

def get_filter_file():
        pass

if __name__ == "__main__":
    # clear_custom_cookie()
    # clear_cookie()
    # set_custom_cookie_attributes_name("123","456","789")
    set_custom_cookie_main()
