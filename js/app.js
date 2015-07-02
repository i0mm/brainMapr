(function() {
	'use strict';
	var uuid, avatar, color, cat;
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
	uuid = cat;
	avatar = 'images/' + cat + '.jpg';

	/* Polymer UI and UX */
	var template = document.querySelector('template[is=auto-binding]');
	template.channel = 'polymer-chat';
	template.uuid = uuid;
	template.avatar = avatar;
	template.color = color;
	template.items = [
		{title: 'PubNub', icon: 'cloud'},
		{title: 'Polymer', icon: 'polymer'},
		{title: 'Amour', icon: 'favorite'}
	];
	template.checkKey = function(e) {
		if(e.keyCode === 13 || e.charCode === 13) {
			template.publish();
		}
	};
	template.sendMyMessage = function(e) {
		template.publish();
	};
})();