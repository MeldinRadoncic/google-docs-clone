"use client";

import {
  useState,
  useRef,
} from "react";
import { BiSolidDownArrow } from "react-icons/bi";

// Define the markers for the ruler component
const markers = Array.from(
  { length: 82 },
  (_, i) => i,
);

export const Ruler = () => {
  // Define the state for the left and right margin
  const [leftMargin, setLeftMargin] =
    useState(56);
  const [rightMargin, setRightMargin] =
    useState(56);
  // Define the state for dragging the left and right markers
  const [
    isDraggingLeft,
    setIsDraggingLeft,
  ] = useState(false);
  const [
    isDraggingRight,
    setIsDraggingRight,
  ] = useState(false);
  // Create a reference for the ruler component
  const rulerRef =
    useRef<HTMLDivElement>(null);

  // Define the event handlers for the mouse events
  const handleLeftMouseDown = () =>
    setIsDraggingLeft(true);
  const handleRightMouseDown = () =>
    setIsDraggingRight(true);

  // Define the event handlers for the mouse events
  const handleMouseMove = (
    e: MouseEvent,
  ) => {
    if (
      (isDraggingLeft ||
        isDraggingRight) &&
      rulerRef.current
    ) {
      const container =
        rulerRef.current.querySelector(
          "#ruler-container",
        );
      if (container) {
        const containerRect =
          container.getBoundingClientRect();
        const relativeX =
          e.clientX -
          containerRect.left;
        const rawPosition = Math.max(
          0,
          Math.min(
            containerRect.width,
            relativeX,
          ),
        );

        if (isDraggingLeft) {
          const maxLeftPosition =
            816 - rightMargin - 100;
          setLeftMargin(
            Math.min(
              rawPosition,
              maxLeftPosition,
            ),
          );
        } else if (isDraggingRight) {
          const maxRightPosition =
            816 - (leftMargin + 100);
          const newRightPosition =
            Math.max(
              816 - rawPosition,
              0,
            );
          setRightMargin(
            Math.min(
              newRightPosition,
              maxRightPosition,
            ),
          );
        }
      }
    }
  };

  // Define the event handlers for the mouse events
  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = (
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    setLeftMargin(56);
  };

  // Define the event handlers for the mouse events
  const handleDoubleClickRight = (
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className='h-6 border-b border-gray-300 w-[816px] mx-auto flex items-end relative select-none print:hidden'>
      <div
        id='ruler-container'
        className='w-[816px] h-full relative mx-auto'>
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={
            handleLeftMouseDown
          }
          onDoubleClick={
            handleLeftDoubleClick
          }
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={
            handleRightMouseDown
          }
          onDoubleClick={
            handleDoubleClickRight
          }
        />
        <div className='absolute inset-x-0 bottom-0 h-full'>
          <div className='relative h-full w-[816px]'>
            {markers.map((marker) => {
              const position =
                (marker * 816) / 82;
              const isMajorTick =
                marker % 10 === 0;
              const isMidTick =
                marker % 5 === 0 &&
                !isMajorTick;
              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{
                    left: `${position}px`,
                  }}>
                  {isMajorTick && (
                    <>
                      <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500' />
                      <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 +
                          1}
                      </span>
                    </>
                  )}
                  {isMidTick && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {!isMajorTick &&
                    !isMidTick && (
                      <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft?: boolean;
  isDragging?: boolean;
  onMouseDown?: (
    e: React.MouseEvent,
  ) => void;
  onDoubleClick?: (
    e: React.MouseEvent,
  ) => void;
}

// Define the Marker component for the ruler component
const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group-ml-2'
      style={{
        [isLeft
          ? "left"
          : "right"]: `${position}px`,
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}>
      <BiSolidDownArrow className='absolute top-0 left-1/2 h-full fill-blue-500 transform -translate-x-1/2' />
      <div
        className='absolute top-4 left-1/2'
        style={{
          height: "calc(100vh - 8px)",
          width: "2px",
          backgroundColor: "#2563EB",
          transform: "scaleX(0.5)",
          display: isDragging
            ? "block"
            : "none",
        }}
      />
    </div>
  );
};
