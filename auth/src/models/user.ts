import mongoose from 'mongoose';
import { Password } from '../services/password';

// props to create/update the user
interface UserAttrs {
	email: string;
	password: string;
}

// user model props including all supported methods
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

//all props in the database including automatically created ones
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
	//updatedAt:string; // db might have additional fields. insert here to access
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: { // override default JSON.stringify
			// modify default return result
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				// remove password, __v
				delete ret.password;
				delete ret.__v;
			},
		},
	},
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
