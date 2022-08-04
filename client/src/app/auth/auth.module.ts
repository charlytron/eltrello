import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes), ReactiveFormsModule],
    providers: [AuthService],
    declarations: [RegisterComponent],
})
    
export class AuthModule {}