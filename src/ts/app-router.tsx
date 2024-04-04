import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MonsterTable from './monsters/monster-table';
import Header from './header';
import MonsterView from './monsters/monster-view';
import EncounterGenerate from './encounters/encounter-generator';
import Mechanics from './mechanics/mechanics';
import SpellTable from './spells/spell-table';
import SpellView from './spells/spell-view';
import Shop from './shop/shop';
import AvandriaMap from './campaigns/avandria-map';

const AppRouter = () => {
  const router = createHashRouter([
    {
      path: '/*',
      element: <Header />,
      children: [
        {
          path: '',
          element: <Mechanics />,
        },
        {
          path: 'monsters',
          element: <MonsterTable />,
        },
        {
          path: 'monsters/:name',
          element: <MonsterView />,
        },
        {
          path: 'encounter',
          element: <EncounterGenerate />,
        },
        {
          path: 'spells',
          element: <SpellTable />,
        },
        {
          path: 'spells/:name',
          element: <SpellView />,
        },
        {
          path: 'gear',
          element: <Shop />,
        },
        {
          path: 'campaign',
          element: <AvandriaMap />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
