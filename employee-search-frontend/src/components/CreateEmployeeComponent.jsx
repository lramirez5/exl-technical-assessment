import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fullName: '',
            jobTitle: '',
            age: '',
            startDate: '',
            endDate: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeJobTitleHandler = this.changeJobTitleHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeStartDateHandler = this.changeStartDateHandler.bind(this);
        this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {

        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    fullName: employee.fullName,
                    jobTitle: employee.jobTitle,
                    age: employee.age,
                    startDate: employee.startDate,
                    endDate: employee.endDate
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { fullName: this.state.fullName, jobTitle: this.state.jobTitle, age: this.state.age, startDate: this.state.startDate, endDate: this.state.endDate };
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ fullName: event.target.value });
    }

    changeJobTitleHandler = (event) => {
        this.setState({ jobTitle: event.target.value });
    }

    changeAgeHandler = (event) => {
        this.setState({ age: event.target.value });
    }

    changeStartDateHandler = (event) => {
        this.setState({ startDate: event.target.value });
    }

    changeEndDateHandler = (event) => {
        this.setState({ endDate: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Full Name: </label>
                                        <input placeholder="Full Name" name="fullName" className="form-control"
                                            value={this.state.fullName} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Job Title: </label>
                                        <input placeholder="Job Title" name="jobTitle" className="form-control"
                                            value={this.state.jobTitle} onChange={this.changeJobTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Age: </label>
                                        <input type="number" placeholder="Age" name="age" className="form-control"
                                            value={this.state.age} onChange={this.changeAgeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Start Date: </label>
                                        <input type="date" name="startDate" className="form-control"
                                            value={this.state.startDate} onChange={this.changeStartDateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> End Date: </label>
                                        <input type="date" name="endDate" className="form-control"
                                            value={this.state.endDate} onChange={this.changeEndDateHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent