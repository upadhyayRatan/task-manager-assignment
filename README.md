Please note - Token after login get expires in 30 second.
# task-manager-assignment

#To build the app - npm install
#For serving the app -npm start
#To Register new user- https://task-manager-app-jm0y.onrender.com/users/register 
JSON -> {
  "name":"Ratan",
  "username":"Upadhyay",
  "email":"ratanupadhyay6836@gmail.com",
  "password":"1234567"
}

#To get otp for login - https://task-manager-app-jm0y.onrender.com/users/login
JSON->{
"email":"ratanupadhyay6835@gmail.com",
  "password":"1234567"
  }
  
#To login using otp - https://task-manager-app-jm0y.onrender.com/users/otplogin 
JSON-> {
    "email":"ratanupadhyay6835@gmail.com",
    "otp":"5425"
}
#To add task - https://task-manager-app-jm0y.onrender.com/tasks/add
JSON->{
    "date":"2012-04-23T18:25:43.511Z",
    "task":"playing football",
    "status":"incomplete"
}

#To get all tasks - https://task-manager-app-jm0y.onrender.com/tasks/getAllTasks
JSon-{
    "status":"completed"
}
#To sort task by id - https://task-manager-app-jm0y.onrender.com/tasks/getTasks?sortBy=_id:asc
#To update task - https://task-manager-app-jm0y.onrender.com/tasks/update/:id
#To delete task - https://task-manager-app-jm0y.onrender.com/tasks/delete/:id
# To logout user - https://task-manager-app-jm0y.onrender.com/users/logoutAll

