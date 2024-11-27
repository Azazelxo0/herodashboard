import React, { useEffect, useState } from 'react'
import './dasboard.css'
import { deletegrevApi, getreq } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

export default function DashBoard() {

  const [allgrev, setallgrev] = useState([])
  const [searchKey, setsearchKey] = useState('')
  
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      console.log('Inside dashboard');
      
    }
    else{
      navigate('/')
    }
  }, []);
  const handlelogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('LoggedUser')
    navigate('/')
  }

  const getallgrevItems = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const res = await getreq(reqHeader,searchKey)
    console.log(res);
    setallgrev(res.data)
    console.log(allgrev);

  }

  useEffect(() => {
    getallgrevItems();
  }, [searchKey])

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${token}`
    }
    const result = await deletegrevApi(reqHeader,id)
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

          <input type="text" className="search-bar" placeholder="Search by Name or Threat...."
            onChange={(e) => setsearchKey(e.target.value)} />

         
          <button className='manage-btn'
            onClick={handlelogout}
          >Logout</button>
        </div>


        <div className="grievance-list">
          {
            allgrev?.length > 0 ?
              allgrev.map((item) => (
                <div className="grievance-item">
                  <h3>{item.name}</h3>
                  <p>{item.grievance}</p>
                  <p>Threat levels: {item.category}</p>
                  <button className="manage-btn"
                    onClick={() => handleDelete(item._id)}
                  >Completed</button>
                </div>
              )) :
              <p>No Grievances Found</p>
          }


        </div>
      </div>
    </div>
  )
}
