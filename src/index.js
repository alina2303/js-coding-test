/**
 * JS coding test
 * Time: ~3 hour
 *
 * ##### BACKGROUND INFO:
 * A process consist of collections of activities, connections and labels.
 * Each activity in a process can have an attached label, which is
 * normalized on the process for reuseability.
 *
 * ##### ASSIGNMENT:
 * Iterate through the activities of MOCKED_PROCESS and present
 * a list based on the connections heirarchy.
 * Each connection has a from and to id, which correlate
 * with an id in MOCKED_PROCESS.activities.
 *
 * Render the list from start to finish: The start of the process
 * is the activity with only a connection.from correlated.
 * The end is the activity with only a connection.to.
 * Follow this flow and only show activities which is a part of
 * this heirachy.
 *
 * ##### BONUS ASSIGNMENT 1:
 * When iterating the activities, apply the following logic
 * on the index of each iteration:
 * - If the index is divisible by 2 write the activity name in uppercase
 * - If the index is divisible by 3 prefix the activity name with a 🚀
 *
 * ##### BONUS ASSIGNMENT 2:
 * draw an arrow between every activity for each connection.
 * Extra credit is given for arrow head and only using CSS in styles.css
 * Feel free to extend margin between each activity.
 */
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const MOCKED_PROCESS = {
  name: "Mars Mission",
  activities: [
    { id: "8585571079", name: "Drop needless weight" },
    { id: "8871225613", name: "Build Rocket", label: "9129104797" },
    { id: "4652822021", name: "Avoid asteroid" },
    { id: "2077823965", name: "Stock food supplies", label: "5465669622" },
    { id: "3502381400", name: "Rocket take off", label: "9129104797" },
    { id: "7333120001", name: "Sucessfully land on Mars", label: "9129104797" },
    { id: "8585571079", name: "Turn left at the moon", label: "8863073698" },
    { id: "2944830655", name: "Fill tank", label: "5465669622" },
    { id: "0219543378", name: "Hire Pilots", label: "4463200174" }
  ],
  connections: [
    { from: "4652822021", to: "7333120001" },
    { from: "2944830655", to: "3502381400" },
    { from: "0219543378", to: "2077823965" },
    { from: "3502381400", to: "4652822021" },
    { from: "8871225613", to: "0219543378" },
    { from: "2077823965", to: "2944830655" }
  ],
  labels: [
    { id: "8863073698", name: "Time Travel", color: "#ff4136" },
    { id: "4463200174", name: "HR", color: "#ffb700" },
    { id: "5465669622", name: "Supply", color: "#00449e" },
    { id: "9129104797", name: "Rocket Engineering", color: "#137752" }
  ]
};

/*##### ONLY CHANGE CODE BELOW THIS POINT #####*/

let activities = [];
let activitiesCounter = 0;

/* looking for a start point where an id in 'from' does not excist in 'to' */
const findEnterPoint = arr => {
  return  arr.find(connection => {
    const frm = connection.from;
    const fromToRelation = arr.find(cncn => {
      return cncn.to === frm;
    });
    return fromToRelation ? null : frm;
  });
};


/*rendes an activity */

const renderActivity = (activityId, index) => { 
  const activitiesArr = MOCKED_PROCESS.activities;
  const activity = activitiesArr.find((act) => {
    return act.id === activityId;
  });

  if (!activity) {
    return null;
  }

  activities.push(
      <li className="activity">
        <h3>{transformActivityName(activity.name, index)}</h3>
        {getLable(activity.label)}
      </li> 
  )
} 
 
/* function that takes an id of the activity that must be rendered, rendes it, and if next step exists, runs itself again */

const logicBuilder = (startPosition) => {
  const connections = MOCKED_PROCESS.connections;
  const currentConnection = connections.find((connection) => {
    return startPosition === connection.from;
  });

  renderActivity(startPosition, activitiesCounter);
  activitiesCounter++;

  if (!currentConnection) {
    return null;
  }
  const nextPosition = currentConnection.to;
  logicBuilder(nextPosition);
}

/*general function that starts all the process */

const renderActivities = () => {
  const enterPoint = findEnterPoint(MOCKED_PROCESS.connections).from;
  logicBuilder(enterPoint);
  return activities;
}

/* gets a lable for each activity + background inline styling */

const getLable = (lableId) => {
 const lables = MOCKED_PROCESS.labels;
  const lable = lables.find((lb) => {
    return lableId === lb.id;
  });
  if (!lable) {return null}
  return (
    <span className="lable" style={{background: lable.color, padding: '18px 5px 0px 5px'}}>{lable.name}</span>
  )
}

/*bonus assignment 1 */

const transformActivityName = (actName, index) => {
  const isDivisibleBy2 = !Boolean(index%2);
  const isDivisibleBy3 = !Boolean(index%3);

  if (isDivisibleBy2) {
    actName = actName.toUpperCase();
  }
  if (isDivisibleBy3) {
    actName =  '🚀' + actName; 
  }
  return actName;
}

const ProcessRender = () => {
  return (
    <div className="App">
      <h1>{MOCKED_PROCESS.name} 👨🏻‍🚀 </h1>
      <ul className="process">
        {renderActivities()}
      </ul>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<ProcessRender process={MOCKED_PROCESS} />, rootElement);
