export default (state=[],action)=>{
    switch(action.type){
        case "UPDATE_JUNCTION":
            let stateCopy = JSON.parse(JSON.stringify(state));
            let j = stateCopy.findIndex(item => item.x === action.x && item.y === action.y);
            stateCopy[j] = {...stateCopy[j],...action.payload}
            return stateCopy
        default: 
            return state;
    }
}
