export const signUpFormControls = [
    {
        name: 'userName',
        label: 'UserName',
        placeholder: 'Enter your username',
        type: 'text',
        componentType: 'input',
    },
    {
        name: 'email',
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
export const signInFormControls = [
    {
        name: 'UserEmail',
        label: 'UserEmail',
        placeholder: 'Enter your email',
        type: 'text',
        componentType: 'input',
    },
    {
        name: 'UserPassword',
        label: 'UserPassword',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input',
    },
]

export const initialSignInFormData = [
    {
        UserEmail: "",
        UserPassword: "",
    }
]
export const initialSignUpFormData = [
    {
        userName: "",
        UserEmail: "",
        UserPassword: "",
    }
]