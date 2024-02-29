import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";

/* REGISTER USER */
export const getSharedTask = async (req, res) => {
    try {
        console.log("get shared item api  hit ");
        const { shareId } = req.params;
        console.log(shareId);

        const requestedTasks = await Tasks.find({ shareId: shareId});
        if(requestedTasks.length === 0 )
        {
            res.status(404).json({ error: "Not Found" });
        }
        console.log(requestedTasks);
        res.status(201).json(requestedTasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
};
