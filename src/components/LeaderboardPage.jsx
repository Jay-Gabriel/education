import React, { useMemo, useState } from "react";
import { Award, BarChart3, CalendarDays, CheckCircle2, Flame, Medal, Search, School, Sparkles, Target, Trophy, Users } from "lucide-react";

const scopes = [["all-time", "Toàn thời gian"], ["month", "Tháng này"], ["contest", "Cuộc thi gần nhất"], ["class", "Lớp của tôi"]];
const leaders = [
  { rank: 1, name: "Nguyễn Minh Anh", school: "THPT Chuyên KHTN", score: 9850, ac: 142, streak: 28, avatar: "/assets/testi-av-1.png?v=3", badge: "Grandmaster" },
  { rank: 2, name: "Trần Đức Duy", school: "THPT Chuyên Sư Phạm", score: 9620, ac: 138, streak: 24, avatar: "/assets/testi-av-2.png?v=3", badge: "Master" },
  { rank: 3, name: "Lê Phương Thảo", school: "THPT Chuyên Amsterdam", score: 9480, ac: 131, streak: 19, avatar: "/assets/testi-av-3.png?v=3", badge: "Master" }
];
const entries = [
  { rank: 4, name: "Phạm Hoàng Nam", school: "THPT Chuyên Thái Bình", score: 9320, ac: 125, streak: 15, avatar: "/assets/rank-avatar-1.png" },
  { rank: 5, name: "Vũ Thị Mai", school: "THPT Chuyên Lam Sơn", score: 9210, ac: 120, streak: 12, avatar: "/assets/rank-avatar-2.png" },
  { rank: 6, name: "Đỗ Quốc Bảo", school: "THPT Chuyên Lê Hồng Phong", score: 9050, ac: 118, streak: 10, avatar: "/assets/rank-avatar-3.png" },
  { rank: 7, name: "Hoàng Minh Tuấn", school: "THPT Chuyên Bắc Ninh", score: 8940, ac: 114, streak: 9, avatar: "/assets/rank-avatar-4.png" },
  { rank: 8, name: "Nguyễn Hà Linh", school: "THPT Chuyên Phan Bội Châu", score: 8820, ac: 109, streak: 7, avatar: "/assets/rank-avatar-5.png" }
];
const score = (value) => new Intl.NumberFormat("vi-VN").format(value);

function Avatar({ person, className }) {
  return <img src={person.avatar} alt={"Avatar của " + person.name} className={className + " shrink-0 rounded-full object-cover"} />;
}

function PodiumCard({ person, anonymous }) {
  const winner = person.rank === 1;
  const order = person.rank === 2 ? "order-2 md:order-1" : person.rank === 3 ? "order-3" : "order-1 md:order-2";
  const shell = winner
    ? "order-1 min-h-64 border-amber-300 bg-gradient-to-b from-amber-100 via-amber-50 to-white shadow-[0_12px_30px_rgba(245,158,11,0.18)] md:order-2"
    : "min-h-56 border-sky-100 bg-white text-[#0B3C78] shadow-[0_8px_24px_rgba(0,100,220,0.08)] " + order;
  const rankStyle = winner ? "bg-amber-400 text-amber-950" : person.rank === 2 ? "bg-slate-100 text-slate-700" : "bg-amber-100 text-amber-800";
  return (
    <article className={"relative flex flex-col items-center justify-end rounded-2xl border p-4 text-center transition-transform hover:-translate-y-1 " + shell}>
      <div className={"absolute -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-black shadow-sm " + rankStyle}>
        {winner ? <Trophy className="h-4 w-4" /> : person.rank}
      </div>
      <Avatar person={person} className={winner ? "h-20 w-20 border-4 border-amber-400 shadow-lg" : "h-16 w-16 border-4 border-white/20 shadow-md"} />
      <span className={"mt-2 rounded-md px-2 py-1 text-[10px] font-bold " + (winner ? "bg-amber-200 text-amber-900" : "bg-sky-50 text-sky-700")}>{person.badge}</span>
      <h3 className="mt-2 text-sm font-bold text-[#0B3C78]">{anonymous ? "Học viên đã xác thực" : person.name}</h3>
      <p className="mt-0.5 text-[11px] text-slate-500">{person.school}</p>
      <div className={"mt-3 flex items-center gap-2 text-xs font-black " + (winner ? "text-amber-800" : "text-sky-700")}><span>{score(person.score)} pts</span><span>•</span><span>{person.ac} AC</span></div>
      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500"><Flame className="h-3.5 w-3.5 text-orange-400" />Chuỗi {person.streak} ngày</div>
    </article>
  );
}

