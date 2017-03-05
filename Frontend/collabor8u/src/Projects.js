import React from "react";
import "./Projects.css";


class Projects extends React.Component {
    render() {
        return <button className="NewProject" /* onClick={activateLasers} */ >
            Activate Lasers
        </button>;
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputList: []};
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    }

    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<Projects key={inputList.length}/>)
        });
    }

    render() {
        return (
            <div className="Main">
                <button className="addBtn" onClick={this.onAddBtnClick}>Click to add a Project</button>
                {this.state.inputList}
            </div>
        );
    }
}


export default Form;