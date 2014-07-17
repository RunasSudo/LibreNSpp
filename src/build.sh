#!/bin/bash
js-beautify -r -f header.js
js-beautify -r -f pageAll.js
js-beautify -r -f puppets.js
js-beautify -r -f pageRegion.js
js-beautify -r -f pageNewspaper.js
js-beautify -r -f pageNewspaperEditor.js
js-beautify -r -f pageRegionalDispatch.js
js-beautify -r -f basic.js

cat header.js > ../LibreNSpp.user.js
cat pageAll.js >> ../LibreNSpp.user.js
cat puppets.js >> ../LibreNSpp.user.js
cat pageRegion.js >> ../LibreNSpp.user.js
cat pageNewspaper.js >> ../LibreNSpp.user.js
cat pageNewspaperEditor.js >> ../LibreNSpp.user.js
cat pageRegionalDispatch.js >> ../LibreNSpp.user.js
cat basic.js >> ../LibreNSpp.user.js
