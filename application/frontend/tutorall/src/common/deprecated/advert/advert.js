// The detailed listing page. Navigate here from clicking on a listing. - Zainab Abbasi
import Button from '@mui/material/Button';
import logo from '../../logo.svg';
import { useNavigate } from 'react-router-dom';

export function Advert() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Tutor</h1>
      <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
      {/* Table of classes and teachers they tutor in */}
      <table border={"black 14px solid"}>
        <tbody>
          <tr>
            <td><strong>Class1</strong></td>
            <td><strong>Class2</strong></td>
          </tr>
          <tr>
            <td>Teacher1</td>
            <td>Teacher1</td>
          </tr>
          <tr>
            <td>Teacher2</td>
            <td>Teacher2</td>
          </tr>
          <tr>
            <td>Teacher3</td>
          </tr>
        </tbody>
      </table>
      {/* Video Placeholder */}
      <img src={logo} className="App-logo" alt="logo" />
      <Button onClick={() => navigate(`/messages`)}>Message Tutor</Button>
    </div>
  );
}

export default Advert;