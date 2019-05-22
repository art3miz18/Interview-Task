import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

 

class ChartData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
      <div className="graph">
        <p className="head-graph">Monthly Rides data</p>
        <C3Chart data={{ json: this.props.graphData }} axis={this.props.axis} />
      </div> 
      <div className="graph">
      <p className="head-graph">Peak hour chart</p>
        <C3Chart
          data={{ json: this.props.secondGraph }} axis={this.props.secondGraphAxis}/>
          <p className="italics">brownie points : this charts are interactive: hover over the filters below the x axis</p>
      </div>       
        
      </>
    );
  }
}

export default ChartData;
