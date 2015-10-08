function cosmetic() {
    $(".panelcontent").css("margin-left", "0px")
                      .css("border-top-left-radius", "0px")
                      .css("border-bottom-left-radius", "0px");
    $("#accessiblitylink").hide(); // This is a typo in NS, don't change it unless NS changes it
}

// This messes with the footer a little bit on pages that are shorter than your screen height.
function floatingSidebar() {
    $("#panel").css("position", "fixed");
}