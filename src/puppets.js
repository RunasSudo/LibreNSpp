function setupPuppets() {
    if (!rift) {
        $("#banner, #nsbanner").prepend(
            $('<div id="puppetsbox" style="position: absolute; top: 0; right: 130px; margin: 6px 16px 0 0; z-index: 100;"></div>')
            .html('<a id="puppetsbox_button" href="javascript:void(0);" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">Puppets</a>')
        );
    } else { // Rift
        $("#banner .belspacer:not(.belspacermain)").after(
            $('<div class="bel" id="puppetsbox"></div>')
                .html('<div class="belcontent"><a class="bellink" id="puppetsbox_button" href="javascript:void(0);" style=""><i class="icon-town-hall"></i>PUPPETS</a></div>')
        );
    }
    $("#banner, #nsbanner").append(
        $('<div id="puppetsbox_popup" style="color: white; background-color: rgba(0,0,0,0.8); position: absolute; top: 21px; right: 145px; padding: 8px; border-radius: 8px; display: none;"><span id="listPuppets"></span><a id="btnManagePuppets" style="color: white;" href="/page=blank/x-librenspp=puppets">Manage Puppets</a></div>')
    );
    
    
    $("#puppetsbox_button").click(function() {
        $("#puppetsbox_popup").fadeToggle();
    });
    populatePuppets();
}

function managePuppets() {
    var pageContent = '<h1>LibreNS++ Puppet Manager</h1>';
    pageContent += '<p>Currently registered puppets:</p>';
    pageContent += '<ul id="puppetList"></ul>';
    pageContent += '<p>Add a new puppet:</p>';
    pageContent += '<form onsubmit="return false;"><table>';
    pageContent += '<tr><td>Username:</td><td><input id="puppetUsername" type="text"></td></tr>';
    pageContent += '<tr><td>Password:</td><td><input id="puppetPassword" type="password"></td></tr>';
    pageContent += '<tr><td><input id="puppetCreate" type="button" value="Create new puppets" disabled></td><td><input id="puppetAdd" type="button" value="Add puppet"></td></tr></table></form>';
    $("#content").html(pageContent);

    $("#puppetAdd").click(function() {
        if ($("#puppetUsername").val().length > 0 && $("#puppetPassword").val().length > 0) {
            NS_setValue("puppet_p_" + $("#puppetUsername").val().toLowerCase().replace(" ", "_"), btoa($("#puppetUsername").val()) + ":" + btoa($("#puppetPassword").val()));
            populatePuppets();
            populatePuppetManager();
        }
    });

    populatePuppetManager();
}

function populatePuppets() {
    $("#listPuppets").html("<br>");

    var allSettings = NS_listValues();
    for (i = 0; i < allSettings.length; i++) {
        if (allSettings[i].indexOf("puppet_p_") == 0) {
            var value = NS_getValue(allSettings[i]);
            var link = $('<a href="javascript:void(0);">' + atob(value.substring(0, value.indexOf(":"))) + '</a>');

            link.click(makeSwitchPuppetHandler(value));
            $("#listPuppets").prepend('<br>');
            $("#listPuppets").prepend(link);
        }
    }
}

function populatePuppetManager() {
    $("#puppetList").html("");

    var allSettings = NS_listValues();
    for (i = 0; i < allSettings.length; i++) {
        if (allSettings[i].indexOf("puppet_p_") == 0) {
            var value = NS_getValue(allSettings[i]);

            var linkDelete = $('<a href="javascript:void(0);">Delete</a>');
            linkDelete.click(makeDeletePuppetHandler(allSettings[i]));

            var li = $('<li> | ' + atob(value.substring(0, value.indexOf(":"))) + '</li>');
            li.prepend(linkDelete);

            $("#puppetList").prepend(li);
        }
    }
}

function makeSwitchPuppetHandler(value) {
    return function() {
        $("#loginbox input[name='nation']").val(atob(value.substring(0, value.indexOf(":"))));
        $("#loginbox input[name='password']").val(atob(value.substring(value.indexOf(":") + 1)));
        $("#loginbox input[name='autologin']").prop("checked", true);

        //Nasty hack follows
        //Note to self: Never give submit button name="submit"
        HTMLFormElement.prototype.submit.call(document.getElementById("loginbox").getElementsByTagName("form")[0]);
    };
}

function makeTopPuppetHandler(name) {
    return function() {
        var value = NS_getValue(name);
        NS_deleteValue(name);
        NS_setValue(name, value);
        populatePuppets();
        populatePuppetManager();
    };
}

function makeDeletePuppetHandler(name) {
    return function() {
        NS_deleteValue(name);
        populatePuppets();
        populatePuppetManager();
    };
}
