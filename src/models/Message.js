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
	isRead: {
		type: Boolean,
		default: false,
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

MessageSchema.methods.createObj = function (user_id) {
	return {
		id: this._id,
		content: this.content,
		createdAt: this.createdAt,
		isMine: user_id === this.from._id.toString(),
		isRead: this.isRead,
	}
}

export default model('Message', MessageSchema)