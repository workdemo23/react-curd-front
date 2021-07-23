import React, {useState} from 'react';
import axios from 'axios';

const TodoAdd = (props) => {
    let [account, setAccount] = useState({
        todo_description: '',
        todo_responsible: '',
        todo_priority: 'low',
        todo_completed: false
      });

      
        let onSubmit = (e) => {
            e.preventDefault();
            console.log("ok");
            console.log(account);

            axios.post('http://localhost:4000/todos/add',account)
            .then(res => console.log(res.data));

            setAccount({
                todo_description: '',
                todo_responsible: '',
                todo_priority: 'low',
                todo_completed: false
              });
        }

        let handleChange = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            account[name] = value;
            setAccount(account);
          }
        

    return(
        <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                name = "todo_description"                                
                                onChange={handleChange}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                name = "todo_responsible"
                                onChange={handleChange}
                                />
                    </div>                    

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    )    
}

export default TodoAdd