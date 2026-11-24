const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

let tasks = [
  { id: 1, title: 'Підготувати звіт', completed: false },
  { id: 2, title: 'Налаштувати Express і Pug', completed: true },
];
let nextId = 3;

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});


    app.post('/api/tasks', (req, res) => {
  const title = req.body?.title;

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Вкажіть назву задачі' });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(item => item.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Задачу не знайдено' });
  }

  task.completed = !task.completed;
  res.status(200).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== id);

  res.status(204).end();
});
app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});
  app.listen(PORT, () => {
    console.log(`Сервер запущено: http://localhost:${PORT}`);
});