export default function LeaderboardPage() {
  const [scope, setScope] = useState("all-time");
  const [anonymous, setAnonymous] = useState(false);
  const [query, setQuery] = useState("");
  const currentScope = scopes.find(([id]) => id === scope)?.[1] || "Toàn thời gian";
  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized ? entries.filter((person) => (person.name + " " + person.school).toLowerCase().includes(normalized)) : entries;
  }, [query]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      <section className="relative overflow-hidden rounded-2xl border border-sky-200/90 bg-gradient-to-r from-[#0B4F86] via-[#166A9B] to-[#2B93BA] p-5 text-white shadow-[0_8px_24px_rgba(0,100,220,0.08)] sm:p-6">
        <img src="/assets/generated-leaderboard-hero-v1.png" alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-25 mix-blend-overlay" />
        <div className="relative z-10 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold text-amber-950"><Sparkles className="h-3.5 w-3.5" />Vinh danh Top Coder toàn quốc</div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">Bảng xếp hạng & Đại sảnh Danh vọng</h1>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-sky-100 sm:text-sm">Xếp hạng được tính từ bài AC, điểm cuộc thi và chuỗi ngày rèn luyện. Mỗi nỗ lực đều có một vị trí xứng đáng.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold text-sky-100"><span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5"><Users className="h-3.5 w-3.5 text-sky-200" />12.480 học viên</span><span className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5"><CalendarDays className="h-3.5 w-3.5 text-amber-300" />Cập nhật mỗi ngày</span></div>
          </div>
          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-3.5 shadow-xl backdrop-blur-md lg:w-72">
            <div className="flex items-center gap-3"><Avatar person={leaders[0]} className="h-12 w-12 border-2 border-amber-300" /><div className="min-w-0 flex-1"><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-amber-300">Vị trí của bạn</p><p className="mt-0.5 text-lg font-black text-white">#1 <span className="text-xs font-medium text-sky-200">/ 12.480</span></p><p className="truncate text-[11px] text-sky-100">{anonymous ? "Học viên đã xác thực" : "Nguyễn Minh Anh"} · 9.850 pts</p></div><Medal className="h-6 w-6 text-amber-300" /></div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-sky-100 bg-white p-3 shadow-[0_2px_10px_rgba(0,100,220,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">{scopes.map(([id, label]) => <button key={id} type="button" aria-pressed={scope === id} onClick={() => setScope(id)} className={"min-h-10 rounded-lg px-3.5 py-1.5 text-[11px] font-bold transition-colors " + (scope === id ? "bg-[#0066CC] text-white shadow-sm" : "text-slate-600 hover:bg-sky-50")}>{label}</button>)}</div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm học sinh hoặc trường" aria-label="Tìm học sinh hoặc trường" className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 sm:w-56" /></label>
            <label className="flex min-h-10 items-center gap-2 text-[11px] font-bold text-slate-600"><input checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} type="checkbox" className="h-4 w-4 accent-blue-600" />Ẩn danh tên học sinh</label>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-slate-100 pt-3 text-[11px] text-slate-500"><span className="inline-flex items-center gap-1.5"><BarChart3 className="h-3.5 w-3.5 text-sky-600" />Đang xem: <strong className="text-slate-700">{currentScope}</strong></span><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />Điểm gồm AC, cuộc thi và chuỗi luyện tập</span></div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-4 shadow-[0_8px_24px_rgba(0,100,220,0.06)] sm:p-5">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700">Hall of Fame</p><h2 className="mt-1 text-lg font-bold text-[#0B3C78]">Ba vị trí dẫn đầu</h2></div><p className="text-[11px] text-slate-500">Tôn vinh thành tích nổi bật trong {currentScope.toLowerCase()}</p></div>
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">{leaders.map((person) => <PodiumCard key={person.rank} person={person} anonymous={anonymous} />)}</div>
      </section>

      {scope === "class" ? <section className="rounded-2xl border border-dashed border-sky-200 bg-white p-10 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600"><School className="h-6 w-6" /></div><h2 className="mt-3 text-sm font-bold text-slate-800">Chưa có bảng xếp hạng lớp</h2><p className="mt-1 text-xs text-slate-500">Giáo viên sẽ bật BXH khi lớp có đủ dữ liệu hoạt động.</p></section> : <section className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_4px_16px_rgba(0,100,220,0.05)]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-sky-700">Ranking</p><h2 className="mt-1 text-lg font-bold text-[#0B3C78]">Danh sách xếp hạng</h2></div><div className="hidden items-center gap-1.5 text-[11px] text-slate-400 sm:flex"><Target className="h-3.5 w-3.5 text-sky-500" />Top 100 được vinh danh</div></div>
        <div className="overflow-x-auto"><div className="min-w-[720px] divide-y divide-slate-100">
          <div className="grid grid-cols-[56px_minmax(250px,1fr)_190px_110px_100px] bg-[#F8FBFE] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 sm:px-5"><span>Hạng</span><span>Học sinh</span><span>Trường</span><span>Số bài AC</span><span className="text-right">Tổng điểm</span></div>
          {filteredEntries.map((person) => <div key={person.rank} className="grid min-h-16 grid-cols-[56px_minmax(250px,1fr)_190px_110px_100px] items-center px-4 py-2.5 text-xs transition-colors hover:bg-sky-50/60 sm:px-5"><span className="font-bold text-slate-500">#{person.rank}</span><div className="flex min-w-0 items-center gap-2.5"><Avatar person={person} className="h-9 w-9 border border-sky-100 bg-sky-50" /><div className="min-w-0"><p className="truncate font-bold text-slate-800">{anonymous ? "Học viên đã xác thực" : person.name}</p><p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400"><Flame className="h-3 w-3 text-orange-400" />{person.streak} ngày liên tục</p></div></div><span className="truncate pr-3 text-slate-600">{person.school}</span><span className="font-bold text-emerald-600">{person.ac} bài AC</span><span className="text-right font-black text-[#0B3C78]">{score(person.score)}</span></div>)}
          {filteredEntries.length === 0 && <div className="px-5 py-10 text-center text-xs text-slate-500">Không tìm thấy học sinh hoặc trường phù hợp.</div>}
        </div></div>
        <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3 text-[11px] text-slate-400 sm:px-5"><Award className="h-3.5 w-3.5 text-amber-500" />Dữ liệu được tổng hợp từ hoạt động học tập và các cuộc thi đã công bố.</div>
      </section>}
    </div>
  );
}
