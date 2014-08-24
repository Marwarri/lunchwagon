var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Restaurant Model
 * ==========
 */

var Restaurant = new keystone.List('Restaurant', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Restaurant.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Customer', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Restaurant.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Restaurant.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Restaurant.register();
