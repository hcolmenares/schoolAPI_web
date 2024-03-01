import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from 'src/app/interfaces/result';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage implements OnInit {

  
  private userData:any = '';

  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    validatePassword: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private message: MessageService,
  ) { }

  ngOnInit() {
    this.getEmail();
  }

  private getEmail() {
    const userRecovery:any = localStorage.getItem('userData');
    this.userData = JSON.parse(userRecovery);
  }

  async submit() {
    if (this.form.valid) {
      const object = this.form.value;
      this.recoveryPassword(object.password, object.validatePassword);
    } else {
      this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
    }
  }

  recoveryPassword(password:any, validatePassword:any): void {
    const email = this.userData.email;
    const token = this.userData.token;
    if (password === validatePassword) {
      this.authService.recoveryPassword(email, password, token).subscribe(
        (res: result) => {
          if (res.result) {
            this.message.successful(res.message, 'person-circle-outline');
            this.utilsService.RouterLink('/auth');
          }
        },
        (error) => {
          const text:string = 'Ha ocurrido un problema' + error;
          this.message.error(text, 'alert-circle-outline');
        }
      );
    } else {
      this.message.successful('Hubo un problema dentro del procedimiento', 'person-circle-outline');
    }
  }

}
