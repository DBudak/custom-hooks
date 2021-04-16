import { useEffect, useRef, useState } from "react";
import useRenderDebugger from "../hooks/renderDebugger";


const _getData = url => fetch(url)
  .then(res => {
    if(!res.ok) throw res;
    return res;
  });

const fetchMap = {
  'GET': _getData
}

const useFetch = (url, type='GET', body) => {

  /*
  const [res, setRes] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [statusCode, setStatusCode] = useState();
  */
  const res = useRef();
  const error = useRef();
  const status = useRef();
  const statusCode = useRef();

  const _resetToPreFetchState = _ => {
    res.current = undefined;
    error.current = undefined;
    status.current = 'Fetching';
    statusCode.current = undefined
  }

  const _setSuccessState = (json, code) => {
    res.current = json;
    error.current = undefined;
    status.current = 'Success';
    statusCode.current = code
  }

  const _setFailedState = (json, code) => {
    res.current = undefined;
    error.current = json;
    status.current = 'Failed';
    statusCode.current = code
  }

  useEffect(() => {
    //_resetToPreFetchState();
    //need to change this to one major state, maybe usereducer
    if(url && type==='GET'){
      fetchMap[type](url)
      .then(async res => {
        const json = await res.json();
        _setSuccessState(json, res.status);
      })
      .catch(async err => {
        const json = await err.json();
        _setFailedState(json, err.status);
      })
    }else if(url && type && body) {
      }
      console.log([res.current, error.current, status.current, statusCode.current])
  },[url, type, body]);

  return [res.current, error.current, status.current, statusCode.current];
};

const FetchComponent = () => {

  const [getResponse, getError, getStatus, getStatusCode] = useFetch('https://jsonplaceholder.typicode.com/posts/1')
  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch('https://jsonplaceholder.typicode.com/123123/')

  console.log('I rerendered')
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
      <div>{JSON.stringify(getFailedStatus)} {getFailedStatusCode}</div>
     </div>
      
   </div>
 ) 
};

export default FetchComponent;