
import React, { Component } from 'react'
import $ from 'jquery';

//import ReactDOM from 'react-dom';
//import Dropdown from './Dropdown';

//import CardHeader from "@material-ui/core/Card";
//import CardBody from "@material-ui/core/Card";
//import Card from "@material-ui/core/Card";
//import Table from "@material-ui/core/Card";
//import Table from 'react-bootstrap/Table';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Foliocamslist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data1: [],

        };

    }


    componentDidMount() {
        $.ajax({
            url: "/api/getfoliocams",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (result) {
                this.setState({ data1: result });

            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);

            }
        });
    }


    render() {
        return (

            <div>
                <table>
                    <thead>
                        <tr><th><b>S.No</b></th><th><b>Foliochk</b></th><th><b>Inv_name</b></th>
                            <th><b>Sch_name</b></th><th><b>Jnt_name1</b></th><th><b>Jnt_name2</b></th><th><b>Holding_nature</b></th>
                            <th><b>Pan_no</b></th><th><b>Joint1_pan</b></th><th><b>Bank_name</b></th><th><b>Ac_no</b></th><th><b>Nom_name</b></th>
                            <th><b>Nom2_name</b></th>
                            <th><b>Nom3_name</b></th>
                            <th><b>Ifsc_code</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data1.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.foliochk}</td>
                                <td>{item.inv_name}</td>
                                <td>{item.sch_name}</td>
                                <td>{item.jnt_name1}</td>
                                <td>{item.jnt_name2}</td>
                                <td>{item.holding_nature}</td>
                                <td>{item.pan_no}</td>
                                <td>{item.joint1_pan}</td>
                                <td>{item.bank_name}</td>
                                <td>{item.ac_no}</td>
                                <td>{item.nom_name}</td>
                                <td>{item.nom2_name}</td>
                                <td>{item.nom3_name}</td>
                                <td>{item.ifsc_code}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        );
    }
}

export default Foliocamslist;



