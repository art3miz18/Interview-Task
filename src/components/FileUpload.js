import React from 'react';
import CSVReader from 'react-csv-reader';
import styled from 'styled-components';
import MapData from './Map';
import ChartData from './ChartData';

const Styles = styled.div`
  .container {
    text-align: center;
    padding: 15px;
    margin: 10px auto;
  }

  .csv-input {
    padding: 10px;
    display: block;
    margin: 15px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .container p {
    padding-top: 10px;
    color: #666;
  }
`;

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routePoints: [],
      firstGraph: {},
      firstGraphAxis: {},
    };
  }

  handleForce = data => {
    var routePoints = [],
      firstGraph = {
        'Number of Rides': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      secondGraph = {
        'Long distance': [0, 0, 0, 0, 0, 0],
        'Point to point': [0, 0, 0, 0, 0, 0],
        'Hourly rental': [0, 0, 0, 0, 0, 0]
      },
      secondGraphAxis = {
        x: {
          categories: [
            '12am-4am',
            '4am-8am',
            '8am-12pm',
            '12pm-4pm',
            '4pm-8pm',
            '8pm-12pm'
          ],
          type: 'category',
        },
      },
      firstGraphAxis = {
        x: {
          categories: [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
          ],
          type: 'category',
        },
      };

    for (var i = 0; i < data.length; i++) {
      if (i > 0 && i < 5000)//remove if to iterate through whole file 
      {
        if (
          !isNaN(Number(data[i][14])) &&
          !isNaN(Number(data[i][15])) &&
          !isNaN(Number(data[i][16])) &&
          !isNaN(Number(data[i][17]))
        ) {
          let lat = [Number(data[i][14]), Number(data[i][15])],
            lng = [Number(data[i][16]), Number(data[i][17])];
          routePoints.push([lat, lng]);
        }
        if (data[i][13]) {
          var time = new Date(data[i][13]),
            month = time.getMonth(),
            hour = time.getHours();
          firstGraph['Number of Rides'][month] += 1;

          if (data[i][4]) {
            var type =
              data[i][4] === '1'
                ? 'Long distance'
                : data[i][4] === '2'
                ? 'Point to point'
                : 'Hourly rental';
            if (hour >= 0 && hour <= 4) {
              secondGraph[type][0] += 1;
            } else if (hour > 4 && hour <= 8) {
              secondGraph[type][1] += 1;
            } else if (hour > 8 && hour <= 12) {
              secondGraph[type][2] += 1;
            } else if (hour > 12 && hour <= 16) {
              secondGraph[type][3] += 1;
            } else if (hour > 16 && hour <= 20) {
              secondGraph[type][4] += 1;
            } else if (hour > 20 && hour <= 24) {
              secondGraph[type][5] += 1;
            }
          }
        }
      }
    }
    this.setState({
      routePoints: routePoints,
      firstGraph: firstGraph,
      firstGraphAxis: firstGraphAxis,
      secondGraph: secondGraph,
      secondGraphAxis: secondGraphAxis,
    });
  };

  render() {
    return (
      <Styles>
        <div className="container">
          <CSVReader
            cssClass="react-csv-input"
            label="Upload your CSV file here"
            onFileLoaded={this.handleForce}
          />
          {this.state.routePoints.length > 0 && (
            <>
              <MapData routePoints={this.state.routePoints} />
              <ChartData
                graphData={this.state.firstGraph}
                axis={this.state.firstGraphAxis}
                secondGraph={this.state.secondGraph}
                secondGraphAxis={this.state.secondGraphAxis}
              />
            </>
          )}
        </div>
      </Styles>
    );
  }
}

export default FileUpload;
