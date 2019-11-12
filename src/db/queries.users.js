const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      // const msg = {
      //   to: user.email,
      //   from: 'noreply@collectorsalmanac.com',
      //   subject: 'Welcome to Collector\'s Almanac!',
      //   text: 'You are now part of our collector\'s community community!',
      //   html: `<strong>Welcome, ${user.username}</strong>`,
      // };
      // sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

} 