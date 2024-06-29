"use client"
import React, { FormEvent, useState } from 'react'
import { InputField } from '../signup/signupInterface';
import { InputValue } from './loginInterface';
import { InputError } from './loginInterface';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
const inputFields: InputField[] = [{
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    minLength: 5,
    maxLength: 50,
    requiredError: 'Email is required',
    minError: 'Email must be at least 5 characters',
    maxError: 'Email cannot exceed 50 characters',
    formatError: 'Email must be a valid email address',
    regexCode: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
},
{
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    minLength: 8,
    maxLength: 20,
    requiredError: 'Password is required',
    minError: 'Password must be at least 8 characters',
    maxError: 'Password cannot exceed 20 characters',
    formatError: 'Password must contain at least one number and one special character',
    regexCode: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
}]
const page = () => {
    const router = useRouter()
    const[loading,setLoading] =useState<boolean>(false)
    const [inputValues, setInputValues] = useState<InputValue>({
        email: "",
        password: "",
    })
    const{email, password} = inputValues;
    const [inputErrors, setInputErrors] = useState<InputError>({
        emailError: "",
        passwordError: "",
    })
    const [showError, setShowError] = useState(false)
    interface ResultValue extends InputValue{
        message:string,
        status:number,
        success:true,
    }
   
    const validator = (): boolean => {
        let isValid = true;
        const errors: Partial<InputError> = {}; // Assuming InputError is defined somewhere
    
        inputFields.forEach((field) => {
            const value = inputValues[field.name as keyof InputValue];
            const errorKey = `${field.name}Error` as keyof InputError;
    
            if (value.length === 0) {
                errors[errorKey] = field.requiredError;
                isValid = false;
            } else if (value.length < field.minLength) {
                errors[errorKey] = field.minError;
                isValid = false;
            } else if (value.length > field.maxLength) {
                errors[errorKey] = field.maxError;
                isValid = false;
            } else if (!(new RegExp(field.regexCode).test(value))) {
                errors[errorKey] = field.formatError;
                isValid = false;
            } else {
                errors[errorKey] = ''; // Clear error if valid
            }
        });
    
        setInputErrors(errors as InputError); // Update inputErrors state with collected errors
        return isValid; // Return true if form is valid, false otherwise
    };
    
    const focusHandler = (): void => {
        setShowError(true)
        validator()
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
        setShowError(false);
    };
    const submitHandler = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setShowError(true)
        const isValid = validator()
       try {
        if(isValid){
            setLoading(true)
            const response:AxiosResponse<ResultValue> = await axios.post<ResultValue>("http://localhost:3000/api/login",inputValues,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const result = response.data;
            if(result){
                setLoading(false)
                
                if(result.success){
                    alert(result.message)
                    router.push("/profile")
                }else{
                    alert(result.message)
                }
            }else{
                alert("There is some problem to get the response !")
            }
           
        }
       } catch (error) {
        alert(error)
       }
    }
    return (
       <>
       {loading? <h1>Loading</h1>: <form className='formContainer' onSubmit={submitHandler}>
            <h1>Login</h1>
            {inputFields.map((data, index) => {
                let errorKey = `${data.name}Error`
                return <div className='input_container' key={index}>
                    <label>{data.label}</label>
                    <input
                        type={data.type}
                        placeholder={data.placeholder}
                        value={inputValues[data.name as keyof InputValue]}
                        name={data.name}
                        onChange={changeHandler}
                        onBlur={focusHandler}
                        className={inputErrors[errorKey as keyof InputError] ? "input_Error" : "normal_Input"}
                    />
                    {(showError && errorKey) && <span className='errorMessage'>{inputErrors[errorKey as keyof InputError]}</span>}
                </div>
            })}
            <button className='submit_Button' type='submit'>Submit</button>
            <Link href="/signup">Not registered Yet !! Please register...</Link>
        </form>}
       </>
    )
}

export default page