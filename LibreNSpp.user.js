// ==UserScript==
// @name       LibreNS++
// @namespace  https://github.com/RunasSudo/LibreNSpp
// @version    0.0a6
// @description  Free as in 'free speech', 'free beer' and 'free from tyranny'.
// @match      http://*.nationstates.net/*
// @match      https://*.nationstates.net/*
// @copyright  2014, RunasSudo
// ==/UserScript==

//====================
//Basic Code
function run() {
    //--------------------
    //Region page things
    if (getPageBits().length == 1 && getPageBits()[0].indexOf("region=") == 0) { //Are we on the RMB page?
        //--------------------
        //Load region settings
        var regionSettings;
        if ($(".dispatchlist h3").get(0)) {
            if ($(".dispatchlist h3 a").get(0).innerText == "LibreNS++") {
                $.get($(".dispatchlist h3 a").get(0).href, function(data) {
                    regionSettings = $.parseJSON(atob($(data).find("#dispatch p").get(0).innerText));
                    
                    //Settings dependent stuff
                    //--------------------
                    //Custom titles
                    if (regionSettings.titles) {
                        if (regionSettings.titles.delegate)
                            $("strong:contains(WA Delegate:)").text(regionSettings.titles.delegate + ":");
                        if (regionSettings.titles.founder)
                            $("strong:contains(Founder:)").text(regionSettings.titles.founder + ":");
                    }
                });
            }
        }
        
        //--------------------
        //Infinite RMB scroll
        var rmb = $(".rmbtable2");
        rmb.children().each(function(i, entry) {
            rmb.prepend(entry); //Reverse order so newest are at top.
        });
        $(".rmbolder").hide(); //GO AWAI!
        
        $("form#rmb").insertBefore(rmb.parent()); //Move the 'Leave a Message' form.
        
        //Add scroll detector
        $("<div id=\"infiniteScroll\" style=\"border: 1px #CCC solid; border-radius: 12px; margin-top: 4px; margin-bottom: 4px; padding: 0 8px 0 12px; background-color: #FDFFFC; text-align: center; font-weight: bold; margin-left: 18%; margin-right: 18%; min-height: 18px; color: #AAA;\"></div>")
        .html("Infinite Scroll!")
        .insertAfter(rmb.parent());
        
        infiniteScroll();
        
        //--------------------
        //Live RMB updates
        updateRMB();
    }
    
    //--------------------
    //Puppet Switcher
    $("#banner, #nsbanner").prepend(
        $("<div id=\"puppetsbox\" style=\"position: absolute; top: 0; right: 130px; margin: 6px 16px 0 0; z-index: 100;\"></div>")
        .html("<a id=\"puppetsbox_button\" href=\"javascript:void(0);\" style=\"color: white; font-weight: bold; font-size: 8pt; padding: 2px 8px 2px 8px; background: black; background-color: rgba(0,0,0,0.2); border-radius: 8px; zoom: 1;\">"
              + "Puppets</a>")
    );
    $("#banner, #nsbanner").append(
        $("<div id=\"puppetsbox_popup\" style=\"color: white; background-color: rgba(0,0,0,0.8); position: absolute; top: 32px; right: 145px; padding: 8px; border-radius: 8px; display: none;\">"
          + "<span id=\"listPuppets\"></span>"
          + "<a id=\"btnClearPuppets\" href=\"javascript:void(0);\">Clear Puppets</a><br>"
          + "<a id=\"btnAddPuppet\" href=\"javascript:void(0);\">Add Puppet</a></div>")
    );
    $("#puppetsbox_button").click(function() {
        $("#puppetsbox_popup").fadeToggle();
    });
    $("#btnClearPuppets").click(function() {
        var allSettings = GM_listValues();
        for (i = 0; i < allSettings.length; i++) {
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
                $($(data).get().reverse()).insertAfter(".rmbrow:last");
                $("#infiniteScroll").html("Infinite Scroll!");
            } else {
                $("#infiniteScroll").html("At earliest message.");
                rmbOffset = -1;
            }
        });
    }
    
    if (rmbOffset >= 0) { //Stop if at earliest message.
        setTimeout(infiniteScroll, 1000);
    }
}

function updateRMB() { //Triggered at intervals. Looks for live RMB updates.
    $.get("/page=ajax/a=rmb/region=" + window.location.href.substring(window.location.href.indexOf("/region=") + 8) + "/offset=0", function(data) {
        $(data).each(function(i, post) {
            if ($("div#" + post.id).length == 0) { //It's a new post!
                $(post).insertBefore(".rmbrow:first");
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
            var link = $("<a href=\"javascript:void(0);\">" + atob(value.substring(0, value.indexOf(":"))) + "</a>");
            
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
    }
}

//====================
//Utility functions
function getPageBits() {
    return window.location.href.substring(window.location.href.indexOf("nationstates.net/") + 17).split("/");
}

//====================
//Run it!
run();
