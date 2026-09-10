import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Code,
  FileText,
  Trophy,
  BarChart2,
  Users,
  Info,
  Search,
  Bell,
  ChevronDown,
  KeyRound,
  UserCheck,
  Sparkles,
  GraduationCap,
  ShieldCheck
} from "lucide-react";

export default function Header({
  activeNav,
  setActiveNav,
  onOpenActivation,
  onOpenAccess,
  userRole,
  setUserRole
}) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navItems = [
    { name: "Trang chủ", icon: Home, id: "home" },
    { name: "Khóa học", icon: BookOpen, id: "courses" },
    { name: "Luyện tập", icon: Code, id: "practice" },
    { name: "Tài liệu", icon: FileText, id: "materials" },
    { name: "Cuộc thi", icon: Trophy, id: "contests" },
    { name: "Bảng xếp hạng", icon: BarChart2, id: "leaderboard" },
    { name: "Giáo viên tiêu biểu", icon: Users, id: "teachers" },
    { name: "Thông tin", icon: Info, id: "info" },
  ];

  const roles = [
    { id: "student", label: "Học sinh", name: "Nguyễn Minh Anh", sub: "Lớp 10A1", avatar: "/assets/user-avatar.png" },
    { id: "teacher", label: "Giáo viên (Đã duyệt)", name: "Thầy Nguyễn Tiến Thành", sub: "THPT Chuyên Thái Bình", avatar: "/assets/teacher-thanh.png" },
    { id: "parent", label: "Phụ huynh", name: "Chị Trần Thị Mai", sub: "PH em Minh Anh", avatar: "/assets/testi-av-2.png?v=3" },
    { id: "admin", label: "Quản trị viên", name: "Nguyễn Hoàng Long", sub: "Vận hành Ôn Thi 360", avatar: "/assets/rank-2.png" },
    { id: "guest", label: "Khách vãng lai", name: "Khách khám phá", sub: "Chưa đăng nhập", avatar: "/assets/rank-avatar-1.png" }
  ];

  const currentRoleObj = roles.find(r => r.id === userRole) || roles[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] w-full">
      <div className="w-full px-3 sm:px-5 lg:px-4 2xl:px-8 py-2 sm:py-2.5 flex items-center gap-2">
        {/* Logo always owns its own non-shrinking space. */}
        <div className="flex shrink-0 items-center min-w-[144px]">
          <div
            onClick={() => setActiveNav("Trang chủ")}
            className="flex items-center gap-2 cursor-pointer shrink-0 group"
          >
            <img
              src="/assets/header-logo.png?v=3"
              alt="Ôn Thi 360 - Học cùng mục tiêu – Vươn xa ước mơ"
              className="h-7 sm:h-8 lg:h-8.5 object-contain group-hover:scale-102 transition-transform"
            />
          </div>
        </div>

        {/* Keep every primary destination visible on desktop; controls yield before navigation. */}
        <nav className="hidden lg:flex min-w-0 flex-1 items-center justify-between gap-0.5 text-[10px] xl:text-[11px] font-semibold whitespace-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name || (activeNav === "Lớp học" && item.name === "Khóa học") || (activeNav === "Giáo viên & Chuyên gia" && item.name === "Giáo viên tiêu biểu");
            return (
              <React.Fragment key={item.name}>
                <button
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center gap-1 px-1.5 xl:px-2 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#E6F3FF] text-[#0066CC] shadow-2xs font-bold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-sky-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#0066CC]" : "text-blue-600"}`} />
                  <span>{item.name}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Search & Actions & Profile */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Activation Code Button */}
          <button
            onClick={onOpenActivation}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-xs shadow-amber-500/20 cursor-pointer transition-all active:scale-98"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Nhập mã kích hoạt</span>
          </button>

          {/* Search Box */}
          <div className="relative hidden min-[1600px]:block">
            <input
              type="text"
              placeholder="Tìm bài học, đề thi, sách..."
              className="w-40 min-[2048px]:w-44 pl-8 pr-3 py-1.5 text-xs bg-[#F0F6FC] border border-sky-200/80 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-1.5 text-slate-600 hover:text-blue-600 hover:bg-sky-50 rounded-full transition-colors cursor-pointer shrink-0"
              aria-label="Thông báo"
            >
              <Bell className="w-4.5 h-4.5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-10 w-72 sm:w-80 bg-white border border-sky-100 rounded-2xl shadow-xl p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">Thông báo mới</h4>
                  <span className="text-[10px] text-blue-600 cursor-pointer hover:underline">Đã đọc tất cả</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100/80 text-xs">
                    <p className="font-bold text-[#0B3C78]">🏆 Kỳ thi HSG Tin học cấp tỉnh</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Sắp mở thi lúc 08:00 ngày 15/11/2025. Hãy kiểm tra phòng thi!</p>
                    <span className="text-[9.5px] text-slate-400 mt-1 block">5 phút trước</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs transition-colors">
                    <p className="font-bold text-slate-800">📚 Đã mở chương 4: Quy hoạch động</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Thầy Nguyễn Tiến Thành vừa mở 12 bài tập tự luyện mới.</p>
                    <span className="text-[9.5px] text-slate-400 mt-1 block">2 giờ trước</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role & Profile Switcher */}
          <div className="relative">
            <div
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-slate-200 cursor-pointer shrink-0 select-none"
            >
              <img
                src={currentRoleObj.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full border-2 border-sky-300 object-cover shadow-2xs shrink-0"
              />
              <div className="text-left hidden min-[1800px]:block leading-tight">
                <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                  {currentRoleObj.name}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.2 rounded-md border border-blue-200">
                    {currentRoleObj.label}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>

            {/* Role Switcher Menu */}
            {roleDropdownOpen && (
              <div className="fixed left-3 right-3 top-[68px] max-h-[calc(100dvh-156px)] overflow-y-auto rounded-3xl border border-sky-100 bg-white p-2.5 shadow-xl z-[70] animate-fadeIn sm:absolute sm:left-auto sm:right-0 sm:top-11 sm:max-h-[min(70vh,560px)] sm:w-64 sm:rounded-2xl">
                <div className="px-2 py-1 mb-1.5 border-b border-slate-100">
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Chuyển vai trò xem giao diện</p>
                </div>
                <div className="flex flex-col gap-1">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setUserRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                        userRole === r.id
                          ? "bg-blue-50/90 text-blue-700 font-bold border border-blue-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full object-cover border border-sky-200" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold truncate leading-tight">{r.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">{r.label}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onOpenAccess?.(userRole === "guest" ? "auth" : "rights");
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full py-1.5 px-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>{userRole === "guest" ? "Đăng nhập / đăng ký" : "Quyền của tôi"}</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenActivation();
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full py-1.5 px-2 rounded-xl text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    <span>Nhập mã kích hoạt quyền</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </header>
  );
}
