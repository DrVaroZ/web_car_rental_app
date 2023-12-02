import React, { Component } from 'react';
import './styles/date_time.css';

class DateTimeInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localTime: '',
      utcTime: '',
      userTimeZone: '',
    };
  }

  componentDidMount() {
    this.getUserTimeZoneInfo();
    this.intervalId = setInterval(this.updateTimes, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getUserTimeZoneInfo = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.setState({ userTimeZone: timeZone });
  };

  updateTimes = () => {
    const now = new Date();

    const localTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    const localTimeString = now.toLocaleString(undefined, localTimeOptions);
    this.setState({ localTime: localTimeString });

    const utcTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };
    const utcTimeString = now.toLocaleString(undefined, utcTimeOptions);
    this.setState({ utcTime: utcTimeString });
  };

  render() {
    const { userTimeZone, localTime, utcTime } = this.state;

    // Format the current date in dd-mm-yyyy format
    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    return (
      <div className="time-info">
        <p>Local date: <span>{currentDate}</span></p>
        <p>User's timezone: <span>{userTimeZone}</span></p>
        <p>Local time: <span>{localTime}</span></p>
        <p>Time in UTC: <span>{utcTime}</span></p>
      </div>
    );
  }
}

export default DateTimeInfo;
