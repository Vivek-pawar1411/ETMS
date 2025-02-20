const User = require('../model/user.model');
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const { name, email, password, role } = req.body;
    User.create({ name, email, password, role }, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ message: 'User registered' });
    })
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    User.findByEmail(email, (error, results) => {
        if (error || results.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }
        const user = results[0];
        const token = jwt.sign({
            id: user.id, role: user.role, name: user.name
        }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Login Successfully', name: user.name, role: user.role, token });
    });
};

exports.getbyid = (req, res) => {
    const id = req.params.id;
    User.getbyid(id, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    });
};

exports.deleteuser = (req, res) => {
    const id = req.params.id;
    User.deleteuser(id, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: " User deleted successfully", id: id });
    });
};

exports.uploadproof = (req, res) => {
    const { id } = req.body;
    const proofFilePath = req.file.path;
    User.uploadproof(id, proofFilePath, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made.' })
        };
        res.json({ message: "File  uploaded successfully", result });
    });
};

exports.getall = (req, res) => {
    const { limit=5,offset=0 } = req.body;
    User.gettotalcount((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        const totalUsers = result[0].count;
        User.getall({ limit: parseInt(limit), offset: parseInt(offset) }, (err, users) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ total_Employee: totalUsers, totalPages: Math.ceil(totalUsers / limit), users });
        });
    });
};

