import React, { useState, useMemo } from "react";
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Search,
  Check,
  Trophy,
  Award,
  Sparkles,
  RotateCcw,
  MapPin,
  ChevronDown,
  ArrowLeft,
  Star,
  Users,
  School,
  Medal,
  Flame,
  Zap,
  Eye,
  X,
  Target,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  Crown
} from "lucide-react";

// Danh mục các cuộc thi trong hệ sinh thái Ôn Thi 360
const CONTEST_TABS = [
  {
    id: "global-confidence",
    badge: "CUỘC THI TIẾNG ANH",
    badgeBg: "bg-gradient-to-r from-orange-500 to-amber-500",
    category: "english",
    title: 'Cuộc thi "Tự Tin Vươn Thế Giới"',
    description:
      'Tự Tin Vươn Thế Giới là cuộc thi Tiếng Anh Hàng Năm do Liên Hiệp Quốc các nước Đông Nam Á tổ chức nhằm tạo sân chơi lành mạnh cho các bạn trẻ.',
    currentStep: 2,
    totalParticipants: 4820,
    topScore: 100,
    timeRemaining: "12 ngày 08 giờ",
    steps: [
      { id: 1, label: "Đăng ký", status: "completed", date: "01/09 - 10/09" },
      { id: 2, label: "Diễn ra", status: "active", date: "11/09 - 25/09" },
      { id: 3, label: "Kết thúc", status: "upcoming", date: "28/09/2026" }
    ],
    userStanding: {
      rank: 7,
      score: 50,
      gapToNext: 15,
      targetRank: 6,
      statusMessage: "Bạn đang ở Top 10%! Hoàn thành thêm 1 đề để vào Top 5"
    }
  },
  {
    id: "olympic-informatics",
    badge: "ĐẤU TRƯỜNG TOÀN QUỐC",
    badgeBg: "bg-gradient-to-r from-blue-600 to-indigo-600",
    category: "informatics",
    title: 'Kỳ thi Olympic Tin học Trẻ Mở Rộng 2026',
    description:
      'Sân chơi tranh tài thuật toán đỉnh cao dành cho học sinh THCS & THPT toàn quốc chuẩn bị cho các kỳ thi HSG Quốc gia và Quốc tế.',
    currentStep: 2,
    totalParticipants: 6350,
    topScore: 300,
    timeRemaining: "04 ngày 15 giờ",
    steps: [
      { id: 1, label: "Vòng Sơ Loại", status: "completed", date: "15/08 - 28/08" },
      { id: 2, label: "Vòng Bán Kết", status: "active", date: "05/09 - 20/09" },
      { id: 3, label: "Chung Kết Toàn Quốc", status: "upcoming", date: "10/10/2026" }
    ],
    userStanding: {
      rank: 14,
      score: 280,
      gapToNext: 10,
      targetRank: 10,
      statusMessage: "Bạn đang nằm trong nhóm giành vé vào Vòng Chung Kết"
    }
  },
  {
    id: "math-code-arena",
    badge: "TOÁN TIN ỨNG DỤNG",
    badgeBg: "bg-gradient-to-r from-teal-600 to-emerald-600",
    category: "math",
    title: 'Đấu trường Toán Tin 360 - Mùa Thu Khởi Sắc',
    description:
      'Thử thách tư duy logic kết hợp lập trình ứng dụng giải quyết các bài toán khoa học dữ liệu thực tiễn cho học sinh xuất sắc.',
    currentStep: 3,
    totalParticipants: 3190,
    topScore: 200,
    timeRemaining: "Đã hoàn thành",
    steps: [
      { id: 1, label: "Đăng ký & Ôn tập", status: "completed", date: "01/08 - 15/08" },
      { id: 2, label: "Tranh tài Trực tuyến", status: "completed", date: "16/08 - 30/08" },
      { id: 3, label: "Vinh danh Trao giải", status: "active", date: "05/09 - 15/09" }
    ],
    userStanding: {
      rank: 5,
      score: 185,
      gapToNext: 5,
      targetRank: 3,
      statusMessage: "Xuất sắc giành Giải Ba toàn quốc!"
    }
  }
];

