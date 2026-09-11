import React, { useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Eye,
  Flame,
  Globe2,
  GraduationCap,
  Medal,
  RotateCcw,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  X,
  Zap
} from "lucide-react";

// Danh mục chế độ lọc thời gian
const scopes = [
  { id: "all-time", label: "Toàn thời gian 🌟" },
  { id: "month", label: "Tháng 9/2026 📅" },
  { id: "week", label: "Tuần này ⚡" },
  { id: "contest", label: "Olympic 2026 🏆" }
];

// Phân loại khối lớp
const gradeFilters = [
  { id: "all", label: "Tất cả Cấp độ" },
  { id: "12", label: "Khối 12" },
  { id: "11", label: "Khối 11" },
  { id: "10", label: "Khối 10" },
  { id: "national", label: "Đội tuyển Quốc gia" }
];

// Top 3 Thần đồng Bục Vinh Quang (Podium)
const podiumLeaders = [
  {
    rank: 2,
    name: "Trần Đức Duy",
    school: "THPT Chuyên Sư Phạm Hà Nội",
    city: "Hà Nội",
    grade: "12 Tin",
    score: 9620,
    ac: 138,
    totalSubmissions: 144,
    streak: 24,
    avatar: "/assets/testi-av-2.png",
    badge: "Master",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    rating: 2180,
    trend: "+45",
    trendType: "up",
    skills: { dp: 95, graph: 92, ds: 94, math: 88, strings: 90 },
    recentContests: [
      { name: "Olympic Tin học 2026 - Vòng 1", rank: "#2", score: "300/300" },
      { name: "Đấu trường Mini Lần 2", rank: "#1", score: "200/200" }
    ]
  },
  {
    rank: 1,
    name: "Nguyễn Minh Anh",
    school: "THPT Chuyên Khoa học Tự nhiên",
    city: "Hà Nội",
    grade: "12 Chuyên Tin",
    score: 9850,
    ac: 142,
    totalSubmissions: 145,
    streak: 28,
    avatar: "/assets/testi-av-1.png",
    badge: "Grandmaster",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    rating: 2450,
    trend: "+120",
    trendType: "up",
    skills: { dp: 98, graph: 96, ds: 99, math: 95, strings: 94 },
    recentContests: [
      { name: "Olympic Tin học 2026 - Vòng 1", rank: "#1", score: "300/300 (85')" },
      { name: "HSG Quốc gia Tin học Mở rộng", rank: "#1", score: "300/300" }
    ]
  },
  {
    rank: 3,
    name: "Lê Phương Thảo",
    school: "THPT Chuyên Hà Nội - Amsterdam",
    city: "Hà Nội",
    grade: "11 Tin",
    score: 9480,
    ac: 131,
    totalSubmissions: 139,
    streak: 19,
    avatar: "/assets/testi-av-3.png",
    badge: "Candidate Master",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    rating: 1980,
    trend: "+30",
    trendType: "up",
    skills: { dp: 90, graph: 89, ds: 92, math: 94, strings: 86 },
    recentContests: [
      { name: "Olympic Tin học 2026 - Vòng 1", rank: "#3", score: "300/300" },
      { name: "Khảo sát Năng lực Thuật toán 2026", rank: "#2", score: "290/300" }
    ]
  }
];

