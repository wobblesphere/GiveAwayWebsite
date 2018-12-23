import { all, call, put, take, select } from 'redux-saga/effects'
import axios from 'axios';
import Actions from '../Actions/actions.js';
import Constants from '../constants'
// import postcss = require('postcss');


// handle new posts
function* toggleModal_newForm(){
  yield put(Actions.toggleModal(Constants.MODAL_TYPES['MODAL_NEWFORM'], false))
}

function* sendPostToServer(action){
  yield call(axios, {
    method: 'POST',
    url: `${Constants.HOSTNAME}posts`,
    data: action.data,
    config: { headers: {'Content-Type':'application/json'}}
  })
}

export function* watchSubmitPost() {
  // upload post to server and hide new form modal
  while (true) {
    const action = yield take('ADD_NEW_POST');
    yield call(toggleModal_newForm);
    yield call(sendPostToServer, action);
  }
}

function* getPosts(){
  const response = yield call(axios.get, `${Constants.HOSTNAME}posts?city=All cities`)
  yield put(Actions.getPosts(response.data))
}

// handle sending posts from server to frontehd when app mounts
export function* watchAppMounted() {
  while (true) {
      yield take('APP_MOUNTED');
      yield call(getPosts);
  }
}

// handle update city and refresh the page with filtered posts
function* sendSelectedCityToServer(action) {
  const response = yield call(axios, {
      method: 'POST',
      url: `${Constants.HOSTNAME}city`,
      data: {"city": action.data},
      config: { headers: {'Content-Type':'application/json'}}
    })
   yield put(Actions.getPosts(response.data))
}

export function* watchSelectCity() {
  while (true) {
    const action = yield take('UPDATE_CITY');
    yield call(sendSelectedCityToServer, action)
  }
}

function* filterPosts(selections) {
  console.log('at filtered posts', selections);
}

export function getSelectedCity(state){
  return state.SideBar.get('currentSelectedCity');
} 

export function getCategories(state) {
  return state.SideBar.get('currentSelectedCategories').toJS();
}

export function* watchSelectCategory() {
  while (true) {
    const action = yield take('UPDATE_CATEGORY');
    let selectedCity = yield select(getSelectedCity);
    let selectedCategories = yield select(getCategories);
    let req = {
      'city': selectedCity,
      'categories': selectedCategories,
    }

    yield call(filterPosts, req);
  }
}
export default function* rootSaga() {
  yield all([
    watchSubmitPost(),
    watchSelectCity(),
    watchAppMounted(),
    watchSelectCategory(),
  ])
}