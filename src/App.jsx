import { useEffect } from 'react'
import { account } from './appwrite/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Storage from './pages/Storage'
import Verfiy from './pages/Verify'

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
          <Route path='/verify' element={<Verfiy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

