/**
 * Defines the default pages
 * @author Lachlan Charteris
 */

export type Page = {
  label: string;
  name: string;
  path: string;
};

const pages: Page[] = [{ label: 'monsters', name: 'Monsters', path: '/' }];

export { pages };
