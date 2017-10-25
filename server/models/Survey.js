const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// reference to an instance of a user
	// ref is a property that tells mongoose that the reference belongs to the user collection
	// _ is a standard that signals developers that it is a reference field
	_user: {type: Schema.Types.ObjectId, ref:'User'},
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);