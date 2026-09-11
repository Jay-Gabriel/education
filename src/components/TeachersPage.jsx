import React, { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, CheckCircle2, GraduationCap, Sparkles } from "lucide-react";

function TeachersPagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Phân trang danh sách giáo viên và chuyên gia" className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-sky-100 bg-white p-2.5 shadow-[0_2px_10px_rgba(0,100,220,0.04)] sm:flex-row">
      <span className="text-[11px] text-slate-400">Trang <strong className="text-slate-600">{page}</strong> / {totalPages}</span>
      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Trang trước" disabled={page === 1} onClick={() => onChange(page - 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 text-sky-700 transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" aria-label={"Trang " + pageNumber} aria-current={pageNumber === page ? "page" : undefined} onClick={() => onChange(pageNumber)} className={"inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-[11px] font-bold transition-colors " + (pageNumber === page ? "bg-[#0066CC] text-white shadow-sm" : "text-slate-600 hover:bg-sky-50")}>{pageNumber}</button>)}
        <button type="button" aria-label="Trang sau" disabled={page === totalPages} onClick={() => onChange(page + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-100 text-sky-700 transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-35"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </nav>
  );
}

export default function TeachersPage({ onNavigateCourses }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherPage, setTeacherPage] = useState(1);
  const teachers = [
    {
      id: "thanh",
      name: "Thầy Nguyễn Tiến Thành",
      title: "Chuyên gia Thuật toán & Giáo viên Chuyên Tin",
      school: "Trường THPT Chuyên Thái Bình",
      avatar: "/assets/teacher-thanh.png",
      bio: "Hơn 12 năm kinh nghiệm bồi dưỡng đội tuyển HSG Quốc gia môn Tin học. Đào tạo hơn 30+ giải Nhất, Nhì Quốc gia và nhiều thủ khoa Chuyên Tin.",
      achievements: ["15+ Học sinh đạt Giải Nhất Quốc gia", "Tác giả bộ sách Cấu trúc dữ liệu và Giải thuật", "Cố vấn đề thi Olympic Tin học"],
      rating: 5.0,
      studentsCount: "4,500+",
      coursesCount: 6
    },
    {
      id: "khoa",
      name: "GS. Trần Đăng Khoa",
      title: "Cố vấn Học thuật & Huấn luyện viên ICPC",
      school: "Khoa CNTT - ĐHQG Hà Nội",
      avatar: "/assets/testi-av-3.png?v=3",
      bio: "Nguyên thành viên đội tuyển Olympic Tin học Quốc tế (IOI). Cố vấn trưởng chương trình đào tạo thuật toán chuẩn quốc tế USACO và AP Computer Science.",
      achievements: ["Huy chương Bạc IOI Quốc tế", "Huấn luyện đội tuyển ICPC World Finals", "Chuyên gia Viện Nghiên cứu Cao cấp"],
      rating: 5.0,
      studentsCount: "2,800+",
      coursesCount: 4
    },
    {
      id: "duc",
      name: "Thầy Lê Minh Đức",
      title: "Giáo viên Tin học & Chuyên gia Luyện thi 10 Chuyên",
      school: "Trường THPT Chuyên Sư Phạm Hà Nội",
      avatar: "/assets/testi-av-2.png?v=3",
      bio: "Chuyên gia luyện thi vào 10 Chuyên Tin học top đầu. Phương pháp giảng dạy trực quan, dễ hiểu, giúp học sinh nắm vững bản chất thuật toán.",
      achievements: ["Đào tạo 100+ học sinh đỗ Chuyên KHTN & CSP", "Tác giả Tuyển tập 500 đề thi Chuyên Tin", "Giáo viên Giỏi cấp Thành phố"],
      rating: 4.9,
      studentsCount: "3,600+",
      coursesCount: 5
    },
    {
      id: "lan",
      name: "Cô Nguyễn Thu Lan",
      title: "Giáo viên Tin học & Chuyên gia Thuật toán THCS",
      school: "Trường THCS Cầu Giấy",
      avatar: "/assets/user-avatar.png",
      bio: "Tập trung xây nền tư duy thuật toán và kỹ năng giải quyết vấn đề cho học sinh THCS bằng các bài học trực quan, nhiều ví dụ thực tế.",
      achievements: ["8 năm đào tạo học sinh giỏi cấp Thành phố", "Biên soạn lộ trình thuật toán THCS", "Cố vấn câu lạc bộ lập trình học sinh"],
      rating: 4.9,
      studentsCount: "2,100+",
      coursesCount: 4
    },
    {
      id: "son",
      name: "Thầy Phạm Hải Sơn",
      title: "Huấn luyện viên Lập trình thi đấu & ICPC",
      school: "Đại học Bách khoa Hà Nội",
      avatar: "/assets/rank-avatar-4.png",
      bio: "Huấn luyện chuyên sâu về kỹ thuật thi đấu, tối ưu chương trình và tư duy phân tích đề cho học sinh có mục tiêu chinh phục các kỳ thi lớn.",
      achievements: ["Huấn luyện đội tuyển đạt giải Quốc gia", "Mentor cộng đồng lập trình trẻ", "Chuyên gia tối ưu thuật toán"],
      rating: 4.8,
      studentsCount: "1,750+",
      coursesCount: 3
    }
  ];
  const teacherPageSize = 3;
  const teacherTotalPages = Math.ceil(teachers.length / teacherPageSize);
  const visibleTeachers = teachers.slice((teacherPage - 1) * teacherPageSize, teacherPage * teacherPageSize);

  useEffect(() => {
    if (teacherPage > teacherTotalPages) setTeacherPage(teacherTotalPages);
  }, [teacherPage, teacherTotalPages]);

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-200/90 bg-gradient-to-r from-[#0050A0] via-[#0066CC] to-[#0284C7] p-5 text-white shadow-[0_8px_24px_rgba(0,100,220,0.08)] sm:p-6">
        <img
          src="/assets/generated-teachers-hero-v1.png"
          alt="Teachers banner"
          className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none opacity-35 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold text-amber-950 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Đội ngũ Giảng viên & Chuyên gia Tiêu biểu</span>
          </div>

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
            Giáo viên & Chuyên gia Hàng đầu
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-sky-100 sm:text-sm">
            Quy tụ các nhà giáo ưu tú, huấn luyện viên Olympic Tin học và tác giả của những bộ sách chuyên khảo uy tín nhất Việt Nam.
          </p>
        </div>
      </div>

      {/* 2. TEACHER CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleTeachers.map((t) => (
          <div key={t.id} className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_2px_12px_rgba(0,100,220,0.06)] transition-all hover:border-sky-200 hover:shadow-lg">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <img src={t.avatar} alt={"Avatar của " + t.name} className="h-14 w-14 rounded-xl border-2 border-sky-200 object-cover shadow-sm" />
                <div>
                  <h3 className="text-sm font-bold leading-5 text-[#0B3C78] transition-colors group-hover:text-blue-600">{t.name}</h3>
                  <p className="text-[11px] font-medium leading-4 text-blue-600">{t.title}</p>
                  <p className="text-[11px] text-slate-400">{t.school}</p>
                </div>
              </div>

              <p className="mb-3 text-xs leading-relaxed text-slate-600">{t.bio}</p>

              <div className="mb-3 space-y-1.5 rounded-xl border border-sky-100 bg-[#F8FBFE] p-2.5 text-xs text-slate-700">
                <p className="text-[11px] font-bold text-[#0066CC]">Thành tích tiêu biểu:</p>
                {t.achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] leading-4">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTeacher(t)}
              className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#126F91] px-3 py-2 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-[#0F5F7A]"
            >
              <span>Xem hồ sơ & lớp phụ trách</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <TeachersPagination page={teacherPage} totalPages={teacherTotalPages} onChange={setTeacherPage} />

      {selectedTeacher && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 sm:p-6"><section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"><header className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-sky-500 p-6 text-white"><img src="/assets/generated-teachers-hero-v1.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25"/><button onClick={() => setSelectedTeacher(null)} className="absolute right-5 top-5 rounded-xl bg-white/15 px-2 py-1 text-xs font-bold">Đóng</button><div className="relative flex items-center gap-4"><img src={selectedTeacher.avatar} alt="" className="h-18 w-18 rounded-2xl border-4 border-white/70 object-cover"/><div><p className="text-xs font-bold text-sky-100">Hồ sơ giảng viên đã xác thực</p><h2 className="mt-1 text-xl font-black">{selectedTeacher.name}</h2><p className="mt-1 text-xs text-sky-100">{selectedTeacher.title} · {selectedTeacher.school}</p></div></div></header><div className="grid gap-5 p-5 md:grid-cols-[1.2fr_.8fr]"><div><h3 className="text-sm font-black text-slate-800">Giới thiệu</h3><p className="mt-2 text-xs leading-relaxed text-slate-600">{selectedTeacher.bio}</p><h3 className="mt-5 text-sm font-black text-slate-800">Lớp đang phụ trách</h3><div className="mt-2 space-y-2">{["Lớp HSG Tin 10A1", "Chuyên đề Cấu trúc dữ liệu", "Luyện thi đội tuyển trẻ"].map((name, index) => <div key={name} className="flex items-center justify-between rounded-xl border border-slate-100 p-3"><span><span className="block text-xs font-bold text-slate-800">{name}</span><span className="text-[10px] text-slate-500">{index + 18} học viên · đang mở</span></span><ChevronRight className="h-4 w-4 text-blue-500"/></div>)}</div></div><aside className="rounded-2xl border border-sky-100 bg-sky-50 p-4"><p className="text-3xl font-black text-blue-700">{selectedTeacher.rating}</p><p className="text-xs font-bold text-slate-700">★ Đánh giá trung bình đã xác thực</p><div className="mt-4 space-y-2 text-[11px] text-slate-600"><p><b>{selectedTeacher.studentsCount}</b> học viên từng học</p><p><b>{selectedTeacher.coursesCount}</b> lớp/chương trình công khai</p><p className="border-t border-sky-100 pt-3">Review hiển thị sau kiểm duyệt; không công khai danh tính học sinh.</p></div><button onClick={() => { setSelectedTeacher(null); onNavigateCourses?.("Khóa học"); }} className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white">Xem lớp phụ trách</button></aside></div></section></div>}
    </div>
  );
}
