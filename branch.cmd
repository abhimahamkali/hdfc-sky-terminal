@echo off
REM ============================================================
REM  branch  —  start a new piece of work on its own branch.
REM  Run this after (or before) making changes on localhost.
REM  It creates a new feat/... branch and switches to it.
REM  Any uncommitted changes you already made come along with you.
REM  When you're done, run  ship  to merge it to main and go live.
REM ============================================================
setlocal

cd /d "%~dp0"

echo.
set /p name="Name this work (e.g. add-heatmap):  "
if "%name%"=="" set name=work
REM replace spaces with dashes so the branch name is valid
set name=%name: =-%

git checkout -b feat/%name%

echo.
echo  ============================================================
echo   Created branch  feat/%name%  and switched to it.
echo   Your local changes have come with you.
echo   When you're happy, run  .\ship  to merge to main and go live.
echo  ============================================================
echo.
pause
endlocal
