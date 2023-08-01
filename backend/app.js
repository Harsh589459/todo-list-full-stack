const express = require('express');
const app = express();
const port = 3007;
const db = require('./database')
const cors = require('cors');
app.use(cors())

app.use(express.json());

const todos = [];
const doneTodos = [];


app.get('/',(req,res)=>{
  db.execute('SELECT * FROM todos').then(([rows,fieldData])=>{
    res.send(rows);
  })
  })

 
// });
app.post('/add', (req, res) => {
  const { todoName, description } = req.body;
  return (db.execute('INSERT INTO todos(name,description,status) VALUES(?,?,?)', [todoName,description,"remaining"]).then(()=>{
    res.sendStatus(200)
  }))
});

app.post('/done', (req, res) => {
  const { id } = req.body;

  db.execute('UPDATE todos SET status=? WHERE ID=?',['done',id]).then(()=>{console.log("task is done")
  res.sendStatus(200);
})
})

app.post('/delete', (req, res) => {
  const { id } = req.body;
  db.execute('DELETE FROM todos WHERE ID=?',[id]).then(()=>{
    res.sendStatus(200);
  })
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
