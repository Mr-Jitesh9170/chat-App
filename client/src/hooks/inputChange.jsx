import { useState } from "react"

export const useInputChange = (inputData) => {
    const [input, setInput] = useState(inputData);

    const handleChange = (e) => {
        let { value, name } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    return { input, setInput, handleChange }
}