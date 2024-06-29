export interface InputField{
    name:string;
    type:string;
    placeholder:string;
    label:string;
    minLength:number;
    maxLength:number;
    requiredError:string;
    minError:string;
    maxError:string;
    formatError:string;
    regexCode:string;
}
export interface InputValue{
    userName:string,
    email:string,
    password:string,
    confirmPassword:string
}
export interface ResultValue{
    savedUser:{
        userName:string,
        email:string,
        password:string,
        confirmPassword?:string,
    },
    message:string,
    status:number,
    success:boolean,
}
export interface InputError{
userNameError:string,
emailError:string,
passwordError:string,
confirmPasswordError:string,
}
