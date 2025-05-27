import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Home,Game } from './components/index.js'
const routes = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path= "" element={< Home />} />
    <Route path="game" element={< Game/>} />

  </Route>
))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>

  </StrictMode>,
)
