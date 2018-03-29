#!/bin/bash
rm -rf libs
SYSTEM="shulie"
export BABEL_ENV=compiled
#编译src下js 代码
babel src --out-dir libs/ --copy-files
node-sass src/style.scss libs/style.css

SYSTEM=`npm whoami`
git status -s
git add .
git commit -m '更新版本'
git push origin master

if [ $SYSTEM == "jerryberton" ]; then
  npm version minor
  npm publish
fi
 