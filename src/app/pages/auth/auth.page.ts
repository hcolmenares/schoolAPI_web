import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from 'src/app/interfaces/result';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private message: MessageService,
  ) { }

  ngOnInit() {
    const awa = '';
  }

  async submit() {
    if (this.form.valid) {
      const object = this.form.value;
      await this.login(object.email, object.password);
    } else {
      this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
    }
  }

  login(username: any, password: any): void {
    this.authService.login(username, password).subscribe(
      (res: result) => {
        if (res.result) {
          this.utilsService.setGoToRoute('/main/home');
          this.message.successful('¡Bienvenido!', 'person-circle-outline');
        }
      },
      (error) => {
        // const text: string = 'Ha ocurrido un problema' + error;
        const text: string = 'Ha ocurrido un problema';
        this.message.error(text, 'alert-circle-outline');
      }
    );
  }

}
