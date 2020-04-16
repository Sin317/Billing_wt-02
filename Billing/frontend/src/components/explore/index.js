import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getbill } from "../../actions/bill";

import C3Chart from 'react-c3js';
import 'c3/c3.css';

import { Histogram, WrappedComponent, withParentSize, PatternLines, DensitySeries, BarSeries, XAxis, YAxis } from '@data-ui/histogram';

export class billExplore extends Component {
  static propTypes = {
    bill: PropTypes.array.isRequired,
    getbill: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getbill();
  };

  getbillSeries(billData){
    console.log(billData)
    
    let expenditureSeries = billData.map((onebill)=>onebill.expenditure);
    let salarySeries = billData.map((onebill)=>onebill.salary);
    let pay_monthSeries = billData.map((onebill)=>onebill.pay_month);
    let due_monthSeries = billData.map((onebill)=>onebill.due_month);

    return {
      expenditureSeries,
      salarySeries,
      pay_monthSeries,
      due_monthSeries
    }
  }

  setbillSeries(billData){
    this.billSeries = this.getbillSeries(billData);
  }

  getcostScatterData(){
    let billSeries = this.billSeries;

    let expenditureSeries = billSeries.expenditureSeries;
    let salarySeries = billSeries.salarySeries;

    let data = {
      x: 'expenditure',
      columns: [
        ["expenditure", ...expenditureSeries],
        ["salary", ...salarySeries]
      ],
      type: 'scatter'
    };

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


  getdateScatterData(){
    let billSeries = this.billSeries;

    let pay_monthSeries = billSeries.pay_monthSeries;
    let due_monthSeries = billSeries.due_monthSeries;

    let data = {
      x: 'pay_month',
      columns: [
        ["pay_month", ...pay_monthSeries],
        ["due_month", ...due_monthSeries]
      ],
      type: 'scatter'
    };

    console.log(data);

    return data;
  }

  getdateScatterAxis(){
    return {
        x: {
            label: 'Paid Month',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Due Month'
        }
    };
  }

  render() {
    this.setbillSeries(this.props.bill);
    
    let costData = this.getcostScatterData();
    let costAxis = this.getcostScatterAxis();

    let dateData = this.getdateScatterData();
    let dateAxis = this.getdateScatterAxis();
    
    const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest}) => (
      <Histogram
        width={parentWidth}
        height={parentHeight}
        {...rest}
      />
    ));

    const rawData11 = Array(100).fill().map(Math.random);

    return (
      <Fragment>
        <h2>billExpenditure</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.billSeries.expenditureSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.billSeries.expenditureSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

        <h2>Income</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.billSeries.salarySeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.billSeries.salarySeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

        <h2>bill Pay Month</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.billSeries.pay_monthSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.billSeries.pay_monthSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>


        <h2>bill Due Month</h2>
        <div style={{height:"500px"}}>
        <ResponsiveHistogram
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={20}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
              <div>
                <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
                <div><strong>count </strong>{datum.count}</div>
                <div><strong>cumulative </strong>{datum.cumulative}</div>
                <div><strong>density </strong>{datum.density}</div>
              </div>
            )}
          >
            <BarSeries
              rawData={this.billSeries.due_monthSeries /* or binnedData={...} */}
            />
            <DensitySeries
              rawData={this.billSeries.due_monthSeries /* or binnedData={...} */}
            />
            <XAxis />
            <YAxis />
          </ResponsiveHistogram>
        </div>

        <h2>bill Cost Scatter</h2>
        <C3Chart data={costData} axis={costAxis} />

        <h2>bill date Scatter</h2>
        <C3Chart data={dateData} axis={dateAxis} />
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
)(billExplore);
