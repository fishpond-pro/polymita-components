# OrgTree

This is an example component.

```jsx
import { OrgTree } from '@polymita/basic';

export default () => <OrgTree  
  data={[
    {
      id: '1',
      type: 'rect',
      config: { 
        name: 'CEO',
        version: '@1.0',
        author: 'John Doe'
      },
      children: [
        {
          id: '2',
          config: { 
            name: 'CTO',
            version: '@1.0',
            author: 'Jane Smith'
          },
          children: [
            {
              id: '4',
              config: { 
                name: 'Senior Developer',
                version: '@1.0',
                author: 'Bob Johnson'
              }
            }
          ]
        },
        {
          id: '3',
          config: { 
            name: 'CFO',
            version: '@1.0',
            author: 'Alice Brown'
          },
          children: [
            {
              id: '4',
              config: { 
                name: 'Senior Developer',
                version: '@1.0',
                author: 'Charlie Davis'
              }
            }
          ]
        },
        {
          id: '5',
          config: { 
            name: 'Master',
            version: '@1.0',
            author: 'Eva Wilson'
          },
          children: [
            {
              id: '4',
              config: { 
                name: 'Senior Developer',
                version: '@1.0',
                author: 'Frank Miller'
              }
            }
          ]
        }
      ]
    }
  ]}
/>
