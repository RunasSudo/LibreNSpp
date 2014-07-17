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
