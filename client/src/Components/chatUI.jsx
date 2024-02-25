import "../SCSS/chatUI.scss"
export const ChatUI = () => {
  return (
    <div className="chatUI-container">

      <div className="left-chat-container">

        <div className="left-top-container">
          <h3>Chat</h3>
          <input type="text" placeholder="Search..." />
          <div className="circle" style={{ fontSize: "20px" }}>+</div>
        </div>

        <div className="left-bottom-container">
          {
            contact.map((_) => {
              return (
                <>
                  <div className="left-bottom">
                    <div className="circle">{_?.name?.charAt(0)}</div>
                    <span className="chat-data">
                      <p>{_.name}</p>
                      <p>{_.massage}</p>
                    </span>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>

      <div className="right-chat-container">
        <div className="right-top-container">
          <div className="left-top">
            <div className="circle" style={{ width: "50px", height: "50px" }}></div>
            <span >
              <p>Jitesh Pandey</p>
              <p>online</p>
            </span>
          </div>
          <button className="button">
            Profile
          </button>
        </div>
        <div className="right-mid-container">

        </div>
        <div className="right-bottom-container">
          <div className="text-area">
            <div className="send-media">📩</div>
            <input type="text" className="send-massage" />
            <div className="send-sticker">😊</div>
          </div>
          <div className="speaker">🔉</div>
          <div className="send-massage">⬆</div>
        </div>
      </div>
    </div>
  )
}


let contact = [  
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
  {
    img: "not available",
    name: "jay pandey",
    massage: "I am Good!",
    timeStamp: "12:30",
    incommingMassage: 10
  },
]