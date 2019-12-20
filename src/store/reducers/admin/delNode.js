export default (state=[],action)=>{
    switch(action.type){
        case 'DELETE_NODE':
            return action.payload;
        default:
            return state
    }
}