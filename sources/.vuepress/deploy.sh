#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
#cd docs/.vuepress/dist
cd ../../docs-dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# WARN 特别注意，GitHub于最近，将【main】而不是【master】 作为了仓库的默认分支。
# 如果发布到 https://<USERNAME>.github.io
 git push -f git@github.com:hanshou101/hanshou101.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
