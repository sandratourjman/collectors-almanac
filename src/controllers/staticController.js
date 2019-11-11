module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Welcome to Collector's Almanac"});
  }
}