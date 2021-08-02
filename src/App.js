import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';
import axios from "axios"
import moment from "moment"
import sun from "./img/sunrice.png"
import sun1 from "./img/sunset.png"
import wind from "./img/wind.png"



// class App extends Component{
//   constructor(props) {
//    super(props);
//    this.state = {
//      data: [],
//      loading: false,
//      target:""
    
//    }
 
//  }
 

 
//  async componentDidMount() {
//     this.fetchRequest()
//   }
 
  
//   fetchRequest = async () => {
//    this.setState({ loading: true })


//    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=gyumri&units=metric&appid=3937afcd923373a4cd1f0f8d44183933`).catch(e => {
//      return {e}
//    });
 
//    this.setState({
//      data:data?.main || [],
//      loading: false,
    
  
//    })
//  }
 
//  render(){
//    let{data,target}=this.state
//    return <div className="app" > 
//     <ul >
//         <li>{data.temp} ℃ </li>
//        </ul>
//    </div>
//  }
 
//  }
 
  
class App extends Component{
 state={
   lat:"",
   lon:"",
   city:"",
   temperatureC:"",
   temperatureF:"",
   icon:"",
   sunrice:"",
   sunset:"",
   time:"",
   description:"",
   windSpeed:"",
   windDeg:"",
   erorMesage:"",


 }

 getPosition=()=>{
   return new Promise(function(resolve,reject){
     navigator.geolocation.getCurrentPosition(resolve,reject)
   })
 }


 getWeather=async (latitude,longitude)=>{
   const api=await fetch(`//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3937afcd923373a4cd1f0f8d44183933&units=metric`)
   const data=await api.json()
   this.setState({
    lat:latitude,
    lon:longitude,
    city:data.name,
    temperatureC:Math.round(data.main.temp),
    temperatureF:Math.round(data.main.temp *1.8+32),
    icon:data.weather[0].icon,
    sunrice:moment.unix(data.sys.sunrise).format("hh:mm a"),
    sunset:moment.unix(data.sys.sunset).format("hh:mm a"),
    erorMesage:"not a information ",
    time:moment().format('MMMM Do YYYY, h:mm:ss a'),
    windSpeed:data.wind.speed,
    windDeg:data.wind.deg,
    description:data.weather[0].description

   })
 }
 componentDidMount(){
   this.getPosition().then((position)=>{
     this.getWeather(position.coords.latitude,position.coords.longitude)
   }).catch((err)=>{
     this.setState({
       erorMesage:err.message
     })
   })
   this.timerId=setInterval( ()=>
     this.getWeather(this.state.lat,this.state.lon),
   1000)
 }


 componentWillUnmount(){
   clearInterval(this.timerId)
 }


 render(){
   const{city,windDeg,windSpeed,description,temperatureC,temperatureF,icon,sunrice,sunset,time}=this.state
  
   if(city){

    return(
      <div className="App">
         <div className="weather-box"> 
           <div className="weather-country"> {city} </div>
           <div className="weather-temp"> {temperatureC} &deg;C <span className="slash">/</span> {temperatureF}&deg;F </div>
           <div><img  className="weather-icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather-icon"/> </div> 
           <div> <span>{description}</span> </div>
           <div className="weather-item"><img className="sunset" src={sun} alt="sunrise"/><span>sunrise--{sunrice} </span> </div>
           <div className="weather-item"><img className="sunrice" src={sun1} alt="sunset"/><span>sunset--{sunset}  </span> </div>
           <div className="weather-item"> <img className="wind" src={wind} alt="windt"/><span>WIND-{windSpeed}m/s -- {windDeg}&deg; </span> </div>
           <div className="time"> {time}</div>
         </div>
        </div>
      )
   }else{
    return <div>Loading.....</div>
   }

 
  
 }

}


export default App;