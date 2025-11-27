import React, { useState } from 'react';

interface TravelInfoPageProps {
    onBack: () => void;
}

const TravelInfoPage: React.FC<TravelInfoPageProps> = ({ onBack }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="flex min-h-screen flex-col bg-[#1F1A18] text-[#EFEBE9]">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between bg-[#1F1A18]/95 px-4 py-4 backdrop-blur-sm">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[#E9967A] hover:text-[#ffab91]"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    <span className="text-lg font-bold">뒤로가기</span>
                </button>
                <h1 className="text-xl font-bold">전체 여행 정보</h1>
                <div className="w-20"></div> {/* Spacer for centering */}
            </header>

            {/* Content */}
            <main className="flex flex-col gap-6 p-4 pb-20">

                {/* Section 1: 1일차 일정 */}
                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#E9967A]">
                        <span className="material-symbols-outlined">wb_sunny</span>
                        1일차 일정표
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-[#4E342E] bg-[#2D2624] shadow-lg">
                        <img
                            src="/images/schedule_day1.png"
                            alt="1일차 일정표"
                            className="w-full object-contain cursor-zoom-in"
                            onClick={() => setSelectedImage("/images/schedule_day1.png")}
                        />
                    </div>
                </section>

                {/* Section 2: 2일차 일정 */}
                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#E9967A]">
                        <span className="material-symbols-outlined">nights_stay</span>
                        2일차 일정표
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-[#4E342E] bg-[#2D2624] shadow-lg">
                        <img
                            src="/images/schedule_day2.png"
                            alt="2일차 일정표"
                            className="w-full object-contain cursor-zoom-in"
                            onClick={() => setSelectedImage("/images/schedule_day2.png")}
                        />
                    </div>
                </section>

                {/* Section 3: 대체 일정 */}
                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#E9967A]">
                        <span className="material-symbols-outlined">alt_route</span>
                        대체 일정
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-[#4E342E] bg-[#2D2624] shadow-lg">
                        <img
                            src="/images/schedule_alt.png"
                            alt="대체 일정"
                            className="w-full object-contain cursor-zoom-in"
                            onClick={() => setSelectedImage("/images/schedule_alt.png")}
                        />
                    </div>
                </section>

                {/* Section 4: 지도 */}
                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#E9967A]">
                        <span className="material-symbols-outlined">map</span>
                        주요 위치 지도
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-[#4E342E] bg-[#2D2624] shadow-lg">
                        <img
                            src="/images/map.png"
                            alt="주요 위치 지도"
                            className="w-full object-contain cursor-zoom-in"
                            onClick={() => setSelectedImage("/images/map.png")}
                        />
                    </div>
                </section>

            </main>

            {/* Image Zoom Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/80 hover:text-white"
                        onClick={() => setSelectedImage(null)}
                    >
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Zoomed view"
                        className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    />
                </div>
            )}
        </div>
    );
};

export default TravelInfoPage;
