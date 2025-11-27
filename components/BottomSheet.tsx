import React from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  address: string;
  phoneNumber?: string;
  imageUrl: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, address, phoneNumber, imageUrl }) => {
  if (!isOpen) return null;

  const handleNaverMap = () => {
    window.open(`https://map.naver.com/v5/search/${encodeURIComponent(address)}`, '_blank');
  };

  const handleKakaoMap = () => {
    window.open(`https://map.kakao.com/link/search/${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-[#1F1A18] shadow-[0_-4px_20px_rgba(0,0,0,0.5)] animate-slide-up">
        {/* Handle */}
        <div className="flex w-full justify-center pt-3 pb-2" onClick={onClose}>
          <div className="h-1.5 w-12 rounded-full bg-[#4E342E]/50"></div>
        </div>

        <div className="flex flex-col p-5 pt-2">
          <h3 className="mb-1 text-2xl font-bold text-[#EFEBE9]">{title}</h3>
          <p className="mb-1 text-sm text-[#BCAAA4]">{address}</p>
          {phoneNumber && (
             <p className="mb-4 text-sm font-medium text-[#FFCA28] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">call</span>
                {phoneNumber}
             </p>
          )}
          
          {/* Map/Image - Adjust margin based on content */}
          <div className={`${phoneNumber ? 'mb-5' : 'mt-2 mb-5'} h-48 w-full overflow-hidden rounded-xl bg-gray-800 border border-[#4E342E]/30`}>
            <img 
              src={imageUrl} 
              alt={title} 
              className="h-full w-full object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-none w-20 rounded-xl bg-[#388E3C]/20 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#388E3C]/30"
            >
              닫기
            </button>
            <button 
              onClick={handleNaverMap}
              className="flex-1 rounded-xl bg-[#03C75A] py-3.5 text-center text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#02b351]"
            >
              네이버 지도
            </button>
            <button 
              onClick={handleKakaoMap}
              className="flex-1 rounded-xl bg-[#FEE500] py-3.5 text-center text-sm font-bold text-[#191919] shadow-lg transition-colors hover:bg-[#fdd835]"
            >
              카카오맵
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;