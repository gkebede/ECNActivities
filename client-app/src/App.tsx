import {useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react'

export interface Activity {
  id: number
  title: string
  date: string
  description: string
  category: string
  city: string
  venue: string
}

export interface Props {
  activities: Activity[];
}


function App() {
  const [activities, setActivities] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/activities/")
    .then(response => {
      console.log(response)
      setActivities(response.data)
    })
  }, [])
            
  return (
    <>
      <div className="App">
        < Header as="h2"  content='ECN-Activities'/>
         {
          <List>
             {
              activities.map((activity:any) => (
                <List.Item key={activity.id}>
                  {activity.title}
                </List.Item>
              ))
             }
          </List>
         }
      </div>
    </>
  )
}


export default App

