import { useEffect, useState } from 'react';
import './User.css'
import axios from 'axios';

function User(){
  let selection = ['Author', 'Editor', 'Subscriber', 'Administrator'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: ''
  });
  const handleChange = (e:any) => {
    // const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    // console.log(formData)
    // if(e.options)
    // {e?.options[e.selectedIndex]?.value?console.log(e.options[e.selectedIndex].value):''}
    setFormData(prevFormState => ({
          ...prevFormState,
          [e.target.name]: e.target.value
        }));
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((result) => {
        console.log(result.data);
        // setPosts(result.data);
      })
      .catch((error) => console.log(error));
  }, [formData]);
  // const handleSubmit = async (e:any) => {
  //   e.preventDefault();
  //   console.log(formData)
  //   try {
  //     const response = await axios.post('YOUR_API_ENDPOINT', formData);
  //     console.log('Form data submitted successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error submitting form data:', error);
  //   }
  // };
  const handleSubmit = (event:any) => {
    event.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', { formData })
      .then(res=>{
        console.log(res);
        // console.log(res.data);
        // window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      })
    }


  return (
    <>
    <form className='userform' onSubmit={handleSubmit}>
      <div><label>Name: </label><input type="text" required name="name" id="name" value={formData.name} onChange={handleChange}/></div>
      <div><label>Email: </label><input type="email" required name="email" id="email" value={formData.email} onChange={handleChange}/></div>
      <div><label>Roles: </label>      
      <select name="roles" id="roles" className="form-control" onClick={handleChange}>
            <option value="">Please Select Option</option>';
            {selection.map((sel:any)=>(
                <option value={sel} key={sel}>{sel}</option>
            ))};
      </select>     
      </div>
      <div><button id="sbtbtn" name="sbtbtn">Submit</button></div>
    </form>
    </>
  )
}


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default User
