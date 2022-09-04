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
        width: 1.6875em;
        height: 1.1875em;
      }
      .throbber div {
        position: absolute;
        top: 0.5875em;
        width: 0.1875em;
        height: 0.1875em;
        border-radius: 50%;
        background-color: #333;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .throbber div:nth-child(1) {
        left: 0.375em;
        animation: dot-left 0.5s infinite;
      }
      .throbber div:nth-child(2) {
        left: 0.375em;
        animation: dot-middle 0.5s infinite;
      }
      .throbber div:nth-child(3) {
        left: 0.75em;
        animation: dot-middle 0.5s infinite;
      }
      .throbber div:nth-child(4) {
        left: 1.125em;
        animation: dot-right 0.5s infinite;
      }
      @keyframes dot-left {
        0% { transform: scale(0); }
        100% { transform: scale(1); }
      }
      @keyframes dot-middle {
        0% { transform: translate(0, 0); }
        100% { transform: translate(0.375em, 0); }
      }
      @keyframes dot-right {
        0% { transform: scale(1); }
        100% { transform: scale(0); }
      }
    `}</style>
  </div>
);

export default Throbber;
