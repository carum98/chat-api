import QRCode from 'qrcode';

export const get = async (req, res) => {
	const qr = await QRCode.toDataURL('CODE_TEXT', {
		margin: 0,
		scale: 10,
		color: {
			dark: '#000',
			light: '#fff'
		}
	})

	res.send(qr)
}