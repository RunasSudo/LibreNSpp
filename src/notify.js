function loadNotifySound() {
    $("body").prepend('<audio id="librenspp-notification-sound"><source type="audio/ogg" src="data:audio/ogg;base64,m4_include(sound.base64.txt)"></audio>');
}

function notifySound() {
    $("audio#librenspp-notification-sound").get(0).play();
}