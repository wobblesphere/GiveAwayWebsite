import React, { Component } from 'react';
import "./Post-Gallery.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faFeather} from '@fortawesome/free-solid-svg-icons'
library.add(faMapMarkerAlt, faFeather) 

class PostGallery extends Component {
    render(){
        return(
            <div className="post">
                <div className="post_details post_name">
                    <FontAwesomeIcon icon="feather" className="post_name_icon"/>
                    {this.props.name}
                </div>
                <div className="post_details post_date">
                    {this.props.date}
                </div>
                <div className="post_details post_address">
                   <FontAwesomeIcon icon="map-marker-alt" className="post_address_icon"/> 
                   {this.props.address}
                </div>
                <div className="post_details post_note">
                    {this.props.description}
                </div>
            </div>
        )
    }
}

export default PostGallery;
