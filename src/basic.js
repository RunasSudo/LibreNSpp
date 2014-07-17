//====================
//Basic Code
function run() {
    allPage();

    //--------------------
    //Region page things
    if (getPageBits().length == 1 && getPageBits()[0].indexOf("region=") == 0) { //Are we on the RMB page?
        //--------------------
        //Load region settings
        var foundSettings = false;
        for (var i = 0; i < $(".dispatchlist h3 a").length; i++) {
            if ($(".dispatchlist h3 a").get(i).innerText == "LibreNS++") {
                $.get($(".dispatchlist h3 a").get(i).href, function(data) {
                    regionPage(JSON.parse(atob($(data).find("#dispatch p").get(0).innerText)));
                });
                foundSettings = true;
                break;
            }
        }
        if (!foundSettings)
            regionPage({});
    }

    //--------------------
    //Newspaper things
    if (getPageBits().length == 2 && getPageBits()[0] == "page=blank" && getPageBits()[1].indexOf("x-librenspp=newspaper=") == 0) {
        var dispatch = parseInt(getPageBits()[1].substring(22));
        $.get("/page=dispatch/id=" + dispatch, function(data) {
            newspaperPage(dispatch, JSON.parse(atob($(data).find("#dispatch p").get(0).innerText)));
        });
    }

    //--------------------
    //Dispatch editors
    if (getPageBits().length == 2 && getPageBits()[0] == "page=dispatch") {
        var baseEdit = $(".dispatchbyline .smalltext a").attr("href");
        $(".dispatchbyline .smalltext a").parent().append(' | <a href="' + baseEdit + '/x-librenspp=regionalSettings">as Regional Settings</a> | <a href="' + baseEdit + '/x-librenspp=newspaper">as Newspaper</a>');
    }
    if (getPageBits().length == 3 && getPageBits()[0] == "page=create_dispatch" && getPageBits()[2] == "x-librenspp=regionalSettings") {
        dispatchEditor();
    }
    if (getPageBits().length == 3 && getPageBits()[0] == "page=create_dispatch" && getPageBits()[2] == "x-librenspp=newspaper") {
        newspaperEditor();
    }

    //--------------------
    //Puppet manager
    if (getPageBits().length == 2 && getPageBits()[0] == "page=blank" && getPageBits()[1] == "x-librenspp=puppets") {
        managePuppets();
    }
}

function getPageBits() {
    return window.location.pathname.substring(1).split("/");
}

function sanitize(string) {
    return $('<div></div>').text(string).html();
}

run();
