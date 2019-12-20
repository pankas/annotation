export default (state=[],action)=>{
    switch(action.type){
        case 'FETCH_MAP_PATH':
            return action.payload;
        default: 
            return state;
    }
}
