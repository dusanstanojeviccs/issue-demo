 /*jshint unused:false*/

import DS from 'ember-data';
export default DS.RESTAdapter.extend({

	shouldReloadRecord: function(store, snapshot) {
		console.log("ASODK");
		return true;
	},

	shouldReloadAll: function(store, snapshot) {
		console.log("ASODK");
		return true;
	},

	shouldBackgroundReloadRecord: function(store, snapshot) {
		console.log("ASODK");
		return true;
	},

	shouldBackgroundReloadAll: function(store, snapshot) {
		console.log("ASODK");
		return true;
	}
});