## ToDo API

### project requests
- GET localhost:3000/projects
- GET localhost:3000/projects/[id #]
- POST localhost:3000/projects (header content-type: 'application/json')
```
{
	"projectName": "[project name!]",
  "email": "[email]",
  "password": "[password]"
}
```
- PATCH localhost:3000/projects/[id #] (header content-type: 'application/json')
```
{
	"projectName": "[new name]"
}
```
- DELETE localhost:3000/projects/[id #] (deletes all tasks associated with project as well)

### task requests
- GET localhost:3000/tasks
- GET localhost:3000/tasks/[task id #]
- POST localhost:3000/tasks/[project id #] (header content-type: 'application/json')
```
{
  "summary": "[task summary]",
  "description": "[task description]",
  "due_date": "[####-##-##]",
  "priority": [int 1-5],
  "email": "[email]",
  "password": "[password]"
}
```
- UPDATE localhost:3000/tasks/[task id #] (header content-type: 'application/json')
```
{
  "summary": "[task summary]",
  "description": "[task description]",
  "due_date": "[####-##-##]",
  "priority": [int 1-5],
  "project_id": [id #]
}
```
- DELETE localhost:3000/tasks/[task id #]

### user requests
- GET localhost:3000/users
- GET localhost:3000/users/[id #]
- GET localhost:3000/users/verify
```
{
    "email": "[email to verify]",
    "password": "[password to verify]"
}
```
- POST localhost:3000/users (header content-type: 'application/json')
```
{
  "first_name": "[first name]",
  "last_name": "[last name]",
  "email": "[email]",
  "password": "[password]"
}
```
- PATCH localhost:3000/users/[id #] (header content-type: 'application/json')
```
{
  "first_name": "[new first name]",
  "last_name": "[new last name]",
  "email": "[new email]",
  "password": "[new password]"
}
```
- DELETE localhost:3000/users/[id #]