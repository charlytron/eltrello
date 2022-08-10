import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from './components/board/board.component';
import { AuthGuardService } from "../auth/services/authGuard.service";
import { Routes, RouterModule} from '@angular/router';
import { BoardService } from "./services/board.service";


const routes: Routes = [
  {
    path: "boards/:boardId",
    component: BoardComponent,
    canActivate: [AuthGuardService],
    
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [BoardComponent],
  providers: [BoardService],
})
export class BoardModule {

}