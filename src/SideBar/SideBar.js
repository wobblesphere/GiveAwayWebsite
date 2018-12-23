import React, { Component } from 'react';
import './SideBar.css';
import { connect } from 'react-redux';
import Constants from '../constants';
import Utils from '../utils';
import Actions from '../Actions/actions.js';



class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            selectedOptions: ['newest'],
            // currentSelectedCategories: ['All categories'],
            // currentSelectedCity: 'All cities',
        }
    }
    renderMilesFromZip() {
        return (
            <div className="milesFromZipContainer">
                <div className="milesFromZipLabel">
                    miles from zipcode
                </div>
                <div className="mileZipInputs">
                    <input className="milesInput" />
                </div>
                <div className="mileZipInputs">
                    <input className="zipCodeInput"/>
                </div>
            </div>
        )
    }


    renderResetButton() {
        return (
            <div className="resetAndUpdate">
                <div className="resetAndUpdate_button resetButton"
                     onClick={ ()=> this.props.resetSideBarSelections()}>
                    reset
                </div>
            </div>
        )
    }

    renderNewestAndHasImageOptions() {
        const extraClassName_newest = this.state.selectedOptions.includes('newest') ?
                'selected' :
                '';
        const extraClassName_hasImages = this.state.selectedOptions.includes('hasImages') ?
                'selected' :
                '';
        return (
            <div className="newestAndHasImageOptionContainer">
                <div className={`option_newest option ${extraClassName_newest}`}>
                    newest
                </div>

                <div className={`option_hasImages option ${extraClassName_hasImages}`}>
                    has images
                </div>
            </div>
        )
    }

    renderCategorizedOptions() {
        const categories = [];
        for (let category of Constants.CATEGORIES) {
            const extraClassName = this.isSelectedCategory(category.name) ?
                'selected' :
                '';
            categories.push(
                <div className= {`option ${category.className} ${extraClassName}`} 
                    key= {category.className}
                    onClick= {()=> this.props.updateCategory(category.name) }>
                    {category.name}
                </div>
            )
        }
        return (
            <div className="categorizedOptionsContainer">
                <div className="categoryLabel">
                    Filter by categories: 
                </div>
                {categories}
            </div>
        )
    }

    isSelectedCity(city) {
        return this.props.currentSelectedCity === city;
    }

    isSelectedCategory(category) {
        return this.props.currentSelectedCategories.indexOf(category) > -1;
    }

    renderCityOptions(){
        const cities = [];
        for (let city of Constants.CITIES) {
            const extraClassName = this.isSelectedCity(city.name) ?
                'selected' :
                '';
            cities.push(
                <div className={`option city_${city.className} ${extraClassName}`} 
                        key={city.name}
                        onClick={()=> this.props.updateCity(city.name)}>
                    {city.name}
                </div>
            )
        }
        return(
            <div className="selectCityOptions" key="options">
                <div className="cityOptionsLabel">Select cities: </div>
                {cities}
            </div>
        )
    }

    render(){
        if(!this.props.sideBarShown){
            return null
        }
        return (
        <div className="sideBarWrapper">
            <div className="sideBarContainer" onMouseLeave={()=> this.props.toggleSideBar()}>
                {this.renderResetButton()}
                {this.renderCityOptions()}
                {this.renderMilesFromZip()}
                {this.renderNewestAndHasImageOptions()}
                {this.renderCategorizedOptions()}
            </div>
        </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        currentSelectedCity: Utils.getCurrentCity(state),
        currentSelectedCategories: Utils.getCurrentSelectedCategories(state),
        sideBarShown: state.SideBar.get('sideBarShown'),
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        updateCity: (city) => {
            dispatch(Actions.updateCity(city))
        },
        toggleSideBar: () => {
            dispatch(Actions.toggleSideBar());
        },
        updateCategory: (category) => {
            dispatch(Actions.updateCategory(category));
        },
        resetSideBarSelections: () => {
            dispatch(Actions.resetSideBarSelections());
        }
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar)