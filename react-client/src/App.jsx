import './App.css';
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddBook from './components/2_add_book';
import Dashboard from './components/1_dashboard';
import BookDetails from './components/3_book_details';
import EditBook from './components/4_edit_book';


function App() {

  const [allBooks, setAllBooks] = useState([])



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Dashboard allBooks={allBooks} setAllBooks={setAllBooks} /> } />
        <Route path='/books/new' element={ <AddBook /> } />
        <Route path='/books/:id' element={ <BookDetails allBooks={allBooks} setAllBooks={setAllBooks} /> } />
        <Route path='/books/:id/edit' element={ <EditBook /> } />
      </Routes>
    </div>
  );
}

export default App;