// Danh sách xếp hạng cá nhân đầy đủ (Top 4 - 20)
const rankingEntries = [
  {
    rank: 4,
    name: "Phạm Hoàng Nam",
    school: "THPT Chuyên Thái Bình",
    city: "Thái Bình",
    grade: "12 Tin",
    score: 9320,
    ac: 125,
    totalSubmissions: 134,
    streak: 15,
    avatar: "/assets/rank-avatar-1.png",
    badge: "Expert",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    rating: 1840,
    trend: "+2",
    trendType: "up",
    category: "12"
  },
  {
    rank: 5,
    name: "Vũ Thị Mai",
    school: "THPT Chuyên Lam Sơn",
    city: "Thanh Hóa",
    grade: "11 Tin",
    score: 9210,
    ac: 120,
    totalSubmissions: 130,
    streak: 12,
    avatar: "/assets/rank-avatar-2.png",
    badge: "Expert",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    rating: 1790,
    trend: "+5",
    trendType: "up",
    category: "11"
  },
  {
    rank: 6,
    name: "Đỗ Quốc Bảo",
    school: "THPT Chuyên Lê Hồng Phong",
    city: "TP. Hồ Chí Minh",
    grade: "12 Tin",
    score: 9050,
    ac: 118,
    totalSubmissions: 128,
    streak: 10,
    avatar: "/assets/rank-avatar-3.png",
    badge: "Expert",
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    rating: 1750,
    trend: "0",
    trendType: "same",
    category: "12"
  },
  {
    rank: 7,
    name: "Hoàng Minh Tuấn",
    school: "THPT Chuyên Bắc Ninh",
    city: "Bắc Ninh",
    grade: "11 Tin",
    score: 8940,
    ac: 114,
    totalSubmissions: 125,
    streak: 9,
    avatar: "/assets/rank-avatar-4.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1690,
    trend: "-1",
    trendType: "down",
    category: "11"
  },
  {
    rank: 8,
    name: "Nguyễn Hà Linh",
    school: "THPT Chuyên Phan Bội Châu",
    city: "Nghệ An",
    grade: "12 Tin",
    score: 8820,
    ac: 109,
    totalSubmissions: 120,
    streak: 7,
    avatar: "/assets/rank-avatar-5.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1650,
    trend: "+3",
    trendType: "up",
    category: "12"
  },
  {
    rank: 9,
    name: "Bùi Gia Khiêm",
    school: "THPT Chuyên Quốc Học Huế",
    city: "Thừa Thiên Huế",
    grade: "10 Tin",
    score: 8710,
    ac: 106,
    totalSubmissions: 115,
    streak: 14,
    avatar: "/assets/testi-1.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1620,
    trend: "+6",
    trendType: "up",
    category: "10"
  },
  {
    rank: 10,
    name: "Đặng Thu Thảo",
    school: "THPT Chuyên Lam Sơn",
    city: "Thanh Hóa",
    grade: "11 Tin",
    score: 8640,
    ac: 104,
    totalSubmissions: 112,
    streak: 11,
    avatar: "/assets/testi-2.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1590,
    trend: "-2",
    trendType: "down",
    category: "11"
  },
  {
    rank: 11,
    name: "Lê Văn Thành",
    school: "THPT Chuyên Lương Văn Tụy",
    city: "Ninh Bình",
    grade: "12 Tin",
    score: 8520,
    ac: 101,
    totalSubmissions: 110,
    streak: 8,
    avatar: "/assets/testi-3.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1570,
    trend: "+1",
    trendType: "up",
    category: "12"
  },
  {
    rank: 12,
    name: "Trần Bảo Ngọc",
    school: "THPT Chuyên Trần Phú",
    city: "Hải Phòng",
    grade: "10 Tin",
    score: 8430,
    ac: 98,
    totalSubmissions: 108,
    streak: 16,
    avatar: "/assets/rank-avatar-1.png",
    badge: "Specialist",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    rating: 1540,
    trend: "+4",
    trendType: "up",
    category: "10"
  },
  {
    rank: 13,
    name: "Vũ Hải Đăng",
    school: "THPT Chuyên Bắc Giang",
    city: "Bắc Giang",
    grade: "12 Tin",
    score: 8350,
    ac: 96,
    totalSubmissions: 105,
    streak: 6,
    avatar: "/assets/rank-avatar-2.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1480,
    trend: "0",
    trendType: "same",
    category: "12"
  },
  {
    rank: 14,
    name: "Phan Đình Trọng",
    school: "THPT Chuyên Lê Quý Đôn",
    city: "Đà Nẵng",
    grade: "11 Tin",
    score: 8210,
    ac: 93,
    totalSubmissions: 102,
    streak: 9,
    avatar: "/assets/rank-avatar-3.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1440,
    trend: "-1",
    trendType: "down",
    category: "11"
  },
  {
    rank: 15,
    name: "Mai Tuấn Kiệt",
    school: "THPT Chuyên Tiền Giang",
    city: "Tiền Giang",
    grade: "12 Tin",
    score: 8100,
    ac: 90,
    totalSubmissions: 100,
    streak: 5,
    avatar: "/assets/rank-avatar-4.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1410,
    trend: "+2",
    trendType: "up",
    category: "12"
  },
  {
    rank: 16,
    name: "Nguyễn Khánh Huyền",
    school: "THPT Chuyên Bến Tre",
    city: "Bến Tre",
    grade: "10 Tin",
    score: 7980,
    ac: 87,
    totalSubmissions: 96,
    streak: 13,
    avatar: "/assets/rank-avatar-5.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1380,
    trend: "+5",
    trendType: "up",
    category: "10"
  },
  {
    rank: 17,
    name: "Lâm Quang Huy",
    school: "THPT Chuyên Nguyễn Bỉnh Khiêm",
    city: "Vĩnh Long",
    grade: "11 Tin",
    score: 7850,
    ac: 85,
    totalSubmissions: 94,
    streak: 4,
    avatar: "/assets/testi-1.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1350,
    trend: "-3",
    trendType: "down",
    category: "11"
  },
  {
    rank: 18,
    name: "Hồ Việt Hoàng",
    school: "THPT Chuyên Thăng Long",
    city: "Lâm Đồng",
    grade: "12 Tin",
    score: 7720,
    ac: 82,
    totalSubmissions: 92,
    streak: 7,
    avatar: "/assets/testi-2.png",
    badge: "Pupil",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    rating: 1320,
    trend: "+1",
    trendType: "up",
    category: "12"
  }
];

