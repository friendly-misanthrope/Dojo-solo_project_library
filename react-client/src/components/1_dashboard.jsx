import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Dashboard = (props) => {

  const { allBooks, setAllBooks } = props

  // useEffect hook to call API via axios, get all books in collection
  useEffect(() => {
    axios.get('http://172.18.67.234:8000/api/books')
      .then((response) => {
        // If request successful, set state based on response
        setAllBooks(response.data)
      })
      .catch(error => console.log("Unable to get all books", error))
  },[setAllBooks])

  // JSX Return
  return (
    <div className="dashboard-container">
      <header>
        <h1>My Favorite Books</h1>
        <Link to={'/books/new'} className="btn btn-warning">Add A Book</Link>
      </header>
      <div className="main-content">
      <h2>My Library</h2>

      {
        allBooks.length < 1 ?
          <div className="no-books">
            <h3>There aren't any books in your library yet :(</h3>
            <h4>Consider <Link to='/books/new'>adding a book</Link> to get started!</h4>
          </div>
            :
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">Book Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  allBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        <Link to={`/books/${book._id}`} className="link">Details</Link>|
                        <Link to={`/books/${book._id}/edit`} className="link">Edit</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
      }
      </div>  
    </div>
  )
}

export default Dashboard