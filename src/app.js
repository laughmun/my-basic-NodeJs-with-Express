import express, { query } from 'express';
import bodyParser from 'body-parser';
const app = express();

/**
 * TODO
 * create todo
 * update todo by id
 * delete todo by id
 * get todo by id
 */

/**
 * id
 * status = complete, in progress , canceled
 * name
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
let todoList = [];

//create data by POST METHOD
app.post('/todos', (req,res) => {
  console.log('body data',req.body);
  todoList.push(req.body);
  res.send(req.body);
});

//read all data by GET METHOD
app.get('/todos',(req,res) => {
  res.send(todoList);
});

//delete all data by DELETE METHOD
app.delete('/todos/:id',(req,res) => {
  const todoIndex = todoList.findIndex((todo)=> todo.id === req.params.id);
  if(todoIndex === -1) {
    res.status(404).send("Todo not found")
    return;
  }
  todoList.splice(todoIndex,1);
  res.send(req.params.id);
});

//update data by id by PATCH METHOD
app.patch('/todos/:id', (req,res) => {
  const todoIndex = todoList.findIndex((todo)=> todo.id === req.params.id);
  if(todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  //การเขียนแบบ destructuring => x = {...x , ...y}
  todoList[todoIndex] = {...todoList[todoIndex], ...req.body}; //การ merge object 2 object เข้าด้วยกัน โดยการเอา todoList และ req.body มาผสมกัน
  res.send(todoList[todoIndex]);
});

//overwrite data by PUT METHOD
app.put('/todos/:id',(req,res) => {
  const todoIndex = todoList.findIndex((todo)=> todo.id === req.params.id);
  if(todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  todoList[todoIndex] = req.body; //เอาข้อมูลจาก req.body ใส่ทับข้อมูลเดิมทั้งก้อน
  res.send(todoList[todoIndex]);
});

//read data by id by GET METHOD
app.get('/todos/:id', (req,res) => {
  const todo = todoList.find((todo) => todo.id === req.params.id);
  if(todo){
    res.send(todo);
  }
  res.status(404).send("not Found");
});

//create many data by POST METHOD
app.post('/todos/bulk',(req,res) => {
  todoList.push(...req.body);
  res.send(req.body);
});

//delete many data by id by DELETE METHOD
app.delete('/todos',(req,res) => {
  const todoIds = req.query.in.split(",");
  todoList = todoList.filter((todo)=> !todoIds.includes(todo.id))
  res.send(todoIds);
});

app.listen(3000,() => {
  console.log('http://localhost:3000');
}); 