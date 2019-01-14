import React, { Component } from 'react';
import "./NavBar.css";
import { connect } from 'react-redux';
import Actions from '../../Actions/actions.js';
import Utils from "../../utils.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTh, faThList, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faHeart, faTh, faThList, faMapMarkedAlt);

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            displayHeartOnButton: false,
        }
    }

    toggleDisplayHeartOnButton() {
        this.setState({
            displayHeartOnButton: !this.state.displayHeartOnButton
        })
    }

    newFormButtonLabel() {
        if (!this.state.displayHeartOnButton) {
            return null
        } 
        return <FontAwesomeIcon icon="heart" className="icon_heart fadeInHeart"></FontAwesomeIcon>
    }

    renderNewFormButton() {
        return (
            <div className="addNewFormButton"
                onMouseEnter={()=>this.toggleDisplayHeartOnButton()}
                onMouseLeave={()=>this.toggleDisplayHeartOnButton()}>
                <a href="/newGiveAway">
                    Give {this.newFormButtonLabel()}
                </a>
            </div>
        )
    }

    getActiveClassName(style){
        if (this.props.currentStyle === style) {
            return "activeStyle"
        }
        return ""
    }

    renderStyleButtons() {
        return (
            <div className="styleBar">
                <div className={`display_map styleIcon ${this.getActiveClassName('Map')}`}
                    onClick = {()=>{this.props.changeDisplayStyle('Map')}}>
                    <FontAwesomeIcon icon="map-marked-alt" className="icon_map"></FontAwesomeIcon>
                </div>
                <div className= {`display_list styleIcon ${this.getActiveClassName('List')}`}
                    onClick = {()=>{this.props.changeDisplayStyle('List')}}>
                    <FontAwesomeIcon icon="th-list" className="icon_list"></FontAwesomeIcon>
                </div>
                <div className={`display_gallery styleIcon ${this.getActiveClassName('Gallery')}`}
                    onClick = {()=>{this.props.changeDisplayStyle('Gallery')}}>
                    <FontAwesomeIcon icon="th" className="icon_gallery"></FontAwesomeIcon>
                </div>
            </div>
        )
    }
    render() {
        return(
            <div className="navBar">
                {this.renderNewFormButton()}
                {this.renderStyleButtons()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        currentStyle: Utils.getDisplayStyle(state)
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (type, toggle) => {
            dispatch(Actions.toggleModal(type, toggle));
        },
        changeDisplayStyle: (style)=> dispatch(Actions.changeDisplayStyle(style))
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)