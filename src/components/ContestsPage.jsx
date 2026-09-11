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
  ChevronDown,
  ChevronUp,
  BarChart3,
  Check,
  BookOpen
} from "lucide-react";

// Mock Data for Grand Contests with structured multi-rounds
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
    description:
      "Đấu trường lập trình danh giá gồm 3 vòng thi: Sơ loại trực tuyến → Bán kết khu vực → Chung kết toàn quốc.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-OLY-0842",
      overallRank: "#14 Toàn quốc",
      totalScore: 280
    },
    rounds: [
      {
        id: "OLYMPIC_2026_R1",
        roundNumber: 1,
        title: "Vòng 1: Khởi động & Sơ loại Toàn quốc",
        stageName: "Sơ loại",
        status: "completed", // completed, ongoing, upcoming
        statusLabel: "Đã hoàn thành",
        startDate: "15/08/2026",
        duration: "180 phút",
        problemsCount: 3,
        totalParticipants: 3250,
        myResult: {
          participated: true,
          score: 280,
          maxScore: 300,
          rank: 14,
          verdict: "ĐẠT CHUẨN VÀO BÁN KẾT",
          acSummary: "2/3 AC · 1 Partial (80đ)"
        },
        problems: [
          { code: "OLY-A", name: "Tổng chuỗi con lớn nhất", points: 100, myScore: 100, status: "AC" },
          { code: "OLY-B", name: "Mã hóa chuỗi ma trận", points: 100, myScore: 100, status: "AC" },
          { code: "OLY-C", name: "Đường đi ngắn nhất trên lưới", points: 100, myScore: 80, status: "Partial" }
        ]
      },
      {
        id: "OLYMPIC_2026_R2",
        roundNumber: 2,
        title: "Vòng 2: Bán kết Khu vực & Đấu trường Tỉnh/Thành",
        stageName: "Bán kết (Hiện tại)",
        status: "ongoing",
        statusLabel: "Đang mở phòng thi",
        startDate: "Hôm nay · 08:00 – 12:00",
        duration: "240 phút",
        timeRemaining: "02:45:18",
        problemsCount: 4,
        totalParticipants: 580,
        myResult: {
          participated: false,
          isRegistered: true,
          candidateId: "SBD-OLY-0842",
          note: "Bạn đã có SBD và đủ điều kiện thi. Hãy vào phòng thi trước 12:00."
        },
        problems: [
          { code: "OLY-2A", name: "Cây bao trùm nhỏ nhất có điều kiện", points: 100 },
          { code: "OLY-2B", name: "Tối ưu hóa hành trình giao hàng", points: 100 },
          { code: "OLY-2C", name: "Quy hoạch động trên đồ thị cây", points: 100 },
          { code: "OLY-2D", name: "Truy vấn đoạn lồng nhau (Segment Tree)", points: 100 }
        ]
      },
      {
        id: "OLYMPIC_2026_R3",
        roundNumber: 3,
        title: "Vòng 3: Chung kết Toàn quốc & Lễ Vinh danh",
        stageName: "Chung kết",
        status: "upcoming",
        statusLabel: "Sắp diễn ra",
        startDate: "25/10/2026",
        duration: "300 phút",
        problemsCount: 5,
        totalParticipants: 100,
        myResult: {
          participated: false,
          isRegistered: false,
          note: "Top 100 thí sinh xuất sắc từ Vòng 2 sẽ được chọn vào Chung kết."
        },
        problems: []
      }
    ],
    rules: [
      "Môi trường chấm: C++17, Python 3.11, Java 17. Giới hạn 1.0s/test, 256MB.",
      "Xếp hạng theo tổng điểm; nếu bằng điểm ưu tiên thời gian nộp ít hơn (Penalty).",
      "Tự động phát hiện mã nguồn tương đồng (Anti-Plagiarism)."
    ],
    prizes: [
      { rank: "01 Giải Đặc biệt (Quán quân)", value: "20.000.000đ + Cúp Vô địch" },
      { rank: "03 Giải Nhất (HCV)", value: "10.000.000đ/giải + Huy chương Vàng" },
      { rank: "05 Giải Nhì (HCB)", value: "5.000.000đ/giải + Huy chương Bạc" },
      { rank: "10 Giải Ba (HCĐ)", value: "2.000.000đ/giải + Huy chương Đồng" }
    ],
    leaderboard: [
      { rank: 1, name: "Nguyễn Hoàng Nam", school: "THPT Chuyên Hà Nội - Amsterdam", total: 300, penalty: "85'" },
      { rank: 2, name: "Trần Minh Đức", school: "THPT Chuyên Lê Hồng Phong", total: 300, penalty: "102'" },
      { rank: 3, name: "Lê Bảo Châu", school: "THPT Chuyên KHTN", total: 300, penalty: "120'" },
      { rank: 14, name: "Bạn (Nguyễn Văn An)", school: "THPT Chuyên Quốc Học Huế", total: 280, penalty: "145'", isMe: true }
    ]
  },
  {
    id: "MINI_CONTEST_2026",
    title: "Đấu trường Lập trình Online Ôn Thi 360 (Mùa 3)",
    editionLabel: "Mùa giải 2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở Vòng 3 · Đồ thị ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "⚡ Mini-Contest Định kỳ",
    organizer: "Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/contest-img-2.png",
    totalPrize: "15.000.000đ + Quà tặng công nghệ",
    targetAudience: "Học sinh luyện thi HSG & Lập trình viên trẻ",
    description: "Chuỗi 3 kỳ thi cọ xát trực tiếp tốc độ và tư duy thuật toán theo chuẩn ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-MINI-302",
      overallRank: "#18 Toàn quốc",
      totalScore: 375
    },
    rounds: [
      {
        id: "MINI_R1",
        roundNumber: 1,
        title: "Chặng 1: Cấu trúc dữ liệu & Mảng (Tháng 7)",
        stageName: "Chặng 1",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        startDate: "20/07/2026",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1100,
        myResult: {
          participated: true,
          score: 200,
          maxScore: 200,
          rank: 8,
          verdict: "HOÀN THÀNH XUẤT SẮC",
          acSummary: "2/2 AC (100% điểm)"
        }
      },
      {
        id: "MINI_R2",
        roundNumber: 2,
        title: "Chặng 2: Quy hoạch động nâng cao (Tháng 8)",
        stageName: "Chặng 2",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        startDate: "22/08/2026",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1250,
        myResult: {
          participated: true,
          score: 175,
          maxScore: 200,
          rank: 22,
          verdict: "ĐẠT TOP 2%",
          acSummary: "1 AC · 1 Partial (75đ)"
        }
      },
      {
        id: "MINI_R3",
        roundNumber: 3,
        title: "Chặng 3: Đồ thị & Luồng Cực đại (Tháng 10)",
        stageName: "Chặng 3 (Chung cuộc)",
        status: "upcoming",
        statusLabel: "Mở đăng ký",
        startDate: "20/10/2026 · 19:30",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1420,
        myResult: {
          participated: false,
          isRegistered: false,
          note: "Mở tự do cho tất cả học viên Ôn Thi 360 tích lũy điểm mùa giải."
        }
      }
    ],
    rules: [
      "Cuộc thi mở tự do, giám sát tự động thời gian và lịch sử nộp bài.",
      "Điểm tổng cả 3 chặng quyết định giải thưởng chung cuộc."
    ],
    prizes: [
      { rank: "Top 1 Chung cuộc", value: "5.000.000đ + Bàn phím cơ Custom" },
      { rank: "Top 2 - 5", value: "2.000.000đ + Tai nghe gaming" }
    ],
    leaderboard: [
      { rank: 1, name: "Đặng Thu Thảo", school: "THPT Chuyên Lam Sơn", total: 200, penalty: "45'" },
      { rank: 18, name: "Bạn (Nguyễn Văn An)", school: "THPT Chuyên Quốc Học Huế", total: 175, penalty: "85'", isMe: true }
    ]
  },
  {
    id: "SURVEY_2026",
    title: "Khảo sát Năng lực Thuật toán & Tư duy Lập trình",
    editionLabel: "Đợt 1 · 2026",
    type: "survey",
    status: "ongoing",
    statusLabel: "Đang mở khảo sát",
    statusStyle: "bg-sky-100 text-sky-800 border-sky-300",
    tag: "📊 Khảo sát phi thi đua",
    organizer: "Viện Đánh giá Năng lực Số",
    bannerImage: "/assets/contest-img-3.png",
    totalPrize: "Chứng nhận phân cấp năng lực",
    targetAudience: "Học sinh tự đánh giá trình độ",
    description: "Khảo sát chuẩn hóa năng lực tư duy thuật toán và kỹ năng lập trình đầu vào.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-KS-551",
      overallRank: "Hạng A (Xuất sắc)",
      totalScore: 92
    },
    rounds: [
      {
        id: "SURVEY_1",
        roundNumber: 1,
        title: "Đợt 1: Tư duy Logic & Thuật toán Cơ bản",
        stageName: "Đợt 1",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        startDate: "01/09/2026",
        duration: "60 phút",
        problemsCount: 15,
        myResult: {
          participated: true,
          score: 92,
          maxScore: 100,
          rank: 120,
          verdict: "NĂNG LỰC: HẠNG XUẤT SẮC"
        }
      },
      {
        id: "SURVEY_2",
        roundNumber: 2,
        title: "Đợt 2: Cấu trúc Dữ liệu Nâng cao",
        stageName: "Đợt 2 (Đang mở)",
        status: "ongoing",
        statusLabel: "Đang mở",
        startDate: "Mở tự do đến 30/09",
        duration: "90 phút",
        problemsCount: 20,
        myResult: {
          participated: false,
          isRegistered: true,
          note: "Làm bài tự do bất kỳ lúc nào trong thời gian mở."
        }
      }
    ],
    rules: ["Khảo sát phi thương mại phục vụ định hướng học tập cá nhân hóa."],
    prizes: [{ rank: "Hạng A (85 - 100đ)", value: "Chứng nhận Năng lực Xuất sắc" }],
    leaderboard: []
  }
];

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [contests, setContests] = useState(CONTESTS_DATA);
  const [selectedContest, setSelectedContest] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [detailTab, setDetailTab] = useState("rounds"); // rounds, leaderboard, rules
  const [expandedPastRound, setExpandedPastRound] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState("");

  const filteredContests = contests.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "ongoing") return c.status === "ongoing";
    if (activeTab === "upcoming") return c.status === "upcoming";
    if (activeTab === "surveys") return c.type === "survey";
    return true;
  });

  const handleRegister = (contestId, roundId) => {
    setContests((prev) =>
      prev.map((c) => {
        if (c.id === contestId) {
          return {
            ...c,
            rounds: c.rounds.map((r) =>
              r.id === roundId
                ? {
                    ...r,
                    myResult: {
                      ...r.myResult,
                      isRegistered: true,
                      candidateId: `SBD-${Math.floor(1000 + Math.random() * 9000)}`,
                      note: "Đã đăng ký thành công! Số báo danh đã được cấp."
                    }
                  }
                : r
            )
          };
        }
        return c;
      })
    );

    if (selectedContest && selectedContest.id === contestId) {
      setSelectedContest((prev) => ({
        ...prev,
        rounds: prev.rounds.map((r) =>
          r.id === roundId
            ? {
                ...r,
                myResult: {
                  ...r.myResult,
                  isRegistered: true,
                  candidateId: `SBD-${Math.floor(1000 + Math.random() * 9000)}`,
                  note: "Đã đăng ký thành công! Số báo danh đã được cấp."
                }
              }
            : r
        )
      }));
    }

    setRegisterSuccess("Đăng ký thành công! Hệ thống đã cấp Số Báo Danh.");
    setTimeout(() => setRegisterSuccess(""), 4000);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {registerSuccess && (
        <div className="fixed top-20 right-5 z-[100] max-w-sm bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 animate-slideIn text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{registerSuccess}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: CHI TIẾT CUỘC THI (GIAO DIỆN TINH GỌN, RÕ RÀNG, TẬP TRUNG)       */}
      {/* ========================================================================= */}
      {selectedContest ? (
        <div className="flex flex-col gap-4">
          {/* Header Bar điều hướng quay lại */}
          <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-2xl border border-sky-100 shadow-[0_2px_6px_rgba(0,100,220,0.03)]">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-blue-700 bg-sky-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tất cả cuộc thi</span>
            </button>
            <div className="text-[11px] text-slate-500 font-medium">
              <span className="font-bold text-slate-700">{selectedContest.title}</span>
            </div>
          </div>

          {/* Banner tóm tắt cuộc thi (Gọn gàng & Hiện đại) */}
          <div className="relative rounded-2xl overflow-hidden border border-sky-200 bg-gradient-to-r from-[#004085] via-[#0066CC] to-[#0284C7] p-5 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-amber-950">
                    {selectedContest.tag}
                  </span>
                  <span className="text-[11px] text-sky-100 font-semibold">{selectedContest.editionLabel}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedContest.title}
                </h1>
                <p className="text-xs text-sky-100 mt-1 line-clamp-1">
                  {selectedContest.description}
                </p>
              </div>

              {/* Thẻ SBD của tôi (Gọn gàng) */}
              {selectedContest.myOverallStatus && (
                <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl p-3 text-white text-xs shrink-0 flex items-center gap-4">
                  <div>
                    <span className="text-[10px] text-sky-200 block uppercase font-bold">Số báo danh của bạn</span>
                    <strong className="font-mono text-sm text-amber-300 font-black">
                      {selectedContest.myOverallStatus.candidateId}
                    </strong>
                  </div>
                  <div className="border-l border-white/20 pl-4">
                    <span className="text-[10px] text-sky-200 block uppercase font-bold">Hạng hiện tại</span>
                    <strong className="text-white font-bold">{selectedContest.myOverallStatus.overallRank}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs chuyển đổi nhẹ nhàng */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-sky-100 shadow-2xs">
            {[
              { id: "rounds", label: "Lộ trình các vòng", icon: Trophy },
              { id: "leaderboard", label: "Bảng xếp hạng", icon: BarChart3 },
              { id: "rules", label: "Thể lệ & Giải thưởng", icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    detailTab === tab.id
                      ? "bg-[#0066CC] text-white shadow-2xs"
                      : "text-slate-600 hover:bg-sky-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: LỘ TRÌNH VÒNG THI (TẬP TRUNG VÀO HIỆN TẠI, RÚT GỌN QUÁ KHỨ)        */}
          {/* ========================================================================= */}
          {detailTab === "rounds" && (
            <div className="space-y-3.5">
              {/* 1. KHỐI NỔI BẬT NHẤT: VÒNG ĐANG DIỄN RA (ACTIVE SPOTLIGHT) */}
              {selectedContest.rounds.filter((r) => r.status === "ongoing").map((round) => (
                <div
                  key={round.id}
                  className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-b from-emerald-50/80 via-white to-white p-4 sm:p-5 shadow-lg shadow-emerald-500/5 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white flex items-center gap-1 animate-pulse">
                        <Flame className="w-3 h-3 fill-white" />
                        ĐANG DIỄN RA HÔM NAY
                      </span>
                      <h2 className="text-sm sm:text-base font-black text-slate-800">{round.title}</h2>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-xl text-xs font-bold text-emerald-900">
                      <Timer className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Thời gian còn lại:</span>
                      <strong className="font-mono text-emerald-800 text-sm font-black">
                        {round.timeRemaining || "02:45:18"}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 mt-4 items-center">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <strong>{round.startDate}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <strong>{round.duration} ({round.problemsCount} bài toán)</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-600" />
                          <span>{round.totalParticipants} thí sinh</span>
                        </span>
                      </div>

                      <p className="text-xs text-emerald-900 font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                        👉 {round.myResult?.note || "Phòng thi trực tuyến đang mở. Thí sinh làm bài trên hệ thống IDE chuẩn."}
                      </p>
                    </div>

                    {/* Nút hành động chính */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onOpenCodeWorkspace?.({
                            title: `${selectedContest.title} — ${round.title}`,
                            id: round.id
                          });
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>VÀO PHÒNG THI NGAY</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* 2. CÁC VÒNG ĐÃ HOÀN THÀNH (HIỂN THỊ NHẸ NHÀNG, GỌN GÀNG) */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  Kỳ thi đã qua
                </p>

                {selectedContest.rounds.filter((r) => r.status === "completed").map((round) => {
                  const isExpanded = expandedPastRound === round.id;
                  return (
                    <div
                      key={round.id}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition-all hover:bg-white hover:border-sky-200"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-700">{round.title}</span>
                              <span className="text-[10px] text-slate-400 font-medium">({round.startDate})</span>
                            </div>
                            {round.myResult?.participated && (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Kết quả của bạn: <strong className="text-emerald-700 font-bold">{round.myResult.score}/{round.myResult.maxScore} điểm</strong> (Rank #{round.myResult.rank}) · <span className="text-emerald-600 font-semibold">{round.myResult.verdict}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onOpenCodeWorkspace?.({
                                title: `Xem lại đề: ${round.title}`,
                                id: round.id
                              });
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-sky-300 text-[11px] font-bold text-slate-600 hover:text-blue-600 transition-all cursor-pointer"
                          >
                            Xem lại bài & Lời giải
                          </button>
                          <button
                            onClick={() => setExpandedPastRound(isExpanded ? null : round.id)}
                            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                            title="Chi tiết câu hỏi"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Accordion mở rộng nhẹ khi muốn xem danh sách bài */}
                      {isExpanded && round.problems && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          {round.problems.map((prob) => (
                            <div key={prob.code} className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                              <span className="font-medium text-slate-700 truncate">{prob.name}</span>
                              <span className="font-bold text-emerald-700 shrink-0 ml-1">{prob.myScore}đ</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 3. CÁC VÒNG SẮP DIỄN RA (HIỂN THỊ TINH GIẢN) */}
              {selectedContest.rounds.filter((r) => r.status === "upcoming").length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                    Vòng thi sắp tới
                  </p>
                  {selectedContest.rounds.filter((r) => r.status === "upcoming").map((round) => (
                    <div
                      key={round.id}
                      className="rounded-xl border border-dashed border-slate-300 bg-white p-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-bold text-[10px]">
                            {round.stageName}
                          </span>
                          <strong className="text-slate-700">{round.title}</strong>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Dự kiến: {round.startDate} · {round.duration} · {round.myResult?.note}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRegister(selectedContest.id, round.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0066CC] font-bold text-xs transition-all cursor-pointer"
                      >
                        {round.myResult?.isRegistered ? "Đã đăng ký ✓" : "Đăng ký sớm"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: BẢNG XẾP HẠNG (GỌN GÀNG, SẠCH SẼ)                                  */}
          {/* ========================================================================= */}
          {detailTab === "leaderboard" && (
            <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Bảng xếp hạng Vòng gần nhất
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase">
                      <th className="py-2 px-2 font-bold">Hạng</th>
                      <th className="py-2 px-2 font-bold">Thí sinh</th>
                      <th className="py-2 px-2 font-bold">Trường</th>
                      <th className="py-2 px-2 font-bold text-right">Tổng điểm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {selectedContest.leaderboard?.map((row) => (
                      <tr key={row.rank} className={row.isMe ? "bg-amber-50/80 font-bold text-amber-900" : ""}>
                        <td className="py-2.5 px-2 font-bold">
                          {row.rank === 1 ? "🥇 1" : row.rank === 2 ? "🥈 2" : row.rank === 3 ? "🥉 3" : `#${row.rank}`}
                        </td>
                        <td className="py-2.5 px-2">
                          <span>{row.name}</span>
                          {row.isMe && <span className="ml-1 text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded">Bạn</span>}
                        </td>
                        <td className="py-2.5 px-2 text-slate-500 text-[11px]">{row.school}</td>
                        <td className="py-2.5 px-2 text-right font-black text-blue-700">{row.total}đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: THỂ LỆ & GIẢI THƯỞNG (NGẮN GỌN)                                    */}
          {/* ========================================================================= */}
          {detailTab === "rules" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-2xs space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Quy chế thi đấu
                </h4>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  {selectedContest.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-2xs space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Cơ cấu giải thưởng
                </h4>
                <div className="space-y-1.5">
                  {selectedContest.prizes.map((p, i) => (
                    <div key={i} className="flex justify-between p-2 rounded-lg bg-amber-50/50 border border-amber-100">
                      <span className="font-semibold text-amber-950">{p.rank}</span>
                      <strong className="text-amber-800">{p.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: DANH SÁCH CUỘC THI (THẺ HIỆN ĐẠI, GỌN GÀNG, DỄ NHÌN)             */
        /* ========================================================================= */
        <>
          {/* Hero Banner ngắn gọn */}
          <div className="rounded-2xl bg-gradient-to-r from-[#004085] via-[#0066CC] to-[#0284C7] p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950 mb-2">
                <Trophy className="w-3 h-3" />
                <span>Mùa giải Lập trình 2026</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black">Đại hội Lập trình & Các Cuộc thi</h1>
              <p className="text-xs text-sky-100 mt-1">
                Các cuộc thi được tổ chức theo nhiều vòng. Bạn có thể theo dõi tiến trình và vào phòng thi trực tuyến.
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
              { id: "upcoming", label: "Sắp mở đăng ký" },
              { id: "surveys", label: "Khảo sát năng lực" }
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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

                    {/* Lộ trình mini */}
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-slate-500 font-semibold">
                        <span>Lộ trình {c.rounds.length} vòng:</span>
                        <span className="text-blue-600 font-bold">
                          {c.rounds.find((r) => r.status === "ongoing") ? "Đang mở vòng mới 🔥" : "Đã công bố"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {c.rounds.map((r, i) => (
                          <div
                            key={r.id}
                            className={`flex-1 py-1 px-1.5 rounded text-[10px] font-bold text-center truncate ${
                              r.status === "ongoing"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : r.status === "completed"
                                ? "bg-slate-200 text-slate-600"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            V{i + 1}: {r.stageName.split(" ")[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kết quả của bạn (nếu có) */}
                    {c.myOverallStatus && (
                      <div className="flex items-center justify-between text-[11px] text-amber-900 bg-amber-50/70 px-2.5 py-1.5 rounded-lg border border-amber-200/60">
                        <span>Kết quả của bạn:</span>
                        <strong className="font-bold">{c.myOverallStatus.totalScore}đ ({c.myOverallStatus.overallRank})</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setSelectedContest(c);
                      setDetailTab("rounds");
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Xem cuộc thi & Vào thi</span>
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
