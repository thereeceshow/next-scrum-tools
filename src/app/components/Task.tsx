import React from "react";

const Task = ({ task }) => {
  //   const [taskName, setTaskName] = useState(props.name);
  //   const [taskDetails, setTaskDetails] = useState(props.details);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

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
        <div>{taskName}</div>
        <div>{taskDetails}</div>
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
    <div
      className="bg-yellow-200 my-3 p-1 aspect-square flex flex-col justify-between"
      onDoubleClick={() => setIsEditing(true)}
    >
      {taskContent}
    </div>
  );
};

export default Task;
