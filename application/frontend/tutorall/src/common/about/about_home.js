// The about us page. Click on a developer and our info comes up. - Zainab Abbasi
import '../../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useNavigate } from "react-router";
import ButtonBase from '@mui/material/ButtonBase';

export function AboutHome() {
  let navigate = useNavigate();
  return (
    // Developers, click to see each developer in detail
    <Box className="interface" sx={{ flexGrow: 1 }}>
      <Grid container spacing={5} sx={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box className='dev'>
            <ButtonBase onClick={()=> {navigate("/about_me/zainab_abbasi")}} sx={{ display: 'flex', flexDirection: 'column', }}>
              <img className='pfp' src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="About Us" />
              <Typography variant="caption">Zainab Abbasi</Typography>
              <Typography variant="caption">Frontend Lead</Typography>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box className='dev'>
            <ButtonBase onClick={()=> {navigate("/about_me/matthew_davis")}} sx={{ display: 'flex', flexDirection: 'column', }}>
              <img className='pfp' src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="About Us" />
              <Typography variant="caption">Matthew Davis</Typography>
              <Typography variant="caption">Team Lead</Typography>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box className='dev'>
            <ButtonBase onClick={()=> {navigate("/about_me/tan_huynh")}} sx={{ display: 'flex', flexDirection: 'column', }}>
              <img className='pfp' src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="About Us" />
              <Typography variant="caption">Tan Huynh</Typography>
              <Typography variant="caption">Backend Lead</Typography>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box className='dev'>
            <ButtonBase onClick={()=> {navigate("/about_me/justine_tenorio")}} sx={{ display: 'flex', flexDirection: 'column', }}>
              <img className='pfp' src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="About Us" />
              <Typography variant="caption">Justine Tenorio</Typography>
              <Typography variant="caption">AWS Manager</Typography>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box className='dev'>
            <ButtonBase onClick={()=> {navigate("/about_me/anmol_tadikonda")}} sx={{ display: 'flex', flexDirection: 'column', }}>
              <img className='pfp' src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" alt="About Us" />
              <Typography variant="caption">Anmol Tadikonda</Typography>
              <Typography variant="caption">Git Master</Typography>
            </ButtonBase>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutHome;
