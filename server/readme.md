# Регистрация пользователя:
* **method:** POST
* **endpoint:** /api/register

* **Headers:**
  'Content-Type': 'application/json'

* **body:** JSON  
```
  {  
    "username": "superadmin",  
    "password": "admin123"  
  }  
```
* **Response:**

**200 - OK**  
>{  
> "message": "user registered"  
>}  

**400 - error**  
  {  
    "message": "registration error"  
    "message": "user exists"  
    "message": "input validation error: invalid username length"  
    "message": "input validation error: invalid password length"  
  }  
  
  
# Авторизация пользователя:
method: POST
endpoint: /api/auth

Headers:
  'Content-Type': 'application/json'

body: JSON
{
    "username": "superadmin",
    "password": "admin123"
}

Response:

200 - OK
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGFjY2NhMzg3ZjNiYzc2Y2MxNTNiZCIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjc1MjgzNjYyLCJleHAiOjE2NzU1NDI4NjJ9.7bMY9A34uzrAPE5mlb1Wb5Lds2VBZCt7qCu4GjMwNDw"
  }

400 - error
  {
      "message": "login error"
      "message": "user not exists"
      "message": "invalid password"
  }

ВНИМАНИЕ! После авторизации в headers каждого запроса необходимо добавлять поле: "Authorization: token"


# Удаление пользователя:
method: DELETE
endpoint: /api/user

Headers:
  'Authorization': 'token'

Response:

200 - OK
  {
    "message": "user deleted"
  }

400 - error
  {
      "message": "delete user error"
  }

403 - auth error
  {
      "message": "not authorized"
      "message": "invalid token"
  }
