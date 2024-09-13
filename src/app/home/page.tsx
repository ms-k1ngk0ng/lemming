// pages/signup.tsx
"use client";

import React from 'react';
import { Box, Button, Chip, Paper, TextField, Typography } from '@mui/material';
import Actions from './actions';
import Groups from './groups';
import PlansViewer from './plans';
import Graph from './graph';


// type Group = {
//   id: number,
//   name: string,
//   plans: Plans[]
//   members: number[]
// }

// type Plans = {
//   id: number;
//   owner: number;
//   plan: string;
//   responseOptions: string[];
//   responses: Response[];
//   invitees: number[];
// }

// type Response = {
//   id: number,
//   owner: number,
//   response: string
// }

export default function Home() {

  const [sampleGroups, setSampleGroups] = React.useState<Group[]>([
    { id: 0, name: "Jackson", plans: [], members: []},
    { id: 1, name: "Gold Hill Inn", plans: [
      {
        id: 0,
        owner: 0,
        plan: "Weekend Brunch Meetup, 10 AM 9/16 @ Gold Hill Inn",
        responseOptions: [
          "I'll be there",
          "Can't make it"
        ],
        responses: [{
          id: 0,
          owner: 1,
          response: "I'll be there"
        },
        {
          id: 1,
          owner: 3,
          response: "I'll be there"
        }],
        invitees: [0, 1, 2, 3]
      },
      {
        id: 1,
        owner: 1,
        plan: "Gold Hill Inn Trivia Night, 7 PM 9/17",
        responseOptions: [
          "Participating",
          "Not interested"
        ],
        responses: [{
          id: 0,
          owner: 1,
          response: "Participating"
        },
        {
          id: 1,
          owner: 3,
          response: "Not interested"
        }],
        invitees: [0, 1, 2, 3]
      },
      {
        id: 2,
        owner: 2,
        plan: "Live Music Event, 8 PM 9/18 @ Gold Hill Inn",
        responseOptions: [
          "Looking forward to it",
          "Pass"
        ],
        responses: [
          {
            id: 0,
            owner: 0,
            response: "Pass"
          }
        ],
        invitees: [0, 1, 2, 3]
      }
    ], members: [
      0, 1, 2, 3, 4
    ]},
    { id: 2, name: "Fred Again Concert", plans: [], members: []},
    { id: 3, name: "Monday Night Volleyball", plans: [
      {
        id: 0,
        owner: 0,
        plan: "First Night of League, 7 PM 9/15 @ Dive",
        responseOptions: [
          "I'll be there",
          "You need to find a sub"
        ],
        responses: [],
        invitees: [ 3 ]
      }
    ],
    members: []}  
  ])

  const [sampleUser, setSampleUser] = React.useState<Person>(
    { id: 0, name: "John", groups: ["Jackson"], pic: "/profile.png", status: "", self: true},
  )

  const [samplePeople, setSamplePeople] = React.useState<Person[]>([
    { id: 1, name: 'Caroline', groups: [], pic: '/caroline.JPG', status: 'Vaping' },
    { id: 2, name: 'Javi', groups: ["Jackson"], pic: '/javi.JPG', status: 'Simping in SF', },
    { id: 3, name: 'Toast', groups: [], pic: '/toast.jpeg', status: 'Going to Gold Hill', },
    { id: 4, name: 'Ally', groups: ["Jackson"], pic: '/ally.JPG', status: 'Staying in + taking vitamins', }
  ])

  const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null);

  return (
    <Box display="flex" sx={{ height: '100vh', width: '100%' }}>
      <Box display="flex" flexDirection="column" sx={{ pl: '20px', pr: '20px', pt: '10px', pb: '10px', height: '100vh', width: '395px' }}>
        <Typography           
          variant="h4" 
          gutterBottom 
          sx={{         
            fontFamily: 'BungeeShade', 
            fontSize: '60px', 
            color: 'black',
            width: 'fit-content',
          }}>
          LEMMING
        </Typography>  
        <Groups groups={sampleGroups} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>
        {(selectedGroup != null && selectedGroup.plans.length != 0) ?
           <PlansViewer plans={selectedGroup?.plans || []} people={samplePeople}/> :
           <Box
            sx={{
              width: '100%',
              maxWidth: '700px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px', // Adjust the gap between elements
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: '100%',
                overflowY: 'auto',
                padding: '16px', // Increase padding for more space inside Paper
              }}
            >
              <Typography
                variant="h6"
                sx={{ 
                  fontFamily: 'Jost',
                  marginBottom: '16px' // Space between the title and the TextField
                }}
              >
                what are you getting up to this evening?
              </Typography>
              
              <TextField
                multiline
                rows={3}
                placeholder="Type your plans..."
                variant="outlined"
                sx={{
                  width: '100%',
                  backgroundColor: '#f7f7f7',
                  marginBottom: '24px', // Space between the TextField and the Button
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'black', // Border color when hovered
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black', // Border color when focused
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'black', // Default text color
                  },
                  '& .Mui-focused .MuiInputBase-input': {
                    color: 'black', // Text color when typing (focused)
                  },
                }}
              />              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                  }}>
                  <Typography 
                    fontFamily="Bungee" 
                    fontWeight="1000"
                    sx={{ 
                      fontSize: 'inherit', // Shrink font size if needed
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis' 
                    }}
                    noWrap // Prevent text wrapping
                  >
                    save
                  </Typography>
                </Button>
              </Box>
            </Paper>
          </Box>
          }
        {/* <Box sx={{ mt: 'auto' }}> 
          <Actions network={samplePeople} setNetwork={setSamplePeople} focusGroup={selectedGroup} />
        </Box> */}
      </Box>
      <Box
        sx={{
          height: '100vh', // Full view height
          width: '10px', // Full width
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          overflow: 'hidden', // Prevent overflow
          fontFamily: "BungeeShade",
          fontSize: '1.2rem', // Adjust font size as needed
          whiteSpace: 'nowrap', // Prevent text wrapping
          flexDirection: 'column', // Align items vertically
        }}
      >
        {Array(50).fill('|').map((letter, index) => (
          <span key={index}>{letter}</span> // Repeats the letter 'A' vertically
        ))}
      </Box>
      <Box sx={{ flex: 1 }} >
        <Graph user={sampleUser} network={samplePeople} groups={sampleGroups} focusGroup={selectedGroup?.name} />
      </Box>
    </Box>
  )
}