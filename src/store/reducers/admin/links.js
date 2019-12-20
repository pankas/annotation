export default (state=[],action)=>{
    switch(action.type){
        case 'LINKS':
            return [...state, action.payload];
        default:
            return state
    }
}