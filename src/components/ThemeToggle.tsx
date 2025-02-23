import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-white"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;