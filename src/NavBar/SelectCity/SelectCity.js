import React, { Component } from 'react';
import "./SelectCity.css";

class SelectCity extends Component {
    constructor(){
        super();
        this.state = {
            currentSelectedCity: 'All cities',
            isMenuShown: false,
        }
    }

    toggleMenu(){
        this.setState({
            isMenuShown: !this.state.isMenuShown
        })
    }

    handleSelectCity(city){
        this.setState({
            currentSelectedCity: city
        })

        this.toggleMenu()
    }

    renderSelectCityMenu(){
        if(this.state.isMenuShown){
            return(
                <div className="selectCityOptions">
                    <div className="cityOption city_allCities" onClick={()=> this.handleSelectCity('All cities')}>All cities</div>
                    <div className="cityOption city_sanFrancisco" onClick={()=> this.handleSelectCity('San Francisco')} >San Francisco</div>
                    <div className="cityOption city_berkeley" onClick={()=> this.handleSelectCity('Berkeley')}>Berkeley</div>
                    <div className="cityOption city_oakland" onClick={()=> this.handleSelectCity('Oakland')}>Oakland</div>
                    <div className="cityOption city_sanBruno" onClick={()=> this.handleSelectCity('San Bruno')}>San Bruno</div>
                    <div className="cityOption city_burlingame" onClick={()=> this.handleSelectCity('Burlingame')}>Burlingame</div>
                </div>
            )
        }
        return null
    }

    render() {
        return(
            <div className="selectCityMenu" onClick={()=> this.toggleMenu()}>
                <p className="displayCity_label">Displaying results in: </p> <div className="currentCity" >{this.state.currentSelectedCity}</div>
                {this.renderSelectCityMenu()}
            </div>
        )
    }
}

export default SelectCity;