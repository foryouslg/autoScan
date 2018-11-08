#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from xml.dom.minidom import parse
# from libs.xmlParse import XmlParse
from libs.xmlConfigParse import ConfigXmlParse
from libs.xmlConfigParse import DefaultConfigXmlParse
from libs.xmlConfigParse import getCookie

WVS_SETTINGS = "C:\ProgramData\Acunetix WVS 10\Data\General\settings.xml"

def getWvsSettingsDom():
    dom = parse(WVS_SETTINGS)
    return dom

class SetCookie:

    def __init__(self):
        self.dom = getWvsSettingsDom()

    def clearCustomCookie(self):
        # dom = get_wvs_settings_dom()
        custom_cookie = self.dom.getElementsByTagName("CustomCookies")
        if not custom_cookie:
            CustomCookieNode = self.dom.createElement("CustomCookies")
            CustomCookieNodeParent = self.dom.getElementsByTagName("ScanSettings")[0]
            CustomCookieNodeParent.appendChild(CustomCookieNode)

            with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
                self.dom.writexml(ws, encoding='utf-8')

    def clearCookie(self):
        # dom = get_wvs_settings_dom()
        self.clearCustomCookie()
        CustomCookies = self.dom.getElementsByTagName("CustomCookies")

        if not CustomCookies[0].getElementsByTagName("Cookie"):
            newCookies = self.dom.createElement("Cookie")
            CustomCookies[0].appendChild(newCookies)

            with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
                self.dom.writexml(ws, encoding='utf-8')

    def setCustomCookieAttributesName(self, cookieUrl="", cookieString="", cookieEnable="0"):
        # dom = get_wvs_settings_dom()
        cookieEle = self.dom.getElementsByTagName("Cookie")[0]
        # print(cookieEle.firstChild)

        cookieEle.setAttribute("Url", cookieUrl)
        cookieEle.setAttribute("CookieString", cookieString)
        cookieEle.setAttribute("Enabled", cookieEnable)

        with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
            self.dom.writexml(ws, encoding='utf-8')

    def setCustomCookieMain(self):
        # configXmlParse = ConfigXmlParse()
        # cookieList = configXmlParse.getget_cookie()
        # cookieUrl = cookieList[0]
        # cookieString = cookieList[1]
        # cookieEnable = cookieList[2]
        cookieUrl = getCookie()[0]
        cookieString = getCookie()[1]
        cookieEnable = getCookie()[2]
        self.clearCustomCookie()  # init customCookies
        self.clearCookie()  # init cookie
        self.setCustomCookieAttributesName(cookieUrl, cookieString, cookieEnable)  # add value for cookie_ in CustomCookie


class SetFilter:

    def __init__(self):
        self.dom = getWvsSettingsDom()

    def initSite(self):
        site = self.dom.getElementsByTagName("Site")[0]
        print(site)
        site.parentNode.removeChild(site)
        with open(WVS_SETTINGS, 'w', encoding='utf-8') as ws:
            self.dom.writexml(ws, encoding='utf-8')

    def initExclude(self):
        pass

    def setSite(self):
        pass

    def setExclude(self):
        pass

if __name__ == '__main__':
    # cooke = SetCookie()
    # cookie_url = "123"
    # cookie_string = "456"
    # cookie_enable = "0"
    # cooke.setCustomCookieMain()
    # pass
    s = SetFilter()
    print(s.initSite())