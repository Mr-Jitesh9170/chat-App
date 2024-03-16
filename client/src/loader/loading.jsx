import "./loading.scss"
export const Loader = ({ value }) => {
  return (
    <div className="loader">
      <div className="loader-container">
        {value}
      </div>
    </div>
  )
}