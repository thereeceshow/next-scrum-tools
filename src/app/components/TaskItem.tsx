import React from 'react'
// import PropTypes from 'prop-types'

const TaskItem = props => {
  return (
    <div>TaskItem</div>
  )
}

export default TaskItem

// ------------------

const TaskItem = (props) => {
    console.log(props);
    const [textValue, setTextValue] = useState({
      id: props.taskObj.id,
      name: props.taskObj.taskName,
      details: props.taskObj.taskDetails
    });
    // const [detailsValue, setDetailsValue] = useState(props.taskDetails);
    // let textValue = props.taskName;
    // let detailsValue = props.taskDetails;
    const [editable, setEditable] = useState(false);

    return (
      <EditText
        // text={"test"}
        handleSave={() => {
          setEditable(false);
          onHandleSave(props.id, textValue);
        }}
        handleDoubleClick={(e) => {
          console.log(e.target);
          console.log(editable);
          setEditable(true);
        }}
        // handleTextChange={(e) => setTextValue(e.target.value)}
        handleChange={(e) => {
          const value = e.target.value;
          console.log('onChange', value, textValue, e.target.name)
          setTextValue({
            ...textValue,
            [e.target.name]: value
          })
        }}
        // handleDetailsChange={(e) => setDetailsValue(e.target.value)}
        // handleDetailsChange={(e) => detailsValue = e.target.value}
        handleClick={() => {
          console.log("DEL ", props.id);
          const delTasksArray = tasks.filter((el) => el.id !== props.id);
          setTasks(delTasksArray);
        }}
        editable={editable}
      />
    );
  };