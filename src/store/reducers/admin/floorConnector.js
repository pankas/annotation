export default (state=[],action)=>{
    switch(action.type){
        case 'FLOOR_CONNECTOR':
            return action.payload;
        default:
            return state
    }
}