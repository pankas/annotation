export default (state=[],action)=>{
    switch(action.type){
        case 'FORGOT_PASS':
            return action.payload;
        default:
            return state
    }
}