const db = require('../config/db');


const User = {
    create: (user, callback) => {
        const query = ('INSERT INTO users (name,email,password,role) VALUES(?,?,?,?)');
        db.query(query, [user.name, user.email, user.password, user.role], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email=?';
        db.query(query, [email], callback);
    },
    getbyid: (id, callback) => {
        const query = 'SELECT users.id,users.name ,tasks.title,tasks.description,tasks.status,tasks.created_at FROM tasks  inner join users on users.id=tasks.assigned_to Where users.id=?';
        db.query(query, [id], callback);
    },
    getall: ({ limit, offset }, callback) => {
        const query = 'SELECT * FROM users LIMIT ? OFFSET ?';
        db.query(query, [parseInt(limit), parseInt(offset)], callback);
    },
    deleteuser: (id, callback) => {
        const query = 'DELETE FROM users WHERE id=? ';
        db.query(query, [id], callback);
    },

    uploadproof: (id, proofFilePath, callback) => {
        const query = 'UPDATE users SET proof = ? WHERE id = ?';
        db.query(query, [proofFilePath, id], callback);
    },
    gettotalcount:(callback)=>{
        const query='SELECT COUNT(*) as count FROM users';
        db.query(query,callback);
    }
};

module.exports = User;