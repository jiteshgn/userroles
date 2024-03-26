import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { roles } from "./roles";

export default function Create(){
    const [values,setValues]=useState({
        name:'',
        email:'',
        roles:''
    });
    const [err,setErr]=useState({error:''})
    let uniq=true;
    let errmsg='';
    const navigate=useNavigate();
    const handleSubmit=(event:any)=>{
        event.preventDefault();
        console.log(111,values)
        if(values){
            axios.get('http://localhost:3000/users')
            .then(res=>{
                res.data.map((data:any)=>{         
                    !values.roles?errmsg='Role cannot be empty':''   
                    data.email==values.email?errmsg='Email not Unique':''  
                    !values.email?errmsg='Email cannot be empty':''  
                    !values.name?errmsg='Name cannot be empty':''   
            })
                setErr(err => ({ ...err, error: errmsg}))
            })
            .then(()=>{
                console.log(333,err)
                if(!errmsg){
                    axios.post('http://localhost:3000/users',values)
                    .then(res=>{console.log(res.data);
                        setErr(err => ({ ...err, error: 'added'}))
                        setTimeout(()=>{navigate('/')},2000)  
                    
                    })
                    .catch(err=>console.log(err))
                }
            })
            .catch(err=>console.log(err))
        }
        console.log(555,uniq)
    }
    useEffect(()=>{
        

    },[])
    return (
       <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-100 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h1>Add a User</h1>
                {err.error?err.error!=='added'?<div className="errmsg">{err.error}</div>:<div className="sucmsg">User Added Successfully</div>:''}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" required className="form-control" placeholder="Enter Name" onChange={e=>setValues({...values,name:e.target.value})}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name">Email:</label>
                            <input type="email" name="email" required className="form-control" placeholder="Enter Email" onChange={e=>setValues({...values,email:e.target.value})}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name">Role:</label>
                            <select name="roles" className="form-control" onChange={e=>setValues({...values,roles:e.target.value})}>
                                <option value=''>Select an Option</option>
                                {roles.map((role:any,id:number)=>(
                                    <option key={id} value={role}>{role}</option>
                                ))}
                            </select>
                            {/* <input type="text" name="roles" className="form-control" placeholder="Enter Role" onChange={e=>setValues({...values,roles:e.target.value})}/> */}
                        </div>
                        <button className="btn btn-success">Submit</button>
                        <Link to="/" className="btn btn-primary ms-3">Back</Link>
                    </form>

            </div>
       </div>
    )
}