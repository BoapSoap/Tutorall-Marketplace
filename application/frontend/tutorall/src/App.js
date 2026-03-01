import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

export function App() {
  let navigate = useNavigate();
  return (
    <Box className="interface" sx={{ flexGrow: 1 }}>
      <h1>Welcome to TutorAll!</h1>
      <p>description</p>
      <Button onClick={() => { navigate("/search") }}>Search Tutors</Button>
      <img src={logo} className="App-logo" alt="logo" />
      <h3>Latest Tutor Listings</h3>
      <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
          <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
          <h4>Tutor</h4>
          <ul>
              <li>Class1</li>
              <li>Class2</li>
              <li>Class3</li>
          </ul>
          <p>$##</p>
      </Box>
      <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
          <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
          <h4>Tutor</h4>
          <ul>
              <li>Class1</li>
              <li>Class2</li>
              <li>Class3</li>
          </ul>
          <p>$##</p>
      </Box>
      <Box onClick={()=> {navigate("/profile")}} sx={{ border: '1px solid grey', borderRadius: 2, p: 2, mb: 2 }}>
          <img className="pfp" src="https://cdn.pixabay.com/photo/2018/11/13/22/01/avatar-3814081_1280.png" alt="Tutor Profile" />
          <h4>Tutor</h4>
          <ul>
              <li>Class1</li>
              <li>Class2</li>
              <li>Class3</li>
          </ul>
          <p>$##</p>
      </Box>
    </Box>
  );
}

export default App;
