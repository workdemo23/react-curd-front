import React,{useState,useEffect} from 'react';
import axios from 'axios';

const TodoEdit = (props) => {
    let [account, setAccount] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: 'low',
        todo_completed: false
      });

      const editItem = () =>{
        axios.get('http://localhost:4000/todos/'+props.match.params.id)
            .then(res => {
                setAccount({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed
                })  
            })
            .catch(function (error){
                console.log(error);
            });
    };

    useEffect(() => {
            editItem();
    }, []);

   let onSubmit = (e) => {
        e.preventDefault();
        console.log("ok");
        console.log(account);
        axios.post('http://localhost:4000/todos/update/'+props.match.params.id,account)
        .then(res => {console.log(res.data);
            alert('Record Updated successfully.');
            });

        /*setAccount({
            todo_description: '',
            todo_responsible: '',
            todo_priority: 'low',
            todo_completed: false
          });  */
          props.history.push('/');            
    }

    let handleChange = (e) => {
        /*let name = e.target.name;
        let value = e.target.value;
        account[name] = value;
        setAccount(account);*/
        const { name, value } = e.target

        setAccount({ ...account, [name]: value })
    }

    return (
        <div style={{marginTop: 10}}>
                <h3>Edit Todo</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                name = "todo_description" 
                                value = {account['todo_description']}                               
                                onChange={handleChange}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                name = "todo_responsible"
                                value = {account['todo_responsible']} 
                                onChange={handleChange}
                                />
                    </div>                    

                    <div className="form-group">
                        <input type="submit" value="Save Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    )
}

export default TodoEdit