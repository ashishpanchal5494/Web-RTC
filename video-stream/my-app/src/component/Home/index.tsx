import { useState, useEffect } from "react";
import {v4} from "uuid";
import { useNavigate } from "react-router-dom";

import { Container, Box, Card, CardContent, Typography, TextField, CardActions, Button, CardHeader } from '@mui/material';


const sxHome =
{
    background:
    {
        position: "fixed",
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundImage: "linear-gradient(to bottom, #FFF 10%, #F0F0FFFF 15%, #F0F0FFFF 80%, #FFF 90%)",
        backgroundSize: "cover",
        backgroundPosition: "50% 75%",
        width: "100%",
        height: "100vh",
        zIndex: -2,
    },
    bgvideo:
    {
        position: "fixed",
        left: 0, right: 0, top: "15%", bottom: "80%",
        width: "100%",
        height: "65%",
        zIndex: -1,
        "& video":
        {
            width: "100%",
            height: "100%",
            objectFit: "cover",
        },
    },
    box:
    {
        paddingTop: "5%",
    },
    cardHeader:
    {
        background: 'linear-gradient(45deg, #CC88FF 20%, #223377 90%)',
        color: theme => theme.palette.primary.contrastText,
        padding: 0.72,
    },
    footer:
    {
        position: "fixed",
        textAlign: "right",
        bottom: 1,
        left: 1,
        right: 1,
    },
}
const Home = ({socket}:any) => {
    const [room, setRoom] = useState<string>('');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${v4()}`);
    }
    const handleSubmit = () => {
        navigate(`/view/${room}`);
    }

  

    return (
        <div>
            <Box>
            <Container maxWidth="sm">
                <Box mt={2} p={2} sx={sxHome.box}>
                    <Card elevation={8}>
                        <CardHeader sx={sxHome.cardHeader}></CardHeader>
                        <CardContent>
                            <Typography variant="h4" component="h4" color="textPrimary" gutterBottom style={{ fontWeight: 700 }}>
                                Video Streaming App
                            </Typography>
                            <Button size="large" color="primary"  onClick={handleClick}>Go Live</Button>
                            <Box fontSize="subtitle1.fontSize" lineHeight={1.5} component="p" color="text.primary" mt={2} mb={3}>
                                Please enter a Room ID to join a video chat ...
                            </Box>
        
                            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <TextField fullWidth={true} id="code" label="Room ID" variant="outlined" value={room} onChange={e => setRoom(e.target.value)} />
                            </form>

                        </CardContent>

                        <CardActions>
                            <Button size="large" color="primary" disabled={room.trim().length === 0} onClick={handleSubmit}>Join</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Container>

            <Box sx={sxHome.bgvideo}>
                <video loop muted autoPlay playsInline disablePictureInPicture>
                    <source src="background.mp4" type="video/mp4" />
                </video>
            </Box>

            <Box sx={sxHome.background} />

        </Box>
            {/* <button onClick={handleClick}>Go Live</button>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setRoom(e.currentTarget.value)} name="id" />
                <input type="submit" value={'Submit'} />
            </form> */}
        </div>
    );
};

export default Home;
