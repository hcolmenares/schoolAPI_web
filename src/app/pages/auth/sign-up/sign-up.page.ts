import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from 'src/app/interfaces/result';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private message: MessageService,
  ) { }

  ngOnInit() {
    const awa = '';
  }

  async submit() {
    if(this.form.valid) {
      const object = this.form.value;
      await this.register(object.email, object.password);
    } else {
      this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
    }
  }

  register(username: any, password: any): void {
    this.authService.register(username, password).subscribe(
      (res: result) => {
        if (res.result) {
          this.message.successful('Usuario creado con exito', 'person-circle-outline');
        }
      },
      (error) => {
        const text:string = 'Ha ocurrido un problema' + error;
        this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
      }
    );
  }

}
