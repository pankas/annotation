export default (state = false,action)=>{
    switch(action.type){
        case 'POINTS_CLEAR':
            return  action.payload;
        default:
            return state
    }
}