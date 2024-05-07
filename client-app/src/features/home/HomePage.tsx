import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityForm from "../activities/form/ActivityForm";
import LoginForm from "../users/LoginForm";
import RegsiterForm from "../users/RegsiterForm";

export default observer ( function HomePage() {

    const {modalStore, userStore: {isLoggedIn, user}} = useStore();

    return (

        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as= 'h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>


                {
                       isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content={`Welcome back ${user?.displayName.toUpperCase()}`} />
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Go to activities!
                        </Button>
                    </>

                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>

                        <Button onClick={() => modalStore.openModal(<RegsiterForm/>)} size='huge' inverted>
                        Register!
                        </Button>
                      
                    </>

                )}

            </Container>

        </Segment>
    )
} )