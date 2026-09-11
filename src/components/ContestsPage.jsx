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
  TrendingUp
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
      "Đấu trường lập trình danh giá gồm 3 vòng thi từ sơ loại trực tuyến đến chung kết toàn quốc theo chuẩn ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-OLY-0842",
      overallRank: "#14 Toàn quốc",
      totalScore: 280,
      badge: "Top 1% Vòng Sơ loại"
    },
    // CỤM 1: VÒNG ĐANG DIỄN RA
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
    // CỤM 2: THỐNG KÊ CÁC VÒNG ĐÃ QUA & TOP 5 THỦ KHOA
    pastRoundsStats: {
      summary: "Tổng cộng 3,250 thí sinh đã hoàn thành Vòng 1. Điểm chuẩn lọt vào Bán kết là 240/300đ.",
      roundsChart: [
        {
          roundName: "Vòng 1: Sơ loại Toàn quốc",
          date: "15/08/2026",
          participants: 3250,
          passCount: 600,
          maxScore: 300,
          topScore: 300,
          avgScore: 215,
          myScore: 280,
          myRank: "#14"
        },
        {
          roundName: "Kỳ thi Khởi động Chuyên đề",
          date: "28/08/2026",
          participants: 1400,
          passCount: 450,
          maxScore: 200,
          topScore: 200,
          avgScore: 145,
          myScore: 190,
          myRank: "#8"
        }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Nguyễn Hoàng Nam", school: "THPT Chuyên Hà Nội - Amsterdam", score: 300, time: "85'", medal: "🥇" },
        { rank: 2, name: "Trần Minh Đức", school: "THPT Chuyên Lê Hồng Phong (TP.HCM)", score: 300, time: "102'", medal: "🥈" },
        { rank: 3, name: "Lê Bảo Châu", school: "THPT Chuyên Khoa học Tự nhiên", score: 300, time: "120'", medal: "🥉" },
        { rank: 4, name: "Phạm Hải Long", school: "THPT Chuyên Phan Bội Châu", score: 295, time: "135'", medal: "Top 4" },
        { rank: 5, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", score: 290, time: "140'", medal: "Top 5" }
      ]
    },
    // CỤM 3: VÒNG TIẾP THEO DIỄN RA NGÀY NÀO
    nextRound: {
      id: "OLYMPIC_2026_R3",
      roundNumber: 3,
      title: "Vòng 3: Chung kết Toàn quốc & Lễ Trao giải",
      targetDate: "Chủ nhật · 25/10/2026",
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
    pastRoundsStats: {
      summary: "Đã hoàn thành Chặng 1 & Chặng 2. Tổng cộng hơn 2,300 lượt làm bài.",
      roundsChart: [
        {
          roundName: "Chặng 1: Mảng & Cấu trúc dữ liệu",
          date: "20/07/2026",
          participants: 1100,
          passCount: 350,
          maxScore: 200,
          topScore: 200,
          avgScore: 135,
          myScore: 200,
          myRank: "#8"
        },
        {
          roundName: "Chặng 2: Quy hoạch động nâng cao",
          date: "22/08/2026",
          participants: 1250,
          passCount: 280,
          maxScore: 200,
          topScore: 200,
          avgScore: 120,
          myScore: 175,
          myRank: "#22"
        }
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
      targetDate: "Thứ Ba · 20/10/2026",
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
    pastRoundsStats: {
      summary: "Đã hoàn thành Vòng 1 Sơ loại tại 12 cụm trường THPT.",
      roundsChart: [
        {
          roundName: "Vòng 1: Tuyển chọn Cụm trường",
          date: "10/08/2026",
          participants: 850,
          passCount: 320,
          maxScore: 300,
          topScore: 300,
          avgScore: 220,
          myScore: 290,
          myRank: "#5"
        }
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
      targetDate: "Chủ nhật · 15/11/2026",
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
    pastRoundsStats: {
      summary: "Đã hoàn thành Đợt 1 với 3,800 lượt tham gia tự đánh giá.",
      roundsChart: [
        {
          roundName: "Khảo sát Đợt 1: Tư duy Logic Cơ bản",
          date: "01/09/2026",
          participants: 3800,
          passCount: 2900,
          maxScore: 100,
          topScore: 100,
          avgScore: 78,
          myScore: 92,
          myRank: "Top 3%"
        }
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
      targetDate: "Thứ Ba · 15/12/2026",
      scheduleTime: "Mở tự do",
      duration: "90 phút",
      advancementCondition: "Mở tự do cho tất cả học sinh toàn hệ thống.",
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
    pastRoundsStats: {
      summary: "Mùa giải Algo-Cup 2026 đã khép lại thành công với hơn 1,800 thí sinh.",
      roundsChart: [
        {
          roundName: "Vòng Sơ Loại Mùa Hè",
          date: "01/07/2026",
          participants: 1800,
          passCount: 500,
          maxScore: 300,
          topScore: 300,
          avgScore: 210,
          myScore: 280,
          myRank: "#15"
        },
        {
          roundName: "Vòng Chung Kết Algo-Cup",
          date: "15/07/2026",
          participants: 500,
          passCount: 100,
          maxScore: 300,
          topScore: 300,
          avgScore: 230,
          myScore: 270,
          myRank: "#12"
        }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Phạm Quốc Bảo", school: "THPT Chuyên Nguyễn Trãi", score: 300, time: "75'", medal: "🥇" },
        { rank: 2, name: "Đỗ Gia Hưng", school: "THPT Chuyên Hùng Vương", score: 300, time: "92'", medal: "🥈" },
        { rank: 3, name: "Bùi Thảo My", school: "THPT Chuyên Lê Khiết", score: 290, time: "110'", medal: "🥉" }
      ]
    },
    nextRound: {
      id: "ALGO_CUP_2027",
      roundNumber: 1,
      title: "Mùa giải Algo-Cup 2027 Khởi động",
      targetDate: "Tháng 06/2027",
      scheduleTime: "Dự kiến mở đăng ký mùa tới",
      duration: "180 phút",
      advancementCondition: "Mở tự do cho học sinh cả nước.",
      isRegistered: false
    }
  },
  {
    id: "TRAINING_CAMP_AUTUMN",
    title: "Kỳ thi Tuyển chọn Trại Huấn luyện Mùa Thu 2026",
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
    pastRoundsStats: {
      summary: "Chưa có vòng thi nào diễn ra trong mùa này.",
      roundsChart: [],
      top5Valedictorians: []
    },
    nextRound: {
      id: "CAMP_R1",
      roundNumber: 1,
      title: "Kỳ thi Tuyển chọn Trại Huấn luyện",
      targetDate: "Chủ nhật · 05/11/2026",
      scheduleTime: "08:00 – 12:00",
      duration: "240 phút (4 bài toán)",
      advancementCondition: "Mở đăng ký cho toàn bộ học sinh đạt từ 250 điểm ở các kỳ thi trước.",
      isRegistered: false
    }
  },
  {
    id: "PYTHON_CHALLENGE_2026",
    title: "Thử thách Lập trình Python & Cấu trúc Dữ liệu Trẻ",
    editionLabel: "Mùa giải 2026",
    category: "mini",
    categoryLabel: "Mini-Contest Định kỳ",
    season: "2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Mở đăng ký",
    statusStyle: "bg-blue-100 text-blue-800 border-blue-300",
    tag: "⚡ Mini-Contest",
    organizer: "CLB Lập trình Trẻ & Ôn Thi 360",
    bannerImage: "/assets/generated-leaderboard-hero-v1.png",
    totalPrize: "8.000.000đ + Khóa học chuyên sâu",
    targetAudience: "Học sinh lớp 6-9 làm quen với lập trình",
    description: "Sân chơi lập trình cơ bản bằng Python giúp học sinh phát triển tư duy thuật toán và giải quyết bài toán thực tế.",
    myOverallStatus: null,
    activeRound: null,
    pastRoundsStats: { summary: "Mùa giải chuẩn bị khởi tranh.", roundsChart: [], top5Valedictorians: [] },
    nextRound: {
      id: "PY_R1",
      roundNumber: 1,
      title: "Vòng Tuyển chọn Trực tuyến",
      targetDate: "Thứ Năm · 12/11/2026",
      scheduleTime: "19:00 – 21:00",
      duration: "120 phút",
      advancementCondition: "Mở tự do cho học sinh THCS.",
      isRegistered: false
    }
  },
  {
    id: "ACM_ICPC_JUNIOR",
    title: "Đấu trường Lập trình ICPC Khối THPT Mở rộng 2026",
    editionLabel: "Mùa giải 2025–2026",
    category: "national",
    categoryLabel: "Đấu trường Quốc gia",
    season: "2025-2026",
    type: "contest",
    status: "completed",
    statusLabel: "Đã kết thúc",
    statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
    tag: "🏆 Chuẩn ICPC",
    organizer: "Ban Chuyên môn ICPC & Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "40.000.000đ + Cúp Vô địch",
    targetAudience: "Đội thi THPT 3 thành viên",
    description: "Đấu trường lập trình đồng đội chuẩn format ICPC quốc tế với bảng điểm trực tiếp đóng băng 60 phút cuối.",
    myOverallStatus: {
      registered: true,
      candidateId: "TEAM-360-01",
      overallRank: "#4 Toàn quốc",
      totalScore: 400
    },
    activeRound: null,
    pastRoundsStats: {
      summary: "Chung kết ICPC Junior 2026 đã khép lại với sự tranh tài của 150 đội thi.",
      roundsChart: [
        {
          roundName: "Vòng Sơ Loại Online ICPC",
          date: "10/05/2026",
          participants: 600,
          passCount: 150,
          maxScore: 500,
          topScore: 500,
          avgScore: 320,
          myScore: 420,
          myRank: "#6"
        },
        {
          roundName: "Chung kết Quốc gia ICPC Junior",
          date: "20/06/2026",
          participants: 150,
          passCount: 30,
          maxScore: 500,
          topScore: 500,
          avgScore: 340,
          myScore: 400,
          myRank: "#4"
        }
      ],
      top5Valedictorians: [
        { rank: 1, name: "Team Amsterdam Stars", school: "THPT Chuyên Hà Nội - Amsterdam", score: 500, time: "180'", medal: "🥇" },
        { rank: 2, name: "Team LHP Dragons", school: "THPT Chuyên Lê Hồng Phong", score: 480, time: "210'", medal: "🥈" },
        { rank: 3, name: "Team KHTN Innovators", school: "THPT Chuyên KHTN", score: 450, time: "230'", medal: "🥉" }
      ]
    },
    nextRound: {
      id: "ICPC_2027",
      roundNumber: 1,
      title: "Mùa giải ICPC Junior 2027",
      targetDate: "Tháng 05/2027",
      scheduleTime: "Dự kiến mở đăng ký mùa tới",
      duration: "300 phút",
      advancementCondition: "Đội thi 3 thành viên THPT.",
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

  // Pagination Settings: 4 items per page so 8 items will show 2 pages
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

  const handleSelectContest = (contest) => {
    setSelectedContest(contest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedContest(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {/* VIEW 1: CHI TIẾT CUỘC THI — GỒM ĐÚNG 3 CỤM THÔNG TIN RÕ RÀNG VÀ GỌN GÀNG   */}
      {/* ========================================================================= */}
      {selectedContest ? (
        <div className="flex flex-col gap-5">
          {/* NÚT QUAY LẠI DANH SÁCH Ở ĐẦU TRANG */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)]">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-blue-800 bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-98"
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

          {/* Banner tiêu đề cuộc thi */}
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

              {/* Thẻ SBD & Kết quả tổng quan */}
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
          {/* PHẦN 1: VÒNG THI ĐANG DIỄN RA (HIỆN TẠI & NỔI BẬT NHẤT)                  */}
          {/* ======================================================================= */}
          {selectedContest.activeRound ? (
            <div className="rounded-3xl border border-emerald-300 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/50 p-5 sm:p-6 shadow-[0_8px_30px_rgba(16,185,129,0.12)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-xs tracking-wide uppercase">
                    Vòng thi đang mở
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {selectedContest.activeRound.title}
                  </h2>
                </div>

                <div className="text-[11px] text-emerald-800 font-bold bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  SBD của bạn: <span className="font-mono font-black text-emerald-900">{selectedContest.activeRound.candidateId}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Thông tin vòng thi */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {selectedContest.activeRound.startDate} ({selectedContest.activeRound.scheduleTime})
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {selectedContest.activeRound.duration} · {selectedContest.activeRound.problemsCount} bài toán
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      {selectedContest.activeRound.totalParticipants} thí sinh
                    </span>
                  </div>

                  <div className="text-emerald-900 bg-emerald-100/60 p-3.5 rounded-2xl border border-emerald-200/80 text-xs leading-relaxed flex items-start gap-2.5">
                    <span className="text-base leading-none">📢</span>
                    <div>
                      <strong className="font-bold">Hướng dẫn phòng thi:</strong> {selectedContest.activeRound.note}
                    </div>
                  </div>
                </div>

                {/* Hộp Đếm ngược & Nút Vào thi */}
                <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-emerald-200 shadow-md flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-amber-500" />
                      Thời gian còn lại:
                    </span>
                    <span className="font-mono text-base font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 animate-pulse">
                      {selectedContest.activeRound.timeRemaining}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onOpenCodeWorkspace?.({
                        title: `${selectedContest.title} — ${selectedContest.activeRound.title}`,
                        id: selectedContest.activeRound.id
                      });
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>VÀO PHÒNG THI TRỰC TUYẾN</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-xs text-slate-500">
              Hiện tại chưa có vòng thi nào đang mở đề trực tuyến trong ngày hôm nay.
            </div>
          )}

          {/* ======================================================================= */}
          {/* PHẦN 2: BIỂU ĐỒ CỘT THỐNG KÊ CÁC VÒNG ĐÃ QUA & DANH SÁCH 5 THỦ KHOA     */}
          {/* ======================================================================= */}
          <div className="rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,100,220,0.06)] space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs">
                  CÁC VÒNG ĐÃ QUA
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Thống kê kết quả & Bảng vàng Thủ khoa
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {selectedContest.pastRoundsStats?.summary}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* PHẦN A: BIỂU ĐỒ CỘT DỌC THỐNG KÊ ĐIỂM SỐ */}
              <div className="lg:col-span-7 bg-[#F8FBFE] p-5 rounded-2xl border border-sky-100/80 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Biểu đồ cột so sánh điểm số từng vòng
                    </span>

                    {/* Chú thích màu sắc */}
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block" /> Thủ khoa
                      </span>
                      <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        <span className="w-2.5 h-2.5 rounded-xs bg-blue-600 inline-block" /> Điểm của bạn
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 inline-block" /> Điểm TB
                      </span>
                    </div>
                  </div>

                  {selectedContest.pastRoundsStats?.roundsChart?.length > 0 ? (
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                      {/* VÙNG BIỂU ĐỒ CỘT DỌC */}
                      <div className="relative h-44 flex items-end justify-around gap-6 pt-6 pb-2 px-6">
                        {/* Các đường gióng ngang mờ */}
                        <div className="absolute inset-x-4 top-6 border-b border-dashed border-slate-200 pointer-events-none flex justify-between">
                          <span className="text-[9px] font-bold text-slate-300 -mt-3 bg-white px-1">Tối đa (100%)</span>
                        </div>
                        <div className="absolute inset-x-4 top-[48%] border-b border-dashed border-slate-100 pointer-events-none flex justify-between">
                          <span className="text-[9px] font-bold text-slate-300 -mt-3 bg-white px-1">50%</span>
                        </div>

                        {/* Các cụm cột cho từng vòng */}
                        {selectedContest.pastRoundsStats.roundsChart.map((round, idx) => {
                          const topPct = Math.min(100, Math.max(14, (round.topScore / round.maxScore) * 100));
                          const myPct = round.myScore !== undefined ? Math.min(100, Math.max(14, (round.myScore / round.maxScore) * 100)) : null;
                          const avgPct = Math.min(100, Math.max(14, (round.avgScore / round.maxScore) * 100));

                          return (
                            <div key={idx} className="flex-1 max-w-[150px] flex items-end justify-center gap-2 sm:gap-3 h-full z-10">
                              {/* Cột 1: Thủ khoa */}
                              <div className="flex flex-col items-center justify-end h-full group flex-1">
                                <span className="text-[10px] font-black text-emerald-700 mb-1 leading-none">
                                  {round.topScore}đ
                                </span>
                                <div
                                  className="w-full max-w-[28px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg shadow-sm hover:brightness-110 transition-all cursor-pointer"
                                  style={{ height: `${topPct}%` }}
                                  title={`Thủ khoa: ${round.topScore}/${round.maxScore} điểm`}
                                />
                              </div>

                              {/* Cột 2: Điểm của bạn */}
                              {myPct !== null && (
                                <div className="flex flex-col items-center justify-end h-full group flex-1">
                                  <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-1 py-0.5 rounded shadow-2xs mb-1 leading-none">
                                    {round.myScore}đ
                                  </span>
                                  <div
                                    className="w-full max-w-[28px] bg-gradient-to-t from-blue-700 via-blue-600 to-sky-400 rounded-t-lg shadow-md ring-2 ring-blue-300/80 hover:brightness-110 transition-all cursor-pointer"
                                    style={{ height: `${myPct}%` }}
                                    title={`Điểm của bạn: ${round.myScore}/${round.maxScore} điểm (${round.myRank})`}
                                  />
                                </div>
                              )}

                              {/* Cột 3: Điểm trung bình */}
                              <div className="flex flex-col items-center justify-end h-full group flex-1">
                                <span className="text-[10px] font-semibold text-slate-500 mb-1 leading-none">
                                  {round.avgScore}đ
                                </span>
                                <div
                                  className="w-full max-w-[28px] bg-gradient-to-t from-slate-400 to-slate-200 rounded-t-lg hover:brightness-110 transition-all cursor-pointer"
                                  style={{ height: `${avgPct}%` }}
                                  title={`Điểm trung bình giải: ${round.avgScore}/${round.maxScore} điểm`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* ĐƯỜNG ĐÁY TRỤC HOÀNH (BASELINE) */}
                      <div className="h-0.5 bg-slate-300 w-full mb-3" />

                      {/* NHÃN THÔNG TIN TỪNG VÒNG (NẰM HOÀN TOÀN DƯỚI ĐÁY CỘT) */}
                      <div className="flex justify-around gap-6 px-6">
                        {selectedContest.pastRoundsStats.roundsChart.map((round, idx) => (
                          <div key={idx} className="flex-1 max-w-[150px] text-center space-y-1">
                            <strong className="block text-xs font-bold text-slate-800 leading-tight">
                              {round.roundName}
                            </strong>
                            <p className="text-[10px] text-slate-500">
                              {round.date} · {round.participants?.toLocaleString()} thí sinh
                            </p>
                            {round.myRank && (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-[10px]">
                                Thứ hạng: {round.myRank}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-6 text-center italic">Chưa có dữ liệu vòng thi nào trước đây.</p>
                  )}
                </div>

                {/* Nhận xét phân tích */}
                <div className="text-xs p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-900 flex items-center gap-2">
                  <span className="text-sm">💡</span>
                  <span><strong>Đánh giá năng lực:</strong> Điểm số của bạn luôn nằm trong <strong>Top 1% thí sinh dẫn đầu</strong> qua cả hai vòng thi trước.</span>
                </div>
              </div>

              {/* PHẦN B: DANH SÁCH 5 THỦ KHOA DẪN ĐẦU */}
              <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/40 via-slate-50/60 to-slate-50/80 p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Bảng vàng 5 Thủ khoa xuất sắc
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Xếp hạng ACM/ICPC</span>
                </div>

                {selectedContest.pastRoundsStats?.top5Valedictorians.length > 0 ? (
                  <div className="space-y-2">
                    {selectedContest.pastRoundsStats.top5Valedictorians.map((val) => {
                      const isTop1 = val.rank === 1;
                      return (
                        <div
                          key={val.rank}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                            isTop1
                              ? "bg-gradient-to-r from-amber-100/90 to-amber-50/80 border-amber-300 shadow-xs"
                              : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                              isTop1 ? "bg-amber-400 text-amber-950 shadow-xs" : "bg-slate-100 text-slate-700"
                            }`}>
                              {val.medal}
                            </span>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate leading-tight">{val.name}</p>
                              <p className="text-[10px] text-slate-400 truncate">{val.school}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-3">
                            <strong className="text-blue-700 font-black text-xs block">{val.score} điểm</strong>
                            <span className="text-[10px] text-slate-400">({val.time} penalty)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-6 text-center italic">Chưa có dữ liệu thủ khoa vòng trước.</p>
                )}

                <div className="text-[11px] text-slate-400 text-center pt-1 border-t border-slate-100">
                  Cập nhật theo kết quả chính thức từ Hội đồng Chấm thi Quốc gia
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* PHẦN 3: VÒNG TIẾP THEO DIỄN RA VÀO NGÀY NÀO                              */}
          {/* ======================================================================= */}
          {selectedContest.nextRound && (
            <div className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50/70 via-white to-sky-50/70 p-5 sm:p-6 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-sky-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                    VÒNG TIẾP THEO
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    Lịch trình & Kế hoạch Vòng thi kế tiếp
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
                    📌 <strong>Điều kiện tham gia:</strong> {selectedContest.nextRound.advancementCondition}
                  </p>
                </div>

                <button
                  onClick={() => handleRegisterNextRound(selectedContest.id, selectedContest.nextRound.id)}
                  className={`px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md ${
                    registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                      ? "bg-emerald-600 text-white"
                      : "bg-[#0050A0] hover:bg-blue-700 text-white"
                  }`}
                >
                  {registeredRounds[`${selectedContest.id}_${selectedContest.nextRound.id}`]
                    ? "✓ Đã nhận thông báo"
                    : "Đăng ký nhận thông báo mở đề"}
                </button>
              </div>
            </div>
          )}

          {/* NÚT QUAY LẠI DANH SÁCH Ở CUỐI TRANG */}
          <div className="pt-3 flex justify-center">
            <button
              onClick={handleBackToList}
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
          {/* Hero Banner với Spotlight mở nhanh Olympic 2026 */}
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

            {/* Quick Action Box: Nhấn vào đây là xem ngay giải Olympic 2026 */}
            <div className="relative z-10 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-white text-xs shrink-0 text-center w-full md:w-auto space-y-2">
              <div>
                <span className="text-[10px] text-sky-200 block uppercase font-bold">Đang mở hôm nay</span>
                <strong className="text-amber-300 font-mono text-sm font-black block">Olympic 2026 · Vòng 2</strong>
              </div>
              <button
                onClick={() => handleSelectContest(contests[0])}
                className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs transition-all cursor-pointer shadow-sm"
              >
                Xem chi tiết cuộc thi →
              </button>
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
                      onClick={() => handleSelectContest(c)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-[#0050A0] hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                    >
                      <span>Xem chi tiết & Vào thi</span>
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

          {/* PHÂN TRANG (PAGINATION LUÔN LUÔN HIỆN DIỆN) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-sky-100 shadow-2xs mt-2">
            <span className="text-xs text-slate-500 font-medium">
              Hiển thị <strong>{filteredContests.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> -{" "}
              <strong>{Math.min(currentPage * itemsPerPage, filteredContests.length)}</strong> trên tổng số{" "}
              <strong>{filteredContests.length}</strong> cuộc thi
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
                disabled={currentPage === totalPages || filteredContests.length === 0}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-sky-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
