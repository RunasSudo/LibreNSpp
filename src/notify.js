function loadNotifySound() {
    $("body").prepend('<audio id="librenspp-notification-sound"><source type="audio/ogg" src="data:audio/ogg;base64,asset(notify.ogg)"></audio>');
}

function notifySound() {
    $("audio#librenspp-notification-sound").get(0).play();
}

function signal() {
    appendSignal("#librenspp", "!");
}

function appendSignal(query, content) {
    if (rift) {
        if ($(query + " .belcontent .notificationnumber").length == 0) {
            $(query).append('<div style="font-weight: 700;" class="notificationnumber"></div>');
        }
        $(query + " .belcontent .notificationnumber").html(content).show();
    } else {
        if ($(query + " a .notificationnumber2").length == 0) {
            $(query + " a").append(' <span style="color: #f44336;" class="notificationnumber2"></span>');
        }
        $(query + " a .notificationnumber2").html("(" + content + ")").show();
    }
}
