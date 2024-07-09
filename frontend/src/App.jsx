import { useState,createContext } from 'react'
import './App.css'
import MainPage from './mainpage/MainPage'
import Header from './common/Header'
import WeatherForecastAccu from './mainpage/ForeCastApi/WeatherForecastAccu'
import GetLocation from './mainpage/ForeCastApi/GetLocation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './loginpage/LogInPage'
import SignupPage from './signuppage/SignUpPage'
import PricingPage from './pricingpage/PricingPage'
import { IPProvider } from './common/Context'
import AboutUs from './common/AboutUs'
import ContactUs from './common/ContactUs'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Router>

      <Header />
      <IPProvider>
      <GetLocation />
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path='aboutus' element={<AboutUs />} />
    <Route path='contactus' element={<ContactUs />} />
    {/* Add other routes here */}
  </Routes>
  </IPProvider>

</Router>
      
    </>
  )
}

export default App
// import React, { Component } from "react";
// import axios from "axios";
// import './App.css';class App extends Component{
//   constructor() {
//     super();
//     this.state = {
//       url: 'localhost:8000',
//     };this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }handleChange(event) {
//     this.setState({url: event.target.value})
//   }
  
//   handleSubmit(event) {
//     console.log(this.state.url)

//     axios
//       .post("/api/url_checker", {'url': this.state.url})
//       .then(res => {
//         alert(res.data)
//       })
//     event.preventDefault();
//   };
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <form onSubmit={this.handleSubmit}>
//             <label>
//                 url:
//                 <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
//             </label>
//               <input type="submit" value="Check URL" />
//           </form>
//         </header>
//       </div>
//     );
//   }
// }
// export default App;