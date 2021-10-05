import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import KanBan, { haveLikedProps } from "./kanban";
import * as kanbanApi from "../api/kanban";
import NavBar from "./NavBar";
import * as UserInfoContext from '../context/userInfo'
import { ideaLikeProps } from "./kanban/index";
import { Container } from "react-bootstrap";

import './kanban/index.css';
import { AxiosResponse } from "axios";

// import * as dummy from "./dummyData.json";
// var testdata = require("./dummyData.json");

export default function Topic() {
  let { encryptedId } = useParams<any>();
  const CryptoJS = require("crypto-js");

  let bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedId),
    "VoTeam_2021"
  );
  let topicId = bytes.toString(CryptoJS.enc.Utf8);

  const [title, setTitle] = useState("");
  const [columns, setColumns] = useState(undefined);
  const [isUpdate, setUpdate] = useState(true);
  const [topicEditable, setTopicEditable] = useState(false);

  useEffect(() => {
    if (isUpdate) {
        // setColumns(testdata.topicColumns);
        // setTitle(testdata.topicContent);
        // setTopicEditable(testdata.editable);
      kanbanApi
        .fetchTopic(topicId)
        .then((res: AxiosResponse<any>) => {            
          setColumns(res.data.topicColumns);
          setTitle(res.data.topicContent);
          setTopicEditable(res.data.editable)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            const unregisterToken = localStorage.getItem("jwtToken") || "";
            kanbanApi.createUnregistersToken(unregisterToken).then((res) => {
              localStorage.setItem("jwtToken", res.data.token);
              localStorage.setItem("userAlias", "Anonymous user");
              UserInfoContext.userAliasRefresh("Anonymous user");
              kanbanApi.fetchTopic(topicId).then((res: AxiosResponse<any>) => {
                setColumns(res.data.topicColumns);
                setTitle(res.data.topicContent);
              })
              .catch((error) =>{
                window.location.href="/error";

              })
            })
          }
          else{
            
            window.location.href="/error";
          }
        });
      setUpdate(false);
    }
  }, [topicId, isUpdate]);

  function handleAddColumn(topicId: string, columnName: string) {
    kanbanApi
      .createColumn(topicId, columnName)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleUpdateColumnName(
    topicId: string,
    columnId: string,
    columnName: string
  ) {
    kanbanApi
      .updateColumn(topicId, columnId, columnName)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleDeleteColumn(columnId: string) {
    kanbanApi
      .delColumn(columnId)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleCreateIdea(
    topicId: string,
    columnId: string,
    description: string
  ) {
    kanbanApi
      .createIdea(topicId, columnId, description)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleDeleteIdea(ideaId: string) {
    kanbanApi
      .delIdea(ideaId)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleUpdateIdea(ideaId: string, description: string) {
    kanbanApi
      .updateIdea(ideaId, description)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleIdeaMoved(columnId: string, ideaId: string) {
    kanbanApi
      .updateColumnIdea(columnId, ideaId)
      .then((res) => {
        setUpdate(true);
      })
      .catch(() => {});
  }

  function handleClickLike(
    columnId: string,
    topicId: string,
    ideaId: string,
    likeable: boolean,
    likedIdea?: haveLikedProps
  ) {
    if (likeable) {
      kanbanApi
        .createIdeaLikes(columnId, topicId, ideaId)
        .then((res) => {
          setUpdate(true);
        })
        .catch(() => {});
    } else if (likedIdea) {
      kanbanApi
        .delIdeaLikes(likedIdea.likeId)
        .then((res) => {
          setUpdate(true);
        })
        .catch(() => {});
    }
  }

  function handleAddLike(
    columnId: string,
    topicId: string,
    ideaId: string,
    likeable: boolean,
    likedIdea?: haveLikedProps
  ) {
    if (likeable) {
      kanbanApi
        .createIdeaLikes(columnId, topicId, ideaId)
        .then((res) => {
          setUpdate(true);
        })
        .catch(() => {});
  }
}

  function handleDelLike(
    topicId: string,
    ideaId: string,
    likeable: boolean,
    likedIdea?: haveLikedProps
  ) {
    if (likedIdea) {
      kanbanApi
        .delIdeaLikes(likedIdea.likeId)
        .then((res) => {
          setUpdate(true);
        })
        .catch(() => {});
    }
  }

  return (
    <div>
      <NavBar />
      {/* <Banner>This is a banner</Banner> */}
      <Container>
      <h1 className='title'>{title}</h1>
      <KanBan
        topicId={topicId}
        columns={columns}
        topicEditable={topicEditable}
        onAddColumn={handleAddColumn}
        onUpdateColumnName={handleUpdateColumnName}
        onDelColumn={handleDeleteColumn}
        onAddIdea={handleCreateIdea}
        onDelIdea={handleDeleteIdea}
        onUpdateIdea={handleUpdateIdea}
        onIdeaMoved={handleIdeaMoved}
        onClickLike={handleClickLike}
        onAddLike={handleAddLike}
        onDelLike={handleDelLike}
      />
      </Container>
    </div>
  );
}