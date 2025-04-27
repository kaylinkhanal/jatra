const express = require('express')
const { Server } = require('socket.io');
require('dotenv').config()
const port = process.env.PORT
const UserRoute = require('./routes/user')
const { createServer } = require('http');
const VenueRoute = require('./routes/venue')
const BookingRoute = require('./routes/booking')
const EventRoute = require('./routes/event')
const dbConnect = require('./db/connection')
const cors = require('cors');
const Booking = require('./models/booking');
const User = require('./models/user');
const notificationRoute = require('./routes/notification')
const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",

  }
});
app.use(express.json())
app.use(cors())
dbConnect()

app.use(UserRoute)
app.use(VenueRoute)
app.use(EventRoute)
app.use(BookingRoute)
app.use(notificationRoute)



io.on('connection', (socket) => {

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('eventRequest',async(eventRequest) => {
    const {venue,event, booked_date} =eventRequest
    await Booking.create({venue,event, booked_date})
    const allrequest =await Booking.find().populate('event venue')
    io.emit('eventRequest', allrequest);
  });

  


});

server.listen(port, () => {
  console.log(`Socket.IO server listening on port ${port}`);
});







// REST API vs GRAPHQL

// -> underfetching and overfetching  ----> GraphQL
// -> /users /users/:id /users/:id/friends /posts ------> /graphql
// -> GET POST PATCH PUT DELETE ------> POST
// -> CRUD, Query and mutation
// -> 





// const express = require('express');
// const { createHandler } = require('graphql-http/lib/use/express');
// const dbConnect = require('./db/connection')
// dbConnect()
// const { ruruHTML } = require('ruru/server');

// const app = express();
// // Serve the GraphiQL IDE.
// app.get('/graphql', (_req, res) => {
//   res.type('html');
//   res.end(ruruHTML({ endpoint: '/graphql' }));
// });
// // Construct a schema, using GraphQL schema language



// const {
//   GraphQLObjectType,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLList,
//   GraphQLFloat,
//   GraphQLSchema,
//   GraphQLID
// } = require('graphql');
// const User = require('./models/user');
 
// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => ({
//     id: { type: GraphQLID }, 
//     fullName: { type: new GraphQLNonNull(GraphQLString) },
//     address: { type: GraphQLString },
//     email: { type: new GraphQLNonNull(GraphQLString) },
//     phoneNumber: { type: GraphQLString },
//     password: { type: new GraphQLNonNull(GraphQLString) },
//     avatar: { type: GraphQLString },
//     role: { type: new GraphQLNonNull(GraphQLString) },
//     gender: { type: GraphQLString },
//   }),
// });



 
// const RootQuery = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     getUser: {
//       type: UserType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLID) },
//       },
//       resolve: async (_, { id }) => {
//         try {
//           const user = await User.findById(id);
//           return user;
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           throw new Error('Failed to fetch user.');
//         }
//       },
//     },
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       resolve: async () => {
//         try {
//           const users = await User.find();
//           return users;
//         } catch (error) {
//           console.error('Error fetching all users:', error);
//           throw new Error('Failed to fetch all users.');
//         }
//       },
//     },
//     getUsersByRole: {
//       type: new GraphQLList(UserType),
//       args: {
//         role: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       resolve: async (_, { role }) => {
//         try {
//           const users = await User.find({ role });
//           return users;
//         } catch (error) {
//           console.error(`Error fetching users with role ${role}:`, error);
//           throw new Error(`Failed to fetch users with role ${role}.`);
//         }
//       },
//     },
//   },
// });
 

// const RootMutation = new GraphQLObjectType({
//   name: 'mutation',
//   fields: {
//     deleteUserById: {
//       type: UserType,
//       args: {
//         id: { type: new GraphQLNonNull(GraphQLID) },
//       },
//       resolve: async (_, { id, }) => {
//         try {
//           const user = await User.findByIdAndDelete(id );
//           return user;
//         } catch (error) {
//           console.error('Error fetching user:', error);
//           throw new Error('Failed to fetch user.');
//         }
//       },
//     },
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       resolve: async () => {
//         try {
//           const users = await User.find();
//           return users;
//         } catch (error) {
//           console.error('Error fetching all users:', error);
//           throw new Error('Failed to fetch all users.');
//         }
//       },
//     },
//     getUsersByRole: {
//       type: new GraphQLList(UserType),
//       args: {
//         role: { type: new GraphQLNonNull(GraphQLString) },
//       },
//       resolve: async (_, { role }) => {
//         try {
//           const users = await User.find({ role });
//           return users;
//         } catch (error) {
//           console.error(`Error fetching users with role ${role}:`, error);
//           throw new Error(`Failed to fetch users with role ${role}.`);
//         }
//       },
//     },
//   },
// });
 


// app.all(
//   '/graphql',
//   createHandler({
//     schema: new GraphQLSchema({
//       query: RootQuery,
//       mutation: RootMutation
//     }),
    
//   }),
// );
// app.listen(4000);
// console.log('Running a GraphQL API server at localhost:4000/graphql');

