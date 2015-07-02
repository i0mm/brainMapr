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

	function showNewest() {
        var div = document.querySelector('.idea-grid');
        div.scrollTop = div.scrollHeight;
    }

	/* Pubnub Realtime Backend */

    var oldIdeas = [];
    template.ideaList = [];

    template.testSucceed = function(e) {
    	console.log('===> OK');
    }

    template.error = function(e) {
    	console.log('===> KO');
    }

    template.historyRetrieved = function(e) {
    	console.log('===> HISTORY : ' + e.detail[0].length);

    	if(e.detail[0].length > 0) {
    		console.log(e.detail[0]);
            oldIdeas = e.detail[0];
            this.displayIdeas(oldIdeas);

        }
    }

    template.ideaPublished = function(e) {
    	console.log('===> OK Idea published');
    	console.log(e);
    }

    template.displayIdeas = function(list) {
        template.ideaList = list;

        // scroll to bottom when all list items are displayed
        template.async(showNewest);
    };
	
	template.addNewIdea = function(e) {
		document.getElementById('newIdea').toggle();
	};
	
	template.publishMyIdea = function(title, description) {
    	console.log('===> OK publishMyIdea');
		console.log(title);
		console.log(description);


		if(!title) return false;

		template.$.pub.message = {
			author: uuid,
			avatar: avatar,
			color: colorMap[color],
			title: title,
			description: description,
			timestamp: new Date().toISOString()
		};
		console.log(template.$.pub.message);

		template.$.pub.publish();

        return true;
	};

    template.subscribeCallback = function(e) {
    	console.log('===> OK Idea Subscribe');
        if(template.$.sub.messages.length > 0) {
            this.displayIdeas(template.ideaList.concat(template.$.sub.messages));
        }
    };

})();