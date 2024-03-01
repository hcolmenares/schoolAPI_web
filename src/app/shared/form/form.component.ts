import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/formField';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {

  @Input() fields: FormField[] = [];
  formGroup!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const controls = this.fields.reduce<Record<string, FormControl>>((acc, field) => {
      acc[field.name] = field.control;
      return acc;
    }, {});
    this.formGroup = new FormGroup(controls);
  }

  onSubmit() {
    if(this.formGroup?.value != undefined) {
      console.log(this.formGroup.value);
    }
  }

}
