import  React, { memo, useState, useEffect, useCallback, useMemo } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const insideObjectRef = {};
  const objectMemo = useMemo(() => {}, []);

  function insideFunctionRef () {};
  const functionCallback = useCallback(() => {}, []);

  const fetchData = (type) => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => console.log(type, json))
  }

  const MemoizedFetchData = useCallback((type) => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => console.log(type, json))
  }, []);

  useEffect(() => {
    fetchData('todos'); 
  }, [])

  return (
    <div className="App">
      <p>App component - Current state: {count}</p>

      <button onClick={() => setCount((count) => ++count)} style={{ marginBottom: '20px' }}>Update state</button>
      {console.log('render app')}

      {/* WITHOUT PROPS */}
      <Child name="normal" />
      <MemoizedChild name="memoized" />

      {/* WITH OBJECT PROP */}
      <MemoizedChild name="memoized with inline object" objectProp={{}} />
      <MemoizedChild name="memoized with inside object ref" objectProp={insideObjectRef} />
      <MemoizedChild name="memoized with outside object ref" objectProp={outsideObjectRef} />
      <MemoizedChild name="memoized with object memo" objectProp={objectMemo} />

      {/* WITH FUNCTION PROP */}
      <MemoizedChild name="memoized with inline function" fnProp={() => {}} />
      <MemoizedChild name="memoized with inside function ref" fnProp={insideFunctionRef} />
      <MemoizedChild name="memoized with outside function ref" fnProp={outsideFunctionRef} />
      <MemoizedChild name="memoized with useCallback function" fnProp={functionCallback} />

      {/* WITH API CALL */}
      <MemoizedChildWithData name="memoized with api call" fetchData={fetchData} />
      <MemoizedChildWithData name="memoized with useCallback api call" fetchData={MemoizedFetchData} />
    </div>
  );
};

const Child = ({ name }) => {
  return <div>{name} {console.log(`render ${name}`)}</div>
};
const MemoizedChild = memo(Child); // HOC => uses shouldComponentUpdate
// 2nd arg for custom comparison: areEqual(prevProps, nextProps)

const outsideObjectRef = {};
const outsideFunctionRef = () => {};

const MemoizedChildWithData = memo(({ name, fetchData }) => {
  useEffect(() => {
    fetchData('users');
  }, [fetchData]);
  return <div>{name} {console.log(`render ${name}`)}</div>;
});

// FOR FUNCTIONAL COMPONENTS WHICH ARE OFTEN RE-RENDERED WITH THE SAME PROPS

export default App;

