import React from "react";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import MessageParser from "./MessageParser.jsx";
import { createChatBotMessage } from 'react-chatbot-kit';
import ActionProvider from "./ActionProvider.jsx";
import close from './../assets/close.png';

function ChatBot(props) {
  const chatHeader = {
    borderTopRightRadius: '5px',
    borderTopLeftRadius: '5px',
    backgroundColor: '#efefef',
    fontFamily: 'Arial',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#514f4f',
    padding: '12.5px',
    fontWeight: 'bold',
};
const handleClick = () => {
  // props.setChatBot(false);
  console.log(props);
  props.setChatBot(false);
  console.log("Close");
};
  const botName = 'FoodBot';
  const config = {
    initialMessages: [createChatBotMessage(`Hi! I'm Gemini bot you can ask food realted question here`)],
    botName: botName,
    customComponents: {
     header: () => <div style={chatHeader}>
     FoodChat AI Bot <img src={close} alt="close" style={{ height: '25px', cursor: 'pointer' }} onClick={handleClick} />
 </div>
   },
    customStyles: {
      botMessageBox: {
        backgroundColor: '#376B7E',
      },
      chatButton: {
        backgroundColor: '#5ccc9d',
      },
    },
  };
  return (
    <div className="ChatBot d-flex" style={{backgroundColor: 'rgb(255, 246, 233)'}}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatBot;
