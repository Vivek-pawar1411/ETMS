const Task = require('../model/task.model');

exports.assign = (req, res) => {
    const { title, description, status, assigned_to} = req.body;
    Task.create({ title, description, status, assigned_to }, (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ message: 'Task Assinged',title,description,status });
    });
};

exports.getall = (req, res) => {
    const { limit = 2, offset = 0 } = req.query;
    Task.getall({ limit: parseInt(limit), offset: parseInt(offset) }, (err, users) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(users);
    });
};


exports.deletetask = (req, res) => {
    const id = req.params.id;
    Task.deletetask(id, (err, task) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: " Task deleted successfully", id: id });

    });
};

exports.updatetask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, assigned_to } = req.body;
    Task.updatetask(Number(id), title, description, status, Number(assigned_to), (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made.' });
        }
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Task updated successfully", result });
    });
};

