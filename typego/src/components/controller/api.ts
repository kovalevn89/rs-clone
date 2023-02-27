import {
  ApiError,
  GameApiState,
  LanguageStr, Lesson, Lessons, Message, Progress, Test, TestResults, User, UserResult, UserResults,
} from '../types';
import { Lang, Method } from '../types/enums';

const HOST = 'https://typego.onrender.com/api/';
const ENDPOINT = {
  register: 'register',
  auth: 'auth',
  user: 'user',
  lessons: 'lessons',
  test: 'test',
  top: 'top',
  game: 'game',
  wakeup: 'wakeup',
};

export default class Api {
  private static instance: Api;
  public error!: ApiError;

  constructor() {
    this.error = {
      status: 200,
      message: '',
    };

    if (Api.instance) {
      return Api.instance;
    }

    Api.instance = this;
  }

  private async makeFetch<T>(url: string, method = Method.GET, request?: RequestInit): Promise<T> {
    const response = await fetch(`${HOST}${url}`, {
      method,
      body: request?.body,
      headers: request?.headers,
    });

    if (!response.ok) {
      this.error.status = response.status;
      this.error.message = await response.text();

      throw new Error(this.error.message);
    }

    const result = await response.json();

    return result as Promise<T>;
  }

  async wakeUp(): Promise<void> {
    const { wakeup } = ENDPOINT;

    return this.makeFetch(wakeup);
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

    return this.makeFetch<{ token: string }>(auth, Method.POST, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async deleteUser(token: string): Promise<Message> {
    const { user } = ENDPOINT;

    return this.makeFetch<Message>(user, Method.DELETE, {
      headers: {
        Authorization: token,
      },
    });
  }

  async getUser(token: string): Promise<UserResults> {
    const { user } = ENDPOINT;

    return this.makeFetch<UserResults>(user, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  async getLessons(lang: LanguageStr, token: string): Promise<Lessons> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}`;

    return this.makeFetch<Lessons>(url, Method.GET, {
      headers: {
        Authorization: token,
      },
    });
  }

  async getLesson(index: number, token: string, lang = Lang.en): Promise<Lesson> {
    const { lessons } = ENDPOINT;
    const url = `${lessons}?lang=${lang}&id=${index}`;

    return this.makeFetch<Lesson>(url, Method.GET, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  async updateProgress(body: Progress, token: string): Promise<Progress> {
    const { lessons } = ENDPOINT;
    return this.makeFetch<Progress>(lessons, Method.PUT, {
      body: JSON.stringify(body),
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

  async updateTestResults({ speed, accuracy }: TestResults, token: string): Promise<void> {
    const { user } = ENDPOINT;
    const body = { speed, accuracy };
    return this.makeFetch(user, Method.PUT, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  async getTop10(): Promise<UserResult[]> {
    const { top } = ENDPOINT;

    return this.makeFetch<UserResult[]>(top);
  }

  async updateGameState(body: GameApiState, token: string) {
    const { game } = ENDPOINT;

    return this.makeFetch<GameApiState>(game, Method.PUT, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }
}
