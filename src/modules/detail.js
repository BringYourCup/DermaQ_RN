import {handleActions, createAction } from 'redux-actions';
import {fromJS} from 'immutable';
import axios from 'axios';
import { differenceOfArrays } from 'src/modules/utils';
import config from 'src/config';

const GET_PATIENT_DETAIL = 'detail/GET_PATIENT_DETAIL';
const GET_DATE_DETAIL = 'detail/GET_DATE_DETAIL';
const GET_IMAGE_DETAIL = 'detail/GET_IMAGE_DETAIL';

const SET_PATIENT_DETAIL = 'detail/GET_PATIENT_DETAIL';
const SET_PATIENT_DETAIL_ALL = 'detail/GET_PATIENT_DETAIL_ALL';
const SET_PATIENT_DETAIL_INITIAL = 'detail/GET_PATIENT_DETAIL_INITIAL';
const SET_DATE_DETAIL = 'detail/SET_DATE_DETAIL';
const SET_DATE_DETAIL_ALL = 'detail/SET_DATE_DETAIL_ALL';
const SET_DATE_DETAIL_INITIAL = 'detail/SET_DATE_DETAIL_INITIAL';
const SET_IMAGE_DETAIL = 'detail/SET_IMAGE_DETAIL';
const SET_IMAGE_DETAIL_ALL = 'detail/SET_IMAGE_DETAIL_ALL';
const SET_IMAGE_DETAIL_INITIAL = 'detail/SET_IMAGE_DETAIL_INITIAL';
const SET_DETAIL_CONDITION = 'detail/SET_DETAIL_CONDITION';
const SET_ITEM_DETAIL_LIST = 'detail/GET_ITEM_DETAIL_LIST';

export const getPatientDetail = createAction(GET_PATIENT_DETAIL);
export const getDateDetail = createAction(GET_DATE_DETAIL);
export const getImageDetail = createAction(GET_IMAGE_DETAIL);

export const setPatientDetail = createAction(SET_PATIENT_DETAIL);
export const setDateDetail = createAction(SET_DATE_DETAIL);
export const setPatientDetailAll = createAction(SET_PATIENT_DETAIL_ALL);
export const setPatientDetailInitial = createAction(SET_PATIENT_DETAIL_INITIAL);
export const setDateDetailAll = createAction(SET_DATE_DETAIL_ALL);
export const setDateDetailInitial = createAction(SET_DATE_DETAIL_INITIAL)
export const setImageDetail = createAction(SET_IMAGE_DETAIL);
export const setImageDetailAll = createAction(SET_IMAGE_DETAIL_ALL);
export const setImageDetailInitial = createAction(SET_IMAGE_DETAIL_INITIAL)
export const setDetailCondition = createAction(SET_DETAIL_CONDITION);
export const setItemDetailList = createAction(SET_ITEM_DETAIL_LIST);


function getPatientData(token, patient_id) {
    //console.log('getPatient Data patient id : ' + patient_id, + ', token : '+ token);
    return axios.post(config.baseUrl + '/api', {
        "data": {
            "category": "patient",
            "service": "GetPatient",
            "access_token": token,
            "patient": {
                "patient_id": patient_id
            }
        }
    })
}

function getDateData(token, date_id) {
    //console.log('getDate Data date id : ' + date_id, + ', token : '+ token);
    return axios.post(config.baseUrl +'/api', {
        "data": {
            "category": "date",
            "service": "GetDate",
            "access_token": token,
            "date": {
                "date_id": date_id
            }
        }
    })
}

function getImageData(token, image_id_list) {
    //console.log('getImage Data image id : ' + image_id_list, + ', token : '+ token);
    return axios.post(config.baseUrl +'/api', {
        "data": {
            "category": "image",
            "service": "GetImages",
            "access_token": token,
            "image_list": image_id_list,
        }
    })
}

function getItem(token, service) {
    return axios.post(config.baseUrl + '/api', {
        "data": {
            "category": "private",
            "service": service,
            "access_token": token,
        }
    })
}

/* 아이템 조회하는 함수 */
export const getItemData = (token, list_type) => dispatch => {
    let item, service;
    let item_payload = {};
    switch (list_type) {
        case 'ethnicity':
            item = 'ethnicity_item_list'
            service = 'ListEthnicity';
            break;
        case 'country':
            item = 'country_item_list'
            service = 'ListCountry';    
            break;
        case 'skin_type':
            item = 'skin_type_item_list'
            service = 'ListSkin';
            break;
        case 'tag':
            item = 'tag_item_list';
            service = 'ListTag'
            break;
        case 'disease':
            item = 'disease_item_list';
            service = 'ListDisease'
            break;
        default:
            return new Promise(function (resolve, reject) {
                resolve();
            });
            
    }
    return getItem(token, service).then(
        (response) => {
            //console.log('item response : ', response)
            
            if(response.data.data && response.data.data.list){
                item_payload[item] = response.data.data.list;
            }
            dispatch({
                type:SET_ITEM_DETAIL_LIST,
                payload : item_payload
            })
        }
    )
}

