function newspaperPage(dispatch, newspaperData) {
    $("#content").append($('<h1></h1>').text(newspaperData.title));
    if (newspaperData.submitTo) {
        $("#content").append('<p><a href="/page=compose_telegram?tgto=' + sanitize(newspaperData.submitTo) + '&x-librenspp=newspaperSubmit=' + dispatch + '">Submit Article</a></p>');
    }
    if (newspaperData.posts) {
        for (var i = 0; i < newspaperData.posts.length; i++) {
            $("#content").append($('<h2></h2>').text(newspaperData.posts[i].title));
            $("#content").append($('<p></p>').text(newspaperData.posts[i].content));
        }
    }
}
