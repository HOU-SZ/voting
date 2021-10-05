import { ListGroup, Card, Button, Container } from 'react-bootstrap';
import { useTopicListHook } from '../hooks/useTopicListHook';
import { BsPencilFill, BsTrashFill, BsArrowLeft, BsArrowRight } from "react-icons/bs";



export default function TopicList(props){

    const {editTopic, deleteTopic, setNext, setPrev, currentList, currentPage, totalPage} = useTopicListHook(props)

    return (
        
        <div className='py-4'>

            <Container>
            
            <h1 className='text-center py-4'>All Topics</h1>

            <ListGroup variant="flush">
                {
                currentList.map((topic) =>
                    <ListGroup.Item key={topic.TopicId}>
                        <Card >
                        <Card.Body>
                        <Card.Title><a href={"/topics/" + topic.TopicId.toString()}>{topic.TopicContent.length<=60 ? topic.TopicContent : topic.TopicContent.slice(0,57)+"..." }</a></Card.Title>
                        <Card.Text>Created at {topic.CreatedAt.slice(0,10)}</Card.Text>
                        <Button variant="light" label="Edit"><BsPencilFill onClick={e => editTopic(topic.TopicId)}/></Button>{'  '}
                        <Button variant="light" label="Delete" onClick={e => deleteTopic(topic.TopicId)}><BsTrashFill onClick={e => deleteTopic(topic.TopicId)}/></Button>
                        </Card.Body>
                        </Card>
                    </ListGroup.Item>)
                }
            </ListGroup>
            <br/>

            <div style={{textAlign: 'center'}}>
            { currentPage === 1 ?
                <Button variant="light" label="Previous" disabled><BsArrowLeft onClick={e => setPrev(currentPage)} /></Button>
            :
                <Button variant="light" label="Previous"><BsArrowLeft onClick={e => setPrev(currentPage)}/></Button>
            }
            
            {currentPage}/{totalPage} Pages
            
            { currentPage === totalPage ?
            <Button variant="light" label="Next" disabled><BsArrowRight onClick={e => setNext(currentPage)}/></Button>
            :
            <Button variant="light" label="Next" ><BsArrowRight onClick={e => setNext(currentPage)}/></Button>
            }
            </div>

            </Container>

        </div>
        )
}