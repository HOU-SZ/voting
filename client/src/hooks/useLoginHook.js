import React, {useState, useEffect, useContext} from 'react';
import UserInfoContext from '../context/userInfo.tsx';
import {createAPIEndpoint, ENDPOINTS} from "../api";


export const useLoginHook = () => {

    const getFreshModeObject = () =>({
        "emailAddress": "",
        "password": ""
    })
    const [values, setValues] = useState(getFreshModeObject());
    const [errors, setErrors] = useState({});
    const [logined, setLogined] = useState("false")
    const userInfoContext = useContext(UserInfoContext);

    const HandleChange = e =>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const resetFormControls = () =>{
        setValues(getFreshModeObject())
        setErrors({})
    }

    const validateForm = () => {
        let temp = {};
        temp.emailAddress = values.emailAddress !== "" ? "" : "This field is required.";
        temp.password = values.password !== "" ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const submitLogin = e => {
        e.preventDefault();
        if (validateForm()){
            alert("ok!");
            const updatedValues = {
                emailAddress: values.emailAddress,
                password: values.password,
            }
            createAPIEndpoint(ENDPOINTS.LOGIN).create(updatedValues)
                .then(res => {
                    const { token, alias, userId } =res.data;
                    localStorage.setItem("jwtToken",token.tokenStr);
                    localStorage.setItem("userAlias",alias);
                    userInfoContext.userAliasRefresh(alias);
                    resetFormControls();
                    setLogined("true");
                })
                .catch(err => console.log(err));
            }
        }
    
    return {
        HandleChange, resetFormControls, submitLogin, logined, values, errors
    }
}