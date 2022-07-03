import { readFile } from 'fs/promises';

export async function get(req, res) {
	let data = await readFile('./src/data/emojis.json', 'utf8')

	data = JSON.parse(data)

	let grouped = {}

	data.forEach(emoji => {
		if (!grouped[emoji.category]) {
			grouped[emoji.category] = []
		}
		grouped[emoji.category].push(emoji)
	})

	return res.status(200).json(grouped)
}