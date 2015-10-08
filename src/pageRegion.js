function regionPage(regionSettings) {
    //--------------------
    //Custom titles
    if (regionSettings.titles && settings["regionCustomise"]) {
        if (regionSettings.titles.delegate)
            $("strong:contains(WA Delegate:)").text(regionSettings.titles.delegate + ":");
        if (regionSettings.titles.founder)
            $("strong:contains(Founder:)").text(regionSettings.titles.founder + ":");
    } else if (settings.nsppTitles && settings["regionCustomise"]) { //Only load if LibreNS++ settings not present.
        $.getJSON("https:/" + "/nationstatesplusplus.net/api/region/title/?region=" + window.location.pathname.substring(window.location.pathname.indexOf("/region=") + 8), function(nsppTitles) {
            //nsppTitles is already a JSON object.
            if (nsppTitles) {
                if (nsppTitles.delegate_title)
                    $("strong:contains(WA Delegate:)").text(nsppTitles.delegate_title + ":");
                if (nsppTitles.founder_title)
                    $("strong:contains(Founder:)").text(nsppTitles.founder_title + ":");
            }
        });
    }

    //--------------------
    //Embedded IRC
    if (regionSettings.irc && settings["regionCustomise"] && settings["regionIRC"]) {
        var ircURL = "https:/" + "/kiwiirc.com/client/";
        if (regionSettings.irc.server) {
            ircURL += regionSettings.irc.server + "/";
            if (regionSettings.irc.channel)
                ircURL += regionSettings.irc.channel;
            $('<iframe src="' + ircURL + '" style="border:0; width:100%; height:450px;"></iframe><div class="hzln"></div>').insertBefore($("h2:contains(Today's World Census Report)"));
        }
    }

    //--------------------
    //Infinite RMB scroll
    if (settings["infiniteRMBScroll"]) {
        var rmb = $(".rmbtable2");
        if (rmb.length > 0) {
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
        }
    }
    

    //--------------------
    //Live RMB updates
    if (settings["liveRMBupdate"]) {
        updateRMB();
    }
    
    //--------------------
    //Security code updater
    $("form#rmb").submit(onPostRMB);
}

var rmbOffset = 0;

function infiniteScroll() { //Triggered at intervals. Handles infinite scrolling.
    if ($("#infiniteScroll").offset().top <= $(window).scrollTop() + $(window).height()) { //Check if #infiniteScroll is in view.
        //Load new RMB messages.
        $("#infiniteScroll").html("Loading&hellip;");
        rmbOffset += 10;
        $.get("/page=ajax/a=rmb/region=" + window.location.pathname.substring(window.location.pathname.indexOf("/region=") + 8) + "/offset=" + rmbOffset, function(data) {
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
    $.get("/page=ajax/a=rmb/region=" + window.location.pathname.substring(window.location.pathname.indexOf("/region=") + 8) + "/offset=0", function(data) {
        $(data).each(function(i, post) {
            if (post.id) { //Only process it if it's a post.
                if ($("div#" + post.id).length == 0) { //It's a new post!
                    $(post).insertBefore(".rmbrow:first").linkify();
                    rmbOffset += 1;
                } else {
                    $("div#" + post.id).html($(post).html()).linkify();
                }
            }
        });
    });

    setTimeout(updateRMB, 5000);
}

function onPostRMB() { //Triggered when submitting a new post to the RMB. Used to refresh the security code.
    var code = undefined;
    $.ajax({
        url: window.location,
        success: function(data) {
            code = $(data).find("[name='chk']").val();
        },
        async: false
    });
    if (code) {
        $("[name='chk']").val(code);
    }
    return true;
}
