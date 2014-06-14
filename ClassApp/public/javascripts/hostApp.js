/*
 * JavaScript Example
 * @author: swider
 */

var App = (function(win, doc, $){

	var
		// CONFIG
		containerSel = '#container',
		buttonSel = '#button',

		// PRIVATE VARIABLES
		$container,
		$button,
    votesArray = [],
    socket = io(),

		// PRIVATE METHODS
		buttonHandler = function(e) {
			console.log('Button clicked!');
			e.preventDefault();
		},
      
    voteHandler = function (data){
      console.log('Vote Handled', data);
    },
      
		// KICK OFF
		init = function(){
      console.log('initialized host');
			$container = $(containerSel);
			$button = $container.find(buttonSel);
      socket = io();

			$button.on('click', buttonHandler);
      socket.on('Vote Broadcast', voteHandler);
		};

	// EXPOSE WHAT YOU NEED
	return {
		init: init
	}
})(window, document, jQuery);

$(function(){
  App.init();
});
