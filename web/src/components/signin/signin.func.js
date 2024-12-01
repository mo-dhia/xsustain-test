export const createInitialFormData = (isSignup) => ({
    email: '',
    password: '',
    confirmPassword: isSignup ? '' : undefined
});

export const createInputConfigs = (isSignup) => [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email@example.com'
    },
    {
        name: isSignup ? 'Set Password' : 'password',
        label: isSignup ? 'Set Password' : 'Password',
        type: 'password',
        placeholder: 'At least 4 characters'
    },
    ...(isSignup ? [{
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'At least 4 characters'
    }] : [])
];

export const validateForm = (formData, isSignup) => {
    if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }
    }
    return true;
};

export const handleFormChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

export const handleFormSubmit = (formData, isSignup) => (e) => {
    e.preventDefault();
    
    if (!validateForm(formData, isSignup))  return;

    console.log('Form submitted:', formData);
};