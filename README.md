# TrackR API
## Models
User {
    \_id: int,
    name: string,
    password: string,
    email: string
}

Task {
    \_id: int,
    name: string,
    description: string,
    assignee: User,
    project: Project,
    subtasks: Task[],
    comments: Comment
}

Project {
    \_id: int,
    owner: User, // constraint: team.contains(user)
    team: Team,
    tasks: Task[]
}

Team {
    \_id: int,
    leader: User, // constraint: members.contains(leader)
    members: User[]
}

Comment {
    \_id: int,
    author: User,
    datetime: DateTime,
    text: string
}

## Routes

(list, get, new, edit, remove)

+ POST /login
+ POST /logout
+ GET /users
+ GET /user/:uid
+ POST /register { username, password, email }
- POST /user/:uid/update
- POST /user/:uid/delete
+ POST /user/search { email }

- GET /tasks
- GET /task/:tid
- POST /task/new
- POST /task/:tid/update
- POST /task/:tid/delete
