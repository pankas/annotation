export default(state=[],action)=>{
    switch(action.type){
        case 'FETCH_MAPS_DATA':
            return [...state,action.payload];
        default:
            return state;
    }
}