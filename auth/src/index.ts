import express from 'express';
// handles error throwing in async function so it wont hang
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/siginin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
	signed: false, // dont need to encrypt the content
	secure: true, // must be on https
}))


app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async ()=>{
	throw new NotFoundError();
})


app.use(errorHandler);

const start = async () =>{

	if(!process.env.JWT_KEY){
		throw new Error('JWT_KEY must be defined')
	}

	try {
		const mongoServiceName = 'auth-mongo-srv';
		const mongoPort = 27017;
		const mongoDbName = 'auth'; //will auto create if db does not exist
		// connect to k8s service mongo name and port
		await mongoose.connect(`mongodb://${mongoServiceName}:${mongoPort}/${mongoDbName}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})

		console.log('connected to Mongodb')

	} catch (error) {
		console.log(error);
	}

	app.listen(3000, () => {
		console.log('listening on port 3000!!!');
	});
};


start();
