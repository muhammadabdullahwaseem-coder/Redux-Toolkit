
import React, { useState } from 'react';
import './app.css';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Redux Toolkit' },
    { id: 2, text: 'Add ToDo List' },
  ]);

  // --- NEW: EDIT STATE ---
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAdd = () => {
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text }]); 
    setText('');
  };

  // --- NEW: EDIT FUNCTIONS ---
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editId ? { ...todo, text: editText } : todo
    ));
    setEditId(null); // Exit edit mode
    setEditText('');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Redux Todo</h1>
      </div>

      <div className="task-input">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAdd}>ADD</button>
      </div>

      <ul className="task-list">
        {todos.map((todo) => (
          <li key={todo.id} className={editId === todo.id ? "editing" : ""}>
            
            {editId === todo.id ? (
              /* --- EDIT MODE LAYOUT --- */
              <div className="edit-mode-group">
                <input 
                  type="text" 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={saveEdit} className="save-btn">
                  {/* Checkmark Icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
            ) : (
              /* --- NORMAL LAYOUT --- */
              <>
                <span>{todo.text}</span>
                <div className="action-buttons">
                  {/* EDIT BUTTON (Yellow) */}
                  <button onClick={() => startEdit(todo)} className="edit-btn">
                    {/* Pencil Icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>

                  {/* DELETE BUTTON (Red) */}
                  <button onClick={() => handleDelete(todo.id)} className="delete-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;