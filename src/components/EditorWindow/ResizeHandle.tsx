import React from 'react';
import type { ResizeHandleProps } from './types';

const directionToStyles = {
  n: "absolute top-0 left-0 right-0 h-2 cursor-n-resize",
  s: "absolute left-0 right-0 bottom-0 h-2 cursor-s-resize",
  e: "absolute top-0 right-0 bottom-0 w-2 cursor-e-resize",
  w: "absolute top-0 left-0 bottom-0 w-2 cursor-w-resize",
  ne: "absolute top-0 right-0 w-6 h-6 cursor-ne-resize",
  nw: "absolute top-0 left-0 w-6 h-6 cursor-nw-resize",
  se: "absolute right-0 bottom-0 w-6 h-6 cursor-se-resize",
  sw: "absolute left-0 bottom-0 w-6 h-6 cursor-sw-resize",
};

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onResizeStart }) => (
  <div
    className={directionToStyles[direction]}
    onMouseDown={(e) => onResizeStart(e, direction)}
  />
);