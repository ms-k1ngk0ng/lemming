// pages/signup.tsx
"use client";

import React from 'react';
import { Box, Chip } from '@mui/material';
import * as d3 from 'd3';
import Graph from './graph';
import Actions from './actions';

type Person = {
  id: number;
  name: string;
  groups: string[];
  pic?: string;
  status?: string;
  self?: boolean;
}

type Group = {
  id: number,
  name: string,
  plans: Plans[]
}

type Plans = {
  id: number;
  owner: string;
  plan: string;
  responseOptions: string[];
  responses: Responses[];
}

type Responses = {
  id: number,
  owner: string
  response: string
}

function generateRandomHexColor(): string {
  // Generate a random number between 0 and 16777215 (0xFFFFFF)
  const randomNumber = Math.floor(Math.random() * 0xFFFFFF);
  
  // Convert the number to a hexadecimal string and pad with zeros if necessary
  const hexColor = `#${randomNumber.toString(16).padStart(6, '0')}`;
  
  return hexColor;
}

export default function Home() {

  const [sampleGroups, setSampleGroups] = React.useState<Group[]>([
    { id: 0, name: "Jackson", plans: []}
  ])

  const [samplePeople, setSamplePeople] = React.useState<Person[]>([
    { id: 0, name: "John", groups: ["Jackson"], pic: "/profile.png", status: "", self: true},
    { id: 1, name: 'Caroline', groups: [], pic: '/caroline.JPG', status: 'Vaping' },
    { id: 2, name: 'Javi', groups: ["Jackson"], pic: '/javi.JPG', status: 'Simping in SF', },
    { id: 3, name: 'Toast', groups: [], pic: '/toast.jpeg', status: 'Going to Gold Hill', },
    { id: 4, name: 'Ally', groups: ["Jackson"], pic: '/ally.JPG', status: 'Staying in + taking vitamins', }
  ])

  const [selectedChip, setSelectedChip] = React.useState<string | null>(null);
  const [selectedChipColor, setSelectedChipColor] = React.useState<string | null>(null);

  const handleClick = (chip: string, color: string) => {
    if (selectedChip) {
      setSelectedChip(null)
      setSelectedChipColor(null)
    } else {
      setSelectedChip(chip);
      setSelectedChipColor(color)
    }
  };

  return (
    <Box display="flex" flexDirection="row" sx={{ height: '100vh', width: '100%', border: '2px solid purple' }}>
      <Box display="flex" flexDirection="column" sx={{ height: '100vh', width: '15%', border: '3px solid red' }}>
        <div>HOMEPAGE</div>  
        <Actions network={samplePeople} setNetwork={setSamplePeople} focusGroup={selectedChip}/>
        {samplePeople.flatMap(person => person.groups).filter((value, index, self) => self.indexOf(value) === index).map(group => {
          const generatedColor = generateRandomHexColor()

          return (
            <Chip
              clickable
              key={group}
              label={group}
              onClick={() => handleClick(group, generatedColor)}
              sx={{
                margin: '4px',
                color: generatedColor,
                backgroundColor: selectedChip === group ? 'lightblue' : 'default',
                border: selectedChip === group ? '2px solid blue' : 'none',
              }}
            />
          )}
        )}
      </Box>
      <Graph network={samplePeople} focusGroup={selectedChip} focusColor={selectedChipColor}/>
    </Box>
  )
}