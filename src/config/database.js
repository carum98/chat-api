import mongoose from "mongoose"

const connectDB = async () => {
	await mongoose.connect(`mongodb://mongodb:27017`, {
		useNewUrlParser: true,
		user: process.env.DB_USER,
		pass: process.env.DB_PASSWORD,
		dbName: process.env.DB_NAME,
	}).then(() => {
		console.log("MongoDB connected")
	})

	mongoose.set('toJSON', {
		virtuals: true,
		transform: (doc, ret) => {
			ret.id = ret._id;
			delete ret._id;
			delete ret.updatedAt;
		}
	})
}

export default connectDB
