import {combineReducers} from 'redux';
import decrypt from './users/decrypt';
import modal from './admin/modal';
import mapsData from './admin/mapsdata';
import uploadImg from './admin/upload_img';
import adminAuth from './admin/adminAuth';
import adminMaps from './admin/adminMaps';
// import coordinates from './users/coordinates';
import junctionDetails from './admin/junctiondetails';
import adminDetails from './admin/adminDetails';
import savePath from './admin/savePath';
import getDetails from './admin/adminDetails';
import mapDetails from './admin/getDetails';
import imgDetails from './admin/imgDetails';
import updateJunction from './admin/updateJunction';
import elementDetails from './admin/elementDetails';
import links from './admin/links';
import clearPoints from './admin/clearPoints';
import uploadBuilding from './admin/uploadBuilding';
import buildingList from './admin/buildingList';
import floorList from './admin/floorList';
import getAllElements from './admin/getAllElements';
import delNode from './admin/delNode';
import delPath from './admin/delPath';
import delBuild from './admin/delBuild';
import delFlr from './admin/delFloor';
import forgotPass from './admin/forgotPass';
import floorConnector from './admin/floorConnector';
import flrConn from './admin/flrConn';

export default combineReducers({
    decrypt: decrypt,
    modal:modal,
    mapsData:  mapsData,
    uploadImg: uploadImg,
    users: adminAuth,
    adminMaps: adminMaps,
    // coordinates: coordinates,
    junctionDetails: junctionDetails,
    adminDetails: adminDetails,
    savePath: savePath,
    getDetails: getDetails,
    mapDetails: mapDetails,
    imgDetails: imgDetails,
    elementDetails: elementDetails,
    links: links,
    clearPoints: clearPoints,
    uploadBuilding: uploadBuilding,
    buildingList: buildingList,
    floorList: floorList,
    getAllElem : getAllElements,
    delNode: delNode,
    delPath: delPath,
    delBuild: delBuild,
    delFlr: delFlr,
    fgPass: forgotPass,
    fConn:floorConnector,
    flrConn: flrConn
    // updateJunction: updateJunction
});