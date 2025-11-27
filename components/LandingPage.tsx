import React from 'react';

interface LandingPageProps {
  onNavigateDay1: () => void;
  onNavigateDay2: () => void;
  onNavigateTravelInfo: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateDay1, onNavigateDay2, onNavigateTravelInfo }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-landing-bg font-sans text-text-light">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-landing-bg/80 z-10"></div>
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeNBMfeNNDNbb1bT5DzU_Ecyevqupkt35AIFFETXIuVaJHESCscukqVC1laEyvtKN5Bm55qmKV-6RCtUIsSWz_RlBSEO0R-l7KbidIFgUggIhChwhICeRrod_-ijyDhgwW9MEvibDY5rQ3hJTd-bPi-hQFD9-UjND4U7Tudn1HNbdKjNFOzWfebuLXdOx9yAvQPgcdvP80JfOnHVTMjN-PGwtphbWX1256kPmQUzAXzMxX7hWYRj2oGXBDIoSVEHO-Sq9U2imU65c')"
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-grow flex-col items-center justify-center p-6 text-center">

        {/* Logo Area */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/30 shadow-2xl backdrop-blur-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkEi-X1IFpvsQSXQi3SEFMxAoGaeZzGVQ67fwr5J3voAWcxJqhj_AB-1KUCWsrdSwOJ7lecMRtwi35rQFun7uW1N5q12SgIhbPuct0y4VholkrtlIXKZVmOVIk9z90r73Y161EbOzKZUBndcP03njnMCl8OU3tXR06U6VX5tK3IMipHnXOWF6lL5mHVrvSTiDaGZhzJiNlm_VnUqHVeCWJK8VByOiYMZ-9Dt8tiZHOMrl9TkRy1xyZmlHL0lGZR4ChPz1DqDqbQMo"
              alt="Gyeongju Logo"
              className="h-20 w-20 opacity-90"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-10 px-4 text-4xl font-bold leading-tight tracking-tight text-[#F5F5DC]">
          2025년<br />가족 경주 여행
        </h1>

        {/* Buttons */}
        <div className="flex w-full max-w-xs flex-col gap-4">
          <button
            onClick={onNavigateDay1}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#E9967A] px-6 text-lg font-bold text-[#1a1818] shadow-lg transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined group-hover:animate-spin-slow">wb_sunny</span>
            <span>첫째 날 일정</span>
          </button>

          <button
            onClick={onNavigateDay2}
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#E9967A] px-6 text-lg font-bold text-[#1a1818] shadow-lg transition-transform active:scale-95 opacity-90"
          >
            <span className="material-symbols-outlined">nights_stay</span>
            <span>둘째 날 일정</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-auto pb-8 pt-12">
          <button
            onClick={onNavigateTravelInfo}
            className="text-sm font-medium text-[#4682B4] underline decoration-1 underline-offset-4 opacity-80 hover:opacity-100"
          >
            전체 여행 정보 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;