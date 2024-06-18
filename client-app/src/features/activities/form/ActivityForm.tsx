// import { observer } from 'mobx-react-lite';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
// import { Button,  FormMyTextInput,  Header,  Input,  Label,  Segment } from 'semantic-ui-react';
// import { useStore } from '../../../app/stores/store';
// import { v4 as uuid } from 'uuid';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
// import { Formik, Form, MyTextInput, ErrorMessage } from 'formik';
// import { FormikValues, FormikHelpers } from 'formik/dist/types';
// import MyTextInput from '../../../app/common/form/MyTextInput';
// import MyTextArea from '../../../app/common/form/MyTextArea';
// import MySelectInput from '../../../app/common/form/MySelectInput';
// import { categoryOptions } from '../../../app/common/options/CategoryOptions';
// import MyDateInput from '../../../app/common/form/MyDateInput';



import { Button, Header, Label, Segment } from "semantic-ui-react";
//import { Activity } from '../../../app/models/activity';
import { SyntheticEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";



export default observer(function ActivityForm() {
    //var activity = await _context.Activities.FindAsync(request.Activity.Id);
    // activity === selectedActivity --- if(selectedActivity === null or undefined)=>return; 
    // else -set- the selectedActivity to the incoming object i.e = {id:'', title:'', ...}

    const { activityStore } = useStore();
    const {createActivity, updateActivity,loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is requird'),
        description: Yup.string().required('The activity description is requird'),
        category: Yup.string().required('The activity category is requird'),
        date: Yup.string().required('The activity date is requird'),
        city: Yup.string().required('city is requird'),
        venue: Yup.string().required('venue is requird'),
    });


    useEffect(() => {
        if(id) {
            loadActivity(id).then(activity => setActivity(activity!))
        }
    }, [id, loadActivity]);

    function handleFormSubmit(activity: Activity) {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
      //   activity.id = uuid();
         createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
       // activity.id ? updateActivity(activity) : createActivity(activity);
    }
  
    //function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //  const { name, value } = event.target;  }
    // function handleInputChange(event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.currentTarget;
    //     setActivity({ ...activity, [name]: value })
    // }
      

    if(loadingInitial) <LoadingComponent content="Loadding activity..." />
    return (

        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
             validationSchema={validationSchema}
            enableReinitialize
            initialValues={activity} onSubmit={values =>handleFormSubmit(values)}>
                {({ handleSubmit, isSubmitting, isValid, dirty})=>(
                    
                    <Form className="ui form" autoComplete='off' onSubmit={handleSubmit}>
                    <MyTextInput placeholder='Title'  name='title' />
                    <MyTextArea rows={3} placeholder='Description'  name='description' />
                    <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                    <MyDateInput 
                     placeholderText='Date'
                     name='date'
                     showTimeSelect
                     timeCaption="time"
                     dateFormat='MMM d, yyyy h:mm aa'
                      />
                        <Header content='Location Details' sub color='teal' />
                    <MyTextInput placeholder='City'  name='city' />
                    <MyTextInput placeholder='Venue' name='venue' />
                    <Button
                    disabled={isSubmitting || !dirty || !isValid} 
                    loading={loading} floated='right' positive type='submit' content='Submit' />
                    <Button as={Link} to={`/activities`} floated='right' type='button' content='Cancel' />
                </Form>
                )}
            
            </Formik>
        </Segment>
    )
})

