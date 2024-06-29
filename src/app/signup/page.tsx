"use client";
import React, { useState } from 'react';
import { InputField } from './signupInterface';
import { InputValue } from './signupInterface';
import { InputError } from './signupInterface';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { ResultValue } from './signupInterface';
import Link from 'next/link';



const Page = () => {
    const route = useRouter()
    const inputFields: InputField[] = [
        {
            name: 'userName',
            type: 'text',
            placeholder: 'Enter your user name',
            label: 'User Name',
            minLength: 3,
            maxLength: 16,
            requiredError: 'User name is required',
            minError: 'User name must be at least 3 characters',
            maxError: 'User name cannot exceed 10 characters',
            formatError: 'User name can only contain letters, numbers, and underscores',
            regexCode: "^[a-zA-Z][a-zA-Z0-9_]{2,10}$"
        },
        {
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
        },
        {
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm your password',
            label: 'Confirm Password',
            minLength: 8,
            maxLength: 20,
            requiredError: 'Confirming your password is required',
            formatError: 'Passwords must match',
            minError:"Minimum 8 Characters are required.",
            maxError:"Shouldn't exceed more than 20 characters",
            regexCode: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
        }
    ];
    const [inputValues, setInputValues] = useState<InputValue>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
const [loading,setLoading] = useState(false)
    const [inputErrors, setInputErrors] = useState({
        userNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    });

    const [showError, setShowError] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
       
        e.preventDefault();
        setShowError(true);
        const valid = validator(); // Assuming validator() is a function that returns true/false based on validation

        if (valid) {
            setLoading(true);
            try {
                console.log(inputValues); // Assuming inputValues is defined somewhere
                const { confirmPassword, ...formValues } = inputValues;

                // Assuming userName, email, and password are defined variables
                const response: AxiosResponse<ResultValue> = await axios.post<ResultValue>("http://localhost:3000/api/signup", formValues, {
                    headers: {
                        "Content-Type": "application/json"
                    },

                });

                const result: ResultValue = response.data; // Use response.data to get JSON data
               
                if(result){setLoading(false)}
                if (result.success) {
                    alert(result.message);
                    route.push("/profile")
                } else {
                    alert(result.message)
                }
                setSubmitSuccess(true); // Assuming setSubmitSuccess is defined somewhere
            } catch (error) {
                console.error("Error:", error); // Improved error handling
                console.log("Error To Register User");
                alert(error)
                setLoading(false)
            }
        } else {
            setSubmitSuccess(false);
            // Assuming setSubmitSuccess is defined somewhere
        }
    };

    const focusHandler = (): void => {
        validator();
        setShowError(true)
    };

    const validator = (): boolean => {
        let valid = true;
        const errors: Partial<InputError> = {};

        inputFields.forEach((field) => {
            const value = inputValues[field.name as keyof InputValue];
            const errorKey = `${field.name}Error` as keyof InputError;

            if (value.length === 0) {
                errors[errorKey] = field.requiredError;
                valid = false;
            } else if (field.minLength && value.length < field.minLength) {
                errors[errorKey] = field.minError;
                valid = false;
            } else if (field.maxLength && value.length > field.maxLength) {
                errors[errorKey] = field.maxError;
                valid = false;
            } else if (field.regexCode && !(new RegExp(field.regexCode)).test(value.trim())) {
                errors[errorKey] = field.formatError;
                valid = false;
            } else {
                errors[errorKey] = '';
            }

            if (field.name === 'confirmPassword' && inputValues.password !== value) {
                errors[errorKey] = "Passwords must match";
                valid = false;
            }
        });

        setInputErrors(errors as InputError);
        return valid;
    };

    return (
        <div>
       {loading ? <h1>Loading ....</h1>: <form className='formContainer' onSubmit={submitHandler}>
       <h1 className='heading'>Sign Up</h1>
       {inputFields.map((data, index) => {
           const errorKey = `${data.name}Error`;

           return (
               <div key={index} className='input_container'>
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
                   {showError && inputErrors[errorKey as keyof InputError] && <span className='errorMessage'>{inputErrors[errorKey as keyof InputError]}</span>}
               </div>
           );
       })}

       <button type='submit' className='submit_Button'>Submit</button>
       {submitSuccess && <span className='submitSuccess'>Successful Input</span>}
       <Link href="/login">Already Registerd ? Please login</Link>
   </form>
   }
   
   </div>
    );
};

export default Page;
