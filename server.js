import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

//import serve-static

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const server = app.listen(port, () => {
  console.log('App running on Port:' + port)
})

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://anony-awpm.onrender.com'],
    methods: ['GET', 'POST']
  }
})

const openRooms = new Map()
const roomDetails = {
  hostId: ''
}

// Generate a unique room ID (e.g., UUID)
function generateRoomId() {
  // Implementation to generate a unique room ID (e.g., using UUID)
  return 'room_' + Math.random().toString(36).substr(2, 9)
}

// Socket.IO event handlers can now be added below
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    // Emit custom event to notify clients bout disconnection
    socket.emit('connectionLost');
  });
  socket.emit('socketId', socket.id);

  socket.on('openRoom', (data) => {
    const roomId = generateRoomId();
    const roomData = {
      roomId,
      host: data.host,
      hostId: data.hostId
    };
    
    // Add room details to openRooms map
    openRooms.set(roomId, {
      host: data.host,
      hostId: data.hostId,
      users: new Set()
    });
  
    socket.emit('roomOpenned', roomData);
  });
  

  socket.on('closeRoom', (room) => {
    //Check if the close request is sent by the Host
    if (room.hostId === roomDetails.hostId) {
      openRooms.delete(room.roomId)
      console.log(`Room ${room.roomId} closed`)
    } else {
      console.log(`User ${socket.id} tried to close room ${room.roomId} but is not the host`)
      //Emit an action denied to the user
      socket.emit('actionDenied', 'Action denied!')
    }
  })




// Handler for when a user joins a room
socket.on('joinRoom', (roomId) => {
  if (openRooms.has(roomId)) {
    const room = openRooms.get(roomId);
    if (room && room.users instanceof Set) {
      socket.join(roomId);
      room.users.add(socket.id); // Add the user to the room's set
      
      // Emit 'roomJoined' event with host's name and number of connected users
      const hostName = room.host; // Assuming the host's name is stored in the 'host' property
     // const numConnectedUsers = room.users.size;
      socket.emit('roomHost', hostName);
      
      updateConnectedUsers(roomId); // Update the number of connected users
    } else {
      console.log(`Invalid room data structure for room ${roomId}`);
      // Handle invalid room data structure (e.g., not a set)
    }
  } else {
    socket.emit('roomNotFound', `Room "${roomId}" does not exist or is closed`);
    console.log(`Room ${roomId} does not exist or is closed`);
  }
});



  // Handler for when a user disconnects from the socket
socket.on('disconnect', () => {
  // Iterate over all rooms
  for (const [roomId, room] of openRooms.entries()) {
    // Get the users set for the room
    const users = room.users;
    // Check if the disconnected user is in any room
    if (users.has(socket.id)) {
      users.delete(socket.id); // Remove the user from the room's set
      updateConnectedUsers(roomId); // Update the number of connected users
      break; // Exit the loop after handling the disconnection
    }
  }
});

// Function to update the number of connected users in a room and emit the updated count to clients
function updateConnectedUsers(roomId) {
  if (openRooms.has(roomId)) {
    const room = openRooms.get(roomId);
    const numConnectedUsers = room.users.size;
    console.log(`User ${socket.id} joined room ${roomId} with ${numConnectedUsers} users`);
    io.to(roomId).emit('roomJoined', numConnectedUsers);
  } else {
    console.log(`Room ${roomId} does not exist`);
    // Handle the case where the room does not exist
  }
}


  socket.on('Sendmessage', (data) => {
    if (openRooms.has(data.roomId)) {
      // Broadcast the message to all other clients in the same room
      io.to(data.roomId).emit('receiveMessage', data)
      // socket.emit('mssgSent', (data));
      console.log(`Message received in room ${data.roomId}: ${data}`)
    } else {
      socket.emit(
        'roomNotFound',
        `Room "${data.roomId}" does not exist or is 
            closed`
      )
    }
  })
})
