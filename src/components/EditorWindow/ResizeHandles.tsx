import React from 'react';

interface ResizeHandlesProps {
  onResize: (e: React.MouseEvent, direction: string) => void;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ onResize }) => (
  <>
    <div className="absolute top-0 right-0 bottom-0 w-2 cursor-e-resize"
         onMouseDown={(e) => onResize(e, 'e')} />
    <div className="absolute left-0 right-0 bottom-0 h-2 cursor-s-resize"
         onMouseDown={(e) => onResize(e, 's')} />
    <div className="absolute right-0 bottom-0 w-6 h-6 cursor-se-resize"
         onMouseDown={(e) => onResize(e, 'se')} />
    <div className="absolute left-0 bottom-0 w-6 h-6 cursor-sw-resize"
         onMouseDown={(e) => onResize(e, 'sw')} />
    <div className="absolute top-0 left-0 bottom-0 w-2 cursor-w-resize"
         onMouseDown={(e) => onResize(e, 'w')} />
    <div className="absolute top-0 left-0 right-0 h-2 cursor-n-resize"
         onMouseDown={(e) => onResize(e, 'n')} />
    <div className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize"
         onMouseDown={(e) => onResize(e, 'ne')} />
    <div className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize"
         onMouseDown={(e) => onResize(e, 'nw')} />
  </>
);