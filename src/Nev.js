import React, { useEffect, useState } from 'react'

const Nev = () => {
    const [show,setShow]= useState(false);

    const changeBgColor= () =>
    window.scrollY > 100? setShow(true):setShow(false);

    useEffect(() =>{
        window.addEventListener("scroll",changeBgColor);
        return () =>{
            window.removeEventListener("scroll",changeBgColor);
        }
    }, [show])
  return (
    <>
      <div className={`fixed top-0 left-0 w-full ${ show && "bg-black opacity-80 transition-colors duration-300 ease-in-out"}`}>
        <div className="flex justify-between items-center">
            <img
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt ="Logo"
            className="h-[80px] onject-contain cursor-pointer select-none"
            />
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar"
            className="h-[30px] object-contain cursor-pointer mr-4"
            />

        </div>
      </div>
    </>
  )
}

export default Nev



