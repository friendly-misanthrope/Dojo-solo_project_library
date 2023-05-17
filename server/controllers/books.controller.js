const Books = require('../models/book.model')

// Create a book
module.exports.createBook = (request, response) => {
  Books.create(request.body)
    .then((newBook) => {
      response.json(newBook)
    })
    .catch(err => response.status(400).json(err))
}

// Get all books in the collection
module.exports.findAllBooks = (request, response) => {
  Books.find()
    .then((allBooks) => {
      response.json(allBooks)
    })
    .catch((err) => {
      response.json({message: 'Something went wrong getting all books', error: err})
    })
}

// Get one book in the collection by id
module.exports.findOneBook = (request, response) => {
  Books.findOne({_id: request.params.id})
    .then((oneBook) => {
      response.json(oneBook)
    })
    .catch(error => response.json(error))
}

// Update one book based on id
module.exports.updateBook = (request, response) => {
  Books.findOneAndUpdate(
    {_id: request.params.id},
    request.body,
    {new: true, runValidators: true}
  )
  .then(updatedBook => {
    response.json(updatedBook)
  })
  .catch(error => response.status(400).json(error))
}

// Delete one book based on id
module.exports.deleteBook = (request, response) => {
  Books.deleteOne({_id: request.params.id})
    .then(result => response.json(result))
    .catch(error => response.status(400).json(error))
}