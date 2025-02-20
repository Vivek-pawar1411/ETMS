const db = require('../config/db');

const Task = {
    create: (task, callback) => {
        const query = ('INSERT INTO tasks (title,description,status,assigned_to) VALUES(?,?,?,?)')
        db.query(query, [task.title, task.description, task.status, task.assigned_to], callback);
    },
    getall: ({ limit, offset }, callback) => {
        const query = 'SELECT users.id,users.name ,tasks.title,tasks.description,tasks.status,tasks.created_at FROM tasks  inner join users on users.id=tasks.assigned_to  LIMIT ? OFFSET ?';
        db.query(query, [parseInt(limit), parseInt(offset)], callback);
    },
    deletetask: (id, callback) => {
        const query = 'DELETE FROM tasks WHERE id=? ';
        db.query(query, [id], callback);
    },
    updatetask: (id, title, description, status, assigned_to, callback) => {
        const query = 'UPDATE tasks SET title=?, description=?, status=?, assigned_to=? WHERE id=?';
        db.query(query, [title, description, status, assigned_to, id], callback);
    }
   
}
module.exports = Task;