/* 아이템 추가하는 함수 */
const addItem = (type, value, service) => {
    const access_info = JSON.parse(sessionStorage.getItem('access_info'));
    
    return axios.post(config.baseUrl + '/api', {
            "data": {
            "category": "private",
            "service": service,
            "access_token": access_info.access_token,
            [type] : value,
            }
    })        
}
const addItemList = (type, item_list, service) => {
    const access_info = JSON.parse(sessionStorage.getItem('access_info'));
    
    return axios.post(config.baseUrl + '/api', {
            "data": {
            "category": "private",
            "service": service,
            "access_token": access_info.access_token,
            [type] : item_list,
            }
    })        
}

export const addItemData = (type, value, valueArray) => dispatch => {
    let service, item;
    if (!value) {
        return Promise.resolve();
    } else if(Array.isArray(value) && value.length === 0 ) {
        return Promise.resolve();
    }
    //console.log('addItemData : ', value, type )
    switch (type) {
        case 'skin':
            service = 'AddSkin'
            item = 'skin_type_item_list'
            break;
        case 'country':
            service = 'AddCountry'
            item = 'country_item_list'
            break;
        case 'ethnicity':
            service = 'AddEthnicity' 
            item = 'ethnicity_item_list'
            break;
        case 'disease':
            service = 'AddDisease'
            item = 'disease_item_list';
            break;
        case 'tag_list':
            service = 'AddTags'
            item = 'tag_item_list';
            break;
        default:
            return Promise.resolve();
    }
    if(service === 'AddTags'){
        let item_list = differenceOfArrays(valueArray, value);
        if(!item_list){
            return Promise.resolve('No need to add Item');
        }
        return addItemList(type, item_list, service).then(
            (response) => {
                dispatch({
                    type : SET_ITEM_DETAIL_LIST,
                    payload : {[item] : response.data.data.list}
                })
                return Promise.resolve(response)
            }
        ).catch(error => {
            return Promise.reject(error)
        })
    } else {
        if(valueArray && valueArray.find(e => {return e === value})){
            return Promise.resolve('No need to add Item');
        }
        return addItem(type, value, service).then(
            (response) => {
                dispatch({
                    type : SET_ITEM_DETAIL_LIST,
                    payload : {[item] : response.data.data.list}
                })
                return Promise.resolve(response)
            }
        ).catch(error => {
            return Promise.reject(error)
        })
    }

}


/* 아이템 지우는 함수 */
const deleteItem = (type, value, service) => {
    const access_info = JSON.parse(sessionStorage.getItem('access_info'));    
    return axios.post(config.baseUrl +'/api', {
            "data": {
                "category": "private",
                "service": service,
                "access_token": access_info.access_token,
                [type] : value,
            }
    })
}

export const deleteItemData = (type, value) => dispatch => {
    let service, item;
    switch (type) {
        case 'skin':
            service = 'DelSkin';
            item = 'skin_type_item_list';
            break;
        case 'country': 
            service = 'DelCountry'
            item = 'country_item_list'
            break;
        case 'ethnicity':
            service = 'DelEthnicity'
            item = 'ethnicity_item_list'
            break;
        case 'tag':
            service = 'DelTag';   
            item = 'tag_item_list'; 
            break;
        case 'disease':
            service = 'DelDisease';    
            item = 'disease_item_list';
            break;
        default:
            return new Promise(function (resolve, reject) {
                resolve();
            });
    }

    return deleteItem(type, value, service).then(
        (response) => {
            dispatch({
                type : SET_ITEM_DETAIL_LIST,
                payload : {[item] : response.data.data.list || []}
            })
            return Promise.resolve(response)
        }
    ).catch(error => {
        return Promise.reject(error)
    })

}

