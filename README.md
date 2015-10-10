LibreNS++
=========

A free, secure NationStates++ alternative. Free as in ‘free speech’, ‘free beer’ and ‘free from tyranny’.

Folder structure
----------------------
* version: The current version of the userscript. Polled by LibreNS++ when checking for updates.
* LibreNSpp.user.js: The final userscript. Install this with a GreaseMonkey-compatible userscript browser/extension.
* src/: The actual JavaScript source code and the assets.
 * src/LibreNSpp.user.js: The base m4 file used to generate the final userscript.
 * src/build.sh: The bash script used to encode resources and run m4.
 * src/tidy.sh: The bash script used to format JavaScript files.
 * src/header.js: The UserScript header.
 * src/cosmetic.js: Some cosmetic adjustments.
 * src/compat.js: Backend work to ensure we can always save data.
 * src/notify.js: A small notification system
 * src/pageAll.js: Code run on all pages, such as the insertion of the puppet switcher.
 * src/puppets.js: Puppet management code.
 * src/pageRegion.js: Code run on region RMB pages.
 * src/pageRegionalDispatch.js: Code run on regional setting dispatch editor.
 * src/settings.js: The settings page (page=blank/x-librenspp=settings).
 * src/basic.js: Basic code. Determines which functions to run based on location.
 * src/assets/: Binary files LibreNS++ needs to run.
  * src/assets/normal/: The assets in their typical form.
  * src/assets/baked/: The assets after being encoded by build.sh.
* include/: JavaScript libraries automatically bundled with LibreNS++.

Third-party assets used
-----------
* notify.ogg: The notification ding. ["ding.wav" by Corsica_S](http://www.freesound.org/people/Corsica_S/sounds/91926/). Used under the [CC BY 3.0 licence](http://creativecommons.org/licenses/by/3.0/).
