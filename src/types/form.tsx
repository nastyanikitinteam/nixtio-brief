export type BriefFormProps = {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
  pdf: string;
};

export type InputProps = {
  field: any;
  form: any;
  placeholder: string;
  type: string;
};

export type PhoneInputProps = {
  field: any;
  form: any;
  placeholder: string;
  type: string;
};

export type TextareaProps = {
  field: any;
  form: any;
  placeholder: string;
  rows?: number;
};
