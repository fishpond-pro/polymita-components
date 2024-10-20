import React, { FC, useState } from 'react';
import { OrgTreeProps, TreeNode } from '../OrgTree';
import OrgTree from '../OrgTree';
import { TextField, Button } from '@mui/material';

export interface TalentPanelProps extends Omit<OrgTreeProps, 'onNodeClick'> {
  // Additional props specific to TalentPanel can be added here
  onSubmit: (data: Record<string, string>) => void
  onOverride: () => void
}

const Dialog = (props: {
  selectedNode: TreeNode
  onSubmit: (data: Record<string, string>) => void
  onOverride: () => void
}) => {
  const { selectedNode, onSubmit, onOverride } = props

  const settings = selectedNode.config.settings || [];

  const [formData, setFormData] = useState<Record<string, string>>(
    settings.reduce((acc, setting) => {
      acc[setting.path] = setting.value;
      return acc;
    }, {} as Record<string, string>)
  );

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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

          {settings.map((setting) => (
            <div key={setting.path} style={{ width: '100%' }}>
              <TextField 
                label={setting.label || setting.path} 
                value={formData[setting.path] || ''} 
                style={{ flex: 1 }} 
                margin="normal" 
                variant="outlined" 
                onChange={(e) => {
                  setFormData({ ...formData, [setting.path]: e.target.value });
                }}
              />
            </div>
          ))}
        </form>

        <div style={{
          marginTop: '20px',
          display: 'flex', 
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onOverride}
          >
            Override
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSubmit(formData)
            }}
          >
            Submit
          </Button>
        </div>
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

  const closeDialog = () => {
    setSelectedNode(null)
    setSelectedNodeId('')
  }

  const handleSubmit = (data: Record<string, string>) => {
    closeDialog()
    props.onSubmit(data)
  }

  const handleOverride = () => {
    closeDialog()
    props.onOverride()
  }

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
          onSubmit={handleSubmit}
          onOverride={handleOverride}
        />
      )}
    </>
  );
};

export default TalentPanel;
