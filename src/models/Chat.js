import pkg from "mongoose"
const { Schema, model } = pkg

const ChatSchema = new Schema({
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	socketId: {
		type: String,
	},
	message: {
		type: Schema.Types.ObjectId,
		ref: 'Message',
	}
}, {
	timestamps: { createdAt: true, updatedAt: false },
	versionKey: false,
})

export default model('Chat', ChatSchema)
