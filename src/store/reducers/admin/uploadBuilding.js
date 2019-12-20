export default (state=[],action)=>{
    switch(action.type){
        case 'BUILDING':
            return action.payload;
        default:
            return state
    }
}