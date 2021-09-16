const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('All shelters');
});

router.post('/', (req, res) => {
	res.send('creating shelters');
});

router.get('/:id', (req, res) => {
	res.send('viewing one shelters');
});

router.get('/:id/edit', (req, res) => {
	res.send('edit one shelters');
});

module.exports = router;
