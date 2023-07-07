import asyncHandler from 'express-async-handler'

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler (
    async (req, res) => {
        res.status(200).json({message: "get goals"});
    }
) 

//@desc Set goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler (
    async (req, res) => {
        if(!req.body.text){
            res.status(400);
            throw new Error('Please add a text');
        }
        console.log(req.body);
        res.status(200).json({message: "set goal"});
    }
)


//@desc Update goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(
    async (req, res) => {
        res.status(200).json({message: `update goal ${req.params.id}`});
    }
)

//@desc Delete goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(
    async (req, res) => {
        res.status(200).json({message: `delete goal ${req.params.id}`});
    }
)



export {getGoals, setGoal, updateGoal, deleteGoal};