import React , { useEffect, useState , useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const state = useSelector(rootState => rootState.count)
  console.log(state);
  
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
