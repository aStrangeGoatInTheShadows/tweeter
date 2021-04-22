/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const arbitaryTime = 1619030849; // Unix time of when i created this


// STIL STRUGGLING TO IMPLIMENT TIMEAGO
$(document).ready(function () {

  $(".composeTweet").on('click', function () {
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideDown("slow", () => { });
      return;
    }
    $(".new-tweet").slideUp("slow", () => { });
  });

  const showTweetError = function (msg) {
    //alert(msg);
    $(".tweetSubmissionError").text((msg));
    $(".tweetSubmissionError").slideDown("slow", () => { });
  }


  // #theForm is the form connected to the Tweet button
  $("#theForm").submit(function (event) {
    event.preventDefault();
    let wait = 0; // Wait time to clear error in milliseconds

    if ($("#tweet-text").val().length > maxChar) {
      showTweetError("Your not that interesting. keep it under 140 Characters!");
      return;
    }

    if ($("#tweet-text").val().length === 0) {
      showTweetError("Oh come on now little one, your not that boring. Share a thought.");
      return;
    }

    if ($("#tweet-text").val().includes('<') || $("#tweet-text").val().includes('>')) {
      showTweetError("You're not as smart as you think you are.");
    };

    $.ajax({
      url: './tweets',
      type: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        // console.log(this);
        refreshTweets();
      });

    clearTweetError();
  });

  const clearTweetError = function () {
    $(".tweetSubmissionError").slideUp("fast", () => { });
    $("#tweet-text").val('');
  }

  // Creates the dom for a singular tweet
  const renderTweets = function (twtObj) {
    // Creates a variable to represent the time since the weet
    const timeSince = timeago.format(twtObj.created_at);

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweetHTML = `<section class='tweets'>
      <header class='tweetHead'>
      <div class='leftTweet'>
      <img id='profilePic' src="${twtObj.user.avatars}">
      <h5>${twtObj.user.name}</h5>
      <!-- end leftTweet -->
      </div>
      <p id="userName">${twtObj.user.handle}</p>
      <!-- end aTweetHeader -->
      </header>
      <div class='tweetContent'><a class='tweetArticle'>${twtObj.content.text}</a></div>
      <footer>
      <time class='timeSinceTweet'>${timeSince}</time>
      </footer>
      </section>`;

    return $($tweetHTML);
  };

  //////////////////////////////////////////////////// TODO //////////////////////////////////////////////////// //////////////////////////////////////////////////// 
  //////////////////////////////////////////////////// //////////////////////////////////////////////////// //////////////////////////////////////////////////// 
  //////////////////////////////////////////////////// MUST CHANGE DATA[0] TO ACTUAL INPUT
  // Breaks out data from webpage into a tweet object
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

    $(".tweets").remove();

    for (const tweet of backwardsTweetArray) {
      const $tweet = renderTweets(tweet);
      $("main").append($tweet); // to add   
    }
  }

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





// const $tweet = $(`<article class="tweet">Hello world</article>`);

// CORRECT TIMEAGO USAGE
// console.log(date);

// console.log(timeago.format(date));
