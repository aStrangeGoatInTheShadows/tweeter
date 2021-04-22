/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// import { format } from 'timeago.js';

let globalVar = null;

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]


// const arbitaryTime = 1619030849; // Unix time of when i created this

// STIL STRUGGLING TO IMPLIMENT TIMEAGO
$(document).ready(function () {


/////////////////////////////////////////////////// WORKING below //////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// WORKING below //////////////////////////////////////////////////////////////////////////////////////////////////////

  // #theForm is the form connected to the Tweet button
  $( "#theForm" ).submit(function( event ) {
    event.preventDefault();    
    
    if($("#tweet-text").val().length > maxChar){
      alert( "You can't submit a tweet with over 140 characters." );
      return;
    }

    $.ajax({
      url:'./tweets',
      type: 'POST',
      data:$(this).serialize()})
      .then(()=>{
        // updatePage();
      });
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


/////////////////////////////////////////////////// WORKING ABOVE //////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// WORKING ABOVE //////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA
//////////////////////// MUST PARSE JSON AND RENDER DATA


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

  ////////////////////////////////////////////////////////////////// Load tweets ////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////// Load tweets ////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////// Load tweets ////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////// Load tweets ////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////// Load tweets ////////////////////////////////////////////////////////////////// 

  const loadTweets = () => {   
    return $.getJSON('./tweets/');
  }


  // This loops through an array of tweets and appends them to the dom
  const renderAllTweets = function($tweetData) {
    for (const tweet of $tweetData) {
      const $tweet = renderTweets(tweet);
      $("main").append($tweet); // to add   
    }
  }
  
  loadTweets()  
    .then(renderAllTweets, null)
    .catch(()=>{
      console.log('Failed to load tweets');
    });    
  
});



// const $tweet = $(`<article class="tweet">Hello world</article>`);

// CORRECT TIMEAGO USAGE
// console.log(date);

// console.log(timeago.format(date));
