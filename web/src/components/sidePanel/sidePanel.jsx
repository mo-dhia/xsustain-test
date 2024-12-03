import { useState } from "react";
import { states } from "../../store";
import { LineMdClose} from '../svgs/svg'

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
    const { sidePanel, setSidePanel } = states()

    return <>
        <div style={{ cursor: 'pointer', width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1, background: 'rgb(0, 0, 0, 0.3)', opacity: sidePanel ? 1 : 0, transition: 'opacity .2s', pointerEvents: sidePanel ? 'all' : 'none' }} onClick={() => setSidePanel(false)} />
        <div style={{ width: '30%', height: '100%', position: 'fixed', right: 0, top: 0, zIndex: 1, background: 'var(--bg-base)', borderTopLeftRadius: '5vw', borderBottomRightRadius: '5vw', borderTopRightRadius: '1vw', borderBottomLeftRadius: '1vw', transition: 'transform .3s', transform: sidePanel ? 'none' : 'translatex(100%)' }} >
            <div style={{ width: '100%', height: '7.5vw', display: 'flex', alignItems: 'center', padding: '0 2vw', justifyContent: 'space-between', borderBottom: '1px solid gray' }}>
                <h1 style={{ fontSize: '2vw' }}>{title}</h1>
                <button>
                    <LineMdClose style={{ width: '2.25vw', height: '2.25vw' }} />
                </button>


            </div>


            <form onSubmit={handleSubmit(formData)} style={{ padding: '3vw 2vw', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.75vw' }}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>
                            <div style={{ fontSize: '.9vw', marginBottom: '.1vw', marginLeft: '.5vw' }}>{field.label}</div>
                            <input
                                style={{ fontSize: '1.3vw', padding: '.5vw', width: '100%', borderRadius: '.5vw', border: '1px solid gray' }}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                    </div>
                ))}
                <button type="submit" style={{ background: 'var(--ac-secondary)', color: 'var(--t-highlight)', alignSelf: 'center', width: '10vw', fontSize: '1.3vw', height: '3vw', borderRadius: '2vw .5vw 2vw .5vw', marginTop: '2vw' }}>Submit</button>
            </form>
        </div>
    </>
}
