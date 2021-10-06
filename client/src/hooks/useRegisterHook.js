import React, {useState, useEffect} from 'react';
import {createAPIEndpoint, ENDPOINTS} from "../api";

export const useRegisterHook = () => {

    const getFreshModeObject = () =>({
        "name": "",
        "alias": "",
        "emailAddress": "",
        "password": "",
        "confirmPassword": ""
    })

    const [values, setValues] = useState(getFreshModeObject());
    const [errors, setErrors] = useState({});
    const [registered, setRegistered] = useState("false")
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
        temp.name = values.name !== "" ? "" : "This field is required.";
        temp.alias = values.alias !== "" ? "" : "This field is required.";
        temp.emailAddress = values.emailAddress !== "" ? "" : "This field is required.";
        temp.password = values.password === "" ? "This filed is required" : values.password.length>=8 ? "" : "Min 8 Characters can accept.";
        temp.confirmPassword = values.confirmPassword === "" ? "This filed is required" : values.confirmPassword.length>=8 ? "" : "Min 8 Characters can accept.";
        if (values.password !== "" && values.confirmPassword !== "" && values.password !== values.confirmPassword){
            temp.password = "Two input password must be consistent";
            temp.confirmPassword = "Two input password must be consistent"
        }
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }

    const submitRegister = e => {
        e.preventDefault();
        if (validateForm()){
            alert('Ok!')
            const updatedValues = {
                name: values.name,
                alias: values.alias,
                emailAddress: values.emailAddress,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            createAPIEndpoint(ENDPOINTS.REGISTER).create(updatedValues)
                .then(res => {
                    resetFormControls();
                    setRegistered("true");
                })
                .catch(err => console.log(err));
            }
        }

    return {
        HandleChange, resetFormControls, submitRegister, registered, values, errors
    }
}