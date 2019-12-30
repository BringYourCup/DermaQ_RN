import config from 'src/config';
import axios from 'axios';


export const getFormatDate = (date, format) => { 
  if(!date) {
      return null;
  }
  let year = date.getFullYear();	//yyyy 
  let month = (1 + date.getMonth());	//M 
  month = month >= 10 ? month : '0' + month;	//month 두자리로 저장 
  let day = date.getDate();	//d 
  day = day >= 10 ? day : '0' + day;	//day 두자리로 저장 

  return year + format + month + format + day; 
}


export const differenceOfArrays = (array1, array2)  => {
  const temp = [];
  
  for(var i in array2) {
      if(!array1.includes(array2[i])) temp.push(array2[i]);
  }
  return temp.sort((a,b) => a-b);
}

export function prepareImage(token, file) {
  let service = config.baseUrl + "/api/image/PrepareImage";
  return new Promise(function(resolve, reject) {
    fetch(service, {
      method: 'post',
      header: { 'Content-type' : 'application/json' },
      body: JSON.stringify({
        "data": {
          access_token: token,
          image: {
            file_name: file.name
          }
        }
      })
    }).then((response) => {
      if(response.status === 200) {
        return response.json();
      }
      else {
        console.log('prepareImage error!!', response, token, file)
      }
    }).then((data) => {
      console.log('savprepareImageeFile', data, data.data)
      let path = "";
      if(data.data) path = data.data.image;
      resolve(path);
    })
  })
}

export function processImage(token, image_id) {
  let service = config.baseUrl +"/api/image/ProcessImage";

  return new Promise(function (resolve, reject) {
    fetch( service, {
      method: 'post',
      header: { 'Content-type' : 'application/json' },
      body: JSON.stringify({
        "data": {
          access_token: token,
          "image": {
            image_id: image_id,
            width: 128,
            height: 128,
          }
        }
      })
    }).then((response) => {
      if(response.status === 200) {
        console.log("procesImage : ", response);
        return response.json();
      }
      else {
        console.log('processImage error!!', response, token, image_id)
      }
    }).then((data) => {
      let path = "";
      if(data.data) {
        path = data.data;
      }

      resolve(path);
    })
  })
}

export function saveFile(fileServerPath, file){
  var formData = new FormData();
  formData.append('file', file);
  
  return new Promise(function(resolve, reject) {
    fetch(fileServerPath, {
      method: 'POST',
      header: {
        'Accept' : "application/json",
        'Content-type': 'multipart/form-data'},
      mode: 'cors',
      body: formData
    }).then((response) => {
      if (response.ok) {
        return response.text().then(function(text) {
          return text ? JSON.parse(text) : {}
        })
      }
      else {
        console.log('saveFile error!!', response, fileServerPath, file)
      }
    }).then((data) => {
      resolve(data);
    }).catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

export function addDiagnosis(token, image) {
  return new Promise(function(resolve, reject) {
    
    fetch(config.baseUrl + "/api/", {
      method: 'post',
      header: { 'Content-type': 'application/json' },
      body: JSON.stringify({
          "data": {
            "category": "diagnosis",
            "service": "AddDiagnosis",
              "access_token": token,
              "patient": {
                  "patient_id" : image.patient_id,
              },
              "diagnosis": {
                  "type": image.type,
                  "location_list": image.location_list,
                  "date": image.visit_date,
                  "tag_list": image.tag_list,
                  "note" : image.note,
              },
              "image_list": image.image_list || [],
              "three" : {
                  "mesh_list" : image.mesh_list,
              }
          }
      })
    }).then(res => res.json())
    .then(json => {
      resolve(json);
    }).catch(err => {
      reject(err);
    })
  })
}

export function strncmp(str1, str2, n) {
  str1 = str1.substring(0, n);
  str2 = str2.substring(0, n);
  return ( ( str1 === str2 ) ? 0 :
                              (( str1 > str2 ) ? 1 : -1 ));
}