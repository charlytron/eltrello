import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { BoardInterface } from 'src/app/shared/types/board.interface';
import { BoardService } from '../../services/board.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { SocketEventsEnum } from 'src/app/shared/types/socketEvents.enum';
import { ColumnInterface } from '../../../shared/types/column.interface';
import { ColumnsService } from '../../../shared/services/columns.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  boardId: string;
  data$: Observable<{ 
    board: BoardInterface, 
    columns: ColumnInterface[] 
  }>;

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private socketService: SocketService,
    private columnsService: ColumnsService,
  ) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    if (!boardId) {
      throw new Error('Cant get boardID from url');
    }

    this.boardId = boardId;
    this.data$ = combineLatest([
      this.boardService.board$.pipe(filter(Boolean)),
      this.boardService.columns$
    ]).pipe(map(([board, columns]) => ({ 
      board, 
      columns }))
      );
  }

  ngOnInit(): void {
    this.socketService.emit(SocketEventsEnum.boardsJoin, { 
      boardId: this.boardId 
    });
    this.fetchData();
    this.initializeListeners()
  }

  initializeListeners(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('leaving a page');
        this.boardService.leaveBoard(this.boardId);
      }
    })
  }

  fetchData(): void {
    this.boardsService.getBoard(this.boardId).subscribe((board) => {
      this.boardService.setBoard(board);
    });
    this.columnsService.getColumns(this.boardId).subscribe((columns) => {
      this.boardService.setColumns(columns);
    })

  }

}