// Danh sách Bảng Xếp Hạng Trường THPT (Toàn đoàn)
const schoolRankings = [
  {
    rank: 1,
    name: "THPT Chuyên Khoa học Tự nhiên",
    city: "Hà Nội",
    studentsCount: 245,
    goldMedals: 12,
    silverMedals: 18,
    bronzeMedals: 24,
    totalScore: 48200,
    avgScore: 196.7,
    passRate: "94.2%",
    banner: "🏛️ ĐHQG Hà Nội"
  },
  {
    rank: 2,
    name: "THPT Chuyên Hà Nội - Amsterdam",
    city: "Hà Nội",
    studentsCount: 220,
    goldMedals: 10,
    silverMedals: 16,
    bronzeMedals: 22,
    totalScore: 44500,
    avgScore: 202.3,
    passRate: "93.8%",
    banner: "🏛️ Sở GD&ĐT Hà Nội"
  },
  {
    rank: 3,
    name: "THPT Chuyên Sư Phạm Hà Nội",
    city: "Hà Nội",
    studentsCount: 210,
    goldMedals: 9,
    silverMedals: 14,
    bronzeMedals: 19,
    totalScore: 41200,
    avgScore: 196.2,
    passRate: "91.5%",
    banner: "🏛️ ĐH Sư Phạm Hà Nội"
  },
  {
    rank: 4,
    name: "THPT Chuyên Lê Hồng Phong",
    city: "TP. Hồ Chí Minh",
    studentsCount: 195,
    goldMedals: 8,
    silverMedals: 13,
    bronzeMedals: 17,
    totalScore: 38600,
    avgScore: 197.9,
    passRate: "89.7%",
    banner: "🏛️ Sở GD&ĐT TP.HCM"
  },
  {
    rank: 5,
    name: "THPT Chuyên Lam Sơn",
    city: "Thanh Hóa",
    studentsCount: 170,
    goldMedals: 7,
    silverMedals: 11,
    bronzeMedals: 16,
    totalScore: 35800,
    avgScore: 210.5,
    passRate: "88.2%",
    banner: "🏛️ Sở GD&ĐT Thanh Hóa"
  },
  {
    rank: 6,
    name: "THPT Chuyên Phan Bội Châu",
    city: "Nghệ An",
    studentsCount: 165,
    goldMedals: 6,
    silverMedals: 10,
    bronzeMedals: 15,
    totalScore: 33400,
    avgScore: 202.4,
    passRate: "87.5%",
    banner: "🏛️ Sở GD&ĐT Nghệ An"
  },
  {
    rank: 7,
    name: "THPT Chuyên Quốc Học Huế",
    city: "Thừa Thiên Huế",
    studentsCount: 150,
    goldMedals: 6,
    silverMedals: 9,
    bronzeMedals: 14,
    totalScore: 31900,
    avgScore: 212.6,
    passRate: "86.0%",
    banner: "🏛️ Sở GD&ĐT TT-Huế"
  },
  {
    rank: 8,
    name: "THPT Chuyên Bắc Giang",
    city: "Bắc Giang",
    studentsCount: 140,
    goldMedals: 5,
    silverMedals: 8,
    bronzeMedals: 12,
    totalScore: 29400,
    avgScore: 210.0,
    passRate: "84.3%",
    banner: "🏛️ Sở GD&ĐT Bắc Giang"
  }
];

