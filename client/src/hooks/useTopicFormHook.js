import React, { useState, useEffect, useRef } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export const useTopicFormHook = (props) => {
  const getFreshModeObject = () => ({
    TopicContent: "",
    IsAnonymous: "",
    NumberColumn: 0,
    MaxLikePerUser: 0,
    OneLikePerIdea: "",
  });

  const [values, setValues] = useState(getFreshModeObject());
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(0);
  const [topicId, setTopicId] = useState(0);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetFormControls = () => {
    setValues(getFreshModeObject());
    setErrors({});
    setTopicId(0);
  };

  useEffect(() => {
    if (!topicId) resetFormControls();
    else {
      createAPIEndpoint(ENDPOINTS.TOPICS)
        .fetchById(topicId)
        .then((res) => {
          let topicData = res.data;
          values.TopicContent = topicData.topicContent;
          values.TopicId = topicData.topicId;
          values.IsAnonymous = Number(topicData.isAnonymous);
          values.NumberColumn = topicData.numberColumn;
          values.MaxLikePerUser = topicData.maxLikePerUser;
          values.OneLikePerIdea = Number(topicData.oneLikePerIdea);
          setErrors({});
        })
        .catch((err) => console.log(err));
    }
  }, [topicId]);

  const validateForm = () => {
    let temp = {};
    temp.TopicContent =
      values.TopicContent === ""
        ? "This filed is required"
        : values.TopicContent.length <= 200
        ? ""
        : "Max 200 Characters can accept.";
    temp.IsAnonymous =
      values.IsAnonymous !== "" ? "" : "This field is required.";
    temp.OneLikePerIdea =
      values.OneLikePerIdea !== "" ? "" : "This field is required.";
    temp.NumberColumn =
      parseInt(values.NumberColumn) !== 0 ? "" : "This field is required.";
    temp.MaxLikePerUser =
      parseInt(values.MaxLikePerUser) !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    console.log(values);
    return Object.values(temp).every((x) => x === "");
  };

  const submitTopic = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!topicId) {
        const updatedValues = {
          topicContent: values.TopicContent,
          isAnonymous: Boolean(parseInt(values.IsAnonymous)),
          oneLikePerIdea: Boolean(parseInt(values.OneLikePerIdea)),
          numberColumn: parseInt(values.NumberColumn),
          maxLikePerUser: parseInt(values.MaxLikePerUser),
        };
        createAPIEndpoint(ENDPOINTS.TOPICS)
          .create(updatedValues)
          .then((res) => {
            resetFormControls();
            setSubmitted(submitted + 1);
          })
          .catch((err) => console.log(err));
      } else {
        const updatedValues = {
          topicId: values.TopicId,
          topicContent: values.TopicContent,
          isAnonymous: Boolean(parseInt(values.IsAnonymous)),
          oneLikePerIdea: Boolean(parseInt(values.OneLikePerIdea)),
          numberColumn: parseInt(values.NumberColumn),
          maxLikePerUser: parseInt(values.MaxLikePerUser),
        };

        createAPIEndpoint(ENDPOINTS.TOPICS)
          .update(updatedValues)
          .then((res) => {
            resetFormControls();
            setSubmitted(submitted + 1);
            setTopicId(0);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return {
    HandleChange,
    resetFormControls,
    submitTopic,
    setTopicId,
    setSubmitted,
    topicId,
    submitted,
    values,
    errors,
  };
};
