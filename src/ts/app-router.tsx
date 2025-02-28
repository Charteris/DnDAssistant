import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MonsterTable from './monsters/monster-table';
import EncounterGenerate from './encounters/encounter-generator';
import Mechanics from './mechanics/mechanics';
import SpellTable from './spells/spell-table';
import CampaignManager from './campaigns/campaign-manager';
import Header from './header';
import GearTable from './gear/gear';
import Vendor from './vendor/vendor';

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
          path: 'spells',
          element: <SpellTable />,
        },
        {
          path: 'gear',
          element: <GearTable />,
        },
        {
          path: 'vendor',
          element: <Vendor />,
        },
        {
          path: 'encounter',
          element: <EncounterGenerate />,
        },
        {
          path: 'campaign',
          element: <CampaignManager />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
