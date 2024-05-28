/**
 * Autor: Dipak Kanzariya
 */

const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
// const io = require('socket.io')(server)
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

// app.use('/', express.static(path.join(__dirname, 'public')));
var roomDetails = {};

io.on('connection', (socket) => {
  console.log(`User connected`)
  socket.on('join', (payload) => {
    
    const roomId = payload.room
    const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 }
    const numberOfClients = roomClients.length
    console.log(`Room ID: ${roomId}`)
    console.log(`roomClients: ${roomClients}`)
    console.log(`numberOfClients of ${roomId}: ${numberOfClients}`)


    // These events are emitted only to the sender socket.
    if (numberOfClients == 0) {
      console.log(`Creating room ${roomId} and emitting room_created socket event`)
      socket.join(roomId)
      
    // roomDetails[roomId] = {ownerID:socket.id}
      socket.emit('room_created', {
        roomId: roomId,
        peerId: socket.id,
        // ownerID:roomDetails 
      })
    } else {
      console.log(`Joining room ${roomId} and emitting room_joined socket event`)
      socket.join(roomId)
      socket.emit('room_joined', {
        roomId: roomId,
        peerId: socket.id,
        // ownerID:roomDetails
      })
    } 
  })

  socket.on('newjoin', (payload) => {
    const roomId = payload.room
    const roomClients = io.sockets.adapter.rooms[roomId] || { length: 0 }
    const numberOfClients = roomClients.length
    console.log(`new Room ID: ${roomId}`)
    console.log(`new roomClients: ${roomClients}`)
    console.log(`new numberOfClients of ${roomId}: ${numberOfClients}`)

    console.log(`new Joining room ${roomId} and emitting room_joined socket event`)
    socket.join(roomId)
    socket.emit('room_joined', {
      roomId: roomId,
      peerId: socket.id,
      // ownerID:roomDetails
    })
  })

  // These events are emitted to all the sockets connected to the same room except the sender.
  socket.on('start_call', (event) => {
    // console.log(`Broadcasting start_call event to peers in room ${event.roomId} from peer ${event.senderId}`)
    socket.broadcast.to(event.roomId).emit('start_call', {
      senderId: event.senderId
  })})

  //Events emitted to only one peer
  socket.on('webrtc_offer', (event) => {
    // console.log(`Sending webrtc_offer event to peers in room ${event.roomId} from peer ${event.senderId} to peer ${event.receiverId}`)
    socket.broadcast.to(event.receiverId).emit('webrtc_offer', {
      sdp: event.sdp,
      senderId: event.senderId,
      // test:roomDetails[event.roomId] && roomDetails[event.roomId].ownerID
  })})

  socket.on('webrtc_answer', (event) => {
    // console.log(`Sending webrtc_answer event to peers in room ${event.roomId} from peer ${event.senderId} to peer ${event.receiverId}`)
    socket.broadcast.to(event.receiverId).emit('webrtc_answer', {
      sdp: event.sdp,
      senderId: event.senderId
  })})

  socket.on('webrtc_ice_candidate', (event) => {
    // console.log(event.roomClients)
    // console.log(`Sending webrtc_ice_candidate event to peers in room ${event.roomId} from peer ${event.senderId} to peer ${event.receiverId}`)
    socket.broadcast.to(event.receiverId).emit('webrtc_ice_candidate', event)
  })
})

// START THE SERVER =================================================================
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})