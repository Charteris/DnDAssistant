/**
 * Defines the default pages
 * @author Lachlan Charteris
 */

export type Page = {
  label: string;
  name: string;
  path: string;
};

const pages: Page[] = [
  { label: 'monsters', name: 'Monsters', path: '/monsters' },
  { label: 'encounter', name: 'Encounters', path: '/encounter' },
  { label: 'spells', name: 'Spells', path: '/spells' },
  { label: 'shop', name: 'Gear', path: '/gear' },
  { label: 'campaign', name: 'Campaign', path: '/campaign' },
];

export { pages };
