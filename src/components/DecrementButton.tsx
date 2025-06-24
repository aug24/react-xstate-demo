import {Component} from "react";
import type {CountContext, NameContext} from "../counter/Counter.tsx";
import type {MachineContext} from "xstate";

export class DecrementButton extends Component<{ onClick: () => void }> {
    render() {
        return <button onClick={this.props.onClick}>
            Decrement
        </button>;
    }
}

export function mayIPleaseDecrement(context: CountContext & NameContext): boolean {
    return context.name === 'Justin' || context.count > 0;
}

export function getDecrementedCount() {
    return (state:MachineContext) => {
        const context = state.context as CountContext
        return context.count - 1
    }
}

