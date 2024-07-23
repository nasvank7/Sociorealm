import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../services/redux/slices/themeSlice"; // Adjust the path as per your project structure
import { ThemeState } from "../../services/redux/slices/themeSlice";// Adjust the path as per your project structure
import RootState from "../../services/redux/Store/rooteState";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);


  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    dispatch(setMode(newThemeMode));
  };

  return (
    <button
      className=" dark:bg-gray-800 rounded p-2 w-12 h-12 flex items-center justify-center"
      onClick={toggleTheme}
    >
      <div
        className={`w-56 h-6 rounded bg-gray-300 dark:bg-gray-300 shadow-md transform transition-transform ${
          themeMode === 'dark' ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
