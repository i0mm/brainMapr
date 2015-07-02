(function() {
	'use strict';
	var uuid, pubnubId, avatar, color, cat;
	var authors, colors;

	// Assign a uuid made of a random cat and a random color
	var randomColor = function() {
		var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate', 'buttercup', 'maroon', 'cerise', 'plum', 'orchid'];
		return colors[(Math.random() * colors.length) >>> 0];
	};
	var randomCat = function() {
		var cats = ['tabby', 'bengal', 'persian', 'mainecoon', 'ragdoll', 'sphynx', 'siamese', 'korat', 'japanesebobtail', 'abyssinian', 'scottishfold'];
		return cats[(Math.random() * cats.length) >>> 0];
	};
	var randomColor2 = function() {
		var colors = ['#393b79', '#6b6ecf', '#637939', '#b5cf6b', '#8c6d31', '#e7ba52', '#843c39', '#d6616b', '#7b4173', '#ce6dbd'];
		return colors[(Math.random() * colors.length) >>> 0];
	};
	color = randomColor();
	cat = randomCat();
	pubnubId = color + '-' + cat;
	uuid = cat;
	avatar = 'images/' + cat + '.jpg';

	authors = ['images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg', 'images/' + randomCat() + '.jpg'];
	colors = [randomColor2(), randomColor2(), randomColor2(), randomColor2()];

	/* Polymer UI and UX */
	var template = document.querySelector('template[is=auto-binding]');
	template.channel = 'polymer-chat';
	template.uuid = uuid;
	template.avatar = avatar;
	template.authors = authors;
	template.colors = colors;
	template.color = color;
	template.items = [
		{title: 'PubNub', icon: 'cloud'},
		{title: 'Polymer', icon: 'polymer'},
		{title: 'Amour', icon: 'favorite'}
	];
/*	
	template.checkKey = function(e) {

		console.log('==================================> check key');
		console.log(e);

		if(e.keyCode === 13 || e.charCode === 13) {
			template.publish();
		}
	};
*/
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
    	console.log('===> HISTORY');
    	if(e.detail[0].length > 0) {
            oldIdeas = e.detail[0];
            this.displayIdeas(oldIdeas);
        }
    }

    template.ideaPublished = function(e) {
    	console.log('===> OK Idea published');
    }

    template.displayIdeas = function(list) {
        template.ideaList = list;

        // scroll to bottom when all list items are displayed
        //template.async(showNewest);
    };

    template.publishMyIdea = function(e) {
    	console.log('===> Publishing Started');
    	console.log(uuid);
    	console.log(avatarUrl);
    	console.log(color);
		
		template.$.pub.idea = {
			uuid: uuid,
			avatar: avatarUrl,
			color: color,
			title: template.titleInput,
			desc: template.descInput
		};

		console.log('===> Publishing : ' + template.$.pub.idea);

		template.$.pub.publish();
    };
	
	template.addNewIdea = function(e) {
		document.getElementById('newIdea').toggle();
	};
	
	template.publishMyIdea = function(title, description) {
		alert(title);
		return true;
	};
/*
	template.subscribeCallback = function(e) {
        if(template.$.sub.idea.length > 0) {
        	console.log('==================================> toto');
            //this.displayChatList(pastMsgs.concat(this.getListWithOnlineStatus(template.$.sub.messages)));
        }
    };

    template.presenceChanged = function(e) {
		var i = 0;
        var l = template.$.sub.presence.length;
        var d = template.$.sub.presence[l - 1];

        console.log(i);
        console.log(l);
        console.log(d);

        // how many users
        template.occupancy = d.occupancy;

        // who are online
        if(d.action === 'join') {
            if(d.uuid.length > 35) { // console
                d.uuid = 'the-mighty-big-cat';
            }
            onlineUuids.push(d.uuid);
        } else {
            var idx = onlineUuids.indexOf(d.uuid);
            if(idx > -1) {
                onlineUuids.splice(idx, 1);
            }
        }

        i++;

        // display at the left column
        template.cats = onlineUuids;
        // update the status at the main column
        if(template.ideaList.length > 0) {
            template.ideaList = this.getListWithOnlineStatus(template.ideaList);
        }
    };

    template.getListWithOnlineStatus = function(e) {
    	[].forEach.call(list, function(l) {
            // sanitize avatars
            var catName = (l.uuid + '').split('-')[1];
            l.avatar = 'images/' + catName + '.jpg';

            if (catName === undefined || /\s/.test(l.uuid)) {
                l.uuid = 'fail-cat';
                console.log('Oh you, I made this demo open so nice devs can play with, but you are soiling everything :-(');
            }

            if(onlineUuids.indexOf(l.uuid) > -1) {
                l.status = 'online';
            } else {
                l.status = 'offline';
            }
        });
        return list;
    };

    template.error = function(e) {
        console.log(e);
    };

	template.sendMyMessage = function(e) {
		if(!template.input) return; // if the input field is empty, do nothing.
		template.$.pub.message = {
			uuid: uuid, avatar: avatarUrl, color: color, text: template.input }; template.$.pub.publish(); };
*/
})();