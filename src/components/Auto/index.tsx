import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import { getAutoRef, getTasksRef } from "../../helpers/refs";
import useAuth from "../../contexts/AuthContext";
import { remove, update } from "firebase/database";
import SelectFreq from "./SelectFreq";
import TimeInterval, { intervalToFreq } from "../../helpers/TimeInterval";
import { calculateNextUpdateTime } from "../../helpers/date-time-calculations";
import { DeleteAuto } from "./DeleteAuto";
import { PushAuto } from "./PushAuto";

interface AutoProps {
  task: IAuto;
}

const Auto: React.FC<AutoProps> = (props) => {
  const { task } = props;
  const autoRef = getAutoRef(useAuth().getCurrUser().uid, task.todoId, task.id);
  const tasksRef = getTasksRef(useAuth().getCurrUser().uid, task.todoId);

  function handleDelete(): void {
    remove(autoRef);
  }

  function handleIntervalChange(interval: TimeInterval): void {
    update(autoRef, {
      nextUpdate: calculateNextUpdateTime(interval),
      freq: intervalToFreq(interval),
    });
  }

  // Pushes the auto into the main list of tasks
  // An alternative is to update nextUpdateTime to current time, but this will not trigger a re-render because there isn't an onValue
  // listener for Autos (it uses get, not onValue)
  function forcePush(): void {
    const dueDate: Date = task.nextUpdate;
    update(tasksRef, {
      [task.id]: { ...task, dueDate, freq: null, nextUpdate: null },
    });
  }

  return (
    <div className={autoStyles.auto}>
      <p>{task.name}</p>
      <div className={autoStyles.options}>
        <SelectFreq
          onChange={handleIntervalChange}
          defaultValue={task.freq.toString()}
        />
        <div className={autoStyles.optionButtonGroup}>
          <DeleteAuto handleDelete={handleDelete} />
          <PushAuto forcePush={forcePush} />
        </div>
      </div>
    </div>
  );
};

export default Auto;
