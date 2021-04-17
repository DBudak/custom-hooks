import {useEffect, useRef, useState} from 'react';
import useRenderDebugger from '../hooks/renderDebugger';


const ChildComponent = ({number, nestedObject}) => {

  useRenderDebugger('ChildComponent', {number, nestedObject});

  return (
    <div>
      Child Component; props: {number}
    </div>
  );
};

const RenderDebuggerComponent = () => {

  const [number, setNumber] = useState(Math.random());
  const [nestedObject, setNestedObject] = useState({foo: {bar: {fox: 'cat'}}});
  const interval = useRef();
  
  useRenderDebugger('RenderDebuggerComponent',{}, {number, nestedObject});

  useEffect(() => {
    interval.current = setInterval(() => {
      setNumber(Math.random());
      setNestedObject({foo: {bar: {fox: 'dog'}}});
    },10000);
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div>
      Render Debugger Example<br/>
      Parent Component; state: {number}
      <ChildComponent 
        number={number}
        nestedObject={nestedObject}
      />
    </div>
  );  
};

export default RenderDebuggerComponent;