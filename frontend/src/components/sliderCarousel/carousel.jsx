"use client"
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from  'react-swipeable-views-react-18-fix'
import featureImg from '../../../public/assets/images/feature.jpg';
import techPreferenceImg from '../../../public/assets/images/tech_preference.jpg';
import projectDashboardImg from '../../../public/assets/images/project_dashboard.jpg';
// import { autoPlay } from 'react-swipeable-views-utils';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'Provide AI Generated Feature',
        imgPath: featureImg.src,
    },
    {
        label: 'You Can Select your Preferences',
        imgPath: techPreferenceImg.src,
    },
    {
        label: 'Easy to Create Project',
        imgPath: projectDashboardImg.src,
    },
];

function SwipeableTextMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: '100%', flexGrow: 1, position: 'relative', zIndex: '100', display:"flex", height:'100%', flexDirection:'column', justifyContent:'space-between', paddingTop:'10%', paddingBottom:'2%'}}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    backgroundColor: '#ffffff00',
                    color: '#fff',
                    textAlign: 'center'
                }}
            >
                <Typography sx={{ marginTop:{ xs: '10%', md: '0px'}, backgroundColor: '#ffffff00', fontSize: { xs: '7vw', md: '40px'}, textAlign: 'center', fontWeight: 'bold' }}>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={1000}
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: 450,
                                    overflow: 'hidden',
                                    width: '100%',
                                    margin: { xs: '0px 5% 0px 3.2%', md: '0px auto'},
                                    marginBottom: '5%'
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <Box sx={{marginTop:'5%'}}>
                <Typography variant="h3" sx={{marginBottom:'5px', color:'#fff', fontSize: '28px', textAlign: 'center', fontWeight: 'bold' }}>Create your Project with AI</Typography>
                <Typography sx={{marginBottom:'10px', color:'#fff', fontSize: '1rem', textAlign: 'center'}}>Everything you need in an easily customizable dashboard</Typography>
            </Box>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                    backgroundColor: '#ffffff00',
                    textAlign: 'center',
                    margin: '0px auto',
                    alignItems: 'center',
                    justifyContent: 'center',

                    '& .MuiMobileStepper-dot': {
                        backgroundColor: '#ffffffcc',
                        height: '8px',
                        width: '8px',
                        marginRight: '30px',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiMobileStepper-dotActive': {
                        backgroundColor: '#fff',
                        height: '11px',
                        width: '11px',
                    },
                }}
            />
        </Box>
    );
}

export default SwipeableTextMobileStepper;
