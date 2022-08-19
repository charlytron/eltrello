# Question about Type 'string' is not assignable to type 'null | undefined'.

``` js

boardId: string;
  taskId: string;
  task$: Observable<TaskInterface>;
  data$: Observable<{ task: TaskInterface; columns: ColumnInterface[] }>;
  columnForm = this.fb.group({
    columnId: [null],
  });
```

 10:54 At the last line, we don't need anything besides columnId and, by default, it will be null.

- I put ReactiveFormsModule as an import inside imports of the board.module.ts
- Extended columns interface for data$

I Figured that at this point I shouldn't be getting any errors, but my npm client console barks at me when, by 11:41 you've cleared all the errors.

``` bash
Error: src/app/board/components/taskModal/taskModal.component.ts:58:36 - error TS2322: Type 'string' is not assignable to type 'null | undefined'.

58       this.columnForm.patchValue({ columnId: task.columnId });
                                      ~~~~~~~~

  src/app/board/components/taskModal/taskModal.component.ts:21:5
    21     columnId: [null],
           ~~~~~~~~~~~~~~~~
    The expected type comes from property 'columnId' which is declared here on type 'Partial<{ columnId: null; }>'




✖ Failed to compile.
```