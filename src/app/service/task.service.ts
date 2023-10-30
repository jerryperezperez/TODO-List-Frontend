import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://api-todolist-perez-c7035aabafb7.herokuapp.com'; // Replace with your Heroku app's name


  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/getTasks`)
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/update/${updatedTask.id}`, updatedTask)
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/create`, newTask);
  }
}
