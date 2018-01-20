## ToDo API

### project requests
- GET localhost:3000/projects
- GET localhost:3000/projects/[id #]
- POST localhost:3000/projects (header content-type: 'application/json')
```
{
	"projectName": "[project name!]"
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
    "priority": [int 1-5]
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