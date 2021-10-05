import React, {Redirect} from 'react';
import NavBar from './NavBar';
import Footer from './footer'
import { Container } from 'react-bootstrap';
// import './home.css'

export default function Home() {

    return (
        <div>
            <NavBar />
            <main className='text-center py-4'>
                <Container>
                    <h1>Welcome to VoTeam!</h1>
                    <h2>Brainstorm and vote your favorite ideas!</h2>
                </Container>
            </main>
            {/* <Footer /> */}
        </div>
    )
}