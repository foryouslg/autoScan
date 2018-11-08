@echo off


:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::该脚本用于安装python3 and pip3 and ipython3,不影响原来的python环境
::python3 install dirctory c:\python37
::pip runing command is pip3 and ipython is same
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

title python安装脚本
set curr_dir=%~dp0
::echo [+] 当前目录： %curr_dir%
echo [+] Is copy...

::python3  install
if exist "C:\python37" (
    rmdir /q /s "C:\python37"
   )
xcopy "%curr_dir%python37" "C:\python37" /e /y /i
if errorlevel 0 goto success
echo [-] error : python installation failed. %errorlevel%
pause
exit

:success
echo [+] python installation completed,it is success


