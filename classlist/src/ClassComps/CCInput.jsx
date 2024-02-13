import { Component } from "react";

export default class CCInput extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            grade: 0,
        };
    }

    chgName = (e) => {
        this.setState({ name: e.target.value });
    };

    chgGrade = (e) => {
        this.setState({ grade: e.target.value });
    };

    render() {
        const { name, grade } = this.state;
        const { onAddPerson } = this.props;

        return (
            <div>
                Name: <input type="text" value={name} onChange={this.chgName} /><br /><br />
                Grade: <input type="number" value={grade} onChange={this.chgGrade} /><br /> <br />
                <button onClick={() => onAddPerson(name, grade)}>Add Person</button>
            </div>
        );
    }

}