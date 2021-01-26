import { CHANGE_BG } from './actionTypes'
export default {
  [CHANGE_BG](state,data){
    state.isLight=data
  }
}