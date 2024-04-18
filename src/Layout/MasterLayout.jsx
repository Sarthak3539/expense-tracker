import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../pages/home/component/Sidebar'
import { useAtom } from 'jotai'
import { authAtom } from '../atoms/auth.atom'

export default function MasterLayout() {
  const [email, setEmail] = useAtom(authAtom)
  if (email == null) {
    return useNavigate()('/login')
  } else {
    return (
      <>
        <div className='HomeLayout'>
          <Sidebar />
          <Outlet />
        </div>
      </>

    )
  }
}
