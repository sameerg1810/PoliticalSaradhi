// /* eslint-disable import/no-unresolved */
// import { useState, useEffect } from 'react';
// /* eslint-disable import/order */
// import { useNavigate } from 'react-router-dom';

// import {
//   Box,
//   Grid,
//   Menu,
//   Card,
//   AppBar,
//   Toolbar,
//   MenuItem,
//   Typography,
//   IconButton,
//   CardContent,
// } from '@mui/material';

// // eslint-disable-next-line perfectionist/sort-imports, import/order
// // import { useRouter } from 'src/routes/hooks';

// import Bell from './buttons/bell.png';
// import NotificationPopup from './Notification';
// import Reportvoter from './buttons/report-voter.jpeg';
// import Reportincident from './buttons/incident-reporting.jpeg';
// // Replace with the correct path
// // eslint-disable-next-line import/no-unresolved

// // eslint-disable-next-line import/no-unresolved
// import Logo from 'src/components/logo';

// import Language from './Languages';
// // Replace with the correct path
// // eslint-disable-next-line import/no-unresolved

// import UserMapView from './userMap';
// import Profile from './buttons/Profile.png';
// import Canvassing from './buttons/Canvassing.png';

// export default function KaryaDashboard() {
//   const lan=localStorage.getItem('language')
//   const language=lan==="english"
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openPop, setOpenPop] = useState(false);
//   const [userName, setUserName] = useState('');

//   const open = Boolean(anchorEl);
//   // const router = useRouter(); // state to control the visibility of VoterFormComponent
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       const id = localStorage.getItem('id');
//       if (id) {
//         await fetch(`https://canvas-back-end.onrender.com/main/user/logout/${id}`, {
//           method: 'GET',
//         });
//       }
//       // Clear local storage, session storage, and cookies
//       localStorage.clear();
//       sessionStorage.clear();
//       document.cookie.split(';').forEach((c) => {
//         document.cookie = c
//           .replace(/^ +/, '')
//           .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
//       });
//       // Prevent the user from navigating forward after logging out
//       navigate('/');
//     } catch (error) {
//       console.error('An error occurred during logout:', error);
//     }
//   };

//   const handleOpenPopup = () => {
//     setOpenPop(true);
//   };

//   const handleClosePopup = () => {
//     setOpenPop(false);
//   };
//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   useEffect(() => {
//     // Fetch user name and email from local storage when the component mounts
//     const name = localStorage.getItem('name');

//     setUserName(name);
//   }, []);
//   return (
//     <Box p={1}>
//       <AppBar position="static" sx={{ backgroundColor: '#212121', p: 1 }}>
//         <Toolbar>
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               height: '5%',
//               width: '25%',
//               padding: '2px',
//               margin: '1px',
//               borderRadius: '50%',
//             }}
//           >
//             <Logo />
//           </div>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton
//             edge="end"
//             aria-label="profile"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             color="inherit"
//           >
//             <img src={Profile} alt="Profile" />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={open}
//             onClose={handleClose}
//             sx={{ minWidth: '150px' }} // Adjust the width as needed
//           >
//             <MenuItem onClick={handleClose} sx={{ minHeight: '30px' }}>
//               <Typography variant="subtitle1" sx={{ color: '#000' }}>
//                 {userName}
//               </Typography>
//             </MenuItem>
//             <MenuItem onClick={handleLogout} sx={{ minHeight: '30px' }}>
//               {language?"Logout":"లాగ్ అవుట్ చేయండి"}
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//       {/* this is main interface with tracking options , reporting voter , reporting incident , and Submitting voter forms */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Box mt={1} p={2} bgcolor="grey.200" border={2} borderColor="success.main" borderRadius={5}>
//           <UserMapView />
//           <Typography variant="body1" color="text.secondary" align="center">
//            {lan==="english"?'Enable this option to make yourself avalible and keep you online':' మీరు అందుబాటులో ఉండటానికి ఈ ఎంపికను సక్రియం చేయండి మరియు మీరు ఆన్‌లైన్ ఉండటానికి నొక్కండి.'}
//           </Typography>
//           {/* మీరు అందుబాటులో ఉండటానికి ఈ ఎంపికను సక్రియం చేయండి మరియు మీరు ఆన్‌లైన్ ఉండటానికి నొక్కండి. */}
//         </Box>
//         <Box mt={1} p={1} bgcolor="grey.200">
//           <Box mt={1}>
//             <IconButton
//               onClick={handleOpenPopup}
//               color="inherit"
//               aria-label="notifications"
//               edge="end"
//             >
//               <img src={Bell} alt="Bell" />
//             </IconButton>
//           </Box>
//           <Box mt={1} sx={{ minHeight: '30px' }}>
//             <Language />
//           </Box>
//           <Box mt={1} p={1} bgcolor="grey.200">
//             <NotificationPopup open={openPop} handleClosePopup={handleClosePopup} />
//           </Box>
//         </Box>
//       </Box>
//       <Card variant="outlined" sx={{ mt: 4 }}>
//         <CardContent>
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} md={6}>
//               <Box mt={1} display="flex" justifyContent="center">
//                 <button
//                   type="button"
//                   className="report-incident-button"
//                   onClick={() => {
//                     navigate('/voterform');
//                   }}
//                 >
//                   <img src={Canvassing} alt="Canvassing" />
//                 </button>
                
