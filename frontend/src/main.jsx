import { createRoot } from 'react-dom/client'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>      
    </BrowserRouter>
  </ChakraProvider>

)
