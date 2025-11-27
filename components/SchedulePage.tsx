import React, { useState, useEffect } from 'react';
import { ItineraryItem } from '../types';
import TimelineItem from './TimelineItem';
import BottomSheet from './BottomSheet';

interface SchedulePageProps {
  day: 1 | 2;
  onBack: () => void;
}

const INITIAL_DAY_1_DATA: ItineraryItem[] = [
  {
    id: 'd1-1',
    time: '11:30 AM',
    title: '한화리조트',
    icon: 'hotel',
    status: 'completed',
    hasDetails: true,
    address: '경북 경주시 보문로 182-27',
  },
  {
    id: 'd1-2',
    time: '12:20 PM',
    title: '전주가(점심)',
    icon: 'restaurant',
    status: 'completed',
    hasDetails: true,
    address: '경북 경주시 북군2길3',
    phoneNumber: '0507-1413-0279',
  },
  {
    id: 'd1-3',
    time: '01:45 PM',
    title: '대릉원(또는 금관총)',
    icon: 'park',
    status: 'current',
    hasDetails: true,
    address: '경북 경주시 황남동 31-1',
  },
  {
    id: 'd1-4',
    time: '03:10 PM',
    title: '황리단길',
    icon: 'storefront',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 첨성로 97(경상북도교육청 발명체험교육관)',
  },
  {
    id: 'd1-5',
    time: '04:40 PM',
    title: '교촌마을',
    icon: 'holiday_village',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 교촌길 39-2',
  },
  {
    id: 'd1-6',
    time: '05:30 PM',
    title: '요석궁(저녁)',
    icon: 'restaurant_menu',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 교촌안길 19-4',
  },
  {
    id: 'd1-7',
    time: '07:00 PM',
    title: '월정교',
    icon: 'bridge',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 교촌길 39-2',
  },
  {
    id: 'd1-8',
    time: '07:45 PM',
    title: '동궁과 월지',
    icon: 'nightlight',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 원화로 102',
  },
  {
    id: 'd1-9',
    time: '09:00 PM',
    title: '한화리조트',
    icon: 'bed',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 보문로 182-27',
  },
];

const INITIAL_DAY_2_DATA: ItineraryItem[] = [
  {
    id: 'd2-1',
    time: '10:00 AM',
    title: '한화리조트 체크아웃',
    icon: 'luggage',
    status: 'completed',
  },
  {
    id: 'd2-2',
    time: '10:30 AM',
    title: '불국사',
    icon: 'temple_buddhist',
    status: 'current',
    hasDetails: true,
    address: '경북 경주시 불국로 385',
  },
  {
    id: 'd2-3',
    time: '12:10 PM',
    title: '경주 힐튼 호텔(점심)',
    icon: 'restaurant',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 보문로 484-7',
  },
  {
    id: 'd2-4',
    time: '03:00 PM',
    title: '벤자마스(카페)',
    icon: 'coffee',
    status: 'upcoming',
    hasDetails: true,
    address: '경북 경주시 알천북로 369',
  },
  {
    id: 'd2-5',
    time: '04:30 PM',
    title: '귀가',
    icon: 'home',
    status: 'upcoming',
  },
];

// Module-level variables to simulate persistence during the session
let savedDay1Data: ItineraryItem[] | null = null;
let savedDay2Data: ItineraryItem[] | null = null;

const SchedulePage: React.FC<SchedulePageProps> = ({ day, onBack }) => {
  const [items, setItems] = useState<ItineraryItem[]>(() => {
    if (day === 1) return savedDay1Data ? [...savedDay1Data] : [...INITIAL_DAY_1_DATA];
    return savedDay2Data ? [...savedDay2Data] : [...INITIAL_DAY_2_DATA];
  });

  const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);

  const pageTitle = day === 1 ? '신라의 심장을 걷다' : '천년의 시간을 넘어서';
  const dateTitle = day === 1 ? 'Day 1: 12월 6일' : 'Day 2: 12월 7일';

  // Persist state changes to module variables
  useEffect(() => {
    if (day === 1) {
      savedDay1Data = items;
    } else {
      savedDay2Data = items;
    }
  }, [items, day]);

  const handleToggle = (itemToToggle: ItineraryItem) => {
    setItems(currentItems => {
      const newItems = currentItems.map(item => {
        if (item.id === itemToToggle.id) {
          // Toggle between completed and upcoming
          // If it was completed, make it upcoming. If it was upcoming/current, make it completed.
          return { ...item, status: item.status === 'completed' ? 'upcoming' : 'completed' } as ItineraryItem;
        }
        return item;
      });

      // Recalculate 'current' status
      // The first item that is NOT 'completed' should be 'current'.
      // All subsequent non-completed items should be 'upcoming'.
      let foundCurrent = false;
      const optimizedItems = newItems.map(item => {
        if (item.status === 'completed') return item;

        if (!foundCurrent) {
          foundCurrent = true;
          return { ...item, status: 'current' } as ItineraryItem;
        } else {
          return { ...item, status: 'upcoming' } as ItineraryItem;
        }
      });

      return optimizedItems;
    });
  };

  // Calculate progress
  const completedCount = items.filter(i => i.status === 'completed').length;
  const totalCount = items.length;
  // Calculate specific percentage: Completed = 1pt, Current = 0.5pt
  const currentItem = items.find(i => i.status === 'current');
  const progressPercent = Math.min(100, Math.round(((completedCount + (currentItem ? 0.5 : 0)) / totalCount) * 100));

  const handleItemClick = (item: ItineraryItem) => {
    if (item.hasDetails || item.address) {
      setSelectedItem(item);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-schedule-bg text-text-light font-sans relative">

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-schedule-bg/80 px-4 py-4 backdrop-blur-md border-b border-white/5">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-start text-text-light hover:text-white"
        >
          <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
        </button>

        <h2 className="text-lg font-bold tracking-tight text-white">{dateTitle}</h2>

        <div className="flex w-10 justify-end">
          <span className="material-symbols-outlined text-3xl text-text-light">edit_calendar</span>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-3xl font-bold leading-tight text-white">
          {pageTitle}
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2 px-5 py-6">
        <div className="flex justify-between items-end">
          <span className="text-base font-medium text-white">오늘의 일정</span>
          <span className="text-sm font-normal text-text-muted">{Math.floor(completedCount)}/{totalCount} 완료</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#8D6E63]/30">
          <div
            className="h-full rounded-full bg-[#FFCA28] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="flex flex-1 flex-col px-5 pb-24">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            onSelect={handleItemClick}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {/* Detail Modal/Sheet */}
      <BottomSheet
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || ''}
        address={selectedItem?.address || ''}
        phoneNumber={selectedItem?.phoneNumber}
        imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAwtEdnaejE6vEKeTUJgdKOKiRRyocfI_wzR14AA_hqHvexv6oZrN7ufRHp0Lvd_Gbqfj7psxh5UbSIMBLyn-BRfuz1IZ3G0zxtjpGLrJRPy3XGgoMhJoUXhETQ9Olm4Eda7dp75OvxahEEGFEOws9TOjmjNtgRDkFx6AA1DAwdJw606C1TXDwxcz_qmGFjBrs1iWb4iz1LhN76PeumpKOTdS8UL5-BkU6uhHwFFuQT5gAfjWOvm72X_jOyFozcVdnOfbq8FZAlAHg"
      />
    </div>
  );
};

export default SchedulePage;