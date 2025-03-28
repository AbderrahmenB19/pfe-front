import React from 'react';
import AppRouter from './routes/AppRouter';
import AnimatedBackground from './background';
import "./App.css"



const App = () => {
  return (
    <div className="app">
     
      <div className=" ">
      <AppRouter/>

      </div>
      
    </div>
  );
};

export default App;