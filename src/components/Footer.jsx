import React from "react";

export default function Footer({ onNavigate }) {
  return (
    // [GLOBAL-02] FOOTER TOÀN TRANG — giới thiệu, liên kết và thông tin pháp lý
    // Khoảng cách ngoài được giữ gọn để footer nối gần với nội dung cuối trang.
    <footer data-section="GLOBAL-02-FOOTER" className="footer-typography w-full relative overflow-hidden border-t border-sky-200/80 bg-white mt-3 sm:mt-4">
      {/* [GLOBAL-02A] Ảnh nền footer */}
      <img
        src="/assets/footer-bg.jpg"
        alt="Footer background"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
      />

      <div className="relative z-10 max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-7">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-7 mb-4 sm:mb-5">
          {/* [GLOBAL-02B] Logo và giới thiệu nền tảng */}
          <div data-section="GLOBAL-02B-INTRO" className="md:col-span-2">
            <img
              src="/assets/header-logo.png?v=3"
              alt="Ôn Thi 360"
              className="h-9 sm:h-10 object-contain mb-2.5 cursor-pointer"
              onClick={() => onNavigate && onNavigate("Trang chủ")}
            />
            <p className="text-[13px] sm:text-sm font-semibold leading-relaxed text-blue-700 mb-1.5">
              Học cùng mục tiêu – Vươn xa ước mơ
            </p>
            <p className="text-xs sm:text-[13px] font-normal leading-[1.65] text-slate-600 max-w-md">
              Nền tảng học tập và đánh giá Tin học hàng đầu cho học sinh 6–12, giáo viên và phụ huynh. Tích hợp hệ thống chấm bài trực tuyến Online Judge, ngân hàng học liệu bản quyền và đồng hành minh bạch.
            </p>
          </div>

          {/* [GLOBAL-02C] Nhóm liên kết Học tập */}
          <div data-section="GLOBAL-02C-LEARNING-LINKS">
            <h5 className="type-footer-heading mb-2.5">Học tập</h5>
            <ul className="type-footer-link flex flex-col gap-1.5 text-slate-600">
              {[
                { name: "Lớp học", target: "Khóa học" },
                { name: "Luyện tập", target: "Luyện tập" },
                { name: "Tài liệu", target: "Tài liệu" },
                { name: "Cuộc thi", target: "Cuộc thi" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer py-0.5"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* [GLOBAL-02D] Nhóm liên kết Đồng hành */}
          <div data-section="GLOBAL-02D-COMPANION-LINKS">
            <h5 className="type-footer-heading mb-2.5">Đồng hành</h5>
            <ul className="type-footer-link flex flex-col gap-1.5 text-slate-600">
              {[
                { name: "Dành cho học sinh", target: "Luyện tập" },
                { name: "Dành cho phụ huynh", target: "Thông tin" },
    { name: "Giáo viên & chuyên gia", target: "Giáo viên & chuyên gia" },
                { name: "Bảng xếp hạng", target: "Bảng xếp hạng" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer py-0.5"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* [GLOBAL-02E] Nhóm liên kết Thông tin */}
          <div data-section="GLOBAL-02E-INFORMATION">
            <h5 className="type-footer-heading mb-2.5">Thông tin</h5>
            <ul className="type-footer-link flex flex-col gap-1.5 text-slate-600">
              {[
                { name: "Giới thiệu Ôn Thi 360", target: "Thông tin" },
                { name: "Hướng dẫn kích hoạt mã", target: "Thông tin" },
                { name: "Chính sách bản quyền", target: "Thông tin" },
                { name: "Liên hệ & Hỗ trợ", target: "Thông tin" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer py-0.5"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* [GLOBAL-02F] THANH CUỐI FOOTER — slogan, mạng xã hội và pháp lý trên cùng một hàng */}
        <div data-section="GLOBAL-02F-FOOTER-BAR" className="flex flex-col items-center gap-3 border-t border-sky-100/70 pt-3.5 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-xs sm:text-[13px] font-bold leading-relaxed text-blue-900 italic tracking-[0.01em]">
            — Học tốt Tin học – Vững vàng hành trang 6–12 —
          </p>

          <div className="flex items-center gap-2.5">
            <span className="type-footer-meta font-bold text-[#123B68]">Kết nối</span>
            <div className="flex items-center gap-1.5">
              <a href="#facebook" aria-label="Facebook" className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 shadow-2xs">
                f
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 shadow-2xs">
                ▶
              </a>
              <a href="#zalo" aria-label="Zalo" className="w-7 h-7 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-[10px] font-bold hover:opacity-90 shadow-2xs">
                Zalo
              </a>
            </div>
          </div>

          <div className="type-footer-meta flex flex-col items-center gap-0.5 text-slate-500 sm:flex-row sm:gap-2 lg:justify-end">
            <p className="whitespace-nowrap">Điều khoản sử dụng · Chính sách bảo mật</p>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <p className="whitespace-nowrap">© 2026 Ôn Thi 360 · Bảo lưu mọi quyền</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
