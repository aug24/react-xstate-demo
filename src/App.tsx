import {useMemo} from 'react'
import './App.css'
import {createActor} from "xstate";
import {counterMachine} from "./counterMachine.tsx";
import {useSelector} from "@xstate/react";

function App() {

    const actor = useMemo(() => {
        const actor = createActor(counterMachine);
        actor.start();
        return actor;
    }, [])

  const count = useSelector(actor, (state) => state.context.count);

  return (
    <>
      <div className="card">
        <button onClick={() => actor.send({type: 'INCREMENT'})}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
