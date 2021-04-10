import {useEffect, useRef, useState} from 'react';

const useRenderDebugger = (componentName, props, ...states) => {
  const prevProps = useRef();

  const _logger = (componentName, props, prevProps) => {
    console.groupCollapsed(`%cComponent ${componentName} was rerendered.`, 'color:#2196f3');
    console.groupCollapsed('%cOld Props:', 'color: #9e9e9e');
    console.table(prevProps);
    console.groupEnd();
    console.groupCollapsed('%cNew Props:', 'color: #009688');
    console.table(props);
    console.groupEnd();
    console.groupEnd();
  }

  const _isObject = o => typeof o === 'object' && o !== null
  const _flattenO = o => {
    for(let key in prevProps) {
      if(_isObject(prevProps[key])) {
        

      }
    }
  };

  useEffect(() => {
    //_propChecker();
    _logger(componentName, props, prevProps);
    prevProps.current = props;
  })
}

const ChildComponent = ({number}) => {

  useRenderDebugger('ChildComponent', {number})

  return (
    <div>
      Child Component; props: {number}
    </div>
  )
}

const RenderDebuggerComponent = () => {

  const [number, setNumber] = useState(Math.random());
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setNumber(Math.random());
    },10000);
    return () => {
      clearInterval(interval.current);
    }
  })

  return (
    <div>
      Render Debugger Example<br/>
      Parent Component; state: {number}
      <ChildComponent 
        number={number}
      />
    </div>
  )  
};

export default RenderDebuggerComponent;