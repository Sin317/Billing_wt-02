import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getbill, deleteOnebill, setEditedbill } from "../../actions/bill";

export class bill extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
    getbill: PropTypes.func.isRequired,
    setEditedbill: PropTypes.func.isRequired,
    deleteOnebill: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getbill();
  };

  render() {
    return (
      <Fragment>
        <h2>bill</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>expenditure</th>
              <th>salary</th>
              <th>pay_month</th>
              <th>due_month</th>
              <th>category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.bill.map(onebill => (
              <tr key={onebill.id}>
                <td>{onebill.id}</td>
                <td>{onebill.expenditure}</td>
                <td>{onebill.salary}</td>
                <td>{onebill.pay_month}</td>
                <td>{onebill.due_month}</td>
                <td>{onebill.category}</td>
                <td>
                <button
                    onClick={this.props.setEditedbill.bind(this, onebill)}
                    className="btn btn-warning btn-sm"
                  >
                    {" "}
                    Edit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={this.props.deleteOnebill.bind(this, onebill.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bill: state.bill.bill
});

export default connect(
  mapStateToProps,
  { getbill, deleteOnebill, setEditedbill }
)(bill);
