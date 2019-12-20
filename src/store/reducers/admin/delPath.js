export default (state=[],action)=>{
    switch(action.type){
        case 'DELETE_PATH':
            return action.payload;
        default:
            return state
    }
}