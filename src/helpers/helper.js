const APIkey = 'e00122e087ef4cd38cae467769877d36';
const baseUrl =  'https://api.api.ai/v1/';
const version = '20170723';

export function postJSON(url, data, callback) {
  let response;
  /* return (
    fetch(url, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Charset': 'utf-8'
      }),
      body: JSON.stringify(data)
    })
  ); */
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };

  xhr.open("POST", url, true);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('charset', 'utf-8');
  xhr.send(JSON.stringify(data));
}
/* 
  sending message to API.ai for a response. 
*/
export function postToApi(text, callback) {
  const xhr = new XMLHttpRequest();
  let response;
  let dispText = '';
  const data = {
    'query': text,
    'lang': 'en',
    'sessionId': 'runbotman'
  }

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      response = JSON.parse(xhr.responseText);
      dispText = (response) ? (response.result ? response.result.speech : '') : '';

      if(response.result.fulfillment) {
        dispText = response.result.fulfillment.messages[1].speech;
      }
      
      callback(dispText);
    }
  };

  xhr.open("POST", `${baseUrl}query?v=${version}`, true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('Authorization', `Bearer ${APIkey}`);  
  xhr.send(JSON.stringify(data));
}
