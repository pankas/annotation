export default (state=[],action)=>{
    switch(action.type){
        case 'DELETE_FLOOR':
            return action.payload;
        default:
            return state
    }
}