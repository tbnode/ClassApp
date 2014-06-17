/*
 * JavaScript Example
 * @author: swider
 */

var App = (function(win, doc, $){

	var
		// CONFIG
		containerSel = '#container',
		buttonSel = '.button',
    
		// PRIVATE VARIABLES
		$container,
		$button,
    socket,
    voted = false,

		// PRIVATE METHODS
		buttonHandler = function(e) {
      var text = $('#estDisp').text(),
          regex1 = new RegExp(/^Waiting/),
          regex2 = new RegExp(/^Voting has ended/),
          fail1 = text.match(regex1),
          fail2 = text.match(regex2);
      
      if (!fail1 && !fail2)
      {
        var estimate = $(this).val();
        var username = getQueryVariable('username');
        var est = { user: username, estimate: estimate };      
        $("#estDisp").text('Your current estimate is ' + est.estimate);
        socket.emit('est', est);
        voted = true;
        e.preventDefault();
      }
		},
    
    getQueryVariable = function(variable)
    {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return(false);
    },
    
    voteStartHandler = function(voteStartMessage){
      $('#estDisp').text(voteStartMessage);
    },
    
    voteEndHandler = function(voteEndMessage){      
      var newMessage = voteEndMessage + '  You forgot to vote.';
      if (voted) {
        var est = $('#estDisp').text().split(' ')[4];
        newMessage = voteEndMessage + '  Your estimate was ' + est;
      }
      $('#estDisp').text(newMessage);
    },

		// KICK OFF
		init = function(){
      socket = io();
			$container = $(containerSel);
			$button = $container.find(buttonSel);
      
      var username = getQueryVariable('username');
      var welcomeMsg = '<h1>' + username + '\'s Estimate' + '<h1>';
      $('#welcome').html(welcomeMsg);
     
      socket.emit('join', username + ' has joined.');
      socket.on('vote start broadcast', voteStartHandler);
      socket.on('vote end broadcast', voteEndHandler);

			$button.on('click', buttonHandler);
		};
    

	// EXPOSE WHAT YOU NEED
	return {
		init: init
	}
})(window, document, jQuery);


$(function(){
  App.init();
});