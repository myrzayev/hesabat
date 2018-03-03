import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meta, Title } from '@angular/platform-browser';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';

@Component({
  selector: 'myr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private title: Title,
      private meta: Meta
  ) {
    title.setTitle('Giriş paneli');
    meta.addTags([
      { name: 'keywords', content: 'login, daxil ol, sistem' },
      { name: 'description', content: 'Giriş paneli' }
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.sub1 = this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage('Artıq sistemə daxil ola bilərsiniz', 'success');
        } else if (params['accessDenid']) {
          this.showMessage('Zəhmət olmasa, sistemə daxil olun', 'warning');
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'pass': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.sub2 = this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.pass === formData.pass) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Şifrə yanlışdır');
          }
        } else {
          this.showMessage('Email yanlışdır');
        }
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
