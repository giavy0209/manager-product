import React , { useEffect, useState , useCallback} from 'react';
import store from './store'
function App() {
  const [count, setcount] = useState(0)

  function increse(){
    setcount(count + 1)
  }
  return(
    <>
    <div>
      {count}
    </div>
    <button onClick={increse}>
    + 1
    </button>
    </>
  )
}

export default App;
