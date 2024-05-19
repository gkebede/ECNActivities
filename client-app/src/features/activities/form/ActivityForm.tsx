// import { observer } from 'mobx-react-lite';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
// import { Button,  FormField,  Header,  Input,  Label,  Segment } from 'semantic-ui-react';
// import { useStore } from '../../../app/stores/store';
// import { v4 as uuid } from 'uuid';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { FormikValues, FormikHelpers } from 'formik/dist/types';
// import * as Yup from 'yup'
// import MyTextInput from '../../../app/common/form/MyTextInput';
// import MyTextArea from '../../../app/common/form/MyTextArea';
// import MySelectInput from '../../../app/common/form/MySelectInput';
// import { categoryOptions } from '../../../app/common/options/CategoryOptions';
// import MyDateInput from '../../../app/common/form/MyDateInput';



import { Button, Form, Segment } from "semantic-ui-react";
//import { Activity } from '../../../app/models/activity';
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer(function ActivityForm(){
  //var activity = await _context.Activities.FindAsync(request.Activity.Id);
  // activity === selectedActivity --- if(selectedActivity === null or undefined)=>return; 
  // else -set- the selectedActivity to the incoming object i.e = {id:'', title:'', ...}

   const {activityStore} = useStore();
   const {selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

   const initialState  =  selectedActivity?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

      const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id?updateActivity(activity) :createActivity(activity); 
    }

    //function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      //  const { name, value } = event.target.name;  }
    function handleInputChange(event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (
        
        <Segment clearing>
            <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button loading={loading}  floated='right' positive type='submit' content='Submit' />
                <Button  floated='right' onClick={closeForm} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
 