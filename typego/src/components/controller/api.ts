/* eslint-disable quote-props */
/* eslint-disable max-len */
import {
  LanguageStr, Lesson, Lessons, Progress, Test, User,
} from '../types';
import { Lang, Method } from '../types/enums';

const HOST = 'https://typego.onrender.com/api/';
// const HOST = '127.0.0.1:3000/api/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjcxM2FhYjljNGU0MTI1NTA4NjRkOSIsIm5hbWUiOiJ1c2VyMTIzNCIsImlhdCI6MTY3NzEzNjgyMCwiZXhwIjoxNjc3Mzk2MDIwfQ.vHjr69_TOZeBdPwHO9cRhRUcxvjvZvBwtbpRSl0G_VI';
const ENDPOINT = {
  register: 'register',
  auth: 'auth',
  user: 'user',
  lessons: 'lessons',
  test: 'test',
};

export default class Api {
  token: string;

  constructor() {
    this.token = '';
  }

  private async makeFetch<T>(url: string, method = Method.GET, request?: any): Promise<T> {
    console.log(`${HOST}${url}`);

    const response = await fetch(`${HOST}${url}`, {
      method,
      body: JSON.stringify(request?.body),
      headers: request?.headers,
    });

    if (!response.ok) {
      const message = response.text();
      console.log(message);

      throw new Error(await message);
    }

    const result = await response.json();
    console.log(result);

    return result as Promise<T>;
  }

  async register({ username, password }: User): Promise<{ message: string }> {
    const { register } = ENDPOINT;
    const body = { username, password };

    return this.makeFetch<{ message: string }>(register, Method.POST, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async auth({ username, password }: User): Promise<{ token: string }> {
    const { auth } = ENDPOINT;

    const body = { username, password };
    console.log(body);

    return this.makeFetch<{ token: string }>(auth, Method.POST, {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getUser(): Promise<User> {
    const { user } = ENDPOINT;

    return this.makeFetch<any>(user, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
      },
    });
  }

  async getLessons(token: string, lang: LanguageStr): Promise<Lessons> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}`;
    console.log(token);

    return this.makeFetch<Lessons>(url, Method.GET, {
      headers: {
        Authorization: TOKEN,
      },
    });
  }

  async getLesson(token: string, index: number, lang = Lang.en): Promise<Lesson> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}&id=${index}`;
    console.log(token);
    return this.makeFetch<Lesson>(url, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
      },
    });
  }

  async updateProgress(token: string, body: Progress): Promise<Progress> {
    const { lessons } = ENDPOINT;

    return this.makeFetch<Progress>(lessons, Method.PUT, {
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  async getTest(lang: LanguageStr): Promise<Test> {
    const { test } = ENDPOINT;
    const url = `${test}?lang=${lang}`;
    return this.makeFetch(url);
  }

  async updateTestResults(token: string, { speed, accurancy }: Progress): Promise<any> {
    const { user } = ENDPOINT;
    const body = { speed, accurancy };
    return this.makeFetch(user, Method.PUT, {
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
      },
    });
  }
}
