import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';

type Node = {
  id: string;
  x?: number;
  y?: number;
  pic?: string;
  user: boolean;
  status?: string;
  focused: boolean;
};

type Link = {
  source: string;
  target: string;
};

type GraphData = {
  nodes: Node[];
  links: Link[];
};

const Graph: React.FC<{
  user: Person,
  groups: Group[],
  network: Person[],
  focusedGroup: number,
}> = ({
  user,
  groups,
  network,
  focusedGroup,
}) => {

  const svgRef = useRef<SVGSVGElement | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);

  useEffect(() => {

    if (!layoutRef.current || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const layout = layoutRef.current;

    const data: GraphData = {
      nodes: network.map((person) => ({
        id: `node-${person.id}`,
        pic: person.pic,
        status: person.status,
        focused: true,
        user: false
      })).concat([{
        id: `node-${user.id}`,
        pic: user.pic,
        status: user.status,
        focused: true,
        user: true
      }]),
      links: network.map((person) => ({
        source: `node-${user.id}`,
        target: `node-${person.id}`
      }))
    };

    const updateSVGSize = (graphData: GraphData) => {
      const width = layout.clientWidth;
      const height = layout.clientHeight;

      svg.attr('width', width).attr('height', height);

      svg.selectAll('*').remove();  // Clear previous content

      const svgGroup = svg.append('g');

      const zoom = d3.zoom().on('zoom', (event) => {
        svgGroup.attr('transform', event.transform);
        setZoomTransform(event.transform);  // Update zoom transform
      });

      svg.call(zoom);

      const simulation = d3.forceSimulation(graphData.nodes as d3.SimulationNodeDatum[])
        .force('link', d3.forceLink(graphData.links).id((d: any) => d.id).distance(220))
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svgGroup.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graphData.links)
        .enter()
        .append('line')
        .attr('stroke-width', 2);

      svgGroup.append('defs')
        .selectAll('pattern')
        .data(graphData.nodes)
        .enter()
        .append('pattern')
        .attr('id', d => `pattern-${d.id}`)
        .attr('patternUnits', 'objectBoundingBox')
        .attr('width', 1)
        .attr('height', 1)
        .append('image')
        .attr('xlink:href', d => d.pic || '')
        .attr('width', d => d.user ? 170 : 120)
        .attr('height', d => d.user ? 170 : 120);

      const nodesGroup = svgGroup.append('g').attr('class', 'nodes');

      const nodeCircles = nodesGroup
        .selectAll('circle')
        .data(graphData.nodes)
        .enter()
        .append('circle')
        .attr('r', d => d.user ? 85 : 60)
        .style('fill', d => `url(#pattern-${d.id})`)
        .style('stroke', d => d.focused ? 'black' : '#ddd')
        .style('stroke-width', 2)
        .style('opacity', d => d.focused ? 1 : 0.5);

      const updateColors = () => {
        nodeCircles
          .style('fill', d => `url(#pattern-${d.id})`)
          .style('stroke', d => d.focused ? 'black' : '#ddd')
          .style('opacity', d => d.focused ? 1 : 0.5);

        link
          .style('stroke', d => {
            const sourceNode = graphData.nodes.find(n => n.id === d.source);
            const targetNode = graphData.nodes.find(n => n.id === d.target);
            return sourceNode?.focused === targetNode?.focused ? '#000' : '#ddd';
          });
      };

      updateColors();

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => (d.source as any).x)
          .attr('y1', (d) => (d.source as any).y)
          .attr('x2', (d) => (d.target as any).x)
          .attr('y2', (d) => (d.target as any).y);

        nodeCircles
          .attr('cx', (d: any) => d.x)
          .attr('cy', (d: any) => d.y);

        setNodes(graphData.nodes.map(node => ({ ...node, x: (node as any).x, y: (node as any).y })));
      });
    };

    updateSVGSize(data);

  }, [network, user, focusedGroup]);

  return (
    <Box ref={layoutRef} sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <svg ref={svgRef}/>
      {nodes.filter((node) => node.status && node.status.length > 0).map((node) => (
        <Chip
          key={node.id}
          label={
            <span style={{ whiteSpace: 'pre-line', wordWrap: 'break-word', color: node.focused ? 'white' : 'black' }}> {node.status?.toLowerCase()} </span>
          }
          sx={{
            border: node.focused ? 'black' : 'white',
            position: 'absolute',
            top: `${(zoomTransform.applyY(node.y || 0)) + 30}px`,
            left: `${(zoomTransform.applyX(node.x || 0)) + 25}px`,
            width: '100px',
            maxWidth: '100px',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            backgroundColor: node.focused ? 'black' : 'white',
            height: 'auto',
            '& .MuiChip-label': {
              display: 'block',
              whiteSpace: 'normal',
            },
          }}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default Graph;
