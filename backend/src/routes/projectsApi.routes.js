const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Projects Api')
})

module.exports = router;