export const addBookFields = [
    {
        name: 'title',
        placeholder: 'Enter book title',
        error: 'Book title is required',
        type: 'text'
    },
    {
        name: 'author',
        placeholder: 'Enter book author',
        error: 'Book author is required',
        type: 'text'
    },
    {
        name: 'category',
        placeholder: 'Select book category',
        error: 'Book category is required',
        type: 'text',
        dropdown: true
    },
    {
        name: 'year',
        placeholder: 'Enter book year',
        error: 'Book year is required',
        type: 'number'
    }
]

export const loginFields = [
    {
        name: 'email',
        placeholder: 'Enter your email',
        error: 'Email is required',
        type: 'email'
    },
    {
        name: 'password',
        placeholder: 'Enter your password',
        error: 'Password is required',
        type: 'password'
    },
]

export const registerFields = [
    {
        name: 'email',
        placeholder: 'Enter your email',
        error: 'Email is required',
        type: 'email'
    },
    {
        name: 'name',
        placeholder: 'Enter your name',
        error: 'Name is required',
        type: 'text'
    },
    {
        name: 'password',
        placeholder: 'Enter your password',
        error: 'Password is required',
        type: 'password'
    },
    {
        name: 'confirmPassword',
        placeholder: 'Confirm your password',
        error: 'Password is required',
        type: 'password'
    },
]