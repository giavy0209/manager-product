const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
const CHANGE_CURRENT_URL = 'CHANGE_CURRENT_URL';
const CHANGE_LIST_PRODUCT = 'CHANGE_LIST_PRODUCT';
function actChangeUserData(userData){
    return {
        type: CHANGE_USER_DATA,
        payload: {...userData}
    }
}

function actChangeCurrentUrl(url){
    return {
        type: CHANGE_CURRENT_URL,
        payload: {url}
    }
}

function actChangeListProduct(listProduct){
    return {
        type: CHANGE_LIST_PRODUCT,
        payload: {listProduct}
    }
}

export {
    CHANGE_USER_DATA,
    actChangeUserData,
    CHANGE_CURRENT_URL,
    actChangeCurrentUrl,
    CHANGE_LIST_PRODUCT,
    actChangeListProduct,
}