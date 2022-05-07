import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'

const ListEmployeeComponent = () => {

    // useState() hook
    // This is a Hook (function) that allows you to have state variables in functional components. 
    // You pass the initial state to this function and it returns a variable with the current state value 
    // (not necessarily the initial state) and another function to update this value.
    const [employees, setEmployees] = useState([])

    // useEffect() hook
    // The useEffect Hook allows us to perform side effects (an action) in the function components.
    // It does not use components lifecycle methods that are available in class components. 
    // In other words, Effects Hooks are equivalent to componentDidMount(), componentDidUpdate(), 
    // and componentWillUnmount() lifecycle methods.
    useEffect(() => {
        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
       EmployeeService.deleteEmployee(employeeId).then((response) =>{
        getAllEmployees();

       }).catch(error =>{
           console.log(error);
       })
        
    }

    return (
        <div className = "container">
            <h2 className = "text-center"> List Employees </h2>
            <Link to = "/add-employee" className = "btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        // We are using the ES6 feature that is map operator to loop over our employees list and create the view
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteEmployee(employee.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}

export default ListEmployeeComponent