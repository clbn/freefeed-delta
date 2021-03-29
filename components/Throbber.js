const Throbber = () => (
  <div className="throbber">
    <div/>
    <div/>
    <div/>
    <div/>

    <style jsx>{`
      .throbber {
        position: relative;
        display: inline-block;
        vertical-align: text-bottom;
        width: 27px;
        height: 19px;
      }
      .throbber div {
        position: absolute;
        top: 9.4px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #333;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .throbber div:nth-child(1) {
        left: 6px;
        animation: dot-left 0.5s infinite;
      }
      .throbber div:nth-child(2) {
        left: 6px;
        animation: dot-middle 0.5s infinite;
      }
      .throbber div:nth-child(3) {
        left: 12px;
        animation: dot-middle 0.5s infinite;
      }
      .throbber div:nth-child(4) {
        left: 18px;
        animation: dot-right 0.5s infinite;
      }
      @keyframes dot-left {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }
      @keyframes dot-middle {
        0% { transform: translate(0, 0); }
        100% { transform: translate(6px, 0); }
      }
      @keyframes dot-right {
        0% { transform: scale(1); }
        100% { transform: scale(0); }
      }
    `}</style>
  </div>
);

export default Throbber;
