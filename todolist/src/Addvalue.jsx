import React, { useState } from "react";
import axios from 'axios'

function Create(){
    const [task, setTask] = useState([])
    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {task:task})
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="create_forms">
            <input type="text" name="" id="" onChange={(e) => setTask(e.target.value)} />
            <button type="submit" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create