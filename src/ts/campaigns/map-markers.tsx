import React, { FC, Suspense } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';

export type Marker = {
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
          <Suspense fallback={<Skeleton animation="wave" variant="rounded" />}>
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
          </Suspense>
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

const MapWithMarkers: FC<{
  sourceMap: string;
  markers: Marker[];
  scale: number;
}> = ({ sourceMap, markers, scale }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <img src={sourceMap} alt="Map Of Avandria" />
      {markers.map((marker) => (
        <MarkerIcon marker={marker} scale={scale} />
      ))}
    </div>
  );
};

export default MapWithMarkers;
