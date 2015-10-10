var settings = [];

function allPage() {
    loadSettings();
    
    //--------------------
    //Puppet Switcher
    setupPuppets();
    
    //--------------------
    //Settings Link
    setupSettings();
    
    //--------------------
    //Prepare Sounds
    loadNotifySound();
    
    //--------------------
    //Cosmetic Adjustments
    if (settings["cosmetic"] && rift) {
        cosmetic();
    }
    if (settings["floatingSidebar"] && rift) {
        floatingSidebar();
    }
    
    //--------------------
    //Latest Forum Topics
    if (!settings["latestForum"]) {
        $("#lthreads, .threads").hide();
    }
    
    //--------------------
    //Footer note
    $("#footbar").append('  &middot;  <a href="https://forum.nationstates.net/viewtopic.php?f=15&t=304199">LibreNS++</a> ' + version);
    
    //--------------------
    //Sidebar
    $(".panelcontent .menu li:nth-child(5) ul.popoutmenu").append('<li><a href="//forum.nationstates.net/ucp.php?i=main&mode=subscribed"><i class="icon-radar"></i>Subscribed</a></li>')
                                                          .append('<li><a href="//forum.nationstates.net/ucp.php?i=main&mode=bookmarks"><i class="icon-book"></i>Bookmarked</a></li>');
    
    //--------------------
    //Check for update
    if (settings["autoUpdate"]) {
        $.get('https://raw.githubusercontent.com/RunasSudo/LibreNSpp/master/version', function(serverVersion) {
            if (version != serverVersion) {
                latestVersion = serverVersion;
                signal();
                $("#new-version").show();
                $("#new-version-actual").text(latestVersion);
            } else {
                $("#current-version").show();
            }
        }, 'text');
    }
}
