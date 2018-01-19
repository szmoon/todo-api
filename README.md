## ToDo API

### project requests
- GET localhost:3000/projects
- GET localhost:3000/projects/[id # starting from 1]
- POST localhost:3000/projects (header content-type: 'application/json')
```
{
	"projectName": "[project name!]"
}
```
- PATCH localhost:3000/projects/[id # starting from 1] (header content-type: 'application/json')
```
{
	"projectName": "[new name]"
}
```