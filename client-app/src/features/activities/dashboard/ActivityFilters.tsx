import React, { useEffect } from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function ActivityFilters() {

 
    
    return (
      
        <>
          <Menu vertical size="large" style={{winth: '100%', marginTop: '27px'}}>
            <Header icon='filter' attached color='teal' content='All Activites'
             />
            <Menu.Item content='All Activites' />
            <Menu.Item content='I am going ' />
            <Menu.Item content='I am hosting' />
        </Menu>

        <Header />

        <Calendar />
        </>

      
    )
}