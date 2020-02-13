const express = require('express');
const path = require('path');
const port = 8001;
const db = require('./config/mongoose');
const Todo = require('./models/todo');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//route for homepage
app.get('/', function(req,res){
    
    Todo.find({}, function(err, todos) {
        if(err)
        {
            console.log('Error in fetching contents from db');
            return;
        }

        return res.render('home', {
            todo_list: todos
      });

   });
  
});

//route to create todo
app.post('/create-todo', function(req, res) {
    
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    }, function(err, newTodo){
        if(err)
        {
            console.log(err);
            return;
        }
        console.log(newTodo);
        return res.redirect('back');
    });
});

//route to delete todo
app.post('/delete-todo', function(req, res) {
   let id = req.body.id;
   console.log(id);
   Todo.findByIdAndDelete(id, function(err) {
       if(err)
       {
           console.log(err);
           return;
       }
       return res.redirect('back');
   });
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


