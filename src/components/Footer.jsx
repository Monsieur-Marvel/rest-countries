import { useThemeStore } from "../store/useThemeStore"

function Footer() {
  const darkMode = useThemeStore((state) => state.darkMode)
  const year = new Date().getFullYear()

  return (
    <footer
      className={`
        w-full py-4 text-center text-sm 
        backdrop-blur-md
        shadow-sm dark:shadow-none
        transition-colors duration-300
        ${darkMode ? "bg-gray-900/70 text-gray-300" : "bg-white/70 text-gray-700"}
        fixed bottom-0 left-0
      `}
    >
      © Marvel {year}
    </footer>
  )
}

export default Footer