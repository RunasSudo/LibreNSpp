function setupSettings() {
    if (!rift) {
        $("#banner, #nsbanner").prepend(
             $('<div style="position: absolute; top: 0; right: 200px; margin: 6px 16px 0 0; z-index: 100;"></div>')
             .html('<a href="//www.nationstates.net/page=blank/x-librenspp=settings" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">LibreNS++</a>')
        );
    } else {
        $("#banner .belspacer:not(.belspacermain)").after(
             $('<div class="bel"></div>')
             .html('<div class="belcontent"><a class="bellink" href="//www.nationstates.net/page=blank/x-librenspp=settings"><i class="icon-lightbulb"></i>LIBRENS++</a></div>')
        );
    }
}

function loadSettingBool(setting, def) {
    settings[setting] = NS_getValueBool("setting_" + setting, def);
}

function loadSettings() {
    loadSettingBool("infiniteRMBScroll", true);
    loadSettingBool("liveRMBupdate", true);
    loadSettingBool("regionCustomise", true);
    loadSettingBool("regionIRC", true);
    loadSettingBool("latestForum", true);
    loadSettingBool("cosmetic", true);
    loadSettingBool("floatingSidebar", true);
    loadSettingBool("nsppTitles", true);
    loadSettingBool("nagPuppets", false);
    
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
    pageContent += '<input type="checkbox" id="latestForum"><label for="latestForum">Show latest forum topics in the sidebar.</label><br>';
    pageContent += '<input type="checkbox" id="cosmetic"><label for="cosmetic">Apply various minor cosmetic changes. (Requires Rift.)</label><br>';
    pageContent += '<input type="checkbox" id="floatingSidebar"><label for="floatingSidebar">Float the sidebar, so it follows you as you scroll down. (Requires Rift.)</label><br>';
    pageContent += '<br>';
    pageContent += '<h2>NationStates++ Compatibility</h2>';
    pageContent += '<input type="checkbox" id="nsppTitles"><label for="nsppTitles">Enable NationStates++ regional titles.</label><br>';
    pageContent += '<input type="checkbox" id="nsppNewspaper" disabled><label for="nsppNewspaper">Enable NationStates++ regional newspapers.</label><br>';
    pageContent += '<input type="checkbox" id="nsppIRC" disabled><label for="nsppIRC">Enable NationStates++ regional IRC.</label><br>';
    pageContent += '<br>';
    pageContent += '<h2>Use at your own risk!</h2>';
    pageContent += '<input type="checkbox" id="nagPuppets"><label for="nsppTitles">Suppress warning about insecure puppet password storage.</label><br>';
    pageContent += '</form>';
    $("#content").html(pageContent);
    
    $("#infiniteRMBScroll").prop("checked", settings["infiniteRMBScroll"]);
    $("#liveRMBupdate").prop("checked", settings["liveRMBupdate"]);
    $("#regionCustomise").prop("checked", settings["regionCustomise"]);
    $("#regionIRC").prop("checked", settings["regionIRC"]);
    $("#latestForum").prop("checked", settings["latestForum"]);
    $("#cosmetic").prop("checked", settings["cosmetic"]);
    $("#floatingSidebar").prop("checked", settings["floatingSidebar"]);
    $("#nsppTitles").prop("checked", settings["nsppTitles"]);
    $("#nagPuppets").prop("checked", settings["nagPuppets"]);
    
    $("#cosmetic, #floatingSidebar").prop("disabled", rift ? undefined : "needs Rift");
    
    $("#librensppSettings input[type='checkbox']").change(function() {
        NS_setValue("setting_" + this.id, this.checked);
    });
}
