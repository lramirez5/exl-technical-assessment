import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            nameSearchTerm: '',
            startDateSearchTerm: '',
            endDateSearchTerm: ''
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    editNameSearchTerm = (e) => {
        this.setState({ nameSearchTerm: e.target.value });
    }

    editStartDateSearchTerm = (e) => {
        this.setState({ startDateSearchTerm: e.target.value });
    }

    editEndDateSearchTerm = (e) => {
        this.setState({ endDateSearchTerm: e.target.value });
    }

    clearSearchTerms = () => {
        document.getElementById('nameInput').value = '';
        this.setState({ nameSearchTerm: '' });
        document.getElementById('startInput').value = '';
        this.setState({ startDateSearchTerm: '' });
        document.getElementById('endInput').value = '';
        this.setState({ endDateSearchTerm: '' });
    }

    dynamicSearch = () => {
        let nameMatches = this.state.employees.filter(employee => employee.fullName.toLowerCase().includes(this.state.nameSearchTerm.toLowerCase()));
        return nameMatches.filter(employee => (employee.startDate >= this.state.startDateSearchTerm || this.state.startDateSearchTerm == '') && (employee.endDate <= this.state.endDateSearchTerm || this.state.endDateSearchTerm == ''));
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label> Search:&nbsp;</label>
                        <input type="text" value={this.state.nameSearchTerm} onChange={this.editNameSearchTerm} placeholder="Employee name" size="30" id="nameInput" />
                        <label>&nbsp; Employment Date Range:&nbsp;</label>
                        <input type="date" value={this.state.startDateSearchTerm} onChange={this.editStartDateSearchTerm} id="startInput" />
                        <label>&nbsp;to:&nbsp;</label>
                        <input type="date" value={this.state.endDateSearchTerm} onChange={this.editEndDateSearchTerm} id="endInput" />
                        <button className="btn btn-outline-secondary" onClick={this.clearSearchTerms} style={{ marginLeft: "10px" }}>Clear</button>
                        <button className="btn btn-primary" onClick={this.addEmployee} style={{ marginLeft: "28px" }}> Add Employee</button>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Employee Name</th>
                                <th> Job Title</th>
                                <th> Age</th>
                                <th> Start Date</th>
                                <th> End Date</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.dynamicSearch().map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td> {employee.fullName} </td>
                                            <td> {employee.jobTitle}</td>
                                            <td> {employee.age}</td>
                                            <td> {employee.startDate}</td>
                                            <td> {employee.endDate}</td>
                                            <td>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListEmployeeComponent