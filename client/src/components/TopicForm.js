import React, {useState, useEffect} from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
import {createAPIEndpoint, ENDPOINTS} from "../api";
import {Redirect} from 'react-router-dom';
import TopicList from './TopicList';
import { useTopicFormHook } from '../hooks/useTopicFormHook';


export default function TopicForm(props) {

    const { HandleChange, resetFormControls, submitTopic, setTopicId, setSubmitted, topicId, submitted, values, errors } = useTopicFormHook(props)
    
    return (
        <div>
            <main className='text-center py-4'>
                <Container>
                    <h1>Create Your Topic</h1>

                    <Form onSubmit={submitTopic}>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter your topic description" name="TopicContent" value={values.TopicContent}  onChange={HandleChange}/>
                            <Form.Text className="text-muted">
                            {errors.TopicContent ? errors.TopicContent : "Max 200 characters"}
                            </Form.Text>
                        </Form.Group>

                        {!topicId ?
                            <Form.Group className="mb-3">
                            <Form.Label>Select Column Number</Form.Label>
                            <Form.Select id="select-1" name="NumberColumn" value={values.NumberColumn} onChange={HandleChange}>
                            <option>- Select -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.NumberColumn}
                            </Form.Text>
                            </Form.Group>
                        :
                            <Form.Group className="mb-3">
                            <Form.Label>Select Column Number</Form.Label>
                            <Form.Select id="select-1" name="NumberColumn" value={values.NumberColumn} onChange={HandleChange} readOnly>
                            <option>- Select -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.NumberColumn}
                            </Form.Text>
                            </Form.Group>
                        }

                        {!topicId ?
                            <Form.Group className="mb-3">
                            <Form.Label>Allow Anonymous</Form.Label>
                            <Form.Select id="select-2" name="IsAnonymous" value={values.IsAnonymous} onChange={HandleChange}>
                            <option>- Select -</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.IsAnonymous}
                            </Form.Text>
                            </Form.Group>
                        :
                            <Form.Group className="mb-3">
                            <Form.Label>Allow Anonymous</Form.Label>
                            <Form.Select id="select-2" name="IsAnonymous" value={values.IsAnonymous} onChange={HandleChange} readOnly>
                            <option>- Select -</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.IsAnonymous}
                            </Form.Text>
                            </Form.Group>
                        }

                        <Form.Group className="mb-3">
                        <Form.Label>Only One Like per Idea</Form.Label>
                        <Form.Select id="select-2" name="OneLikePerIdea" value={values.OneLikePerIdea} onChange={HandleChange}>
                        <option>- Select -</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            {errors.OneLikePerIdea}
                        </Form.Text>
                        </Form.Group>

                        {!topicId ?
                            <Form.Group className="mb-3">
                            <Form.Label>Select Max Like per User</Form.Label>
                            <Form.Select id="select-4" name="MaxLikePerUser" value={values.MaxLikePerUser} onChange={HandleChange}>
                            <option>- Select -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.MaxLikePerUser}
                            </Form.Text>
                            </Form.Group>
                        :
                            <Form.Group className="mb-3">
                            <Form.Label>Select Max Like per User</Form.Label>
                            <Form.Select id="select-4" name="MaxLikePerUser" value={values.MaxLikePerUser} onChange={HandleChange} readOnly>
                            <option>- Select -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                {errors.MaxLikePerUser}
                            </Form.Text>
                            </Form.Group>
                        }

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>{'  '}
                        <Button variant="secondary" type="reset" onClick={resetFormControls}>Reset</Button>
                    </Form>

                </Container>
            </main>
            
            <TopicList {...{setTopicId, submitted, setSubmitted}} />
        </div>
    )
    
}