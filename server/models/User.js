const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String	
});

// register the schema in the database.  
mongoose.model('users', userSchema);
