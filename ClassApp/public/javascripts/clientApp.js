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

		// PRIVATE METHODS
		buttonHandler = function(e) {
      if ($('#estDisp').text() != 'Waiting for vote to start')
      {
        var estimate = $(this).val();
        var username = getQueryVariable('username');
        var est = { user: username, estimate: estimate };      
        $("#estDisp").text('Your current estimate is ' + est.estimate);
        socket.emit('est', est);
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
      $(estDisp).text(voteStartMessage);
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