export const getDetailData = (token, id, type) => dispatch => {

    if (type === 'patient') {
        return getPatientData(token, id).then(
            (response) => {
                //console.log('response : getPatient',response)
                dispatch({
                    type: SET_PATIENT_DETAIL_ALL,
                    payload: response.data.data.patient
                })
                dispatch({
                    type: SET_PATIENT_DETAIL_INITIAL,
                    payload: response.data.data.patient
                })
            }
        ).catch(error => {
            console.log('getPatientData error', error);
        })
    } else if( type === 'date') {
        return getDateData(token, id).then(
            (response) => {
                //console.log('response : getDate',response)
                dispatch({
                    type: SET_DATE_DETAIL_ALL,
                    payload: response.data.data.date
                })
                dispatch({
                    type: SET_DATE_DETAIL_INITIAL,
                    payload: response.data.data.date
                })
            }
        ).catch(error => {
            console.log('getDateData error', error);
        })
    } else if( type === 'image') {
        let image_id_list = [];
        id.forEach(item => {
            image_id_list.push({
                "image_id" : item.image_id
            })
        })

        return getImageData(token, image_id_list).then(
            (response) => {
                //console.log('response : getImage',response)
                dispatch({
                    type: SET_IMAGE_DETAIL_ALL,
                    payload: response.data.data.image_list
                })
                dispatch({
                    type: SET_IMAGE_DETAIL_INITIAL,
                    payload: response.data.data.image_list
                })
            }
        ).catch(error => {
            console.log('getImageData error', error);
        })
    }
}

const initialState = fromJS({
    patientDetail: fromJS({
        pid : '',
        first_name : '',
        last_name : '',
        gender : '', /* M or F */
        
        birth_date : null,
        /* birthday는 받을 때는 분리, 보낼 때는 조립해야 한다. */
        /*
        birthDayYear : '',
        birthDayMonth : '',
        birthDayDay : '',
        */
        ethnicity : '',
        skin_type : '',
        skin_cancer_history : '',        /* Y or N */
        family_skin_cancer_history : '',   /* Y or N */
        country : '',
        phone : '',
        description : '',
        isButtonActive : false,
        isSaved : false,
    }),
    patientDetailInitial: {
    }, 
    dateDetail : fromJS({
        visit_date : null,
        image_number : 0,
        note : '',
        type : '',       

        location_list : [],   /* location may be duplicated  so remove dup,*/
        location_print : [],  /* 출력용으로 중복 제거 */

        treatment: '',
        
        tag_list : [],
        isButtonActive : false,
        isSaved : false,

    }),
    dateDetailInitial: {
    }, 
    imageDetail: {
        visit_date : null,
        note : '', 
        type : '', 
        location_list : [], 
        treatment : '',
        tag_list : [],
        isButtonActive : false,
        location3D : null,
        isSaved : false,
        isNeedLoading : false,

    },
    imageDetailInitial: {
    },
    imageDetailList :{

    },
    detailCondition: 'patient',

    itemList: fromJS({
        country_item_list : [],
        ethnicity_item_list : [],
        skin_type_item_list : [],
        tag_item_list : [],
        disease_item_list : [],
    }),
});

