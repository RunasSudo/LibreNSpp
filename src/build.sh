#!/bin/bash
js-beautify -r -f header.js
js-beautify -r -f pageAll.js
js-beautify -r -f puppets.js
js-beautify -r -f pageRegion.js
js-beautify -r -f pageNewspaper.js
js-beautify -r -f pageNewspaperEditor.js
js-beautify -r -f pageRegionalDispatch.js
js-beautify -r -f basic.js

m4 -P LibreNSpp.user.js>../LibreNSpp.user.js
