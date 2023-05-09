"use client";
import { createContext, useContext, useReducer, useState } from "react";
// import { useCategories } from "./categoriesContext";

const categories = [
  "Project Backlog",
  "Stories",
  "To Do",
  "In Progress",
  "Testing",
  "Done",
];

const CategoriesContext = createContext(categories);

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function categoriesProvider({ children }) {
  const [categories, setCategories] = useState();

  return (
    <CategoriesContext.Provider value={{categories, setCategories}}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
    return useContext(CategoriesContext)
}



export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          name: action.name,
          details: action.details,
          status: action.status,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "drag": {
      let newTasks =  tasks.map((t) => {
        console.log(action.payload)
        if (t.id === action.payload.id) {
          t.status = action.payload.status
          return action.payload;
        } else {
          return t;
        }
      });
      newTasks.splice(action.payload.dragItem, 1);
      newTasks.splice(action.payload.dragOverItem, 0, newTasks[action.payload.dragItem])
      console.log('Drag New Tasks', newTasks)
      return newTasks
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  {
    id: 1,
    name: "Task 1",
    details: "Enter Details Here",
    status: categories[0],
  },
  {
    id: 2,
    name: "Task 2",
    details: "Enter Details Here",
    status: categories[0],
  },
  {
    id: 3,
    name: "Task 3",
    details: "Enter Details Here",
    status: categories[1],
  },
  {
    id: 4,
    name: "Task 4",
    details: "Enter Details Here",
    status: categories[1],
  },
  {
    id: 5,
    name: "Task 5",
    details: "Enter Details Here",
    status: categories[1],
  },
  {
    id: 6,
    name: "Task 6",
    details: "Enter Details Here",
    status: categories[2],
  },
  {
    id: 7,
    name: "Task 7",
    details: "Enter Details Here",
    status: categories[2],
  },
];