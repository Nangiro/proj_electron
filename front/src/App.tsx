import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import LoginScreen from "./components/LoginScreen"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-screen h-screen bg-[#1D2B53]'>
        <LoginScreen/>
      </div>
    </QueryClientProvider>
  )
}

export default App
