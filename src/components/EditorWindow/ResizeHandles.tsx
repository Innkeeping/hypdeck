import React from 'react';

interface ResizeHandlesProps {
  onResize: (e: React.MouseEvent, direction: string) => void;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResize }) => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
        onMouseDown={(e) => onResize(e, 'nw')}
      />
      <div
        className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
        onMouseDown={(e) => onResize(e, 'ne')}
      />
      <div
        className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
        onMouseDown={(e) => onResize(e, 'sw')}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
        onMouseDown={(e) => onResize(e, 'se')}
      />
      <div
        className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 cursor-n-resize"
        onMouseDown={(e) => onResize(e, 'n')}
      />
      <div
        className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 cursor-s-resize"
        onMouseDown={(e) => onResize(e, 's')}
      />
      <div
        className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 cursor-w-resize"
        onMouseDown={(e) => onResize(e, 'w')}
      />
      <div
        className="absolute top-1/2 right-0 w-2 h-2 -translate-y-1/2 cursor-e-resize"
        onMouseDown={(e) => onResize(e, 'e')}
      />
    </>
  );
};