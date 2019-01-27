// const express = require('express')

// const router = express.Router()

// router.get('/', (req, res) => {
// 	res.send('holle joy')
// })

// module.exports = router
const main = async (ctx) => {
	let title = 'hell joy'
	await ctx.render('index', {
		title
	})
}

module.exports = main