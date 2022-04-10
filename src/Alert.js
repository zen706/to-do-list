import React from 'react'


const Alert = ({msg, type, list, removeAlert}) => {
    // console.log(msg, type, list)
    // React.useEffect(() => {
    //   const timeOut = setTimeout(() => {
    //     removeAlert();
    //   }, 3000);
    //   return () => clearTimeout(timeOut);
    // },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert