import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";

/* REGISTER USER */
export const getSharedTask = async (req, res) => {
    try {
        const { shareId } = req.params;

        const requestedTasks = await Tasks.find({ shareId: shareId});
        if(requestedTasks.length === 0 )
        {
            res.status(404).json({ error: "Not Found" });
        }
        res.status(201).json(requestedTasks);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
