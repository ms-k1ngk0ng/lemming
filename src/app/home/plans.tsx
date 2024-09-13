import React, { useState } from 'react';
import { Box, Card, CardContent, CardActions, Button, Typography, Paper, Avatar, Chip, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward, Person } from '@mui/icons-material';

type Person = {
  id: number;
  name: string;
  groups: string[];
  pic?: string;
  status?: string;
  self?: boolean;
}

type Plans = {
  id: number;
  owner: number;
  plan: string;
  responseOptions: string[];
  responses: Response[];
  invitees: number[];
}

type Response = {
  id: number;
  owner: number;
  response: string;
};

const PlansViewer: React.FC<{ 
  plans: Plans[],
  people: Person[]
}> = ({ 
  plans,
  people
}) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  const handleNext = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const handlePrevious = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  const getPersonFromId = (id: number) => {
    return people.find((person) => person.id === id);
  }

  const currentPlan = plans[currentPlanIndex];
  const planOwner = getPersonFromId(currentPlan.owner);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {currentPlan && (
        <Card elevation={6} sx={{ width: '100%', maxWidth: '700px', mb: '8px', padding: '8px' }}> {/* Reduced margin bottom */}
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom fontFamily="Jost" sx={{ mb: '16px' }}>
              {currentPlan.plan.toLowerCase()}              
            </Typography>
            <Chip
              avatar={<Avatar alt="Avatar" src={planOwner?.pic} />}
              label={<Typography variant="body2" noWrap> {planOwner?.name.toLowerCase()} </Typography>}
              variant="outlined"
              sx={{ maxWidth: 200, marginBottom: '16px' }}
            />
            {currentPlan.responseOptions.map((option: string) => 
              <Box display="flex" flexWrap="wrap" sx={{ mb: '8px' }}>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    borderColor: 'black', 
                    color: 'black', 
                    marginRight: '8px',
                    whiteSpace: 'nowrap',  // Ensure text does not wrap
                    textOverflow: 'ellipsis',  // Add ellipsis if text is too long
                    overflow: 'hidden', // Hide overflow
                    minWidth: '100px' // Optional: Set a minimum width for the button
                  }}
                >
                  <Typography 
                    fontFamily="BungeeShade" 
                    fontWeight="1000"
                    sx={{ 
                      fontSize: 'inherit', // Shrink font size if needed
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis' 
                    }}
                    noWrap // Prevent text wrapping
                  >
                    {option}
                  </Typography>
                </Button>
                <Box 
                  sx={{
                    height: '48px',
                    maxHeight: '48px',
                    width: '100%',  
                    backgroundColor: '#e0e0e0', // Slight background color for container
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    mt: '8px' // Space between the button and the chip container
                  }}>
                  {currentPlan.responses.filter((response: Response) => response.response === option).map((response) => {
                    const respondee = getPersonFromId(response.owner);
                    return (
                      <Chip
                        key={response.id}
                        avatar={<Avatar alt="Avatar" src={respondee?.pic} />}
                        label={<Typography variant="body2" noWrap> {respondee?.name.toLowerCase()} </Typography>}
                        variant="outlined"
                        sx={{ maxWidth: 200 }}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <IconButton onClick={handlePrevious} sx={{ color: 'black' }}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={handleNext} sx={{ color: 'black' }}>
              <ArrowForward />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default PlansViewer;
