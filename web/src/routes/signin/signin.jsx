import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSigninLogic } from './signin.func.js';
import styles from './signin.module.css';

export default function Signin({ isSignup }) {
    const { formData, setFormData, inputConfigs, handleFormSubmit, user } = useSigninLogic(isSignup);

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </h1>
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        {inputConfigs.map((input, index) => (
                            <React.Fragment key={input.name}>
                                <label className={`${styles.label} ${index > 0 ? styles.marginTop : ''}`}>
                                    {input.label}
                                </label>
                                <input
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={formData[input.name] || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, [input.name]: e.target.value }))}
                                    className={styles.input}
                                    required
                                />
                            </React.Fragment>
                        ))}
                        {isSignup ? null : <div className={styles.forgotPassword}>
                            Forgot Password?
                        </div>}
                        <button type="submit" className={styles.button}>
                            {isSignup ? 'Sign up' : 'Sign in'}
                        </button>
                    </form>
                    <div className={styles.divider}>
                        <strong className={styles.dividerText}>Or</strong>
                    </div>
                    <div className={styles.signInLink}>
                        <Link to={isSignup ? '/login' : '/signup'}>
                            Do you have an account? <strong className={styles.linkText}>Sign up</strong>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.sideContainer}>
                <div className={styles.sideBox}></div>
                <div className={styles.sideBox}></div>
            </div>
        </main>
    );
}