const formatNumber = (val) => new Intl.NumberFormat("vi-VN").format(val);

export default function LeaderboardPage() {
  const [viewMode, setViewMode] = useState("individual"); // "individual" | "school"
  const [scope, setScope] = useState("all-time");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const currentScopeLabel = scopes.find((s) => s.id === scope)?.label || "Toàn thời gian";

  // Lọc danh sách cá nhân
  const filteredIndividuals = useMemo(() => {
    let list = [...rankingEntries];
    if (gradeFilter !== "all") {
      list = list.filter((p) => p.category === gradeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.school.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [gradeFilter, searchQuery]);

  // Lọc danh sách trường
  const filteredSchools = useMemo(() => {
    let list = [...schoolRankings];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  // Phân trang
  const totalItems = viewMode === "individual" ? filteredIndividuals.length : filteredSchools.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return viewMode === "individual"
      ? filteredIndividuals.slice(start, start + itemsPerPage)
      : filteredSchools.slice(start, start + itemsPerPage);
  }, [viewMode, filteredIndividuals, filteredSchools, currentPage]);

  const handleResetFilters = () => {
    setScope("all-time");
    setGradeFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-12">
      {/* ========================================================================= */}
      {/* HERO BANNER & REAL-TIME TICKER STATS                                      */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-sky-200 shadow-[0_12px_35px_rgba(0,100,220,0.12)] bg-gradient-to-r from-[#003B7A] via-[#0055B3] to-[#0284C7] p-6 sm:p-7 text-white">
        <img
          src="/assets/page-leaderboard-hero.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-20 mix-blend-luminosity"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Đại sảnh Danh vọng & Vinh danh Coder Toàn quốc</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Bảng Xếp Hạng Thuật Toán 2026
            </h1>

            <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed max-w-xl">
              Tôn vinh nỗ lực học tập, bài nộp AC chuẩn ACM/ICPC, thành tích các kỳ thi chuyên đề và chuỗi ngày rèn luyện bền bỉ mỗi ngày.
            </p>

            {/* Real-time Ticker Metrics */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-sky-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 font-bold backdrop-blur-xs">
                <Users className="w-3.5 h-3.5 text-amber-300" />
                <strong>12.480+</strong> thí sinh đang tranh tài
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 font-bold backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <strong>184.200+</strong> lượt AC tự động
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 font-bold backdrop-blur-xs">
                <CalendarDays className="w-3.5 h-3.5 text-sky-200" />
                Cập nhật Real-time
              </span>
            </div>
          </div>

          {/* VỊ TRÍ CỦA BẠN (SPOTLIGHT CARD) */}
          <div className="w-full lg:w-80 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-xl text-white">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/20">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Medal className="w-4 h-4" />
                Hồ sơ Xếp hạng của bạn
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 font-bold text-white shadow-2xs">
                Top 0.01%
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/testi-av-1.png"
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] flex items-center justify-center border border-white">
                  1
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs text-white truncate">
                  {anonymous ? "Học viên đã xác thực" : "Nguyễn Minh Anh"}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-amber-300 font-black">
                  <span className="text-base font-black">#1</span>
                  <span className="text-[10px] text-sky-200 font-normal">/ 12.480 toàn quốc</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-sky-100 mt-0.5">
                  <span className="text-emerald-300 font-bold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +120 pts
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-orange-300">
                    <Flame className="w-3 h-3" /> 28 ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BỤC VINH QUANG 3 VỊ TRÍ DẪN ĐẦU (TRUE STEPPED OLYMPIC PODIUM)               */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-sky-100 bg-gradient-to-b from-sky-50/50 via-white to-amber-50/30 p-5 sm:p-7 shadow-[0_4px_25px_rgba(0,100,220,0.06)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-black text-[#0050A0] uppercase tracking-wider">
                Bục Vinh Quang · Hall of Fame
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              Top 3 Thủ Khoa Thuật Toán Toàn Quốc
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Dữ liệu vinh danh theo phạm vi: <strong className="text-blue-700">{currentScopeLabel}</strong>
          </p>
        </div>

        {/* Cấu trúc Bục 3 bậc: Hạng 2 (Trái) — Hạng 1 (Giữa, Cao nhất) — Hạng 3 (Phải) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-4">
          {/* HẠNG 2: Á KHOA 1 (Bên Trái) */}
          <div
            onClick={() => setSelectedStudent(podiumLeaders[0])}
            className="order-2 md:order-1 bg-white rounded-3xl border-2 border-slate-200 p-5 text-center shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative flex flex-col items-center justify-between min-h-[300px]"
          >
            <div className="w-full flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-700 border border-slate-300">
                🥈 Á KHOA 1
              </span>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {podiumLeaders[0].trend}
              </span>
            </div>

            <div className="relative mt-3">
              <img
                src={podiumLeaders[0].avatar}
                alt={podiumLeaders[0].name}
                className="w-18 h-18 rounded-full object-cover ring-4 ring-slate-300 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-2.5 -right-2 w-7 h-7 rounded-full bg-slate-200 text-slate-800 font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
                2
              </span>
            </div>

            <div className="mt-3 space-y-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border ${podiumLeaders[0].badgeColor}`}>
                {podiumLeaders[0].badge} (Rating {podiumLeaders[0].rating})
              </span>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {anonymous ? "Học viên đã xác thực" : podiumLeaders[0].name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">{podiumLeaders[0].school}</p>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 p-2.5 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Tổng điểm:</span>
                <strong className="text-blue-700 font-black text-sm">{formatNumber(podiumLeaders[0].score)} pts</strong>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-600">
                <span className="text-emerald-700 font-bold">{podiumLeaders[0].ac} bài AC</span>
                <span className="flex items-center gap-1 text-orange-600 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" /> {podiumLeaders[0].streak} ngày
                </span>
              </div>
            </div>
          </div>

          {/* HẠNG 1: THỦ KHOA TOÀN QUỐC (Ở Giữa - Cao nhất & Nổi bật nhất) */}
          <div
            onClick={() => setSelectedStudent(podiumLeaders[1])}
            className="order-1 md:order-2 bg-gradient-to-b from-amber-100/90 via-amber-50/60 to-white rounded-3xl border-2 border-amber-400 p-6 text-center shadow-[0_12px_35px_rgba(245,158,11,0.22)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group relative flex flex-col items-center justify-between min-h-[350px]"
          >
            {/* Crown Decoration */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 p-2 rounded-full shadow-lg border-2 border-white animate-bounce">
                <Crown className="w-5 h-5 fill-amber-950" />
              </div>
            </div>

            <div className="w-full flex justify-between items-center pt-2 pb-2 border-b border-amber-200/80 text-xs">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950 shadow-2xs">
                🥇 THỦ KHOA TOÀN QUỐC
              </span>
              <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" /> {podiumLeaders[1].trend} pts
              </span>
            </div>

            <div className="relative mt-3">
              <img
                src={podiumLeaders[1].avatar}
                alt={podiumLeaders[1].name}
                className="w-22 h-22 rounded-full object-cover ring-4 ring-amber-400 shadow-xl group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 font-black text-sm flex items-center justify-center border-2 border-white shadow-md">
                1
              </span>
            </div>

            <div className="mt-3 space-y-1">
              <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black border ${podiumLeaders[1].badgeColor} shadow-2xs`}>
                ⭐ {podiumLeaders[1].badge} (Rating {podiumLeaders[1].rating})
              </span>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                {anonymous ? "Học viên đã xác thực" : podiumLeaders[1].name}
              </h3>
              <p className="text-xs text-slate-600 font-semibold line-clamp-1">{podiumLeaders[1].school}</p>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-amber-200 bg-amber-50/80 p-3 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-amber-900 font-bold">Tổng điểm mùa giải:</span>
                <strong className="text-blue-900 font-black text-base">{formatNumber(podiumLeaders[1].score)} pts</strong>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-700">
                <span className="text-emerald-800 font-bold">{podiumLeaders[1].ac} bài AC (98.6%)</span>
                <span className="flex items-center gap-1 text-orange-600 font-black bg-white px-2 py-0.5 rounded-md border border-orange-200">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" /> {podiumLeaders[1].streak} ngày
                </span>
              </div>
            </div>
          </div>

          {/* HẠNG 3: Á KHOA 2 (Bên Phải) */}
          <div
            onClick={() => setSelectedStudent(podiumLeaders[2])}
            className="order-3 md:order-3 bg-white rounded-3xl border-2 border-amber-700/20 p-5 text-center shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative flex flex-col items-center justify-between min-h-[290px]"
          >
            <div className="w-full flex justify-between items-center pb-2 border-b border-slate-100 text-xs">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                🥉 Á KHOA 2
              </span>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {podiumLeaders[2].trend}
              </span>
            </div>

            <div className="relative mt-3">
              <img
                src={podiumLeaders[2].avatar}
                alt={podiumLeaders[2].name}
                className="w-18 h-18 rounded-full object-cover ring-4 ring-amber-600/30 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-2.5 -right-2 w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center border-2 border-white shadow-sm">
                3
              </span>
            </div>

            <div className="mt-3 space-y-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black border ${podiumLeaders[2].badgeColor}`}>
                {podiumLeaders[2].badge} (Rating {podiumLeaders[2].rating})
              </span>
              <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                {anonymous ? "Học viên đã xác thực" : podiumLeaders[2].name}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1">{podiumLeaders[2].school}</p>
            </div>

            <div className="w-full mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 p-2.5 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Tổng điểm:</span>
                <strong className="text-blue-700 font-black text-sm">{formatNumber(podiumLeaders[2].score)} pts</strong>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-600">
                <span className="text-emerald-700 font-bold">{podiumLeaders[2].ac} bài AC</span>
                <span className="flex items-center gap-1 text-orange-600 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" /> {podiumLeaders[2].streak} ngày
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BỘ LỌC TÌM KIẾM, PHẠM VI THỜI GIAN & CHẾ ĐỘ XEM                            */}
      {/* ========================================================================= */}
      <section className="bg-white p-4 sm:p-5 rounded-3xl border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.04)] space-y-4">
        {/* Hàng 1: Chuyển đổi Bảng Cá nhân vs Bảng Trường THPT */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => {
                setViewMode("individual");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === "individual"
                  ? "bg-white text-[#0050A0] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Bảng Cá Nhân Toàn Quốc</span>
            </button>
            <button
              onClick={() => {
                setViewMode("school");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === "school"
                  ? "bg-white text-[#0050A0] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <School className="w-4 h-4" />
              <span>Bảng Toàn Đoàn Trường THPT</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
              />
              <span>Ẩn danh thông tin cá nhân</span>
            </label>
          </div>
        </div>

        {/* Hàng 2: Tìm kiếm & Lọc Thời gian */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={
                viewMode === "individual"
                  ? "Tìm kiếm theo tên học sinh, trường, tỉnh thành..."
                  : "Tìm kiếm trường THPT, tỉnh thành..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Scope Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScope(s.id);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  scope === s.id
                    ? "bg-[#0066CC] text-white shadow-2xs"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hàng 3: Grade Filter & Stats Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            {viewMode === "individual" && (
              <>
                <span className="font-semibold text-slate-400">Lọc khối lớp:</span>
                <div className="flex items-center gap-1">
                  {gradeFilters.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        setGradeFilter(g.id);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        gradeFilter === g.id
                          ? "bg-sky-100 text-blue-800 border border-sky-300"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {(searchQuery || gradeFilter !== "all" || scope !== "all-time") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Xóa lọc</span>
              </button>
            )}
          </div>

          <span className="text-slate-400 text-[11px]">
            Hiển thị <strong className="text-slate-800 font-bold">{totalItems}</strong> kết quả xếp hạng
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BẢNG XẾP HẠNG CHI TIẾT (RICH LEADERBOARD TABLE)                            */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl border border-sky-100 shadow-[0_4px_20px_rgba(0,100,220,0.06)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-[#F8FBFE]">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              {viewMode === "individual"
                ? "Danh Sách Xếp Hạng Thí Sinh (Top 4 – 100)"
                : "Tổng Sắp Huy Chương Toàn Đoàn Các Trường THPT"}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Tự động cập nhật theo chuẩn ACM/ICPC
          </span>
        </div>

        {/* VIEW 1: BẢNG CÁ NHÂN */}
        {viewMode === "individual" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4 text-center w-16">Hạng</th>
                  <th className="py-3 px-2 text-center w-14">Biến động</th>
                  <th className="py-3 px-4">Thí sinh & Danh hiệu</th>
                  <th className="py-3 px-4">Trường THPT</th>
                  <th className="py-3 px-4 text-center">Tiến độ AC</th>
                  <th className="py-3 px-4 text-center">Chuỗi ngày</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-right">Tổng điểm</th>
                  <th className="py-3 px-4 text-center w-24">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((person) => {
                    const passPct = Math.round((person.ac / person.totalSubmissions) * 100);
                    return (
                      <tr
                        key={person.rank}
                        className="hover:bg-sky-50/60 transition-colors group"
                      >
                        {/* Cột Thứ hạng */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-mono text-sm font-black text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                            {person.rank}
                          </span>
                        </td>

                        {/* Cột Biến động */}
                        <td className="py-3.5 px-2 text-center">
                          {person.trendType === "up" && (
                            <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">
                              <TrendingUp className="w-3 h-3" />
                              {person.trend}
                            </span>
                          )}
                          {person.trendType === "down" && (
                            <span className="inline-flex items-center gap-0.5 text-rose-600 font-bold text-[11px] bg-rose-50 px-1.5 py-0.5 rounded">
                              <TrendingDown className="w-3 h-3" />
                              {person.trend}
                            </span>
                          )}
                          {person.trendType === "same" && (
                            <span className="text-slate-400 font-bold text-[11px]">--</span>
                          )}
                        </td>

                        {/* Cột Thí sinh */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={person.avatar}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                  {anonymous ? "Học viên đã xác thực" : person.name}
                                </p>
                                <span className={`px-2 py-0.2 rounded text-[9px] font-black border ${person.badgeColor}`}>
                                  {person.badge}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate">
                                {person.grade} · {person.city}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Cột Trường */}
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="font-medium line-clamp-1">{person.school}</span>
                        </td>

                        {/* Cột Tiến độ AC */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-block text-left w-28">
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                              <span className="text-emerald-700">{person.ac} AC</span>
                              <span className="text-slate-400">{passPct}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${passPct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Cột Chuỗi lửa */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs bg-orange-50 px-2 py-1 rounded-lg border border-orange-200">
                            <Flame className="w-3.5 h-3.5 fill-orange-500" />
                            {person.streak} ngày
                          </span>
                        </td>

                        {/* Cột Rating */}
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                          {person.rating}
                        </td>

                        {/* Cột Tổng điểm */}
                        <td className="py-3.5 px-4 text-right">
                          <strong className="text-[#0050A0] font-black text-sm block">
                            {formatNumber(person.score)}
                          </strong>
                          <span className="text-[10px] text-slate-400">pts</span>
                        </td>

                        {/* Cột Nút Chi tiết */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedStudent(person)}
                            className="p-1.5 rounded-lg bg-sky-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-all cursor-pointer shadow-2xs"
                            title="Xem hồ sơ năng lực"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-xs text-slate-400 italic">
                      Không tìm thấy thí sinh phù hợp với bộ lọc hiện tại.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* VIEW 2: BẢNG TRƯỜNG THPT */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4 text-center w-16">Hạng</th>
                  <th className="py-3 px-4">Trường THPT & Trực thuộc</th>
                  <th className="py-3 px-4 text-center">Tỉnh/Thành</th>
                  <th className="py-3 px-4 text-center">Số học sinh</th>
                  <th className="py-3 px-4 text-center">Tổng Huy chương (🥇-🥈-🥉)</th>
                  <th className="py-3 px-4 text-center">Tỉ lệ đạt chuẩn</th>
                  <th className="py-3 px-4 text-right">Tổng điểm đoàn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((school) => (
                    <tr
                      key={school.rank}
                      className="hover:bg-sky-50/60 transition-colors group"
                    >
                      <td className="py-4 px-4 text-center">
                        <span className={`w-8 h-8 rounded-xl font-mono text-xs font-black inline-flex items-center justify-center ${
                          school.rank === 1
                            ? "bg-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300"
                            : school.rank === 2
                            ? "bg-slate-200 text-slate-800"
                            : school.rank === 3
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {school.rank}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100 font-black text-sm">
                            <School className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                              {school.name}
                            </p>
                            <p className="text-[11px] text-slate-400">{school.banner}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center text-slate-600 font-medium">
                        {school.city}
                      </td>

                      <td className="py-4 px-4 text-center font-bold text-slate-700">
                        {school.studentsCount} thí sinh
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 text-xs font-bold">
                          <span className="text-amber-700">🥇 {school.goldMedals}</span>
                          <span className="text-slate-600">🥈 {school.silverMedals}</span>
                          <span className="text-amber-900">🥉 {school.bronzeMedals}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {school.passRate}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <strong className="text-[#0050A0] font-black text-sm block">
                          {formatNumber(school.totalScore)}
                        </strong>
                        <span className="text-[10px] text-slate-400">điểm đoàn</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-slate-400 italic">
                      Không tìm thấy trường THPT phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PHÂN TRANG (PAGINATION) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 text-xs">
          <span className="text-slate-500">
            Hiển thị trang <strong className="text-slate-800 font-bold">{currentPage}</strong> /{" "}
            <strong className="text-slate-800 font-bold">{totalPages}</strong>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`p-2 rounded-xl border flex items-center gap-1 font-bold text-xs transition-all cursor-pointer ${
                currentPage === 1
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                  : "border-slate-200 text-slate-700 hover:bg-white hover:border-blue-400 hover:text-blue-600 bg-white shadow-2xs"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                  currentPage === page
                    ? "bg-[#0066CC] text-white shadow-2xs font-black"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`p-2 rounded-xl border flex items-center gap-1 font-bold text-xs transition-all cursor-pointer ${
                currentPage === totalPages
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                  : "border-slate-200 text-slate-700 hover:bg-white hover:border-blue-400 hover:text-blue-600 bg-white shadow-2xs"
              }`}
            >
              <span>Sau</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL CHI TIẾT HỌC VIÊN / PROFILE POPUP                                    */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-sky-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#003B7A] to-[#0055B3] p-5 text-white">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">
                      {anonymous ? "Học viên đã xác thực" : selectedStudent.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                      Hạng #{selectedStudent.rank}
                    </span>
                  </div>
                  <p className="text-xs text-sky-100">{selectedStudent.school}</p>
                  <p className="text-[11px] text-sky-200 mt-0.5">
                    {selectedStudent.grade} · {selectedStudent.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
                  <span className="text-[10px] text-slate-500 block">Tổng điểm</span>
                  <strong className="text-blue-900 text-base font-black">
                    {formatNumber(selectedStudent.score)}
                  </strong>
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center">
                  <span className="text-[10px] text-slate-500 block">Số bài AC</span>
                  <strong className="text-emerald-800 text-base font-black">
                    {selectedStudent.ac} bài
                  </strong>
                </div>
                <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 text-center">
                  <span className="text-[10px] text-slate-500 block">Chuỗi ngày</span>
                  <strong className="text-orange-700 text-base font-black flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 fill-orange-500" /> {selectedStudent.streak}
                  </strong>
                </div>
              </div>

              {/* Radar / Skill Bars */}
              {selectedStudent.skills && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">
                    📊 Năng lực Thuật toán Chuyên sâu:
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Quy hoạch động (DP):</span>
                        <strong className="text-blue-700">{selectedStudent.skills.dp}%</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${selectedStudent.skills.dp}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Lý thuyết Đồ thị & Luồng (Graph):</span>
                        <strong className="text-purple-700">{selectedStudent.skills.graph}%</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${selectedStudent.skills.graph}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-0.5">
                        <span>Cấu trúc Dữ liệu Nâng cao (DS):</span>
                        <strong className="text-emerald-700">{selectedStudent.skills.ds}%</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${selectedStudent.skills.ds}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Contests */}
              {selectedStudent.recentContests && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">
                    🏆 Thành tích Cuộc thi Gần nhất:
                  </span>
                  <div className="space-y-1.5">
                    {selectedStudent.recentContests.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]"
                      >
                        <span className="font-semibold text-slate-700">{c.name}</span>
                        <div className="text-right">
                          <strong className="text-blue-700 font-bold">{c.rank}</strong>
                          <span className="text-slate-400 text-[10px] ml-1.5">({c.score})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-all cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
