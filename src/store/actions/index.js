import axios from 'axios';
import config from '../../config';
import {  } from '../../store/actions/index';

export const login = (loginData,next)=>async (dispatch)=>{
    console.log("config login",config.login)
    const response = await axios.post(config.login,loginData);
    const loginResponse = response.data;
    // let username = loginResponse.firstname  + loginResponse.lastname
    localStorage.setItem('username',loginResponse.username);
    sessionStorage.setItem('isAuthenticated',true)
    dispatch({type:'LOGIN',payload:loginResponse})
    next()
}

export const signup = (signupData,next)=> async (dispatch)=>{
    const response = await axios.post(config.signup,signupData);
    const signupResponse = response.data;
    dispatch({type:'SIGNUP',payload: signupResponse})
    next()
}

export const forgotPass = (email,next)=> async (dispatch)=>{
    const response = await axios.post(config.forgotPass,email);
    const fgRes = response.data;
    dispatch({type:'FORGOT_PASS',payload: fgRes})
    next()
}

export const adminDetails = (username)=> async (dispatch)=>{
    const response = await axios.get(`${config.adminDetails}${username}`);
    const getDetails = response.data;
    dispatch({type:'GET_DETAILS',payload:getDetails})
}

export const buildingList = (username,id)=> async (dispatch)=>{
    const response = await axios.get(`${config.buildingList}${username}/${id}`);
    const getDetails = response.data;
    dispatch({type:'BUILDING_LIST',payload:getDetails})
}

export const floorList = (username,name,next)=> async (dispatch)=>{
    const response = await axios.get(`${config.floorList}${username}/:${name}`);
    const getDetails = response.data;
    let hashMap = []
    if(getDetails.floor !== undefined){
        for(let i = 0;i < getDetails.floor.length;i++){
            hashMap.push({buildingName:getDetails.buildingName,floor:getDetails.floor[i],fileName:getDetails.fileName[i]})
        }
    }
    dispatch({type:'FLOOR_LIST',payload:hashMap})
    next();
}

export const getAllElements = (uname,cb)=> async (dispatch)=>{
    let building = localStorage.getItem('buildingName');
    let floor = localStorage.getItem('floor');
    localStorage.setItem('username',uname);
    const response = await axios.get(`${config.getAllElem}${uname}/${building}/${floor}`);
    const getDetails = response.data;
    dispatch({type:'ALL_ELEMENTS',payload:getDetails})
    cb()
}

export const getFconnector = (uname,bName,floor,cb)=> async (dispatch)=>{
    localStorage.setItem('username',uname);
    const response = await axios.get(`${config.getAllElem}${uname}/${bName}/${floor}`);
    const getDetails = response.data;
    dispatch({type:'FLOOR_CONNECTOR',payload:getDetails})
    cb()
}

export const imgDetails = (buildingname,floor,file)=> async  (dispatch)=>{
    const response = await axios.get(`${config.imgDetails}${buildingname}/${floor}/${file}`)
    const pathResponse = response.data;
    dispatch({type:'FETCH_IMAGE',payload: pathResponse});
}

export const uploadMap = (imgData,cb)=> async (dispatch)=>{
    const response = await axios.post(config.uploadMap,imgData);
    const imgResponse =  response.data;
    dispatch({type:'MAPS_UPLOAD',payload:imgResponse})
    cb()
}

export const submitMap = (mapsData,next)=> async (dispatch)=>{
    const response = await axios.post(config.createFloor,mapsData);
    const mapsDataResponse = response.data;
    let err = Object.keys(mapsDataResponse)
    if(err[0] === `error`){
        let arr = [mapsDataResponse];
    dispatch({type:'ADMIN_MAPS_DATA',payload:arr})
    next()  

    }else{
        let floorList = mapsDataResponse.floor;
        let cFloor = floorList[floorList.length - 1];
        let fileName = mapsDataResponse.fileName;
        let cFile = fileName[fileName.length - 1]
        let cData = {cFloor: cFloor, cFile: cFile}
        dispatch({type:'ADMIN_MAPS_DATA',payload:cData})
        next()  
    }
}

