/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  // User clicks to open dialogue to create a tweet
  $(".composeTweet").on('click', function () {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow", () => { });
      document.getElementById("tweet-text").focus();
      return;
    }

    $(".new-tweet").slideUp("slow", () => { });
  });

  // Displays an error message (no validation is done here)
  const showTweetError = function (msg) {
    $(".tweetSubmissionError").text((msg));
    $(".tweetSubmissionError").slideDown("slow", () => { });
  }

  // This checks the 
  const submitATweet = function (event) {
    event.preventDefault();
    let wait = 0; // Wait time to clear error in milliseconds

    // User tries to write a tweet thats too long
    if ($("#tweet-text").val().length > maxChar) {
      showTweetError(`Your not that interesting. keep it under ${maxChar} Characters!!`);
      return;
    }
    // User tries to send a blank tweet
    if ($("#tweet-text").val().length === 0) {
      showTweetError("Oh come on now little one, your not that boring. Share a thought.");
      return;
    }

    // This is a validish tweet, we just want the user to know that we are onto their tricks
    if ($("#tweet-text").val().includes('<') || $("#tweet-text").val().includes('>')) {
      showTweetError("You're not as smart as you think you are.");
      wait = 5000;
    };

    // Send the tweet to the server
    $.ajax({
      url: './tweets',
      type: 'POST',
      data: $('#theForm').serialize()
    })
    // This reload the tweets and clears any errors
      .then(() => {
        refreshTweets();
        clearTweetError(wait);
      });
    $("#tweet-text").val('');
  }

  // This submits a tweet on upon hitting enter
  $("#theForm").keypress(function (e) {
    if (e.which == 13) {
      submitATweet(event)
    }
  });

  // #theForm is the form connected to the Tweet button
  $("#theForm").submit(function (event) {
    submitATweet(event);
  });

  const clearTweetError = function (wait) {
    return setTimeout(() => {
      $(".tweetSubmissionError").slideUp("fast", () => { });
    }, wait)
  };

  // Creates the dom for a singular tweet
  const renderTweets = function (twtObj) {
    // Creates a variable to represent the time since the weet
    const timeSince = timeago.format(twtObj.created_at);

    // Prevents cross scripting via script injection into the create tweet form
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Creates the html for a tweet
    let $tweetHTML = `<section class='tweets'>
      <header class='tweetHead'>
      <div class='leftTweet'>
      <img id='profilePic' src="${twtObj.user.avatars}">
      <a>${twtObj.user.name}</a>
      </div>
      <p id="userHandle">${twtObj.user.handle}</p>
      </header>
      <div class='tweetContent'><a class='tweetArticle'>${escape(twtObj.content.text)}</a></div>
      <footer class="tweetFooter">
      <time class='timeSinceTweet'>${timeSince}</time>
      <div class="tweetIcons">
      <i id="iFlag" class="fas fa-flag"></i>
      <i id="iRetweet" class="fas fa-retweet"></i>
      <i id="iHeart" class="fas fa-heart"></i>
      </div>
      </footer>
      </section>`;

    return $($tweetHTML);
  };

  // Left for future update with SQL
  const createTweetElement = function () {
    const user = {
      name: data[0].user.name,
      avatars: data[0].user.avatars,
      handle: data[0].user.handle
    }

    const content = {
      text: $("#tweet-text").val()
    };

    const tweetObj = {
      user,
      content,
      created_at: Date.now()
    }

    return tweetObj;
  };

  // Gets the tweets from our server
  const loadTweets = () => {
    return $.getJSON('./tweets/');
  }


  // This loops through an array of tweets and appends them to the dom
  const renderAllTweets = function ($tweetData) {
    let backwardsTweetArray = [];
    $tweetData.slice().reverse()
      .forEach(function (item) {
        backwardsTweetArray.push(item)
      });

      // Completely removes all DOM tweets
    $(".tweets").remove();

    for (const tweet of backwardsTweetArray) {
      const $tweet = renderTweets(tweet);
      $("main").append($tweet);  
    }
  }

  // Refreshes all tweets on the page
  const refreshTweets = function () {
    loadTweets()
      .then(renderAllTweets, null)
      .catch(() => {
        console.log('Failed to load tweets');
      });
  }

  // its an init function init
  const init = function () {
    $(".new-tweet").hide();
    $(".tweetSubmissionError").hide();
  }

  init();
  refreshTweets();
});

