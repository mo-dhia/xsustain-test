import { useMemo, useState } from "react";
import { LineMdClose } from '../svgs/svg';
import { states } from "../../utils/store";
import styles from './sidePanel.module.css';

const createInitialFormData = (fields) => {
    return fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});
};

const useForm = (fields) => {
    const [formData, setFormData] = useState(createInitialFormData(fields));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return { formData, handleChange, setFormData };
};

export default function SidePanel({ title, fields, handleSubmit }) {
    const { formData, handleChange } = useForm(fields);
    const { sidePanel, setSidePanel } = states();

    const Input = useMemo(() => {
        return ({ type, ...props }) => {
            return type === 'textarea'
                ? <textarea {...props} />
                : <input {...props} />;
        };
    }, []);

    return (
        <>
            <div className={styles.overlay} onClick={() => setSidePanel(false)} style={sidePanel ? { opacity: 1, pointerEvents: 'all' } : null} />
            <div className={styles.panel} style={!sidePanel ? { transform: 'translatex(100%)' } : null}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <button>
                        <LineMdClose className={styles.closeIcon} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(formData)} className={styles.form}>
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label>
                                <div className={styles.label}>{field.label}</div>
                                <Input
                                    className={styles.input}
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                        </div>
                    ))}
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div >

        </>
    );
}