export default handleActions({

    [GET_PATIENT_DETAIL]: (state, action) => {
        return state.get('patientDetail');
    },
    [GET_DATE_DETAIL]: (state, action) => {
        return state.get('dateDetail');
    },
    [GET_IMAGE_DETAIL]: (state, action) => {
        return state.get('imageDetail');
    },
    [SET_PATIENT_DETAIL]: (state, action) => {
        //console.log('patient action : ' + JSON.stringify(action.payload));
        let curState = {
            ...state.get('patientDetail').toJS()
        };
        for (let [k,v] of Object.entries(action.payload)) {
            curState[k] = v;
        }
        return state.set('patientDetail', fromJS(curState));
    },
    [SET_ITEM_DETAIL_LIST]: (state, action) => {
        //console.log('patient list action : ' + JSON.stringify(action.payload));
        let curState = {
            ...state.get('itemList').toJS()
        };
        for (let [k,v] of Object.entries(action.payload)) {
            curState[k] = v;
        }
        return state.set('itemList', fromJS(curState))
    },
    [SET_PATIENT_DETAIL_ALL]: (state, action) => {
        //console.log('patient action all : ' + fromJS(action.payload));
        return state.set('patientDetail', fromJS(action.payload));
    },
    [SET_PATIENT_DETAIL_INITIAL]: (state, action) => {
        //console.log('patient action all : ' + fromJS(action.payload));
        let patientDetailOrg = { ...state.get('patientDetail').toJS()};
        return state.set('patientDetailInitial', fromJS(patientDetailOrg));
    },
    [SET_DATE_DETAIL]: (state, action) => {
        //console.log('date action : ' + JSON.stringify(action.payload));
        let curState = {
            ...state.get('dateDetail').toJS()
        };
        for (let [k,v] of Object.entries(action.payload)) {
            curState[k] = v;
        }
        return state.set('dateDetail', fromJS(curState));
    },
    [SET_DATE_DETAIL_ALL]: (state, action) => {
        if(action.payload.image_list && action.payload.image_list.length > 0) {
            let image_list = [];
            for (let i=0;i < action.payload.image_list.length; i++){
                if(action.payload.image_list[i].tag_list) {
                    action.payload.image_list[i].tag_list.forEach(function(li) { image_list.push(li)})
                }
            }
            let count = {};
            image_list.forEach(function(i) { count[i] = (count[i]||0) + 1;});
            let image_list_result = Object.keys(count).map(key => { return key + '(' + count[key] + ')'})
            
            action.payload["image_list_print"] = image_list_result;
            
        }
        if(action.payload.tag_list && action.payload.tag_list.length > 0){
            action.payload['tag_list'] = [...new Set(action.payload.tag_list)]
        }
        return state.set('dateDetail', fromJS(action.payload));
    },
    [SET_DATE_DETAIL_INITIAL]: (state, action) => {
        let dateDetailOrg = { ...state.get('dateDetail').toJS()};
        return state.set('dateDetailInitial', fromJS(dateDetailOrg));
    },
    [SET_IMAGE_DETAIL]: (state, action) => {
        //console.log('image action : ' + JSON.stringify(action.payload));
        let curState = {
            ...state.get('imageDetail').toJS()
        };
        for (let [k,v] of Object.entries(action.payload)) {
            curState[k] = v;
        }
        return state.set('imageDetail', fromJS(curState));
    },
    [SET_IMAGE_DETAIL_ALL]: (state, action) => {
        //console.log('image action all : ' + fromJS(action.payload));

        if(!Array.isArray(action.payload)){
            return state.set('imageDetail', fromJS(action.payload));
        }

        let image_list = action.payload;
        
        image_list.forEach(
            image => {
                let location3D = {};
                if(image.three && image.three.mesh_number > 0 ){
                    image.three.mesh_list.forEach(function(li) { 
                        location3D[JSON.stringify(li.intersection_point)] = li.location_name;    
                    })
                }
                image['location3D'] = location3D;
            }
        );

        let tmpNote ="";
        let tmpLocation3D = {};
        let tmpThreeMeshList =[];
        let tmpTagList =[];
        let tmpDateTagList =[];
        let tmpVisitDate = undefined;
        let tmpType = undefined;
        let tmpImageList = [];
        image_list.forEach(
            image => {
               // console.log('image action all: ', image);
                tmpNote = tmpNote.concat(tmpNote.length ? '\n' : '');
                tmpNote = tmpNote.concat(image.note ? image.note : '');
                Object.assign(tmpLocation3D, image.location3D? image.location3D : {});
                tmpThreeMeshList = tmpThreeMeshList.concat((image.three && image.three.mesh_list)? image.three.mesh_list : [])
                tmpTagList = tmpTagList.concat(image.tag_list? image.tag_list : []);
                tmpDateTagList = tmpDateTagList.concat((image.date && image.date.tag_list)? image.date.tag_list : []);
                tmpImageList = tmpImageList.concat(image.image_id? image.image_id : []);
                if(image.date && image.date.visit_date){
                    if(tmpVisitDate === undefined){
                        tmpVisitDate = image.date.visit_date;
                    } else if(tmpVisitDate !== image.date.visit_date){
                        tmpVisitDate = null;
                    }
                }
                if(tmpType === undefined){
                    tmpType = image.type;
                } else if(tmpType !== image.type){
                    tmpType = '';
                }
            }
        )
        let imageDetail = {};
        imageDetail['note'] = tmpNote;
        imageDetail['location3D'] = tmpLocation3D;
        imageDetail['three'] = { mesh_list : [...new Set(tmpThreeMeshList)],
                                mesh_number : [...new Set(tmpThreeMeshList)].length};
        imageDetail['tag_list'] = [...new Set(tmpTagList)];
        imageDetail['date_tag_list'] = [...new Set(tmpDateTagList)];
        imageDetail['visit_date'] = tmpVisitDate;
        imageDetail['type'] = tmpType;
        imageDetail['image_id_list'] = tmpImageList;

        return state.set('imageDetail', fromJS(imageDetail));
    },
    [SET_IMAGE_DETAIL_INITIAL]: (state, action) => {
        //console.log('image action init : ' + fromJS(action.payload));
        let imageDetailOrg = { ...state.get('imageDetail').toJS()};
        return state.set('imageDetailInitial', fromJS(imageDetailOrg));
    },
    [SET_DETAIL_CONDITION]: (state, action) => {
        //console.log('condition action : ' + JSON.stringify(action.payload));
        return state.set('detailCondition', action.payload);
  }
}, initialState);