export const createBuilding = (data,next)=>async(dispatch)=>{
    const response = await axios.post(config.createBuilding,data);
    const buildDataResponse = response.data;
    dispatch({type:'BUILDING',payload:buildDataResponse})
    next()
}

export const fetchBuildingList = ()=>{
    return async (dispatch)=>{
        const response = await axios.get('http://localhost:5000/wayfinding/buildings');
        dispatch({ type:'FETCH_BUILDING_LIST', payload: response.data })
    };
};

export const fetchMapsData = (query,next)=> async (dispatch) =>{
    const response = await axios.post(`http://localhost:5000/wayfinding/buildings`,query)
    const newResponse = response.data
    dispatch({type:'FETCH_MAPS_DATA',payload:newResponse})
    next();
}

export const fetchPath = (pathData,next)=> async  (dispatch)=>{
    const response = await axios.post(`http://localhost:5000/wayfinding/getpath`,pathData)
    const pathResponse = response.data;
    dispatch({type:'FETCH_MAP_PATH',payload: pathResponse})
    next();
}


export const modalState = (value)=>{
    return{
        type:'MODAL',
        payload: value
    }
}

export const mapsdata = (mapsData,next)=> async (dispatch)=>{
    const response = await axios.post('http://localhost:5000/wayfinding/mapsdata',mapsData);
    const   mapsdataResponse = response.data;
    dispatch({type:'MAPS_DATA',payload:mapsdataResponse})
}

export const junctionCoordinates = (coordinates)=>{
    return{
        type:'COORDINATES',
        payload: coordinates
    };
};

export const junctionDetails = (details={})=>{
        return{
            type:'JUNCTION_DETAILS',
            payload: details
        }
}

export function updateJunction(x, y, details){
    return{
        type:"UPDATE_JUNCTION",
        payload: details,
        x,
        y
    }
}

export const savePath = (pathData,next)=> async (dispatch)=>{
    const response = await axios.post(config.savePath,pathData);
    const responseData = response.data;
    dispatch({type:'SAVE_PATH',payload:responseData})
    next();
}

export const elementDetails = (element)=>{
    return{
        type:'ELEMENT_DETAILS',
        payload: element
    }   
}

export const links = (link = {})=>{
    return{
        type:'LINKS',
        payload: link
    }   
}

export const clearPoints = (bool=false)=>{
    return{
        type: 'POINTS_CLEAR',
        payload: bool
    }
}

export const delNode = (delNode,next)=>async (dispatch)=>{
    const response = await axios.post(config.delNode,delNode);
    const responseData = response.data;
    dispatch({type:'DELETE_NODE',payload:responseData})
    next()
}

export const delPath = (p1,p2,bname,floor,next)=>async (dispatch)=>{
    let pathNode = [p1,p2,bname,floor]
    const response = await axios.post(config.delPath,pathNode);
    const responseData = response.data;
    dispatch({type:'DELETE_NODE',payload:responseData})
    next()
}

export const delBuild = (bname,cb)=>async (dispatch)=>{
    let data = {bname:bname}
    const response = await axios.post(config.delBuild,data);
    const responseData = response.data;
    dispatch({type:'DELETE_BUILDING',payload:responseData})
    cb()
}

export const delFlr = (bname,flr,cb)=>async (dispatch)=>{
    let data = {bname:bname,flr:flr}
    const response = await axios.post(config.delFlr,data);
    const responseData = response.data;
    dispatch({type:'DELETE_FLOOR',payload:responseData})
    cb()
}

export const connFlr = (data,cb)=>async (dispatch)=>{
    const response = await axios.post(config.flrConn,data);
    const responseData = response.data;
    dispatch({type:'CONNECT_FLOOR',payload:responseData})
    cb()
}