import "../SCSS/chatUI.scss"
export const ChatUI = () => {
  return (
    <div className="chatUI-container">

      <div className="left-chat-container">

        <div className="left-top-container">
          <h3>Chat</h3>
          <input type="text" placeholder="Search..." />
          <div className="circle">+</div>
        </div>

        <div className="left-bottom-container">
          {
            contact.map((_) => {
              return (
                <div className="left-bottom">
                  <div className="circle"></div>
                  <span>
                    <p>{_.name}</p>
                    <p>{_.status}</p>
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="right-chat-container">
        <div className="right-top-container">
          <div className="left-top">
            <div className="circle"></div>
            <span>
              <p>Jitesh Pandey</p>
              <p>online</p>
            </span>
          </div>
          <button className="right-top">
            Profile
          </button>
        </div>
      </div>
    </div>
  )
}


let contact = [
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    status: "online",
    timeStamp: "12:30",
    incommingMassage: 10
  },
]