const keys = require('../config/keys');
// need to have a second set of parenthesis to apply the secret key
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {	
	// 2nd argument is middleware.  you can add as many middlewares you want
	app.post('/api/stripe', requireLogin, async (req, res) => {		
		//console.log('request body:', req.body);

		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});
		// we can access the current user passport model.  see ../index.js file on lines 'app.use(passport.initialize())'
		// and 'app.use(passport.session())' middlewares

		// save is a asynchronous request
		req.user.credits += 5;
		const user = await req.user.save(); 

		res.send(user);
	});
};