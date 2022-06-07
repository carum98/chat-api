import pkg from "mongoose"
const { Schema, model } = pkg

const ChatSchema = new Schema({
	fromUserId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		// unique: true,
	},
	toUserId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		// unique: true,
	},
	socketId: {
		type: String,
		required: true,
		unique: true,
	},
}, {
	timestamps: { createdAt: true, updatedAt: false },
	versionKey: false,
})

export default model('Chat', ChatSchema)
