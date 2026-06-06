import React from 'react';
import axios from 'axios';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const geminiAction = async(query) => {
        let message ="";
        try {
            const response = await axios.post('/api/users/chatbot', { message: query }, {
                withCredentials: true
            });
            const text = response.data.data.reply;
            message = createChatBotMessage(text);
        }
        catch(error) {
            console.log("Gemini Error: ", error);
            message = createChatBotMessage("Error in contacting Gemini. Please make sure you are logged in.");
        }
        updateState(message);
    }

    const updateState = (message, checker) => {
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message]
        }))
    }
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            geminiAction
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;