import {handleActions, createAction } from 'redux-actions';
import {fromJS} from 'immutable';
import axios from 'axios';
import config from 'src/config';


const GET_SEARCH_LIST_SUCCESS = 'search/GET_SEARCH_LIST_SUCCESS';
const GET_SEARCH_LIST_FAIL = 'search/GET_SEARCH_LIST_FAIL';
const GET_SEARCH_LIST_PENDING = 'search/GET_SEARCH_LIST_PENDING';

const SET_SEARCH_KEY = 'search/SET_SEARCH_KEY';
const SET_SEARCH_ORDER = 'search/SET_SEARCH_ORDER';
const SET_SEARCH_CONDITION = 'search/SET_SEARCH_CONDITION';

const SELECT_PATIENT = 'search/SELECT_PATIENT';
const SELECT_DISEASE = 'search/SELECT_DISEASE';
const SELECT_DATE = 'search/SELECT_DATE';

const CLEAR_SEARCH_LIST = 'search/CLEAR_SEARCH_LIST';
const CLEAR_SELECTED_ROW = 'search/CLEAR_SELECTED_ROW';

export const setSearchKey = createAction(SET_SEARCH_KEY);
export const setSearchOrder = createAction(SET_SEARCH_ORDER);
export const setSearchCondition = createAction(SET_SEARCH_CONDITION);

export const selectPatient = createAction(SELECT_PATIENT);
export const selectDisease = createAction(SELECT_DISEASE);
export const selectDate = createAction(SELECT_DATE);

export const clearSelectedRow = createAction(CLEAR_SELECTED_ROW);

const initialState = fromJS({
  searchResult: {},
  searchKey: {
      patient: {
          key: '',
          order: 'visit_date',
          order_by: 'desc',
      },
      disease: {
          key: '',
          order: 'visit_date',
          order_by: 'desc',
      },
      date: {
          key: '',
          order: 'visit_date',
          order_by: 'desc',
      },
  }, 
  searchCondition: 'patient',
  selectedRow: {
      patient: {
      },
      disease: {
      },
      date: {
      },
  },
  
  searchStatus: false,
});

function searchService(token, 
                        category, 
                        service, 
                        order, 
                        order_by, 
                        selected_patient, 
                        selected_disease, 
                        patient_keyword_list, 
                        disease_keyword_list, 
                        date_keyword_list,
                        skip,
                        limit,
                        ) {
                            console.log("BBBBBBBBBBBBBBBBAAAAASSSEEEE : ", config.baseUrl);
    return axios.post(config.baseUrl + '/api', {
        "data": {
            "category": category,
            "service": service,
            "access_token": token,
            "skip": skip,
            "limit": limit,
            "patient": selected_patient,
            "diagnosis": selected_disease,
            "patient_keyword_list": patient_keyword_list,
            "disease_keyword_list": disease_keyword_list,
            "date_keyword_list": date_keyword_list,
            "order": order,
            "order_by": order_by
        },
    })
}

export const getMainList = (token, 
                            condition, 
                            order, 
                            order_by, 
                            selected_patient, 
                            selected_disease, 
                            patient_keyword_list, 
                            disease_keyword_list, 
                            date_keyword_list,
                            ) => (dispatch, getState) => {
    
    const { search } = getState();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const Condition = capitalizeFirstLetter(condition);
    const service = 'Search' + Condition;
    let category = condition === 'disease'? 'diagnosis': condition;

    dispatch({type:CLEAR_SEARCH_LIST});
    dispatch({type:GET_SEARCH_LIST_PENDING});

    return searchService(token, 
                        category, 
                        service, 
                        order, 
                        order_by, 
                        selected_patient, 
                        selected_disease, 
                        patient_keyword_list, 
                        disease_keyword_list, 
                        date_keyword_list,
                        0,
                        0
                        ).then(
        (response) => {
            if (response.data.err) {
                dispatch({
                    type: GET_SEARCH_LIST_FAIL,
                    payload: response.data.err,
                })
            }
            else {

                if (condition === 'disease') {
            
                    let newData = response.data.data;

                    let list = newData.diagnosis_list;

                    const newList = list.map((item, index) => {
                        if (item.date_list) {
                            const sort_list = item.date_list.sort(function(a, b) {
                                if (a.visit_date < b.visit_date)
                                    return 1;
                                else 
                                    return -1;
                            })
    
                            item.visit_date = sort_list[0].visit_date;
                        }
                        return item;
                    })

                    newData.diagnosis_list = newList;

                    dispatch({
                        type: GET_SEARCH_LIST_SUCCESS,
                        payload: newData,
                    })
                }
                else {
                    dispatch({
                        type: GET_SEARCH_LIST_SUCCESS,
                        payload: response.data.data,
                    })
                }
             
            }
        }
    ).catch(error => {
        console.log(service, ' error', error);
    })

}

