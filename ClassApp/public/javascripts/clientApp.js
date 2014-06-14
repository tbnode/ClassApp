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
			//console.log('Button clicked!');
      var vote = $(this).val();
      socket.emit('vote', { estimate: vote });
			e.preventDefault();
		},

		// KICK OFF
		init = function(){
      console.log('initialized client');
      socket = io();
			$container = $(containerSel);
			$button = $container.find(buttonSel);

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