import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { currentUser } from '../../../../../../server/src/controllers/users';

@Component({
    selector: 'auth-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    form = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private authService: AuthService) { }

    onSubmit(): void {
        this.authService.register(this.form.value).subscribe({
            next: (currentUser) => {
                console.log('currentUser', currentUser)
            },
            error: (err) => {
                console.log('err', err)
                }
        })
    }
}