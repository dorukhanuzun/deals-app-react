const { new: _new, create, delete: _delete  } = require('../controllers/SessionsController');

module.exports = router => {
  // Step 1: Setup the necessary routes for login, authenticate, and logout
  router.post('/authenticate', create);
  router.get('/logout', _delete);
};