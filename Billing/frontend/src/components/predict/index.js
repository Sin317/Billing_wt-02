import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getbill } from "../../actions/bill";
import axios from 'axios'

import C3Chart from 'react-c3js';
import 'c3/c3.css';


export class billPredict extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
    getbill: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expenditure: 500,
      salary: 32000,
      pay_month: 1,
      due_month: 3
    }
  }

  componentDidMount() {
    this.props.getbill();
  };

  startPredict(){
    console.log("======")

    let {expenditure, salary, pay_month, due_month, predicted_cluster} = this.state;

    let postData = {
      expenditure,
      salary,
      pay_month,
      due_month
    }

    axios.post("/api/predict", postData).then((resp)=>{
      console.log("data=", resp.data);
      let billData = JSON.parse(resp.data);
      
      this.setState({predicted_cluster: billData.predicted_cluster});
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    let {expenditure, salary, pay_month, due_month, predicted_cluster} = this.state;

    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4">
          <h2>Predict One bill Cluster</h2>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <label>Expenditure</label>
              <input
                className="form-control"
                type="text"
                name="expenditure"
                onChange={this.handleChange.bind(this)}
                value={expenditure}
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                className="form-control"
                type="text"
                name="salary"
                onChange={this.handleChange.bind(this)}
                value={salary}
              />
            </div>
            <div className="form-group">
              <label>Pay month</label>
              <input
                className="form-control"
                type="text"
                name="pay_month"
                onChange={this.handleChange.bind(this)}
                value={pay_month}
              />
            </div>
            <div className="form-group">
              <label>Due month</label>
              <input
                className="form-control"
                type="text"
                name="due_month"
                onChange={this.handleChange.bind(this)}
                value={due_month}
              />
            </div>
            <div className="form-group">
              <label>Predicted Score</label>
              <input
                disabled="disabled"
                className="form-control"
                type="text"
                name="predicted_cluster"
                value={predicted_cluster}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" onClick={this.startPredict.bind(this)}>
                Predict
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bill: state.bill.bill
});

export default connect(
  mapStateToProps,
  { getbill }
)(billPredict);
