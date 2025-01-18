import { useEffect } from 'react'
import { account } from './appwrite/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Storage from './pages/Storage'


function App() {
  useEffect(() => {
    // console.log(account)
  }, [])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/storage' element={<Storage />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

