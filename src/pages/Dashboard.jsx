import React, { useEffect, useState, useCallback } from 'react';
import { account, databases } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { ID, Query } from 'appwrite';

export default function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [todo, setTodo] = useState('');
  const [alltodo, setAllTodo] = useState([]);

  const viewTodo = useCallback(async () => {
    if (!email) return;
    try {
      let x = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.equal('email', email)]
      );
      setAllTodo(x.documents);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  useEffect(() => {
    const isLogin = async () => {
      try {
        let x = await account.get("current");
        if(x.emailVerification == false){
          navigate('./login')
        }
        setEmail(x.email);
        setName(x.name);
      } catch (e) {
        navigate('./login');
      }
    };
    isLogin();
  }, [navigate]);

  useEffect(() => {
    if (email) {
      viewTodo();
    }
  }, [email, viewTodo]);

  const logout = async () => {
    try {
      await account.deleteSessions("current");
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("write a todo");
    } else {
      try {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DB_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          ID.unique(),
          {
            email: email,
            todo: todo
          }
        );
        setTodo('');
        viewTodo();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTodo = async (id) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id,
        {
          todo: "this is done "
        }
      );
      viewTodo();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      viewTodo();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {email && name ? (
        <>
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <span className="text-xl sm:text-2xl font-bold text-indigo-600">Dashboard</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="hidden md:flex md:items-center md:space-x-4">
                    <span className="text-sm sm:text-base text-gray-700">{name}</span>
                    <span className="text-sm sm:text-base text-gray-500">{email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-3 inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <div className="md:hidden bg-white border-t border-gray-200 pt-4 pb-3">
            <div className="max-w-7xl mx-auto px-4 flex items-center sm:px-6">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
                  alt={name}
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-800">{name}</div>
                <div className="text-xs font-medium text-gray-500">{email}</div>
              </div>
            </div>
          </div>

          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 sm:p-6">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Welcome, {name}!</h1>
                  
                  <form onSubmit={addTodo} className="mb-4">
                    <div className="flex flex-col sm:flex-row">
                      <input
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder="Enter a new todo"
                        className="flex-grow px-4 py-2 text-base border rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 sm:mb-0"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md sm:rounded-l-none hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add Todo
                      </button>
                    </div>
                  </form>

                  {alltodo.length > 0 ? (
                    <div className="space-y-4">
                      {alltodo.map((todo) => (
                        <div key={todo.$id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-md shadow">
                          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                            <span className="text-gray-800 text-sm sm:text-base">{todo.todo}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => updateTodo(todo.$id)} className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => deleteTodo(todo.$id)} className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center text-sm sm:text-base">No todos yet. Add some!</p>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-semibold text-gray-900">Loading...</h1>
        </div>
      )}
    </div>
  );
}

