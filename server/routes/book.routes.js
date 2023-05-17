const Book = require('../controllers/books.controller')

module.exports = app => {
  // Find all documents
  app.get('/api/books', Book.findAllBooks)

  // Find one book by id
  app.get('/api/books/:id', Book.findOneBook)

  // Create new document
  app.post('/api/books/new', Book.createBook)

  // Update existing document by id
  app.put('/api/books/:id/edit', Book.updateBook)

  // Delete existing document by id
  app.delete('/api/books/:id/delete', Book.deleteBook)
}