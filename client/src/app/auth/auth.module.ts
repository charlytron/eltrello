import { NgModule } from "@angular/core";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes), ReactiveFormsModule, CommonModule],
    providers: [AuthService],
    declarations: [RegisterComponent, LoginComponent],
})
    
export class AuthModule {}