//               </Box>
//             </Grid>
//           </Grid>
//           {/* my modification */}
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} md={6}>
//               <Box mt={1} display="flex" justifyContent="center">
//               <button
//   style={{
//     backgroundImage: 'url("https://www.shutterstock.com/image-vector/canvass-word-cloud-conceptual-design-260nw-2311243467.jpg")',
//     backgroundSize: 'cover', // Optional, adjust to your needs
//     backgroundPosition: 'center', // Optional, adjust to your needs
//     backgroundColor: '#1E40AF', // Optional, adjust to your needs
//     width: '80px', // Adjust the width as needed
//     height: '40px', // Adjust the height as needed
//     borderRadius: '10px', // Adjust the border-radius as needed
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Optional, adjust to your needs
//     cursor: 'pointer', // Optional, add a pointer cursor on hover
//   }}
//   className="mt-4"
//   onClick={() => {
//     navigate("/sc-form");
//   }}
// >
//   <span
//     style={{
//       color: 'black', // Adjust the text color as needed
//       fontSize: '24px', // Adjust the font size as needed
//       display: 'block', // Optional, adjust to your needs
//       lineHeight: '40px', // Adjust the line height to center text vertically
//       textAlign: 'center', // Optional, adjust to your needs
//     }}
//   >
//     Start Canvassing
//   </span>
// </button>
//               </Box>
//             </Grid>
//           </Grid>
//           <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
//             <Grid item xs={12} md={6}>
//               <Box mt={2} display="flex" justifyContent="center">
//                 <button
//                   type="button"
//                   className="report-incident-button"
//                   onClick={() => {
//                     navigate('/Report-incident');
//                   }}
//                 >
//                   <img src={Reportincident} alt="report-incident" />
//                 </button>
//               </Box>
//             </Grid>
//           </Grid>
//           <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
//             <Grid item xs={12} md={6}>
//               <Box mt={2} display="flex" justifyContent="center">
//                 <button
//                   type="button"
//                   className="report-incident-button"
//                   onClick={() => {
//                     navigate('/reportVoter');
//                   }}
//                 >
//                   <img src={Reportvoter} alt="report-incident" />
//                 </button>

//               </Box>
           
//               <div
//                 className="report-con"
//                 style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
//               >
//                 <button type="button" style={{ margin: '0 10px' }}>
//                 <i className="fa-solid fa-phone" />
//                 </button>
//                 <button type="button" style={{ margin: '0 10px' }}>
//                 <i className="fa-solid fa-message"/>
//                 </button>
//               </div>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Menu,
  Card,
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';

import Logo from 'src/components/logo'; // Corrected import order
import Bell from './buttons/bell.png';
import NotificationPopup from './Notification';
import Reportvoter from './buttons/report-voter.jpeg';
import Reportincident from './buttons/incident-reporting.jpeg';
import Language from './Languages';
import UserMapView from './userMap';
import Profile from './buttons/Profile.png';
import Canvassing from './buttons/Canvassing.png';
import img from './buttons/tel.jpeg'

