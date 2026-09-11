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
  BookOpen
} from "lucide-react";

// Mock Data with comprehensive list of Contests across categories and seasons
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
    category: "mini",
    categoryLabel: "Mini-Contest Định kỳ",
    season: "2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở Chặng 3 · Đồ thị ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "⚡ Mini-Contest",
    organizer: "Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/contest-img-2.png",
    totalPrize: "15.000.000đ + Quà tặng",
    targetAudience: "Học sinh luyện thi HSG & Lập trình viên",
    description: "Chuỗi 3 kỳ thi mini rèn luyện tốc độ thuật toán và chấm ACM/ICPC.",
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
    statusLabel: "Vòng Chung Khảo đang diễn ra 🔥",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tag: "🏅 Đấu trường Cấp Tỉnh",
    organizer: "Sở Giáo dục & Ban Cố vấn Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "30.000.000đ + Chứng nhận Cấp Tỉnh",
    targetAudience: "Đội tuyển HSG Tin học các trường THPT",
    description: "Kỳ thi cọ xát theo form đề chính thức của Bộ Giáo dục & Đào tạo gồm 4 bài toán phân hóa cao.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-TINH-109",
      overallRank: "#5 Tỉnh",
      totalScore: 290
    },
    activeRound: {
      id: "PROV_R2",
      roundNumber: 2,
      title: "Vòng 2: Chung Khảo Đội Tuyển Tỉnh",
      statusLabel: "Đang mở phòng thi",
      startDate: "Hôm nay · 08:30 – 12:30",
      duration: "240 phút",
      timeRemaining: "03:12:40",
      problemsCount: 4,
      totalParticipants: 320,
      candidateId: "SBD-TINH-109",
      note: "Đề thi chính thức chuẩn quốc gia. Hãy nộp code và theo dõi testcase."
    },
    pastStats: {
      userRounds: [
        { name: "Vòng 1 (Cụm trường)", score: 290, maxScore: 300, percentage: 96.6, rank: "#5", ac: "3/3 AC", date: "10/08/2026" }
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
      title: "Vòng 3: Giao lưu Đội tuyển Quốc gia",
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
    tag: "📊 Khảo sát phi thi đua",
    organizer: "Viện Đánh giá Năng lực Số",
    bannerImage: "/assets/contest-img-3.png",
    totalPrize: "Chứng nhận phân cấp năng lực",
    targetAudience: "Học sinh tự đánh giá trình độ trước khi vào lớp chuyên sâu",
    description: "Khảo sát chuẩn hóa năng lực tư duy thuật toán và kỹ năng lập trình đầu vào.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-KS-551",
      overallRank: "Hạng A (Xuất sắc)",
      totalScore: 92
    },
    activeRound: {
      id: "SURVEY_R2",
      roundNumber: 2,
      title: "Khảo sát Phần 2: Cấu trúc Dữ liệu Nâng cao",
      statusLabel: "Đang mở tự do",
      startDate: "Mở tự do đến 30/09/2026",
      duration: "90 phút",
      timeRemaining: "Không giới hạn",
      problemsCount: 20,
      totalParticipants: 1540,
      candidateId: "SBD-KS-551",
      note: "Khảo sát phi thi đua. Bạn có thể làm bài và nhận báo cáo năng lực ngay."
    },
    pastStats: {
      userRounds: [
        { name: "Phần 1: Tư duy Logic", score: 92, maxScore: 100, percentage: 92, rank: "Top 3%", ac: "14/15 đúng", date: "01/09/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Thí sinh ẩn danh #99", school: "THPT Chuyên KHTN", score: 100, time: "40'", medal: "🥇" },
        { rank: 2, name: "Thí sinh ẩn danh #12", school: "THPT Chuyên Lê Quý Đôn", score: 98, time: "45'", medal: "🥈" }
      ]
    },
    nextRound: {
      id: "SURVEY_R3",
      roundNumber: 3,
      title: "Đợt Khảo sát Năng lực Học kỳ II",
      targetDate: "15/12/2026",
      scheduleTime: "Mở tự do",
      duration: "90 phút",
      advancementCondition: "Mở tự do cho tất cả học sinh.",
      isRegistered: false
    }
  },
  {
    id: "ALGO_CUP_SUMMER",
    title: "Cúp Lập trình Mùa hè Ôn Thi 360 Algo-Cup 2026",
    editionLabel: "Mùa giải 2026",
    category: "mini",
    categoryLabel: "Mini-Contest Định kỳ",
    season: "2026",
    type: "contest",
    status: "completed",
    statusLabel: "Đã kết thúc",
    statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
    tag: "⚡ Mini-Contest",
    organizer: "Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/contest-img-1.png",
    totalPrize: "10.000.000đ + Huy hiệu Vinh danh",
    targetAudience: "Học sinh THCS & THPT",
    description: "Giải đấu khởi động mùa hè với các bài toán thuật toán ứng dụng thực tế.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-ALGO-220",
      overallRank: "#12 / 1,800",
      totalScore: 270
    },
    activeRound: null,
    pastStats: {
      userRounds: [
        { name: "Chung kết Algo-Cup", score: 270, maxScore: 300, percentage: 90, rank: "#12", ac: "3/3 AC", date: "15/07/2026" }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Phạm Quốc Bảo", school: "THPT Chuyên Nguyễn Trãi", score: 300, time: "75'", medal: "🥇" },
        { rank: 2, name: "Đỗ Gia Hưng", school: "THPT Chuyên Hùng Vương", score: 300, time: "92'", medal: "🥈" },
        { rank: 3, name: "Bùi Thảo My", school: "THPT Chuyên Lê Khiết", score: 290, time: "110'", medal: "🥉" }
      ]
    },
    nextRound: null
  },
  {
    id: "TRAINING_CAMP_AUTUMN",
    title: "Kỳ thi Đánh giá Trại hè Huấn luyện Tin học Mùa Thu 2026",
    editionLabel: "Mùa giải 2026",
    category: "national",
    categoryLabel: "Đấu trường Quốc gia",
    season: "2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở đăng ký ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "🏆 Trại Huấn luyện",
    organizer: "Ban Huấn luyện Đội tuyển & Ôn Thi 360",
    bannerImage: "/assets/generated-practice-hero-v1.png",
    totalPrize: "25.000.000đ + Học bổng Huấn luyện",
    targetAudience: "Học sinh chuyên Tin định hướng thi Quốc gia",
    description: "Kỳ thi đánh giá sau đợt tập huấn chuyên sâu các chủ đề đồ thị nâng cao và quy hoạch động quy mô lớn.",
    myOverallStatus: null,
    activeRound: null,
    pastStats: {
      userRounds: [],
      top5Valedictorians: []
    },
    nextRound: {
      id: "CAMP_R1",
      roundNumber: 1,
      title: "Kỳ thi Tuyển chọn Trại Huấn luyện",
      targetDate: "05/11/2026 (Chủ nhật)",
      scheduleTime: "08:00 – 12:00",
      duration: "240 phút (4 bài toán)",
      advancementCondition: "Mở đăng ký cho toàn bộ học sinh đạt từ 250 điểm ở các kỳ thi trước.",
      isRegistered: false
    }
  }
];

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [contests, setContests] = useState(CONTESTS_DATA);
  const [selectedContest, setSelectedContest] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, ongoing, upcoming, completed
  const [categoryFilter, setCategoryFilter] = useState("all"); // all, national, provincial, mini, survey
  const [seasonFilter, setSeasonFilter] = useState("all"); // all, 2026, 2025-2026

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [registeredRounds, setRegisteredRounds] = useState({});
  const [toastMsg, setToastMsg] = useState("");

  // Filtering Logic
  const filteredContests = useMemo(() => {
    return contests.filter((c) => {
      // Search match
      const searchMatch =
        searchTerm.trim() === "" ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.organizer.toLowerCase().includes(searchTerm.toLowerCase());

      // Status match
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "ongoing" && c.status === "ongoing") ||
        (statusFilter === "upcoming" && c.status === "upcoming") ||
        (statusFilter === "completed" && c.status === "completed") ||
        (statusFilter === "surveys" && c.type === "survey");

      // Category match
      const categoryMatch = categoryFilter === "all" || c.category === categoryFilter;

      // Season match
      const seasonMatch = seasonFilter === "all" || c.season === seasonFilter;

      return searchMatch && statusMatch && categoryMatch && seasonMatch;
    });
  }, [contests, searchTerm, statusFilter, categoryFilter, seasonFilter]);

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredContests.length / itemsPerPage));
  const paginatedContests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContests, currentPage, itemsPerPage]);

  // Reset page when filter changes
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
                {selectedContest.pastStats?.userRounds.length > 0 ? (
                  <div className="space-y-3 pt-1">
                    {selectedContest.pastStats.userRounds.map((r, idx) => (
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
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center italic">Bạn chưa tham gia vòng thi nào trước đây.</p>
                )}
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

                {selectedContest.pastStats?.top5Valedictorians.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedContest.pastStats.top5Valedictorians.map((val) => (
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
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center italic">Chưa có dữ liệu thủ khoa vòng trước.</p>
                )}
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
        /* VIEW 2: DANH SÁCH TẤT CẢ CUỘC THI CÓ TÌM KIẾM, BỘ LỌC VÀ PHÂN TRANG      */
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
                Tìm kiếm, lọc theo mùa giải, cấp độ thi đấu và theo dõi lịch trình các vòng thi.
              </p>
            </div>

            <div className="bg-white/15 px-3.5 py-2.5 rounded-xl border border-white/20 text-xs shrink-0 text-center">
              <span className="text-[10px] text-sky-200 block uppercase font-bold">Đang mở hôm nay</span>
              <strong className="text-amber-300 font-mono text-sm font-black">Olympic 2026 · Vòng 2</strong>
            </div>
          </div>

          {/* THANH TÌM KIẾM & BỘ LỌC TOÀN DIỆN */}
          <div className="bg-white p-3.5 rounded-2xl border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)] space-y-3">
            {/* Hàng 1: Search Box & Trạng thái chính */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
              {/* Ô tìm kiếm */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm cuộc thi, giải đấu, đơn vị tổ chức..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Tab Pills */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-50 p-1 rounded-xl border border-slate-100">
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "ongoing", label: "Đang diễn ra 🔥" },
                  { id: "upcoming", label: "Sắp mở" },
                  { id: "completed", label: "Đã xong" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setStatusFilter(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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

            {/* Hàng 2: Dropdown Lọc Cấp độ, Mùa giải và Nút Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Lọc theo:
                </span>

                {/* Dropdown Phân loại */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Tất cả Cấp độ / Thể loại</option>
                  <option value="national">🏆 Đấu trường Quốc gia</option>
                  <option value="provincial">🏅 Đấu trường Cấp Tỉnh</option>
                  <option value="mini">⚡ Mini-Contest Định kỳ</option>
                  <option value="survey">📊 Khảo sát Năng lực</option>
                </select>

                {/* Dropdown Mùa giải */}
                <select
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Tất cả Mùa giải</option>
                  <option value="2026">Mùa giải 2026</option>
                  <option value="2025-2026">Mùa giải 2025–2026</option>
                </select>

                {(searchTerm || statusFilter !== "all" || categoryFilter !== "all" || seasonFilter !== "all") && (
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Xóa bộ lọc</span>
                  </button>
                )}
              </div>

              {/* Số lượng kết quả */}
              <span className="text-slate-400 text-[11px]">
                Tìm thấy <strong className="text-slate-700 font-bold">{filteredContests.length}</strong> cuộc thi
              </span>
            </div>
          </div>

          {/* DANH SÁCH CARDS CUỘC THI */}
          {paginatedContests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedContests.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    <div className="relative h-36 bg-slate-100 overflow-hidden">
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
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold">{c.editionLabel} · {c.organizer}</span>
                        <h3 className="text-sm font-bold text-[#0B3C78] line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {c.title}
                        </h3>
                      </div>
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
                      <span>Xem chi tiết 3 cụm & Vào thi</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State khi không tìm thấy kết quả */
            <div className="rounded-2xl border border-dashed border-sky-200 bg-white p-8 text-center space-y-3">
              <Trophy className="mx-auto w-10 h-10 text-sky-300" />
              <h3 className="text-sm font-bold text-slate-700">Không tìm thấy cuộc thi phù hợp</h3>
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

          {/* PHÂN TRANG (PAGINATION) */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-sky-100 shadow-2xs mt-1">
              <span className="text-[11px] text-slate-500">
                Hiển thị <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> -{" "}
                <strong>{Math.min(currentPage * itemsPerPage, filteredContests.length)}</strong> trên tổng số{" "}
                <strong>{filteredContests.length}</strong> cuộc thi
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[#0066CC] text-white shadow-2xs"
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
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
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
