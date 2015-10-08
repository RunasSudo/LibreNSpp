m4_include(header.js)

m4_include(../include/jquery-2.1.1.min.js)
this.$ = this.jQuery = jQuery.noConflict(true); //Prevent jQuery 2.1.1 messing with NS jQuery 1.x.

m4_include(../include/jquery.linkify.min.js)
m4_include(../include/json2.min.js)
m4_include(compat.js)

m4_include(cosmetic.js)
m4_include(pageAll.js)
m4_include(puppets.js)
m4_include(settings.js)
m4_include(pageRegion.js)
m4_include(pageRegionalDispatch.js)
m4_include(basic.js)
