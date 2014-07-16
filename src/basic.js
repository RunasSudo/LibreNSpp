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
    //Regional settings dispatch editor
    if (getPageBits().length == 2 && getPageBits()[0] == "page=create_dispatch" && $("input[name=\"dname\"]").val() == "LibreNS++") {
        dispatchEditor();
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

run();
