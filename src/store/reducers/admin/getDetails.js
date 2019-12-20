export default (state=[],action)=>{
    switch(action.type){
        case 'GET_DETAILS_MAP':
            return action.payload;
        default:
            return state
    }
}