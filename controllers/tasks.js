import Users from "../models/Users.js";
import Tasks from "../models/Tasks.js";
import mongoose from "mongoose";



export const createTask = async (req, res) => {
    try {
      const {
        userId,
        title,
        priority,
        checklist,
        isDue,
        section
      } = req.body;

      var dueDate;
      if(isDue){
        dueDate = req.body.dueDate;
      }
      const newTask = new Tasks({
        userId,
        title,
        priority,
        checklist,
        isDue,
        section,
        ...(isDue ? {dueDate} : {})
      });

      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        let {_id} = req.body;
        const deletedTask = await Tasks.deleteOne({ _id : _id } );
        if(deleteTask.deletedCount === 0){
          res.status(404).json({ msg: "Object not found"});
        }else {
          res.status(201).json(deletedTask);
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const editTask = async (req, res) => {
    try { 
        const filter = { _id: req.body._id };
        delete req.body._id;

        const editedTask = await Tasks.findOneAndUpdate(filter, req.body, { new: true });
        res.status(201).json(editedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBacklogTasks = async ( req , res ) => {
    try{
        var {id, days} = req.params;
        days = (days == "today" ? 1 : (days == "month" ? 30 : 7));
        var currentDate = new Date();
        currentDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
        currentDate = currentDate.toISOString();

        const allTasks = await Tasks.find({ userId: id, createdAt: { $gt: currentDate } , section: "Backlog"});
        res.status(201).json(allTasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getToDoTasks = async ( req , res ) => {
  try{
      var {id, days} = req.params;
      days = (days == "today" ? 1 : (days == "month" ? 30 : 7));
      var currentDate = new Date();
      currentDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
      currentDate = currentDate.toISOString();

      const allTasks = await Tasks.find({ userId: id, createdAt: { $gt: currentDate } , section: "To Do"});
      res.status(201).json(allTasks);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getInProgressTasks = async ( req , res ) => {
  try{
      var {id, days} = req.params;
      days = (days == "today" ? 1 : (days == "month" ? 30 : 7));
      var currentDate = new Date();
      currentDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
      currentDate = currentDate.toISOString();

      const allTasks = await Tasks.find({ userId: id, createdAt: { $gt: currentDate } , section: "In Progress"});
      res.status(201).json(allTasks);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getDoneTasks = async ( req , res ) => {
  try{
      var {id, days} = req.params;
      days = (days == "today" ? 1 : (days == "month" ? 30 : 7));
      var currentDate = new Date();
      currentDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));
      currentDate = currentDate.toISOString();

      const allTasks = await Tasks.find({ userId: id, createdAt: { $gt: currentDate } , section: "Done"});
      res.status(201).json(allTasks);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};