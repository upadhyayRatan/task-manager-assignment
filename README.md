Please note - Token after login get expires in 5minutes. So login with otp after 5 minutes.

# task-manager-assignment

#To build the app - npm install

#For serving the app -npm start

#To Register new user-POST https://task-manager-app-jm0y.onrender.com/users/register 
JSON body example-> {
  "name":"Ratan",
  "username":"Upadhyay",
  "email":"ratanupadhyay6836@gmail.com",
  "password":"1234567"
}

#To get otp for login -POST https://task-manager-app-jm0y.onrender.com/users/login
JSON body->{
"email":"ratanupadhyay6835@gmail.com",
  "password":"1234567"
  }
  ==>Here sending otp in response just in case if otp doesn't reach email-id.
  
#To login using otp -POST  https://task-manager-app-jm0y.onrender.com/users/otplogin 
JSON body -> {
    "email":"ratanupadhyay6835@gmail.com",
    "otp":"5425"
}
-> Here token will be recieved in rsponse after successful login using which we will access other api calls which need authorization.

#To add task -POST https://task-manager-app-jm0y.onrender.com/tasks/add
JSON body ->{
    "date":"2012-04-23T18:25:43.511Z",
    "task":"playing football",
    "status":"incomplete"
}
Headers -> Authorization Bearer token

#To get all tasks -GET https://task-manager-app-jm0y.onrender.com/tasks/getAllTasks
JSon-{
    "status":"completed"
}
Headers -> Authorization Bearer token

#To sort task by id -GET https://task-manager-app-jm0y.onrender.com/tasks/getTasks?sortBy=_id:asc
Headers -> Authorization Bearer token

#To update task -PATCH https://task-manager-app-jm0y.onrender.com/tasks/update/:id (id is the id of a task)
JSON body->{
    "status":"completed"
}
Headers -> Authorization Bearer token

#To delete task -DELETE https://task-manager-app-jm0y.onrender.com/tasks/delete/:id
Headers -> Authorization Bearer token

# To logout user -POST https://task-manager-app-jm0y.onrender.com/users/logoutAll
Headers -> Authorization Bearer token

TO RUN LOCALLY USE THE FOLLOWING ENV VARIABLES
--------------------
DATABASE_URL
JWT_SECRETKEY
PORT
SENDGRIDAPIKEY

