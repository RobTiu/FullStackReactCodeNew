const mongoose = reuiqre('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String	
});

mongoose.model('users', userSchema);
