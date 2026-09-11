import React, { useEffect, useState } from "react";
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
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
  Info,
  AlertCircle,
  BarChart3,
  Search,
  Check,
  ExternalLink,
  BookOpen
} from "lucide-react";

// Mock Data for Grand Contests with multiple rounds / stages
const INITIAL_CONTESTS = [
  {
    id: "OLYMPIC_2026",
    title: "Kỳ thi Olympic Tin học Trẻ Mở Rộng 2026",
    editionLabel: "Mùa giải 2025–2026",
    type: "contest",
    status: "ongoing",
    statusLabel: "Đang ở Vòng 2 · Bán kết 🔥",
    statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tag: "🏆 Đấu trường Quốc gia",
    organizer: "Hội Tin học & Ban Chuyên môn Ôn Thi 360",
    bannerImage: "/assets/page-contests-hero.jpg",
    totalPrize: "50.000.000đ + Học bổng Toàn phần",
    targetAudience: "Học sinh THCS & THPT toàn quốc (Bảng A, B, C)",
    description:
      "Đấu trường lập trình danh giá quy mô toàn quốc, quy tụ hơn 3.500 thí sinh tài năng cọ xát qua 3 vòng thi từ sơ loại đến chung kết toàn quốc theo chuẩn ACM/ICPC.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-OLY-0842",
      overallRank: "#14 Toàn quốc",
      totalScore: 280,
      badge: "Top 1% Khởi động"
    },
    rounds: [
      {
        id: "OLYMPIC_2026_R1",
        roundNumber: 1,
        title: "Vòng 1 · Khởi động & Sơ loại Toàn quốc",
        stageName: "Vòng Sơ Loại",
        status: "completed", // completed, ongoing, upcoming
        statusLabel: "Đã kết thúc",
        statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
        startDate: "15/08/2026 08:00",
        endDate: "15/08/2026 11:00",
        duration: "180 phút",
        problemsCount: 3,
        totalParticipants: 3250,
        advancementCondition: "Top 600 thí sinh điểm cao nhất vào Bán kết",
        problems: [
          { code: "OLY26_R1_A", name: "Tổng chuỗi con lớn nhất", points: 100, myScore: 100, time: "18 phút", status: "AC" },
          { code: "OLY26_R1_B", name: "Mã hóa chuỗi ký tự ma trận", points: 100, myScore: 100, time: "42 phút", status: "AC" },
          { code: "OLY26_R1_C", name: "Đường đi ngắn nhất trên lưới", points: 100, myScore: 80, time: "85 phút", status: "Partial" }
        ],
        myResult: {
          participated: true,
          score: 280,
          maxScore: 300,
          rank: 14,
          totalRanked: 3250,
          acCount: "2/3 AC (1 Partial)",
          verdict: "ĐẠT CHUẨN VÀO BÁN KẾT",
          verdictStyle: "text-emerald-700 bg-emerald-50 border-emerald-200",
          certificateAvailable: true
        }
      },
      {
        id: "OLYMPIC_2026_R2",
        roundNumber: 2,
        title: "Vòng 2 · Bán kết Khu vực & Đấu trường Tỉnh/Thành",
        stageName: "Vòng Bán Kết",
        status: "ongoing",
        statusLabel: "Đang mở phòng thi 🔥",
        statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse",
        startDate: "10/09/2026 08:00",
        endDate: "10/09/2026 12:00",
        duration: "240 phút",
        timeRemaining: "02:45:18",
        problemsCount: 4,
        totalParticipants: 580,
        advancementCondition: "Top 100 thí sinh xuất sắc nhất lọt vào Chung kết Toàn quốc",
        problems: [
          { code: "OLY26_R2_A", name: "Cây bao trùm nhỏ nhất có điều kiện", points: 100 },
          { code: "OLY26_R2_B", name: "Tối ưu hóa hành trình giao vận", points: 100 },
          { code: "OLY26_R2_C", name: "Quy hoạch động trên đồ thị cây", points: 100 },
          { code: "OLY26_R2_D", name: "Truy vấn đoạn lồng nhau (Segment Tree)", points: 100 }
        ],
        myResult: {
          participated: false,
          isRegistered: true,
          candidateId: "SBD-OLY-0842",
          statusNote: "Bạn đã đủ điều kiện dự thi và đã hoàn tất thủ tục báo danh. Hãy vào phòng thi trước giờ đóng đề!"
        }
      },
      {
        id: "OLYMPIC_2026_R3",
        roundNumber: 3,
        title: "Vòng 3 · Chung kết Toàn quốc & Lễ Trao giải",
        stageName: "Chung Kết Toàn Quốc",
        status: "upcoming",
        statusLabel: "Sắp diễn ra",
        statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
        startDate: "25/10/2026 08:30",
        endDate: "25/10/2026 13:30",
        duration: "300 phút",
        problemsCount: 5,
        totalParticipants: 100,
        advancementCondition: "Vinh danh Quán quân & Trao huy chương Vàng, Bạc, Đồng",
        problems: [],
        myResult: {
          participated: false,
          isRegistered: false,
          statusNote: "Đang chờ kết quả chính thức từ Vòng 2 (Bán kết) để xác nhận danh sách 100 thí sinh."
        }
      }
    ],
    rules: [
      "Mỗi thí sinh chỉ được sử dụng 01 tài khoản định danh duy nhất trong suốt các vòng thi của mùa giải.",
      "Môi trường chấm: Chuẩn GNU C++17, Python 3.11, OpenJDK 17. Giới hạn thời gian 1.0s/test, bộ nhớ 256MB.",
      "Quy tắc xếp hạng ACM/ICPC: Ưu tiên tổng điểm cao hơn; nếu bằng điểm ưu tiên tổng thời gian (penalty time) ít hơn.",
      "Hệ thống tự động phát hiện mã nguồn tương đồng (Anti-Plagiarism) và khóa tài khoản vi phạm vĩnh viễn.",
      "Sau khi mỗi vòng kết thúc, bảng xếp hạng sẽ được đối soát 24h trước khi công bố danh sách lọt vào vòng trong."
    ],
    prizes: [
      { rank: "01 Giải Đặc biệt (Quán quân)", value: "20.000.000đ + Cúp Vô địch mạ vàng + Học bổng 100%" },
      { rank: "03 Giải Nhất (Huy chương Vàng)", value: "10.000.000đ/giải + Huy chương Vàng + Chứng nhận" },
      { rank: "05 Giải Nhì (Huy chương Bạc)", value: "5.000.000đ/giải + Huy chương Bạc + Chứng nhận" },
      { rank: "10 Giải Ba (Huy chương Đồng)", value: "2.000.000đ/giải + Huy chương Đồng + Chứng nhận" },
      { rank: "Top 50 Toàn quốc", value: "Giấy khen vinh danh + Quà tặng công nghệ Ôn Thi 360" }
    ],
    roundLeaderboard: [
      { rank: 1, name: "Nguyễn Hoàng Nam", school: "THPT Chuyên Hà Nội - Amsterdam", p1: "100 (12')", p2: "100 (28')", p3: "100 (45')", total: 300, penalty: "85'" },
      { rank: 2, name: "Trần Minh Đức", school: "THPT Chuyên Lê Hồng Phong (TP.HCM)", p1: "100 (15')", p2: "100 (35')", p3: "100 (52')", total: 300, penalty: "102'" },
      { rank: 3, name: "Lê Bảo Châu", school: "THPT Chuyên Khoa học Tự nhiên", p1: "100 (20')", p2: "100 (40')", p3: "100 (60')", total: 300, penalty: "120'" },
      { rank: 14, name: "Bạn (Nguyễn Văn An)", school: "THPT Chuyên Quốc Học Huế", p1: "100 (18')", p2: "100 (42')", p3: "80 (85')", total: 280, penalty: "145'", isMe: true },
      { rank: 15, name: "Phạm Hải Long", school: "THPT Chuyên Phan Bội Châu", p1: "100 (25')", p2: "100 (55')", p3: "80 (90')", total: 280, penalty: "170'" }
    ]
  },
  {
    id: "MINI_CONTEST_2026",
    title: "Chuỗi Đấu trường Lập trình Online Ôn Thi 360 Lần thứ 3",
    editionLabel: "Mùa giải 2026",
    type: "contest",
    status: "upcoming",
    statusLabel: "Sắp mở Vòng 3 · Đồ thị ⏳",
    statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
    tag: "⚡ Mini-Contest Định kỳ",
    organizer: "Ban Giảng viên Ôn Thi 360",
    bannerImage: "/assets/contest-img-2.png",
    totalPrize: "15.000.000đ + Quà tặng công nghệ",
    targetAudience: "Học sinh luyện thi HSG & Lập trình viên trẻ",
    description:
      "Chuỗi giải đấu mini 3 chặng nhằm rèn luyện tốc độ xử lý thuật toán, cọ xát với các chuyên đề Trọng tâm: Cấu trúc dữ liệu, Quy hoạch động, Đồ thị nâng cao.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-MINI-302",
      overallRank: "#18 / 1,420",
      totalScore: 375,
      badge: "Chiến binh kiên trì"
    },
    rounds: [
      {
        id: "MINI_R1",
        roundNumber: 1,
        title: "Kỳ thi Chuyên đề 1 · Cấu trúc dữ liệu & Mảng (Tháng 7)",
        stageName: "Chặng 1",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
        startDate: "20/07/2026 19:30",
        endDate: "20/07/2026 21:30",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1100,
        advancementCondition: "Tích lũy điểm vào bảng tổng sắp mùa giải",
        problems: [
          { code: "MINI1_A", name: "Đếm cặp số có tổng chẵn", points: 100, myScore: 100, time: "10 phút", status: "AC" },
          { code: "MINI1_B", name: "Xử lý hàng đợi ưu tiên", points: 100, myScore: 100, time: "30 phút", status: "AC" }
        ],
        myResult: {
          participated: true,
          score: 200,
          maxScore: 200,
          rank: 8,
          totalRanked: 1100,
          acCount: "2/2 AC",
          verdict: "HOÀN THÀNH XUẤT SẮC",
          verdictStyle: "text-emerald-700 bg-emerald-50 border-emerald-200"
        }
      },
      {
        id: "MINI_R2",
        roundNumber: 2,
        title: "Kỳ thi Chuyên đề 2 · Quy hoạch động đa chiều (Tháng 8)",
        stageName: "Chặng 2",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
        startDate: "22/08/2026 19:30",
        endDate: "22/08/2026 21:30",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1250,
        advancementCondition: "Tích lũy điểm vào bảng tổng sắp mùa giải",
        problems: [
          { code: "MINI2_A", name: "Dãy con tăng dài nhất nâng cao", points: 100, myScore: 100, time: "25 phút", status: "AC" },
          { code: "MINI2_B", name: "Xếp balo 2 chiều", points: 100, myScore: 75, time: "60 phút", status: "Partial" }
        ],
        myResult: {
          participated: true,
          score: 175,
          maxScore: 200,
          rank: 22,
          totalRanked: 1250,
          acCount: "1/2 AC (1 Partial)",
          verdict: "ĐẠT TOP 2%",
          verdictStyle: "text-blue-700 bg-blue-50 border-blue-200"
        }
      },
      {
        id: "MINI_R3",
        roundNumber: 3,
        title: "Kỳ thi Chuyên đề 3 · Đồ thị & Luồng Cực đại (Tháng 10)",
        stageName: "Chặng Chung cuộc",
        status: "upcoming",
        statusLabel: "Sắp diễn ra",
        statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
        startDate: "20/10/2026 19:30",
        endDate: "20/10/2026 21:30",
        duration: "120 phút",
        problemsCount: 3,
        totalParticipants: 1420,
        advancementCondition: "Tổng kết mùa giải & Trao giải thưởng Mini-Contest 3",
        problems: [],
        myResult: {
          participated: false,
          isRegistered: false,
          statusNote: "Đang mở cổng đăng ký miễn phí cho tất cả học viên Ôn Thi 360."
        }
      }
    ],
    rules: [
      "Cuộc thi mở tự do cho tất cả học sinh đăng ký trên hệ thống.",
      "Hình thức thi online có giám sát tự động thời gian và lịch sử nộp bài.",
      "Điểm tổng cả 3 chặng sẽ quyết định vị trí chung cuộc trên Bảng Vinh Danh 2026."
    ],
    prizes: [
      { rank: "Top 1 Chung cuộc", value: "5.000.000đ + Bàn phím cơ Custom cao cấp" },
      { rank: "Top 2 - 5", value: "2.000.000đ + Tai nghe gaming" },
      { rank: "Top 6 - 20", value: "500.000đ + Áo thun độc quyền Ôn Thi 360" }
    ],
    roundLeaderboard: [
      { rank: 1, name: "Đặng Thu Thảo", school: "THPT Chuyên Lam Sơn", p1: "100", p2: "100", p3: "--", total: 200, penalty: "45'" },
      { rank: 2, name: "Vũ Gia Huy", school: "THPT Chuyên Bắc Giang", p1: "100", p2: "100", p3: "--", total: 200, penalty: "58'" },
      { rank: 18, name: "Bạn (Nguyễn Văn An)", school: "THPT Chuyên Quốc Học Huế", p1: "100", p2: "75", p3: "--", total: 175, penalty: "85'", isMe: true }
    ]
  },
  {
    id: "SURVEY_2026",
    title: "Đợt Khảo sát Năng lực Thuật toán & Tư duy Lập trình 2026",
    editionLabel: "Đợt khảo sát 01 · 2026",
    type: "survey",
    status: "ongoing",
    statusLabel: "Đang mở khảo sát",
    statusStyle: "bg-sky-100 text-sky-800 border-sky-300",
    tag: "📊 Khảo sát phi thi đua",
    organizer: "Viện Đánh giá Năng lực Giáo dục Số",
    bannerImage: "/assets/contest-img-3.png",
    totalPrize: "Chứng nhận điện tử phân cấp năng lực",
    targetAudience: "Học sinh tự đánh giá trình độ trước khi vào lớp chuyên sâu",
    description:
      "Bài khảo sát toàn diện giúp học sinh tự xác định điểm mạnh, điểm yếu về tư duy cấu trúc dữ liệu, giải thuật và độ phức tạp tính toán.",
    myOverallStatus: {
      registered: true,
      candidateId: "SBD-KS-551",
      overallRank: "Hạng A (Xuất sắc)",
      totalScore: 92,
      badge: "Năng lực Thuật toán Vững vàng"
    },
    rounds: [
      {
        id: "SURVEY_PART_1",
        roundNumber: 1,
        title: "Phần 1: Tư duy Logic & Thuật toán Cơ bản",
        stageName: "Khảo sát Đợt 1",
        status: "completed",
        statusLabel: "Đã hoàn thành",
        statusStyle: "bg-slate-100 text-slate-700 border-slate-300",
        startDate: "01/09/2026",
        endDate: "15/09/2026",
        duration: "60 phút",
        problemsCount: 15,
        totalParticipants: 3800,
        problems: [],
        myResult: {
          participated: true,
          score: 92,
          maxScore: 100,
          rank: 120,
          totalRanked: 3800,
          acCount: "14/15 câu đúng",
          verdict: "NĂNG LỰC TƯ DUY: HẠNG XUẤT SẮC",
          verdictStyle: "text-emerald-700 bg-emerald-50 border-emerald-200"
        }
      },
      {
        id: "SURVEY_PART_2",
        roundNumber: 2,
        title: "Phần 2: Cấu trúc Dữ liệu Nâng cao & Tối ưu Bộ nhớ",
        stageName: "Khảo sát Đợt 2",
        status: "ongoing",
        statusLabel: "Đang mở",
        statusStyle: "bg-sky-100 text-sky-800 border-sky-300",
        startDate: "16/09/2026",
        endDate: "30/09/2026",
        duration: "90 phút",
        problemsCount: 20,
        totalParticipants: 1540,
        problems: [],
        myResult: {
          participated: false,
          isRegistered: true,
          statusNote: "Bạn có thể vào làm khảo sát bất kỳ lúc nào trong thời gian mở."
        }
      }
    ],
    rules: [
      "Khảo sát phi thương mại và phi thi đua, phục vụ định hướng học tập cá nhân hóa.",
      "Có thể làm bài trên máy tính hoặc máy tính bảng.",
      "Kết quả khảo sát được xuất thành báo cáo PDF kèm biểu đồ phân tích kỹ năng."
    ],
    prizes: [
      { rank: "Hạng A (85 - 100 điểm)", value: "Chứng nhận Năng lực Thuật toán Xuất sắc" },
      { rank: "Hạng B (70 - 84 điểm)", value: "Chứng nhận Năng lực Khá Giỏi" }
    ],
    roundLeaderboard: []
  }
];

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [contests, setContests] = useState(INITIAL_CONTESTS);
  const [selectedContest, setSelectedContest] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [detailTab, setDetailTab] = useState("rounds"); // rounds, my_results, rules, leaderboard
  const [selectedRoundForLeaderboard, setSelectedRoundForLeaderboard] = useState(1);
  const [registrationModalRound, setRegistrationModalRound] = useState(null);
  const [registrationSuccessMsg, setRegistrationSuccessMsg] = useState("");

  const filteredContests = contests.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "ongoing") return c.status === "ongoing";
    if (activeTab === "upcoming") return c.status === "upcoming";
    if (activeTab === "surveys") return c.type === "survey";
    return true;
  });

  const handleRegisterRound = (contestId, round) => {
    // Simulate successful registration
    setContests((prev) =>
      prev.map((c) => {
        if (c.id === contestId) {
          const updatedRounds = c.rounds.map((r) => {
            if (r.id === round.id) {
              return {
                ...r,
                myResult: {
                  ...r.myResult,
                  isRegistered: true,
                  candidateId: `SBD-${Math.floor(1000 + Math.random() * 9000)}`,
                  statusNote: "Đăng ký thành công! Bạn đã có số báo danh và đủ điều kiện vào thi."
                }
              };
            }
            return r;
          });
          return { ...c, rounds: updatedRounds };
        }
        return c;
      })
    );

    if (selectedContest && selectedContest.id === contestId) {
      setSelectedContest((prev) => ({
        ...prev,
        rounds: prev.rounds.map((r) =>
          r.id === round.id
            ? {
                ...r,
                myResult: {
                  ...r.myResult,
                  isRegistered: true,
                  candidateId: `SBD-${Math.floor(1000 + Math.random() * 9000)}`,
                  statusNote: "Đăng ký thành công! Bạn đã có số báo danh và đủ điều kiện vào thi."
                }
              }
            : r
        )
      }));
    }

    setRegistrationModalRound(null);
    setRegistrationSuccessMsg(`Bạn đã đăng ký thành công kỳ thi "${round.title}"!`);
    setTimeout(() => setRegistrationSuccessMsg(""), 4500);
  };

  return (
    <div className="flex flex-col gap-5 animate-fadeIn pb-12">
      {/* SUCCESS NOTIFICATION TOAST */}
      {registrationSuccessMsg && (
        <div className="fixed top-20 right-5 z-[100] max-w-md bg-emerald-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <p className="text-xs font-bold leading-relaxed">{registrationSuccessMsg}</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: GRAND CONTEST DETAIL HUB (Khi người dùng chọn 1 cuộc thi cụ thể)   */}
      {/* ========================================================================= */}
      {selectedContest ? (
        <div className="flex flex-col gap-5">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-sky-100 shadow-[0_2px_8px_rgba(0,100,220,0.04)]">
            <button
              onClick={() => setSelectedContest(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-blue-700 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition-all cursor-pointer active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại danh sách Cuộc thi</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span>Đấu trường</span>
              <span>/</span>
              <span className="font-bold text-slate-700 max-w-[200px] sm:max-w-none truncate">
                {selectedContest.title}
              </span>
            </div>
          </div>

          {/* Tournament Hero Header */}
          <div className="relative rounded-3xl overflow-hidden border border-sky-200 shadow-[0_12px_40px_rgba(0,100,220,0.12)] bg-gradient-to-r from-[#003B7A] via-[#0055B3] to-[#0284C7] p-6 sm:p-8 text-white">
            <img
              src={selectedContest.bannerImage || "/assets/page-contests-hero.jpg"}
              alt="Tournament banner"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-20 mix-blend-luminosity"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 shadow-sm">
                    <Trophy className="w-3.5 h-3.5" />
                    {selectedContest.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 backdrop-blur-xs border border-white/20">
                    {selectedContest.editionLabel}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${selectedContest.statusStyle}`}>
                    {selectedContest.statusLabel}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  {selectedContest.title}
                </h1>

                <p className="text-xs sm:text-sm text-sky-100 mt-2.5 leading-relaxed max-w-2xl">
                  {selectedContest.description}
                </p>

                {/* Meta stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-2.5">
                    <p className="text-[10px] uppercase font-bold text-sky-200">Lộ trình</p>
                    <p className="text-xs font-black text-white mt-0.5">{selectedContest.rounds.length} Vòng thi chính thức</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-2.5">
                    <p className="text-[10px] uppercase font-bold text-sky-200">Tổng giải thưởng</p>
                    <p className="text-xs font-black text-amber-300 mt-0.5 truncate">{selectedContest.totalPrize}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-2.5">
                    <p className="text-[10px] uppercase font-bold text-sky-200">Đơn vị tổ chức</p>
                    <p className="text-xs font-black text-white mt-0.5 truncate">{selectedContest.organizer}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl p-2.5">
                    <p className="text-[10px] uppercase font-bold text-sky-200">Đối tượng</p>
                    <p className="text-xs font-black text-white mt-0.5 truncate">{selectedContest.targetAudience}</p>
                  </div>
                </div>
              </div>

              {/* My Overall Badge Card */}
              {selectedContest.myOverallStatus && (
                <div className="w-full lg:w-80 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-xl text-white">
                  <div className="flex items-center justify-between pb-2 border-b border-white/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Medal className="w-4 h-4" />
                      <span>Hồ sơ thí sinh của tôi</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 font-bold">
                      Đã ghi danh
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200 text-[11px]">Số báo danh:</span>
                      <strong className="font-mono text-white text-[13px] bg-black/20 px-2 py-0.5 rounded-md">
                        {selectedContest.myOverallStatus.candidateId}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200 text-[11px]">Hạng tổng sắp:</span>
                      <strong className="text-amber-300 font-bold">{selectedContest.myOverallStatus.overallRank}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sky-200 text-[11px]">Tổng điểm tích lũy:</span>
                      <strong className="text-white font-bold">{selectedContest.myOverallStatus.totalScore} điểm</strong>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="text-sky-100">{selectedContest.myOverallStatus.badge}</span>
                    <button
                      onClick={() => setDetailTab("my_results")}
                      className="font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tournament Detail Navigation Tabs */}
          <div className="bg-white rounded-2xl p-2 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "rounds", label: "Lộ trình & Các vòng thi", icon: Trophy, count: selectedContest.rounds.length },
                { id: "my_results", label: "Hồ sơ & Kết quả của tôi", icon: UserCheck },
                { id: "leaderboard", label: "Bảng xếp hạng giải đấu", icon: BarChart3 },
                { id: "rules", label: "Thể lệ & Cơ cấu Giải thưởng", icon: FileText }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id)}
                    className={`min-h-10 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      detailTab === tab.id
                        ? "bg-[#0066CC] text-white shadow-sm"
                        : "text-slate-600 hover:bg-sky-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          detailTab === tab.id ? "bg-white/25 text-white" : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: ROUNDS & STAGES TIMELINE (LỘ TRÌNH CÁC VÒNG THI) */}
          {detailTab === "rounds" && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)]">
                <h2 className="text-sm sm:text-base font-black text-[#0B3C78] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Tiến trình qua các Vòng / Kỳ thi trong mùa giải
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Thí sinh cần theo dõi trạng thái từng vòng, thời gian mở đề và kết quả để chuẩn bị tốt nhất cho các vòng tiếp theo.
                </p>

                {/* Horizontal Stepper Progress */}
                <div className="mt-6 mb-2 grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                  {selectedContest.rounds.map((round, idx) => (
                    <div
                      key={round.id}
                      className={`relative rounded-2xl p-4 border transition-all ${
                        round.status === "ongoing"
                          ? "bg-gradient-to-b from-emerald-50 to-white border-emerald-300 shadow-md ring-2 ring-emerald-400/30"
                          : round.status === "completed"
                          ? "bg-sky-50/60 border-sky-200"
                          : "bg-slate-50/80 border-slate-200 opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                          {round.stageName}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${round.statusStyle}`}>
                          {round.statusLabel}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{round.title}</h3>

                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span>{round.startDate}</span>
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">{round.duration} · {round.problemsCount} bài</span>
                        {round.status === "completed" && round.myResult?.participated && (
                          <strong className="text-emerald-700 font-bold">
                            Điểm: {round.myResult.score}/{round.myResult.maxScore}
                          </strong>
                        )}
                        {round.status === "ongoing" && (
                          <strong className="text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
                            <Flame className="w-3.5 h-3.5 text-red-500" />
                            Đang mở
                          </strong>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Cards for Each Round */}
              <div className="space-y-4">
                {selectedContest.rounds.map((round) => (
                  <div
                    key={round.id}
                    className="bg-white rounded-3xl border border-sky-100 shadow-[0_4px_16px_rgba(0,100,220,0.06)] overflow-hidden transition-all hover:border-sky-200"
                  >
                    {/* Round Header Strip */}
                    <div
                      className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b ${
                        round.status === "ongoing"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                          : round.status === "completed"
                          ? "bg-slate-100 text-slate-800 border-slate-200"
                          : "bg-sky-50 text-[#0050A0] border-sky-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                            round.status === "ongoing"
                              ? "bg-white text-emerald-800 shadow-sm"
                              : "bg-[#0066CC] text-white"
                          }`}
                        >
                          {round.roundNumber}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-black opacity-85 block">
                            {round.stageName}
                          </span>
                          <h3 className="text-sm font-black leading-none">{round.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${
                            round.status === "ongoing"
                              ? "bg-white text-emerald-800 border-white/60 font-black"
                              : round.statusStyle
                          }`}
                        >
                          {round.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Round Body Details */}
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6">
                      {/* Left Column: Schedule & Condition */}
                      <div className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-400 block">Thời gian diễn ra:</span>
                              <strong>{round.startDate} – {round.endDate}</strong>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-400 block">Thời lượng thi:</span>
                              <strong>{round.duration} ({round.problemsCount} bài toán)</strong>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-400 block">Quy mô thí sinh:</span>
                              <strong>{round.totalParticipants.toLocaleString()} thí sinh</strong>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                            <div>
                              <span className="text-[10px] text-slate-400 block">Điều kiện tiến bước:</span>
                              <strong className="line-clamp-1">{round.advancementCondition}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Problem set preview (if published/completed/ongoing) */}
                        {round.problems && round.problems.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                              Danh sách bài toán trong vòng thi này ({round.problems.length} bài):
                            </p>
                            <div className="space-y-1.5">
                              {round.problems.map((prob, pIdx) => (
                                <div
                                  key={prob.code}
                                  className="flex items-center justify-between p-2.5 bg-sky-50/50 rounded-xl border border-sky-100 text-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">
                                      {prob.code}
                                    </span>
                                    <span className="font-bold text-slate-800">{prob.name}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-slate-500 font-medium">{prob.points} điểm</span>
                                    {prob.myScore !== undefined && (
                                      <span
                                        className={`font-black px-2 py-0.5 rounded text-[11px] ${
                                          prob.status === "AC"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-amber-100 text-amber-800"
                                        }`}
                                      >
                                        Đạt: {prob.myScore}/{prob.points} ({prob.status})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column: User's Participation Status & Actions */}
                      <div className="flex flex-col justify-between bg-[#F8FBFE] p-4 sm:p-5 rounded-2xl border border-sky-100">
                        <div>
                          <p className="text-[11px] uppercase font-black tracking-wider text-sky-800 mb-2 flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4 text-blue-600" />
                            Trạng thái của bạn tại vòng này:
                          </p>

                          {/* CASE 1: Round is Completed & User Participated */}
                          {round.status === "completed" && round.myResult?.participated && (
                            <div className="space-y-2.5">
                              <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-slate-500">Điểm số chính thức:</span>
                                  <span className="text-base font-black text-emerald-700">
                                    {round.myResult.score} / {round.myResult.maxScore} điểm
                                  </span>
                                </div>
                                <div className="flex items-center justify-between mt-1 text-xs">
                                  <span className="text-slate-500">Thứ hạng vòng:</span>
                                  <strong className="text-slate-800">
                                    #{round.myResult.rank} / {round.myResult.totalRanked.toLocaleString()}
                                  </strong>
                                </div>
                                <div className="flex items-center justify-between mt-1 text-xs">
                                  <span className="text-slate-500">Kết quả:</span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${round.myResult.verdictStyle}`}>
                                    {round.myResult.verdict}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* CASE 2: Round is Ongoing */}
                          {round.status === "ongoing" && (
                            <div className="space-y-2.5">
                              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-emerald-900">Thời gian còn lại:</span>
                                  <strong className="font-mono text-emerald-700 text-sm font-black">
                                    {round.timeRemaining || "02:45:18"}
                                  </strong>
                                </div>
                                <p className="text-[11px] text-emerald-800 mt-1.5 leading-relaxed">
                                  {round.myResult?.statusNote || "Phòng thi đang mở trực tuyến. Đề thi gồm 4 bài toán."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* CASE 3: Round is Upcoming */}
                          {round.status === "upcoming" && (
                            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                              <p className="font-bold mb-1">⏳ Vòng thi sắp diễn ra</p>
                              <p className="text-[11px] text-amber-800 leading-relaxed">
                                {round.myResult?.statusNote || "Cổng đăng ký sẽ mở tự động khi kết quả vòng trước được công bố."}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 pt-3 border-t border-sky-100 flex flex-wrap items-center gap-2">
                          {round.status === "ongoing" && (
                            <button
                              onClick={() => {
                                onOpenCodeWorkspace?.({
                                  title: `${selectedContest.title} — ${round.title}`,
                                  id: round.id
                                });
                              }}
                              className="w-full min-h-11 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                            >
                              <Play className="w-4 h-4 fill-white" />
                              <span>VÀO PHÒNG THI NGAY (LÀM BÀI TRỰC TUYẾN)</span>
                            </button>
                          )}

                          {round.status === "completed" && (
                            <div className="grid grid-cols-2 gap-2 w-full">
                              <button
                                onClick={() => {
                                  setSelectedRoundForLeaderboard(round.roundNumber);
                                  setDetailTab("leaderboard");
                                }}
                                className="min-h-10 px-3 py-2 rounded-xl bg-white hover:bg-sky-50 text-[#0066CC] border border-sky-200 text-xs font-bold transition-all text-center"
                              >
                                Xem BXH vòng này
                              </button>
                              <button
                                onClick={() => {
                                  onOpenCodeWorkspace?.({
                                    title: `Xem lại bài thi: ${round.title}`,
                                    id: round.id
                                  });
                                }}
                                className="min-h-10 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all text-center"
                              >
                                Xem lại bài làm & Test
                              </button>
                            </div>
                          )}

                          {round.status === "upcoming" && (
                            <button
                              onClick={() => setRegistrationModalRound(round)}
                              className="w-full min-h-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:brightness-105 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                            >
                              <Sparkles className="w-4 h-4 text-amber-300" />
                              <span>{round.myResult?.isRegistered ? "Đã đăng ký (Xem SBD)" : "Đăng ký dự thi vòng này"}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MY RESULTS & PORTFOLIO (KẾT QUẢ & THÀNH TÍCH CỦA TÔI) */}
          {detailTab === "my_results" && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-sky-100">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-[#0B3C78] flex items-center gap-2">
                      <Medal className="w-5 h-5 text-amber-500" />
                      Bảng tổng hợp kết quả của thí sinh
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Lịch sử nộp bài, điểm số các vòng thi và giấy chứng nhận điện tử của bạn.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800">
                      SBD: {selectedContest.myOverallStatus?.candidateId || "SBD-OLY-0842"}
                    </span>
                  </div>
                </div>

                {/* Score breakdown across rounds */}
                <div className="mt-5 space-y-4">
                  {selectedContest.rounds.map((round) => (
                    <div
                      key={round.id}
                      className="p-4 rounded-2xl border border-sky-100 bg-[#F9FBFE] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-md">
                            {round.stageName}
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-800">{round.title}</h3>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {round.startDate} · {round.duration}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        {round.myResult?.participated ? (
                          <>
                            <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Điểm đạt được</p>
                              <p className="text-sm font-black text-emerald-700">
                                {round.myResult.score}/{round.myResult.maxScore} đ
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Xếp hạng vòng</p>
                              <p className="text-sm font-black text-blue-700">#{round.myResult.rank}</p>
                            </div>
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${round.myResult.verdictStyle}`}>
                              {round.myResult.verdict}
                            </span>
                          </>
                        ) : round.status === "ongoing" ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                            Đang mở thi · Sẵn sàng vào thi
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Chưa diễn ra</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certificate Download Banner */}
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 shadow-md font-black">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-amber-950">
                        Chứng nhận Điện tử & Vinh danh Ôn Thi 360
                      </h4>
                      <p className="text-[11px] text-amber-900 mt-0.5">
                        Chứng nhận đã hoàn thành xuất sắc Vòng Sơ loại Kỳ thi Olympic Tin học 2026.
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-black shadow-sm transition-all cursor-pointer whitespace-nowrap">
                    Tải chứng nhận PDF (Bản đẹp)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADERBOARD (BẢNG XẾP HẠNG GIẢI ĐẤU) */}
          {detailTab === "leaderboard" && (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-sky-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-[#0B3C78] flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Bảng xếp hạng Trực tiếp & Điểm số chi tiết
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hệ thống tính điểm chuẩn ACM/ICPC theo tổng điểm và thời gian nộp (Penalty time).
                  </p>
                </div>

                {/* Switch round leaderboard */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {selectedContest.rounds.map((round) => (
                    <button
                      key={round.id}
                      onClick={() => setSelectedRoundForLeaderboard(round.roundNumber)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedRoundForLeaderboard === round.roundNumber
                          ? "bg-white text-blue-700 shadow-2xs font-black"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {round.stageName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase">
                      <th className="py-3 px-3 font-bold">Hạng</th>
                      <th className="py-3 px-3 font-bold">Thí sinh & Trường</th>
                      <th className="py-3 px-3 font-bold text-center">Bài 1</th>
                      <th className="py-3 px-3 font-bold text-center">Bài 2</th>
                      <th className="py-3 px-3 font-bold text-center">Bài 3</th>
                      <th className="py-3 px-3 font-bold text-right">Tổng điểm</th>
                      <th className="py-3 px-3 font-bold text-right">Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedContest.roundLeaderboard && selectedContest.roundLeaderboard.length > 0 ? (
                      selectedContest.roundLeaderboard.map((row) => (
                        <tr
                          key={row.rank}
                          className={`transition-colors ${
                            row.isMe
                              ? "bg-amber-50/80 font-bold text-amber-950 hover:bg-amber-100/80"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="py-3 px-3">
                            {row.rank === 1 ? (
                              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-black inline-flex items-center justify-center text-[11px]">
                                1
                              </span>
                            ) : row.rank === 2 ? (
                              <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black inline-flex items-center justify-center text-[11px]">
                                2
                              </span>
                            ) : row.rank === 3 ? (
                              <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black inline-flex items-center justify-center text-[11px]">
                                3
                              </span>
                            ) : (
                              <span className="text-slate-600 font-bold px-1.5">#{row.rank}</span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800">{row.name}</span>
                              {row.isMe && (
                                <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-600 text-white font-black">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 block">{row.school}</span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 font-bold font-mono">
                              {row.p1}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 font-bold font-mono">
                              {row.p2}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-bold font-mono">
                              {row.p3}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <strong className="text-sm text-blue-700 font-black">{row.total}</strong>
                          </td>
                          <td className="py-3 px-3 text-right text-slate-500 font-mono">{row.penalty}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-400">
                          Bảng xếp hạng vòng này đang được tổng hợp hoặc chưa diễn ra.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RULES & PRIZES (THỂ LỆ & GIẢI THƯỞNG) */}
          {detailTab === "rules" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Rules Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
                <h3 className="text-base font-black text-[#0B3C78] flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Quy chế & Thể lệ thi đấu chính thức
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  {selectedContest.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {rIdx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prizes Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)]">
                <h3 className="text-base font-black text-amber-900 flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Cơ cấu Giải thưởng mùa giải
                </h3>
                <div className="space-y-2.5">
                  {selectedContest.prizes.map((prize, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs"
                    >
                      <span className="font-bold text-amber-950">{prize.rank}</span>
                      <strong className="text-amber-800 font-black">{prize.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* MODE 2: GRAND CONTESTS LIST OVERVIEW (Danh sách các Cuộc thi lớn)         */
        /* ========================================================================= */
        <>
          {/* 1. HERO BANNER */}
          <div className="relative rounded-3xl overflow-hidden border border-sky-200 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#004085] via-[#0066CC] to-[#0284C7] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src="/assets/page-contests-hero.jpg"
              alt="Contests banner"
              className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-30 mix-blend-luminosity"
            />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-amber-950 mb-3 shadow-sm">
                <Trophy className="w-3.5 h-3.5" />
                <span>Đấu trường Tranh tài Thuật toán & Mùa giải 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Đại hội Lập trình & Các Kỳ thi Thuật toán 360
              </h1>

              <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
                Mỗi cuộc thi được tổ chức theo cấu trúc nhiều vòng (Sơ loại → Bán kết → Chung kết). Thí sinh có thể theo dõi tiến trình các vòng, lịch sử kết quả của mình và tham gia phòng thi trực tuyến.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-bold">
                  <Timer className="w-4 h-4 text-amber-300" />
                  <span>Chấm điểm tự động ACM/ICPC · Đấu trường đa chặng</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 w-full md:w-72 shadow-xl text-center">
              <p className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">Kỳ thi đang diễn ra hôm nay</p>
              <div className="mt-2 p-3 bg-amber-400/20 border border-amber-300/40 rounded-2xl">
                <span className="text-[11px] font-bold text-amber-300">Olympic 2026 — Vòng 2 Bán kết</span>
                <p className="text-lg font-mono font-black text-white mt-1">Còn lại: 02 : 45 : 18</p>
              </div>
            </div>
          </div>

          {/* 2. FILTER TABS */}
          <div className="bg-white rounded-2xl p-3 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "Tất cả cuộc thi & mùa giải" },
                { id: "ongoing", label: "Đang diễn ra các vòng 🔥" },
                { id: "upcoming", label: "Sắp mở đăng ký" },
                { id: "surveys", label: "Khảo sát năng lực" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`min-h-10 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === t.id
                      ? "bg-[#0066CC] text-white shadow-2xs"
                      : "text-slate-600 hover:bg-sky-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. GRAND CONTEST CARDS (CARDS SHOWING MULTI-ROUND PROGRESS) */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {filteredContests.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-sky-100 shadow-[0_4px_16px_rgba(0,100,220,0.06)] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-sky-300 transition-all duration-300 group"
              >
                <div>
                  {/* Banner & Badges */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={c.bannerImage}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0050A0] border border-sky-200 shadow-2xs backdrop-blur-xs">
                      {c.tag}
                    </span>
                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs backdrop-blur-xs ${c.statusStyle}`}>
                      {c.statusLabel}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-sky-200 font-bold">{c.editionLabel}</span>
                      <h3 className="text-sm font-black text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3.5">
                    {/* Stepper overview of rounds */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2">
                        <span>Lộ trình các vòng ({c.rounds.length} vòng):</span>
                        <span className="text-[#0066CC]">
                          {c.rounds.filter((r) => r.status === "completed").length}/{c.rounds.length} Đã xong
                        </span>
                      </div>

                      {/* Mini Round pills */}
                      <div className="space-y-1.5">
                        {c.rounds.map((round) => (
                          <div
                            key={round.id}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] border ${
                              round.status === "ongoing"
                                ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold"
                                : round.status === "completed"
                                ? "bg-white border-slate-200 text-slate-600"
                                : "bg-slate-100/70 border-slate-200 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {round.status === "completed" ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : round.status === "ongoing" ? (
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-slate-300" />
                              )}
                              <span className="font-semibold truncate max-w-[170px]">{round.title}</span>
                            </div>
                            <span className="text-[10px] font-bold shrink-0">{round.statusLabel}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* My Participation snippet */}
                    {c.myOverallStatus && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                          <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                          <span>Kết quả của bạn:</span>
                        </div>
                        <span className="font-bold text-amber-950">
                          {c.myOverallStatus.totalScore} đ ({c.myOverallStatus.overallRank})
                        </span>
                      </div>
                    )}

                    {/* Prize & info */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-sky-50 p-2 rounded-xl border border-sky-100">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="truncate">{c.totalPrize}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      setSelectedContest(c);
                      setDetailTab("rounds");
                    }}
                    className="w-full min-h-10 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-[#0050A0] hover:brightness-110 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <span>Xem Chi tiết Cuộc thi & Các Vòng thi</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* REGISTRATION MODAL POPUP */}
      {registrationModalRound && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sky-100 animate-scaleUp">
            <div className="flex items-center gap-2.5 text-[#0066CC] mb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-black text-slate-800">Đăng ký tham gia Kỳ thi</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Xác nhận ghi danh dự thi: <strong>{registrationModalRound.title}</strong>. Hệ thống sẽ tự động cấp Số Báo Danh và đồng bộ hồ sơ thí sinh.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Thời gian thi:</span>
                <strong>{registrationModalRound.startDate}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Thời lượng:</span>
                <strong>{registrationModalRound.duration}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lệ phí:</span>
                <strong className="text-emerald-600 font-bold">Miễn phí cho học viên</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRegistrationModalRound(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleRegisterRound(selectedContest?.id, registrationModalRound)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md transition-all cursor-pointer"
              >
                Xác nhận Đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
