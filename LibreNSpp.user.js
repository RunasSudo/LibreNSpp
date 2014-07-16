// ==UserScript==
// @name        LibreNS++
// @namespace   https://github.com/RunasSudo/LibreNSpp
// @version     0.0a11
// @description Free as in 'free speech', 'free beer' and 'free from tyranny'.
// @match       http://*.nationstates.net/*
// @match       https://*.nationstates.net/*
// @require     https://github.com/RunasSudo/LibreNSpp/raw/master/jquery.linkify.min.js
// @require     https://github.com/RunasSudo/LibreNSpp/raw/master/json2.js
// @copyright   2014, RunasSudo
// ==/UserScript==

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

function allPage() {
    //--------------------
    //Puppet Switcher
    $("#banner, #nsbanner").prepend(
        $('<div id="puppetsbox" style="position: absolute; top: 0; right: 130px; margin: 6px 16px 0 0; z-index: 100;"></div>')
        .html('<a id="puppetsbox_button" href="javascript:void(0);" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">'
              + "Puppets</a>")
    );
    $("#banner, #nsbanner").append(
        $('<div id="puppetsbox_popup" style="color: white; background-color: rgba(0,0,0,0.8); position: absolute; top: 32px; right: 145px; padding: 8px; border-radius: 8px; display: none;">'
          + '<span id="listPuppets"></span>'
          + '<a id="btnClearPuppets" href="javascript:void(0);">Clear Puppets</a><br>'
          + '<a id="btnAddPuppet" href="javascript:void(0);">Add Puppet</a></div>')
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

function regionPage(regionSettings) {
    //--------------------
    //Custom titles
    if (regionSettings.titles) {
        if (regionSettings.titles.delegate)
            $("strong:contains(WA Delegate:)").text(regionSettings.titles.delegate + ":");
        if (regionSettings.titles.founder)
            $("strong:contains(Founder:)").text(regionSettings.titles.founder + ":");
    }
    
    //--------------------
    //Embedded IRC
    if (regionSettings.irc) {
        var ircURL = "https://kiwiirc.com/client/";
        if (regionSettings.irc.server) {
            ircURL += regionSettings.irc.server + "/";
            if (regionSettings.irc.channel)
                ircURL += regionSettings.irc.channel;
            $('<iframe src="' + ircURL + '" style="border:0; width:100%; height:450px;"></iframe><div class="hzln"></div>').insertBefore($("h2:contains(Today's World Census Report)"));
        }
    }
    
    //--------------------
    //Infinite RMB scroll
    var rmb = $(".rmbtable2");
    rmb.children().each(function(i, entry) {
        $(entry).linkify();
        rmb.prepend(entry); //Reverse order so newest are at top.
    });
    $(".rmbolder").hide(); //GO AWAI!
    
    $("form#rmb").insertBefore(rmb.parent()); //Move the 'Leave a Message' form.
    
    //Add scroll detector
    $('<div id="infiniteScroll" style="border: 1px #CCC solid; border-radius: 12px; margin-top: 4px; margin-bottom: 4px; padding: 0 8px 0 12px; background-color: #FDFFFC; text-align: center; font-weight: bold; margin-left: 18%; margin-right: 18%; min-height: 18px; color: #AAA;"></div>')
    .html("Infinite Scroll!")
    .insertAfter(rmb.parent());
    
    infiniteScroll();
    
    //--------------------
    //Live RMB updates
    updateRMB();
}

function dispatchEditor() {
    if ($("textarea[name=\"message\"]").val().split("\n").length >= 3)
        regionSettings = JSON.parse(atob($("textarea[name=\"message\"]").val().split("\n")[2]));
    
    //Create fields
    $("<tr></tr>").append($('<td class="leftside">Founder Title:</td>')).append($("<td></td>").append($('<input id="settingTitleFounder">').keyup(updateDispatchJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());
    $("<tr></tr>").append($('<td class="leftside">Delegate Title:</td>')).append($("<td></td>").append($('<input id="settingTitleDelegate">').keyup(updateDispatchJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());
    $("<tr></tr>").append($('<td class="leftside">IRC Server:</td>')).append($("<td></td>").append($('<input id="settingIRCServer">').keyup(updateDispatchJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());
    $("<tr></tr>").append($('<td class="leftside">IRC Channel:</td>')).append($("<td></td>").append($('<input id="settingIRCChannel">').keyup(updateDispatchJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());
    
    //Populate fields
    $("#settingTitleFounder").val((regionSettings.titles && regionSettings.titles.founder) ? regionSettings.titles.founder : "Founder");
    $("#settingTitleDelegate").val((regionSettings.titles && regionSettings.titles.delegate) ? regionSettings.titles.delegate : "WA Delegate");
    $("#settingIRCServer").val((regionSettings.irc && regionSettings.irc.server) ? regionSettings.irc.server : "");
    $("#settingIRCChannel").val((regionSettings.irc && regionSettings.irc.channel) ? regionSettings.irc.channel : "");
}

//====================
//LibreNS++ functions
var rmbOffset = 0;
function infiniteScroll() { //Triggered at intervals. Handles infinite scrolling.
    if ($("#infiniteScroll").offset().top <= $(window).scrollTop() + $(window).height()) { //Check if #infiniteScroll is in view.
        //Load new RMB messages.
        $("#infiniteScroll").html("Loading&hellip;");
        rmbOffset += 10;
        $.get("/page=ajax/a=rmb/region=" + window.location.href.substring(window.location.href.indexOf("/region=") + 8) + "/offset=" + rmbOffset, function(data) {
            if (data.length > 1) {
                $($(data).get().reverse()).insertAfter(".rmbrow:last").linkify();
                $("#infiniteScroll").html("Infinite Scroll!");
                setTimeout(infiniteScroll, 500);
            } else {
                $("#infiniteScroll").html("At earliest message.");
                rmbOffset -= 10;
            }
        });
    } else {
        setTimeout(infiniteScroll, 500);
    }
}

function updateRMB() { //Triggered at intervals. Looks for live RMB updates.
    $.get("/page=ajax/a=rmb/region=" + window.location.href.substring(window.location.href.indexOf("/region=") + 8) + "/offset=0", function(data) {
        $(data).each(function(i, post) {
            if ($("div#" + post.id).length == 0) { //It's a new post!
                $(post).insertBefore(".rmbrow:first").linkify();
                rmbOffset += 1;
            } else {
                $("div#" + post.id).html($(post).html()).linkify();
            }
        });
    });
    
    setTimeout(updateRMB, 5000);
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

function updateDispatchJSON() {
    $("textarea[name=\"message\"]").val(
        "This dispatch is automatically generated by LibreNS++ (http://forum.nationstates.net/viewtopic.php?f=15&t=304199). Edit manually at your own risk!\n\n"
        + btoa("{"
               + '"titles":{"founder":"'+ $("#settingTitleFounder").val() + '","delegate":"' + $("#settingTitleDelegate").val() + '"},'
               + '"irc":{"server":"' + $("#settingIRCServer").val() + '","channel":"' + $("#settingIRCChannel").val() + '"}'
               + "}"));
}

//====================
//Utility functions
function getPageBits() {
    return window.location.href.substring(window.location.href.indexOf("nationstates.net/") + 17).split("/");
}

//====================
//Run it!
run();
