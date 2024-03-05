import React, { useState } from "react"
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import styled from "@emotion/styled";

const TaskItem = (props) => {
    const {task, tasks, setTasks, index} = props;
    const[taskName, setTaskName] = useState(task.name);
    const [editState, setEditState] = useState(false);

    const updateTasks = async () => {
        const response = await fetch(`https://todocraft.ddev.site/task/${task.id}.json`, {method: "POST"});
        const tasks = await response.json();
      
        if (tasks?.data) {
          setTasks(tasks.data);
        }
        console.log("tasks form api", tasks);
      }

    const deleteItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];

        newTasks.splice(index, 1)

        setTasks(newTasks);
        console.log("Deleted!");
    }

    const saveItem = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        const newTask = {...newTasks[index]};

        newTask.name = taskName;
        newTasks[index] = newTask;

        setTasks(newTasks);
        setEditState(false);
        console.log("Saved!");
    }

    const editItem = (e) => {
        e.preventDefault();
        setEditState(true);
        console.log("Edit started!");
    }

    const cancelItem = (e) => {
        e.preventDefault();
        setTaskName(task.name);
        setEditState(false);
        console.log("Edit canceled!");
    }

    const handleTaskNameOnChange = (e) => {
        const newTask = e.target.value;
        setTaskName(newTask);
    }

    if (!task) {
        return null;
    }

    return (
        <li>
        
        {editState ? (
            <>
                <EditTaskName autofoucus type="text" value={taskName} on onChange={(e) => handleTaskNameOnChange(e)} />
                <IconButton onClick={(e) => cancelItem(e)}>
                <CancelIcon 
                    color="disabled" 
                    />
                </IconButton>
                <IconButton onClick={(e) => saveItem(e)}>
                    <SaveIcon 
                        color="disabled" 
                        />
                </IconButton>
            </>
        ) : (
            <>
                <TaskName>{task.name}</TaskName>
                <IconButton onClick={(e) => deleteItem(e)}>
                <DeleteForeverIcon 
                    color="disabled" 
                    />
                </IconButton>
                <IconButton onClick={(e) => editItem(e)}>
                    <EditIcon 
                        color="disabled" 
                        />
                </IconButton>
            </>
        )}
        
        </li>
        
    );
}

export default TaskItem;

const TaskName = styled.div `
    font-size: 14px;
`

const EditTaskName = styled.input `
    font-size: 14px;
`