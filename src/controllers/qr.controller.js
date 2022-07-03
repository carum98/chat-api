import QRCode from 'qrcode';
import { getToken } from './auth.controller.js';
import * as QrControllerSocket from '../sockets/controllers/qr.controller.js';

export const get = async (req, res) => {
	const { code } = req.body

	const qr = await QRCode.toDataURL(code, {
		margin: 0,
		scale: 10,
		color: {
			dark: '#000',
			light: '#fff'
		}
	})

	res.send(qr)
}

export const validate = async (req, res) => {
	const { code } = req.body

	const token = getToken(req.user)

	QrControllerSocket.login(code, token)

	return res.status(200).json({
		data: code,
		token
	})
}