export default handleActions({
  [GET_SEARCH_LIST_SUCCESS]: (state, action) => {
      console.log('GET_PATIENT_LIST_SUCCESS', action.payload)
      return state.set('searchStatus', false).set('searchResult', fromJS(action.payload));
  },
  [GET_SEARCH_LIST_PENDING]: (state) => {
      return state.set('searchStatus', true);
  },
  [GET_SEARCH_LIST_FAIL]: (state, action) => {
      console.log('GET_SEARCH_LIST_FAIL', action.payload)
      return state.set('searchStatus', false);
  },
  [CLEAR_SEARCH_LIST]: (state, action) => {
      return state.set('searchResult', fromJS([]))
  },
  [SET_SEARCH_KEY]: (state, action) => {
      return state.setIn(['searchKey', action.payload.condition, 'key'], action.payload.value);
  },
  [SET_SEARCH_ORDER]: (state, action) => {
      return state.setIn(['searchKey', action.payload.condition, 'order'], action.payload.order)
                  .setIn(['searchKey', action.payload.condition, 'order_by'], action.payload.order_by);
  },
  [SET_SEARCH_CONDITION]: (state, action) => {
      return state.set('searchCondition', action.payload);
  },
  [CLEAR_SELECTED_ROW]: (state) => {
      const data = {
          patient: {
          },
          disease: {
          },
          date: {
          },
      }
      return state.set('selectedRow', fromJS(data)).set('clickedRow', fromJS(data));
  },
  [SELECT_PATIENT]: (state, action) => {
      const patient = action.payload;
      const disease = patient.last_diagnosis? patient.last_diagnosis: {};
      const date = disease.last_date? disease.last_date: {};

      if (disease.last_date) {
          date.diagnosis = {
              type: disease.type
          }
      }
     
      return state.setIn(['selectedRow', 'patient'], fromJS(action.payload))
                  .setIn(['selectedRow', 'disease'], fromJS(disease))
                  .setIn(['selectedRow', 'date'], fromJS(date));
  },
  [SELECT_DISEASE]: (state, action) => {
      const disease = action.payload;
      let date = {};
      if (disease.date_list) {
          const sort_list = disease.date_list.sort(function(a, b) {
              if (a.visit_date < b.visit_date)
                  return 1;
              else
                  return -1;
          })

          date = sort_list[0];
          date.diagnosis = {
              type: disease.type
          }
      }

      let patient = {};
      if (disease.patient) {
          patient = disease.patient;

          return state.setIn(['selectedRow', 'disease'], fromJS(disease))
          .setIn(['selectedRow', 'date'], fromJS(date))
          .setIn(['selectedRow', 'patient'], fromJS(patient));

      }
      else {
          return state.setIn(['selectedRow', 'disease'], fromJS(disease))
          .setIn(['selectedRow', 'date'], fromJS(date));
      }


  },
  [SELECT_DATE]: (state, action) => {
      let disease = {}, patient = {};
      if (action.payload.diagnosis) {
          disease = action.payload.diagnosis;
      }
      if (action.payload.patient) {
          patient = action.payload.patient;
      
          return state.setIn(['selectedRow', 'date'], fromJS(action.payload))
          .setIn(['selectedRow', 'disease'], fromJS(disease))
          .setIn(['selectedRow', 'patient'], fromJS(patient));
      }
      else {
          return state.setIn(['selectedRow', 'date'], fromJS({}));
      }
      
  },
}, initialState);