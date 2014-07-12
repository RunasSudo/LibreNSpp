// ==UserScript==
// @name       LibreNS++
// @namespace  https://github.com/RunasSudo/LibreNSpp
// @version    0.0a0
// @description  Free as in 'free speech', 'free beer' and 'free from tyranny'.
// @match      http://nationstates.net/*
// @match      http://www.nationstates.net/*
// @match      https://nationstates.net/*
// @match      https://www.nationstates.net/*
// @copyright  2014, RunasSudo
// ==/UserScript==

alert("Hello");

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.nationstates.net/cgi-bin/api.cgi?nation=south_jarvis",
  onload: function(response) {
    alert(response.responseText);
  }
});
