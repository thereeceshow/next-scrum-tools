// "use client";
// import { createContext, useContext, useState } from "react";

// const CategoriesContext = createContext(null);

// const initialcategories = [
//   "Project Backlog",
//   "Sprint Backlog",
//   "In Progress",
//   "Done",
// ];

// let ifStored =
//   JSON.parse(localStorage.getItem("categories")) || initialcategories;

// export function categoriesProvider({ children }) {
//   const [categories, setCategories] = useState(ifStored);

//   return (
//     <CategoriesContext.Provider value={{categories, setCategories}}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// }

// export function useCategories() {
//     return useContext(CategoriesContext)
// }