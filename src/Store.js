import { StyledComponentProps } from '@material-ui/core';
import React from 'react';
import io from 'socket.io-client';

//function holds our current chats in a state
//1) initial state to make sure everything is working correctly in our layout

//2) have a reducer to have greater control over what's being returned from the server and map it to the shape we expect

//initializes a context object
export const CTX = React.createContext();

/*
  msg {
      from: 'user' user's name
      msg: 'hi' message
      topic: 'general' channel
  }

  state {
      general: [
          {msg}, [msg}, {msg} , {newmsg}         states hold an array of messages
        ]
      topic2: [

      ]
    
  }
  reducers bring forth old data and updates the state with new data
    reducers have to immutable and make a copy all the time, so the spread operator is the natural choice
  the first spread is bringing forth our entire old state, then we want to override a single key-which is whatever topic the message is in.
  for example: this destructuring here: [action.payload.topic] for example general is passed into the key for topic object
  for new messages so we don't lose it and the state can update, we're going to add another spread
  ************
  we're going to wrap our entire application with the Store so we can have access to the current state

  before refactored:  return {
                ...state,
                [action.payload.topic]: [
                  ...state[action.payload.topic],
                  { 
                      from: action.payload.from,             new message
                      msg: action.payload.msg
                  }
                  ]
             }
*/
const initState = 
{
    general: [
        {from: 'cameron', msg: 'hello'},
        {from: 'candice', msg: 'hello'},
        {from: 'alex', msg: 'hello'},
    ],
    topic2: [
        {from: 'aaron', msg: 'hello'},
        {from: 'aaron', msg: 'hello'},
        {from: 'aaron', msg: 'hello'},

    ]
  
}


function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                  ...state[topic],
                  {
                      from,
                      msg
                   }
               ]
            } 
                
            
            default:
                return state
    }
}


let socket; 

function sendChatAction(socket, value){ 
    socket.emit('chat message', value);
  }
export default function Store(props) {
    const [allChats, dispatch] = React.useReducer(reducer, initState);
    if (!socket) {
        socket = io(':3001');
        socket.on('chat message' , function(msg){
            dispatch({type:'RECEIVE_MESSAGE', payload: msg});
        }
        )
    }
    const user = 'candy' +  Math.random(100).toFixed(2)
    
    return(
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
} 