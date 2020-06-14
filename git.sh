#!/bin/bash


function gitMerge () {
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

    echo 'over.'
}



msg=$1
merge="merge"

if [ ! -n "$msg" ]
then
    msg='push default'
fi

if [ "$msg" -eq "$merge" ]
then
    echo '------$msg'
else 
    gitPush
fi
