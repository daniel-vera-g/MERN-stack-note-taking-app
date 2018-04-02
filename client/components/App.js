/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:14:38
 * @modify date 2018-04-01 11:14:38
 * @desc Main react entry file for the Application
 */

/* import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Add from "./Add";
export default class App extends React.Component  */
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Add from "./Add";
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { selectedMonth: "Jan", selectedYear: 2016, data: [] };
    this.getData = this.getData.bind(this);
  }
  /* constructor() {
    super();
    // set default state for the component
    this.state = { selectedMonth: "Jan", selectedYear: 2017, data: [] };
    this.getData = this.getData.bind(this);
  } */

  componentDidMount() {
    this.getData(this, "2016");
  }
  /* componentDidMount() {
    this.getData(this, "2017");
  } */

  componentWillReceiveProps(nextProps) {
    this.getData(this, "2016");
  }
  /* componentWillReceiveProps(nextProps) {
    this.getData(this, "2017");
  } */

  // Get data from the DB & set the State
  getData(ev, year) {
    axios.get("/getAll?month=All&year=" + year).then(function(response) {
      ev.setState({ data: response.data });
      ev.setState({
        selectedYear: parseInt(year)
      });
    });
  }
  /* getData(ev, year) {
    axios.get("/getAll?month=All&year=" + year).then(response => {
      ev.setState({ data: response.data });
      ev.setState({
        selectedYear: parseInt(year)
      });
    });
  } */

  render() {
    return (
      <div>
        <Add
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
        />
        <table>
          <thead>
            <tr>
              <th />
              <th className="desc-col">Description</th>
              <th className="button-col">Amount</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(exp) {
              return (
                <tr>
                  <td className="counterCell" />
                  <td className="desc-col">{exp.description}</td>
                  <td className="button-col">{exp.amount}</td>
                  <td className="button-col">{exp.month}</td>
                  <td className="button-col">{exp.year}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

// render() {
//   return (
//     <div>
//       {/* Open modal to add Note */}
//       <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
//       <table>
//         <thead>
//           <tr>
//             <th></th>
//             <th className='desc-col'>Topic</th>
//             <th className='button-col'>Description</th>
//             <th className='button-col'>Month</th>
//             <th className='button-col'>Year</th>
//             </tr>
//         </thead>
//         {/* Show Notes */}
//         <tbody>
//           {
//             this.state.data.map((nt) => {
//               return  <tr><td className='counterCell'></td><td className='desc-col'>{nt.description}</td><td className='button-col'>{nt.topic}</td><td className='button-col'>{nt.month}</td><td className='button-col'>{nt.year}</td></tr>
//             })
//           }
//           </tbody>
//       </table>
//     </div>
//   );
// }
