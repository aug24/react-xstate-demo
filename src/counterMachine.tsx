import {assign, createMachine} from "xstate";
import {type CounterContext, initialContext} from "./counter/Counter.tsx";

type CounterEvent = { type: 'INCREMENT' } | { type: 'DECREMENT' }

// Not real types, but object.  The state machine wants an object but typescript wants a type, so
// this is a (standard) hack to allow us to tell xstate it's an object, and typescript it's a type!
const StateMachineCounterContextType = {} as CounterContext;
const StateMachineCounterEventType = {} as CounterEvent;

export const counterMachine = createMachine({
    id: 'counter',
    context: initialContext,
    types: {
        context: StateMachineCounterContextType,
        events: StateMachineCounterEventType,
    },
    on: {
        INCREMENT: {
            actions: [
                assign({
                    count: ({context: {count}}) => count + 1
                }),
                ({context}) => {
                    console.log("Incrementing", context);
                }
            ]
        },
        DECREMENT: {
            actions: [
                assign({
                    count: ({context: {count}}) => count - 1
                }),
                ({context}) => {
                    console.log("Decrementing", context);
                }
            ]
        }
    }
})