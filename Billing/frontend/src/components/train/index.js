import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getbill, setbillCluster } from "../../actions/bill";
import axios from 'axios'

import C3Chart from 'react-c3js';
import 'c3/c3.css';


export class billExplore extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
    getbill: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      cluster_number: 3
    }
  }

  componentDidMount() {
    this.props.getbill();
  };

  startTrain(){
    console.log("======")

    // axios.get("/api/train").then((resp)=>{
    //   console.log("data=", resp.data);
    // })

    this.props.setbillCluster([]);

    let cluster_number = this.state.cluster_number;

    axios.post("/api/train", {cluster_number: cluster_number}).then((resp)=>{
      console.log("data=", resp.data);
      let billData = JSON.parse(resp.data);
      this.props.setbillCluster(billData);
    })
  }

  handleChange(e) {
    this.setState({cluster_number: e.target.value});
  }

  getcostScatterData(cluster_number){
    console.log("cluster_number=", cluster_number);

    let billCluster = this.props.billCluster;

    let data = {
      columns: [
        
      ],
      xs: {
      
      },
      names: {

      },
      type: 'scatter'
    };

    for(let i=0; i<cluster_number; i++){
      let billClusterFilter = billCluster.filter((onebill) => {
        if (i === onebill.cluster) {
          console.log("filter OK! onebill.cluster=", onebill.cluster);
          return true;
        }
      });
  
      let expenditure = "expenditure"+i;
      let salary = "salary"+i;
      let expenditureSeries = billClusterFilter.map((onebill)=>{
        return onebill.expenditure;
      });
      let salarySeries = billClusterFilter.map((onebill)=>{
        return onebill.salary;
      });

      let expenditureTrain = [expenditure, ...expenditureSeries];
      let salaryTrain = [salary, ...salarySeries];

      data.columns.push(expenditureTrain);
      data.columns.push(salaryTrain);

      data.names[expenditure] = "cluster"+i;
      data.xs[expenditure] = salary;
    }

    console.log(data);
    return data;
  }

  getcostScatterAxis(){
    return {
        x: {
            label: 'Expenditure',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Salary'
        }
    };
  }

  getdateScatterData(cluster_number){
    console.log("cluster_number=", cluster_number);

    let billCluster = this.props.billCluster;

    let data = {
      columns: [
      
      ],
      xs: {
      
      },
      names: {

      },
      type: 'scatter'
    };

    for(let i=0; i<cluster_number; i++){
      let billClusterFilter = billCluster.filter((onebill) => {
        if (i === onebill.cluster) {
          console.log("filter OK! onebill.cluster=", onebill.cluster);
          return true;
        }
      });
  
      let pay_month = "pay_month"+i;
      let due_month = "due_month"+i;
      let pay_monthSeries = billClusterFilter.map((onebill)=>{
        return onebill.pay_month;
      });
      let due_monthSeries = billClusterFilter.map((onebill)=>{
        return onebill.due_month;
      });

      let pay_monthTrain = [pay_month, ...pay_monthSeries];
      let due_monthTrain = [due_month, ...due_monthSeries];

      data.columns.push(pay_monthTrain);
      data.columns.push(due_monthTrain);

      data.names[pay_month] = "cluster"+i;
      data.xs[pay_month] = due_month;
    }

    console.log(data);
    return data;
  }

  getdateScatterAxis(){
    return {
        x: {
            label: 'Pay Month',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Due Month'
        }
    };
  }

  onSubmit = e => {
    e.preventDefault();
  }

  render() {
    let cluster_number = this.state.cluster_number;

    let costData = this.getcostScatterData(cluster_number);
    let costAxis = this.getcostScatterAxis();

    let dateData = this.getdateScatterData(cluster_number);
    let dateAxis = this.getdateScatterAxis();

    return (
      <Fragment>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>cluster number</label>
            <input
              className="form-control"
              type="text"
              name="cluster_number"
              onChange={this.handleChange.bind(this)}
              value={cluster_number}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" onClick={this.startTrain.bind(this)}>start train</button>
          </div>
        </form>

        <h2>bill cost Scatter cluster</h2>
        <C3Chart data={costData} axis={costAxis} />

        <h2>bill date Scatter cluster</h2>
        <C3Chart data={dateData} axis={dateAxis} />

        <h2>bill Cluster Result</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Expenditure</th>
              <th>Salary</th>
              <th>Pay_month</th>
              <th>Due_month</th>
              <th>Score</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.billCluster.map(onebill => (
              <tr>
                <td>{onebill.expenditure}</td>
                <td>{onebill.salary}</td>
                <td>{onebill.pay_month}</td>
                <td>{onebill.due_month}</td>
                <td>{onebill.cluster}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  bill: state.bill.bill,
  billCluster: state.bill.billCluster,
});

export default connect(
  mapStateToProps,
  { getbill, setbillCluster }
)(billExplore);
