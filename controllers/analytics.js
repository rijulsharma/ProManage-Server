import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";

/* REGISTER USER */
export const getAnalytics = async (req, res) => {
    try {
        console.log("analytics api  hit ");
        const { id } = req.params;
        console.log(id);

        const allTasks = await Tasks.find({ userId: id});

        let BacklogTasks = 0;
        let ToDoTasks = 0;
        let InProgressTasks = 0;
        let CompletedTasks = 0;
        let LowPriorityTasks = 0;
        let MediumPriorityTasks = 0;
        let HighPriorityTasks = 0;
        let DueDateTasks = 0;
        console.log(allTasks);

        for( let obj of allTasks )
        {
            if(obj.priority === "LOW PRIORITY"){
                LowPriorityTasks++;
            }else if(obj.priority === "MODERATE PRIORITY"){
                MediumPriorityTasks++;
            }else{
                HighPriorityTasks++;
            }
            
            if(obj.isDue)DueDateTasks++;

            if(obj.section === "Backlog"){
                BacklogTasks++;
            }else if(obj.section === "To Do"){
                ToDoTasks++;
            }else if(obj.section === "In Progress"){
                InProgressTasks++;
            }else{
                CompletedTasks++;
            }
        }
        const analytics = {
            BacklogTasks,
            ToDoTasks,
            InProgressTasks,
            CompletedTasks,
            LowPriorityTasks,
            MediumPriorityTasks,
            HighPriorityTasks,
            DueDateTasks
        }
        console.log(analytics);
        res.status(201).json(analytics);
    } catch (err) {
        res.status(500).json({  });
    }
};
