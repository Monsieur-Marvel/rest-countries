import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetail from "./pages/CountryDetail"
import { useEffect } from "react"
import { useThemeStore } from "./store/useThemeStore"
import Navbar from "./components/Navbar"

function App() {
  const darkMode = useThemeStore((state) => state.darkMode)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/rest-countries/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App