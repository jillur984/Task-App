import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn with Jillur",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "Laravel"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const[showAddModal,setShowAddModal]=useState(false)
  const[taskToUpdate,setTaskToUpdate]=useState(null)
 
const handleAddEditTask=(newTask,isAdd)=>{
 if(isAdd){
  setTasks([...tasks,newTask])
 }
else{
  setTasks(
    tasks.map((task)=>{
      if(task.id==newTask.id){
        return newTask
      }
      return task
    })
  )
}
  
  setShowAddModal(false)
}

function handleEditTask(task){
   setTaskToUpdate(task)
   setShowAddModal(true)
}

function handleCloseClick(){
 setShowAddModal(false)
 setTaskToUpdate(null)
}

function handleDeleteTask(taskId) {
 const afterDeleteTask=tasks.filter((task)=>task.id!==taskId)
 setTasks(afterDeleteTask)
}

function handleDeleteAllClick(){
  tasks.length=0;
  setTasks([...tasks])
}

function handleFavourite(taskId){
  const taskIndex=tasks.findIndex((task)=>task.id==taskId)
  const newTask=[...tasks]
  newTask[taskIndex].isFavorite=!newTask[taskIndex].isFavorite
  setTasks(newTask)
}

function handleSearch(searchTerm){
 console.log(searchTerm)
 const filtered=tasks.filter((task)=>task.title.toLowerCase().includes(searchTerm.toLowerCase()))
 setTasks([...filtered])
 
}
  return (
    
    <section className="mb-20" id="tasks">
      {showAddModal && <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={()=>setShowAddModal(true)} onDeleteAllClick={handleDeleteAllClick} />
          {
            tasks.length>0 ?
            <TaskList 
          tasks={tasks} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask} 
          onFav={handleFavourite}  />
          :(<NoTaskFound/>)
          }
        </div>
      </div>
    </section>
  );
}
