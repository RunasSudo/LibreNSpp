LibreNS++
=========

A free, secure NationStates++ alternative. Free as in ‘free speech’, ‘free beer’ and ‘free from tyranny’.

Folder structure
----------------------
* version: The current version of the userscript. Polled by LibreNS++ when checking for updates.
* LibreNSpp.user.js: The final userscript. Install this with a GreaseMonkey-compatible userscript browser/extension.
* src/LibreNSpp.user.js: The base m4 file used to generate the final userscript.
* src/build.sh: The bash script used to perform file cleanup and run m4.
* src/header.js: The UserScript header.
* src/pageAll.js: Code run on all pages, such as the insertion of the puppet switcher.
* src/puppets.js: Puppet management code.
* src/pageRegion.js: Code run on region RMB pages.
* src/pageRegionalDispatch.js: Code run on regional setting dispatch editor.
* src/basic.js: Basic code. Determines which functions to run based on location.
* include/: JavaScript libraries automatically bundled with LibreNS++.
