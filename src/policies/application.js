module.exports = class ApplicationPolicy {

  constructor(user, collection) {
    this.user = user;
    this.collection = collection;
  }

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this.new();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}