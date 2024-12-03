import { LineMdClose } from '../svgs/svg';
import styles from './sidePanel.module.css';
import { useSidePanelLogic } from './sidePanel.func.js';

export default function SidePanel({ title, fields, handleSubmit }) {
    const { 
        formData, 
        handleChange, 
        Input, 
        sidePanel, 
        setSidePanel 
    } = useSidePanelLogic(fields);

    return (
        <>
            <div 
                className={styles.overlay} 
                onClick={() => setSidePanel(false)} 
                style={sidePanel ? { opacity: 1, pointerEvents: 'all' } : null} 
            />
            <div 
                className={styles.panel} 
                style={!sidePanel ? { transform: 'translatex(100%)' } : null}
            >
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
            </div>
        </>
    );
}