import axios from "axios";

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
        name: isSignup ? 'password' : 'password',
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



export const handleFormChange = (setFormData) => (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
};

export const handleFormSubmit = (formData, isSignup, setUser) => async (e) => {
    e.preventDefault();

    try {
        if (isSignup) {
            console.log(formData);
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
            } else {
                const { data } = await axios.post(import.meta.env.VITE_API_URL + 'users/register', formData);
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            }
        } else {
            const { data } = await axios.post(import.meta.env.VITE_API_URL + 'users/login', formData);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        }
    } catch (error) {
        alert(error?.response?.data?.message || 'User not found');
    }
};
