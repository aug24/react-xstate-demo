import {assign, createMachine} from "xstate";
import {type CounterContext, initialContext} from "./counter/Counter.tsx";

type CounterEvent = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'CHANGE', id: string, value: string }

// Not real types, but object.  The state machine wants an object but typescript wants a type, so
// this is a (standard) hack to allow us to tell xstate it's an object, and typescript it's a type!
const StateMachineCounterContextType = {} as CounterContext;
const StateMachineCounterEventType = {} as CounterEvent;

export const counterMachine = createMachine({
    id: 'counter',
    initial: 'initial',
    context: initialContext,
    types: {
        context: StateMachineCounterContextType,
        events: StateMachineCounterEventType,
    },
    on: {
        INCREMENT: [
            {
                target: '.incremented',
                guard: (state) => state.context.name === 'Justin' || state.context.count < 4,
                actions:
                    assign({
                        count: ({context: {count}}) => count + 1,
                        error: () => undefined,
                    }),
            },
            {
                target: '.unchanged',
                actions:
                    assign({
                        error: () => "No more!",
                    }),
            }
        ],
        DECREMENT: [
            {
                target: '.decremented',
                guard: (state) => state.context.name === 'Justin' || state.context.count > 0,
                actions:
                    assign({
                        count: ({context: {count}}) => count - 1,
                        error: () => undefined,
                    }),
            },
            {
                target: '.decremented',
                actions:
                    assign({
                        error: () => "No less!",
                    }),
            }
        ],
        CHANGE: [
            {
                target: '.unchanged',
                actions:
                    assign(({event}) => ({
                        [event.id]: event.value,
                        error: undefined
                    })),
            }
        ]
    },
    states: {
        initial: {},
        incremented: {},
        decremented: {},
        unchanged: {},
    },
})