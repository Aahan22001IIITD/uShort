const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

async function setUserSession(user_id) {
    const session_id = uuidv4();
    const payload = {
        user_id,
        session_id
    };
    
    // Create session in database
    await Auth.create({ user_id, session_id });
    
    // Create JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

async function getUserSession(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verify session exists in database
        const session = await Auth.findOne({ 
            user_id: decoded.user_id,
            session_id: decoded.session_id
        });
        if (!session) {
            throw new Error('Invalid session');
        }
        return decoded.user_id;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { setUserSession, getUserSession };




