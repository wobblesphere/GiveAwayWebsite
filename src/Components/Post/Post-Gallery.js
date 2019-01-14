import React, { Component } from 'react';
import "./Post-Gallery.css";
import { connect } from 'react-redux';
import Actions from "../../Actions/actions";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFeather, faPencilAlt, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Constants from '../../constants';
library.add(faMapMarkerAlt, faFeather, faPencilAlt, faAngleLeft, faAngleRight) 

class PostGallery extends Component {
    renderEditIcon(){
        if (!this.props.editable) {
            return null
        }
        return <FontAwesomeIcon icon="pencil-alt" className="edit_icon" />
    }

    handleClickedImage(currentViewingImage, postImages){
        this.props.toggleModal('photos', true);
        this.props.handleClickedImage({currentViewingImage, postImages});
    }

    handleImages(){
        if (!this.props.images) {
            return null
        }
        const images = [];
        let index = 1;
        for (let image of this.props.images) {
                images.push(
                    <img className="image" 
                            src={image} 
                            alt=" " 
                            key={image + this.props.name + index}
                            onClick={ ()=> this.handleClickedImage(image, this.props.images) }>
                    </img>
                )
                index++;
        }
        return images
    }

    renderImages(){
        if (this.props.images.length === 0) {
            return null 
        }
        if (this.props.images.length > Constants.NONE_SCROLLABLE_THUMBS) {
            return (
                <div className="post_details postImages">
                    <FontAwesomeIcon className="icon_angleLeft" icon="angle-left" />
                    <div className="imageWrapper">
                        <div className="images">
                            {this.handleImages()}
                        </div>
                    </div>
                    <FontAwesomeIcon className="icon_angleRight" icon="angle-right" /> 
                </div>
            )
        } else {
            return (
                <div className="post_details postImages">
                    <div className="imageWrapper">
                        <div className="images">
                            {this.handleImages()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderNote() {
        if (!this.props.description) {
            return null
        }
        return (
            <div className="post_details post_note">
                {this.props.description}
            </div>
        )
    }

    render(){
        return(
            <div className="post">
                <div className="post_details post_name">
                    <FontAwesomeIcon icon="feather" className="post_name_icon"/>
                    {this.props.name}
                </div>
                {this.renderImages()}
                <div className="post_details post_address">
                   <FontAwesomeIcon icon="map-marker-alt" className="post_address_icon"/> 
                   {this.props.address}
                </div>
                {this.renderNote()}
                <div className="post_details post_date">
                    {this.props.date}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: (type, toggle) => {
            dispatch(Actions.toggleModal(type, toggle));
        },
        handleClickedImage: ({currentViewingImage, postImages}) => {
            dispatch(Actions.handleClickedImage({currentViewingImage, postImages}))
        }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostGallery)
