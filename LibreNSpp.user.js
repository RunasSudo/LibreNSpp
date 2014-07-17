// ==UserScript==
// @name        LibreNS++
// @namespace   https://github.com/RunasSudo/LibreNSpp
// @version     0.0a12
// @description Free as in 'free speech', 'free beer' and 'free from tyranny'.
// @match       http://*.nationstates.net/*
// @match       https://*.nationstates.net/*
// @require     https://github.com/RunasSudo/LibreNSpp/raw/master/jquery.linkify.min.js
// @require     https://github.com/RunasSudo/LibreNSpp/raw/master/json2.js
// @copyright   2014, RunasSudo
// ==/UserScript==
function allPage() {
    //--------------------
    //Puppet Switcher
    setupPuppets();
}
function setupPuppets() {
    $("#banner, #nsbanner").prepend(
        $('<div id="puppetsbox" style="position: absolute; top: 0; right: 130px; margin: 6px 16px 0 0; z-index: 100;"></div>')
        .html('<a id="puppetsbox_button" href="javascript:void(0);" style="color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;">Puppets</a>')
    );
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
            GM_setValue("puppet_p_" + $("#puppetUsername").val().toLowerCase().replace(" ", "_"), btoa($("#puppetUsername").val()) + ":" + btoa($("#puppetPassword").val()));
            populatePuppets();
            populatePuppetManager();
        }
    });

    populatePuppetManager();
}

function populatePuppets() {
    $("#listPuppets").html("<br>");

    var allSettings = GM_listValues();
    for (i = 0; i < allSettings.length; i++) {
        if (allSettings[i].indexOf("puppet_p_") == 0) {
            var value = GM_getValue(allSettings[i]);
            var link = $('<a href="javascript:void(0);">' + atob(value.substring(0, value.indexOf(":"))) + '</a>');

            link.click(makeSwitchPuppetHandler(value));
            $("#listPuppets").prepend('<br>');
            $("#listPuppets").prepend(link);
        }
    }
}

