import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemsActions } from '../store/itemsSlice';
import { fetchStatusActions } from '../store/fetchStatusSlice';

function FetchItems() {
    const fetchStatus=useSelector(store=>store.fetchStatus)
    const dispatch=useDispatch();
   // console.log(fetchStatus);


    useEffect(() => {
      if (fetchStatus.fetchDone) return;
  
      const controller = new AbortController();
      const signal = controller.signal;
  
      dispatch(fetchStatusActions.markFetchingStarted());
      fetch("http://localhost:8080/items", { signal })
        .then((res) => res.json())
        .then(({items }) => {
        //  console.log("items fetched" ,items)
         dispatch(fetchStatusActions.markFetchDone());
         dispatch(fetchStatusActions.markFetchingFinished());
          dispatch(itemsActions.addInitialItems(items[0]));
        });
  
      return () => {
       // console.log("cleaning up useEffect.");
        controller.abort();
      };
    }, [fetchStatus]);
  
  return (
    <>
    </>
  )
}

export default FetchItems