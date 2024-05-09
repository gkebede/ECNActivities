import { Dimmer, Loader } from 'semantic-ui-react';


interface Props {

    inverted?: boolean;
    size?:string
    content: string
}


export default function 
 ({inverted = true, content = 'Loading...'} : Props) {

return (

    <Dimmer active = {true} inverted = {inverted}>

        <Loader  content = { content }  />

    </Dimmer>
)

}


