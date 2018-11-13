function isSearchBoxOnFocus(toggle) {
    return {
        type: 'SEARCH_BOX_FOCUS',
        data: toggle,
    }
}

function changeDisplayStyle(style) {
    return {
        type: "CHANGE_DISPLAY_STYLE",
        data: style,
    }
}

function toggleModal_zipcode(toggle){
    return {
        type: 'TOGGLE_MODAL',
        data: {'modalType': 'isModal_zipcode_shown', 'isOn': toggle},
    }
}

function toggleModal_post(toggle) {
    return {
        type: 'TOGGLE_MODAL',
        data: {'modalType': 'isModal_post_shown', 'isOn': toggle},
    }
}

function toggleModal_signIn(toggle) {
    return {
        type: 'TOGGLE_MODAL',
        data: {'modalType': 'isModal_signIn_shown', 'isOn': toggle},
    }
}

function updateUserLocation(zipcode){
    return {
        type: 'UPDATE_USER_LOCATION',
        data: zipcode,
    }
}

function updateClickedPost(postInfo){
    return {
        type: 'UPDATE_CLICKED_POST',
        data: postInfo,
    }
}


export default {
    isSearchBoxOnFocus,
    changeDisplayStyle,
    toggleModal_zipcode,
    toggleModal_post,
    toggleModal_signIn,
    updateUserLocation,
    updateClickedPost,
}