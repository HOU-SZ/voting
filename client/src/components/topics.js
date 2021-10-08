import React, {useState} from 'react';
import TopicForm from './TopicForm';
import {Redirect} from 'react-router-dom';
import NavBar from './NavBar';


export default function Topics() {
    const [userAlias] = useState(localStorage.getItem("userAlias"));

    return (
        <div>
            <NavBar />
            <div>
                <TopicForm />
            </div>
            
        </div>
    )

//     if (userAlias !== "Anonymous user" && userAlias !== ""){
//         return (
//             <div>
//                 <NavBar />
//                 <div>
//                     <TopicForm />
//                 </div>
                
//             </div>
//         )
//     }
        
//     else {
//         return(
//             <div>
//                 <Redirect to="/users/login"/>
//             </div>
//         )
//     }
    
}