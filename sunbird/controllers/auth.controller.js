const express = require('express');
const apiRoutes = express.Router();
const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository();

apiRoutes.post('/auth', (req, res) => {

  userRepository.findOne(req.params.id)
    .then(user => {

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          let token = jwt.sign(user, app.get('superSecret'), {
            expiresInMinutes: 1440 
          });

          res.json({
            success: true,
            message: 'Authorized',
            token: token
          });
        }
      }
  })
  .catch(error => {
    res.json(error)
  });
});

module.exports = apiRoutes;