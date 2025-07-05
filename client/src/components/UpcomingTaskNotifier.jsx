import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const UpcomingTaskNotifier = ({ tasks, userPhoneNumber }) => {
  useEffect(() => {
    const today = new Date();
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(today.getDate() + 2);

    const upcomingTasks = tasks.filter((task) => {
      const taskEnd = new Date(task.endDate);
      return taskEnd >= today && taskEnd <= twoDaysFromNow && !task.complete;
    });

    upcomingTasks.forEach(async (task) => {
      try {
        await axios.post("http://localhost:5000/api/sms/send-sms", {
          to: userPhoneNumber,
          message: `Reminder: Task "${task.title}" is due on ${task.endDate}`,
        });
        console.log("SMS sent successfully");
      } catch (err) {
        console.error("SMS failed", err);
      }
    });
  }, [tasks, userPhoneNumber]);

  return null;
};

UpcomingTaskNotifier.propTypes = {
  tasks: PropTypes.array.isRequired,
  userPhoneNumber: PropTypes.string.isRequired,
};

export default UpcomingTaskNotifier;
