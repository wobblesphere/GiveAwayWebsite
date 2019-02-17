import React, { Component } from 'react';
import "./UserAccountPage.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { connect } from 'react-redux';
import Utils from '../../utils';
import Actions from '../../Actions/actions.js';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserCircle, faCopy 
        , faCog, faComment, faHeart
        , faTh, faThList, faSearch
        ,faEdit, faHome, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
library.add(faArrowLeft, faUserCircle, faCopy, faCog
            , faComment, faHeart, faTh, faThList
            , faSearch,faEdit, faHome, faTrashAlt) 

class UserAccountPage extends Component {
    renderAccountPageNav() {
        return (
            <div className="accountPageNav">
                <a href="/"className="userAccount-homeButton">
                    <div className="account-home">
                        <FontAwesomeIcon icon="arrow-left" className="icon_leftArrow" />
                        <FontAwesomeIcon icon="home" className="accountIcon-home" />
                    </div>
                </a>
                <div className="accountPageNav-user">
                    <FontAwesomeIcon icon="user-circle" className="accountPageIcon-userCircle" />
                    <div className="accountPageNav-username">
                        {this.props.userInfo['username']}
                    </div>
                </div>
                <div className="accountPageNav-SearchBox">
                    <input className="postSearchBox"></input>
                    <FontAwesomeIcon icon="search" className="accountPageIcon-search"/>
                </div>
            </div>
        )
    }

    renderPostNavigationBar() {
        return(
            <div className="accountPostNavBar">
                <div className="accountPageNav-Header">
                    My posts
                </div>
                <div className="accountPostNavBar-styleMenu">
                    <div className="accountPostNavbar-list">
                        <FontAwesomeIcon icon="th-list" className="account-iconList"/>
                    </div>
                    <div className="accountPostBar-gallery">
                        <FontAwesomeIcon icon="th" className="account-iconGallery"/>
                    </div>
                </div>
                <div className="accountPostNavBar-managePostMenu">
                    <div className="accountPostNavBar-editButton">
                        <FontAwesomeIcon icon='edit' className="accountIcon-editIcon"/>
                    </div>
                    <div className="accountPostNavBar-deleteButton">
                        <FontAwesomeIcon icon='trash-alt' className="accountIcon-trashIcon"/>
                    </div>
                </div>
            </div>
        )
    }

    renderPostBoard() {
        return(
            <div className="accountPage-postBoardWrapper">
            </div>
        )
    }

    render() {
        return (
            <BrowserRouter>
            <div className="userAccountWrapper">
                {this.renderAccountPageNav()}
                {this.renderPostNavigationBar()}
            </div>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: Utils.getUserInfo(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

 export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAccountPage)
