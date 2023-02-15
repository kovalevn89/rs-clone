/* eslint-disable max-len */
import { Lesson, Lessons, User } from '../types';
import { Lang, Method } from '../types/enums';

const HOST = 'https://typego.onrender.com/api/';
const ENDPOINT = {
  register: 'register',
  auth: 'auth',
  user: 'user',
  lessons: 'lessons',
};

export default class Api {
  private async makeFetch<T>(url: string, method = Method.GET, request?: any): Promise<T> {
    const response = await fetch(`${HOST}${url}`, {
      method,
      mode: 'no-cors',
      body: request?.body,
      headers: request?.headers,
    });

    if (!response.ok) {
      const message = await response.json();
      console.log(message);

      throw new Error(message);
    }

    return response.json() as Promise<T>;
  }

  async getLessons(token: string, lang: 'en' | 'ru'): Promise<Lessons> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}`;
    return this.makeFetch<Lessons>(url, Method.GET, {
      headers: {
        Authorization: token,
      },
    });
  }

  async getLesson(token: string, index: number, lang = Lang.en): Promise<Lesson> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}&id=${index}`;
    return this.makeFetch<Lesson>(url, Method.GET, {
      headers: {
        Authorization: token,
      },
    });
  }

  // async getUser()
  async register({ username, password }: User): Promise<User> {
    const { user } = ENDPOINT;
    const body = { username, password };

    return this.makeFetch<User>(user, Method.POST, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// получение списка уроков для заданного языка
// * **Method:** GET
// * **Endpoint:** /api/lessons?lang=[ru|en]

// * **Headers:**
//   'Authorization': 'token'

// **200 - OK**
// ```
//   [
//     {
//       "index:": 1,
//       "name": "Home Row Position",
//       "lang": "ru"
//     },
//     {
//       "index:": 2,
//       "name": "Index Fingers",
//       "lang": "ru"
//     }
//     ...
//   ]
// ```
// **400 - error**
// ```
//   {
//     message: 'lessons error'
//     message: 'bad request'
//   }
// ```
// **403 - auth error**
// ```
//   {
//     "message": "not authorized"
//     "message": "invalid token"
//   }
// ```

// # Получение списка упражнений для заданного урока и языка
// * **Method:** GET
// * **Endpoint:**  /api/lessons?lang=[ru|en]&id=[number]

// * **Headers:**
//   'Authorization': 'token'

// **200 - OK**
// ```
//   {
//     "index:": 2,
//     "name": "Index Fingers",
//     "lang": "ru",
//     "levels": [
//         {
//           "index:": 1,
//           "name": "пррпр",
//           "text": "пррпр рпррп прппр ррпрп ппрпр прпрр рпрпп прпрп ррпрп ппрпр"
//         },
//         {
//           "index:": 2,
//           "name": "ров",
//           "text": "ров пол жар фары пора лорд парад пожар форвард водопровод"
//         },
//         ...
//       ]
//   }
// ```
// **400 - error**
// ```
//   {
//     message: 'lessons error'
//     message: 'bad request'
//   }
// ```
// **403 - auth error**
// ```
//   {
//     "message": "not authorized"
//     "message": "invalid token"
//   }
// ```

/*
  Регистрация пользователя:
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

# Получение случайного текста для теста:
* **Method:** GET
* **Endpoint:**  /api/test?lang=[en|ru]

**200 - OK**
```
  {
      "text": "text of the test",
      "lang": "en"
  }
```

**400 - error**
```
  {
    message: 'not found'
    message: 'bad request'
    message: 'get test error'
  }
```

# Обновление статистики теста для пользователя
* **Method:** PUT
* **Endpoint:** /api/user

* **Headers:**
  'Content-Type': 'application/json'
  'Authorization': 'token'

* **Body:** JSON
```
  {
    "speed": 134,
    "accuracy": 99.4
  }
```
**200 - OK**
```
  {
    message: 'user updated'
    message: 'nothing to update'
  }
```
**400 - error**
```
  {
    message: 'update error'
    message: 'bad parametrs'
  }
```
**403 - auth error**
```
  {
      "message": "not authorized"
      "message": "invalid token"
  }
```

# Получение инфомации о пользователе
* **Method:** GET
* **Endpoint:** /api/user

* **Headers:**
  'Authorization': 'token'

**200 - OK**
```
  {
    "_id": "63dbaf9cdcfe2d760c226ccd",
    "username": "admin",
    "accuracy": 99.4,
    "speed": 134,
    "lessons": []
  }
  // возвращаются только те поля которые есть в базе.
```

**400 - error**
```
  {
    message: 'get user error'
  }
```
**403 - auth error**
```
  {
    "message": "not authorized"
    "message": "invalid token"
  }
```

#
# Получение ТОП 10 результатов пользователей (сортировка по скорости набора)
* **Method:** GET
* **Endpoint:**  /api/top

**200 - OK**
```
  [
    {
      "username": "admin2",
      "accuracy": 82,
      "speed": 139
    },
    {
      "username": "admin",
      "accuracy": 99.4,
      "speed": 134
    },
    ...
  ]
```

**400 - error**
```
  {
    message: 'top score error'
    message: 'not found'
  }
```

 # Обновление статистики пройденных игр
* **Method:** PUT
* **Endpoint:**  /api/game

* **Headers:**
  'Content-Type': 'application/json'
  'Authorization': 'token'

* **Body:** JSON
```
  {
    "name": ['whac' | 'space' | 'shooter'],
    "level": 1,
    "score": 1
  }
```
**200 - OK**
```
  {
    "message": "game score updated"
  }
```
**400 - error**
```
  {
    message: 'update error'
    message: 'nothing to update'
    message: 'bad parametrs'
  }
```
**403 - auth error**
```
  {
    "message": "not authorized"
    "message": "invalid token"
  }
```

# Обновление прогресса обучения пользователя
* **Method:** PUT
* **Endpoint:** /api/lessons

* **Headers:**
  'Content-Type': 'application/json'
  'Authorization': 'token'

* **Body:** JSON
```
  {
    "lesson": 1,
    "lang": "ru",
    "level": 3,
    "accuracy": 83,
    "speed": 115
  }
```
**200 - OK**
```
  {
    "message": "study progress updated"
  }
```
**400 - error**
```
  {
    message: 'update error'
    message: 'nothing to update'
    message: 'bad parametrs'
  }
```
**403 - auth error**
```
  {
      "message": "not authorized"
      "message": "invalid token"
  }
``` */
// export const getCars = async (page?: number, limit?: number): Promise<Car[]> => {
//   const { garage } = PATH;
//   let path = garage;
//   if (page || limit) {
//     path += '?';
//     path += page ? `_page=${page}` : '';
//     path += limit ? `&_limit=${limit}` : '';
//   }
//   return makeFetch<Car[]>(`${path}`);
// };

// export const getCar = async (id: number): Promise<Car> => {
//   const { garage } = PATH;
//   return makeFetch<Car>(`${garage}/${id}`);
// };

// export const createCar = async ({ name, color }: Car): Promise<Car> => {
//   const { garage } = PATH;
//   const body = { name, color };
//   const car = await makeFetch<Car>(garage, Method.POST, {
//     body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   return car;
// };

// export const deleteCar = async (id: number): Promise<Success> => {
//   const { garage } = PATH;
//   const res = makeFetch<Success>(`${garage}/${id}`, Method.DELETE).catch();

//   return res;
// };

// export const updateCar = async (id: number, { name, color }: Car): Promise<Car> => {
//   const { garage } = PATH;
//   const body = { name, color };

//   const car = await makeFetch<Car>(`${garage}/${id}`, Method.PUT, {
//     body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   return car;
// };

// export const startEngine = async (id: number): Promise<Engine> => {
//   const { engine } = PATH;

//   return makeFetch<Engine>(`${engine}?id=${id}&status=started`, Method.PATCH);
// };

// export const stopEngine = async (id: number): Promise<Engine> => {
//   const { engine } = PATH;

//   return makeFetch<Engine>(`${engine}?id=${id}&status=stopped`, Method.PATCH);
// };

// export const drive = async (id: number): Promise<Success> => {
//   const { engine } = PATH;
//   const res = { success: false };
//   try {
//     return await makeFetch<Success>(`${engine}?id=${id}&status=drive`, Method.PATCH);
//   } catch (err) {
//     return res;
//   }
// };
