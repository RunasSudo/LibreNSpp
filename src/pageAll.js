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
    //Latest Forum Topics
    if (!settings["latestForum"]) {
        $("#lthreads, .threads").hide();
    }
    
    //--------------------
    //Footer note
    $("#footbar").append('  &middot;  <a href="https://forum.nationstates.net/viewtopic.php?f=15&t=304199">LibreNS++</a> ' + version + '!')
}
