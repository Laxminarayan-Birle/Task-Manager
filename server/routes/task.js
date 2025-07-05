const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/dashboard', taskController.getAllTasks);
router.get('/completed', taskController.getCompletedTasks);
router.get('/missed', taskController.getMissedTasks);
router.get('/pending', taskController.getPendingTask);
router.get('/upcoming', taskController.getUpcomingTask);
router.get('/state/:status', taskController.getTasksByStatus);
router.post('/', taskController.createTask);
router.put('/update/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);
router.patch('/:id/toggle', taskController.toggleTaskCompleted);

module.exports = router;
