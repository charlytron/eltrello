import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskInterface } from "../types/task.interface";
import { environment } from "src/environments/environment";
import { SocketService } from './socket.service';
import { TaskInputInterface } from '../types/taskInput.interface';
import { SocketEventsEnum } from '../types/socketEvents.enum';



@Injectable()
export class TasksService {
  constructor(private http: HttpClient, private socketService: SocketService) {}

  getTasks(boardId: string): Observable<TaskInterface[]> {
    const url = `${environment.apiUrl}/boards/${boardId}/tasks`;
    return this.http.get<TaskInterface[]>(url);
  }

  createTask(taskInput: TaskInputInterface): void {
    this.socketService.emit(SocketEventsEnum.tasksCreate, taskInput);
  }
}

