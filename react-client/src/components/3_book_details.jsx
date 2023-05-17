import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const BookDetails = (props) => {

  // Setting up state and navigation/urlParameter variables
  const navigate = useNavigate()
  const { id } = useParams()
  const [book, setBook] = useState({})
  const { allBooks, setAllBooks } = props

  const { title, author, genre, notes, coverPhoto } = book

  // useEffect hook for getting one book via Axios
  useEffect(() => {
    axios.get(`http://172.18.67.234:8000/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.log(error))
  }, [id])

  // Delete handler for removing one book via Axios
  const deleteHandler = (id) => {
    if (window.confirm(`You are about to delete "${title}" by ${author} from your personal library. This action can not be undone! Would you like to continue?`)) {
      axios.delete(`http://172.18.67.234:8000/api/books/${id}/delete`)
        .then(() => {
          const updatedBookList = allBooks.filter((book)(
            book._id !== id
          ))
          setAllBooks(updatedBookList)
        })
        .catch(error => console.log(error))
      navigate('/')
    }
  }

  // JSX return
  return (
    <div className="book-details">
      <header>
        <h1>My Favorite Books</h1>
        <Link to={'/'} className="btn btn-warning">Back to all books</Link>
      </header>
      <div className="details-container">
        {
          coverPhoto === "" || coverPhoto === null ?
            null
            : <img src={coverPhoto} height={300} width={215} alt="Book cover" />
        }

        <div className="details-info-container">
          <h3 className="book-title">{title}</h3>
          <h4 className="book-author">By {author}</h4>
          <p className="book-info"><span className="label-details">Genre: </span>{genre}</p>
          <p className="book-info"><span className="label-details">Notes: </span>{notes}</p>
        </div>
        <div className="buttons">
          <button className="btn btn-primary" onClick={() => navigate(`/books/${id}/edit`)}>Edit Book</button>
          <button className="btn btn-danger" onClick={() => deleteHandler(id)}>Delete Book</button>
        </div>
      </div>

    </div>
  )
}

export default BookDetails