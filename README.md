# TrackR API
## Models
User {
    uid: int,
    name: string,
    password: string,
    email: string
}    

Task {
    tid: int,
    name: string,
    description: string,
    assignee: User,
    subtasks: Task[]
}

## Routes

(list, get, new, edit, remove)

- POST /login
- POST /logout
+ GET /users
+ GET /user/:uid
+ POST /register { username, password, email }
- POST /user/:uid/update
- POST /user/:uid/delete
+ POST /user/search { email }

+ GET /tasks
- GET /task/:tid
- POST /task/new
- POST /task/:tid/update
- POST /task/:tid/delete
