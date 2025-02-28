/**
 * Defines the default pages
 * @author Lachlan Charteris
 */

export type Page = {
  label: string;
  name: string;
  path: string | Page[];
};

const pages: Page[] = [
  {
    label: 'resources',
    name: 'Resources',
    path: [
      { label: 'guides', name: 'Player Guides', path: '/' },
      { label: 'monsters', name: 'Monster Index', path: '/monsters' },
      { label: 'spells', name: 'Spell Index', path: '/spells' },
      { label: 'vendor', name: 'Gear Index', path: '/gear' },
    ],
  },
  {
    label: 'utilities',
    name: 'Utilities',
    path: [
      { label: 'encounter', name: 'Encounters', path: '/encounter' },
      { label: 'vendor', name: 'Vendor', path: '/vendor' },
    ],
  },
  { label: 'campaign', name: 'Campaign', path: '/campaign' },
];

export { pages };
