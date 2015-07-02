(function() {
	'use strict';
	var uuid, pubnubId, avatar, color, cat;
	var authors, colors;

	var colorMap = { 'navy' : '#393b79', 'slate' : '#6b6ecf', 'olive': '#637939' , 'moss': '#b5cf6b', 'chocolate': '#8c6d31', 'buttercup': '#e7ba52','maroon': '#843c39', 'cerise': '#d6616b','plum': '#7b4173','orchid': '#ce6dbd' };

	// Assign a uuid made of a random cat and a random color
	var randomColor = function() {
		var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate', 'buttercup', 'maroon', 'cerise', 'plum', 'orchid'];
		return colors[(Math.random() * colors.length) >>> 0];
	};
	var randomCat = function() {
		var cats = ['tabby', 'bengal', 'persian', 'mainecoon', 'ragdoll', 'sphynx', 'siamese', 'korat', 'japanesebobtail', 'abyssinian', 'scottishfold'];
		return cats[(Math.random() * cats.length) >>> 0];
	};
	color = randomColor();
	cat = randomCat();
	pubnubId = color + '-' + cat;
	uuid = cat;
	avatar = 'images/' + cat + '.jpg';

	authors = ['images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg'];
	colors = [colorMap[randomColor()], colorMap[randomColor()], colorMap[randomColor()], colorMap[randomColor()]];

	/* Polymer UI and UX */
	var template = document.querySelector('template[is=auto-binding]');
	template.channel = 'polymer-chat';
	template.uuid = uuid;
	template.avatar = avatar;
	template.authors = authors;
	template.colors = colors;
	template.color = color;
	template.tools = [
		{title: 'PubNub', icon: 'cloud'},
		{title: 'Polymer', icon: 'polymer'},
		{title: 'Amour', icon: 'favorite'}
	];

	/* Pubnub Realtime Backend */

    var oldIdeas = [];
    template.ideaList = [];

	function S4() {
    	return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
	}

    template.error = function(e) {
    	console.log('===> KO');
    	console.log(e);
    }

    template.historyRetrieved = function(e) {
    	if(e.detail[0].length > 0) {
            template.ideaList = e.detail[0].reverse();
        }
    }
	
	template.addNewIdea = function(e) {
		document.getElementById('newIdea').toggle();
	};
	
	template.publishMyIdea = function(title, description) {
		if(!title) return false;
		if(!description) return false;

		template.$.pub.message = {
			guid: (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase(),
			author: uuid,
			avatar: avatar,
			color: colorMap[color],
			title: title,
			description: description,
			timestamp: new Date().toISOString()
		};

		template.$.pub.publish();

        return true;
	};

    template.subscribeCallback = function(e) {
        if(template.$.sub.messages.length > 0) {
        	template.ideaList = template.$.sub.messages.concat(template.ideaList);
        }
    };


	/* Animated */
    template.transitionend = function() {
        if (this.lastSelected) {
          this.lastSelected = null;
        }
  	}

	template.back = function() {
		this.lastSelected = this.$.pages.selected;
		console.log(this.lastSelected);
		this.$.pages.selected = 0;
	}
})();