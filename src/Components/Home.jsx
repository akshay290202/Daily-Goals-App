import React,{useEffect,useState} from 'react'
import Task from './Task';

const Home = () => {

  const iniArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const [tasks,setTasks] = useState(iniArray);
  const [title,setTitle] = useState("");
  const [description,setDsecription] = useState("");

  const submithandler = (e) =>{
    e.preventDefault();
    setTasks([...tasks,{title,description}]);
    setTitle("");
    setDsecription("");
  };

  const deleteTask = (index) =>{
    const filarray = tasks.filter((val,i) =>{
        return i!== index;
    });
    setTasks(filarray);
};

  useEffect(() =>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);

  return (
    <div className='container'>
        <p>DAILY GOALS</p>
        <form onSubmit={submithandler}>
            <input type='text' placeholder='Title' 
            value = {title} 
            onChange={(e) => setTitle(e.target.value)}
            />

            <textarea type = "text" placeholder='Description'
            value = {description} 
            onChange={(e) => setDsecription(e.target.value)}
            />

            <button type='submit'>Add</button>
        </form>

        {tasks.map((item,index) =>{
          return <Task key={index} title={item.title} 
          description={item.description} index={index}
          deleteTask={deleteTask}/>;
        })}
    </div>
  )
}

export default Home;