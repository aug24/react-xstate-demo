import {useMemo} from 'react'
import './App.css'
import {createActor} from "xstate";
import {counterMachine} from "./counterMachine.tsx";
import {useSelector} from "@xstate/react";
import {IncrementButton} from "./components/IncrementButton.tsx";
import {DecrementButton} from "./components/DecrementButton.tsx";

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
            <p>count is {count}</p>
            <IncrementButton onClick={() => actor.send({type: 'INCREMENT'})}/>
            <DecrementButton onClick={() => actor.send({type: 'DECREMENT'})}/>
        </div>
    </>
  )
}

export default App
