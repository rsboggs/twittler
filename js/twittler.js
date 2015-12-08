var currentUser = 'All Users';
var stream = streams.home;
var index = 0;
var visitor = 'guest';

var showTweets = function(user) {
  var $content = $('.content');

  if (user === undefined) {
    user = 'All Users';
  }

  if (user !== currentUser) {
    currentUser = user;
    index = 0;
    $content.html('');
    $('.user_selected').text(currentUser);
    stream = (user === 'All Users') ? streams.home : streams.users[user.slice(1)];
  }

  while(index < stream.length) {
    var tweet = stream[index];
    var $tweet = $('<article><span class="user">' +'@' + tweet.user
          + '</span><span class="time" data-livestamp="'
          + tweet.created_at.toISOString() + '">'
          + '</span><br /><span class="message">' + tweet.message
          + '</span></article>');
    $tweet.prependTo($content);
    index++;
  }

  // Set height of aside element to match content on page
  var height = $('.tweet-section').height() - 20;
  $('aside').height(height);

  $('.refresh-button').hide();

  var checkStatus = function() {
    if (index < stream.length) {
      $('.refresh-button').slideDown();
    } else {
      setTimeout(checkStatus, 3000);
    }
  }

  checkStatus();
}

var newTweets = function() {
  var message = $('input[name=message]').val();
  streams.users[visitor] = streams.users[visitor] || [];
  writeTweet(message);
  showTweets();
  $('input[name=message]').val('');
};

// Event handling
$(window).load(function(){

  showTweets();

  $(document).on('click', '.user', function() {
    var clickedUser = $(this).text();
    showTweets(clickedUser);
  });

  $('header').on('click','h1', function() {
    showTweets();
  });

  $('.refresh-button').on('click', function() {
    if (currentUser === 'All Users') {
      showTweets();
    } else {
      showTweets(currentUser);
    }
  });

  $('.new-tweet').on('click', function() {
    event.preventDefault();
    newTweets();
  });

});

