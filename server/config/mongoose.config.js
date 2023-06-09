const mongoose = require('mongoose')

// * Don't forget to change DB name!

// ! ATTN: Please change connection URI below to 127.0.0.1
// ! before running server.

// ! I run VSCode in a virutal Linux environment that requires
// ! the use a local network IP.

mongoose.connect('mongodb://192.168.1.3:27017/my_books', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connection established')
})
.catch((err) => {
  console.log("Connection to database failed", err)
})