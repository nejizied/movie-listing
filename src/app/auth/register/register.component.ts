import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string | undefined;
  registrationForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  register() {
    this.isLoading = true;
    this.authenticationService
      .register({
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        name: this.registrationForm.value.name,
      })
      .then((data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/movies/list'], { replaceUrl: true });
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.error = error;
        this.isLoading = false;
      });
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
}
