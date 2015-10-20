function cosmetic() {
    $(".panelcontent").css("margin-left", "0px")
                      .css("border-top-left-radius", "0px")
                      .css("border-bottom-left-radius", "0px");
    $("#accessiblitylink").hide(); // This is a typo in NS, don't change it unless NS changes it
    $("#nationcover").css("box-shadow", "0px 4px 4px 0px rgba(0, 0, 0, 0.5)");
}

// This messes with the footer a little bit on pages that are shorter than your screen height.
function floatingSidebar() {
    $("#panel").css("position", "fixed");
}