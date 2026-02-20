import { useThemeStore } from "../store/useThemeStore"

function Navbar() {
  const darkMode = useThemeStore((state) => state.darkMode)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <nav className="
      sticky top-0 z-50
      backdrop-blur-md
      shadow-sm dark:shadow-none
      bg-white/70 dark:bg-gray-900/70
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          Where in the World?
        </h1>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm font-medium 
                     text-gray-800 dark:text-white 
                     hover:opacity-80 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

      </div>
    </nav>
  )
}

export default Navbar