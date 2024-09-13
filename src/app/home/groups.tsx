import { Box, Chip, Paper, Typography } from "@mui/material";
import React from "react";

type Group = {
  id: number;
  name: string;
  plans: Plans[];
  members: number[];
};

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

function getNumNotifications(group: Group, selfId: number) {
    // Initialize the counter for plans not responded to
    let count = 0;

    // Iterate through all plans in the group
    for (const plan of group.plans) {
      // Check if the person's ID is in any of the responses
      const hasResponded = plan.responses.some(response => response.id === selfId);
      if (!hasResponded) {
        count++; // Increment the count if the person has not responded
      }
    }
    
    return count; 
} 

const Groups: React.FC<{ 
  groups: Group[],
  selectedGroup: Group | null,
  setSelectedGroup: (selected: Group | null) => void
}> = ({ 
  groups,
  selectedGroup,
  setSelectedGroup 
}) => {

  const handleClick = (group: Group) => {
    setSelectedGroup(selectedGroup === group ? null : group); // Toggle chip selection
  };

  // Generate a unique set of chips from groups
  const chips = groups.map((group, index) => {
    const isSelected = selectedGroup === group;

    const numNotifications = getNumNotifications(group, 0)

    return (
      <Box
        key={`group-${index}`}
        sx={{
          position: 'relative',
          display: 'inline-block',
          margin: '4px',
        }}
      >
        <Chip
          label={group.name.toLowerCase()}
          clickable
          onClick={() => handleClick(group)}
          sx={{
            border: `2px solid ${isSelected ? 'black' : '#ccc'}`,
            backgroundColor: isSelected ? '#333' : 'transparent', // Darker gray when selected
            color: isSelected ? 'white' : 'black', // White text when selected
            '& .MuiChip-deleteIcon': {
              color: isSelected ? 'white' : 'black', // Icon color changes based on selection
            },
          }}
        />
        {numNotifications != 0 && <Box
          sx={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'red',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {numNotifications}
        </Box>}
      </Box>
    );
  });

  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100px', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',        // Fit within the parent column width
          maxHeight: '100px',    // Limit height to approximately three lines
          overflowY: 'auto',    // Enable vertical scrolling if content overflows
          padding: '8px',
        }}
      >
        {/* Box to contain chips */}
        <Box display="flex" flexWrap="wrap">
          {/* {chips} */}
          <Typography fontFamily="LibreCaslon">
            <Box component="span" sx={{ fontFamily: 'Bungee' }}>
              groups
            </Box>{' '}
            coming soon!
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Groups;
