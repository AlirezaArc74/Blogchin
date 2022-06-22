import { useState, useEffect } from "react";

const Tick = () => {
  const [date, setDate] = useState(new Date());

  // console.log(
  //   date
  //     .toLocaleDateString()
  //     .replace(/([۰-۹])/g, (token) =>
  //       String.fromCharCode(token.charCodeAt(0) - 1728)
  //     )
  // );

  useEffect(() => {
    setInterval(() => setDate(new Date()), 100000);
}, []);

// const vaz = date.toLocaleString("fa, IR", {
//   hour: "numeric",
//   minute: "numeric",
//   hour24: true,
// })

// console.log(vaz)
  
// useEffect(() => {
//   if ()
// })

  return (
    <>
      <div>
        {/* <p>
          {date.toLocaleDateString("fa-IR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
        </p> */}
        <p>
          {date.toLocaleString("fa-IR", {
            hour: "numeric",
            minute: "numeric",
            // second: "2-digit",
            hour24: true,
          })}
        </p>
      </div>
    </>
  );
};

export default Tick;
