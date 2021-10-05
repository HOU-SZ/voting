import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export const useTopicListHook = (props) => {
  const getFreshModeObject = () => ({
    TopicContent: "",
    IsAnonymous: "",
    NumberColumn: 0,
    MaxLikePerUser: 0,
    OneLikePerIdea: "",
  });

  const { setTopicId, submitted, setSubmitted } = props;

  const [topicList, setTopicList] = useState([]);
  const [openModal, setOpenModal] = useState("");
  const [currentList, setCurrentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  var CryptoJS = require("crypto-js");

  useEffect(() => {
    // const idList = [1,2,3,4,5,6,7,8,9,10,11,12];
    // const mockTopicList = idList.map(id => ({
    //     TopicId: encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), 'VoTeam_2021').toString()),
    //     TopicContent: "Sample Topic " + id.toString(),
    //     CreatedAt: "2021-10-07T23:02:29",
    // })); // Sample data

    // setTopicList(mockTopicList);
    // setTotalPage(Math.floor((mockTopicList.length-1)/10)+1);
    // setCurrentList(mockTopicList.slice(0,10));
    // setCurrentPage(1);
    createAPIEndpoint(ENDPOINTS.TOPICS)
      .fetchAll()
      .then((res) => {
        let topicList = res.data.map((item) => ({
          TopicContent: item.topicContent,
          UserId: item.userId,
          TopicId: encodeURIComponent(
            CryptoJS.AES.encrypt(item._id.toString(), "VoTeam_2021").toString()
          ),
          IsAnonymous: item.isAnonymous,
          NumberColumn: item.numberColumn,
          MaxLikePerUser: item.maxLikePerUser,
          OneLikePerIdea: item.oneLikePerIdea,
          CreatedAt: item.createdAt,
        }));
        setTopicList(topicList);
        setTotalPage(Math.floor((topicList.length - 1) / 5) + 1);
        setCurrentList(topicList.slice(0, 5));
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log(err);
        setCurrentList([]);
      });
  }, [submitted]);

  const editTopic = (topicId) => {
    var bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(topicId),
      "VoTeam_2021"
    );
    var trueTopicId = bytes.toString(CryptoJS.enc.Utf8);
    setTopicId(trueTopicId);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const deleteTopic = (topicId) => {
    var bytes = CryptoJS.AES.decrypt(
      decodeURIComponent(topicId),
      "VoTeam_2021"
    );
    var trueTopicId = bytes.toString(CryptoJS.enc.Utf8);
    createAPIEndpoint(ENDPOINTS.TOPICS)
      .delete(trueTopicId)
      .then((res) => {
        setSubmitted(submitted + 1);
        // window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const setNext = (currentPage) => {
    if (currentPage < totalPage) {
      setCurrentList(topicList.slice(currentPage * 5, (currentPage + 1) * 5));
      setCurrentPage(currentPage + 1);
    }
  };

  const setPrev = (currentPage) => {
    if (currentPage > 1) {
      setCurrentList(
        topicList.slice((currentPage - 2) * 5, (currentPage - 1) * 5)
      );
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    editTopic,
    deleteTopic,
    setNext,
    setPrev,
    currentList,
    currentPage,
    totalPage,
  };
};
