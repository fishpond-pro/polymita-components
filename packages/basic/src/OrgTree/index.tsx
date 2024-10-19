import React, { useEffect, useRef, type FC } from 'react';
import { Graph, EdgeConfig, TreeGraphData, registerNode, Item} from '@antv/g6';

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
  onClick?: (node: TreeNode | null) => void;

  selectedId?: string;
  onChangeSelectedId?: (nodeId: string) => void;

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

const traverse = (nodes: TreeNode[], targetId: string): TreeNode | null => {
  for (const node of nodes) {
    if (node.config.name === targetId) {
      return node;
    }
    if (node.children) {
      const found = traverse(node.children, targetId);
      if (found) return found;
    }
  }
  return null;
};


const OrgTree: FC<OrgTreeProps> = (props) => {

  const defaultWidth = 1200;
  const defaultHeight = 600;

  const width = props.width || defaultWidth;
  const height = props.height || defaultHeight;

  const { selectedId, onChangeSelectedId } = props;

  const graphRef = useRef<Graph | null>(null);

  const selectedIdRef = useRef<string>('');

  const updateSelectStyle = (selectedId?: string) => {
    const graph = graphRef.current;
    if (!graph) return;

    const prevSelectedNode = graph.findById(selectedIdRef.current);
    if (prevSelectedNode) {
      graph.updateItem(prevSelectedNode, {
        style: {
          lineWidth: 1
        }
      });
    }
    selectedIdRef.current = selectedId || '';

    if (!selectedId) return;

    const node = graph.findById(selectedId);
    if (node) {
      graph.updateItem(node, {
        style: {
          // fill: '#C2C8D5',
          stroke: '#5B8FF9',
          lineWidth: 4
        }
      });
    }

    graph.layout();
  }


  
  const changeSelectedNode = (clickedNode: Item) => {
    const graph = graphRef.current;
    if (!graph) return;

    const node = traverse(props.data, clickedNode.getModel().id as string);
    if (node) {
      props.onClick?.(node);
    }
  }

  useEffect(() => {
    updateSelectStyle(selectedId);
  }, [selectedId]);

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

      modes: {
        default: ['drag-canvas', ],
      },
    });
    graph.data({
      nodes,
      edges,
    });
    graph.render();

    graphRef.current = graph;

    graph.on('node:click', (event) => {
      const clickedNode = event.item;
      if (!clickedNode) return;

      updateSelectStyle(clickedNode.getModel().id as string);

      changeSelectedNode(clickedNode);

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
