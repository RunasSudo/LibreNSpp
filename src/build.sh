#!/bin/bash

#Prepare assets for baking
echo Clearing assets/baked
rm -rf assets/baked/*
for file in $(ls assets/normal)
do
    echo Encoding assets/normal/$file to assets/baked/$file
    base64 assets/normal/$file | tr -d '\012\015' > assets/baked/$file
done

#Execute m4
echo Running code through m4
m4 -P LibreNSpp.user.js>../LibreNSpp.user.js
