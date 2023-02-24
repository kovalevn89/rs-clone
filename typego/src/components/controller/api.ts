/* eslint-disable quote-props */
/* eslint-disable max-len */
import {
  ApiError,
  GameApiState,
  LanguageStr, Lesson, Lessons, Message, Progress, Test, User, UserResult,
} from '../types';
import { Lang, Method } from '../types/enums';

const HOST = 'https://typego.onrender.com/api/';
// const HOST = '127.0.0.1:3000/api/';
const ENDPOINT = {
  register: 'register',
  auth: 'auth',
  user: 'user',
  lessons: 'lessons',
  test: 'test',
  top: 'top',
  game: 'game',
};

export default class Api {
  private static instance: Api;
  public token!: string;
  public error!: ApiError;

  constructor() {
    this.token = '';
    this.error = {
      status: 200,
      message: '',
    };

    if (Api.instance) {
      return Api.instance;
    }

    Api.instance = this;
  }

  private loadFromStorage(): void {
    this.token = localStorage.getItem('typeGoToken') || '';
  }

  saveToStorage(): void {
    localStorage.setItem('typeGoToken', this.token);
  }

  private async makeFetch<T>(url: string, method = Method.GET, request?: RequestInit): Promise<T> {
    console.log(`${HOST}${url}`);

    const response = await fetch(`${HOST}${url}`, {
      method,
      body: request?.body,
      headers: request?.headers,
    });

    if (!response.ok) {
      this.error.status = response.status;
      this.error.message = await response.text();

      console.log(this.error.message);

      throw new Error(this.error.message);
    }

    const result = await response.json();
    console.log(result);

    return result as Promise<T>;
  }

  async register({ username, password }: User): Promise<Message> {
    const { register } = ENDPOINT;
    const body = { username, password };

    return this.makeFetch<Message>(register, Method.POST, {
      body: JSON.stringify(body),
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
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteUser(): Promise<Message> {
    const { user } = ENDPOINT;

    this.loadFromStorage();
    return this.makeFetch<Message>(user, Method.DELETE, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  async getUser(): Promise<User> {
    const { user } = ENDPOINT;
    this.loadFromStorage();

    return this.makeFetch<any>(user, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    });
  }

  async getLessons(lang: LanguageStr): Promise<Lessons> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}`;
    this.loadFromStorage();
    console.log(this.token);

    return this.makeFetch<Lessons>(url, Method.GET, {
      headers: {
        Authorization: this.token,
      },
    });
  }

  async getLesson(index: number, lang = Lang.en): Promise<Lesson> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}&id=${index}`;

    this.loadFromStorage();
    return this.makeFetch<Lesson>(url, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    });
  }

  async updateProgress(body: Progress): Promise<Progress> {
    const { lessons } = ENDPOINT;
    this.loadFromStorage();
    return this.makeFetch<Progress>(lessons, Method.PUT, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    });
  }

  async getTest(lang: LanguageStr): Promise<Test> {
    const { test } = ENDPOINT;
    const url = `${test}?lang=${lang}`;
    return this.makeFetch(url);
  }

  async updateTestResults({ speed, accurancy }: Progress): Promise<void> {
    const { user } = ENDPOINT;
    const body = { speed, accurancy };
    this.loadFromStorage();
    return this.makeFetch(user, Method.PUT, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    });
  }

  async getTop10(): Promise<UserResult[]> {
    const { top } = ENDPOINT;

    return this.makeFetch<UserResult[]>(top);
  }

  async updateGameState(body: GameApiState) {
    const { game } = ENDPOINT;

    this.loadFromStorage();
    return this.makeFetch<GameApiState>(game, Method.PUT, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token,
      },
    });
  }
}
