import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BoardInterface } from "src/app/shared/types/board.interface";
import { SocketService } from 'src/app/shared/services/socket.service';
import { SocketEventsEnum } from '../../shared/types/socketEvents.enum';
import { ColumnInterface } from '../../shared/types/column.interface';

@Injectable()
export class BoardService {
    board$ = new BehaviorSubject<BoardInterface | null>(null);
    columns$ = new BehaviorSubject<ColumnInterface[]>([]);


    constructor(private socketService: SocketService) {}

    setBoard(board: BoardInterface): void {
      this.board$.next(board)
    }

    setColumns(columns: ColumnInterface[]): void {
      this.columns$.next(columns)
    }

    leaveBoard(boardId: string): void {
      this.board$.next(null)
      this.socketService.emit(SocketEventsEnum.boardsLeave, {boardId})
}
}