import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addOnebill, updateOnebill, setEditedbill } from "../../actions/bill";

export class Form extends Component {
  static propTypes = {
    addOnebill: PropTypes.func.isRequired,
    updateOnebill: PropTypes.func.isRequired,
    setEditedbill: PropTypes.func.isRequired,
  };

  onChange = e => {
    this.props.editedbill[e.target.name] = e.target.value;
    let editedbill = {...this.props.editedbill}
    editedbill[e.target.name] = e.target.value;
    this.props.setEditedbill(editedbill);
  }

  onSubmit = e => {
    e.preventDefault();
    const { expenditure, salary, pay_month, due_month, category } = this.props.editedbill;
    const bill = { expenditure, salary, pay_month, due_month, category };

    if (this.props.editedbill.id) {
      bill['id'] = this.props.editedbill.id;
      this.props.updateOnebill(bill);
    } else {
      this.props.addOnebill(bill);
    }
    
    this.props.setEditedbill({
      expenditure: "",
      salary: "",
      pay_month: "",
      due_month: "",
      category: ""
    });
  };

  render() {
    const { expenditure, salary, pay_month, due_month, category } = this.props.editedbill;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add One bill</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Expenditure</label>
            <input
              className="form-control"
              type="text"
              name="expenditure"
              onChange={this.onChange}
              value={expenditure}
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              className="form-control"
              type="text"
              name="salary"
              onChange={this.onChange}
              value={salary}
            />
          </div>
          <div className="form-group">
            <label>Pay month</label>
            <input
              className="form-control"
              type="text"
              name="pay_month"
              onChange={this.onChange}
              value={pay_month}
            />
          </div>
          <div className="form-group">
            <label>Due month</label>
            <input
              className="form-control"
              type="text"
              name="due_month"
              onChange={this.onChange}
              value={due_month}
            />
          </div>
          <div className="form-group">
            <label>category</label>
            <textarea
              className="form-control"
              type="text"
              name="category"
              onChange={this.onChange}
              value={category}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editedbill: state.bill.editedbill
  }
};

export default connect(
  mapStateToProps,
  { addOnebill, updateOnebill, setEditedbill }
)(Form);
