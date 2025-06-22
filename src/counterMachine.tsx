import {assign, createMachine} from "xstate";

type CounterContext = {
    count: number
}

type CounterEvent = { type: 'INCREMENT' }

export const counterMachine = createMachine({
    id: 'counter',
    context: {
        count: 0
    },
    types: {
        context: {} as CounterContext,
        events: {} as CounterEvent
    },
    on: {
        INCREMENT: {
            actions: [
                assign({
                    count: (state) => state.context.count + 1
                }),
                ({context}) => {
                    console.log(context);
                }
            ]

        }
    }
})