export const signUpFormControls = [
    {
        name: 'userName',
        label: 'UserName',
        placeholder: 'Enter your username',
        type: 'text',
        componentType: 'input',
    },
    {
        name: 'userEmail',
        label: 'UserEmail',
        placeholder: 'Enter your email',
        type: 'text',
        componentType: 'input',
    },
    {
        name: 'password',
        label: 'password',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input',
    },
]
export const signInFormControls = [
    {
        name: 'UserEmail',
        label: 'UserEmail',
        placeholder: 'Enter your email',
        type: 'text',
        componentType: 'input',
    },
    {
        name: 'password',
        label: 'UserPassword',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input',
    },
]

export const initialSignInFormData = [
    {
        UserEmail: "",
        password: "",
    }
]
export const initialSignUpFormData = [
    {
        userName: "",
        UserEmail: "",
        password: "",
    }
]