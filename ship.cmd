@echo off
REM ============================================================
REM  ship  —  "merge everything" and put it live.
REM  Run this from the project folder after you're happy on localhost.
REM  It stages your changes, asks what you changed, commits,
REM  merges into main, and pushes -> auto-deploys to the live site.
REM ============================================================
setlocal

cd /d "%~dp0"

echo.
set /p msg="What did you change?  "
if "%msg%"=="" set msg=Update

echo.
echo  Saving your changes...
git add -A
git commit -m "%msg%" 1>nul 2>nul

for /f "delims=" %%b in ('git branch --show-current') do set branch=%%b

if /i not "%branch%"=="main" (
  echo  Merging "%branch%" into main...
  git checkout main
  git pull --no-edit
  git merge "%branch%" --no-edit
)

echo  Pushing to live...
git push origin main

echo.
echo  ============================================================
echo   Done. Your change will be live in ~1 minute at:
echo     https://hdfc-sky-terminal.vercel.app
echo   Then press Ctrl+Shift+R on the site to see it.
echo  ============================================================
echo.
pause
endlocal
