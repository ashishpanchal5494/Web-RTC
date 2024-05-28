import {Routes, Route} from "react-router-dom";
import Video from "./component/video";
import View from "./component/view";
import Home from "./component/Home";

import socketIO from "socket.io-client"

const socket = socketIO("http://localhost:9013")

function App() {
  console.log("=======================COME IN APP======================================")
  return (
    <>
    <Routes >
      <Route path="/" element={ <Home socket={socket} /> } />
      <Route path="/video/:id" element={ <Video socket={socket} /> } />
      <Route path="/view/:id" element={ <View /> } />
    </Routes>
    </>
  );
}

export default App;