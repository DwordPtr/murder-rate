import React from 'react';
import './App.css';
import DataTable from "react-data-table-component";

class App extends React.PureComponent {
  render() {
    let rate: number = inTenkToRate(10);
     let data: Array<MurderRow> = makeMurderRows(rate, 500);
     return (
       <div className="App">
         <DataTable 
         title="Table"
         columns={columns}
         data={data}/>
       </div>
     );
  }
}
const columns = [
  {
    name: "Year",
    selector: "year"
  },{
    name: "Rate",
    selector: "rate"
  }
];

function inTenkToRate(per10k: number): number{
  return per10k / 100_000;
}

function findEvenChance(rate: number): number {
  let iter: number = rate;
  let counter = 1;
  while(iter < .5){
    iter *= rate;
    counter++;
  }
  return counter;
}


function makeMurderRows(rate: number, yearCount: number): Array<MurderRow> {
  let notMurderedRate: number = 1 - rate;
  return Array.from(Array(yearCount).keys()).map(n => {
    return {
      "year": n+1,
      "rate": 1 - Math.pow(notMurderedRate, n+1)
    }
  });
}
interface MurderRow {
  year: number;
  rate: number;
}

interface MuderTable {
  rows: Array<MurderRow>;
}

export default App;
