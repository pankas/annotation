let config = {};

if(process.env.NODE_ENV==="development"){   
    // config.login = "http://10.17.50.43:5000/wayfinding/login"
    // config.signup = "http://10.17.50.43:5000/wayfinding/register"
    // config.adminDetails = "http://10.17.50.43:5000/wayfinding/users/"
    // config.buildingList = "http://10.17.50.43:5000/wayfinding/buildingList/"
    // config.getDetails  = "http://10.17.50.43:5000/wayfinding/mapsdata:"
    // config.imgUrl = "http://10.17.50.43:5000/public/"
    // config.imgDetails = "http://10.17.50.43:5000/wayfinding/mapsdata/"
    // config.uploadMap = "http://10.17.50.43:5000/wayfinding/saveimage"
    // config.submitMap = "http://10.17.50.43:5000/wayfinding/mapsdata"
    // config.createBuilding = "http://10.17.50.43:5000/wayfinding/createBuilding"
    // config.createFloor = "http://10.17.50.43:5000/wayfinding/createFloor"
    // config.buildingList = "http://10.17.50.43:5000/wayfinding/buildingList/"
    // config.floorList = "http://10.17.50.43:5000/wayfinding/floorList/"
    // config.editImg = "http://10.17.50.43:5000"
    // config.savePath = "http://10.17.50.43:5000/wayfinding/savepath"
    // config.getAllElem = "http://10.17.50.43:5000/wayfinding/getAllElements/"
    // config.delNode = "http://10.17.50.43:5000/wayfinding/delNode/"
    // config.delPath = "http://10.17.50.43:5000/wayfinding/delPath/"
    // config.delBuild = "http://10.17.50.43:5000/wayfinding/delBuild/"
    // config.delFlr = "http://10.17.50.43:5000/wayfinding/delFlr/"
    // config.forgotPass = "http://10.17.50.43:5000/wayfinding/forgotPass"
    // config.flrConn = "http://10.17.50.43:5000/wayfinding/flrConn/"
    // config.redirect = 'http://localhost:3000/blist'

    // Id: 435048230978-7ruqjnl9un1hpi19qsdogbacffftgpam.apps.googleusercontent.com
    // Key: 7lQwbCXZMeFIiQHHn2DxQBlF
    // Client Id:;; 1038424631259-ir777bd4upap5u0rbm1h7f2o9g0e43jk.apps.googleusercontent.com
    // Client Secret:;;; pY6eGQYEHZhR98_mjxqdVHut
    // Refresh Token:;;; 1//04xS1IX4ObBMUCgYIARAAGAQSNwF-L9Ir4vfaOsvL_-lRCFClvri44D7gXX74NXHmzaB_IrxMDrt6f_4aZdl18FO4JSqmQBfcI_U
    // Access token:;;; ya29.Il-vB2PDalLkgAxB1fao_foUqdg9zdGE7ITArBZ0WqaF-cKSuAxvp2EtbY698_bQrYhdcY_Iu3wgsPNRe6guusW0NEMEHr_i-T4u8t9m5NGCVyO4HH1oNYtWHl1tGrR94g
        config.login = "http://localhost:5000/wayfinding/login"
        config.googleLogin = "http://localhost:5000/wayfinding/google-login"
        config.signup = "http://localhost:5000/wayfinding/register"
        config.adminDetails = "http://localhost:5000/wayfinding/users/"
        config.buildingList = "http://localhost:5000/wayfinding/buildingList/"
        config.getDetails  = "http://localhost:5000/wayfinding/mapsdata:"
        config.imgUrl = "http://localhost:5000/public/"
        config.imgDetails = "http://localhost:5000/wayfinding/mapsdata/"
        config.uploadMap = "http://localhost:5000/wayfinding/saveimage"
        config.submitMap = "http://localhost:5000/wayfinding/mapsdata"
        config.createBuilding = "http://localhost:5000/wayfinding/createBuilding"
        config.createFloor = "http://localhost:5000/wayfinding/createFloor"
        config.buildingList = "http://localhost:5000/wayfinding/buildingList/"
        config.floorList = "http://localhost:5000/wayfinding/floorList/"
        config.editImg = "http://localhost:5000"
        config.savePath = "http://localhost:5000/wayfinding/savepath"
        config.getAllElem = "http://localhost:5000/wayfinding/getAllElements/"
        config.delNode = "http://localhost:5000/wayfinding/delNode/"
        config.delPath = "http://localhost:5000/wayfinding/delPath/"
        config.delBuild = "http://localhost:5000/wayfinding/delBuild/"
        config.delFlr = "http://localhost:5000/wayfinding/delFlr/"
        config.forgotPass = "http://localhost:5000/wayfinding/forgotPass"
        config.flrConn = "http://localhost:5000/wayfinding/flrConn/"
        config.redirect = 'http://localhost:3000/blist'
        config.clientId = "274858204706-gcvnlri1mapour0td7nnvvbo0pvf3c0v.apps.googleusercontent.com"
        config.clientSecret = "9tQ-9U2pLzCLvI9HnUinPgAG"
    }
else
{
    // config.login = "https://10.17.15.43:5000/wayfinding/login"
    config.login = "https://inclunav.aiims.edu/node/wayfinding/login"
    config.signup = "https://inclunav.aiims.edu/node/wayfinding/register"
    config.adminDetails = "https://inclunav.aiims.edu/node/wayfinding/users/"
    config.buildingList = "https://inclunav.aiims.edu/node/wayfinding/buildingList/"
    config.getDetails  = "https://inclunav.aiims.edu/node/wayfinding/mapsdata:"
    config.imgUrl = "https://inclunav.aiims.edu/node/public/"
    config.imgDetails = "https://inclunav.aiims.edu/node/wayfinding/mapsdata/"
    config.uploadMap = "https://inclunav.aiims.edu/node/wayfinding/saveimage"
    config.submitMap = "https://inclunav.aiims.edu/node/wayfinding/mapsdata"
    config.createBuilding = "https://inclunav.aiims.edu/node/wayfinding/createBuilding"
    config.createFloor = "https://inclunav.aiims.edu/node/wayfinding/createFloor"
    config.buildingList = "https://inclunav.aiims.edu/node/wayfinding/buildingList/"
    config.floorList = "https://inclunav.aiims.edu/node/wayfinding/floorList/"
    config.editImg = "https://inclunav.aiims.edu/node/wayfinding"
    config.savePath = "https://inclunav.aiims.edu/node/wayfinding/savepath"
    config.getAllElem = "https://inclunav.aiims.edu/node/wayfinding/getAllElments/"
    config.getAllElem = "https://inclunav.aiims.edu/node/wayfinding//delNode/"
    config.delNode = "https://inclunav.aiims.edu/node/wayfinding/delNode/"
    config.delPath = "https://inclunav.aiims.edu/node/wayfinding/delPath/"
    config.delBuild = "https://inclunav.aiims.edu/node/wayfinding/delBuild/"
    config.delFlr = "https://inclunav.aiims.edu/node/wayfinding/delFlr/"
    config.forgotPass = "https://inclunav.aiims.edu/node/wayfinding/forgotPass"
    config.redirect = 'https://inclunav.aiims.edu/navigation/#/blist'
    config.clientId = "992575453704-jm7u99iov1bm9qlpjv1ls2n8j93rb8l5.apps.googleusercontent.com"
    config.clientSecret = "gbzfHXRbaUnCBx8wrMSuU2H0"
}

export default config;