// Dữ liệu bảng vàng thí sinh phong phú, tên đa dạng thực tế
const CONTEST_LEADERBOARDS = {
  "global-confidence": [
    {
      rank: 1,
      name: "Võ Thị Quỳnh Giang",
      score: 100,
      city: "Hà Tĩnh",
      school: "THPT Chuyên Hà Tĩnh",
      grade: "11 Anh",
      avatar: "/assets/leaderboard-rank1.jpg",
      badgeType: "rank1",
      isCurrentUser: false,
      accuracy: "100%",
      time: "38 phút",
      submissions: 10,
      streak: 18,
      trend: "up",
      trendVal: "+1",
      badgeLabel: "Quán Quân Bảng Vàng"
    },
    {
      rank: 2,
      name: "Trần Minh Thư",
      score: 90,
      city: "Hà Nội",
      school: "THPT Chuyên Hà Nội - Amsterdam",
      grade: "12 Anh 1",
      avatar: "/assets/leaderboard-rank2.jpg",
      badgeType: "rank2",
      isCurrentUser: false,
      accuracy: "96%",
      time: "42 phút",
      submissions: 10,
      streak: 15,
      trend: "up",
      trendVal: "+3",
      badgeLabel: "Á Quân 1"
    },
    {
      rank: 3,
      name: "Nguyễn Hoàng Nam",
      score: 75,
      city: "TP. Hồ Chí Minh",
      school: "THPT Chuyên Lê Hồng Phong",
      grade: "11 Anh",
      avatar: "/assets/leaderboard-rank3.jpg",
      badgeType: "rank3",
      isCurrentUser: false,
      accuracy: "92%",
      time: "49 phút",
      submissions: 9,
      streak: 12,
      trend: "same",
      trendVal: "0",
      badgeLabel: "Á Quân 2"
    },
    {
      rank: 4,
      name: "Lê Phương Thảo",
      score: 70,
      city: "Đà Nẵng",
      school: "THPT Chuyên Lê Quý Đôn",
      grade: "10 Anh",
      avatar: "/assets/leaderboard-girl.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "88%",
      time: "52 phút",
      submissions: 8,
      streak: 9,
      trend: "up",
      trendVal: "+2"
    },
    {
      rank: 5,
      name: "Phạm Đức Duy",
      score: 65,
      city: "Nam Định",
      school: "THPT Chuyên Lê Hồng Phong",
      grade: "12 Chuyên",
      avatar: "/assets/leaderboard-boy.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "85%",
      time: "55 phút",
      submissions: 8,
      streak: 14,
      trend: "down",
      trendVal: "-1"
    },
    {
      rank: 6,
      name: "Hoàng Khánh Linh",
      score: 65,
      city: "Nghệ An",
      school: "THPT Chuyên Phan Bội Châu",
      grade: "11 Anh",
      avatar: "/assets/leaderboard-girl.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "84%",
      time: "58 phút",
      submissions: 8,
      streak: 11,
      trend: "up",
      trendVal: "+1"
    },
    {
      rank: 7,
      name: "Nguyễn Hà My (Bạn)",
      score: 50,
      city: "Hà Tĩnh",
      school: "THPT Chuyên Hà Tĩnh",
      grade: "11 Chuyên",
      avatar: "/assets/leaderboard-user.jpg",
      badgeType: "normal",
      isCurrentUser: true,
      gapToNextRank: 16,
      accuracy: "80%",
      time: "62 phút",
      submissions: 6,
      streak: 8,
      trend: "up",
      trendVal: "+4",
      badgeLabel: "Vị Trí Của Bạn"
    },
    {
      rank: 8,
      name: "Bùi Gia Khiêm",
      score: 35,
      city: "Thừa Thiên Huế",
      school: "THPT Chuyên Quốc Học Huế",
      grade: "10 Anh",
      avatar: "/assets/leaderboard-boy.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "72%",
      time: "68 phút",
      submissions: 5,
      streak: 6,
      trend: "down",
      trendVal: "-2"
    },
    {
      rank: 9,
      name: "Đặng Thu Thảo",
      score: 35,
      city: "Thanh Hóa",
      school: "THPT Chuyên Lam Sơn",
      grade: "11 Anh",
      avatar: "/assets/leaderboard-girl.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "70%",
      time: "71 phút",
      submissions: 5,
      streak: 7,
      trend: "same",
      trendVal: "0"
    },
    {
      rank: 10,
      name: "Lê Văn Thành",
      score: 25,
      city: "Ninh Bình",
      school: "THPT Chuyên Lương Văn Tụy",
      grade: "12 Anh",
      avatar: "/assets/leaderboard-boy.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "65%",
      time: "76 phút",
      submissions: 4,
      streak: 5,
      trend: "down",
      trendVal: "-1"
    },
    {
      rank: 11,
      name: "Trần Bảo Ngọc",
      score: 25,
      city: "Hải Phòng",
      school: "THPT Chuyên Trần Phú",
      grade: "10 Anh",
      avatar: "/assets/rank-avatar-1.png",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "62%",
      time: "80 phút",
      submissions: 4,
      streak: 4,
      trend: "up",
      trendVal: "+2"
    },
    {
      rank: 12,
      name: "Vũ Hải Đăng",
      score: 20,
      city: "Bắc Giang",
      school: "THPT Chuyên Bắc Giang",
      grade: "11 Anh",
      avatar: "/assets/rank-avatar-2.png",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "58%",
      time: "84 phút",
      submissions: 3,
      streak: 3,
      trend: "same",
      trendVal: "0"
    }
  ],
  "olympic-informatics": [
    {
      rank: 1,
      name: "Nguyễn Minh Anh",
      score: 300,
      city: "Hà Nội",
      school: "THPT Chuyên Khoa học Tự nhiên",
      grade: "12 Tin",
      avatar: "/assets/leaderboard-rank1.jpg",
      badgeType: "rank1",
      isCurrentUser: false,
      accuracy: "100%",
      time: "85 phút",
      submissions: 4,
      streak: 28,
      trend: "same",
      trendVal: "0",
      badgeLabel: "Grandmaster"
    },
    {
      rank: 2,
      name: "Trần Đức Duy",
      score: 300,
      city: "Hà Nội",
      school: "THPT Chuyên Sư Phạm Hà Nội",
      grade: "12 Tin",
      avatar: "/assets/leaderboard-rank2.jpg",
      badgeType: "rank2",
      isCurrentUser: false,
      accuracy: "100%",
      time: "102 phút",
      submissions: 4,
      streak: 24,
      trend: "up",
      trendVal: "+1",
      badgeLabel: "Master"
    },
    {
      rank: 3,
      name: "Lê Phương Thảo",
      score: 290,
      city: "Hà Nội",
      school: "THPT Chuyên Hà Nội - Amsterdam",
      grade: "11 Tin",
      avatar: "/assets/leaderboard-rank3.jpg",
      badgeType: "rank3",
      isCurrentUser: false,
      accuracy: "96%",
      time: "110 phút",
      submissions: 4,
      streak: 19,
      trend: "same",
      trendVal: "0",
      badgeLabel: "Candidate Master"
    },
    {
      rank: 4,
      name: "Phạm Hoàng Nam",
      score: 285,
      city: "Thái Bình",
      school: "THPT Chuyên Thái Bình",
      grade: "12 Tin",
      avatar: "/assets/leaderboard-boy.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "95%",
      time: "115 phút",
      submissions: 4,
      streak: 15,
      trend: "up",
      trendVal: "+2"
    },
    {
      rank: 5,
      name: "Vũ Thị Mai",
      score: 280,
      city: "Thanh Hóa",
      school: "THPT Chuyên Lam Sơn",
      grade: "11 Tin",
      avatar: "/assets/leaderboard-girl.jpg",
      badgeType: "normal",
      isCurrentUser: false,
      accuracy: "93%",
      time: "120 phút",
      submissions: 4,
      streak: 12,
      trend: "down",
      trendVal: "-1"
    }
  ],
  "math-code-arena": [
    {
      rank: 1,
      name: "Đỗ Quốc Bảo",
      score: 200,
      city: "TP. Hồ Chí Minh",
      school: "THPT Chuyên Lê Hồng Phong",
      grade: "12 Tin",
      avatar: "/assets/leaderboard-rank1.jpg",
      badgeType: "rank1",
      isCurrentUser: false,
      accuracy: "100%",
      time: "55 phút",
      submissions: 6,
      streak: 20,
      trend: "up",
      trendVal: "+1"
    },
    {
      rank: 2,
      name: "Hoàng Minh Tuấn",
      score: 195,
      city: "Bắc Ninh",
      school: "THPT Chuyên Bắc Ninh",
      grade: "11 Toán",
      avatar: "/assets/leaderboard-rank2.jpg",
      badgeType: "rank2",
      isCurrentUser: false,
      accuracy: "98%",
      time: "60 phút",
      submissions: 6,
      streak: 16,
      trend: "same",
      trendVal: "0"
    },
    {
      rank: 3,
      name: "Nguyễn Hà Linh",
      score: 190,
      city: "Nghệ An",
      school: "THPT Chuyên Phan Bội Châu",
      grade: "12 Toán Tin",
      avatar: "/assets/leaderboard-rank3.jpg",
      badgeType: "rank3",
      isCurrentUser: false,
      accuracy: "95%",
      time: "65 phút",
      submissions: 6,
      streak: 14,
      trend: "up",
      trendVal: "+3"
    }
  ]
};

