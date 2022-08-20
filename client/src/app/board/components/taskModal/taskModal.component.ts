import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../services/board.service';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { TaskInterface } from 'src/app/shared/types/task.interface';
import { FormBuilder } from '@angular/forms';
import { ColumnInterface } from 'src/app/shared/types/column.interface';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: "task-modal",
  templateUrl: "./taskModal.component.html",
})
export class TaskModalComponent implements OnDestroy{
  @HostBinding('class') classes = 'task-modal';

  boardId: string;
  taskId: string;
  task$: Observable<TaskInterface>;
  data$: Observable<{ task: TaskInterface; columns: ColumnInterface[] }>;
  columnForm = this.fb.group<{ columnId: FormControl<string | null> }>({
    columnId: new FormControl(null),
  });
  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private tasksService: TasksService,
    private fb: FormBuilder

  ) {
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

    this.task$.pipe(takeUntil(this.unsubscribe$)).subscribe((task) => {
      this.columnForm.patchValue({ columnId: task.columnId });
    });

    combineLatest([this.task$, this.columnForm.get('columnId')!.valueChanges
    ]).subscribe(([task, columnId]) => {
        if (task.columnId !== columnId) {
          this.tasksService.updateTask(this.boardId, task.id, { columnId });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  

    goToBoard(): void {
      this.router.navigate(['boards', this.boardId]);
    }
  
    updateTaskName(taskName: string): void {
      console.log('updateTaskName', taskName);
      this.tasksService.updateTask(this.boardId, this.taskId, { title: taskName });
    }
    updateTaskDescription(taskDescription: string): void {
      this.tasksService.updateTask(this.boardId, this.taskId, {
        description: taskDescription,
      });
    }
  }
  