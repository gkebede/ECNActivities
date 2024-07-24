import { ErrorMessage, Form, Formik, useFormik } from "formik";
import { values } from "mobx";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";


export default observer(function LoginForm() {

    const {userStore} = useStore();


    //THE FF is the show case for Formik inside the Formik form---

    // const formik = useFormik({
    //     initialValues:{ email: '', password: '', error: null },
    //     validate: values => {
    //         let errors = {} 

    //         //if(!values.email){ errors.email "required"}
    //         if(!values.password){ "password is required"}
    //         return errors
            
    //     },
    
    //     onSubmit:(values, { setErrors }) =>
    //         //to use setErrors we have to pass error parameter with value(error: null) on initialValues
    //         userStore.login(values).catch(() => setErrors({ error: 'Invalid email or password' })),
    // });


    //const formik = useFormik({initialValues:{}, onSubmit:(values) =>console.log(values)}) 

    
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
           // to use setErrors in Formik initialValues must include error property
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch( () => 
                setErrors({ error: 'Invalid email or password' }))}
      >
            {({ handleSubmit, isSubmitting, errors }) => (
           
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage name='error' render={() => 
                        <Label style={{ marginBottom: 10, fontSize:'22px'}} basic color='red' content={errors.error} />} />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
})