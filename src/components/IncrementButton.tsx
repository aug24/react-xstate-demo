import {Component} from "react";
import type {CountContext, NameContext} from "../counter/Counter.tsx";
import type {MachineContext} from "xstate";

export class IncrementButton extends Component<{ onClick: () => void }> {
    render() {
        return <button onClick={this.props.onClick}>
            Increment
        </button>;
    }
}


export function mayIPleaseIncrement(context: CountContext & NameContext): boolean {
    return context.name === 'Justin' || context.count < 4;
}

export function getIncrementedCount() {
    return (state: MachineContext) => {
        const context = state.context as CountContext
        return context.count + 1
    }
}

