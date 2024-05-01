import { AuthProvider } from "./AuthContext"
import Routes from "./Routes"

function App() {
  return (
      <div className='w-screen h-screen  bg-[#1D2B53]'>
        {/* <LoginScreen/> */}
        {/* <AddUser/> */}
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </div>
  )
}

export default App
