import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

//import serve-static


const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = app.listen(port, () => {
    console.log('App running on Port:' + port);
});



const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'https://anony-awpm.onrender.com'],
        methods: ['GET', 'POST']
    }
});


const openRooms = new Map();
const roomDetails = {
    hostId : ''
}

// Generate a unique room ID (e.g., UUID)
function generateRoomId() {
    // Implementation to generate a unique room ID (e.g., using UUID)
    return 'room_' + Math.random().toString(36).substr(2, 9);
}



// Socket.IO event handlers can now be added below
io.on('connection', (socket) => {
   // console.log(socket.id);
    socket.emit('socketId', (socket.id))
    socket.on('openRoom', (data) => {
        const roomId = generateRoomId();
        const roomData = {
            roomId,
            host: data.host,
            hostId: data.hostId
        }
        roomDetails.hostId = data.hostId 
        console.log(roomDetails)
        openRooms.set(roomId, new Set());
        socket.emit('roomOpenned', (roomData));
    });

    socket.on('closeRoom', (room) => {
        //Check if the close request is sent by the Host 
        if (room.hostId === roomDetails.hostId) {
            openRooms.delete(room.roomId);
            console.log(`Room ${room.roomId} closed`);
        }else {
            console.log(`User ${socket.id} tried to close room ${room.roomId} but is not the host`);
            //Emit an action denied to the user 
            socket.emit('actionDenied', 'Action denied!')
        }
    })

     // Handler for when a user joins a room
     socket.on('joinRoom', (roomId) => {
        if (openRooms.has(roomId)) {
            socket.join(roomId);
            openRooms.get(roomId).add(socket.id); // Add the user to the room's set
            console.log(`User ${socket.id} joined room ${roomId}`);
        } else {
            socket.emit('roomNotFound',`Room "${roomId}" does not exist or is closed`)
            console.log(`Room ${roomId} does not exist or is closed`);
        }
    });

    socket.on('Sendmessage', (data) => {
        if(openRooms.has(data.roomId)){
  // Broadcast the message to all other clients in the same room
  io.to(data.roomId).emit('receiveMessage', data);
 // socket.emit('mssgSent', (data));
  console.log(`Message received in room ${data.roomId}: ${data}`);
        }else {
        socket.emit('roomNotFound',`Room "${data.roomId}" does not exist or is 
            closed`)
        }
    });


})
