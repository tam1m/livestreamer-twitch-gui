import {
	get,
	inject,
	Mixin
} from "Ember";


const { service } = inject;


export default Mixin.create({
	store: service(),

	/**
	 * Load channel specific settings
	 * @param {number} id
	 * @returns {Promise}
	 */
	loadChannelSettings( id ) {
		var store = get( this, "store" );
		return store.findRecord( "channelSettings", id )
			.then(function( record ) {
				// get its data and unload it
				return record.toJSON();
			}, function() {
				var record = store.recordForId( "channelSettings", id );
				var data = record.toJSON();
				// unload generated empty record
				store.unloadRecord( record );
				return data;
			});
	}
});
