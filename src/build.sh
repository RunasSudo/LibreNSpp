#!/bin/bash

#Prepare assets for baking
echo Preparing assets for baking
mkdir assets/baked 2>/dev/null
for file in $(ls assets/normal)
do
    echo Encoding assets/normal/$file to assets/baked/$file
    base64 -w 0 assets/normal/$file > assets/baked/$file
done

#Execute m4
echo Running code through m4
m4 -P LibreNSpp.user.js>../LibreNSpp.user.js
