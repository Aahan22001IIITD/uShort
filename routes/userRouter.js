const express = require('express');
const { signupUser, loginUser } = require('../controllers/UserController');
const { allowtologgedInUsers } = require('../middlewares/auth');
const router = express.Router();
 
router.get('/signup', (req, res) => {res.render('signup', req.body)});
router.post('/api/signup', signupUser);
router.get('/login', (req, res) => {res.render('login', req.body)});
router.post('/api/login', loginUser);
router.get('/dashboard/:id', allowtologgedInUsers, (req, res) => {
    // Only allow users to access their own dashboard
    if (req.user_id !== req.params.id) {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    res.render('user_dashboard', {id: req.params.id});
});

module.exports = router;