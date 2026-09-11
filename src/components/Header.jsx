import React, { useEffect, useRef, useState } from "react";
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
  ShieldCheck,
  Menu,
  X
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const roleMenuCloseTimer = useRef(null);

  // Hover mở menu ngay; đóng trễ 160ms để con trỏ đi từ nút xuống panel không bị ngắt.
  const openRoleMenu = () => {
    if (roleMenuCloseTimer.current) clearTimeout(roleMenuCloseTimer.current);
    setRoleDropdownOpen(true);
  };

  const scheduleRoleMenuClose = () => {
    if (roleMenuCloseTimer.current) clearTimeout(roleMenuCloseTimer.current);
    roleMenuCloseTimer.current = setTimeout(() => setRoleDropdownOpen(false), 160);
  };

  useEffect(() => () => {
    if (roleMenuCloseTimer.current) clearTimeout(roleMenuCloseTimer.current);
  }, []);

  const navItems = [
    { name: "Trang chủ", icon: Home, id: "home" },
    { name: "Lớp học", icon: BookOpen, id: "courses" },
    { name: "Luyện tập", icon: Code, id: "practice" },
    { name: "Tài liệu", icon: FileText, id: "materials" },
    { name: "Cuộc thi", icon: Trophy, id: "contests" },
    { name: "Bảng xếp hạng", icon: BarChart2, id: "leaderboard" },
    { name: "Giáo viên & chuyên gia", icon: Users, id: "teachers" },
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

  const handleMobileNavigate = (pageName) => {
    setMobileNavOpen(false);
    setActiveNav(pageName);
  };

  return (
    // [GLOBAL-01] HEADER TOÀN TRANG — logo, menu top, thông báo và menu người dùng
    <header data-section="GLOBAL-01-HEADER" className="header-typography relative sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] w-full">
      <div className="w-full px-3 sm:px-5 lg:px-4 2xl:px-8 py-2 sm:py-2.5 flex items-center gap-2">
        {/* [GLOBAL-01A] Logo Ôn Thi 360 */}
        <div data-section="GLOBAL-01A-LOGO" className="flex shrink-0 items-center min-w-[144px]">
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

        <button
          type="button"
          onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-sky-100 bg-white text-slate-600 transition-colors hover:bg-sky-50 hover:text-[#126F91] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 lg:hidden"
          aria-label={mobileNavOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>

        {/* [GLOBAL-01B] MENU TOP — điều hướng chính trên màn hình desktop */}
        <nav data-section="GLOBAL-01B-TOP-MENU" className="hidden lg:flex min-w-0 flex-1 items-center justify-between gap-0.5 rounded-2xl border border-sky-100/80 bg-sky-50/50 p-1 text-xs 2xl:text-[13px] font-semibold leading-snug whitespace-nowrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Tương thích với các liên kết cũ còn điều hướng bằng khóa "Khóa học".
            const isActive = activeNav === item.name || (activeNav === "Khóa học" && item.name === "Lớp học") || (activeNav === "Giáo viên & Chuyên gia" && item.id === "teachers");
            return (
              <React.Fragment key={item.name}>
                <button
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center gap-1 px-1.5 xl:gap-1.5 xl:px-2.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-white text-[#0066CC] shadow-sm ring-1 ring-blue-100"
                      : "text-slate-700 hover:text-blue-700 hover:bg-white/90"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#0066CC]" : "text-blue-600"}`} />
                  <span>{item.name}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* [GLOBAL-01C] TIỆN ÍCH HEADER — tìm kiếm, thông báo và tài khoản */}
        <div data-section="GLOBAL-01C-HEADER-ACTIONS" className="ml-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* [GLOBAL-01C1] Ô tìm kiếm */}
          <div data-section="GLOBAL-01C1-SEARCH" className="relative hidden min-[1600px]:block">
            <input
              type="text"
              placeholder="Tìm bài học, đề thi, sách..."
              className="w-40 min-[2048px]:w-44 pl-8 pr-3 py-1.5 text-xs bg-[#F0F6FC] border border-sky-200/80 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* [GLOBAL-01C2] Nút và bảng thông báo */}
          <div data-section="GLOBAL-01C2-NOTIFICATIONS" className="relative">
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
                  <h4 className="type-card-title text-slate-800">Thông báo mới</h4>
                  <span className="type-action text-blue-600 cursor-pointer hover:underline">Đã đọc tất cả</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-100/80 text-xs">
                    <p className="type-card-title flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 shrink-0 text-amber-600" />Kỳ thi HSG Tin học cấp tỉnh</p>
                    <p className="type-body mt-0.5 text-slate-600">Sắp mở thi lúc 08:00 ngày 15/11/2025. Hãy kiểm tra phòng thi!</p>
                    <span className="type-meta mt-1 block text-slate-400">5 phút trước</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs transition-colors">
                    <p className="type-card-title flex items-center gap-1.5 text-slate-800"><BookOpen className="h-3.5 w-3.5 shrink-0 text-blue-600" />Đã mở chương 4: Quy hoạch động</p>
                    <p className="type-body mt-0.5 text-slate-600">Thầy Nguyễn Tiến Thành vừa mở 12 bài tập tự luyện mới.</p>
                    <span className="type-meta mt-1 block text-slate-400">2 giờ trước</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* [GLOBAL-01C3] MENU NGƯỜI DÙNG — vai trò, đăng nhập và kích hoạt quyền */}
          {/* Vùng hover bao trùm cả trigger và panel để menu mở/đóng tự nhiên */}
          <div
            data-section="GLOBAL-01C3-USER-MENU"
            className="relative"
            onMouseEnter={openRoleMenu}
            onMouseLeave={scheduleRoleMenuClose}
            onFocusCapture={openRoleMenu}
            onBlurCapture={scheduleRoleMenuClose}
          >
            <button
              type="button"
              onClick={() => setRoleDropdownOpen((isOpen) => !isOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-2 border-l border-slate-200 cursor-pointer shrink-0 select-none rounded-r-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Mở menu người dùng"
              aria-expanded={roleDropdownOpen}
            >
              <img
                src={currentRoleObj.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full border-2 border-sky-300 object-cover shadow-2xs shrink-0"
              />
              <div className="text-left hidden min-[1800px]:block leading-tight">
                <p className="text-[13px] font-bold text-slate-800 leading-snug truncate max-w-[140px]">
                  {currentRoleObj.name}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                    {currentRoleObj.label}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${roleDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Role Switcher Menu */}
            {roleDropdownOpen && (
              <div
                className="fixed left-3 right-3 top-[68px] max-h-[calc(100dvh-156px)] overflow-y-auto rounded-3xl border border-sky-100 bg-white p-3 shadow-xl z-[70] animate-fadeIn sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+6px)] sm:max-h-[min(70vh,600px)] sm:w-72 sm:rounded-2xl"
                onMouseEnter={openRoleMenu}
                onMouseLeave={scheduleRoleMenuClose}
              >
                <div className="px-2 py-1.5 mb-2 border-b border-slate-100">
                  <p className="type-label uppercase tracking-[0.06em] text-slate-500">Chuyển vai trò xem giao diện</p>
                </div>
                <div className="flex flex-col gap-1">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setUserRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        userRole === r.id
                          ? "bg-blue-50/90 text-blue-700 font-bold border border-blue-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-sky-200" />
                      <div className="overflow-hidden">
                        <p className="type-card-title truncate">{r.name}</p>
                        <p className="type-body mt-0.5 text-slate-500">{r.label}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      onOpenAccess?.(userRole === "guest" ? "auth" : "rights");
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-[13px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>{userRole === "guest" ? "Đăng nhập / đăng ký" : "Quyền của tôi"}</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenActivation();
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-[13px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <span>Nhập mã kích hoạt quyền</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-sky-100 bg-white p-3 shadow-xl lg:hidden">
          <nav aria-label="Điều hướng chính trên thiết bị di động" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.name || (activeNav === "Khóa học" && item.name === "Lớp học") || (activeNav === "Giáo viên & Chuyên gia" && item.id === "teachers");
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleMobileNavigate(item.name)}
                  className={"flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-[11px] font-bold transition-colors " + (isActive ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-100 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-sky-50")}
                >
                  <Icon className={"h-4 w-4 shrink-0 " + (isActive ? "text-blue-600" : "text-slate-500")} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

    </header>
  );
}
