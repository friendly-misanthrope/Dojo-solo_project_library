import '../App.css';
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

function AddBook() {
  // Create book state object, initialize values to empty strings
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    notes: '',
    coverPhoto: ''
  })

  // State object for any errors returned by API
  const [errors, setErrors] = useState({})

  // useNavigate
  const navigate = useNavigate()

  // Destructure book object into individual variables
  const { title, author, genre, notes, coverPhoto } = book

  // Change handler for form inputs
  const onChangeHandler = (e) => {
    setBook(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  // Handle coverPhoto
  const convertImage = (e) => {

    // Select file from input
    const file = e.target.files[0]

    // Convert coverPhoto to base64 string with voodoo magic
    const reader = new FileReader()
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file)
    }
    
    // Update book's coverPhoto property in state
    reader.onloadend = () => {
      setBook(prevState => ({...prevState, coverPhoto: reader.result}))
    }
    // If reader errors, print error to console
    reader.onerror = error => console.log("Error uploading image", error)
  }

  // Submit handler
  const onSubmitHandler = (e) => {
    e.preventDefault()

    axios.post('http://172.18.67.234:8000/api/books/new', book)
    .then((response) => {
      console.log(response.data)
      navigate('/')
    })
    .catch((error) => {
      setErrors(error.response.data.errors)
    })
  }

  // JSX Return
  return (
    <div className="add-book">
      <header>
        <h1>My Favorite Books</h1>
        <Link to={'/'} className="btn btn-warning">Back to all books</Link>
      </header>

      <div className="book-form">
        

        <form onSubmit={onSubmitHandler} className="content-container">
          <h2>Add a Book to your Library</h2>
          <div className="form-inputs">
            <div className="data">

              <div className="form-group">
                <label htmlFor="title">Book Title:</label>
                <input type="text" className="form-control" name="title" onChange={onChangeHandler} value={title} />
                {
                  errors.title ?
                    <span className="text-danger">{errors.title.message}</span>
                    : null
                }
              </div>

              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" onChange={onChangeHandler} value={author} />
                {
                  errors.author ?
                    <span className="text-danger">{errors.author.message}</span>
                      : null
                }
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <input type="text" className="form-control" name="genre" onChange={onChangeHandler} value={genre} />
                {
                  errors.genre ?
                    <span className="text-danger">{errors.genre.message}</span>
                      : null
                }
              </div>

              <div className="form-group notes">
                <label htmlFor="notes">Notes (optional):</label>
                <textarea className="form-control" name="notes" onChange={onChangeHandler} value={notes} />
              </div>
              
              <div className=" form-group add-image">
                <label htmlFor="cover-photo">Cover Photo (optional):</label>
                <input accept="image/*"
                type="file"
                onChange={convertImage} />

                {
                  coverPhoto !== "" ?
                    <img src={coverPhoto} width={120} height={160} alt={`${title} book cover`} />
                      : null
                }

              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>     
    </div>
  );
}

export default AddBook;