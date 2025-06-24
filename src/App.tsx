import {useEffect, useMemo} from 'react'
import './App.css'
import {createActor} from "xstate";
import {counterMachine} from "./counterMachine.tsx";
import {useSelector} from "@xstate/react";
import {IncrementButton} from "./components/IncrementButton.tsx";
import {DecrementButton} from "./components/DecrementButton.tsx";
import type {CounterContext} from "./counter/Counter.tsx";

type WindowExpose = { state: { context: CounterContext, value: string } }

function App() {

    const actor = useMemo(() => {
        const actor = createActor(counterMachine);
        actor.start();
        return actor;
    }, [])

    const count = useSelector(actor, (state) => state.context.count);
    const name = useSelector(actor, (state) => state.context.name);
    const error = useSelector(actor, (state) => state.context.error);
    const value = useSelector(actor, (state) => state.value);
    const state = useSelector(actor, (state) => state);

    useEffect(() => {
        (window as unknown as WindowExpose).state = {
            context: state.context,
            value: state.value.toString()
        }
    }, [state]);

    return (
        <>
            <div className="card">
                <p>count is {count}</p>
                <IncrementButton onClick={() => actor.send({type: 'INCREMENT'})}/>
                <DecrementButton onClick={() => actor.send({type: 'DECREMENT'})}/>
                <input id="name" onChange={(e) => {
                    console.log("sending", e.target.value)
                    actor.send({type: 'CHANGE', id: e.target.id, value: e.target.value})
                }
                }
                       value={name}/>
                <p>{value.toString()}</p>
                {error && (<p>{error}</p>)}
            </div>
        </>
    )
}

export default App
