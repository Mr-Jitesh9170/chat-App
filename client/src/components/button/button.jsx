import React from 'react'
import "./button.scss"

export const Button = ({ name, handleBtn }) => {
    return (
        <button class="button-8" onClick={handleBtn} >{name}</button>
    )
}
