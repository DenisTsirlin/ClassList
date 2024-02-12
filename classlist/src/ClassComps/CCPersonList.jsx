import React, { Component } from "react";
import CCInput from "./CCInput";
import { BsTrash, BsPencil, BsCheck } from "react-icons/bs";

export default class CCPersonList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            persons: [],
            counter: 1,
            editingPersonId: null,
            editedName: "",
        };
    }

    addPerson = (name, grade) => {
        const { persons, counter } = this.state;

        const newPerson = { id: counter, name, grade };

        // Update the persons array with the new person
        this.setState({
            persons: [...persons, newPerson],
            counter: counter + 1,
        });
    };

    handleDelete = (id) => {
        const updatedPersons = this.state.persons.filter((person) => person.id !== id);

        // Update the state with the filtered persons array
        this.setState({
            persons: updatedPersons,
        });
    };

    handleEdit = (id, name) => {
        this.setState({
            editingPersonId: id,
            editedName: name,
        });
    };

    handleSave = () => {
        const { editingPersonId, editedName, persons } = this.state;

        // Find the person with the editingPersonId and update the name
        const updatedPersons = persons.map((person) =>
            person.id === editingPersonId ? { ...person, name: editedName } : person
        );

        // Reset the editing state
        this.setState({
            editingPersonId: null,
            editedName: "",
            persons: updatedPersons,
        });
    };



    render() {
        const { persons, editingPersonId, editedName } = this.state;

        return (
            <div>
                <CCInput onAddPerson={this.addPerson} />
                <div>
                    <h2>Persons List:</h2>
                    <ul>
                        {persons.map((person) => (
                            <li
                                key={person.id}
                                style={{
                                    marginBottom: '10px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative',
                                }}
                            >
                                {editingPersonId === person.id ? (
                                    <>
                                        <span>{`ID: ${person.id}, `}</span>
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => this.setState({ editedName: e.target.value })}
                                            style={{ width: '25%', marginRight: '10px' }}
                                        />
                                        <span
                                            style={{ position: 'absolute', right: '40px', cursor: 'pointer' }}
                                            onClick={this.handleSave}
                                        >
                                            <BsCheck />
                                        </span>
                                        <span
                                            style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
                                            onClick={() => this.handleDelete(person.id)}
                                        >
                                            <BsTrash />
                                        </span>
                                        <span>{`, Grade: ${person.grade}`}</span>
                                    </>
                                ) : (
                                    <>
                                        {`ID: ${person.id}, Name: ${person.name}, Grade: ${person.grade}`}
                                        <span
                                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => this.handleEdit(person.id, person.name)}
                                        >
                                            <BsPencil />
                                        </span>
                                        <span
                                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => this.handleDelete(person.id)}
                                        >
                                            <BsTrash />
                                        </span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

}
