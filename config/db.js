const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');

const url='mongodb+srv://ashu:1234@dev-connector.fr3mx.mongodb.net/devConnector?retryWrites=true&w=majority';
const connectDB = async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