// Bảng xếp hạng Trường Học Toàn Đoàn
const SCHOOL_RANKINGS = [
  {
    rank: 1,
    name: "THPT Chuyên Khoa học Tự nhiên",
    city: "Hà Nội",
    studentsCount: 245,
    topScoreSum: 2890,
    goldMedals: 12,
    silverMedals: 18,
    bronzeMedals: 25,
    badge: "🏆 Nhất Toàn Đoàn"
  },
  {
    rank: 2,
    name: "THPT Chuyên Hà Nội - Amsterdam",
    city: "Hà Nội",
    studentsCount: 210,
    topScoreSum: 2740,
    goldMedals: 10,
    silverMedals: 16,
    bronzeMedals: 20,
    badge: "🥈 Nhì Toàn Đoàn"
  },
  {
    rank: 3,
    name: "THPT Chuyên Lê Hồng Phong",
    city: "TP. Hồ Chí Minh",
    studentsCount: 195,
    topScoreSum: 2610,
    goldMedals: 8,
    silverMedals: 14,
    bronzeMedals: 19,
    badge: "🥉 Ba Toàn Đoàn"
  },
  {
    rank: 4,
    name: "THPT Chuyên Phan Bội Châu",
    city: "Nghệ An",
    studentsCount: 160,
    topScoreSum: 2480,
    goldMedals: 6,
    silverMedals: 11,
    bronzeMedals: 15,
    badge: "Top 5 Xuất Sắc"
  },
  {
    rank: 5,
    name: "THPT Chuyên Hà Tĩnh",
    city: "Hà Tĩnh",
    studentsCount: 145,
    topScoreSum: 2390,
    goldMedals: 5,
    silverMedals: 9,
    bronzeMedals: 14,
    badge: "Top 5 Xuất Sắc"
  }
];

