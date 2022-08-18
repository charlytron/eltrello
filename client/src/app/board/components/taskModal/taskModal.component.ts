import { Component, HostBinding } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable,filter, combineLatest } from "rxjs";
import { BoardService } from "../../services/board.service";
import { TaskInterface } from 'src/app/shared/types/task.interface';

@Component({
  selector: "task-modal",
  templateUrl: "./taskModal.component.html",
})
export class TaskModalComponent {
  @HostBinding('class') classes = 'task-modal';

  boardId: string;
  taskId: string;
  task$: Observable<TaskInterface>;
  data$: Observable<{task: TaskInterface}>

  constructor(private route: ActivatedRoute, private router: Router, private boardService: BoardService) {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const boardId = this.route.parent?.snapshot.paramMap.get('boardId');
    

    if (!boardId) {
      throw new Error('Cant get boardID from url');
    }
    if (!taskId) {
      throw new Error('Cant get taskID from url');
    }

    this.taskId = taskId
    this.boardId = boardId;
    this.task$ = this.boardService.tasks$.pipe(
      map((tasks) => {
        return tasks.find((task) => task.id === this.taskId);
      }),
      filter(Boolean)
    );
    this.data$ = combineLatest([this.task$, this.boardService.columns$]).pipe(
      map(([task, columns]) => ({
        task,
        columns,
      }))
    );
  }
  

    goToBoard(): void {
      this.router.navigate(['boards', this.boardId]);
    }
  
    updateTaskName(taskName: string): void {
      console.log('updateTaskName', taskName);
    }
    updateTaskDescription(taskDescription: string): void {
      console.log('updateTaskDescription', taskDescription);
    }
  }
  