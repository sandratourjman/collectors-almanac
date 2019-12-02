const Item = require("./models").Item;
const Collection = require("./models").Collection;

module.exports = {

	getAllItems(callback) {
		return Item.all()

		.then((items) => {
			callback(null, items);
		})
		.catch((err) => {
			callback(err);
		})
	},

	getItem(id, callback) {
		let result = {};
		return Item.findByPk(id)
		.then((item) => {
			if(!item){
				callback(400);
			} else {
				result['item'] = item;
				callback(null, result);
			}
		})
		.catch((err) => {
			callback(err);
		})
	},

	addItem(newItem, callback) {
		return Item.create(newItem)
		.then((item) => {
			callback(null, item)
		})
		.catch((err) => {
			callback(err);
		})
	},


	deleteItem(id, callback) {
		return Item.destroy({
			where: {id}
		})
		.then((deletedRecordsCount) => {
			callback(null, deletedRecordsCount)
		})
		.catch((err) => {
			callback(err);
		})
	},

	updateItem(id, updatedItem, callback) {
		return Item.findByPk(id)
		.then((item) => {
			if(!item) {
				return callback("Item not found");
			}

			item.update(updatedItem, {
				fields: Object.keys(updatedItem)
			})
			.then(() => {
				callback(null, item);
			})
			.catch((err) => {
				callback(err);
			})
		})
	}
}