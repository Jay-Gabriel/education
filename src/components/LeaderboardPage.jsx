import React, { useState } from "react";
import {
  BarChart2,
  Trophy,
  Award,
  Star,
  Flame,
  Search,
  CheckCircle2,
  Sparkles,
  School,
  Medal
} from "lucide-react";

export default function LeaderboardPage() {
  const [scope, setScope] = useState("all-time");
  const [anonymous, setAnonymous] = useState(false);

  const topPodium = [
    { rank: 1, name: "Nguyễn Minh Anh", school: "THPT Chuyên KHTN", score: 9850, ac: 142, streak: 28, avatar: "/assets/rank-1.png", badge: "Grandmaster 🏆" },
    { rank: 2, name: "Trần Đức Duy", school: "THPT Chuyên Sư Phạm", score: 9620, ac: 138, streak: 24, avatar: "/assets/rank-2.png", badge: "Master 🥇" },
    { rank: 3, name: "Lê Phương Thảo", school: "THPT Chuyên Amsterdam", score: 9480, ac: 131, streak: 19, avatar: "/assets/rank-3.png", badge: "Master 🥈" }
  ];

  const rankingList = [
    { rank: 4, name: "Phạm Hoàng Nam", school: "THPT Chuyên Thái Bình", score: 9320, ac: 125, streak: 15, avatar: "/assets/rank-4.png" },
    { rank: 5, name: "Vũ Thị Mai", school: "THPT Chuyên Lam Sơn", score: 9210, ac: 120, streak: 12, avatar: "/assets/rank-5.png" },
    { rank: 6, name: "Đỗ Quốc Bảo", school: "THPT Chuyên Lê Hồng Phong", score: 9050, ac: 118, streak: 10, avatar: "/assets/testi-av-1.png?v=3" },
    { rank: 7, name: "Hoàng Minh Tuấn", school: "THPT Chuyên Bắc Ninh", score: 8940, ac: 114, streak: 9, avatar: "/assets/testi-av-2.png?v=3" },
    { rank: 8, name: "Nguyễn Hà Linh", school: "THPT Chuyên Phan Bội Châu", score: 8820, ac: 109, streak: 7, avatar: "/assets/testi-av-3.png?v=3" }
  ];

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0050A0] via-[#0B3C78] to-[#0066CC] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-leaderboard-hero-v1.png"
          alt="Leaderboard banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vinh danh Top Coder Toàn quốc</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Bảng xếp hạng & Đại sảnh Danh vọng
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Xếp hạng học tập được tính độc lập dựa trên số lượng bài tập AC trên Online Judge, điểm số cuộc thi và chuỗi ngày rèn luyện liên tục.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:p-5 w-full md:w-80 shadow-xl text-center">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Hạng của bạn</p>
          <p className="text-3xl font-black text-white mt-1">#1</p>
          <p className="text-xs text-sky-200 mt-0.5">{anonymous ? "Học viên đã xác thực" : "Nguyễn Minh Anh"} • 9.850 pts</p>
        </div>
      </div>

      <section className="rounded-3xl border border-sky-100 bg-white p-4 shadow-[0_2px_10px_rgba(0,100,220,0.04)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 overflow-x-auto">
            {[["all-time", "Toàn thời gian"], ["month", "Tháng này"], ["contest", "Cuộc thi gần nhất"], ["class", "Lớp của tôi"]].map(([id,label]) => <button key={id} onClick={() => setScope(id)} className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold ${scope === id ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-sky-50"}`}>{label}</button>)}
          </div>
          <label className="flex items-center gap-2 text-[11px] font-bold text-slate-600"><input checked={anonymous} onChange={e => setAnonymous(e.target.checked)} type="checkbox" className="accent-blue-600"/>Ẩn danh tên học sinh</label>
        </div>
        <p className="mt-3 text-[11px] text-slate-500">Điểm gồm bài AC, điểm cuộc thi và chuỗi luyện tập. Kết quả có thể được kiểm tra lại trước khi vinh danh.</p>
      </section>

      {/* 2. TOP 3 PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4 pb-2">
        {/* 2nd Place */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-md flex flex-col items-center text-center order-2 md:order-1 relative">
          <div className="absolute -top-4 w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center border-2 border-white shadow-sm">
            2
          </div>
          <img src={topPodium[1].avatar} alt="" className="w-16 h-16 rounded-full object-cover border-4 border-slate-200 shadow-md mb-2 mt-2" />
          <h4 className="text-sm font-bold text-[#0B3C78]">{anonymous ? "Học viên đã xác thực" : topPodium[1].name}</h4>
          <p className="text-[11px] text-slate-500">{topPodium[1].school}</p>
          <div className="mt-2 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
            {topPodium[1].score} Điểm • {topPodium[1].ac} AC
          </div>
        </div>

        {/* 1st Place (Winner) */}
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-2 border-amber-300 shadow-xl flex flex-col items-center text-center order-1 md:order-2 relative scale-105">
          <div className="absolute -top-5 w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center border-4 border-white shadow-md text-lg">
            👑
          </div>
          <img src={topPodium[0].avatar} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 shadow-xl mb-2 mt-2" />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 mb-1">{topPodium[0].badge}</span>
          <h4 className="text-base font-black text-[#0B3C78]">{anonymous ? "Học viên đã xác thực" : topPodium[0].name}</h4>
          <p className="text-xs text-slate-500">{topPodium[0].school}</p>
          <div className="mt-3 text-sm font-black text-amber-700 bg-amber-100/80 px-4 py-1.5 rounded-2xl border border-amber-200">
            {topPodium[0].score} Điểm • {topPodium[0].ac} AC 🔥
          </div>
        </div>

        {/* 3rd Place */}
        <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-md flex flex-col items-center text-center order-3 md:order-3 relative">
          <div className="absolute -top-4 w-8 h-8 rounded-full bg-amber-600 text-white font-black flex items-center justify-center border-2 border-white shadow-sm">
            3
          </div>
          <img src={topPodium[2].avatar} alt="" className="w-16 h-16 rounded-full object-cover border-4 border-amber-200 shadow-md mb-2 mt-2" />
          <h4 className="text-sm font-bold text-[#0B3C78]">{anonymous ? "Học viên đã xác thực" : topPodium[2].name}</h4>
          <p className="text-[11px] text-slate-500">{topPodium[2].school}</p>
          <div className="mt-2 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
            {topPodium[2].score} Điểm • {topPodium[2].ac} AC
          </div>
        </div>
      </div>

      {/* 3. RANKING TABLE */}
      {scope === "class" ? <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center"><School className="mx-auto h-9 w-9 text-sky-300"/><h2 className="mt-3 text-sm font-black text-slate-800">Chưa có bảng xếp hạng lớp</h2><p className="mt-1 text-xs text-slate-500">Giáo viên sẽ bật BXH khi lớp có đủ dữ liệu hoạt động.</p></div> : <div className="overflow-x-auto rounded-3xl border border-sky-100 bg-white shadow-[0_4px_16px_rgba(0,100,220,0.05)]"><div className="min-w-[680px] divide-y divide-slate-100">
        <div className="grid grid-cols-[60px_1fr_180px_120px_100px] px-5 py-3 bg-[#F8FBFE] text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <span>Hạng</span>
          <span>Học sinh</span>
          <span>Trường THPT / THCS</span>
          <span>Số bài AC</span>
          <span className="text-right">Tổng điểm</span>
        </div>

        {rankingList.map((st) => (
          <div key={st.rank} className="grid grid-cols-[60px_1fr_180px_120px_100px] px-5 py-3 items-center hover:bg-sky-50/50 transition-colors text-xs">
            <span className="font-bold text-slate-500">#{st.rank}</span>
            <div className="flex items-center gap-2.5">
              <img src={st.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-sky-200" />
              <span className="font-bold text-slate-800">{anonymous ? "Học viên đã xác thực" : st.name}</span>
            </div>
            <span className="text-slate-600">{st.school}</span>
            <span className="font-semibold text-emerald-600">{st.ac} bài AC</span>
            <span className="text-right font-black text-[#0B3C78]">{st.score}</span>
          </div>
        ))}
      </div></div>}
    </div>
  );
}
