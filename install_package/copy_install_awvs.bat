@echo off

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::该脚本用于安装awvs
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
title awvs安装脚本
set curr_dir=%~dp0

::echo [+] 当前目录： %curr_dir%

::awvs main program
if exist "C:\Program Files\Acunetix" (
    rmdir /q /s "C:\Program Files\Acunetix"
)
xcopy "%curr_dir%Acunetix" "C:\Program Files\Acunetix" /e /y /i
if %errorlevel% neq 0 goto false


if exist "C:\ProgramData\Acunetix WVS 10" (
    rmdir /q /s "C:\ProgramData\Acunetix WVS 10"
)

mkdir "C:\ProgramData\Acunetix WVS 10"
xcopy "%curr_dir%Acunetix WVS 10" "C:\ProgramData\Acunetix WVS 10" /e /y /i
if errorlevel 0 goto success

:false
echo [-] error : Acunetix installation failed. %errorlevel%
pause
exit

:success
echo [+] wvs installation completed,it is success








