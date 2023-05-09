import React from "react";

const TaskForm = (props) => {
  const [taskName, setTaskName] = useState(props.name);
  const [taskDetails, setTaskDetails] = useState(props.details)];

  return (
    <>
      <form>
        <input
          className="rounded-md"
          type="text"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          // onBlur={props.handleBlur}
          // autoFocus
        />
        <textarea
          className="h-full mt-3 resize-none rounded-md"
          type="text"
          value={taskDetails}
          onChange={e => setTaskDetails(e.target.value)}
        />
      </form>
      <button
        className="mx-3 mb-1.5 italic bg-green-600 px-3 py-1 text-white rounded"
        onClick={props.handleSave}
      >
        Save
      </button>
    </>
  );
};

export const EditText = (props) => {
    return (
        <div
          className="bg-yellow-200 my-3 p-1 aspect-square flex flex-col justify-between"
          onDoubleClick={props.handleDoubleClick}
        >
          {props.editable ? (
            <TaskForm />
          ) : (
            <>
              <div>{textValue.name}</div>
              <div>{textValue.details}</div>
              <button
                className="mx-3 mb-1.5 italic bg-red-600 px-3 py-1 text-white rounded"
                onClick={props.handleClick}
              >
                Delete
              </button>
            </>
          )}
        </div>
      );
};