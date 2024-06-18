import { ErrorMessage, useField} from 'formik';
import { Form, Label } from 'semantic-ui-react';
import { boolean } from 'yup';


interface Props {
    placeholder: string;
    name: string;
    label? : string;
    type? : string;
}

export default  function MyTextInput (props: Props) {

    const [field, meta] = useField(props.name)

    return(
         
       // !!meta.touched ===  '!!' change the object  boolean
        
        <Form.Field  error={meta.error && !!meta.touched}>

            <label>{props.label}</label> 
           <input {...field} {...props} />  
            {meta.touched && meta.error ? (
                 <Label basic color='red'>{meta.error}</Label>
                //  <ErrorMessage name={props.name}> 
                //  {err =><p>{err}</p>} 
                //   </ErrorMessage>
            ) : null}

        </Form.Field>
      

        )

}