// Danh sách các Tỉnh/Thành phố
const PROVINCES = [
  "Tất cả Tỉnh/Thành",
  "Hà Tĩnh",
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Nghệ An",
  "Thanh Hóa",
  "Nam Định",
  "Ninh Bình"
];

// Phân loại khối lớp
const GRADE_FILTERS = [
  { id: "all", label: "Tất cả Khối" },
  { id: "10", label: "Khối 10" },
  { id: "11", label: "Khối 11" },
  { id: "12", label: "Khối 12" }
];

export default function LeaderboardPage({ onNavigate }) {
  const [selectedContestId, setSelectedContestId] = useState("global-confidence");
  const [selectedProvince, setSelectedProvince] = useState("Tất cả Tỉnh/Thành");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState("individuals"); // 'individuals' | 'podium' | 'schools'

  const currentContest = useMemo(() => {
    return CONTEST_TABS.find((c) => c.id === selectedContestId) || CONTEST_TABS[0];
  }, [selectedContestId]);

  const rawList = useMemo(() => {
    return CONTEST_LEADERBOARDS[selectedContestId] || CONTEST_LEADERBOARDS["global-confidence"];
  }, [selectedContestId]);

  // Bộ lọc danh sách thí sinh
  const filteredData = useMemo(() => {
    return rawList.filter((item) => {
      const matchCity =
        selectedProvince === "Tất cả Tỉnh/Thành" || item.city === selectedProvince;
      const matchGrade =
        selectedGrade === "all" || (item.grade && item.grade.includes(selectedGrade));
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchGrade && matchSearch;
    });
  }, [rawList, selectedProvince, selectedGrade, searchQuery]);

  // Top 3 Podium
  const top3Podium = useMemo(() => {
    return rawList.slice(0, 3);
  }, [rawList]);

  // Phân trang
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleReturn = () => {
    if (onNavigate) {
      onNavigate("Cuộc thi");
    }
  };

  const handlePracticeNow = () => {
    if (onNavigate) {
      onNavigate("Luyện tập");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20 font-sans">
      {/* 1. BREADCRUMB THANH ĐIỀU HƯỚNG */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 px-1">
        <button
          onClick={() => onNavigate && onNavigate("Trang chủ")}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer group"
          title="Trang chủ"
        >
          <Home className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </button>
        <span className="text-slate-300">/</span>
        <button
          onClick={() => onNavigate && onNavigate("Cuộc thi")}
          className="hover:text-blue-600 transition-colors cursor-pointer"
        >
          Cuộc thi
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 font-medium truncate max-w-[180px] sm:max-w-none">
          {currentContest.title.replace(/Cuộc thi |Kỳ thi /g, "")}
        </span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-bold">Bảng xếp hạng</span>
      </nav>

      {/* 2. CARD 1: HEADER THÔNG TIN CUỘC THI & TIMELINE */}
      <section className="bg-white rounded-3xl p-6 sm:p-9 shadow-sm border border-[#E2EDF8] relative overflow-hidden transition-all">
        {/* Glow ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/40 via-sky-50/50 to-transparent rounded-full blur-3xl pointer-events-none -mr-28 -mt-28"></div>

        <div className="relative z-10 space-y-6">
          {/* Top Bar: Badge & Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider text-white shadow-sm uppercase ${currentContest.badgeBg}`}
            >
              {currentContest.badge}
            </span>

            {/* Quick Switcher Between Contests */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/70 text-xs">
              {CONTEST_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedContestId(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    selectedContestId === tab.id
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.id === "global-confidence"
                    ? "Tự Tin Vươn Thế Giới"
                    : tab.id === "olympic-informatics"
                    ? "Olympic Tin Học"
                    : "Toán Tin 360"}
                </button>
              ))}
            </div>
          </div>

          {/* Tiêu đề & Mô tả */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-800 tracking-tight leading-snug">
              {currentContest.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
              {currentContest.description}
            </p>
          </div>

          {/* Quick Stats Pill Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 font-medium">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>
                Thí sinh: <strong className="text-slate-800">{currentContest.totalParticipants.toLocaleString()}</strong>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Thời gian: <strong className="text-slate-800">{currentContest.timeRemaining}</strong>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 font-medium">
              <Trophy className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                Điểm cao nhất: <strong className="text-slate-800">{currentContest.topScore}đ</strong>
              </span>
            </span>
          </div>

          {/* Timeline 3 Bước */}
          <div className="pt-2 pb-2 max-w-2xl mx-auto sm:mx-0">
            <div className="flex items-center justify-between relative">
              {/* Connector Bar */}
              <div className="absolute left-[36px] right-[36px] top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{
                    width:
                      currentContest.currentStep === 1
                        ? "0%"
                        : currentContest.currentStep === 2
                        ? "50%"
                        : "100%"
                  }}
                />
              </div>

              {/* Step 1 */}
              <div className="relative z-10 flex items-center gap-2 bg-white pr-3">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 block">
                    {currentContest.steps[0].label}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block">
                    {currentContest.steps[0].date}
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex items-center gap-2 bg-white px-3">
                <div className="w-7 h-7 rounded-full bg-[#1C64F2] text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ring-blue-100 animate-pulse">
                  2
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#1C64F2] block">
                    {currentContest.steps[1].label}
                  </span>
                  <span className="text-[10px] text-blue-500 hidden sm:block">
                    {currentContest.steps[1].date}
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex items-center gap-2 bg-white pl-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-medium text-slate-400 block">
                    {currentContest.steps[2].label}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block">
                    {currentContest.steps[2].date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-between gap-4 border-t border-slate-100">
            <button
              onClick={handleReturn}
              className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-[#009688] hover:bg-[#00897B] active:scale-98 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Trở về</span>
            </button>

            {/* User Standing Spotlight Banner */}
            <div className="flex items-center gap-3 bg-emerald-50/80 border border-emerald-200/80 px-4 py-2 rounded-2xl text-xs">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-900 font-medium">
                Vị trí của bạn: <strong className="text-emerald-700 font-black">Hạng #{currentContest.userStanding.rank}</strong> ({currentContest.userStanding.score}đ) — Cần {currentContest.userStanding.gapToNext}đ để lên Hạng #{currentContest.userStanding.targetRank}
              </span>
              <button
                onClick={handlePracticeNow}
                className="ml-1 text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
              >
                Luyện tập ngay →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PODIUM TOP 3 HIGHLIGHT SECTION (KHỐI VINH DANH TOP 3 THEO STYLE ONTHI360) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top 2: Á Quân 1 */}
        {top3Podium[1] && (
          <div
            onClick={() => setSelectedCandidate(top3Podium[1])}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center group md:order-1"
          >
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-slate-400" /> Hạng #2
              </span>
              <span className="text-slate-400 font-medium">{top3Podium[1].city}</span>
            </div>

            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-slate-400 via-sky-200 to-blue-500 shadow-md flex items-center justify-center">
                <img
                  src={top3Podium[1].avatar}
                  alt={top3Podium[1].name}
                  className="w-full h-full object-cover rounded-full bg-slate-50"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 text-xl">🥈</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              {top3Podium[1].name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{top3Podium[1].school}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block">Điểm số</span>
                <strong className="text-slate-900 text-lg font-black">{top3Podium[1].score}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Độ chính xác</span>
                <strong className="text-emerald-600 font-bold">{top3Podium[1].accuracy}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Thời gian</span>
                <strong className="text-slate-700 font-semibold">{top3Podium[1].time}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Top 1: Quán Quân Bảng Vàng (Center & Highlighted) */}
        {top3Podium[0] && (
          <div
            onClick={() => setSelectedCandidate(top3Podium[0])}
            className="bg-gradient-to-b from-amber-50/80 via-white to-white rounded-3xl p-6 border-2 border-amber-300 shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center group md:order-2 md:-mt-2"
          >
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold flex items-center gap-1 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200" /> Quán Quân #1
              </span>
              <span className="text-amber-700 font-bold">{top3Podium[0].city}</span>
            </div>

            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full p-1.5 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-xl flex items-center justify-center">
                <img
                  src={top3Podium[0].avatar}
                  alt={top3Podium[0].name}
                  className="w-full h-full object-cover rounded-full bg-amber-50"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 text-2xl">🥇</span>
            </div>

            <h3 className="font-black text-slate-900 text-lg group-hover:text-amber-600 transition-colors">
              {top3Podium[0].name}
            </h3>
            <p className="text-xs text-slate-600 font-medium line-clamp-1">{top3Podium[0].school}</p>

            <div className="mt-4 pt-3 border-t border-amber-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block">Điểm số</span>
                <strong className="text-amber-600 text-2xl font-black">{top3Podium[0].score}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Độ chính xác</span>
                <strong className="text-emerald-600 font-bold">{top3Podium[0].accuracy}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Thời gian</span>
                <strong className="text-slate-700 font-semibold">{top3Podium[0].time}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Top 3: Á Quân 2 */}
        {top3Podium[2] && (
          <div
            onClick={() => setSelectedCandidate(top3Podium[2])}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col items-center text-center group md:order-3"
          >
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-900 font-bold flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-amber-700" /> Hạng #3
              </span>
              <span className="text-slate-400 font-medium">{top3Podium[2].city}</span>
            </div>

            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-900 shadow-md flex items-center justify-center">
                <img
                  src={top3Podium[2].avatar}
                  alt={top3Podium[2].name}
                  className="w-full h-full object-cover rounded-full bg-amber-50"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 text-xl">🥉</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
              {top3Podium[2].name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{top3Podium[2].school}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block">Điểm số</span>
                <strong className="text-slate-900 text-lg font-black">{top3Podium[2].score}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Độ chính xác</span>
                <strong className="text-emerald-600 font-bold">{top3Podium[2].accuracy}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Thời gian</span>
                <strong className="text-slate-700 font-semibold">{top3Podium[2].time}</strong>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. CARD 2: BẢNG "VINH DANH BẢNG VÀNG" ĐẦY ĐỦ */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#E2EDF8] space-y-6">
        {/* Header Vinh Danh */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-amber-500 font-extrabold text-sm sm:text-base uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-amber-500 inline-block" />
            <span>VINH DANH BẢNG VÀNG</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black text-slate-800 tracking-tight">
            {currentContest.title}
          </h2>
        </div>

        {/* View Mode Tabs: Cá nhân vs Trường học */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs">
            <button
              onClick={() => setActiveViewTab("individuals")}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeViewTab === "individuals"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bảng Vàng Cá Nhân ({rawList.length})
            </button>
            <button
              onClick={() => setActiveViewTab("schools")}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeViewTab === "schools"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bảng Xếp Hạng Trường Học ({SCHOOL_RANKINGS.length})
            </button>
          </div>

          {/* Bộ lọc khối lớp */}
          {activeViewTab === "individuals" && (
            <div className="flex items-center gap-1 text-xs">
              {GRADE_FILTERS.map((gf) => (
                <button
                  key={gf.id}
                  onClick={() => {
                    setSelectedGrade(gf.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                    selectedGrade === gf.id
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {gf.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search & Province Filter Bar */}
        {activeViewTab === "individuals" && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo họ tên, trường học, tỉnh thành..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Province Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{selectedProvince}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95">
                  {PROVINCES.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => {
                        setSelectedProvince(prov);
                        setIsCityDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        selectedProvince === prov
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{prov}</span>
                      {selectedProvince === prov && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: BẢNG XẾP HẠNG CÁ NHÂN (THEO MẪU HÌNH ẢNH) */}
        {activeViewTab === "individuals" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200/80 text-xs sm:text-sm text-slate-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-3 w-16 sm:w-20 text-center">Hạng</th>
                  <th className="py-3.5 px-3 w-24 text-center">Avatar</th>
                  <th className="py-3.5 px-4">Họ và tên</th>
                  <th className="py-3.5 px-4 w-28 sm:w-36 text-center">Điểm số</th>
                  <th className="py-3.5 px-4 w-36 sm:w-44 text-right">
                    <div
                      onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                      className="inline-flex items-center justify-end gap-1 cursor-pointer hover:text-blue-600 transition-colors select-none"
                    >
                      <span>Tỉnh/Thành phố</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-dashed divide-slate-200/70 text-sm">
                {paginatedData.map((item) => {
                  const isTop1 = item.rank === 1;
                  const isTop2 = item.rank === 2;
                  const isTop3 = item.rank === 3;
                  const isUser = item.isCurrentUser;

                  return (
                    <tr
                      key={`${item.rank}-${item.name}`}
                      onClick={() => setSelectedCandidate(item)}
                      className={`group transition-all duration-150 cursor-pointer ${
                        isUser
                          ? "bg-[#EBF8F1] hover:bg-[#E2F5EB] border-y-2 border-emerald-300/80 font-medium"
                          : "hover:bg-slate-50/90"
                      }`}
                    >
                      {/* 1. HẠNG */}
                      <td className="py-4 px-3 text-center align-middle">
                        {isTop1 ? (
                          <div className="inline-flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-amber-700 text-white flex items-center justify-center shadow-sm border border-amber-300 group-hover:scale-110 transition-transform">
                              <Trophy className="w-4 h-4 text-amber-200 fill-amber-300" />
                            </div>
                          </div>
                        ) : isTop2 ? (
                          <div className="inline-flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shadow-sm border border-blue-300 group-hover:scale-110 transition-transform">
                              <Medal className="w-4 h-4 text-slate-200 fill-slate-200" />
                            </div>
                          </div>
                        ) : isTop3 ? (
                          <div className="inline-flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center shadow-sm border border-emerald-300 group-hover:scale-110 transition-transform">
                              <Award className="w-4 h-4 text-amber-200 fill-amber-300" />
                            </div>
                          </div>
                        ) : (
                          <span
                            className={`font-black text-base sm:text-lg ${
                              isUser ? "text-emerald-700" : "text-slate-800"
                            }`}
                          >
                            {item.rank}
                          </span>
                        )}
                      </td>

                      {/* 2. AVATAR VỚI VÒNG NGUYỆT QUẾ VÀ TOOLTIP */}
                      <td className="py-4 px-3 text-center align-middle relative">
                        <div className="inline-flex items-center justify-center relative">
                          {/* Rank 1 Laurel Frame */}
                          {isTop1 && (
                            <div className="relative p-1">
                              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-md flex items-center justify-center">
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-full bg-amber-50"
                                />
                              </div>
                              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-amber-500 text-lg select-none">
                                🌿
                              </span>
                              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-amber-500 text-lg select-none transform scale-x-[-1]">
                                🌿
                              </span>
                            </div>
                          )}

                          {/* Rank 2 Laurel Frame */}
                          {isTop2 && (
                            <div className="relative p-1">
                              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-slate-400 via-sky-200 to-blue-500 shadow-md flex items-center justify-center">
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-full bg-slate-50"
                                />
                              </div>
                              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-sky-400 text-lg select-none">
                                🌿
                              </span>
                              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-sky-400 text-lg select-none transform scale-x-[-1]">
                                🌿
                              </span>
                            </div>
                          )}

                          {/* Rank 3 Laurel Frame */}
                          {isTop3 && (
                            <div className="relative p-1">
                              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-700 via-amber-400 to-amber-900 shadow-md flex items-center justify-center">
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-full bg-amber-50"
                                />
                              </div>
                              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-amber-600 text-lg select-none">
                                🌿
                              </span>
                              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-amber-600 text-lg select-none transform scale-x-[-1]">
                                🌿
                              </span>
                            </div>
                          )}

                          {/* Normal Ranks & User */}
                          {!isTop1 && !isTop2 && !isTop3 && (
                            <div className="relative">
                              <div
                                className={`w-11 h-11 rounded-full overflow-hidden p-0.5 shadow-sm border ${
                                  isUser
                                    ? "border-emerald-400 ring-2 ring-emerald-200"
                                    : "border-slate-200 bg-slate-100"
                                }`}
                              >
                                <img
                                  src={item.avatar}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>

                              {/* Tooltip Badge: "Bạn cần 16 điểm để thăng hạng" */}
                              {isUser && (
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 pointer-events-none">
                                  <div className="bg-[#48BB78] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                                    <span>Bạn cần {item.gapToNextRank || 16} điểm để thăng hạng</span>
                                  </div>
                                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#48BB78] mx-auto"></div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* 3. HỌ VÀ TÊN & TRƯỜNG */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold text-sm sm:text-base ${
                                isUser ? "text-emerald-900" : "text-slate-800"
                              }`}
                            >
                              {item.name}
                            </span>
                            {isUser && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-200 text-emerald-800">
                                Bạn
                              </span>
                            )}
                            {item.grade && (
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                {item.grade}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-normal">
                            {item.school}
                          </span>
                        </div>
                      </td>

                      {/* 4. ĐIỂM SỐ */}
                      <td className="py-4 px-4 text-center align-middle">
                        <span
                          className={`text-base sm:text-lg font-black ${
                            isUser
                              ? "text-emerald-600"
                              : isTop1
                              ? "text-slate-900 font-black"
                              : "text-slate-800"
                          }`}
                        >
                          {item.score}
                        </span>
                      </td>

                      {/* 5. TỈNH / THÀNH PHỐ */}
                      <td className="py-4 px-4 text-right align-middle">
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                          {item.city}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 text-sm">
                      Không tìm thấy thí sinh nào phù hợp với bộ lọc hiện tại.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: BẢNG XẾP HẠNG TRƯỜNG HỌC / ĐỘI TUYỂN */}
        {activeViewTab === "schools" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200/80 text-xs sm:text-sm text-slate-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-3 w-16 text-center">Hạng</th>
                  <th className="py-3.5 px-4">Trường THPT / Đội Tuyển</th>
                  <th className="py-3.5 px-4 text-center">Số học sinh</th>
                  <th className="py-3.5 px-4 text-center">Tổng điểm Top</th>
                  <th className="py-3.5 px-4 text-center">Huy chương (🥇/🥈/🥉)</th>
                  <th className="py-3.5 px-4 text-right">Tỉnh/Thành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-slate-200/70 text-sm">
                {SCHOOL_RANKINGS.map((sch) => (
                  <tr key={sch.name} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-4 px-3 text-center align-middle font-black text-slate-800">
                      {sch.rank === 1 ? "🥇 1" : sch.rank === 2 ? "🥈 2" : sch.rank === 3 ? "🥉 3" : sch.rank}
                    </td>
                    <td className="py-4 px-4 align-middle">
                      <div className="font-bold text-slate-900">{sch.name}</div>
                      <span className="text-xs text-blue-600 font-medium">{sch.badge}</span>
                    </td>
                    <td className="py-4 px-4 text-center align-middle text-slate-600">
                      {sch.studentsCount} bạn
                    </td>
                    <td className="py-4 px-4 text-center align-middle font-black text-blue-600">
                      {sch.topScoreSum}
                    </td>
                    <td className="py-4 px-4 text-center align-middle">
                      <span className="text-amber-500 font-bold">{sch.goldMedals}🥇</span> ·{" "}
                      <span className="text-slate-400 font-bold">{sch.silverMedals}🥈</span> ·{" "}
                      <span className="text-amber-700 font-bold">{sch.bronzeMedals}🥉</span>
                    </td>
                    <td className="py-4 px-4 text-right align-middle text-slate-600 font-medium">
                      {sch.city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PHÂN TRANG (PAGINATION) */}
        {activeViewTab === "individuals" && (
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#FF6B35] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > 4 && <span className="text-slate-400 text-xs px-1">...</span>}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 5. MODAL XEM CHI TIẾT THÍ SINH KHI BẤM VÀO DÒNG */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 relative">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Candidate Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400 shadow-sm">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-lg">{selectedCandidate.name}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Hạng #{selectedCandidate.rank}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{selectedCandidate.school}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" /> {selectedCandidate.city}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Điểm số</span>
                <span className="text-xl font-black text-blue-600">{selectedCandidate.score}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Độ chính xác</span>
                <span className="text-xl font-black text-emerald-600">
                  {selectedCandidate.accuracy}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Thời gian</span>
                <span className="text-xl font-black text-amber-600">{selectedCandidate.time}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setSelectedCandidate(null);
                  if (onNavigate) onNavigate("Cuộc thi");
                }}
                className="flex-1 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-colors cursor-pointer"
              >
                Xem phòng thi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
