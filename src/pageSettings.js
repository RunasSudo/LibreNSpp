function setupSettings() {
    $("#banner, #nsbanner").prepend(
        $('<div style="position: absolute; top: 0; right: 200px; margin: 6px 16px 0 0; z-index: 100;"></div>')
        .html('<a href="/page=blank/x-librenspp=settings" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">LibreNS++</a>')
    );
}

function manageSettings() {
    var pageContent = '<h1>LibreNS++ Settings</h1>';
    pageContent += '<form id="librensppSettings" onSubmit="return false;">';
    pageContent += '<h2>Updates</h2>';
    pageContent += '<input type="checkbox" id="autoUpdate" disabled><label for="autoUpdate">Check for updates automatically.</label><br>';
    pageContent += '<input type="button" id="updateNow" value="Check now" disabled> <span id="updateStatus">No new updates. Last checked: never.</span><br>';
    pageContent += '<br>';
    pageContent += '<h2>LibreNS++ Features</h2>';
    pageContent += '<input type="checkbox" id="infiniteRMBScroll" checked disabled><label for="infiniteRMBScroll">Enable infinite RMB scroll.</label><br>';
    pageContent += '<input type="checkbox" id="liveRMBupdate" checked disabled><label for="liveRMBupdate">Enable live RMB updates.</label><br>';
    pageContent += '<input type="checkbox" id="infiniteTelegram" disabled><label for="infiniteTelegram">Enable infinite telegram folders.</label><br>';
    pageContent += '<input type="checkbox" id="regionCustomise" checked disabled><label for="regionCustomise">Enable regional customisation.</label><br>';
    pageContent += '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="regionIRC" checked disabled><label for="regionIRC">Enable regional IRC.</label><br>';
    pageContent += '<br>';
    pageContent += '<h2>NationStates++ Compatibility</h2>';
    pageContent += '<input type="checkbox" id="nsppNewspaper" disabled><label for="nsppNewspaper">Enable NationStates++ newspapers.</label><br>';
    pageContent += '<input type="checkbox" id="nsppIRC" disabled><label for="nsppIRC">Enable NationStates++ IRC.</label><br>';
    pageContent += '</form>';
    $("#content").html(pageContent);
}
