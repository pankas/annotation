export default (state=[],action)=>{
    switch(action.type){
        case 'DELETE_BUILDING':
            return action.payload;
        default:
            return state
    }
}