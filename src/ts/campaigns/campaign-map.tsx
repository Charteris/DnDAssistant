import React, { FC, Suspense, lazy, useState } from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import { Box, Skeleton } from '@mui/material';
import { Marker } from './map-markers';

const MapWithMarkers = lazy(() => import('./map-markers'));
type MapProperties = {
  map: string;
  mapWidth: number;
  mapHeight: number;
  markers: Marker[];
};

const CampaignMap: FC<{
  campaignMap: string;
  mapProperties: MapProperties;
}> = ({ campaignMap, mapProperties }) => {
  const [mapTransforms, setMapTransforms] = useState({
    scale: 0.1,
    translation: { x: 0, y: 0 },
  });

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        height: '70vh',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <MapInteractionCSS
        showControls
        defaultValue={mapTransforms}
        onChange={setMapTransforms}
        minScale={0.01}
        maxScale={3}
        sx={{ flexGrow: 1 }}
      >
        <Suspense fallback={<Skeleton animation="wave" variant="rounded" />}>
          <MapWithMarkers
            sourceMap={campaignMap}
            markers={mapProperties.markers}
            scale={mapTransforms.scale}
          />
        </Suspense>
      </MapInteractionCSS>
    </Box>
  );
};

export default CampaignMap;