function populatePuppetManager() {
    $("#puppetList").html("");

    var allSettings = GM_listValues();
    for (i = 0; i < allSettings.length; i++) {
        if (allSettings[i].indexOf("puppet_p_") == 0) {
            var value = GM_getValue(allSettings[i]);

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
        var value = GM_getValue(name);
        GM_deleteValue(name);
        GM_setValue(name, value);
        populatePuppets();
        populatePuppetManager();
    };
}

function makeDeletePuppetHandler(name) {
    return function() {
        GM_deleteValue(name);
        populatePuppets();
        populatePuppetManager();
    };
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
    //Regional Newspaper
    if (regionSettings.newspaper) {
        var dispatch = parseInt(regionSettings.newspaper); //Safe!*
        $.get("/page=dispatch/id=" + dispatch, function(data) {
            var newspaper = JSON.parse(atob($(data).find("#dispatch p").get(0).innerText));
            $('<p><strong>Newspaper:</strong> <a href="/page=blank/x-librenspp=newspaper=' + dispatch + '">' + sanitize(newspaper.title) + '</a></p>').insertBefore($(".wfe"));
        });
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
function newspaperPage(dispatch, newspaperData) {
    $("#content").append($('<h1></h1>').text(newspaperData.title));
    if (newspaperData.submitTo) {
        $("#content").append('<p><a href="/page=compose_telegram?tgto=' + sanitize(newspaperData.submitTo) + '&x-librenspp=newspaperSubmit=' + dispatch + '">Submit Article</a></p>');
    }
    if (newspaperData.posts) {
        for (var i = 0; i < newspaperData.posts.length; i++) {
            $("#content").append($('<h2></h2>').text(newspaperData.posts[i].title));
            $("#content").append($('<p></p>').html(doBBCode(sanitize(newspaperData.posts[i].content))));
        }
    }
}

function doBBCode(string) {
    return string
        .replace(/\[b\](.*?)\[\/b\]/ig, '<b>$1</b>')
        .replace(/\[i\](.*?)\[\/i\]/ig, '<i>$1</i>')
        .replace(/\[u\](.*?)\[\/u\]/ig, '<u>$1</u>')
        .replace(/\n/g, '<br>')
        .replace(/&amp;\\;/g, ''); //Regex too hard. Make user suffer instead :P
}
function newspaperEditor() {
    var newspaperSettings = {};
    if ($("textarea[name=\"message\"]").val().split("\n").length >= 3)
        newspaperSettings = JSON.parse(atob($("textarea[name=\"message\"]").val().split("\n")[2]));

    //Create fields
    $("<tr></tr>").append($('<td class="leftside">Newspaper Title:</td>')).append($("<td></td>").append($('<input id="settingTitle">').keyup(updateNewspaperJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());
    $("<tr></tr>").append($('<td class="leftside">Dispatch Owner:</td>')).append($("<td></td>").append($('<input id="settingSubmitTo">').keyup(updateNewspaperJSON))).insertBefore($("textarea[name=\"message\"]").parent().parent());

    //Populate fields
    $("#settingTitle").val(newspaperSettings.title ? newspaperSettings.title : "");
    $("#settingSubmitTo").val(newspaperSettings.submitTo ? newspaperSettings.submitTo : "");
}

function updateNewspaperJSON() {
    var json = "{";
    json += '"title":"' + $("#settingTitle").val() + '",';
    json += '"submitTo":"' + $("#settingSubmitTo").val() + '"';
    json += "}";

    $("textarea[name=\"message\"]").val("This dispatch is automatically generated by LibreNS++ (http://forum.nationstates.net/viewtopic.php?f=15&t=304199). Edit manually at your own risk!\n\n" + btoa(json));
}
function dispatchEditor() {
    var regionSettings = {};
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

function updateDispatchJSON() {
    var json = "{";
    json += '"titles":{"founder":"' + $("#settingTitleFounder").val() + '","delegate":"' + $("#settingTitleDelegate").val() + '"},';
    json += '"irc":{"server":"' + $("#settingIRCServer").val() + '","channel":"' + $("#settingIRCChannel").val() + '"}';
    json += "}";

    $("textarea[name=\"message\"]").val("This dispatch is automatically generated by LibreNS++ (http://forum.nationstates.net/viewtopic.php?f=15&t=304199). Edit manually at your own risk!\n\n" + btoa(json));
}
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
    //Newspaper things
    if (getPageBits().length == 2 && getPageBits()[0] == "page=blank" && getPageBits()[1].indexOf("x-librenspp=newspaper=") == 0) {
        var dispatch = parseInt(getPageBits()[1].substring(22));
        $.get("/page=dispatch/id=" + dispatch, function(data) {
            newspaperPage(dispatch, JSON.parse(atob($(data).find("#dispatch p").get(0).innerText)));
        });
    }

    //--------------------
    //Dispatch editors
    if (getPageBits().length == 2 && getPageBits()[0] == "page=dispatch") {
        var baseEdit = $(".dispatchbyline .smalltext a").attr("href");
        $(".dispatchbyline .smalltext a").parent().append(' | <a href="' + baseEdit + '/x-librenspp=regionalSettings">as Regional Settings</a> | <a href="' + baseEdit + '/x-librenspp=newspaper">as Newspaper</a>');
    }
    if (getPageBits().length == 3 && getPageBits()[0] == "page=create_dispatch" && getPageBits()[2] == "x-librenspp=regionalSettings") {
        dispatchEditor();
    }
    if (getPageBits().length == 3 && getPageBits()[0] == "page=create_dispatch" && getPageBits()[2] == "x-librenspp=newspaper") {
        newspaperEditor();
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

function sanitize(string) {
    return $('<div></div>').text(string).html();
}

run();
