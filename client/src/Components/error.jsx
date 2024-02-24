import "../SCSS/error.scss"
export const Error = () => {
  return (
    <div className="error-container">
      <div className="error-emojis">☹</div>
      <h1>404</h1>
      <h4>Not Found</h4>
      <p>The resource requested could not be found on the server!</p>
    </div>
  )
} 