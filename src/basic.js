var rift = false; // this is set in run(), assume false to be safer
var latestversion = version;

//====================
//Basic Code
function run() {
    rift = $(".bel.bannernation").length == 1;
    allPage();
    
    //--------------------
    //Region page things
    if (getPageBits().length == 1 && getPageBits()[0].indexOf("region=") == 0) { //Are we on the RMB page?
        if (!settings["regionCustomise"]) {
            regionPage({});
        }
        //--------------------
        //Load region settings
        var foundSettings = false;
        for (var i = 0; i < $(".dispatchlist h3 a").length; i++) {
            if ($(".dispatchlist h3 a").get(i).innerHTML == "LibreNS++") {
                $.get($(".dispatchlist h3 a").get(i).href, function(data) {
                    regionPage(JSON.parse(atob($(data).find("#dispatch p").get(0).innerHTML)));
                });
                foundSettings = true;
                break;
            }
        }
        if (!foundSettings)
            regionPage({});
    }
    
    //--------------------
    //Dispatch editors
    if (getPageBits().length == 2 && getPageBits()[0] == "page=dispatch") {
        var baseEdit = $(".dispatchbyline .smalltext a").attr("href");
        $(".dispatchbyline .smalltext a").parent().append(' | <a href="' + baseEdit + '/x-librenspp=regionalSettings">as Regional Settings</a>');
    }
    if (getPageBits().length == 3 && getPageBits()[0] == "page=create_dispatch" && getPageBits()[2] == "x-librenspp=regionalSettings") {
        dispatchEditor();
    }
    
    //--------------------
    //Puppet manager
    if (getPageBits().length == 2 && getPageBits()[0] == "page=blank" && getPageBits()[1] == "x-librenspp=puppets") {
        managePuppets();
    }
    
    //--------------------
    //Settings page
    if (getPageBits().length == 2 && getPageBits()[0] == "page=blank" && getPageBits()[1] == "x-librenspp=settings") {
        manageSettings();
    }
}

function getPageBits() {
    return window.location.pathname.substring(1).split("/");
}

function sanitize(string) {
    return $('<div></div>').text(string).html();
}

$(function(){
    run();
});
