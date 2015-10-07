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
}
