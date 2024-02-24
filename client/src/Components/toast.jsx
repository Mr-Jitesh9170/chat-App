import { useEffect, useState } from "react";
import "../SCSS/toast.scss"
export const Toast = ({ massage }) => {
  const [showTost, setTost] = useState(true)
  setTimeout(() => {
    setTost(false)
  }, 3000);
  return (
    <>
      {
        showTost && <div className="toast-container">
          <p>{massage}</p>
        </div>
      }
    </>
  )
}