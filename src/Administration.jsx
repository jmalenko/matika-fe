import {useNavigate} from 'react-router-dom';
import {useLocalStorage} from "./useLocalStorage.js";

export default function Administration() {

  let navigate = useNavigate();

  function onHome() {
    navigate("/");
  }

  // ===

  const [log, setLog] = useLocalStorage("log", []);

  function onClearLocalStorage(event) {
    setLog([]); // Hack: This is here to update state.

    localStorage.clear(); // Clear localStorage
  }

  // ===

  return (
    <>
      <ButtonHome onHome={onHome}/>

      <div id="admin">
        <h4>Administrace</h4>
        Log has {log.length} items.
        <button onClick={onClearLocalStorage}>Clear localStorage</button>

        <h4>Log</h4>
        <table id="history">
          <thead>
          <tr>
            <th>Čas</th>
            <th>Předmět</th>
            <th>Třída</th>
            <th>Cvičení</th>
            <th>Událost</th>
            <th>Zadání</th>
            <th>Odpověď<br/>očekávaná</th>
            <th>Odpověď<br/>skutečná</th>
            <th>Hodnocení</th>
            <th>Doba</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(log).map(i => {
            const l = log[i];

            const date = new Date(l.timestamp);
            const year = date.getFullYear();
            const month = date.getMonth();
            const monthStr = (month < 9 ? "0" : "") + (month + 1);
            const day = date.getDate();
            const dayStr = (day <= 9 ? "0" : "") + day;

            const hour = date.getHours();
            const hourStr = (hour <= 9 ? "0" : "") + hour;
            const minute = date.getMinutes();
            const minuteStr = (minute <= 9 ? "0" : "") + minute;
            const second = date.getSeconds();
            const secondStr = (second <= 9 ? "0" : "") + second;
            const millisecond = date.getMilliseconds();
            let millisecondStr = ["000", millisecond].join("");
            millisecondStr = millisecondStr.substring(millisecondStr.length - 3);

            const timeStr = year + "-" + monthStr + "-" + dayStr + " " + hourStr + ":" + minuteStr + ":" + secondStr + "." + millisecondStr;

            const durationRounded = l.duration != "" ? Math.round(l.duration / 100) / 10 : "";

            const highlightRow = ["Start", "Další cvičení"].includes(l.event) ? "cell-highlight-start" : "";
            const highlight = l.correctIndicator == "Chyba" ? "cell-highlight-incorrect" : "";

            return (
              <tr key={i} className={highlightRow}>
                <td>{i} {timeStr}</td>
                <td>{l.predmet}</td>
                <td>{l.trida}</td>
                <td>{l.cviceni}</td>
                <td>{l.event}</td>
                <td>{l.exercise}</td>
                <td>{l.answerExpected}</td>
                <td>{l.answerActual}</td>
                <td className={highlight}>{l.correctIndicator}</td>
                <td>{durationRounded}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ButtonHome({onHome}) {
  return (
    <img
      id="home"
      className="icon"
      onClick={onHome}
      src="/images/home_24dp_FILL0_wght400_GRAD0_opsz24.svg"
      alt="Přejít na rozcestník"/>
  );
}
