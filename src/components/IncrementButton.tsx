import {Component} from "react";

export class IncrementButton extends Component<{ onClick: () => void }> {
    render() {
        return <button onClick={this.props.onClick}>
            Increment
        </button>;
    }
}
