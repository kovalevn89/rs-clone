export enum Method {
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  POST = 'POST',
  PATCH = 'PATCH',
}

export interface User {
  username: string;
  password: string;
  token?: string;
}
