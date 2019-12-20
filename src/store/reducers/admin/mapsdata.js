export default(state=[],action)=>{
    switch(action.type){
        case 'MAPS_DATA':
            return [...state,action.payload];
        default:
            return state;
    }
}