export default (state=[],action)=>{
    switch(action.type){
        case 'MAPS_UPLOAD':
            return action.payload;
        default:
            return state
    }
}