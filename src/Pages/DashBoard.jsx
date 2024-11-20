import React, { useEffect, useState } from 'react'
import './dasboard.css'
import { deletegrevApi, getreq } from '../services/allApi'
import { useNavigate } from 'react-router-dom'

export default function DashBoard() {

const [allgrev,setallgrev]= useState([])
const [searchKey, setsearchKey] = useState('')
const navigate = useNavigate()

useEffect(() => {
  const authToken = sessionStorage.getItem('authToken');
  if (authToken !== 'true') {
      navigate('/')
  }
}, []);
const handlelogout=()=>{
  sessionStorage.removeItem('authToken');
  navigate('/')
}

const getallgrevItems = async()=>{
  const res = await getreq(searchKey)
  console.log(res);
  setallgrev(res.data)
  console.log(allgrev);
  
}

useEffect(()=>{
  getallgrevItems();
},[searchKey])

const handleDelete = async (id) => {
  
  const result = await deletegrevApi(id)
  console.log('delete response', result);
  if (result.status === 200) {
      alert("Grievance completed")
      getallgrevItems()
  }
  else {
      alert('Somthing went wrong')
  }

}

  return (
    <div className="dashboard-page">
        <div className="dashboard-container">
      <h1>Superhero Dashboard</h1>
      
      <div className="dashboard-controls">
        
        <input type="text" className="search-bar" placeholder="Search by name..." 
        onChange={(e) => setsearchKey(e.target.value)}/>
        <button className='manage-btn'
        onClick={handlelogout}
        >Logout</button>
      </div>

      
      <div className="grievance-list">
      {
            allgrev?.length>0?
            allgrev.map((item)=>(
              <div className="grievance-item">
              <h3>{item.name}</h3>
              <p>{item.grievance}</p>
              <button className="manage-btn"
              onClick={() => handleDelete(item._id)}
              >Completed</button>
            </div>
            )):
            <p>No Grievances Found</p>
          }
       
        
      </div>
    </div>
    </div>
  )
}
