import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { roles } from "./roles";

export default function Update(){
    // const [data,setData]=useState<any>({})
    const {id}=useParams();
    const [values,setValues]=useState({
        name:'',
        email:'',
        roles:''
    });
    const [err,setErr]=useState({error:''})
    useEffect(()=>{
        axios.get('http://localhost:3000/users/'+id)
        .then(res=>{setValues(res.data);console.log(res.data)})
        .catch(err=>console.log(err))
    },[])
    const navigate=useNavigate();
    const handleUpdate=(event:any)=>{
        event.preventDefault();
        console.log(values)
        let errmsg='';
        axios.get('http://localhost:3000/users')
            .then(res=>{
                res.data.map(()=>{         
                    !values.roles?errmsg='Role cannot be empty':''   
                    // data.email!==values.email?errmsg='Email not Unique':''  
                    !values.email?errmsg='Email cannot be empty':''  
                    !values.name?errmsg='Name cannot be empty':''   
            })
            setErr(err => ({ ...err, error: errmsg}))
        })
        .then(()=>{
            console.log(333,err)
            if(!errmsg){
                axios.put('http://localhost:3000/users/'+id,values)
                .then(res=>{console.log(res.data);
                    setErr(err => ({ ...err, error: 'added'}))
                    setTimeout(()=>{navigate('/')},2000)  
                
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    return (        
       <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
       <div className="w-100 border bg-white shadow px-5 pt-3 pb-5 rounded">
           <h1>Update User</h1>
                {err.error?err.error!=='added'?<div className="errmsg">{err.error}</div>:<div className="sucmsg">User Edited Successfully</div>:''}
               <form onSubmit={handleUpdate}>
                   <div className="mb-2">
                       <label htmlFor="name">Name:</label>
                       <input type="text" name="name" required className="form-control" placeholder="Enter Name" value={values.name} onChange={e=>setValues({...values,name:e.target.value})}/>
                   </div>
                   <div className="mb-2">
                       <label htmlFor="name">Email:</label>
                       <input type="text" disabled name="email" className="form-control" placeholder="Enter Email" value={values.email} onChange={e=>setValues({...values,email:e.target.value})}/>
                   </div>
                   <div className="mb-2">
                       <label htmlFor="name">Role:</label>
                       {/* <input type="text" name="roles" className="form-control" placeholder="Enter Role" value={values.roles} onChange={e=>setValues({...values,roles:e.target.value})}/> */}
                       
                       <select name="roles" className="form-control" onChange={e=>setValues({...values,roles:e.target.value})}>
                                {roles.map((role:any,id:number)=>(
                                    // <option key={id} value={role}>{role}</option>
                                    // <option key={id} value={role}>{role}</option
                                    (values.roles==role)?<option key={id} value={role} selected>{role}</option>:<option key={id} value={role}>{role}</option>
                                ))}
                            </select>
                   </div>
                   <button className="btn btn-success">Update</button>
                   <Link to="/" className="btn btn-primary ms-3">Back</Link>
               </form>

       </div>
  </div>
    )
}