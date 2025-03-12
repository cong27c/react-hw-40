//  import React, { useEffect, useState } from 'react'
// // rfce
//  function MyComponents() {
//   const [name, setName] = useState('')
//   const [age,setAge] = useState(1)

//     useEffect(() => {
//       const form1 = document.querySelector("#formId-1")
//       const form2 = document.querySelector("#formId-2")
//       const handleName = (e) => {
//         e.preventDefault()
//         const name = document.querySelector(".name")
//         setName(name.value)
//       }
//       const handleAge = (e) => {
//         e.preventDefault()
//         const age = document.querySelector(".age")
//         setAge(age.value)
//       }
//       form1.addEventListener("submit", handleName)
//       form2.addEventListener("submit", handleAge)
//       return () => {
//         form1.removeEventListener("submit", handleName)
//         form2.removeEventListener("submit", handleAge)
//       }
//     }, [name])

//    return (
//      <div >
//       <form action="" id='formId-1'>
//         <label htmlFor="">Your name:</label>
//         <input type="text" className='name'/>
//         <button>Submit</button>
//       </form>
//       <form action="" id='formId-2'>
//         <label htmlFor="">Your age:</label>
//         <input type="text" className='age'/>
//         <button>Submit</button>
//       </form>
//       <div>My name is {name}, toi {age} tuoi</div>
//      </div>
//    )
//  }
//  export default MyComponents
