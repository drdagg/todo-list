import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Model} from './model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()

export class HttpService {

  private url = 'http://localhost:3000/post';

  constructor(private http: HttpClient) {
  }

  getTasks() {
    return this.http.get(this.url);
  }

  addTask(model: Model) {
    const body = {action: model.action, done: false};

    return this.http.post(this.url, body, httpOptions);
  }

  updateTask(model: Model | number) {
    const id = typeof model === 'number' ? model : model.id;
    const taskUrl = `${this.url}/${id}`;

    return this.http.put(taskUrl, model, httpOptions);
  }

  deleteTask(model: Model | number) {
    const id = typeof model === 'number' ? model : model.id;
    const taskUrl = `${this.url}/${id}`;

    return this.http.delete(taskUrl, httpOptions);
  }
}


