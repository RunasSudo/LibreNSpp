function newspaperPage(dispatch, newspaperData) {
    $("#content").append($('<h1></h1>').text(newspaperData.title));
    if (newspaperData.submitTo) {
        $("#content").append('<p><a href="/page=compose_telegram?tgto=' + sanitize(newspaperData.submitTo) + '&x-librenspp=newspaperSubmit=' + dispatch + '">Submit Article</a></p>');
    }
    if (newspaperData.posts) {
        for (var i = newspaperData.posts.length - 1; i >= 0; i--) {
            $("#content").append($('<h2></h2>').text(newspaperData.posts[i].title));
            $("#content").append($('<p></p>').html(doBBCode(sanitize(newspaperData.posts[i].content))));
            $("#content").append('<br>');
        }
    }
}

function doBBCode(string) {
    return string
        .replace(/\[b\](.*?)\[\/b\]/ig, '<b>$1</b>')
        .replace(/\[i\](.*?)\[\/i\]/ig, '<i>$1</i>')
        .replace(/\[u\](.*?)\[\/u\]/ig, '<u>$1</u>')
        .replace(/\[img\](.*?)\[\/img\]/ig, '<img src="$1">')
        .replace(/\[img=([0-9]+)x([0-9]+)\](.*?)\[\/img\]/ig, '<img width="$1" height="$2" src="$3">')
        .replace(/\[size=([0-9]+)\](.*?)\[\/size\]/ig, '<span style="font-size:$1">$2</span>')
        .replace(/\[quote=(.*?)\](.*?)\[\/quote\]/ig, '<table><tr><td>$2</td></tr><tr style="text-align:right;"><td>&mdash;$1</td></tr></table>')
        .replace(/\n/g, '<br>')
        .replace(/&amp;\\;/g, ''); //Regex too hard. Make user suffer instead :P
}
