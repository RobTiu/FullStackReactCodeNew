// for webhooks
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		// req.user
		// don't want to use this because it will return us the LARGE list of recipients which could be really taxing
		// therefore make sure to include recipients: false
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ recipients: false });
		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	// old webhook post call before we started using the lodash CHAIN function

	/*app.post('/api/surveys/webhooks', (req, res) => {
		  // const events = _.map(req.body, (event) => {
		  // es6 destructuring: 
		const events = _.map(req.body, ({ email, url }) => {
			// extract the path from the full url so that we're left with /api/surveys/:surveyId/:choice
			const pathname = new URL(url).pathname;
			// create a matcher
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname); // i.e. { surveyId: '59e3e520b4b1ce636c49d1c0', choice: 'yes' }
			if (match) {
				return { email: email, surveyId: match.surveyId, choice: match.choice };
			}
		});
		// get rid of undefined variables in events using the lodash built in compact call
		const compactEvents = _.compact(events);
		// go through the compact events and remove any duplicate email and surveyId
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
		console.log(uniqueEvents);

		// tell sendgrid that we're okay to prevent duplicate webhook
		res.send({});
	});*/

	app.post('/api/surveys/webhooks', (req, res) => {
			const p = new Path('/api/surveys/:surveyId/:choice');
		  // const events = _.map(req.body, (event) => {
		  // es6 destructuring: 		  
		_.chain(req.body).map(({ email, url }) => {
			// extract the path from the full url so that we're left with /api/surveys/:surveyId/:choice
			const pathname = new URL(url).pathname;
			// create a matcher
			const match = p.test(pathname); // i.e. { surveyId: '59e3e520b4b1ce636c49d1c0', choice: 'yes' }
			if (match) {
				return { email: email, surveyId: match.surveyId, choice: match.choice };
			}
		})
		.compact()
		.uniqBy('email', 'surveyId')
		.each(({ surveyId, email, choice}) => {			
			Survey.updateOne({
				// all internal records are assigned _ when using updateOne, findOne, etc
			  _id: surveyId,
			  recipients: {
			    $elemMatch: {
			      email: email, responded: false
			    }
			  }
			}, {
			  // inc is a mongo operator that increments
			  // [choice] is an dynamic variable that evaluates to either yes || no.
			  $inc: { [choice]: 1 },
			  // $ lines up with $elemMatch and change the responded property to true
			  $set: { 'recipients.$.responded': true },
			  lastResponded: new Date()
			}).exec();
		})
		.value();

		// assign const events to above _chain
		// console.log(events);

		// tell sendgrid that we're okay to prevent duplicate webhook.  We don't care what we send to sendgrid
		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title: title,
			subject: subject,
			body: body,
			// creating the array from the comma delimitted string of emails.
			// longer version: recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
			recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
			// user.id is generated from mongoose as the unique record id
			_user: req.user.id,
			dateSent: Date.now()
		});

		// great place to send an email!
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();

			// DISCLAIMER: When trying to update records, be sure to look for records where you find the exact survey AND recipient.
			// otherwise when you use .save(), it will send to the database the entire survey record and 
			// ALL the recipients related to the survey.  
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			// send back to header in order to update the user's remaining amount of credits
			res.send(user);
		}
		catch(err) {
			res.status(422).send(err);
		}

	});
};