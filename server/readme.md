# type-go-api #  
Api for Rolling Scopes School task "RS-Clone".  
  
* Setup and Running  
* Use node 18.x or higher.  
* Clone this repo: $ git clone https://github.com/kovalevn89/rs-clone.git.  
* Go to downloaded folder: $ cd rs-clone/server.  
* Install dependencies: $ npm install.  
* Start server: $ npm start.  
* Now you can send requests to the address: http://127.0.0.1:5000.  
  
    
  
  
# Регистрация пользователя:  
* **Method:** POST  
* **Endpoint:** /api/register  
  
* **Headers:**  
  'Content-Type': 'application/json'  
  
* **Body:** JSON  
```
  {  
    "username": "superadmin",  
    "password": "admin123"  
  }  
```
* **Response:**  

**200 - OK**  
```
  {  
    "message": "user registered"  
  }  
```
**400 - error**  
```
  {  
    "message": "registration error"  
    "message": "user exists"  
    "message": "input validation error: invalid username length"  
    "message": "input validation error: invalid password length"  
  }  
```
    
    
# Авторизация пользователя:  
* **Method:** POST  
* **Endpoint:** /api/auth  
  
* **Headers:**  
  'Content-Type': 'application/json'  
  
* **Body:** JSON  
```
  {  
      "username": "superadmin",  
      "password": "admin123"  
  }  
```
* **Response:**  

**200 - OK**  
```
  {  
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGFjY2NhMzg3ZjNiYzc2Y2MxNTNiZCIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjc1MjgzNjYyLCJleHAiOjE2NzU1NDI4NjJ9.7bMY9A34uzrAPE5mlb1Wb5Lds2VBZCt7qCu4GjMwNDw"  
  }  
```
**400 - error**  
```
  {  
      "message": "login error"  
      "message": "user not exists"  
      "message": "invalid password"  
  }  
```
**ВНИМАНИЕ! После авторизации в headers каждого запроса необходимо добавлять поле: "Authorization: token"**  
  
  
# Удаление пользователя:  
* **Method:** DELETE  
* **Endpoint:** /api/user  

* **Headers:**  
  'Authorization': 'token'  

* **Response:**  

**200 - OK**  
```
  {  
    "message": "user deleted"  
  }  
```
**400 - error**  
```
  {  
      "message": "delete user error"  
  }  
```
**403 - auth error**  
```
  {  
      "message": "not authorized"  
      "message": "invalid token"  
  }  
```



// получение рандомного текста для теста
http://localhost:5000/api/test?lang=[en|ru]
GET


{
    "text": "text of the test",
    "lang": "en"
}

400
{
  message: 'not found'
  message: 'bad request'
  message: 'get test error'
}


//  обновление статистики теста

/api/user  
PUT

Headers:
  'Content-Type': 'application/json'  
  'Authorization': 'token'  

Body: JSON  
{
    "speed": 134,
    "accuracy": 99.4
}

200
{
  message: 'user updated'
  message: 'nothing to update'
}

400
{
  message: 'update error'
  message: 'bad parametrs'
}

403
  {  
      "message": "not authorized"  
      "message": "invalid token"  
  }  


// получение инфы о пользователе
  http://localhost:5000/api/user
  GET

  Headers:
  'Authorization': 'token'  

200
{
    "_id": "63dbaf9cdcfe2d760c226ccd",
    "username": "admin",
    "accuracy": 99.4,
    "speed": 134,
    "lessons": []
}
// возвращаются только те поля которые есть в базе.

400
{
  message: 'get user error'
}

403
  {  
      "message": "not authorized"  
      "message": "invalid token"  
  }  


  // получение списка уроков для заданного языка
  http://localhost:5000/api/lessons?lang=[ru|en]
    GET

  Headers:
  'Authorization': 'token'  


200
[
    {
        "index:": 1,
        "name": "Home Row Position",
        "lang": "ru"
    },
    {
        "index:": 2,
        "name": "Index Fingers",
        "lang": "ru"
    }
    ...
]

  400
{
  message: 'lessons error'
  message: 'bad request'
}

403
  {  
      "message": "not authorized"  
      "message": "invalid token"  
  }  


    // получение списка упражнений для заданного урока и языка
  http://localhost:5000/api/lessons?lang=[ru|en]&id=[number]
    GET

  Headers:
  'Authorization': 'token'  

200
{
    "index:": 2,
    "name": "Index Fingers",
    "lang": "ru",
    "levels": [
        {
            "index:": 1,
            "name": "пррпр",
            "text": "пррпр рпррп прппр ррпрп ппрпр прпрр рпрпп прпрп ррпрп ппрпр"
        },
        {
            "index:": 2,
            "name": "ров",
            "text": "ров пол жар фары пора лорд парад пожар форвард водопровод"
        },
        ...
      ]
}

    400
{
  message: 'lessons error'
  message: 'bad request'
}

403
  {  
      "message": "not authorized"  
      "message": "invalid token"  
  }  