import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Circle } from '@mui/icons-material';

type Node = {
  id: string;
  pic: string;
  x?: number;
  y?: number;
  status?: string;
  self?: boolean;
  foccused: boolean;
};

type Link = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

type Person = {
  id: number;
  name: string;
  groups: string[];
  pic: string;
  status: string;
  self?: boolean;
}

const Graph: React.FC<{
  network: Person[],
  focusGroup: string | null,
  focusColor: string | null
}> = ({
  network,
  focusGroup,
  focusColor
}) => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const [nodes, setNodes] = React.useState<Node[]>([]);
  const [textFieldDisabled, setTextFieldDisabled] = React.useState<boolean>(false);

  useEffect(() => {
    const fullWidth = window.parent.innerWidth;
    const height = window.parent.innerHeight;
    const width = 0.85 * fullWidth;
    const centerX = (fullWidth - width) + (width / 2);
    const centerY = height / 2;

    // console.log(`fullWidth: ${fullWidth}`)
    // console.log(`height: ${height}`)
    // console.log(`width: ${width}`)
    // console.log(`centerX: ${centerX}`)
    // console.log(`centerY: ${centerY}`)

    const data: GraphData = {
      nodes: network.map((person, index) => ({
        self: person.self,
        id: `node-${index}`,
        name: person.name,
        pic: person.pic,
        status: person.status,
        foccused: focusGroup ? (person.groups.includes(focusGroup)) : true
      })),

      links: [
        { source: 'node-0', target: 'node-1' },
        { source: 'node-0', target: 'node-2' },
        { source: 'node-0', target: 'node-3' },
        { source: 'node-0', target: 'node-4' },
      ]
    };

    // data.nodes.forEach((node) => {
    //   if (node.foccused) console.log(node.id)
    // })

    d3.select(ref.current).selectAll('*').remove();

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(data.links).id((d: any) => d.id).distance(220))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(centerX, centerY))
      // .force('collide', d3.forceCollide().radius(100));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke-width', 2);

    // Define the image pattern for nodes
    svg.append('defs')
      .selectAll('pattern')
      .data(data.nodes)
      .enter()
      .append('pattern')
      .attr('id', d => `pattern-${d.id}`)
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1)
      .append('image')
      .attr('xlink:href', d => d.pic)
      .attr('width', d => d.self ? 170 : 120)
      .attr('height', d => d.self ? 170 : 120);

    const nodesGroup = svg.append('g').attr('class', 'nodes');

    // Add circular nodes with image patterns
    const nodeCircles = nodesGroup
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', d => d.id === 'node-0' ? 85 : 60) // Adjust size for center node and others
      .attr('cx', d => d.x || centerX) // Center x-coordinate
      .attr('cy', d => d.y || centerY) // Center y-coordinate
      .style('fill', d => `url(#pattern-${d.id})`) // Apply image pattern as fill
      .style('stroke', d => d.foccused ? focusColor || 'black' : '#ddd') // Set border color
      .style('stroke-width', 3)
      .style('opacity', d => d.foccused ? 1 : 0.5); // Gray out non-focus nodes

    // Update node and link colors based on focus group
    const updateColors = () => {
      nodeCircles
        .style('fill', d => `url(#pattern-${d.id})`)
        .style('stroke', d => d.foccused ? focusColor || 'black' : '#ddd')
        .style('opacity', d => d.foccused ? 1 : 0.5);

      link
        .style('stroke', d => {
          const sourceNode = data.nodes.find(n => n.id === d.source.id);
          const targetNode = data.nodes.find(n => n.id === d.target.id);
          return sourceNode?.foccused === targetNode?.foccused ? (focusColor || '#000') : '#ddd';
        });
    };

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as any).x)
        .attr('y1', (d) => (d.source as any).y)
        .attr('x2', (d) => (d.target as any).x)
        .attr('y2', (d) => (d.target as any).y);

      nodeCircles
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      updateColors(); // Apply color updates

      // Update the nodes' positions in the state
      setNodes(data.nodes.map(node => ({ ...node, x: (node as any).x, y: (node as any).y })));
    });

  }, [focusGroup, focusColor, network]); // Add dependencies

  const handleSelfClick = () => {
    if (focusGroup) {
      // Are we currently focused on a group? If so, propose something
    } 
    // else {
    //   // If not, allow user to update status ---> Should always be able to update status
    //   setTextFieldDisabled(false)
    //   console.log("TEXT FIELD ENABLED")
    // }
  }

  return (
    <Box sx={{ position: 'relative', width: '85%', height: '100vh', border: '2px solid green' }}>
      <svg ref={ref}></svg>
      {nodes.map((node) => {
        return (
          <>
            <TextField
              contentEditable={node.self}
              value={node.status}
              key={node.id}
              sx={{
                position: 'absolute',
                top: `${node.y! - 90}px`,  // Positioning relative to each node
                left: `${node.x! + 60}px`,
                width: '200px',
                maxWidth: '150px',
              }}
              variant="outlined"
              placeholder="Type here..."
            />
            { node.self &&
              <Button 
                sx={{ 
                  position: 'absolute', 
                  top: `${node.y - 85}px`, 
                  left: `${node.x - 85}px`, 
                  width: '170px', 
                  height: '170px', 
                  border: '1px solid Pink',
                  borderRadius: '10px',
                }}
                onClick={handleSelfClick}
              />
            }
          </>
      )})}
    </Box>
  );
};

export default Graph;