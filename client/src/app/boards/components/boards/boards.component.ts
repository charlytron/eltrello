import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { BoardInterface } from 'src/app/shared/types/board.interface';

@Component({
    selector: 'boards',
    templateUrl: './boards.component.html',
})
export class BoardsComponent implements OnInit{
    boards: BoardInterface[] = []
    constructor(private BoardsService: BoardsService) {}

    ngOnInit(): void {
       this.BoardsService.getBoards().subscribe(boards => {
        this.boards = boards;
       });
    }

    createBoard(title: string): void {
        console.log('title', title);
    }
}
    
