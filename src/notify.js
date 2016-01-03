// Notification sound only
function loadNotifySound() {
    $("body").prepend('<audio id="librenspp-notification-sound"><source type="audio/ogg" src="data:audio/ogg;base64,asset(notify.ogg)"></audio>');
}

function notifySound() {
    $("audio#librenspp-notification-sound").get(0).play();
}

// dot notifications
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

// Desktop notification API
function notifyDesktop(title, text) {
  function give() {
    Notification(title, {body: text});
  }

  if (!("Notification") in window) {
    return;
  }

  if (Notification.permission === "granted") {
    give();
    return;
  }

  if (Notification.permission === "denied") {
    return;
  }

  Notification.requestPermission(function(per) {
    if (per === "granted") {
      give();
    }
  });
}
