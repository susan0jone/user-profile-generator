import logo from './logo.svg';
import './App.css';
import { FaSearch } from 'react-icons/fa';

import React , { Component, useEffect, useState } from 'react'

function App(){
  const [List , setList] = useState([{
    FirstName: "John",
    LastName: "Doe"
  },{
    FirstName: "Joanna",
    LastName: "Doe"
  },{
    FirstName: "Jenn",
    LastName: "Doe"
  }]);
  const [input , setInput] = useState("");
  const [currentPage , setCurrentPage] = useState(1);
  const postsperPage = 20
  const indexOfLastPost = currentPage * postsperPage;
  const indexofFirstPost = indexOfLastPost - postsperPage;


  const handleChange = (e) =>{
    setInput(e.target.value);
  }
// console.log(input);

  const updateBody = async (e) => {
    let list = document.getElementById("list");
    console.log(list);
    e.preventDefault();
    const users = await fetch("http://api.enye.tech/v1/challenge/records");
    const data = await users.json();
    let unfilteredArr = data.records.profiles;
    const filteredArr = unfilteredArr.filter((el) => {
      return el.FirstName.includes(input);
    })
      //       console.log(filteredArr)
      // console.log(filteredArr)
    setList(filteredArr);
    list.scrollIntoView ({behaviour : "smooth", block : "start"})
   
}


  const genderFilteredArr = async (gender , paymentMethod) => {
    let list = document.getElementById("list");
    const users = await fetch("http://api.enye.tech/v1/challenge/records");
    const data = await users.json();
    let unfilteredArr = data.records.profiles;
    const genderfilteredArr = unfilteredArr.filter((el) => {
      return el.Gender === gender;;
  })
    const payfilteredArr = genderfilteredArr.filter((el) => {
      return el.PaymentMethod === paymentMethod;;
    })
    setList(payfilteredArr);
    list.scrollIntoView ({behaviour : "smooth", block : "start"})

}

  const pageNumbers = [];

  for (let i=1; i<= Math.ceil(List.length/postsperPage); i++){
    pageNumbers.push(i);
  }
 
  const paginate = (num) => {
    setCurrentPage(num)
  // console.log(num)
 }


  



  


  return (
    <div className = "body-wrapper">
     <div className = "body-content">
       <p>USER PROFILE GENERATOR</p> 
       <div className="details">Where you'll find the best user profiles<br/> on the web.</div>
       <form onSubmit = {(e) => updateBody(e)}>
        <input placeholder = "Search For User Profile" type="text" value = {input} onChange={handleChange}/>
       <span className = "icon"> <FaSearch/></span>
       </form>
       </div> 
       <div className= "button-wrapper">
          <div  className="maleWrapper">
            <div className="title">Male</div>
            <div className="maleSpecs" id="maleSpecs">
              <div align="center">Payment Method</div><hr/>
              <li onClick = {() => genderFilteredArr("Male", "check")} >Check</li>
              <li onClick = {() => genderFilteredArr("Male", "cc")}>CC</li>
              <li onClick = {() => genderFilteredArr("Male", "paypal")}>Paypal</li>
              <li onClick = {() => genderFilteredArr("Male", "money order")}>Money Order</li>
            </div>
          </div>
          <div className="femaleWrapper">
            <div className="title">Female</div>
            <div id="femaleSpecs">
              <div align="center">Payment Method</div><hr/>
              <li onClick = {() => genderFilteredArr("Female", "check")} >Check</li>
              <li onClick = {() => genderFilteredArr("Female", "cc")}>CC</li>
              <li onClick = {() => genderFilteredArr("Female", "paypal")}>Paypal</li>
              <li onClick = {() => genderFilteredArr("Female", "money order")}>Money Order</li>
            </div>
          </div>
          <div  className="other">
            <div className="title">Other</div>
            <div id="otherSpecs">
              <div align="center">Payment Method</div><hr/>
              <li onClick = {() => genderFilteredArr("Prefer to skip", "check")} >Check</li>
              <li onClick = {() => genderFilteredArr("Prefer to skip", "cc")}>CC</li>
              <li onClick = {() => genderFilteredArr("Prefer to skip", "paypal")}>Paypal</li>
              <li onClick = {() => genderFilteredArr("Prefer to skip", "money order")}>Money Order</li>
            </div>
          </div>
       </div>
       <div id="list" className = "list-box">
          {List.length === 0 ? 
            <div className = "feedback">No results</div>
            :
            <div className="list-content">{List.slice(indexofFirstPost , indexOfLastPost).map((user) => 
              <li key={user.id}>
                <p> <h2>{user.FirstName} {user.LastName}</h2></p>
                <p><b>Gender</b>: {user.Gender}</p>
                <p><b>PhoneNumber</b> : {user.PhoneNumber}</p>
                <p><b>Email</b>: {user.Email}</p>
                <p><b>Latitude</b>: {user.Latitude}</p>
                <p><b>Longitude</b> : {user.Longitude}</p>
                <p><b>CreditCardNumber</b> : {user.CreditCardNumber}</p>
                <p><b>DomainName</b> : {user.DomainName}</p>
                <p><b>MacAddress</b>: {user.MacAddress}</p>
                <p><b>Website</b>: {user.URL}</p>
                <p><b>UserName</b>: {user.UserName}</p>
                <p><b>LastLogin</b>: {user.LastLogin}</p>
                <p><b>PaymentMethod</b>: {user.PaymentMethod}</p>
                </li>
             )}</div>
          }
       </div>
       <div className="number">{pageNumbers.map((number) => 
              <li onClick = {() => paginate(number)} key={number}>
                {number}
                </li>
             )}
        </div>
    </div>
  );



}

export default App;
