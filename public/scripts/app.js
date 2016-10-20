$(document).ready(function () {

    //functions to create the tweet template then move the tweet db info into it
    function renderTweets(tweetsList) {
      $('.tweet-feed').empty();

      var sortTweets = tweetsList.sort(function (a, b) {
        return a.created_at < b.created_at;
      });
      sortTweets.forEach(function (tweet) {
        $('.tweet-feed').append(createTweetElement(tweet));
      });
    }



    function createTweetElement(obj) {
      var $tweet =
          `<article>
          <header class="tweet-head">
            <img class="avatar" src=${obj.user.avatars.small}>
            <h3>${obj.user.name}</h3><p class="handle">${obj.user.handle}</p>
          </header>
          <main>
            <p>${obj.content.text}</p>
          </main>
          <footer class="tweet-foot">
          <p>${obj.created_at}</p>
          <img class="icons" src="/images/reply-action.png">
          <img class="icons" src="/images/retweet-action.png">
          <img class="icons" src="/images/like-action.png">
          </footer>
        </article>`
        return $tweet;
    }


      //load tweets from db
    function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        success: function (moreTweets) {
          console.log('Success: ', moreTweets);
          renderTweets(moreTweets)
        }
      });
    };

        loadTweets();

        //new tweet form functionality with logic/error msgs for empty or long text input
        // also clears the textarea after successful tweet submission
    $('#tweet-form').submit(function (ev) {
        ev.preventDefault();
        var $postData = $(this).serialize();
        var $textVal = $(this).find('textarea').val();
        if ($textVal.length > 140) {
            $('#flash').append("You're too verbose. Less than 140 characters, please.")
        } if ($textVal === "") {
            $('#flash').append("Duh, you didn't put anything. Write something this time.")
        } else {
        $.ajax({
            url:'/tweets',
            method: 'POST',
            data: $postData,
            success: function (result) {
              console.log('Success: ', result);
              loadTweets()
            }
        }); } $('#text-area').val('');
    });

      //functionality for compose new tweet form to appear/disappear on compose button click
    $('#compose-button').click(function () {
      $('.new-tweet').slideToggle( "slow", function () {
        $('#text-area').focus();
      });
    });

      //functionality for reply/retweet/like icons to appear/disappear on hover/no hover
    $(".icons").hide();
    $(".tweet-feed").mouseenter(function() {
      $(".icons").show();
    });
    $(".tweet-feed").mouseleave(function() {
      $(".icons").hide();
    });
});
