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
      id: 'tech-stack',
      label: 'Tech Stack',
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation',
    },
    {
      type: 'doc',
      id: 'development',
      label: 'Development Guide',
    },
  ],
};

export default sidebars; 