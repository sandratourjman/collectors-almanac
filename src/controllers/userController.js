const userQueries = require("../db/queries.users.js");
const collectionQueries = require("../db/queries.collections.js");
const itemQueries = require("../db/queries.items.js");
const passport = require("passport");
const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
const stripe = require("stripe")(secretKey);

module.exports = {
  signUp(req, res, next){
    res.render("users/sign_up");
  },

  create(req, res, next){
     let newUser = {
       username: req.body.username,
       email: req.body.email.toLowerCase(),
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err.errors[0].message);
         res.redirect("/users/sign_up");
       } else {
         passport.authenticate("local")(req, res, () => {
           req.flash("notice", `You've successfully signed up. Welcome ${req.user.username}!`);
           res.redirect("/");
         })
       }
     });
   },
   
   signInForm(req, res, next){
     res.render("users/sign_in");
   },
   
   signIn(req, res, next){
     passport.authenticate("local")(req, res, function () {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", `Welcome back, ${req.user.username}!`);
         res.redirect("/");
       }
     })
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },

   show(req, res, next){
      res.render("users/show");
    },

   upgradeForm(req, res, next) {
    res.render("users/upgrade", {publishableKey});
   },

   upgrade(req, res, next) {
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then((customer) => {
      stripe.charges.create({
        amount: 1500,
        currency: "usd",
        customer: customer.id,
        description: "Premium membership"
      })
    })
    .then((charge) => {
      userQueries.upgradeUser(req.user.dataValues.id);
      res.render("users/upgrade_success");
    })

   },

   createMergeCollection(req, res, next){
    let mergeCollection = {
      title: 'Merged Collections',
      category: 'CATEGORY 1',
      private: req.body.private,
      userId: req.user.id
    };
    let collectionID;

    collectionQueries.addCollection(mergeCollection, (err, collection) => {
          if(err){
              console.log(err);
          } else {
              // console.log("collection created");
              collectionID = collection.dataValues.id;
              return collectionID;
          }
      });

    setTimeout(()=> {
      collectionQueries.getCollection(collectionID, (err, result) => {
            collection = result['collection'];

            if(err || collection == null){
                console.log(err);
            } else {
                // console.log("mergeCollection");
                // console.log(collection);
            }
        });
    }, 1000);

    setTimeout(()=> {
      collectionQueries.getAllCollections((err, collections) => {
        if(err){
          console.log(err);
        } else {
          collections.forEach(collection => {

            collectionQueries.getCollection(collection.id, (err, result) => {
              collection = result['collection'];
              items = result['items'];
              if(err || collection == null){
                  console.log(err);
              } else {

                items.forEach(item => {
                  if (item){
                    // set item collection id to merge collection id
                    item.collectionId = collectionID;
                    itemQueries.updateItem(item.id, item.dataValues, (err, item) => {
                      if(err || item == null){
                          console.log(err);
                      } else {
                          // items moved to merged collection
                          // delete old collections except merged
                          // console.log("items moved to merge");
                      }
                    });

                  }
                });
              }
            });
          }); 
        } // end of else getAllCollections
      })
    }, 1500);

    setTimeout(()=> {
      collectionQueries.getAllCollections((err, collections) => {
        if(err){
          console.log(err);
        } else {
          // console.log("merged collection ID");

          collections.forEach(collection => {
            if (collection.id !== collectionID) {
              collectionQueries.deleteCollection(collection.id, (err, deletedRecordsCount) => {
                if(err){
                    console.log(err);
                } else {
                    // console.log("collections deleted");
                }
              });
            }
          }); 
        }
      });
    }, 2000);

  },

   downgrade(req, res, next) {
    userQueries.downgradeUser(req.user.dataValues.id);
    module.exports.createMergeCollection(req, res, next);
    req.flash("notice", "You've successfully downgraded your account.");
    res.redirect(`/users/${req.user.id}`);
   }

}