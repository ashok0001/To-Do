import { useState } from 'react';

const TaskList = ({ children }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

const Task = ({ children, completed, onToggle, onRemove }) => (
  <div
    className={`flex justify-between items-center p-4 rounded-lg ${
      completed ? 'bg-gray-200' : 'bg-white'
    }`}
  >
    <span className={completed ? 'line-through' : ''}>{children}</span>
    <div>
      <button
        className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
        onClick={onToggle}
      >
        {completed ? 'Undo' : 'Done'}
      </button>
      <button
        className="ml-2 text-sm text-red-500 hover:text-red-700 focus:outline-none"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  </div>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { task, completed: false }]);
  };

  const deleteItem = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = event.target.elements.task.value.trim();
    if (task) {
      addTodo(task);
      event.target.reset();
    }
  };

  return (
    <div className='flex flex-col items-center py-20 bg-[#6901af] min-h-screen'>
        <form onSubmit={handleSubmit} className='w-full max-w-4xl'>
      <div className="mb-4">
        <input
          type="text"
          name="task"
          placeholder="Add a task"
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          autoFocus
        />
      </div>
      <TaskList>
        {todos.map((todo, index) => (
          <Task
            key={index}
            completed={todo.completed}
            onToggle={() => toggleStatus(index)}
            onRemove={() => deleteItem(index)}
          >
            {todo.task}
          </Task>
        ))}
      </TaskList>
    </form>
    </div>
    
  );
};

export default TodoList;
