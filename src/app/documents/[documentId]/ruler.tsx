import React from 'react';

// Define the markers for the ruler component
const markers = Array.from({ length: 82 }, (_, i) => i);

export const Ruler = () => {
  return (
    <div className="h-6 border-b border-gray-300 w-[816px] mx-auto flex items-end relative select-none print:hidden">
      <div id="ruler-container" className="w-[816px] h-full relative mx-auto">
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const position = (marker * 816) / 82; // Correct positioning
              const isMajorTick = marker % 10 === 0;
              const isMidTick = marker % 5 === 0 && !isMajorTick;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{
                    left: `${position}px`,
                  }}
                >
                    {/* Add the major tick mark */}
                  {isMajorTick && (
                    <>
                    <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500'/>
                    <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                        {marker / 10 + 1}
                    </span>
                    </>
                  )}
                  {/*  Add the mid tick mark */}
                    { isMidTick && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500'/>

                    )}
                    {/* Add the minor tick mark */}
                    { !isMajorTick && !isMidTick && (
                        <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500'/>
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
