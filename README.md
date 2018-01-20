# ToDo API

## project requests
- **Retrieve all projetcs**: GET localhost:3000/projects
- **Retrieve one project by id**: GET localhost:3000/projects/[id #]
- **Add project (requires user email/pass)**: POST localhost:3000/projects (header content-type: 'application/json')
```
{
  "projectName": "[project name!]",
  "email": "[email]",
  "password": "[password]"
}
```
- **Update existing project by id**: PATCH localhost:3000/projects/[id #] (header content-type: 'application/json')
```
{
  "projectName": "[new name]"
}
```
- **Delete project by id**: DELETE localhost:3000/projects/[id #] (deletes all tasks associated with project as well)

### task requests
- **Retrieve all tasks**: GET localhost:3000/tasks
- **Retrieve one task by id**: GET localhost:3000/tasks/[task id #]
- **Add project (requires user email/pass)**: POST localhost:3000/tasks/[project id #] (header content-type: 'application/json')
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
- **Update existing task by id**: UPDATE localhost:3000/tasks/[task id #] (header content-type: 'application/json')
```
{
  "summary": "[task summary]",
  "description": "[task description]",
  "due_date": "[####-##-##]",
  "priority": [int 1-5],
  "project_id": [id #]
}
```
- **Delete task by id**: DELETE localhost:3000/tasks/[task id #]
- **Retrieve all tasks of specific project id**: GET localhost:3000/tasks/project/[project id #]
- **Retrieve all tasks, sorted by due_date or priority descending**: GET localhost:3000/tasks/sorted/['due_date' OR 'priority']

### user requests
- **Retrieve all users**: GET localhost:3000/users
- **Retrieve one user by id**: GET localhost:3000/users/[id #]
- **Verify user email/pass**: POST localhost:3000/users/verify
```
{
    "email": "[email to verify]",
    "password": "[password to verify]"
}
```
- **Add user**: POST localhost:3000/users (header content-type: 'application/json')
```
{
  "first_name": "[first name]",
  "last_name": "[last name]",
  "email": "[email]",
  "password": "[password]"
}
```
- **Update user info by id**: PATCH localhost:3000/users/[id #] (header content-type: 'application/json')
```
{
  "first_name": "[new first name]",
  "last_name": "[new last name]",
  "email": "[new email]",
  "password": "[new password]"
}
```
- **Delete user by id**: DELETE localhost:3000/users/[id #]