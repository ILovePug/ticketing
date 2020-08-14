import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	try {
		const mongoServiceName = 'auth-mongo-srv';
		const mongoPort = 27017;
		const mongoDbName = 'auth'; //will auto create if db does not exist
		// connect to k8s service mongo name and port
		await mongoose.connect(`mongodb://${mongoServiceName}:${mongoPort}/${mongoDbName}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		console.log('connected to Mongodb');
	} catch (error) {
		console.log(error);
	}

	app.listen(3000, () => {
		console.log('listening on port 3000!!!');
	});
};

start();
