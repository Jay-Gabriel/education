import React, { useState } from "react";
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Play,
  Flame,
  Timer,
  ArrowLeft,
  FileText,
  UserCheck,
  ShieldCheck,
  Medal,
  BarChart3,
  Check,
  ArrowRight,
  ChevronDown
} from "lucide-react";

// Mock Data for Grand Contests with structured 3-cluster layout
const CONTESTS_DATA = [
  {
    id: "OLYMPIC_2026",
    title: "Kỳ thi Olympic Tin học Trẻ Mở Rộng 2026",
    editionLabel: "Mùa giải 2025–2026",
    type: "contest",
    status: "ongoing",
    statusLabel: "Vòng 2 Bán kết đang diễn ra 🔥",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tag: "🏆 Đấu trường Toàn quốc",
    organizer: "Hội Tin học & Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "50.000.000đ + Học bổng",
    targetAudience: "Học sinh THCS & THPT toàn quốc",
    description: "Đấu trường lập trình danh giá gồm 3 vòng thi từ sơ loại đến chung kết toàn quốc.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-OLY-0842",
      overallRank: "#14 Toàn quốc",
      totalScore: 280
    },
    // CLUSTER 1: Active Round (Hiện tại)
    activeRound: {
      id: "OLYMPIC_2026_R2",
      roundNumber: 2,
      title: "Vòng 2: Bán kết Khu vực & Đấu trường Tỉnh/Thành",
      statusLabel: "Đang mở phòng thi hôm nay",
      startDate: "10/09/2026",
      scheduleNote: "08:00 – 12:00 hôm nay",
      duration: "240 phút",
      timeRemaining: "02:45:18",
      problemsCount: 4,
      totalParticipants: 580,
      candidateId: "SBD-OLY-0842",
      note: "Bạn đã đủ điều kiện thi. Hãy vào phòng thi trực tuyến trước 12:00."
    },
    // CLUSTER 2: Past Rounds Stats & Top 5 Valedictorians (Quá khứ)
    pastStats: {
      userRounds: [
        { name: "Vòng 1 (Sơ loại)", score: 280, maxScore: 300, percentage: 93.3, rank: "#14", ac: "3/3 AC", date: "15/08/2026" },
        { name: "Thi thử Chuyên đề", score: 190, maxScore: 200, percentage: 95.0, rank: "#8", ac: "2/2 AC", date: "28/08/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Nguyễn Hoàng Nam", school: "THPT Chuyên Hà Nội - Amsterdam", score: 300, time: "85'", medal: "🥇" },
        { rank: 2, name: "Trần Minh Đức", school: "THPT Chuyên Lê Hồng Phong (TP.HCM)", score: 300, time: "102'", medal: "🥈" },
        { rank: 3, name: "Lê Bảo Châu", school: "THPT Chuyên Khoa học Tự nhiên", score: 300, time: "120'", medal: "🥉" },
        { rank: 4, name: "Phạm Hải Long", school: "THPT Chuyên Phan Bội Châu", score: 295, time: "135'", medal: "Top 4" },
        { rank: 5, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", score: 290, time: "140'", medal: "Top 5" }
      ]
    },
    // CLUSTER 3: Next Upcoming Round (Tương lai)
    nextRound: {
      id: "OLYMPIC_2026_R3",
      roundNumber: 3,
      title: "Vòng 3: Chung kết Toàn quốc & Vinh danh",
      targetDate: "25/10/2026 (Chủ nhật)",
      scheduleTime: "08:30 – 13:30",
      duration: "300 phút (5 bài toán)",
      advancementCondition: "Dành riêng cho Top 100 thí sinh điểm cao nhất từ Vòng 2 Bán kết.",
      isRegistered: false
    }
  },
  {
    id: "MINI_CONTEST_2026",
    title: "Đấu trường Lập trình Online Ôn Thi 360 (Mùa 3)",
    editionLabel: "Mùa giải 2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở Chặng 3 · Đồ thị ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "⚡ Mini-Contest",
    organizer: "Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/contest-img-2.png",
    totalPrize: "15.000.000đ + Quà tặng",
    targetAudience: "Học sinh luyện thi HSG & Lập trình viên",
    description: "Chuỗi kỳ thi mini rèn luyện tốc độ thuật toán và chấm ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-MINI-302",
      overallRank: "#18 Toàn quốc",
      totalScore: 375
    },
    activeRound: null,
    pastStats: {
      userRounds: [
        { name: "Chặng 1 (Mảng & DS)", score: 200, maxScore: 200, percentage: 100, rank: "#8", ac: "2/2 AC", date: "20/07/2026" },
        { name: "Chặng 2 (Quy hoạch động)", score: 175, maxScore: 200, percentage: 87.5, rank: "#22", ac: "1/2 AC", date: "22/08/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Đặng Thu Thảo", school: "THPT Chuyên Lam Sơn", score: 200, time: "45'", medal: "🥇" },
        { rank: 2, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", score: 200, time: "58'", medal: "🥈" },
        { rank: 3, name: "Nguyễn Tuấn Anh", school: "THPT Chuyên Lương Văn Tụy", score: 195, time: "65'", medal: "🥉" },
        { rank: 4, name: "Hoàng Mai Linh", school: "THPT Chuyên Chu Văn An", score: 190, time: "70'", medal: "Top 4" },
        { rank: 5, name: "Trần Đức Nam", school: "THPT Chuyên Thái Bình", score: 185, time: "80'", medal: "Top 5" }
      ]
    },
    nextRound: {
      id: "MINI_R3",
      roundNumber: 3,
      title: "Chặng 3: Đồ thị & Luồng Cực đại (Chung cuộc)",
      targetDate: "20/10/2026 (Thứ Ba)",
      scheduleTime: "19:30 – 21:30",
      duration: "120 phút (3 bài toán)",
      advancementCondition: "Mở tự do cho toàn bộ thí sinh tích lũy điểm thưởng mùa giải.",
      isRegistered: false
    }
  }
];

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [contests, setContests] = useState(CONTESTS_DATA);
  const [selectedContest, setSelectedContest] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [registeredRounds, setRegisteredRounds] = useState({});
  const [toastMsg, setToastMsg] = useState("");

  const filteredContests = contests.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "ongoing") return c.status === "ongoing";
    if (activeTab === "upcoming") return c.status === "upcoming";
    return true;
  });

  const handleRegisterNextRound = (contestId, roundId) => {
    setRegisteredRounds((prev) => ({ ...prev, [`${contestId}_${roundId}`]: true }));
    setToastMsg("Đăng ký thành công! Bạn sẽ nhận thông báo khi vòng thi mở.");
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-5 z-[100] max-w-sm bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-slideIn text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: CHI TIẾT CUỘC THI — CHIA ĐÚNG 3 CỤM THÔNG TIN RÕ RÀNG VÀ GỌN GÀNG */}
      {/* ========================================================================= */}
      {selectedContest ? (
        <div className="flex flex-col gap-4">
          {/* Nút quay lại danh sách ở đầu trang */}
          <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-sky-100 shadow-2xs">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-blue-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Quay lại danh sách cuộc thi</span>
            </button>
            <span className="text-xs font-bold text-slate-700 truncate max-w-xs sm:max-w-md">
              {selectedContest.title}
            </span>
          </div>

          {/* Banner tiêu đề ngắn gọn */}
          <div className="rounded-2xl bg-gradient-to-r from-[#004085] via-[#0066CC] to-[#0284C7] p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                  {selectedContest.tag}
                </span>
                <span className="text-[11px] text-sky-100 font-semibold">{selectedContest.editionLabel}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black">{selectedContest.title}</h1>
              <p className="text-xs text-sky-100 mt-0.5">{selectedContest.description}</p>
            </div>

            {selectedContest.myOverallStatus && (
              <div className="bg-white/15 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/25 text-xs text-right shrink-0">
                <span className="text-[10px] text-sky-200 block uppercase font-bold">Số báo danh của bạn</span>
                <strong className="font-mono text-sm text-amber-300 font-black">{selectedContest.myOverallStatus.candidateId}</strong>
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* CỤM 1: VÒNG THI ĐANG DIỄN RA (HIỆN TẠI & NỔI BẬT NHẤT)                  */}
          {/* ======================================================================= */}
          {selectedContest.activeRound ? (
            <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/90 via-white to-white p-4 sm:p-5 shadow-md relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-600 text-white flex items-center gap-1 animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    CỤM 1: VÒNG ĐANG DIỄN RA HÔM NAY
                  </span>
                  <h2 className="text-sm sm:text-base font-black text-slate-800">
                    {selectedContest.activeRound.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl text-xs font-bold text-emerald-900">
                  <Timer className="w-4 h-4 text-emerald-700" />
                  <span>Thời gian còn lại:</span>
                  <strong className="font-mono text-emerald-800 text-sm font-black">
                    {selectedContest.activeRound.timeRemaining}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 mt-3.5 items-center">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Thời lượng: <strong>{selectedContest.activeRound.duration} ({selectedContest.activeRound.problemsCount} bài toán)</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span>{selectedContest.activeRound.totalParticipants} thí sinh tham gia</span>
                    </span>
                  </div>
                  <p className="text-emerald-900 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100 text-[11px]">
                    👉 {selectedContest.activeRound.note}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onOpenCodeWorkspace?.({
                      title: `${selectedContest.title} — ${selectedContest.activeRound.title}`,
                      id: selectedContest.activeRound.id
                    });
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>VÀO PHÒNG THI NGAY (LÀM BÀI TRỰC TUYẾN)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500">
              Hiện tại không có vòng thi nào đang mở phòng trực tuyến trong hôm nay.
            </div>
          )}

          {/* ======================================================================= */}
          {/* CỤM 2: THỐNG KÊ CÁC VÒNG ĐÃ QUA & DANH SÁCH 5 THỦ KHOA (QUÁ KHỨ)        */}
          {/* ======================================================================= */}
          <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                CỤM 2: KẾT QUẢ CÁC VÒNG ĐÃ QUA
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Biểu đồ điểm số cá nhân & Vinh danh 5 Thủ khoa
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Phần A: Biểu đồ cột điểm số của bạn */}
              <div className="bg-[#F8FBFE] p-4 rounded-xl border border-sky-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Biểu đồ điểm số của bạn qua các vòng
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Thang điểm 300</span>
                </div>

                {/* Bar Chart Visualization */}
                <div className="space-y-3 pt-1">
                  {selectedContest.pastStats?.userRounds.map((r, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-slate-700">{r.name}</span>
                        <strong className="text-blue-700 font-bold">{r.score}/{r.maxScore} điểm ({r.rank})</strong>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${r.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{r.date}</span>
                        <span className="text-emerald-600 font-bold">{r.ac}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phần B: Danh sách 5 Thủ khoa xuất sắc */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Danh sách 5 Thủ khoa dẫn đầu
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Cập nhật chính thức</span>
                </div>

                <div className="space-y-1.5">
                  {selectedContest.pastStats?.top5Valedictorians.map((val) => (
                    <div
                      key={val.rank}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100 text-xs hover:border-amber-200 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 text-center font-black text-xs">{val.medal}</span>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{val.name}</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[160px] sm:max-w-[200px]">{val.school}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <strong className="text-blue-700 font-black text-xs">{val.score}đ</strong>
                        <span className="text-[10px] text-slate-400 block">({val.time})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* CỤM 3: VÒNG TIẾP THEO DIỄN RA NGÀY NÀO (TƯƠNG LAI)                      */}
          {/* ======================================================================= */}
          {selectedContest.nextRound && (
            <div className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/50 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-sky-100">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                  CỤM 3: VÒNG TIẾP THEO
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  Lịch trình & Kế hoạch thi đấu chặng tới
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <h4 className="text-sm font-bold text-[#0050A0]">{selectedContest.nextRound.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-slate-600 pt-0.5">
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Ngày thi: {selectedContest.nextRound.targetDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Khung giờ: {selectedContest.nextRound.scheduleTime} ({selectedContest.nextRound.duration})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    ℹ️ {selectedContest.nextRound.advancementCondition}
                  </p>
                </div>

                <button
                  onClick={() => handleRegisterNextRound(selectedContest.id, selectedContest.nextRound.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs ${
                    registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                    ? "Đã đăng ký nhận lịch ✓"
                    : "Đăng ký nhận thông báo mở đề"}
                </button>
              </div>
            </div>
          )}

          {/* Nút quay lại danh sách ở cuối trang */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 bg-white hover:bg-sky-50 px-5 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách tất cả cuộc thi</span>
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: DANH SÁCH TẤT CẢ CUỘC THI (TỔNG QUAN)                            */
        /* ========================================================================= */
        <>
          {/* Hero Banner ngắn gọn */}
          <div className="rounded-2xl bg-gradient-to-r from-[#004085] via-[#0066CC] to-[#0284C7] p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 mb-2">
                <Trophy className="w-3 h-3" />
                <span>Mùa giải Lập trình 2026</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black">Đại hội Lập trình & Các Cuộc thi</h1>
              <p className="text-xs text-sky-100 mt-1">
                Các cuộc thi được chia thành 3 cụm: Vòng đang mở, Thống kê các vòng đã qua, và Vòng kế tiếp.
              </p>
            </div>

            <div className="bg-white/15 px-3.5 py-2.5 rounded-xl border border-white/20 text-xs shrink-0 text-center">
              <span className="text-[10px] text-sky-200 block uppercase font-bold">Đang mở hôm nay</span>
              <strong className="text-amber-300 font-mono text-sm font-black">Olympic 2026 · Vòng 2</strong>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white p-1.5 rounded-xl border border-sky-100">
            {[
              { id: "all", label: "Tất cả cuộc thi" },
              { id: "ongoing", label: "Đang diễn ra 🔥" },
              { id: "upcoming", label: "Sắp mở đăng ký" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === t.id ? "bg-[#0066CC] text-white shadow-2xs" : "text-slate-600 hover:bg-sky-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContests.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-32 bg-slate-100 overflow-hidden">
                    <img
                      src={c.bannerImage}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-[#0050A0] shadow-2xs">
                      {c.tag}
                    </span>
                    <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-2xs ${c.statusStyle}`}>
                      {c.statusLabel}
                    </span>
                  </div>

                  <div className="p-4 space-y-2.5">
                    <h3 className="text-sm font-bold text-[#0B3C78] line-clamp-1 group-hover:text-blue-600">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>

                    {c.myOverallStatus && (
                      <div className="flex items-center justify-between text-[11px] text-amber-900 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/60">
                        <span>Kết quả của bạn:</span>
                        <strong className="font-bold">{c.myOverallStatus.totalScore}đ ({c.myOverallStatus.overallRank})</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => setSelectedContest(c)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Xem 3 cụm chi tiết & Vào thi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
