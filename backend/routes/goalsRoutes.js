import express from 'express';
const router = express.Router();
import {getGoals, setGoal, updateGoal, deleteGoal} from '../controllers/goalControllers.js'


router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);


    
export default router;
