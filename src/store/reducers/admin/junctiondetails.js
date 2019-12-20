export default (state=[],action)=>{
    switch(action.type){
        case 'JUNCTION_DETAILS':
        let i = state.find(item => item.x === action.payload.x && item.y === action.payload.y)
            if(i){
                return state;
            }
            return [...state, action.payload];
        case "UPDATE_JUNCTION":
            let stateCopy = JSON.parse(JSON.stringify(state));
            let j = stateCopy.findIndex(item => item.x === action.x && item.y === action.y);
            stateCopy[j] = {...stateCopy[j],...action.payload}
            return stateCopy
        default: 
            return state;
    }
}
