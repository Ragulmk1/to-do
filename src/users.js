import React, { useEffect } from 'react'
import axios from 'axios';
const users = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        const res=axios.get("http://localhost:3001/users").then(()=>{
            data=res.data;
        })
        .catch((e)=>{
            console.log(e);
        })
    })
  return (
    <div>
            <h1>Dynamic React Table</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default users;