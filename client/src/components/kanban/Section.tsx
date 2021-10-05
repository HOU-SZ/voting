import React, { forwardRef, ForwardedRef, useState } from 'react';
import {Button, Form} from "react-bootstrap";
import { BsPlus, BsPencil, BsTrash  } from "react-icons/bs";

import './Section.css';

export default forwardRef(function Section(props: any, ref: ForwardedRef<HTMLDivElement>) {
  const { title = 'section', children, onAddIdea, onEditTitle, onDeleteSection, columnId, editable } = props;

  const [editTitle, setEditTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  function handleAddIdeaButton() {
    onAddIdea(columnId);
  }

  function handleEditTitle() {
    if (editTitle) {
      onEditTitle(columnId, inputTitle);
    }
    setEditTitle(!editTitle);
  }

  function handleDeleteSection() {
    onDeleteSection(columnId);
  }

  return (
    <div className='section-container' >
      <h4 className='section-title'>
        {
          editTitle
          ? (
        <>
          <Form.Control type="text" placeholder="Input title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
          {/* <FormInput inputMode="text" placeholder="Input title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} /> */}
          {/* <IconTrash className="section-title-edit" onClick={handleDeleteSection} /> */}
          <BsTrash className="section-title-edit" onClick={handleDeleteSection}/>
        </>
          )
          : <span>{title}</span>
        }

        {
        //   editable ? <IconPencil className="section-title-edit" onClick={handleEditTitle} /> : <></>
        editable ? <BsPencil className="section-title-edit" onClick={handleEditTitle}/> : <></>
        }
        
      </h4>
      {/* <Button variant="tertiary" height='small' onClick={handleAddIdeaButton}><IconPlus />add</Button> */}
      <Button onClick={handleAddIdeaButton}><BsPlus />add</Button>
      <div className='card-item-list' data-columnid={columnId} ref={ref} >
        {children}
      </div>
    </div>
  )
})