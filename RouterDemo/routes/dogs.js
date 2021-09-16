const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('All dogs');
});
router.get('/:id', (req, res) => {
	res.send('viewing one dogs');
});
router.get('/:id/edit', (req, res) => {
	res.send('edit one dogs');
});

module.exports = router;
