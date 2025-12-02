// app.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// in-memory todo store
let todos = [
  { id: 1, text: 'Example todo', done: false }
];
let nextId = 2;

// Root - shows the UI (index.html)
app.get('/', (req, res) => {
  // index.html already contains "Hello from Kubernetes!" text in the page
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: get todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// API: create todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text required' });
  const t = { id: nextId++, text, done: false };
  todos.push(t);
  res.status(201).json(t);
});

// API: toggle / delete
app.put('/api/todos/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const t = todos.find(x => x.id === id);
  if (!t) return res.status(404).json({ error: 'not found' });
  t.done = !t.done;
  res.json(t);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(x => x.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`kube-lab-app listening on ${PORT}`);
});
