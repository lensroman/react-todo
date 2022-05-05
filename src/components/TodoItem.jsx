import React from 'react';

import { useDispatch } from 'react-redux'
import { removeTodo, toggleComplete } from '../store/taskSliceStore'

const TodoItem = ({id, text, completed}) => {
  const dispatch = useDispatch()

  const removeTask = () => dispatch(removeTodo({id}))

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete({id}))}
      />
      <span>{text}</span>
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
