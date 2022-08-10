import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TopbarComponent],
  exports: [TopbarComponent]
})

export class TopbarModule { }