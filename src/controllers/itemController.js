const itemQueries = require("../db/queries.items.js");

module.exports = {
	index(req, res, next){
		itemQueries.getAllItems((err, result) => {
			if(err){
				console.log(err);
				res.redirect(500, "static/index");
			} else {
                items = result['items'];
				res.render(`items/index`, {items});
			}
		})
	},
	new(req, res, next) {
    	res.render('items/new');
    },
    create(req, res, next){
	    let newItem = {
	        name: req.body.name,
	        description: req.body.description,
	        price: req.body.price,
	        link: req.body.link,
            owned: req.body.owned,
	        userId: req.user.id,
            collectionId: req.params.collectionId
	    };
	    itemQueries.addItem(newItem, (err, item) => {
	        if(err){
	            res.redirect(500, `/collections/${item.collectionId}/items/new`);
	        } else {
	            res.redirect(303, `/collections/${item.collectionId}`);
	        }
	    });
    },
    show(req, res, next){
        itemQueries.getItem(req.params.id, (err, result) => {
            item = result['item'];
            collection = result['collection'];

            if(err || item == null){
                res.redirect(404, '/');
            } else {
                res.render(`items/show`, {item,collection});
            }
        });
    },
    destroy(req, res, next){
        itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/collections/${item.collectionId}/items/${req.params.id}`);
            } else {
                res.redirect(303,`/collections/${item.collectionId}`); 
            }
        });
    },
    edit(req, res, next){
        itemQueries.getItem(req.params.id, (err, result) => {
            item = result['item'];
            collection = result['collection'];

            if(err || item == null){
                res.redirect(404, "/");
            } else {
				res.render(`items/edit`, {item,collection});
            }
        });
    },
    update(req, res, next){
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if(err || item == null){
                res.redirect(401, `/collections/${item.collectionId}/items/${req.params.id}/edit`);
            } else {
                res.redirect(`/collections/${item.collectionId}/items/${req.params.id}`);
            }
        });
    }
}