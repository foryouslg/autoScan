@echo off

setlocal enabledelayedexpansion

::restore path variable
::echo %path%
::setx path ""
::pause

:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
set curr_dir=%~dp0
call "%curr_dir%install_package\copy_install_python.bat"
if errorlevel 0 goto awvs

:awvs
echo [+] waiting a moment...Prepare to install wvs
ping 127.1 -n 5 > nul

call "%curr_dir%copy_install_awvs.bat"
if errorlevel 0 goto success

:success
echo [+] install is done!
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


echo [*] set environment variable for python3 and wvs...

if exist temp\path.txt (
	del temp\path.txt
	echo "%path%" > temp\path.txt
) else (
	::echo 文件不存在
	mkdir temp
	cd temp
	echo "%path%" > path.txt
	cd ..
)
:::::::::::::::::::::::::::::::::


findstr /i  "python3"  temp\path.txt > nul
if %errorlevel% == 0 ( 
	echo [*] The python3 environment variable was existed!
	findstr /i  "abc"  temp\path.txt > nul
	if !errorlevel! == 0 (
		echo [*] The acunetix environment variable was existed!
	) else (
		setx PATH "C:\python37;C:\python37\Scripts;C:\Program Files\Acunetix\Web Vulnerability Scanner 10" 
		if errorlevel 0 (
			echo [+] The acunetix environment variable setup successful
		) else (
			echo [-] The acunetix environment variable setup failed
		)
	)
) else (
	findstr /i  "acunetix"  temp\path.txt > nul
	if !errorlevel! equ 0 (
		echo [*] The acunetix environment variable was existed!
	) else (
		setx PATH "C:\Program Files\Acunetix\Web Vulnerability Scanner 10;C:\python37;C:\python37\Scripts" 
		if errorlevel 0 (
			echo [+] The python3 environment variable setup successful
		) else (
			echo [-] The python3 environment variable setup failed
		)
	)
	
)

:::::::::::::::::::::::::::::::::::::::::::::::
:: activated wvs
:::::::::::::::::::::::::::::::::::::::::::::::

wvs.exe



pause