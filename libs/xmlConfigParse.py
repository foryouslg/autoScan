#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from xml.dom.minidom import parse
import inspect
import os



class DefaultConfigXmlParse:

    def __init__(self):
        self.programDir = os.path.abspath(os.path.join(os.path.dirname(__file__),".."))
        self.getDefaultConfigFile = self.programDir + "\\" + "defaultConfig.xml"
        self.domDefaultConfig = parse(self.getDefaultConfigFile)

    def getDefaultConfig(self):
        return self.domDefaultConfig

    def getDefaultPathExclude(self):
        #create PathExclude object
        dom = self.getDefaultConfig()
        pathexclude = dom.getElementsByTagName("PathExclude")
        return pathexclude[0]

    def getDefaultExtensions(self):
        # create Extensions object
        dom = self.getDefaultConfig()
        extensions = dom.getElementsByTagName("Extensions")
        return extensions[0]

class ConfigXmlParse:

    def __init__(self):
        self.programDir = os.path.abspath(os.path.join(os.path.dirname(__file__),".."))
        self.getConfigFile = self.programDir + "\\" + "config.xml"
        self.domConfig = parse(self.getConfigFile)

    def getExtensions(self):
        dom = self.domConfig
        return dom.getElementsByTagName("Extensions")

    def getPathExclude(self):
        dom = self.domConfig
        return dom.getElementsByTagName("PathExclude")

    def getPathExcludeMask(self):
        attList = []
        ele = self.getPathExclude()[0]
        for i in ele.childNodes:
            if i.nodeType == 1:
                attList.append(i.firstChild.data)
                attList.append(i.getAttribute("enabled"))
                attList.append(i.getAttribute("isRegex"))
        return attList

    def getExtensionsMask(self):
        attList = []
        ele = self.getExtensions()[0]
        for i in ele.childNodes:
            if i.nodeType == 1:
                attList.append(i.firstChild.data)
        return attList


def getResultSaveDir():
    configXmlParse = ConfigXmlParse()
    dom = configXmlParse.domConfig
    saveDirEle = dom.getElementsByTagName("saveDir")
    return saveDirEle[0].firstChild.data

def getMail():
    configXmlParse = ConfigXmlParse()
    dom = configXmlParse.domConfig
    mail_list = []
    receiveMailList = dom.documentElement
    for i in receiveMailList.getElementsByTagName("receiveMailList"):
        for j in i.getElementsByTagName("mail"):
            # print(j.childNodes[0].data)
            mail_list.append(j.childNodes[0].data)
    return mail_list

def getCookie():
    configXmlParse = ConfigXmlParse()
    dom = configXmlParse.domConfig
    cookieList = []
    customCookieList = dom.getElementsByTagName("CustomCookies")
    for i in customCookieList[0].childNodes:
        if i.nodeType == 1:
            if i.firstChild != None:
                cookieList.append(i.firstChild.data)
            else:
                cookieList.append("")
    return cookieList


def geturl():
    configXmlParse = ConfigXmlParse()
    dom = configXmlParse.domConfig

    url = dom.getElementsByTagName("scanUrl")[0].firstChild.data
    # return dom().getElementsByTagName("scanUrl")[0].firstChild.data
    return url

if __name__ == "__main__":
    xml = DefaultConfigXmlParse()
    print(xml.getDefaultPathExclude())
    print(xml.getDefaultExtensions())
    # # xml._getInitExtensions()
    # xml.getDefaultConfig()
    #
    configxml = ConfigXmlParse()
    # configxml.getExtensions()
    # configxml.getPathExclude()
    # print(configxml.getPathExcludeMask())
    # print(configxml.getExtensionsMask())
    # print(getMail())
    # print(getCookie())
    # print(getResultSaveDir())
    # print(geturl())