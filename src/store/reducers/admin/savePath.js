export default(state=[],action)=>{
    switch(action.type){
        case 'SAVE_PATH':
            return [...state,action.payload];
        default:
            return state;
    }
}