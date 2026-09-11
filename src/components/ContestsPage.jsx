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
 Timer
} from "lucide-react";

function ContestPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Phân trang danh sách cuộc thi"
      className="mt-1 flex flex-col items-center justify-between gap-2 rounded-2xl border border-sky-100 bg-white p-2.5 shadow-[0_2px_10px_rgba(0,100,220,0.04)] sm:flex-row"
    >
      <span className="text-[11px] text-slate-400">
        Trang <strong className="text-slate-600">{page}</strong> / {totalPages}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Trang trước"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 text-sky-700 transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-label={`Trang ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
            onClick={() => onChange(pageNumber)}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-[11px] font-bold transition-colors ${
              pageNumber === page
                ? "bg-[#0066CC] text-white shadow-sm"
                : "text-slate-600 hover:bg-sky-50"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          aria-label="Trang sau"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 text-sky-700 transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}

export default function ContestsPage({ onOpenCodeWorkspace }) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestPage, setContestPage] = useState(1);

  const contests = [
    {
      id: "CONTEST_WINTER_2026",
      title: "Kỳ thi HSG Tin học cấp tỉnh mở rộng năm học 2025–2026",
      type: "contest",
      status: "ongoing",
      statusLabel: "Đang diễn ra 🔥",
      statusStyle: "bg-emerald-100 text-emerald-800 border-emerald-300",
      startTime: "10/09/2026 08:00",
      endTime: "10/09/2026 12:00",
      duration: "240 phút",
      problemsCount: 4,
      registeredCount: "2,850 thí sinh",
      prize: "Huy chương Vàng + Học bổng 10.000.000đ",
      image: "/assets/contest-img-1.png",
      tag: "🏆 Đấu trường cấp Tỉnh",
      editionLabel: "Mùa giải 2025–2026",
      roundLabel: "Vòng 1 · Bảng cấp tỉnh",
      timeRemaining: "02:45:18"
    },
    {
      id: "CONTEST_PRO_3",
      title: "Cuộc thi Lập trình Online Ôn Thi 360 lần thứ 3",
      type: "contest",
      status: "upcoming",
      statusLabel: "Sắp diễn ra",
      statusStyle: "bg-amber-100 text-amber-800 border-amber-300",
      startTime: "20/10/2026 19:30",
      endTime: "20/10/2026 21:30",
      duration: "120 phút",
      problemsCount: 3,
      registeredCount: "1,420 thí sinh",
      prize: "Cúp Vô địch + Quà tặng công nghệ",
      image: "/assets/contest-img-2.png",
      tag: "⚡ Mini-Contest",
      editionLabel: "Mùa giải 2026",
      roundLabel: "Lần thi thứ 3"
    },
    {
      id: "SURVEY_SKILL_1",
      title: "Khảo sát năng lực Thuật toán & Tư duy lập trình THCS",
      type: "survey",
      status: "ongoing",
      statusLabel: "Đang mở khảo sát",
      statusStyle: "bg-sky-100 text-sky-800 border-sky-300",
      startTime: "01/11/2026",
      endTime: "15/11/2026",
      duration: "Không giới hạn",
      problemsCount: 20,
      registeredCount: "3,800 lượt tham gia",
      prize: "Chứng nhận đánh giá năng lực Ôn Thi 360",
      image: "/assets/contest-img-3.png",
      tag: "📊 Khảo sát phi thi đua",
      editionLabel: "Đợt khảo sát 01 · 2026",
      roundLabel: "Khảo sát đầu vào"
    },
    {
      id: "CONTEST_WAITING_2",
      title: "Kỳ thi thử Chuyên đề Đồ thị tháng 9",
      type: "contest",
      status: "waiting",
      statusLabel: "Chờ công bố kết quả",
      statusStyle: "bg-violet-100 text-violet-800 border-violet-300",
      startTime: "08/09/2026 14:00",
      endTime: "08/09/2026 17:00",
      duration: "180 phút",
      problemsCount: 3,
      registeredCount: "620 thí sinh",
      prize: "Chứng nhận hoàn thành",
      image: "/assets/generated-practice-hero-v1.png",
      tag: "⏳ Đang đối soát điểm",
      editionLabel: "Mùa giải 2026",
      roundLabel: "Vòng chuyên đề · Tháng 9"
    },
    {
      id: "CONTEST_PUBLISHED_1",
      title: "Mini Contest Cấu trúc dữ liệu tháng 8",
      type: "contest",
      status: "published",
      statusLabel: "Đã công bố",
      statusStyle: "bg-blue-100 text-blue-800 border-blue-300",
      startTime: "28/08/2026 19:30",
      endTime: "28/08/2026 21:30",
      duration: "120 phút",
      problemsCount: 3,
      registeredCount: "1,008 thí sinh",
      prize: "Huy hiệu Top 100",
      image: "/assets/generated-leaderboard-hero-v1.png",
      tag: "✓ Kết quả chính thức",
      editionLabel: "Mùa giải 2026",
      roundLabel: "Lần thi thứ 1 · Tháng 8"
    }
  ];
  const filteredContests = contests.filter((contest) => activeTab === "all" || (activeTab === "surveys" ? contest.type === "survey" : contest.status === activeTab));
  const contestPageSize = 3;
  const contestTotalPages = Math.max(1, Math.ceil(filteredContests.length / contestPageSize));
  const visibleContests = filteredContests.slice((contestPage - 1) * contestPageSize, contestPage * contestPageSize);

  useEffect(() => {
    setContestPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (contestPage > contestTotalPages) setContestPage(contestTotalPages);
  }, [contestPage, contestTotalPages]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* 1. CONTESTS HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0050A0] via-[#0066CC] to-[#0284C7] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-contests-hero-v1.png"
          alt="Contests banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            <span>Đấu trường Đỉnh cao & Khảo sát năng lực</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white leading-tight">
            Cuộc thi Lập trình & Đấu trường 360
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Nơi hàng nghìn tài năng trẻ tranh tài thuật toán, cọ xát với các đề thi chuẩn quốc gia và nhận học bổng giá trị. Bảng xếp hạng trực tiếp theo thời gian thực (Live Scoreboard).
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-bold">
              <Timer className="w-4 h-4 text-amber-300" />
              <span>Chống gian lận & Chấm điểm chuẩn ACM/ICPC</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full md:w-72 shadow-xl text-center">
          <p className="text-xs font-bold text-sky-200 uppercase tracking-wider">Cuộc thi đang mở</p>
          <div className="mt-2 p-3 bg-amber-400/20 border border-amber-300/40 rounded-2xl">
            <span className="text-xs font-bold text-amber-300">Thời gian còn lại:</span>
            <p className="text-xl font-mono font-black text-white mt-0.5">02 : 45 : 18</p>
          </div>
        </div>
      </div>

      {/* 2. TABS */}
      <div className="bg-white rounded-2xl p-3 border border-sky-100 shadow-[0_2px_10px_rgba(0,100,220,0.04)] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "Tất cả sự kiện" },
            { id: "ongoing", label: "Đang diễn ra 🔥" },
            { id: "upcoming", label: "Sắp diễn ra" },
            { id: "surveys", label: "Khảo sát năng lực" }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
              className={`min-h-10 px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
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

      {/* 3. CONTESTS CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleContests.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-sky-100 shadow-[0_2px_12px_rgba(0,100,220,0.06)] overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-sky-200 transition-all duration-300 group"
          >
            <div>
              <div className="relative h-36 overflow-hidden bg-slate-100">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#0050A0] border border-sky-200 shadow-2xs backdrop-blur-xs">
                  {c.tag}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-2xs backdrop-blur-xs ${c.statusStyle}`}>
                  {c.statusLabel}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-[#0B3C78] leading-5 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {c.title}
                </h3>

                <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <span className="rounded-lg border border-sky-100 bg-sky-50 px-2 py-1">{c.editionLabel}</span>
                  <span className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1">{c.roundLabel}</span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-600 mb-3 bg-[#F8FBFE] p-2.5 rounded-xl border border-sky-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Bắt đầu: <strong>{c.startTime}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Thời lượng: <strong>{c.duration}</strong> ({c.problemsCount} bài toán)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Đăng ký: <strong>{c.registeredCount}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{c.prize}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-sky-100 flex items-center justify-between">
                <button onClick={() => setSelectedContest(c)} className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer">Thể lệ & Bảng điểm →</button>
                <button
                  onClick={() => {
                    if (onOpenCodeWorkspace) {
                      onOpenCodeWorkspace({ title: c.title, id: c.id });
                    }
                  }}
                  className={`min-h-10 px-3 py-2 rounded-xl text-[11px] font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-98 ${
                    c.status === "ongoing"
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-105 text-white"
                      : "bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-105 text-white"
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{c.status === "ongoing" ? "Vào phòng thi ngay" : c.status === "waiting" ? "Xem trạng thái" : c.status === "published" ? "Xem kết quả" : "Đăng ký dự thi"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ContestPagination page={contestPage} totalPages={contestTotalPages} onChange={setContestPage} />

      {filteredContests.length === 0 && <div className="rounded-3xl border border-dashed border-sky-200 bg-white p-10 text-center"><Trophy className="mx-auto w-9 h-9 text-sky-300"/><h2 className="mt-3 text-sm font-black text-slate-800">Chưa có sự kiện ở trạng thái này</h2><p className="mt-1 text-xs text-slate-500">Hãy quay lại sau hoặc xem tất cả sự kiện đang công bố.</p><button onClick={() => setActiveTab("all")} className="mt-4 text-xs font-bold text-blue-600">Xem tất cả</button></div>}

      {selectedContest && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 sm:p-6"><section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"><header className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-sky-500 p-5 text-white"><img src={selectedContest.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25"/><div className="relative"><button onClick={() => setSelectedContest(null)} className="absolute right-0 top-0 rounded-xl bg-white/15 px-2 py-1 text-xs font-bold">Đóng</button><span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold">{selectedContest.statusLabel}</span><h2 className="mt-3 max-w-xl text-lg font-black">{selectedContest.title}</h2><p className="mt-1 text-xs text-sky-100">{selectedContest.editionLabel} · {selectedContest.roundLabel} · {selectedContest.startTime} · {selectedContest.duration} · {selectedContest.problemsCount} bài</p></div></header><div className="grid gap-4 p-5 md:grid-cols-[1.25fr_.9fr]"><div><h3 className="text-sm font-black text-slate-800">Thể lệ & chấm điểm</h3><ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600"><li>• Mỗi tài khoản chỉ có một lượt thi chính thức; lịch sử submit được lưu.</li><li>• Điểm tính theo testcase, penalty và thời gian nộp theo quy chế công bố.</li><li>• Không công bố lời giải khi cuộc thi chưa kết thúc; ranking có thể bị ẩn danh.</li><li>• Hệ thống ghi nhận sự cố runner và cho phép gửi yêu cầu hỗ trợ.</li></ul><h3 className="mt-5 text-sm font-black text-slate-800">Trạng thái công bố</h3><div className="mt-2 rounded-2xl bg-sky-50 p-3 text-[11px] text-slate-600">{selectedContest.status === "upcoming" ? "Đang mở đăng ký. Countdown sẽ hiện khi vào ngày thi." : "Bảng điểm tạm thời hiển thị trong kỳ thi; kết quả chính thức chờ ban tổ chức công bố."}</div></div><aside className="rounded-2xl border border-sky-100 bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase text-slate-400">Thông tin dự thi</p><p className="mt-2 text-xs font-bold text-slate-800">{selectedContest.registeredCount}</p><p className="mt-1 text-[11px] text-slate-500">đã đăng ký · giải thưởng: {selectedContest.prize}</p><button onClick={() => { setSelectedContest(null); onOpenCodeWorkspace?.({ title: selectedContest.title, id: selectedContest.id }); }} className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white">{selectedContest.status === "ongoing" ? "Vào phòng thi" : "Đăng ký dự thi"}</button></aside></div></section></div>}
    </div>
  );
}
