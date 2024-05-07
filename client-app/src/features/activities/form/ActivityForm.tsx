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


// // if u want give identical name for a variable on a given page u 

// // can give any randem name for the varible that we passing down as a Props

// import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from '../../../app/models/activity';
import { ChangeEvent, useState } from "react";

interface Props {
    activity: Activity | undefined,
    closeForm : () => void,
    createOrEdit : (activity: Activity) => void,
}

export default function ActivityForm({activity: selectedActivity,closeForm, createOrEdit} : Props) {
  //var activity = await _context.Activities.FindAsync(request.Activity.Id);
  // activity === selectedActivity --- if(selectedActivity === null or undefined)=>return; 
  // else -set- the selectedActivity to the incoming object i.e = {id:'', title:'', ...}
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
        createOrEdit(activity);
    }

    

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    

    return (
        
        <Segment clearing>
            <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button onClick={handleSubmit} floated='right' positive type='submit' content='Submit' />
                <Button  floated='right' onClick={closeForm} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}


// export default observer(function ActivityForm() {

//     const { activityStore } = useStore();
//     const { selectedActivity, createActivity, 
//        loadActivity, updateActivity, loading } = activityStore;
//     const navigate = useNavigate();

//     const { id } = useParams<{id: string}>();
//     // const history = useNavigate()

//     const initialState = selectedActivity ?? {

//         "id": '',
//         "title": '',
//         "date": null,
//         "description": '',
//         "category": '',
//         "city": '',
//         "venue": ''
//     }

//     const validationSchema = Yup.object ({

//         title: Yup.string().required('The activity title is required'),
//         description: Yup.string().required('The activity description is required'),
//         category: Yup.string().required('Date required').nullable(),
//         date: Yup.string().required(),
//         city: Yup.string().required(),
//         venue: Yup.string().required()

//     })

//     // b/c we want use activity on the page we call selectedActivity on the Props varible

//     const [activity, setActivity] = useState(initialState);

//     useEffect( () => {

//         if(id) loadActivity(id).then( activity => { setActivity(activity!)})
//     }, [id, loadActivity])

//     function handleSubmit() {

//         if(activity.id.length === 0) {
//             let newActivity = {
//                 ...activity,
//                 id: uuid()
//             };

//             // createActivity(newActivity).then( () => {
//             //     history(`/activities/${newActivity.id}`)
//             // })
//         }
//     }



//     if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity... ' />

//     return (


//         <Segment clearing>

//             <Header content='Activity Details' sub color='teal' />

//             <Formik 
//             validationSchema={validationSchema}
//             enableReinitialize 
//             initialValues={activity}
//             onSubmit={(value) => console.log(value)}>
//                 {({ handleSubmit, isValid, isSubmitting, dirty }) => (

//                     // {   activity && 

//                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >

//                         <MyTextInput placeholder='Title' name='title' />
//                         <MyTextArea rows={3} placeholder= 'Description' name='description' />                          
//                         <MySelectInput options={categoryOptions} placeholder='Category' name='category'  />             
//                         <MyDateInput
//                          placeholderText='date' 
//                          name='date' 
//                          showTimeSelect
//                          timeCaption='time'
//                          dateFormat='MMM d, yyyy h:mm aa'
//                          />   
//                           <Header content='Location Details' sub color='teal' />
//                         <MyTextInput placeholder='City' name='city' />
//                         <MyTextInput placeholder= 'Venue' name='venue' />                       

//                         <Button
//                         disabled={ isSubmitting || !dirty || !isValid}
//                          loading={loading} content='Submit' type='submit' floated='right' positive />
//                         <Button floated='right' content='Cancel' type='button' as={Link} to={'/activities'} />


//                     </Form>

//                 )}
//             </Formik>



//         </Segment>



// )

// } )