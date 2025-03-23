import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/Context';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [borrowConfirmation, setBorrowConfirmation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      const db = getDatabase();
      const booksRef = ref(db, 'books');
      const borrowedBooksRef = ref(db, 'borrowedBooks/' + user.uid);

      setError(null);  

      get(booksRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const booksData = snapshot.val();
            const booksArray = Object.keys(booksData).map((key) => ({
              id: key,
              ...booksData[key],
            }));
            setBooks(booksArray);
          }
        })
        .catch((error) => {
          console.error('Error fetching books: ', error);
          setError('Failed to load books. Please try again later.');
        });

      get(borrowedBooksRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const borrowedData = snapshot.val();
            const borrowedArray = Object.keys(borrowedData).map((key) => ({
              id: key,
              ...borrowedData[key],
            }));
            setBorrowedBooks(borrowedArray);
          }
        })
        .catch((error) => {
          console.error('Error fetching borrowed books: ', error);
          setError('Failed to load borrowed books. Please try again later.');
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  const handleBorrow = (bookId) => {
    if (user) {
      const db = getDatabase();
      const borrowedBooksRef = ref(db, 'borrowedBooks/' + user.uid);

      const bookToBorrow = books.find((book) => book.id === bookId);

      const newBorrowedBookRef = ref(db, 'borrowedBooks/' + user.uid + '/' + bookId);
      set(newBorrowedBookRef, {
        title: bookToBorrow.title,
        author: bookToBorrow.author,
      });

      setBorrowedBooks((prevBooks) => [
        ...prevBooks,
        {
          id: bookId,
          title: bookToBorrow.title,
          author: bookToBorrow.author,
        },
      ]);
      
      setBorrowConfirmation(`You have successfully borrowed "${bookToBorrow.title}"`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/05/17/76/83/240_F_517768363_e0nTfWAWhZIucnvwXVrJFG8nVI4ekZfT.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        paddingBottom: '50px',
        color: '#fff',
      }}
    >
      {user ? (
        <>
          <h1
            style={{
              textAlign: 'center',
              padding: '30px 0',
              color: '#fff',
            }}
          >
            Welcome, {user?.email}
          </h1>

          {loading ? (
            <div style={{ textAlign: 'center', color: '#fff' }}>
              Loading books...
            </div>
          ) : (
            <>
              {error && (
                <div style={{ color: 'red', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              {borrowConfirmation && (
                <div
                  style={{
                    backgroundColor: '#6a11cb',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {borrowConfirmation}
                </div>
              )}

              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <input
                  type="text"
                  placeholder="Search books by title or author"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    width: '300px',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  padding: '20px',
                  maxWidth: '1200px',
                  margin: '20px auto',
                }}
              >
                {currentBooks.length > 0 ? (
                  currentBooks.map((book) => (
                    <div
                      key={book.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          marginBottom: '8px',
                          color: '#333',
                        }}
                      >
                        {book.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '1rem',
                          color: '#666',
                          marginBottom: '15px',
                          lineHeight: '1.5',
                        }}
                      >
                        {book.author}
                      </p>
                      <button
                        onClick={() => handleBorrow(book.id)}
                        disabled={borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id)}
                        style={{
                          backgroundColor: '#6a11cb',
                          color: 'white',
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          display: 'block',
                          margin: '20px auto',
                        }}
                      >
                        {borrowedBooks.some((borrowedBook) => borrowedBook.id === book.id)
                          ? 'Already Borrowed'
                          : 'Borrow'}
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    No books available.
                  </p>
                )}
              </div>

              {totalPages > 1 && (
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: '20px',
                  }}
                >
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: '10px 20px',
                      margin: '0 5px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      backgroundColor: '#6a11cb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  >
                    Previous
                  </button>
                  <span style={{ margin: '0 10px', fontSize: '16px', color: '#fff' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '10px 20px',
                      margin: '0 5px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      backgroundColor: '#6a11cb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#6a11cb',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              display: 'block',
              margin: '20px auto',
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: '#fff' }}>
          <p>
            You are not logged in. Please{' '}
            <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
              Login
            </a>{' '}
            or{' '}
            <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
              Register
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
