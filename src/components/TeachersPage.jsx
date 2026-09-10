import React, { useState } from "react";
import { Users, Star, Award, BookOpen, GraduationCap, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

export default function TeachersPage({ onNavigateCourses }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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
    }
  ];

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-200/90 shadow-[0_10px_35px_rgba(0,100,220,0.08)] bg-gradient-to-r from-[#0050A0] via-[#0B3C78] to-[#0284C7] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src="/assets/generated-teachers-hero-v1.png"
          alt="Teachers banner"
          className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none opacity-45 mix-blend-overlay"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 mb-3 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Đội ngũ Giảng viên & Chuyên gia Tiêu biểu</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Giáo viên & Chuyên gia Hàng đầu
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 mt-2 leading-relaxed">
            Quy tụ các nhà giáo ưu tú, huấn luyện viên Olympic Tin học và tác giả của những bộ sách chuyên khảo uy tín nhất Việt Nam.
          </p>
        </div>
      </div>

      {/* 2. TEACHER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl border border-sky-100 shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-all group">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-200 shadow-sm" />
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B3C78] group-hover:text-blue-600 transition-colors">{t.name}</h3>
                  <p className="text-[11px] text-blue-600 font-medium">{t.title}</p>
                  <p className="text-[10px] text-slate-400">{t.school}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">{t.bio}</p>

              <div className="space-y-1.5 text-xs text-slate-700 bg-[#F8FBFE] p-3 rounded-2xl border border-sky-100 mb-3">
                <p className="font-bold text-[#0066CC] text-[11px]">Thành tích tiêu biểu:</p>
                {t.achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedTeacher(t)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Xem hồ sơ & lớp phụ trách</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {selectedTeacher && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-3 sm:p-6"><section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"><header className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-sky-500 p-6 text-white"><img src="/assets/generated-teachers-hero-v1.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25"/><button onClick={() => setSelectedTeacher(null)} className="absolute right-5 top-5 rounded-xl bg-white/15 px-2 py-1 text-xs font-bold">Đóng</button><div className="relative flex items-center gap-4"><img src={selectedTeacher.avatar} alt="" className="h-18 w-18 rounded-2xl border-4 border-white/70 object-cover"/><div><p className="text-xs font-bold text-sky-100">Hồ sơ giảng viên đã xác thực</p><h2 className="mt-1 text-xl font-black">{selectedTeacher.name}</h2><p className="mt-1 text-xs text-sky-100">{selectedTeacher.title} · {selectedTeacher.school}</p></div></div></header><div className="grid gap-5 p-5 md:grid-cols-[1.2fr_.8fr]"><div><h3 className="text-sm font-black text-slate-800">Giới thiệu</h3><p className="mt-2 text-xs leading-relaxed text-slate-600">{selectedTeacher.bio}</p><h3 className="mt-5 text-sm font-black text-slate-800">Lớp đang phụ trách</h3><div className="mt-2 space-y-2">{["Lớp HSG Tin 10A1", "Chuyên đề Cấu trúc dữ liệu", "Luyện thi đội tuyển trẻ"].map((name, index) => <div key={name} className="flex items-center justify-between rounded-xl border border-slate-100 p-3"><span><span className="block text-xs font-bold text-slate-800">{name}</span><span className="text-[10px] text-slate-500">{index + 18} học viên · đang mở</span></span><ChevronRight className="h-4 w-4 text-blue-500"/></div>)}</div></div><aside className="rounded-2xl border border-sky-100 bg-sky-50 p-4"><p className="text-3xl font-black text-blue-700">{selectedTeacher.rating}</p><p className="text-xs font-bold text-slate-700">★ Đánh giá trung bình đã xác thực</p><div className="mt-4 space-y-2 text-[11px] text-slate-600"><p><b>{selectedTeacher.studentsCount}</b> học viên từng học</p><p><b>{selectedTeacher.coursesCount}</b> lớp/chương trình công khai</p><p className="border-t border-sky-100 pt-3">Review hiển thị sau kiểm duyệt; không công khai danh tính học sinh.</p></div><button onClick={() => { setSelectedTeacher(null); onNavigateCourses?.("Khóa học"); }} className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white">Xem lớp phụ trách</button></aside></div></section></div>}
    </div>
  );
}
