import bcrypt from 'bcryptjs'
import pkg from 'mongoose'
const { Schema, model } = pkg

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	}
}, {
	timestamps: { createdAt: true, updatedAt: false },
	versionKey: false,
})

UserSchema.statics.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

export default model('User', UserSchema)