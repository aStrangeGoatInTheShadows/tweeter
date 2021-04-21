/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// import { format } from 'timeago.js';

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


// const arbitaryTime = 1619030849; // Unix time of when i created this

// STIL STRUGGLING TO IMPLIMENT TIMEAGO
$(document).ready(function () {
  // const tweetDate = 1618714861;
  // $('.timeSinceTweet').append(timeago.format(Date.now() - tweetDate));  

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

  const createTweetElement = function () { 
    //     You can then easily create HTML markup using template literals or template strings. See here for a quick refresher: https://wesbos.com/template-strings-html/

    // This function shouldn't insert the created DOM structure to the page. It should instead just return the $tweet to the caller
    // You can test your function like so:

  };

  const renderAllTweets = function($tweetData) {
    // for (const tweet of tweets) {
    // }
    const $tweet = renderTweets($tweetData[0]);

    $("main").append($tweet); // to add   
    // $('.tweets').replaceWith($tweet); // to add   
  }

  // Test / driver code (temporary)
  // console.log('hello world'); // to see what it looks like
  
  renderAllTweets(data);
});



// const $tweet = $(`<article class="tweet">Hello world</article>`);

// CORRECT TIMEAGO USAGE
// console.log(date);

// console.log(timeago.format(date));