export default function KaryaDashboard() {
  const lan = localStorage.getItem('language');
  const language = lan === 'english';
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPop, setOpenPop] = useState(false);
  const [userName, setUserName] = useState('');

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const id = localStorage.getItem('id');
      if (id) {
        await fetch(`https://canvas-back-end.onrender.com/main/user/logout/${id}`, {
          method: 'GET',
        });
      }
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      navigate('/');
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  const handleOpenPopup = () => {
    setOpenPop(true);
  };

  const handleClosePopup = () => {
    setOpenPop(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const name = localStorage.getItem('name');
    setUserName(name);
  }, []);

  return (
    <Box p={1}>
      <AppBar position="static" sx={{ backgroundColor: '#212121', p: 1 }}>
        <Toolbar>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '5%',
              width: '25%',
              padding: '2px',
              margin: '1px',
              borderRadius: '50%',
            }}
          >
            <Logo />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            edge="end"
            aria-label="profile"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <img src={Profile} alt="Profile" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            sx={{ minWidth: '150px' }}
          >
            <MenuItem onClick={handleClose} sx={{ minHeight: '30px' }}>
              <Typography variant="subtitle1" sx={{ color: '#000' }}>
                {userName}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ minHeight: '30px' }}>
              {language ? 'Logout' : 'లాగ్ అవుట్ చేయండి'}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box mt={1} p={2} bgcolor="grey.200" border={2} borderColor="success.main" borderRadius={5}>
          <UserMapView />
          <Typography variant="body1" color="text.secondary" align="center">
            {lan === 'english'
              ? 'Enable this option to make yourself available and keep you online'
              : 'మీరు అందుబాటులో ఉండటానికి ఈ ఎంపికను సక్రియం చేయండి మరియు మీరు ఆన్‌లైన్ ఉండటానికి నొక్కండి.'}
          </Typography>
        </Box>
        <Box mt={1} p={1} bgcolor="grey.200">
          <Box mt={1}>
            <IconButton
              onClick={handleOpenPopup}
              color="inherit"
              aria-label="notifications"
              edge="end"
            >
              <img src={Bell} alt="Bell" />
            </IconButton>
          </Box>
          <Box mt={1} sx={{ minHeight: '30px' }}>
            <Language />
          </Box>
          <Box mt={1} p={1} bgcolor="grey.200">
            <NotificationPopup open={openPop} handleClosePopup={handleClosePopup} />
          </Box>
        </Box>
      </Box>
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
        <div className="flex flex-col home-button-container items-center m-5" >
        <button
        style={{backgroundImage:'url("https://www.shutterstock.com/image-vector/canvass-word-cloud-conceptual-design-260nw-2311243467.jpg")'}}
          className="btn mt-4 w-80 h-40 rounded-lg bg-blue-700  leading-34 text-center drop-shadow-md buttonScale"
          onClick={() => {
            navigate("/voterform");
          }}
        >
          <span className="text-black text-4xl "> {language?"Start Canvassing":"సంఘటన తెలియచేయండి"}</span>

        </button>

        <button
  className="btn mt-4 w-80 h-40 rounded-lg bg-blue-700 leading-34 text-center drop-shadow-md buttonScale"
  style={{
    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZYhwPEJbNPzX0KApQk3B2Y954V_30S0h3wA&usqp=CAU")',
  }}
  onClick={() => {
    navigate("/reportVoter");
  }}
>
  <span className="text-black text-4xl"style={{ textShadow: '10px 10px 10px white' }}>{language?"Report  Voter":"ఓటర్ ను రిపోర్ట్ చెయ్యండి"}</span>
</button>
{/* ri button */}

<button
  className="btn mt-4 w-80 h-40 rounded-lg bg-blue-700 leading-34 text-center drop-shadow-md buttonScale"
  style={{
    backgroundImage:`${language?'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0MY2uqnyx1tZFd_cu7nEB4Olx1P5XlKaz3g&usqp=CAU)':`url(${img})`}`,
    backgroundSize:'cover'
  }}
  onClick={() => {
    navigate("/Report-incident");
  }}
>
  {/* <span className="text-black text-4xl"style={{ textShadow: '10px 10px 10px white' }}>{language?"Report  Voter":"ఓటర్ ను రిపోర్ట్ చెయ్యండి"}</span> */}
</button>
{/* call icons */}
        <button className="btn home-call-btns">
          <a href="tel:8977011167" className="text-sm"><i className="fa-solid fa-phone"></i> Call incharge-1</a>
        </button>

        <button className="btn home-call-btns">
          <a href="tel:8977011167" className="text-sm"><i className="fa-solid fa-phone"></i> Call incharge-2</a>
        </button>
      </div>
        </CardContent>
      </Card>
    </Box>
  );
}
