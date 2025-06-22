import {Component} from "react";

export class DecrementButton extends Component<{ onClick: () => void }> {
    render() {
        return <button onClick={this.props.onClick}>
            Decrement
        </button>;
    }
}
