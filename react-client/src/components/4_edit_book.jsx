import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'


const EditBook = (props) => {

  const navigate = useNavigate()
  const { id } = useParams()
  
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    notes: '',
    coverPhoto: ''
  })

  const { title, author, genre, notes, coverPhoto } = book
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get(`http://172.18.67.234:8000/api/books/${id}`)
    .then((res) => {
      setBook(res.data)
    })
    .catch(err => console.log(err))
  },[id])

  const onChangeHandler = (e) => {
    setBook(prevState => {return {...prevState, [e.target.name]: e.target.value}})
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    axios.put(`http://172.18.67.234:8000/api/books/${id}/edit`, book)
      .then((res) => {
        navigate('/')
      })
      .catch((err) => {
        setErrors(err.response.data.errors)
      })
  }

  const convertImage = (e) => {

    const file = e.target.files[0]
    const reader = new FileReader()
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file)
    }
    
    reader.onloadend = () => {
      setBook(prevState => ({...prevState, coverPhoto: reader.result}))
    }

    reader.onerror = error => console.log("Error uploading image", error)
  }

  return (
    <div className="add-book">
      <header>
        <h1>My Favorite Books</h1>
        <Link to={'/'} className="btn btn-warning">Back to all books</Link>
      </header>

      <div className="book-form">
        <form onSubmit={onSubmitHandler} className="content-container">
          <h2>Edit: {title}</h2>
          <div className="form-inputs">
            <div className="data">
              <div className="form-group">
                <label htmlFor="title">Book Title: </label>
                <input type="text" className="form-control" name="title" onChange={onChangeHandler} value={title} disabled={true}/>
                {
                  errors.title? 
                    <span className="text-danger">{errors.title.message}</span>
                      : null
                }
              </div>

              <div className="form-group">
                <label htmlFor="author">Author: </label>
                <input type="text" className="form-control" name="author" onChange={onChangeHandler} value={author} disabled={true} />
                {
                  errors.author ?
                    <span className="text-danger">{errors.author.message}</span>
                      : null
                }
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <input type="text" className="form-control" name="genre" onChange={onChangeHandler} value={genre} disabled={true} />
                {
                  errors.genre ? 
                    <span className="text-danger">{errors.genre.message}</span>
                     : null
                }
              </div>

              <div className="form-group notes">
                <label htmlFor="notes">Notes: </label>
                <textarea className="form-control" name="notes" onChange={onChangeHandler} value={notes} />
              </div>

              <div className="form-group add-image">
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
            </div>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit Edit" />
        </form>
      </div>
    </div>
  )
}

export default EditBook