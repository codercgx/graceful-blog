import { CHANGE_BG } from './actionTypes'
export default {
  [CHANGE_BG](ctx,data){
    ctx.commit(CHANGE_BG,data)
  }
}