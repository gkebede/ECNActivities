import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react"
import { NavLink} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const{userStore: {user, logout}} = useStore();

  return(
        <Menu inverted fixed="top">
            <Container>
                 <Menu.Item header as={NavLink}  to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: 10 }} />
                    ECN Activites
                </Menu.Item>

                <Menu.Item   as={NavLink}  to='/activities'    name="Activities" />
                <Menu.Item   as={NavLink}  to='/errors'    name="Errors" />
                <Menu.Item >
                    <Button as={NavLink}   to='/createActivity'  positive content="Create Activity"  />
                </Menu.Item>

                <Menu.Item position="right" >
                    <Image avatar spaced='right' src={user?.image || '/assets/user.png'} />
                    <Dropdown pointing='top left' text={user?.displayName}  >
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink}  to={`/profile/${user?.username}` }  text='My Profile' icon='user' />
                            <Dropdown.Item as={NavLink}  onClick={logout}   text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

                
            </Container>
        </Menu>
        )

})
