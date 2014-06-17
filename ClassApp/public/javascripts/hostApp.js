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
    voteArray = [],
    socket = io(),

		// PRIVATE METHODS
		buttonHandler = function(e) {
      var voteActive = $('#button').attr('data-vote-active'),          
          newValue = $('#button').attr('data-alt-value'),
          newAltValue = $('#button').attr('value'),
          newVoteActive;
      
      if (voteActive == 'false') {
        newVoteActive = 'true';
        voteArray = [];
        socket.emit('vote start', 'Voting has started.');
        var users = $('#messages').children();
        for (var i=0; i<users.length; ++i) {
          var user = users[i];
          $(user).text('Waiting on ' + user.id);
        }
      }
      
      if (voteActive == 'true') {
        newVoteActive = 'false';
        displayResults();
        calcResults();
        socket.emit('vote end', 'Voting has ended.');
      }
      
      $("#button").attr("data-vote-active", newVoteActive);
      $("#button").attr("value", newValue);
      $("#button").attr("data-alt-value", newAltValue);
      e.preventDefault();
		},
      
    estHandler = function (est) {
      var voteActive = $('#button').attr('data-vote-active');
      if (voteActive == 'true') {
        var match = false,            
            jqSel = '#' + est.user,
            i=0;
        for (; i < voteArray.length; ++i) {
          if (voteArray[i].user == est.user) {
            voteArray[i].estimate = est.estimate;
            match = true;            
            $(jqSel).text(est.user + ' has changed their estimate');
          }
        }
        if (!match) {
          voteArray.push(est);
          $(jqSel).text(est.user + ' has made an estimate');
        }
      }
    },
    
    joinHandler = function (joinMessage) {
      var username = joinMessage.split(' ')[0];
      if (document.getElementById(username) === null) {
        var newDiv = '<div id="' + username + '">' + joinMessage + '</div>\n';
        $('#messages').append(newDiv);
      }
    },
      
    displayResults = function() {      
      for (var i=0; i<voteArray.length; ++i) {
        var username = voteArray[i].user,
            estimate = voteArray[i].estimate,
            jqSel = '#' + username;
        $(jqSel).text(username + '\'s estimate is ' + estimate + '.');
      }
      var users = $('#messages').children();
        for (var j=0; j<users.length; ++j) {
          var user = users[j];
          if ($(user).text().match(/^Waiting/))
              $(user).text(user.id + ' missed the boat.');
        }
    },

    calcResults = function () {
      var voteValid=true,
          est=0,
          sum=0,
          average=0,
          message='',
          i=0;
      if(voteArray.length !== 0) {
        for (i=0; i<voteArray.length; ++i) {
          est = voteArray[i].estimate;          
          if (est=='?' || est=='0' || est=='1/2' || est=='1' || est=='inf') {
            message = 'It looks like further discussion is in order.';
            voteValid = false;
            break;
          }
          else sum += parseInt(est);
        }
        if (voteValid) {
          average = Math.round(sum /voteArray.length);
          message = "The average estimate for this vote is " + average;
        }
      }
      else {
        message = 'Nobody voted.  Ummm....yeah.';
      }
      $('#results').text(message);
    },
      
    // KICK OFF
		init = function(){
			$container = $(containerSel);
			$button = $container.find(buttonSel);
      socket = io();

			$button.on('click', buttonHandler);
      socket.on('join broadcast', joinHandler);
      socket.on('est broadcast', estHandler);      
		};

	// EXPOSE WHAT YOU NEED
	return {
		init: init
	}
})(window, document, jQuery);

$(function(){
  App.init();
});
