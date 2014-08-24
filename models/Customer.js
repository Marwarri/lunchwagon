var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Customer Model
 * ==========
 */

var Customer = new keystone.List('Customer');

Customer.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Customer.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Customer.relationship({ ref: 'Post', path: 'author' });


/**
 * Registration
 */

Customer.defaultColumns = 'name, email, isAdmin';
Customer.register();
