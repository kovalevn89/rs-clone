/* eslint-disable max-len */
import {
  LanguageStr, Lesson, Lessons, User,
} from '../types';
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

  async getLessons(token: string, lang: LanguageStr): Promise<Lessons> {
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
