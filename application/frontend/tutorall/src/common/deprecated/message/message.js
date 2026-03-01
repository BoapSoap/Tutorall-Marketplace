// Messages page. Tutors can view messages here - Zainab Abbasi
import Button from '@mui/material/Button';
import logo from '../../logo.svg';

export function Message() {
  return (
    <div>
      <h1>Messages</h1>
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <h6>Subject</h6>
        <p>From: Student</p>
        <p>Date: 11/17/2025</p>
      </div>
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <h6>Subject</h6>
        <p>From: Student</p>
        <p>Date: 11/16/2025</p>
      </div>
      {/* The message being displayed */}
      <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
        <h6>Subject</h6>
        <p>From: Student</p>
        <p>Hi. I would like to know more about the course material.</p>
        <Button>View Listing</Button>
      </div>
    </div>
  );
}

export default Message;
