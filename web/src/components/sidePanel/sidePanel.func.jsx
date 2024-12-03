import React, { useMemo, useState } from "react";
import { states } from "../../utils/store";

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

export const useSidePanelLogic = (fields) => {
    const { formData, handleChange } = useForm(fields);
    const { sidePanel, setSidePanel } = states();

    const Input = useMemo(() => {
        return ({ type, ...props }) => {
            return type === 'textarea' ? (
                <textarea {...props} />
            ) : (
                <input {...props} />
            );
        };
    }, []);

    return {
        formData,
        handleChange,
        Input,
        sidePanel,
        setSidePanel
    };
};