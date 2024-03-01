export interface FormField {
  name: string;
  type: 'text' | 'number' | 'email' | 'password';
  label: string;
  autocomplete?: string;
  icon?: string;
  control: any;
  isPassword?: boolean;
}
