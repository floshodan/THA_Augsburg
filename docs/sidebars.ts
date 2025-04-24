import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'architecture',
      label: 'Architecture',
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation Guide',
    },
    {
      type: 'doc',
      id: 'api',
      label: 'API Documentation',
    },
  ],
};

export default sidebars; 