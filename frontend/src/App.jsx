import TodoList from "./components/TodoList";
import { useState, createContext } from "react";
import ErrorBoundary from "./components/ErrorBoundry";

// Move context creation outside the component
export const Theme = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ErrorBoundary>
      <div className={`relative ${darkMode ? 'dark' : ''}`}>
        <Theme.Provider value={{ darkMode, toggleTheme }}>
          <button className="absolute top-0 right-0 text-black bg-slate-200 rounded-full p-2 m-2 hover:bg-slate-600 hover:text-gray-100" onClick={toggleTheme}>
            Toggle Theme
          </button>
          <div className="min-h-screen bg-gray-400 dark:bg-gray-900 flex justify-center items-center">
            <TodoList />
          </div>
        </Theme.Provider>
      </div>
    </ErrorBoundary>
  );
};

export default App;
