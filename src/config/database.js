import 'dotenv/config'

import mongoose from "mongoose"

mongoose.connect(`mongodb://mongodb:27017`, {
	useNewUrlParser: true,
	user: process.env.DB_USER,
	pass: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
}).then(() => {
	console.log("Connected to MongoDB")
}).catch((err) => {
	console.log(err)
})

mongoose.set('toJSON', {
	virtuals: true,
	transform: (doc, ret) => {
		ret.id = ret._id;
		delete ret._id;
		delete ret.updatedAt;
	}
});
