import React, { useEffect, type FC } from 'react';
import { Graph, EdgeConfig, TreeGraphData, registerNode} from '@antv/g6';

export interface TreeNode {
  config: {
    name: string;
    version: string;
    author: string;
  };
  children?: TreeNode[];
}

export interface OrgTreeProps {
  data: TreeNode[];
  width?: number;
  height?: number;
}

const convertTreeToNodesAndEdges = (tree: TreeNode[]) => {
  const nodes: TreeGraphData[] = [];
  const edges: EdgeConfig[] = [];

  const traverse = (node: TreeNode, parentId?: string) => {
    const name = node.config.name;
    const nodeObj = { 
      id: name, 
      label: [name, node.config.version, node.config.author].join('\n'),
    };
    if (!nodes.some(n => n.id === nodeObj.id)) {
      nodes.push(nodeObj);
    }

    if (parentId) {
      edges.push({ source: parentId, target: name });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, name));
    }
  };

  tree.forEach((node) => traverse(node));

  return { nodes, edges };
};


const OrgTree: FC<OrgTreeProps> = (props) => {

  const defaultWidth = 1200;
  const defaultHeight = 600;

  const width = props.width || defaultWidth;
  const height = props.height || defaultHeight;

  useEffect(() => {
    const { nodes, edges } = convertTreeToNodesAndEdges(props.data);
    
    const graph = new Graph({
      container: 'container',
      width,
      height,

      animate: false,
      defaultNode: {
        size: [120, 60],
        type: 'rect',
        anchorPoints: [[0.5, 0], [0.5, 1]],
        style: {
          fill: '#C2C8D5',
        },
      },
      defaultEdge: {
        type: 'polyline',
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
        },
      },
      // fitView: true,
      layout: {
        type: 'dagre',
        rankdir: 'TB',
        nodesep: 40, // 可选
        ranksep: 20, // 可选
        controlPoints: true, // 可选
      },
    });
    graph.data({
      nodes,
      edges,
    });
    graph.render();

    graph.on('node:click', (event) => {
      const clickedNode = event.item;
      if (!clickedNode) return;
      const nodeModel = clickedNode.getModel();
      
      // Toggle selected state
      const isSelected = nodeModel.style?.stroke === '#F6BD16';
      
      // Update clicked node style
      graph.updateItem(clickedNode, {
        style: {
          ...nodeModel.style,
          fill: isSelected ? '#C2C8D5' : '#F6BD16',
          stroke: isSelected ? '#5B8FF9' : '#F6BD16',
          lineWidth: isSelected ? 1 : 2
        }
      });

      graph.layout();
    });

    // Clean up function
    return () => {
      graph.destroy();
    };
  }, [width, height, props.data]);

  return <div id="container" style={{ width, height }} />;
};

export default OrgTree;
