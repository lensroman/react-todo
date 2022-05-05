import React from 'react';

import { useDispatch } from 'react-redux'
import { deleteTodo, toggleStatus } from '../store/taskSliceStore'

const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch()

  const removeTask = () => dispatch(deleteTodo(id))

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span
        className="delete"
        onClick={() => removeTask(id)}
      >
              &times;
            </span>
    </li>
  );
};

export default TodoItem;
