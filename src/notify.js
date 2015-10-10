function loadNotifySound() {
    $("body").prepend('<audio id="librenspp-notification-sound"><source type="audio/ogg" src="data:audio/ogg;base64,asset(notify.ogg)"></audio>');
}

function notifySound() {
    $("audio#librenspp-notification-sound").get(0).play();
}

function signal() {
    appendSignal("#librenspp .belcontent", "!");
}

function appendSignal(query, content) {
    if (rift) {
        if ($(query + " .notificationnumber").length == 0) {
            $(query).append('<div style="font-weight: 700;" class="notificationnumber"></div>');
        }
        $(query + " .notificationnumber").html(content).show();
    }
}
