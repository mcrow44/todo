import{useEffect, useState} from "react";
import './App.css';
import {Button, Grid, TextField} from "@mui/material"
import styled from "@emotion/styled";
import TaskItem from "./component/TaskItem";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';


function App() {

  let something2 = "new task";

  something2 = "something different";

  const [taskName, setTaskName] = useState("");

  const [tasks, setTasks] = useLocalStorage("tasks", [])

const fetchTasks = async () => {
  const response = await fetch("https://todocraft.ddev.site/tasks.json");
  const tasks = await response.json();

  if (tasks?.data) {
    setTasks(tasks.data);
  }
  console.log("tasks form api", tasks);
}

useEffect(() => {
  fetchTasks();
}, [])

const valueChange = (event) => {
  const newValue = event.target.value;
  setTaskName(newValue);
}

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const newTasks = [...tasks];

    newTasks.unshift({
      id: uuidv4(),
      name: task,
    });

    setTasks(newTasks);
    setTaskName(""); 
  }

  console.log(taskName);

  return (
    <div className="App">
      <h1 is="title">hey lets get stuff done</h1>
    <div id="todo-app">
        <form>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <TextField
                size="large"
                type="text"
                id="new-task"
                placeholder="Type new task"
                value={taskName}
                onChange={valueChange}
                />
              </Grid>
              <Grid item><StyledButton id="add-Task" variant="contained" color="error" onClick={(e) => handleAddTask(e, taskName)}>Add task</StyledButton></Grid>
            </Grid>
            

            <ul id="task-list">
              {tasks.map((person, index) => {
                console.log(person)
                return(
                  <TaskItem key={`task-${person.id}-${index}`} task={person} tasks={tasks} setTasks={setTasks} index={index} />
                )
              })}
            </ul>
        </form>

        
    </div>
    </div>
  );
}

export default App;

const StyledButton = styled(Button)`
border-radius: 8px;
height: 30px;
margin: 0px 10px

`