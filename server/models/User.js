const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: { type: Number, default: 0 },
});

// register the schema in the database.  
mongoose.model('users', userSchema);
