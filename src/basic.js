//====================
//Basic Code
function run() {
    allPage();

    //--------------------
    //Region page things
    if (getPageBits().length == 1 && getPageBits()[0].indexOf("region=") == 0) { //Are we on the RMB page?
        //--------------------
        //Load region settings
        var regionSettings = {};
        for (var i = 0; i < $(".dispatchlist h3 a").length; i++) {
            if ($(".dispatchlist h3 a").get(i).innerText == "LibreNS++") {
                $.get($(".dispatchlist h3 a").get(i).href, function(data) {
                    regionSettings = JSON.parse(atob($(data).find("#dispatch p").get(0).innerText));
                });
                break;
            }
        }
        regionPage(regionSettings);
    }

    //--------------------
    //Regional settings dispatch editor
    if (getPageBits().length == 2 && getPageBits()[0] == "page=create_dispatch" && $("input[name=\"dname\"]").val() == "LibreNS++") {
        dispatchEditor();
    }
}

function getPageBits() {
    return window.location.href.substring(window.location.href.indexOf("nationstates.net/") + 17).split("/");
}

run();
