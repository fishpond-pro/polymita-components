import React, { FC, useState } from 'react';
import { OrgTreeProps, TreeNode } from '../OrgTree';
import OrgTree from '../OrgTree';
import { TextField, Button } from '@mui/material';

export interface TalentPanelProps extends Omit<OrgTreeProps, 'onNodeClick'> {
  // Additional props specific to TalentPanel can be added here
}

const Dialog = (props: {
  selectedNode: TreeNode
  onClose: () => void
}) => {
  const { selectedNode, onClose } = props
  return (
    <div
      style={{
        borderRadius: '10px',
        position: 'fixed',
        top: 30,
        right: '30px',
        bottom: 30,
        width: '600px', // Adjust the width as needed
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        zIndex: 1000,
        boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '0 20px',
          boxSizing: 'border-box',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h2>Node Details</h2>
        <form>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
              label="Name"
              value={selectedNode?.config.name || ''}
              disabled
              style={{ flex: 1, marginRight: '10px' }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Version"
              value={selectedNode?.config.version || ''}
              disabled
              style={{ flex: 1, marginRight: '10px' }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Author"
              value={selectedNode?.config.author || ''}
              disabled
              style={{ flex: 1 }}
              margin="normal"
              variant="outlined"
            />
          </div>
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          style={{ marginTop: '20px' }}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

const TalentPanel: FC<TalentPanelProps> = (props) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const handleNodeClick = (node: TreeNode | null) => {
    setSelectedNode(node);
    setSelectedNodeId(node?.config.name || '');
  };

  return (
    <>
      <OrgTree 
        {...props} 
        onClick={handleNodeClick}
        selectedId={selectedNodeId}
        onChangeSelectedId={setSelectedNodeId}
      />
      {!!selectedNode && (
        <Dialog 
          key={selectedNode?.config?.name}
          selectedNode={selectedNode}
          onClose={() => {
            setSelectedNode(null)
            setSelectedNodeId('')
          }}
        />
      )}
    </>
  );
};

export default TalentPanel;
