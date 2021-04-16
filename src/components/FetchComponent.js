import { useEffect, useState } from "react";


const _getData = url => fetch(url)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    if(!res.ok) 
      throw new Error([res.status, res.json()]);
    return [res.status, res.json()]
  });

const fetchMap = {
  'GET': _getData
}

const useFetch = (url, type='GET', body) => {

  const [res, setRes] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    if((url && type==='GET') || 
      (url && type && body)) {
        setStatus('Fetching');
        fetchMap[type](url)
          .then( ([code, json]) => {
            console.log(code, json)
            setRes(json);
            setStatus('Success');
            setStatusCode(code);
            setError();
          })
          .catch( ([code, error]) => {
            setRes();
            setStatus('Failed');
            setStatusCode(code);
            setError(error);
          })
      }
  },[url, type, body]);

  return [res, error, status, statusCode];
};

const FetchComponent = () => {

  const [getResponse, getError, getStatus, getStatusCode] = useFetch('https://jsonplaceholder.typicode.com/posts/1')
  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch('https://jsonplaceholder.typicode.com/123123/')
 return (
   <div>
     <div>Fetch component example</div>
     <div>Using https://jsonplaceholder.typicode.com/guide/</div>
     <div>
      <h3>Get (Success):</h3>
      <div><strong>Response</strong></div>
      <div>{JSON.stringify(getResponse)}</div>
      <div><strong>Error</strong></div>
      <div>{JSON.stringify(getError)}</div>
      <div><strong>Status</strong></div>
      <div>{getStatus} {getStatusCode}</div>
     </div>
     <div>
      <h3>Get (Fail):</h3>
      <div><strong>Response</strong></div>
      <div>{JSON.stringify(getFailedResponse)}</div>
      <div><strong>Error</strong></div>
      <div>{JSON.stringify(getFailedError)}</div>
      <div><strong>Status</strong></div>
      <div>{getFailedStatus} {getFailedStatusCode}</div>
     </div>
      
   </div>
 ) 
};

export default FetchComponent;