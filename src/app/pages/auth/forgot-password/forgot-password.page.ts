import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { result } from 'src/app/interfaces/result';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private message: MessageService
  ) { }

  ngOnInit() {
    const awa = '';
  }

  async submit() {
    if (this.form.valid) {
      const object = this.form.value;
      await this.forgotPassword(object.email);
    } else {
      this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
    }
  }

  forgotPassword(email: any): void {
    this.authService.forgotPassword(email).subscribe(
      (res: result) => {
        if (res.result) {
          this.utilsService.RouterLink('/auth/recovery-password');
          this.message.successful(res.message, 'person-circle-outline');
        }
      },
      (error) => {
        const text:string = 'Ha ocurrido un problema' + error;
        this.message.error('Ha ocurrido un problema', 'alert-circle-outline');
      }
    );
  }

}
