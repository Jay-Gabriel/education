import React, { useState, useMemo, useEffect } from "react";
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  Flame,
  Timer,
  ArrowLeft,
  FileText,
  UserCheck,
  ShieldCheck,
  Medal,
  BarChart3,
  Search,
  Filter,
  RotateCcw,
  BookOpen,
  Check,
  Star,
  Zap
} from "lucide-react";

// Mock Data for Grand Contests
const CONTESTS_DATA = [
  {
    id: "OLYMPIC_2026",
    title: "Kỳ thi Olympic Tin học Trẻ Mở Rộng 2026",
    editionLabel: "Mùa giải 2025–2026",
    category: "national",
    categoryLabel: "Đấu trường Quốc gia",
    season: "2025-2026",
    type: "contest",
    status: "ongoing",
    statusLabel: "Vòng 2 Bán kết đang mở 🔥",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tag: "🏆 Đấu trường Toàn quốc",
    organizer: "Hội Tin học Việt Nam & Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "50.000.000đ + Học bổng",
    targetAudience: "Học sinh THCS & THPT toàn quốc (Bảng A, B, C)",
    description:
      "Đấu trường lập trình danh giá quy tụ hơn 3.500 thí sinh tài năng qua 3 vòng thi từ sơ loại đến chung kết toàn quốc theo chuẩn ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-OLY-0842",
      overallRank: "#14 Toàn quốc",
      totalScore: 280,
      badge: "Top 1% Vòng Sơ loại"
    },
    activeRound: {
      id: "OLYMPIC_2026_R2",
      roundNumber: 2,
      title: "Vòng 2: Bán kết Khu vực & Đấu trường Tỉnh/Thành",
      statusLabel: "Đang mở phòng thi hôm nay",
      startDate: "Hôm nay · 10/09/2026",
      scheduleTime: "08:00 – 12:00",
      duration: "240 phút",
      timeRemaining: "02:45:18",
      problemsCount: 4,
      totalParticipants: 580,
      candidateId: "SBD-OLY-0842",
      note: "Bạn đã đủ điều kiện dự thi và đã có số báo danh. Hãy nộp bài trước giờ đóng đề 12:00."
    },
    pastStats: {
      userRounds: [
        { name: "Vòng 1: Khởi động & Sơ loại Toàn quốc", score: 280, maxScore: 300, percentage: 93.3, rank: "#14 / 3,250", ac: "3/3 AC (80đ câu 3)", date: "15/08/2026" },
        { name: "Kỳ thi Thử nghiệm Chuyên đề Đồ thị", score: 190, maxScore: 200, percentage: 95.0, rank: "#8 / 1,400", ac: "2/2 AC hoàn hảo", date: "28/08/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Nguyễn Hoàng Nam", school: "THPT Chuyên Hà Nội - Amsterdam", score: 300, time: "85'", medal: "🥇" },
        { rank: 2, name: "Trần Minh Đức", school: "THPT Chuyên Lê Hồng Phong (TP.HCM)", score: 300, time: "102'", medal: "🥈" },
        { rank: 3, name: "Lê Bảo Châu", school: "THPT Chuyên Khoa học Tự nhiên", score: 300, time: "120'", medal: "🥉" },
        { rank: 4, name: "Phạm Hải Long", school: "THPT Chuyên Phan Bội Châu", score: 295, time: "135'", medal: "4" },
        { rank: 5, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", score: 290, time: "140'", medal: "5" }
      ]
    },
    nextRound: {
      id: "OLYMPIC_2026_R3",
      roundNumber: 3,
      title: "Vòng 3: Chung kết Toàn quốc & Lễ Trao giải",
      targetDate: "25/10/2026 (Chủ nhật)",
      scheduleTime: "08:30 – 13:30",
      duration: "300 phút (5 bài toán)",
      advancementCondition: "Dành riêng cho Top 100 thí sinh đạt điểm cao nhất tại Vòng 2 Bán kết.",
      isRegistered: false
    }
  },
  {
    id: "MINI_CONTEST_2026",
    title: "Chuỗi Đấu trường Lập trình Online Ôn Thi 360 Lần thứ 3",
    editionLabel: "Mùa giải 2026",
    category: "mini",
    categoryLabel: "Mini-Contest Định kỳ",
    season: "2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở Chặng 3 · Đồ thị ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "⚡ Mini-Contest Định kỳ",
    organizer: "Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/contest-img-2.png",
    totalPrize: "15.000.000đ + Quà tặng công nghệ",
    targetAudience: "Học sinh luyện thi HSG & Lập trình viên trẻ",
    description: "Chuỗi 3 kỳ thi mini rèn luyện tốc độ thuật toán và cọ xát trực tiếp trên hệ thống ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-MINI-302",
      overallRank: "#18 Toàn quốc",
      totalScore: 375,
      badge: "Chiến binh kiên trì"
    },
    activeRound: null,
    pastStats: {
      userRounds: [
        { name: "Chặng 1: Cấu trúc dữ liệu & Mảng", score: 200, maxScore: 200, percentage: 100, rank: "#8 / 1,100", ac: "2/2 AC", date: "20/07/2026" },
        { name: "Chặng 2: Quy hoạch động nâng cao", score: 175, maxScore: 200, percentage: 87.5, rank: "#22 / 1,250", ac: "1/2 AC (75đ câu 2)", date: "22/08/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Đặng Thu Thảo", school: "THPT Chuyên Lam Sơn", score: 200, time: "45'", medal: "🥇" },
        { rank: 2, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", score: 200, time: "58'", medal: "🥈" },
        { rank: 3, name: "Nguyễn Tuấn Anh", school: "THPT Chuyên Lương Văn Tụy", score: 195, time: "65'", medal: "🥉" },
        { rank: 4, name: "Hoàng Mai Linh", school: "THPT Chuyên Chu Văn An", score: 190, time: "70'", medal: "4" },
        { rank: 5, name: "Trần Đức Nam", school: "THPT Chuyên Thái Bình", score: 185, time: "80'", medal: "5" }
      ]
    },
    nextRound: {
      id: "MINI_R3",
      roundNumber: 3,
      title: "Chặng 3: Đồ thị & Luồng Cực đại (Chung cuộc)",
      targetDate: "20/10/2026 (Thứ Ba)",
      scheduleTime: "19:30 – 21:30",
      duration: "120 phút (3 bài toán)",
      advancementCondition: "Mở tự do cho toàn bộ học viên Ôn Thi 360 tích lũy điểm thưởng mùa giải.",
      isRegistered: false
    }
  },
  {
    id: "PROVINCIAL_2026",
    title: "Kỳ thi HSG Tin học Cấp Tỉnh Mở Rộng 2026",
    editionLabel: "Mùa giải 2025–2026",
    category: "provincial",
    categoryLabel: "Đấu trường Cấp Tỉnh",
    season: "2025-2026",
    type: "contest",
    status: "ongoing",
    statusLabel: "Vòng Chung Khảo đang mở 🔥",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tag: "🏅 Đấu trường Cấp Tỉnh",
    organizer: "Sở Giáo dục & Ban Cố vấn Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "30.000.000đ + Giấy khen Cấp Tỉnh",
    targetAudience: "Đội tuyển HSG Tin học các trường THPT",
    description: "Kỳ thi theo form đề chuẩn quốc gia gồm 4 bài toán phân hóa cao.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-TINH-109",
      overallRank: "#5 Toàn tỉnh",
      totalScore: 290,
      badge: "Hạt giống Vàng"
    },
    activeRound: {
      id: "PROV_R2",
      roundNumber: 2,
      title: "Vòng 2: Chung Khảo Đội Tuyển Tỉnh",
      statusLabel: "Đang mở phòng thi",
      startDate: "Hôm nay · 10/09/2026",
      scheduleTime: "08:30 – 12:30",
      duration: "240 phút",
      timeRemaining: "03:12:40",
      problemsCount: 4,
      totalParticipants: 320,
      candidateId: "SBD-TINH-109",
      note: "Đề thi chính thức chuẩn quốc gia. Hãy nộp code và đối soát testcase trực tiếp."
    },
    pastStats: {
      userRounds: [
        { name: "Vòng 1: Tuyển chọn Cụm trường", score: 290, maxScore: 300, percentage: 96.6, rank: "#5 / 850", ac: "3/3 AC", date: "10/08/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Hoàng Minh Trí", school: "THPT Chuyên Quốc Học Huế", score: 300, time: "90'", medal: "🥇" },
        { rank: 2, name: "Nguyễn Văn An", school: "THPT Chuyên Quốc Học Huế", score: 290, time: "105'", medal: "🥈" },
        { rank: 3, name: "Phan Đình Phùng", school: "THPT Hai Bà Trưng", score: 285, time: "115'", medal: "🥉" }
      ]
    },
    nextRound: {
      id: "PROV_R3",
      roundNumber: 3,
      title: "Vòng 3: Giao lưu Đội tuyển Toàn quốc",
      targetDate: "15/11/2026",
      scheduleTime: "08:00 – 13:00",
      duration: "300 phút",
      advancementCondition: "Dành cho Top 10 thí sinh điểm cao nhất đợt này.",
      isRegistered: false
    }
  },
  {
    id: "SURVEY_2026",
    title: "Khảo sát Năng lực Thuật toán & Tư duy Lập trình 2026",
    editionLabel: "Đợt 1 · 2026",
    category: "survey",
    categoryLabel: "Khảo sát Năng lực",
    season: "2026",
    type: "survey",
    status: "ongoing",
    statusLabel: "Đang mở khảo sát",
    statusStyle: "bg-sky-100 text-sky-800 border-sky-300",
    tag: "📊 Khảo sát Năng lực",
    organizer: "Viện Đánh giá Năng lực Giáo dục Số",
    bannerImage: "/assets/contest-img-3.png",
    totalPrize: "Chứng nhận điện tử phân cấp năng lực",
    targetAudience: "Học sinh tự đánh giá trình độ trước khi vào lớp chuyên sâu",
    description: "Khảo sát chuẩn hóa năng lực tư duy thuật toán và kỹ năng lập trình đầu vào.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-KS-551",
      overallRank: "Hạng A (Xuất sắc)",
      totalScore: 92,
      badge: "Tư duy Vững vàng"
    },
    activeRound: {
      id: "SURVEY_R2",
      roundNumber: 2,
      title: "Khảo sát Đợt 2: Cấu trúc Dữ liệu Nâng cao",
      statusLabel: "Đang mở tự do",
      startDate: "Mở tự do đến 30/09/2026",
      scheduleTime: "Làm bài trực tuyến 24/7",
      duration: "90 phút",
      timeRemaining: "Tự do",
      problemsCount: 20,
      totalParticipants: 1540,
      candidateId: "SBD-KS-551",
      note: "Khảo sát phi thi đua. Bạn có thể làm bài và nhận báo cáo năng lực chi tiết ngay."
    },
    pastStats: {
      userRounds: [
        { name: "Khảo sát Đợt 1: Tư duy Logic Cơ bản", score: 92, maxScore: 100, percentage: 92, rank: "Top 3%", ac: "14/15 câu đúng", date: "01/09/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Thí sinh ẩn danh #99", school: "THPT Chuyên KHTN", score: 100, time: "40'", medal: "🥇" },
        { rank: 2, name: "Thí sinh ẩn danh #12", school: "THPT Chuyên Lê Quý Đôn", score: 98, time: "45'", medal: "🥈" }
      ]
    },
    nextRound: {
      id: "SURVEY_R3",
      roundNumber: 3,
      title: "Đợt Khảo sát Năng lực Thuật toán Học kỳ II",
      targetDate: "15/12/2026",
      scheduleTime: "Mở tự do",
      duration: "90 phút",
      advancementCondition: "Mở tự do cho tất cả học sinh toàn hệ thống.",
      isRegistered: false
    }
  }
];

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [contests, setContests] = useState(CONTESTS_DATA);
  const [selectedContest, setSelectedContest] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [seasonFilter, setSeasonFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [registeredRounds, setRegisteredRounds] = useState({});
  const [toastMsg, setToastMsg] = useState("");

  const filteredContests = useMemo(() => {
    return contests.filter((c) => {
      const searchMatch =
        searchTerm.trim() === "" ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.organizer.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "ongoing" && c.status === "ongoing") ||
        (statusFilter === "upcoming" && c.status === "upcoming") ||
        (statusFilter === "completed" && c.status === "completed") ||
        (statusFilter === "surveys" && c.type === "survey");

      const categoryMatch = categoryFilter === "all" || c.category === categoryFilter;
      const seasonMatch = seasonFilter === "all" || c.season === seasonFilter;

      return searchMatch && statusMatch && categoryMatch && seasonMatch;
    });
  }, [contests, searchTerm, statusFilter, categoryFilter, seasonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredContests.length / itemsPerPage));
  const paginatedContests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContests, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, seasonFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSeasonFilter("all");
    setCurrentPage(1);
  };

  const handleRegisterNextRound = (contestId, roundId) => {
    setRegisteredRounds((prev) => ({ ...prev, [`${contestId}_${roundId}`]: true }));
    setToastMsg("Đăng ký thành công! Bạn sẽ nhận thông báo khi đề thi mở.");
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <div className="flex flex-col gap-5 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-5 z-[100] max-w-sm bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-slideIn text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: CHI TIẾT CUỘC THI — GIAO DIỆN CAO CẤP, 3 KHỐI TRỌNG TÂM MẠCH LẠC */}
      {/* ========================================================================= */}
      {selectedContest ? (
        <div className="flex flex-col gap-4">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)]">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-blue-800 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách cuộc thi</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Đấu trường</span>
              <span>/</span>
              <strong className="text-slate-800 truncate max-w-xs sm:max-w-md">{selectedContest.title}</strong>
            </div>
          </div>

          {/* Premium Hero Banner (High Contrast, White Crisp Text) */}
          <div className="relative rounded-3xl overflow-hidden border border-sky-200 shadow-[0_12px_35px_rgba(0,100,220,0.12)] bg-gradient-to-r from-[#003B7A] via-[#0055B3] to-[#0284C7] p-6 sm:p-7 text-white">
            <img
              src={selectedContest.bannerImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-20 mix-blend-luminosity"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 shadow-sm">
                    <Trophy className="w-3.5 h-3.5" />
                    {selectedContest.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-xs border border-white/20 text-white">
                    {selectedContest.editionLabel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${selectedContest.statusStyle}`}>
                    {selectedContest.statusLabel}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-sm">
                  {selectedContest.title}
                </h1>

                <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed max-w-xl">
                  {selectedContest.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-sky-100">
                  <span>🏆 Giải thưởng: <strong className="text-amber-300 font-bold">{selectedContest.totalPrize}</strong></span>
                  <span>•</span>
                  <span>🏛️ Đơn vị: <strong className="text-white font-bold">{selectedContest.organizer}</strong></span>
                </div>
              </div>

              {/* My Overall Status Badge */}
              {selectedContest.myOverallStatus && (
                <div className="w-full lg:w-72 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-xl text-white">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Medal className="w-4 h-4" />
                      Hồ sơ của bạn
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 font-bold">
                      Đã ghi danh
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200">Số báo danh:</span>
                      <strong className="font-mono text-sm text-white font-black bg-black/25 px-2 py-0.5 rounded-md">
                        {selectedContest.myOverallStatus.candidateId}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200">Thứ hạng hiện tại:</span>
                      <strong className="text-amber-300 font-bold">{selectedContest.myOverallStatus.overallRank}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200">Điểm tích lũy:</span>
                      <strong className="text-white font-bold">{selectedContest.myOverallStatus.totalScore} điểm</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* KHỐI 1: VÒNG THI ĐANG DIỄN RA (SPOTLIGHT CHÍNH)                          */}
          {/* ======================================================================= */}
          {selectedContest.activeRound ? (
            <div className="rounded-3xl border border-emerald-300/80 bg-gradient-to-b from-[#F0FDF4] via-white to-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(16,185,129,0.08)]">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white flex items-center gap-1.5 shadow-sm">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    VÒNG THI ĐANG MỞ
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedContest.activeRound.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-900 shadow-2xs">
                  <Timer className="w-4 h-4 text-emerald-700" />
                  <span>Thời gian còn lại:</span>
                  <strong className="font-mono text-emerald-900 text-sm font-black tracking-wide">
                    {selectedContest.activeRound.timeRemaining}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mt-4 items-center">
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {selectedContest.activeRound.startDate} ({selectedContest.activeRound.scheduleTime})
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {selectedContest.activeRound.duration} ({selectedContest.activeRound.problemsCount} bài toán)
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      {selectedContest.activeRound.totalParticipants} thí sinh tham gia
                    </span>
                  </div>

                  <p className="text-emerald-900 bg-emerald-50/90 p-3 rounded-2xl border border-emerald-200 text-xs leading-relaxed">
                    ✨ <strong>Lưu ý thí sinh:</strong> {selectedContest.activeRound.note}
                  </p>
                </div>

                {/* Primary CTA Button */}
                <div>
                  <button
                    onClick={() => {
                      onOpenCodeWorkspace?.({
                        title: `${selectedContest.title} — ${selectedContest.activeRound.title}`,
                        id: selectedContest.activeRound.id
                      });
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-105 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-98"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>VÀO PHÒNG THI TRỰC TUYẾN</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-xs text-slate-500">
              Hiện tại chưa có vòng thi nào đang mở đề trong ngày hôm nay.
            </div>
          )}

          {/* ======================================================================= */}
          {/* KHỐI 2: THỐNG KÊ KẾT QUẢ ĐÃ QUA & TOP 5 THỦ KHOA                         */}
          {/* ======================================================================= */}
          <div className="rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,100,220,0.06)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-5 rounded-full bg-blue-600" />
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  Kết quả các Vòng thi trước & Top 5 Thủ khoa
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Đối soát kết quả chính thức</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Phần 1: Biểu đồ cột điểm số của bạn */}
              <div className="bg-[#F8FBFE] p-4 sm:p-5 rounded-2xl border border-sky-100 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Biểu đồ điểm số cá nhân của bạn
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    Thang điểm 300
                  </span>
                </div>

                {selectedContest.pastStats?.userRounds.length > 0 ? (
                  <div className="space-y-3 pt-1">
                    {selectedContest.pastStats.userRounds.map((r, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-2xs space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800">{r.name}</span>
                          <strong className="text-blue-700 font-black text-xs">
                            {r.score} / {r.maxScore} điểm
                          </strong>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-700"
                            style={{ width: `${r.percentage}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
                          <span>📅 Ngày thi: {r.date}</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                            {r.ac} ({r.rank})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center italic">Bạn chưa hoàn thành vòng thi nào trước đây.</p>
                )}
              </div>

              {/* Phần 2: Danh sách 5 Thủ khoa dẫn đầu */}
              <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Top 5 Thủ khoa xuất sắc nhất
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Bảng điểm ACM/ICPC</span>
                </div>

                {selectedContest.pastStats?.top5Valedictorians.length > 0 ? (
                  <div className="space-y-2">
                    {selectedContest.pastStats.top5Valedictorians.map((val) => (
                      <div
                        key={val.rank}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs shadow-2xs hover:border-amber-300 transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-black text-xs flex items-center justify-center shrink-0">
                            {val.medal}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate leading-tight">{val.name}</p>
                            <p className="text-[11px] text-slate-400 truncate">{val.school}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-3">
                          <strong className="text-blue-700 font-black text-xs block">{val.score} điểm</strong>
                          <span className="text-[10px] text-slate-400">({val.time} penalty)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center italic">Chưa có dữ liệu thủ khoa vòng trước.</p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* KHỐI 3: VÒNG TIẾP THEO DIỄN RA NGÀY NÀO                                 */}
          {/* ======================================================================= */}
          {selectedContest.nextRound && (
            <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50/70 via-white to-sky-50/70 p-5 sm:p-6 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                    KẾ HOẠCH CHẶNG TỚI
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    Thông tin Vòng thi kế tiếp
                  </h3>
                </div>
                <span className="text-[11px] text-blue-700 font-bold">Mùa giải 2026</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs text-slate-700">
                  <h4 className="text-sm sm:text-base font-black text-[#0050A0]">
                    {selectedContest.nextRound.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-slate-600">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-sky-100">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      Ngày diễn ra: {selectedContest.nextRound.targetDate}
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-sky-100">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Khung giờ: {selectedContest.nextRound.scheduleTime} ({selectedContest.nextRound.duration})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    📌 <strong>Điều kiện:</strong> {selectedContest.nextRound.advancementCondition}
                  </p>
                </div>

                <button
                  onClick={() => handleRegisterNextRound(selectedContest.id, selectedContest.nextRound.id)}
                  className={`px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md ${
                    registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-[#0066CC] hover:bg-blue-700 text-white active:scale-98"
                  }`}
                >
                  {registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                    ? "Đã đăng ký nhận lịch ✓"
                    : "Đăng ký nhận thông báo mở đề"}
                </button>
              </div>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="pt-3 flex justify-center">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-700 bg-white hover:bg-sky-50 px-6 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách tất cả cuộc thi</span>
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: DANH SÁCH CUỘC THI CÓ TÌM KIẾM, BỘ LỌC VÀ PHÂN TRANG               */
        /* ========================================================================= */
        <>
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-sky-200 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#003B7A] via-[#0055B3] to-[#0284C7] p-6 sm:p-7 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <img
              src="/assets/page-contests-hero.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-20 mix-blend-luminosity"
            />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 mb-2.5 shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                <span>Đấu trường Thuật toán & Mùa giải 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Đại hội Lập trình & Các Cuộc thi 360
              </h1>

              <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
                Khám phá các kỳ thi trực tuyến chuẩn quốc gia, theo dõi tiến trình các vòng và thử sức với hệ thống chấm điểm tự động ACM/ICPC.
              </p>
            </div>

            <div className="relative z-10 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-white text-xs shrink-0 text-center w-full md:w-auto">
              <span className="text-[10px] text-sky-200 block uppercase font-bold">Kỳ thi đang mở hôm nay</span>
              <strong className="text-amber-300 font-mono text-sm font-black block mt-0.5">Olympic 2026 · Vòng 2</strong>
              <span className="text-[11px] text-white/90">08:00 – 12:00</span>
            </div>
          </div>

          {/* Search Bar & Advanced Filters */}
          <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.04)] space-y-3.5">
            {/* Search Input & Status Pills */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm cuộc thi, giải đấu, đơn vị tổ chức..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Tab Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                {[
                  { id: "all", label: "Tất cả sự kiện" },
                  { id: "ongoing", label: "Đang diễn ra 🔥" },
                  { id: "upcoming", label: "Sắp mở đăng ký" },
                  { id: "completed", label: "Đã kết thúc" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setStatusFilter(t.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      statusFilter === t.id
                        ? "bg-[#0066CC] text-white shadow-2xs"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Lọc nhanh:
                </span>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Tất cả Cấp độ</option>
                  <option value="national">🏆 Đấu trường Quốc gia</option>
                  <option value="provincial">🏅 Đấu trường Cấp Tỉnh</option>
                  <option value="mini">⚡ Mini-Contest Định kỳ</option>
                  <option value="survey">📊 Khảo sát Năng lực</option>
                </select>

                <select
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Tất cả Mùa giải</option>
                  <option value="2026">Mùa giải 2026</option>
                  <option value="2025-2026">Mùa giải 2025–2026</option>
                </select>

                {(searchTerm || statusFilter !== "all" || categoryFilter !== "all" || seasonFilter !== "all") && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 text-[11px] text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Xóa bộ lọc</span>
                  </button>
                )}
              </div>

              <span className="text-slate-400 text-[11px]">
                Tìm thấy <strong className="text-slate-800 font-bold">{filteredContests.length}</strong> cuộc thi
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          {paginatedContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paginatedContests.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)] hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    <div className="relative h-40 bg-slate-100 overflow-hidden">
                      <img
                        src={c.bannerImage}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0050A0] shadow-sm backdrop-blur-xs">
                        {c.tag}
                      </span>
                      <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-sm backdrop-blur-xs ${c.statusStyle}`}>
                        {c.statusLabel}
                      </span>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] text-sky-200 font-bold block">{c.editionLabel}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[11px] text-slate-400 font-semibold">{c.organizer}</span>
                        <h3 className="text-sm sm:text-base font-bold text-[#0B3C78] line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.description}</p>

                      {c.myOverallStatus && (
                        <div className="flex items-center justify-between text-xs text-amber-900 bg-amber-50/80 px-3 py-2 rounded-xl border border-amber-200/70">
                          <span className="flex items-center gap-1.5 font-bold">
                            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                            Kết quả của bạn:
                          </span>
                          <strong className="font-bold text-amber-950">
                            {c.myOverallStatus.totalScore}đ ({c.myOverallStatus.overallRank})
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => setSelectedContest(c)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-[#0050A0] hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                    >
                      <span>Xem chi tiết cuộc thi & Vào thi</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center space-y-3">
              <Trophy className="mx-auto w-10 h-10 text-sky-300" />
              <h3 className="text-sm font-bold text-slate-800">Không tìm thấy cuộc thi phù hợp</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thử đổi từ khóa tìm kiếm hoặc đặt lại bộ lọc trạng thái để xem các cuộc thi khác.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-sky-100 shadow-2xs mt-1">
              <span className="text-xs text-slate-500">
                Hiển thị <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{" "}
                <strong>{Math.min(currentPage * itemsPerPage, filteredContests.length)}</strong> trên tổng số{" "}
                <strong>{filteredContests.length}</strong> cuộc thi
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#0066CC] text-white shadow-sm"
                        : "text-slate-600 hover:bg-sky-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
