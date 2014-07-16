function setupPuppets() {
    $("#banner, #nsbanner").prepend(
        $('<div id="puppetsbox" style="position: absolute; top: 0; right: 130px; margin: 6px 16px 0 0; z-index: 100;"></div>')
        .html('<a id="puppetsbox_button" href="javascript:void(0);" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">Puppets</a>')
    );
    $("#banner, #nsbanner").append(
        $('<div id="puppetsbox_popup" style="color: white; background-color: rgba(0,0,0,0.8); position: absolute; top: 32px; right: 145px; padding: 8px; border-radius: 8px; display: none;"><span id="listPuppets"></span><a id="btnClearPuppets" href="javascript:void(0);">Clear Puppets</a><br><a id="btnAddPuppet" href="javascript:void(0);">Add Puppet</a></div>')
    );
    $("#puppetsbox_button").click(function() {
        $("#puppetsbox_popup").fadeToggle();
    });
    $("#btnClearPuppets").click(function() {
        var allSettings = GM_listValues();
        for (var i = 0; i < allSettings.length; i++) {
            if (allSettings[i].indexOf("puppet_p_") == 0) {
                GM_deleteValue(allSettings[i]);
            }
        }
        populatePuppets();
    });
    $("#btnAddPuppet").click(function() {
        var username = prompt("Puppet Username?", "");
        var password = prompt("Puppet Password?", "Cover your screen!");
        GM_setValue("puppet_p_" + username.toLowerCase().replace(" ", "_"), btoa(username) + ":" + btoa(password));
        populatePuppets();
    });
    populatePuppets();
}

function populatePuppets() {
    $("#listPuppets").html("<br>");

    var allSettings = GM_listValues();
    for (i = 0; i < allSettings.length; i++) {
        if (allSettings[i].indexOf("puppet_p_") == 0) {
            var value = GM_getValue(allSettings[i]);
            var link = $('<a href="javascript:void(0);">' + atob(value.substring(0, value.indexOf(":"))) + "</a>");

            link.click(makeSwitchPuppetHandler(value));
            $("#listPuppets").prepend("<br>");
            $("#listPuppets").prepend(link);
        }
    }
}

function makeSwitchPuppetHandler(value) {
    return function() {
        console.log(value);

        $("#loginbox input[name='nation']").val(atob(value.substring(0, value.indexOf(":"))));
        $("#loginbox input[name='password']").val(atob(value.substring(value.indexOf(":") + 1)));
        $("#loginbox input[name='autologin']").prop("checked", true);

        //Nasty hack follows
        //Note to self: Never give submit button name="submit"
        HTMLFormElement.prototype.submit.call(document.getElementById("loginbox").getElementsByTagName("form")[0]);
    };
}
