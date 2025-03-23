import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/Context';
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      const db = getDatabase();
      const borrowedBooksRef = ref(db, 'borrowedBooks/' + user.uid); 

      setError(null);

      get(borrowedBooksRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const booksData = snapshot.val();
            const booksArray = Object.keys(booksData).map((key) => ({
              id: key,
              ...booksData[key],
            }));
            setBorrowedBooks(booksArray);
          } else {
            console.log('No borrowed books available');
          }
        })
        .catch((error) => {
          setError('Failed to load borrowed books. Please try again later.');
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleReturn = (bookId) => {
    const db = getDatabase();
    const bookRef = ref(db, 'borrowedBooks/' + user.uid + '/' + bookId);

    remove(bookRef)
      .then(() => {
        setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        alert('You have successfully returned the book.');
      })
      .catch((error) => {
        console.error('Error returning book: ', error);
        alert('Failed to return the book. Please try again.');
      });
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        paddingBottom: '50px',
      }}
    >
      {user ? (
        <>
          <h1
            style={{
              textAlign: 'center',
              padding: '30px 0',
              color: '#333',
            }}
          >
            Borrowed Books
          </h1>

          {loading ? (
            <div style={{ textAlign: 'center', color: '#333' }}>Loading borrowed books...</div>
          ) : (
            <>
              {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

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
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => (
                    <div
                      key={book.id}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
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
                        onClick={() => handleReturn(book.id)}
                        style={{
                          backgroundColor: '#e74c3c',
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
                        Return
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No borrowed books available.</p>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          <p>You need to log in to see your borrowed books.</p>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
