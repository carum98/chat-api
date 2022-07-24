import pkg from "mongoose"
const { Schema, model, isValidObjectId } = pkg

const ChatSchema = new Schema({
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
	}],
	message: {
		type: Schema.Types.ObjectId,
		ref: 'Message',
	}
}, {
	timestamps: { createdAt: true, updatedAt: false },
	versionKey: false,
})

ChatSchema.methods.createObj = function (user_id) {
	const user = this.users.find(user => user.id.toString() !== user_id)
	const message = this.message ? this.message.createObj(user_id) : null

	return {
		id: this._id,
		user,
		message,
		count: this.count || 0,
	}
}

export default model('Chat', ChatSchema)
