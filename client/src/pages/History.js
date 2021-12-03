import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

const History = props => {
  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.flightNumber)}>
          <td>
            <span style={
              {color: launch.success ? "greenyellow" : "red"}
            }>█</span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
        </tr>;
      });
  }, [props.launches]);

  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
        <table style={{tableLayout: "fixed"}}>
          <thead>
            <tr>
              <th style={{width: "5rem"}}></th>
              <th style={{width: "5rem"}}>No.</th>
              <th style={{width: "9rem"}}>Date</th>
              <th>Mission</th>
              <th style={{width: "7rem"}}>Rocket</th>
              <th>Customers</th>
            </tr>
          </thead>
          <tbody>
            <tr  className="history">
          <td>
            <span style={
              {color: "red"}
            }>█</span>
          </td>
          <td>Hello</td>
          <td>2/89/2092</td>
          <td>mission</td>
          <td>rocket</td>
          <td>customer</td>
          </tr>
          <tr  className="history">
          <td>
            <span style={
              {color: "green"}
            }>█</span>
          </td>
          <td>Hello</td>
          <td>2/89/2092</td>
          <td>mission</td>
          <td>rocket</td>
          <td>customer</td>
          </tr>
          </tbody>
        </table>
    </Appear>
  </article>;
}
  
export default History;