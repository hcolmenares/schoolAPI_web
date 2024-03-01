import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayInfoComponent } from './display-info/display-info.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { LogoComponent } from './logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    DisplayInfoComponent,
    FormComponent,
    HeaderComponent,
    InputFieldComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    DisplayInfoComponent,
    FormComponent,
    HeaderComponent,
    InputFieldComponent,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
