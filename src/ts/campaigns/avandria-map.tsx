import React, { FC, useCallback, useState } from 'react';
import MapOfAvandria from '../../res/talesOfAvandria/Avandria.png';
import MapProperties from '../../res/talesOfAvandria/Avandria.json';
import { MapInteractionCSS } from 'react-map-interaction';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

type Marker = {
  x: number;
  y: number;
  title: string;
  type: string;
  image: string;
  description: string;
};

const MarkerInfo: FC<{ marker: Marker }> = ({ marker }) => {
  return (
    <Card sx={{ m: 0, p: 0 }}>
      <CardContent>
        <Typography variant="h5">{marker.title}</Typography>
        <Divider />
        <Box sx={{ maxHeight: '35vh', overflow: 'auto' }}>
          <CardMedia
            component="img"
            src={require(`../../res/talesOfAvandria/settlements/${marker.image}`)}
            alt={marker.image}
            sx={{
              width: '100%',
              aspectRatio: '1/1',
              objectFit: 'contain',
              backgroundColor: 'secondary',
            }}
          />
          <Typography variant="subtitle2">{marker.type}</Typography>
          <Typography variant="subtitle1">{marker.description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const MarkerIcon: FC<{
  marker: Marker;
  scale: number;
}> = ({ marker, scale }) => {
  const top = marker.y;
  const left = marker.x;

  return (
    <div style={{ position: 'absolute', top, left }}>
      <Tooltip title={<MarkerInfo marker={marker} />}>
        <LocationOn
          sx={{ transform: `scale(${1 / (2 * scale)})`, color: 'black' }}
        />
      </Tooltip>
    </div>
  );
};

const AvandriaMap = () => {
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
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <img src={MapOfAvandria} alt="Map Of Avandria" />
          {MapProperties.markers.map((marker) => (
            <MarkerIcon marker={marker} scale={mapTransforms.scale} />
          ))}
        </div>
      </MapInteractionCSS>
    </Box>
  );
};

export default AvandriaMap;
