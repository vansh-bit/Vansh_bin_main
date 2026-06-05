import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { About, Home, Login,Register} from './pages';
import Footer from './components/footer';
import DFood from './pages/DFood';
import RFood from './pages/RFood';
import Logout from './pages/Logout';
import GetFood from './pages/GetFood';
import Latlong from './pages/Latlong';
import Chatbot from './components/Chatbot.jsx';
import "./App.css"
import Tooltip from '@mui/material/Tooltip';
import MapComponent from './components/Map/Maps';
import chatBotImg from './assets/chatbot.png'
import React,{useState} from 'react'
import Services from "../../client/src/components/services.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <AppContent />
      </Router>
    </main>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Check if the current location is '/login'
  const isLoginPage = location.pathname === '/login' || location.pathname === "/register"|| location.pathname === "/logout";
  const [chatBot, setChatBot] = useState(false);
  return (
    <>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Bounce
      />
      {!isLoginPage && <Navbar />}
      { chatBot && <Chatbot chatBot={chatBot} setChatBot={setChatBot}/>}
      {!chatBot &&<Tooltip title="AI ChatBot" placement="left-start">
      <img src={chatBotImg} onClick={()=>{setChatBot(true)}} className='chat-bot-btn' alt="Chat Bot"/>
      </Tooltip>}
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
        <Route path='/maps' element={<MapComponent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/DFood' element={<DFood />} />
        <Route path='/GetFood' element={<GetFood/>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/GetFood' element={<GetFood />} />
        <Route path='/services' element={<Services />} />

      </Routes>
      <Footer/>
    </>
  );
};

export default App;
