#!/bin/bash

#Format JS files
find . -maxdepth 1 -name '*.js' ! -type d -exec bash -c 'expand -i -t 4 "$0" > /tmp/e && rsync --checksum /tmp/e "$0"' {} \;
