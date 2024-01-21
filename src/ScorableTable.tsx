import DeckDisplay from "./DeckDisplay";
import { Scorable } from "./game/score";
import "./ScorableTable.css";

interface ScorableRowProps {
  scorable: Scorable;
}

interface ScorableTableProps {
  scorables: Scorable[];
}

function ScorableRow({ scorable }: ScorableRowProps) {
  return (
    <tr>
      <td>{scorable.type}</td>
      <td><DeckDisplay deck={scorable.deck} /></td>
      <td>{scorable.score}</td>
    </tr>
  )
}

function ScorableTable({ scorables }: ScorableTableProps) {
  const totalScore = scorables.reduce((total, scorable) => total + scorable.score, 0);

  return (
    <div className="scorable-table">
      <table>
        <tbody>
          <tr className="scorable-table-total">
            <td>Total</td>
            <td></td>
            <td>{totalScore}</td>
          </tr>
          {scorables.map((scorable, i) => <ScorableRow scorable={scorable} key={i} />)}
        </tbody>
      </table>
    </div>
  )
}

export default ScorableTable;