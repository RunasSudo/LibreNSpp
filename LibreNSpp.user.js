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

//Infinite RMB scroll
if (window.location.href.indexOf("/region=") >= 0) { //Are we on the RMB page?
    rmb = $(".rmbtable2");
    rmb.children().each(function(i,entry){rmb.prepend(entry)}); //Reverse order so newest are at top.
    $(".rmbolder").hide(); //GO AWAI!
    
    //Add scroll detector
    $("<div id=\"infiniteScroll\" style=\"border: 1px #CCC solid; border-radius: 12px; -moz-border-radius: 12px; -webkit-border-radius: 12px; margin-top: 4px; margin-bottom: 4px; padding: 0 8px 0 12px; background-color: #FDFFFC; text-align: center; font-weight: bold; margin-left: 18%; margin-right: 18%; min-height: 18px; color: #AAA;\"></div>")
    .html("Infinite Scroll!")
    .insertAfter(rmb.parent());
    
    infiniteScroll();
}

//LibreNS++ functions
var rmbOffset = 0;
function infiniteScroll() {
    if (isScrolledIntoView("#infiniteScroll")) {
        //Load new RMB messages
        $("#infiniteScroll").html("Loading&hellip;");
        rmbOffset += 10;
        $.get("/page=ajax/a=rmb/region=" + "democratic_socialist_assembly" + "/offset=" + rmbOffset, function(data) {
            if (data.length > 1) {
                $($(data).get().reverse()).insertAfter(".rmbrow:last");
                $("#infiniteScroll").html("Infinite Scroll!");
            } else {
                $("#infiniteScroll").html("At earliest message.");
            }
        });
    }
    
    setTimeout(infiniteScroll, 1000);
}

//Utility functions
function isScrolledIntoView(elem) { //https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
