# The program is automatic safe scan 

>git clone root@192.168.11.146:/root/git_server/scan_python.git,
If you need the password ,please send an email to oneradish@qq.com 

><font color="red">warning: Run the install.bat with a super administrator.</br>
Operating system supporting win7 or more
</font>


1. The first,run the `install.bat` script
    
    It automatically installs python,awvs and environment variable settings 
2. The second,run the `startup.py` script

    Run `python3 startup.py` to start the scan after the program is installed.
   
## REQUIREMENT
Need to install c++ 2015

## config 
1. E-mail notification
    
    A list of messages receiving mail notifications,in the `config.xml` file.
    The parameter is `<receiveMailList>...</receiveMailList>`
    
2. Target URL
    
    The target url of scan,in the `config.xml`file.The parameter is <scanUrl>...</scanUrl>
    
3. add settings.py

    Refer to the `autoScan/send_mail/settings_example.py` file to configure `autoScan/send_mail/settings.py`,set up the mail notification after the scan.

