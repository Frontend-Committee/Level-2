import { useState } from "react";
export default function AddTask(){
    const [taskstate,setTaskState]= useState([]);
    const [taskname, setTaskName]= useState("");
    const [tasks,setTasks]=useState([]);
    const [tasklength,setTaskLength]=useState(true);
    const [filtertasks,setFilter]=useState(false);
    const [filtererror,setFilterError]=useState(false);
    const handleClickButton= ()=>{
        if(taskname.length>2){
            if(!filtertasks){
                const updatedtasks= [...tasks,taskname];
                setTasks([...tasks,taskname]);
                const updatedstates=[...taskstate,"Incomplete❌"];
                setTaskState([...taskstate,"Incomplete❌"])
                setTaskLength(true);
                localStorage.setItem("tasks",JSON.stringify(updatedtasks));
                localStorage.setItem("states",JSON.stringify(updatedstates));

                setFilterError(false);
            }
            else{
                setFilterError(true);
            }
        }
        else{
            setTaskLength(false);
        }
        setTaskName("");
    }
    const removefilter =()=>{
        if(localStorage.getItem("tasks")!==null &&localStorage.getItem("states")!==null){
            setTasks(JSON.parse(localStorage.getItem("tasks")));
            setTaskState(JSON.parse(localStorage.getItem("states")));
        }
        setFilter(false);

    }
    const applyfilter =()=>{
        const filteredtasks=tasks.filter((task,i)=> taskstate[i]==="Complete✅");
        const filteredstates=taskstate.filter((state,i)=>state==="Complete✅");
        setTaskState(filteredstates);
        setTasks(filteredtasks);
        setFilter(true);
    }
    
    return(
        <>
        <div className="ml-[20px] mt-[50px] ">
            <input value={taskname} onChange={(e)=>setTaskName(e.target.value)} className="border-1 mr-[10px] w-[400px]" id="taskname" name="taskname"></input>
            <button onClick={handleClickButton} className="border-1 pl-[10px] pr-[10px] hover:bg-teal-500" type="button"id="taskname" name="taskname">Add Task</button>
            {!tasklength && <p className="text-red-800">Name entered not valid! Try again</p>}
            {filtererror&&<p className="text-red-800">Change filter to add new tasks</p>}
        </div>
          <table className="mt-[30px] ml-[20px]">
                    <thead>
                    <tr>
                    <th >
                        Task
                    </th>
                    <th>
                        Mark As Completed
                    </th>
                    <th>
                        Remove task
                    </th>
                    </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task,index)=>(
                            <tr key={index}>
                                <td>
                                    {task}
                                </td>
                                <td>
                                    <p onClick={()=>{
                                        const newstate= taskstate.map((task,i)=>{
                                            if(i===index){
                                                return "Complete✅";
                                            }
                                            return task;
                                        })
                                        setTaskState(newstate);
                                        localStorage.setItem("states",JSON.stringify(newstate));
                                    }}>{taskstate[index]}</p>
                                </td>
                                <td>
                                    <button className="border-1 pl-[10px] pr-[10px] hover:bg-red-500" onClick={()=>{
                                        const tasksafterchange=tasks.filter((task,i)=>i!==index);
                                        setTasks(tasksafterchange);
                                        const statesafterchange=taskstate.filter((state,i)=>i!==index);
                                        setTaskState(statesafterchange);
                                        localStorage.setItem("tasks",JSON.stringify(tasksafterchange));
                                        localStorage.setItem("states",JSON.stringify(statesafterchange));
                                    }}>Remove </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                                <button onClick={removefilter} className={!filtertasks? "border-1 pl-[10px] pr-[10px] bg-teal-500" : "border-1 pl-[10px] pr-[10px]"}>All</button><button onClick={applyfilter} className={filtertasks? "border-1 pl-[10px] pr-[10px] bg-teal-500" : "border-1 pl-[10px] pr-[10px]"}>Completed</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </>
    )
}