import pkg from 'mongoose'
const { Schema, model } = pkg

const MessageSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	chatId: {
		type: Schema.Types.ObjectId,
		ref: 'Chat',
		required: true,
	},
}, {
	timestamps: { createdAt: true, updatedAt: false },
	versionKey: false,
})

export default model('Message', MessageSchema)