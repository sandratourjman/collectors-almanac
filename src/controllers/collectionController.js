const collectionQueries = require("../db/queries.collections.js");

module.exports = {
	index(req, res, next){
		collectionQueries.getAllCollections((err, collections) => {
			if(err){
				console.log(err);
				res.redirect(500, "static/index");
			} else {
				res.render("collections/index", {collections});
			}
		})
	},
	new(req, res, next) {
    	res.render('collections/new');
    },
    create(req, res, next){
	    let newCollection = {
	        title: req.body.title,
	        category: req.body.category.toUpperCase(),
	        private: req.body.private,
	        userId: req.user.id
	    };
	    collectionQueries.addCollection(newCollection, (err, collection) => {
	        if(err){
                console.log(err);
	            res.redirect(500, '/collections/new');
	        } else {
	            res.redirect(303, `/collections/${collection.id}`);
	        }
	    });
    },
    show(req, res, next){
        collectionQueries.getCollection(req.params.id, (err, collection) => {
            if(err || collection == null){
                res.redirect(404, '/');
            } else {
                res.render('collections/show', {collection});
            }
        });
    },
    destroy(req, res, next){
        collectionQueries.deleteCollection(req.params.id, (err, deletedRecordsCount) => {
            if(err){
                res.redirect(500, `/collections/${req.params.id}`);
            } else {
                res.redirect(303,`/collections`); 
            }
        });
    },
    edit(req, res, next){
        collectionQueries.getCollection(req.params.id, (err, collection) => {
            if(err || collection == null){
                res.redirect(404, "/");
            } else {
				res.render('collections/edit', {collection});
            }
        });
    },
    update(req, res, next){
        collectionQueries.updateCollection(req.params.id, req.body, (err, collection) => {
            if(err || collection == null){
                res.redirect(401, `/collections/${req.params.id}/edit`);
            } else {
                res.redirect(`/collections/${req.params.id}`);
            }
        });
    }
}