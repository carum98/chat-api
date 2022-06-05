import pkg from 'mongoose'
const { Schema, model } = pkg

const MessageSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	fromUserId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	toUserId: {
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