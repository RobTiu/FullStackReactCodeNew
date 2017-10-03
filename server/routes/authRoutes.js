const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
    	req.logout();
    	res.send(req.user);
    });

    // after the user is authenticated.  send the user ID that is deserialized from index.js back as a response
    app.get('/api/current_user', (req, res) => {
    	// send the req properties of the user to the response
    	res.send(req.user);    	
    });
}