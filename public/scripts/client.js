/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const arbitaryTime = 1619030849; // Unix time of when i created this

// STIL STRUGGLING TO IMPLIMENT TIMEAGO
$(document).ready(function () {

  // #theForm is the form connected to the Tweet button
  $( "#theForm" ).submit(function( event ) {
    event.preventDefault();    
    
    if($("#tweet-text").val().length > maxChar){
      alert( "No one has time for read your tweet. Make it shorter. Infact keep it under 140 characters." );
      return;
    }

    if ($("#tweet-text").val().length === 0) {
      alert( "You didn't enter anything. No text, no tweet!!!!" );
      return;
    }

    $.ajax({
      url:'./tweets',
      type: 'POST',
      data:$(this).serialize()})
      .then(()=>{
        refreshTweets();
      });

      $("#tweet-text").val('');
  });


// $(function() {
//   const $button = $('#load-more-posts');
//   $button.on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });
// });




  const renderTweets = function (twtObj) {
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
      <time class='timeSinceTweet'>${twtObj.created_at}</time>
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
  const renderAllTweets = function($tweetData) {
    let backwardsTweetArray = [];
    $tweetData.slice().reverse()
    .forEach(function(item) {
      backwardsTweetArray.push(item)});

      $(".tweets").remove();

    for (const tweet of backwardsTweetArray) {
      const $tweet = renderTweets(tweet);
      $("main").append($tweet); // to add   
    }
  }

  const refreshTweets =function () {
    loadTweets()  
    .then(renderAllTweets, null)
    .catch(()=>{
      console.log('Failed to load tweets');
    });    
  }
  
  refreshTweets();
});




// const $tweet = $(`<article class="tweet">Hello world</article>`);

// CORRECT TIMEAGO USAGE
// console.log(date);

// console.log(timeago.format(date));
