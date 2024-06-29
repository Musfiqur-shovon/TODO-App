import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BsCircleFill , BsTrashFill, BsFillCheckCircleFill} from 'react-icons/bs';
import Addvalue from "./Addvalue";


function Home() {
        const [todos, setTodos] = useState([])
        useEffect(()=>{
            axios.get('http://localhost:3001/get')
            .then( result => setTodos(result.data))
            .catch( err => console.log(err))
        }, [])

        const handleEdit = (id) =>{
            axios.put('http://localhost:3001/update/'+id)
            .then( result => {
                location.reload()
            })
            .catch( err => console.log(err))
        }

        const handleDelete = (id)=> {
            axios.delete('http://localhost:3001/delete/'+id)
            .then( result => {
                location.reload()
            })
            .catch( err => console.log(err))
        }

    return(
        <div className="home">
            <h2>Todo List</h2>
            <Addvalue/>
            {
                todos.length === 0
                ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className="task">
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>

                            {
                                todo.done ?
                                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                :
                                <BsCircleFill className='icon'></BsCircleFill>
                            }
                            <p className={todo.done ? "delete" : ""}>{todo.task}</p>
                        </div>
                        <div className="checkbox" onClick={ () => handleDelete(todo._id) }>
                            <span><BsTrashFill className="icon"/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export default Home