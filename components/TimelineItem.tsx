import React from 'react';
import { ItineraryItem } from '../types';

interface TimelineItemProps {
  item: ItineraryItem;
  isLast: boolean;
  onSelect: (item: ItineraryItem) => void;
  onToggle: (item: ItineraryItem) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast, onSelect, onToggle }) => {
  const { status, icon, title, time, address } = item;
  
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  
  // Icon container styles
  const iconContainerClass = isCurrent
    ? "bg-[#8D6E63] ring-4 ring-[#8D6E63]/30 z-10 scale-110"
    : isCompleted
    ? "bg-[#FFCA28] z-10"
    : "bg-[#8D6E63]/30 z-10";

  const iconColorClass = isCurrent
    ? "text-[#EFEBE9]" // Light text on brown
    : isCompleted
    ? "text-[#443632]" // Dark text on yellow
    : "text-[#FFCA28]"; // Yellow text on dim brown

  const containerOpacity = isCompleted ? "opacity-50" : "opacity-100";
  
  return (
    <div className="grid grid-cols-[48px_1fr] gap-x-4 min-h-[80px]">
      {/* Left Column: Line & Icon */}
      <div className="flex flex-col items-center pt-2 relative">
        {/* Icon Circle */}
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${iconContainerClass}`}>
          <span className={`material-symbols-outlined text-[20px] ${iconColorClass}`}>
            {icon}
          </span>
        </div>
        
        {/* Vertical Line */}
        {!isLast && (
            <div className={`w-[2px] grow mt-1 ${isCompleted ? 'bg-[#FFCA28]' : 'bg-[#4E342E]'}`}></div>
        )}
      </div>

      {/* Right Column: Content */}
      <div 
        className={`flex flex-col py-2 pb-8 cursor-pointer ${containerOpacity}`}
        onClick={() => onSelect(item)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-base font-medium leading-normal ${isCurrent ? 'text-white' : 'text-[#EFEBE9]'}`}>
            {title}
          </h3>
          
          {/* Right Status Indicator - Clickable Area */}
          <button 
            className="flex h-8 w-8 items-center justify-center rounded-full -mr-2 transition-transform active:scale-90"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item);
            }}
          >
            {isCompleted && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FFCA28] bg-[#FFCA28]">
                <span className="material-symbols-outlined text-[14px] text-[#443632] font-bold">check</span>
              </div>
            )}
            {isCurrent && (
              <div className="h-5 w-5 rounded-full border-2 border-[#FFCA28] shadow-[0_0_10px_rgba(255,202,40,0.4)]"></div>
            )}
            {status === 'upcoming' && (
              <div className="h-5 w-5 rounded-full border-2 border-[#4E342E] hover:border-[#FFCA28]/50"></div>
            )}
          </button>
        </div>
        
        <p className="mt-0.5 text-sm font-normal text-[#BCAAA4]">
          {time}
        </p>

        {/* Address */}
        {address && (
          <p className="mt-1 text-xs font-normal text-[#BCAAA4]/70 truncate">
            {address}
          </p>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;