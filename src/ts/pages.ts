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
  { label: 'mechanics', name: 'Mechanics', path: '/' },
  { label: 'monsters', name: 'Monsters', path: '/monsters' },
  { label: 'encounter', name: 'Encounters', path: '/encounter' },
  { label: 'spells', name: 'Spells', path: '/spells' },
];

export { pages };
