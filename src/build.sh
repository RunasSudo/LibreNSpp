#!/bin/bash
find . -name '*.js' ! -type d -exec bash -c 'expand -i -t 4 "$0" > /tmp/e && mv /tmp/e "$0"' {} \;

m4 -P LibreNSpp.user.js>../LibreNSpp.user.js
