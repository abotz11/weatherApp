import React from 'react';
import './App.css';
import Weather from './Weather';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      city:"",
      picUrl:"",
    };
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) =>{
    e.preventDefault();
    var cityName = document.getElementById("addInput").value;
    this.setState({city: cityName});
  }

  componentDidMount() {
    const key = 'rJpFA71VGRqlilGAUyTUffsNVJMTnzqL';
    const ids = "4N1FZFE5AGO3qrUGkw";
    const url = `https://api.giphy.com/v1/gifs?ids=${ids}&api_key=${key}`;  
    console.log(url)
    axios.get(url)
        .then((res) => {
            if (res.status === 200){
              this.setState({picUrl: (res.data.data[0].images.downsized.url)})
          }
    });
  }


  render(){

    const {city} = this.state;
  
    return (
      <div className="App">
        <div>
          <img src={this.state.picUrl}/>
        </div>
        <div className="search-bar">
          <input type="text" className="input" id="addInput" placeholder="London"/>
          <button onClick={this.handleClick}>Search</button>
        </div>
        <Weather city={city}/>
      </div>
    );
  }
}

export default App;
