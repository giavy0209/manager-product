const CHANGE_USER_DATA = 'CHANGE_USER_DATA';
const CHANGE_CURRENT_URL = 'CHANGE_CURRENT_URL';
const CHANGE_LIST_PRODUCT = 'CHANGE_LIST_PRODUCT';
const CHANGE_LIST_CATEGORY = 'CHANGE_LIST_CATEGORY';
const CHANGE_LIST_USER = 'CHANGE_LIST_USER';
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

function actChangeListCategory(listCategory){
    return {
        type: CHANGE_LIST_USER,
        payload: {listCategory}
    }
}

function actChangeListUser(listUser){
    return {
        type: CHANGE_LIST_USER,
        payload: {listUser}
    }
}

export {
    CHANGE_USER_DATA,
    actChangeUserData,
    CHANGE_CURRENT_URL,
    actChangeCurrentUrl,
    CHANGE_LIST_PRODUCT,
    actChangeListProduct,
    CHANGE_LIST_CATEGORY,
    actChangeListCategory,
    CHANGE_LIST_USER,
    actChangeListUser,
}