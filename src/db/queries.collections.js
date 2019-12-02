const Collection = require("./models").Collection;
const Item = require("./models").Item;

module.exports = {

	getAllCollections(callback) {
		return Collection.all()

		.then((collections) => {
			callback(null, collections);
		})
		.catch((err) => {
			callback(err);
		})
	},

	getCollection(id, callback) {
		let result = {};
		return Collection.findByPk(id)
		.then((collection) => {
			if(!collection){
				callback(400);
			} else {
				result['collection'] = collection;
				Item.scope({method: ['itemsFor', id]}).findAll()
				.then(items => {
					result['items'] = items;
					callback(null, result)
				})
			}
		})
		.catch((err) => {
			callback(err);
		})
	},

	addCollection(newCollection, callback) {
		return Collection.create(newCollection)
		.then((collection) => {
			callback(null, collection)
		})
		.catch((err) => {
			callback(err);
		})
	},


	deleteCollection(id, callback) {
		return Collection.destroy({
			where: {id}
		})
		.then((deletedRecordsCount) => {
			callback(null, deletedRecordsCount)
		})
		.catch((err) => {
			callback(err);
		})
	},

	updateCollection(id, updatedCollection, callback) {
		return Collection.findByPk(id)
		.then((collection) => {
			if(!collection) {
				return callback("Collection not found");
			}

			collection.update(updatedCollection, {
				fields: Object.keys(updatedCollection)
			})
			.then(() => {
				callback(null, collection);
			})
			.catch((err) => {
				callback(err);
			})
		})
	}
}