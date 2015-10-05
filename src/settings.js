function setupSettings() {
    $("#banner, #nsbanner").prepend(
        $('<div style="position: absolute; top: 0; right: 200px; margin: 6px 16px 0 0; z-index: 100;"></div>')
        .html('<a href="//www.nationstates.net/page=blank/x-librenspp=settings" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">LibreNS++</a>')
    );
}

function loadSettings() {
    settings["infiniteRMBScroll"] = NS_getValue("setting_infiniteRMBScroll", true) == "true";
    settings["liveRMBupdate"] = NS_getValue("setting_liveRMBupdate", true) == "true";
    settings["regionCustomise"] = NS_getValue("setting_regionCustomise", true) == "true";
    settings["regionIRC"] = NS_getValue("setting_regionIRC", true) == "true";
    settings["nsppTitles"] = NS_getValue("setting_nsppTitles", true) == "true";
    
    return settings;
}

function manageSettings() {
    var pageContent = '<h1>LibreNS++ Settings</h1>';
    pageContent += '<p style="font-size: 0.9em;">LibreNS++ version ' + version + '. <a href="https://forum.nationstates.net/viewtopic.php?f=15&t=304199">Forum</a>, <a href="https://github.com/RunasSudo/LibreNSpp">GitHub</a>, <a href="https://www.nationstates.net/nation=south_jarvis">South Jarvis (creator)</a>.</p>';
    pageContent += '<form id="librensppSettings" onSubmit="return false;">';
    pageContent += '<h2>Updates</h2>';
    pageContent += '<input type="checkbox" id="autoUpdate" disabled><label for="autoUpdate">Check for updates automatically.</label><br>';
    pageContent += '<input type="button" id="updateNow" value="Check now" disabled> <span id="updateStatus">No new updates. Last checked: never.</span><br>';
    pageContent += '<br>';
    pageContent += '<h2>LibreNS++ Features</h2>';
    pageContent += '<input type="checkbox" id="infiniteRMBScroll"><label for="infiniteRMBScroll">Enable infinite RMB scroll.</label><br>';
    pageContent += '<input type="checkbox" id="liveRMBupdate"><label for="liveRMBupdate">Enable live RMB updates.</label><br>';
    pageContent += '<input type="checkbox" id="infiniteTelegram" disabled><label for="infiniteTelegram">Enable infinite telegram folders.</label><br>';
    pageContent += '<input type="checkbox" id="regionCustomise"><label for="regionCustomise">Enable regional customisation.</label><br>';
    pageContent += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="regionIRC"><label for="regionIRC">Enable regional IRC.</label><br>';
    pageContent += '<br>';
    pageContent += '<h2>NationStates++ Compatibility</h2>';
    pageContent += '<input type="checkbox" id="nsppTitles"><label for="nsppTitles">Enable NationStates++ regional titles.</label><br>';
    pageContent += '<input type="checkbox" id="nsppNewspaper" disabled><label for="nsppNewspaper">Enable NationStates++ regional newspapers.</label><br>';
    pageContent += '<input type="checkbox" id="nsppIRC" disabled><label for="nsppIRC">Enable NationStates++ regional IRC.</label><br>';
    pageContent += '</form>';
    $("#content").html(pageContent);
    
    $("#infiniteRMBScroll").prop("checked", settings["infiniteRMBScroll"]);
    $("#liveRMBupdate").prop("checked", settings["liveRMBupdate"]);
    $("#regionCustomise").prop("checked", settings["regionCustomise"]);
    $("#regionIRC").prop("checked", settings["regionIRC"]);
    $("#nsppTitles").prop("checked", settings["nsppTitles"]);
    
    $("#librensppSettings input[type='checkbox']").change(function() {
        NS_setValue("setting_" + this.id, this.checked);
        // note for future: if any settings that affect the settings page are added, they won't take effect until reload (probably for the better)
    });
}
