# TalentPanel

This is an example component.

```jsx
import { TalentPanel } from '@polymita/component-basic';

export default () => <TalentPanel  
  onClick={(n) => {
    console.log(n)
  }}
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
            author: 'Jane Smith',
            settings: [
              {
                path: 'a.b.c',
                label: '配置名',
                value: '123'
              }
            ]
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
