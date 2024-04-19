import React, { FC, PropsWithChildren, Suspense, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Close, Fullscreen, LocationOn } from '@mui/icons-material';

export type Marker = {
  x: number;
  y: number;
  title: string;
  type: string;
  image: string;
  description: string;
};

const MarkerInfo: FC<{ marker: Marker }> = ({ marker }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ContentWrapper = ({ children }: PropsWithChildren) => {
    return isExpanded ? (
      <Dialog open onClose={() => setIsExpanded(false)} maxWidth={false}>
        <Box sx={{ m: 1, p: 1 }}>{children}</Box>
      </Dialog>
    ) : (
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    );
  };

  return (
    <ContentWrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{marker.title}</Typography>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <Close /> : <Fullscreen />}
        </IconButton>
      </Stack>
      <Divider />
      <Box sx={{ maxHeight: isExpanded ? 'auto' : '35vh', overflow: 'auto' }}>
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
    </ContentWrapper>
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
