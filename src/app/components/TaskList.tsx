"use client";
import { useState, useRef } from "react";
import { useTasks, useTasksDispatch, useEffect } from "../context/TasksContext";
// import { useCategories } from "../context/categoriesContext";

function TaskList(category) {
  const tasks = useTasks();
  console.log(tasks);
  //   const category = "test";
  return (
    <>
      <div className="basis-[350px] droppable p-2 border-solid border-2 border-rose-600 min-h-[250px]">
        <div className="">
          <div className="flex flex-row justify-between border-solid border-2 border-slate-700">
            <div className="text-xl font-semibold">{category.category}</div>
            <div className="ms-auto text-right">
              <div className="bg-slate-700 text-slate-100 text-center h-6 w-6 rounded-lg">
                X
              </div>
            </div>
          </div>
          {tasks
            .filter((task) => task.status === category.category)
            .map((filteredTask) => {
              // console.log(task.c)
              return (
                <>
                  <Task task={filteredTask} key={filteredTask.id} />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

const Task = ({ task }) => {
  //   const [taskName, setTaskName] = useState(props.name);
  //   const [taskDetails, setTaskDetails] = useState(props.details);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  const dragItem = useRef();
  const dragOverItem = useRef();
  const tasks = useTasks();

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          className="rounded-md"
          type="text"
          value={task.name}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                name: e.target.value,
              },
            });
          }}
          // onBlur={props.handleBlur}
          // autoFocus
        />
        <textarea
          className="h-full mt-3 resize-none rounded-md"
          type="text"
          value={task.details}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                details: e.target.value,
              },
            });
          }}
        />
        <button
          className="mx-3 mb-1.5 italic bg-green-600 px-3 py-1 text-white rounded"
          onClick={() => setIsEditing(false)}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <div className="italic text-lg text-center underline">{task.name}</div>
        <div>{task.details}</div>
        <button
          className="mx-3 mb-1.5 italic bg-red-600 px-3 py-1 text-white rounded"
          onClick={() => {
            dispatch({
              type: "deleted",
              id: task.id,
            });
          }}
        >
          Delete
        </button>
      </>
    );
  }

  return (
    <>
      <li
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDragStart={(e, index) => {
          index = tasks.indexOf(task)
          console.log('onDragStart', task.id, "index",tasks.indexOf(task))
          dragItem.current = index;
          e.dataTransfer.setData("id", task.id);
        }}
        onDragEnter={(e, index) => {
          console.log('onDragEnter', e, index)
          index = tasks.indexOf(task)
          dragOverItem.current = index;
        }}
        onDragEnd={(e) => {
          console.log(tasks, e, dragItem, dragOverItem)
          console.log('DragEnd DataTransfer', e.dataTransfer.getData("id"))
          
          // let id = e.dataTransfer.getData("id");
          // let newTasks = tasks.map((task) => {
          //   if (task.id == id) {
          //     task.status = e.target.status;
          //   }
          //   // console.log('new Task: ', task, status)
          //   return task;
          // });
          // const dragItemContent = newTasks[dragItem.current];
          // newTasks.splice(dragItem.current, 1);
          // newTasks.splice(dragOverItem.current, 0, dragItemContent);
          // dragItem.current = null;
          // dragOverItem.current = null;
          // console.log(newTasks);
          //   setTasks(newTasks);
          dispatch({
            type: "drag",
            payload: {
              transferId: e.dataTransfer.getData("id"),
              id: task.id,
              status: task.status,
              dragItem: dragItem.current,
              dragOverItem: dragOverItem.current,
            },
          });
          dragItem.current = null;
          dragOverItem.current = null;
        }}
        draggable
        key={task.id}
        className="list-none"
      >
        <div
          className="bg-yellow-200 my-3 p-1 aspect-square flex flex-col justify-between"
          onDoubleClick={() => setIsEditing(true)}
        >
          {taskContent}
        </div>
      </li>
    </>
  );
};

// Update Local Storage
const updateLocal = () => {
  const categories = useCategories();

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
};

export default TaskList;
