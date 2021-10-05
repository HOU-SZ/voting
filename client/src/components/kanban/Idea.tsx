import React, { useState } from "react";
// import InputEmoji from 'react-input-emoji';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

import{ Card, Form, Button, NavDropdown, Modal, Overlay, Tooltip, Popover, OverlayTrigger } from "react-bootstrap";
import { BsX, BsCheck, BsCheck2, BsXLg, BsCheckLg, BsStar, BsStarFill, BsEmojiSmile } from "react-icons/bs";
import { ideaLikeProps } from ".";
import classnames from "classnames";
import "./Idea.css";


var temp = 0;

export default function IdeaCard(props: any) {
  const {
    description = "new idea",
    likeable,
    likeCount = 0,
    columnId,
    topicId,
    editable,
    ideaId,
    haveLiked,
    ideaLikes,
    onSaveIdea,
    onDeleteIdea,
    onClickLike,
    onAddLike,
    onDelLike,
    dragula,
  } = props;

  // var {likeable} = props;
  // var likeable = true;
  // var {likeCount} = props;

  const [editContent, setContent] = useState(description);
  const [isEdit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [target, setTarget] = useState();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const popover = (
    <Popover id="popover-basic">
      <Picker 
            emoji=''
            showPreview={true} 
            onClick={(emoji)=>searchEmoji(emoji)} />
    </Popover>
  );

  // const userId = parseInt(localStorage.getItem('userId') ?? '0');
  // const likedIdea = ideaLikes?.find((like: ideaLikeProps) => like.userId === userId);
  
  var likedIdea = haveLiked ? haveLiked[0] : false;



//   const {
//     expanded: openFilter,
//     handlers: filterHandlers,
//     wrapperRef: filterWrapperRef,
//   } = useTooltipState();

 function searchEmoji(emoji: any) {
    let chatContent = editContent + emoji.native;
    setContent(chatContent);
  }

  function handleSaveIdea() {
    if (isEdit) {
      onSaveIdea(columnId, ideaId, editContent);
      dragula.containers = temp;
    }
    setEdit(false);
  }

  function handleDeleteIdea() {
    onDeleteIdea(columnId, ideaId);
  }

  function handleClickLike() {
    // if (likeable){
    //   likeable = false;
    //   onClickLike(columnId, ideaId, !likeable, likedIdea);
    //   likedIdea = true;
    //   likeCount = likeCount + 1;
    // }
    // else{
    //   onClickLike(columnId, ideaId, likeable, likedIdea);
    //   likedIdea = false;
    // }
    onClickLike(columnId, topicId, ideaId, likeable, likedIdea);
  }

  function handleAddLike() {
    onAddLike(columnId, topicId, ideaId, likeable, likedIdea);
  }

  function handleDelLike() {
    onDelLike(columnId, ideaId, likeable, likedIdea);
  }

  return (
    <div data-ideaid={ideaId}>
    <Card className={classnames("idea-container")} data-ideaid={ideaId} >
    <Card.Body>
      <div className={classnames("idea-content-wrapper")}>
        <div className={classnames("idea-content")}>
          {isEdit ? (
            <>
                <Form.Group> 
                  {/* <BsEmojiSmile style={{cursor: 'pointer' }} onClick={(e) => setShowEmoji(!showEmoji)}/> */}
                    <Form.Control as="textarea" rows={2} placeholder="Idea Input" value={editContent} onChange={(e) => setContent(e.target.value)} />
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                      <Button variant="light" size="sm">
                      <BsEmojiSmile/>
                      </Button>
                    </OverlayTrigger>
                </Form.Group>
                {/* <InputEmoji placeholder="Idea Input" value={editContent} onChange={(e) => setContent(e.target.value)}/> */}
              <div className="idea-edit-control">
                  <BsX
                    onClick={() => {
                      dragula.containers = temp;
                      setEdit(false);
                      setContent(description);
                    }}
                  />

                  <BsCheck2 onClick={handleSaveIdea} />

              </div>
            </>
          ) : (
            <span>{description}</span>
          )}
        </div>
        {editable && (
            <NavDropdown title="">
            <NavDropdown.Item onClick={() => {
                  setEdit(true);
                  // dragula.dragging = false;
                  temp = temp ? temp : dragula.containers;
                  // console.log(temp);
                  dragula.containers = [];
                  }}>Edit</NavDropdown.Item>
                  
            <NavDropdown.Item onClick={handleDeleteIdea}>Delete</NavDropdown.Item>
            </NavDropdown>
        )}
      </div>
      <div className={classnames("idea-like-controller")}>
        <div style={{ display: "flex" }}>
          {likeable ? 
          // <Button variant="tertiary">
            likedIdea ?
            <BsStarFill onClick={handleAddLike}/>
            :
            <BsStar onClick={handleAddLike}/>
            // }
          // {/* </Button> */}
          :
          // <Button variant="tertiary" disabled>
            likedIdea ?
            <BsStarFill onClick={handleShow} />
            :
            <BsStar onClick={handleShow} />
            
          // </Button>
          }
          <h5 className="likeCount">{likeCount}</h5>
          {likedIdea ?
            // <Button variant="tertiary" >
            <BsX onClick={handleDelLike}/>
            // {/* </Button> */}
            :
            <></>
          }
        </div>
      </div>
    </Card.Body>
    </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Failure</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    You seem to have exceeded the maximum number of likes allowed, please check.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>Understood</Button>
    </Modal.Footer>
  </Modal>
  </div>
  );
}
