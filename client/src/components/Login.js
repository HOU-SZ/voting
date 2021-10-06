import { Container, Form, Button, Row } from 'react-bootstrap';
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import NavBar from './NavBar'
import { useLoginHook } from '../hooks/useLoginHook';


export default function Login() {
    const { HandleChange, resetFormControls, submitLogin, logined, values, errors } = useLoginHook()

    return (
        <div>
            <NavBar />
            <main className='text-center py-4'>
                <Container>
                    <h1>Login</h1>
                    <Form onSubmit={submitLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="emailAddress" value={values.emailAddress} onChange={HandleChange}/>
                        <Form.Text className="text-muted">
                        {errors.emailAddress}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={values.password} placeholder="Password" onChange={HandleChange} />
                        <Form.Text className="text-muted">
                        {errors.password}
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>{'  '}
                    <Button variant="secondary" type="reset" onClick={resetFormControls}>Reset</Button>
                    </Form>
                </Container>
            </main>
            {logined === "true" ?(<Redirect to="/"/>):undefined}
            
        </div>
    )
}