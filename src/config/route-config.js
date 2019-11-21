module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const collectionRoutes = require("../routes/collections");
    const itemRoutes = require("../routes/items");

    if(process.env.NODE_ENV === "test") {
    	const mockAuth = require("../../spec/support/mock-auth.js");
     	mockAuth.fakeIt(app);
   	}

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(collectionRoutes);
    app.use(itemRoutes);
  }
}