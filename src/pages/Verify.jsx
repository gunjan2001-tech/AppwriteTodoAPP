import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { account } from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function Verify() {
  const [params] =useSearchParams()
  const secret = params.get('secret')
  const id = params.get("userId")
const navigate = useNavigate()
async function updateVerfiy(){
  try {
    const verify = await account.updateVerification(id,secret)
    alert("use is vewrified")
    navigate('/login')
  } catch (error) {
    console.log(error )
  }
  
}
updateVerfiy()
  return (
    <div>Verify</div>
  )
}

export default Verify