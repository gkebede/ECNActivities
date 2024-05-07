import React from 'react';
import { useField} from 'formik';
import { Form, Label } from 'semantic-ui-react';
import { boolean } from 'yup';


interface Props {
    placeholder: string;
    name: string;
    label? : string;
    type? : string;
}

export default  function MyTextInput (props: Props) {

    const [ field, meta] = useField(props.name)

    return(
         
       // !!meta.touched === it is a boolean
        
        <Form.Field  error={meta.error && !!meta.touched}>

            <label>{props.label}</label>
           <input {...field} {...props} />  
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
      

        )

}