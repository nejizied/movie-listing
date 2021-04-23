import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { AuthService } from '@shared/auth.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string | undefined;
  loginForm!: FormGroup;
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

  login() {
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .then((data: any) => {
        console.log(data);
        console.log(!data || data?.length === 0);
        if (!data || data?.length === 0) {
          this.error = 'bad credentials';
          return false;
        }
        localStorage.setItem('user', JSON.stringify(data[0]));
        this.router.navigate([this.route.snapshot.queryParams.redirect || '/movies/list'], { replaceUrl: true });
        this.isLoading = false;
      })
      .catch((error: any) => {
        this.error = error;
        this.isLoading = false;
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
