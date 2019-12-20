export default (state=[],action)=>{
    switch(action.type){
        case 'ELEMENT_DETAILS':
            return [...state, action.payload];
        default:
            return state
    }
}