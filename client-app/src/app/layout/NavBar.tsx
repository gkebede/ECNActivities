import { Button, Container, Dropdown, Menu } from "semantic-ui-react"
import { NavLink} from "react-router-dom";

export default function NavBar() {

  return(
        <Menu inverted fixed="top">
            <Container>
                 <Menu.Item header as={NavLink}  to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10 }} />
                    ECN Activites
                </Menu.Item>

                <Menu.Item   as={NavLink}  to='/activities'    name="Activities" />
                <Menu.Item   as={NavLink}  to='/errors'    name="Errors" />

                <Menu.Item position="right" >
                    <Dropdown pointing='top left'  >
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink}  to='/login'    text='My Profile' icon='user' />
                            <Dropdown.Item as={NavLink}  to='/activities'   text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

                <Menu.Item >
                    <Button as={NavLink}   to='/createActivity'  positive content="Create Activity"  />
                </Menu.Item>
            </Container>
        </Menu>
        )

}
