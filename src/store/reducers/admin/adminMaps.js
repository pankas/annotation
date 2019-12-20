export default (state=[],action)=>{
    switch(action.type){
        case 'ADMIN_MAPS_DATA':
            return action.payload;
        default:
            return state
    }
}