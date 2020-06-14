#!/bin/bash

function gitPush() {
    # add
    git add -A
    echo '---------- (git add) end ----------'

    # commit
    git commit -m "$msg"
    echo "---------- (git commit) end ----------"

    # push
    git push 
    echo '---------- (push origin master) end ----------'
    echo 'over. push'
}

function gitMergeFrom () {
    gitPush
    echo "---------- git merger from  --------------"
    # git checkout master
    git checkout master
    echo '-------- git has checkout branch master -----'
    # git pull
    git pull 
    echo '-------- git has pull   ------------'
    # git checkout dev
    echo '-------- git chekout dev -----------'
    git chekout dev
    # git merge from master
    git merge master
    echo '------- git merge master  ----------'
}

function gitMergeTo () {

    gitPush
    echo "---------- git merger from  --------------"

     # git pull
    git pull 
    echo '-------- git has pull   ------------'
    # git checkout master
    echo '-------- git chekout master -----------'
    git chekout "$2"
    # git merge from master
    git merge "$3"
    echo '------- git merge dev  ----------'
}





msg="$1"
merge="merge"
mergeTo="mergeTo"
branch1="$2"
branch2="$3" 

if [ ! -n "$msg" ]
then
    msg='push default'
fi

if [ "$msg" == "$merge" ]
then
    echo "------ will merge from "

elif [ "$msg" == "$mergeTo" ]
then 
    echo "------ will merge to "
else 
    gitPush
fi
