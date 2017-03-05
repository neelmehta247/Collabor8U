import React from 'react';
import ReactDOM from "react-dom";
import './Projects.css';
import plus from './img/plus.png';



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
            inputList: inputList.concat(<Projects key={inputList.length} />)
        });
    }

    render() {
        return (
            <div className="Main">
                <div className="Container">
                    <div className="Header"> PROJECTS </div>
                        <div className="MainTable">
                            <button className="addBtn" onClick={this.onAddBtnClick}>
                                <img src={plus} className="PlusImg" alt="plus" />
                            </button>
                            {this.state.inputList}
                        </div>
                </div>
            </div>
        );
    }
}




export default Form;