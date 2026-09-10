import React from "react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full relative overflow-hidden border-t border-sky-200/80 bg-white mt-7 sm:mt-9">
      {/* Panoramic HD Background Artwork */}
      <img
        src="/assets/footer-bg.jpg"
        alt="Footer background"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
      />

      <div className="relative z-10 max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-10 py-7 sm:py-9">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-6 mb-6">
          {/* Logo & Intro */}
          <div className="md:col-span-2">
            <img
              src="/assets/header-logo.png?v=3"
              alt="Ôn Thi 360"
              className="h-9 sm:h-10 object-contain mb-2.5 cursor-pointer"
              onClick={() => onNavigate && onNavigate("Trang chủ")}
            />
            <p className="text-xs sm:text-sm font-semibold text-blue-700 mb-1">
              Học cùng mục tiêu – Vươn xa ước mơ
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-sm">
              Nền tảng học tập và đánh giá Tin học hàng đầu cho học sinh 6–12, giáo viên và phụ huynh. Tích hợp hệ thống chấm bài trực tuyến Online Judge, ngân hàng học liệu bản quyền và đồng hành minh bạch.
            </p>
          </div>

          {/* Col 1: Học tập */}
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">Học tập</h5>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-600">
              {[
                { name: "Khóa học", target: "Khóa học" },
                { name: "Luyện tập", target: "Luyện tập" },
                { name: "Tài liệu", target: "Tài liệu" },
                { name: "Cuộc thi", target: "Cuộc thi" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Đồng hành */}
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">Đồng hành</h5>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-600">
              {[
                { name: "Dành cho học sinh", target: "Luyện tập" },
                { name: "Dành cho phụ huynh", target: "Thông tin" },
                { name: "Giáo viên tiêu biểu", target: "Giáo viên tiêu biểu" },
                { name: "Bảng xếp hạng", target: "Bảng xếp hạng" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Thông tin & Kết nối */}
          <div>
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">Thông tin</h5>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-600 mb-2.5">
              {[
                { name: "Giới thiệu Ôn Thi 360", target: "Thông tin" },
                { name: "Hướng dẫn kích hoạt mã", target: "Thông tin" },
                { name: "Chính sách bản quyền", target: "Thông tin" },
                { name: "Liên hệ & Hỗ trợ", target: "Thông tin" }
              ].map((it) => (
                <li key={it.name}>
                  <button
                    onClick={() => onNavigate && onNavigate(it.target)}
                    className="hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    {it.name}
                  </button>
                </li>
              ))}
            </ul>

            <h5 className="text-xs font-bold text-slate-900 mb-1.5">Kết nối với chúng tôi</h5>
            <div className="flex items-center gap-2 mb-2.5">
              <a href="#facebook" className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 shadow-2xs">
                f
              </a>
              <a href="#youtube" className="w-7 h-7 rounded-full bg-[#FF0000] text-white flex items-center justify-center text-xs font-bold hover:opacity-90 shadow-2xs">
                ▶
              </a>
              <a href="#zalo" className="w-7 h-7 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-[10px] font-bold hover:opacity-90 shadow-2xs">
                Zalo
              </a>
            </div>

            <div className="text-[11px] text-slate-500 leading-normal">
              <p>Điều khoản sử dụng | Chính sách bảo mật</p>
              <p className="mt-0.5">© 2026 Ôn Thi 360. Tất cả quyền được bảo lưu.</p>
            </div>
          </div>
        </div>

        {/* Bottom Slogan */}
        <div className="pt-4 border-t border-sky-100/70 text-center flex items-center justify-center gap-3">
          <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent w-20 hidden sm:block"></div>
          <p className="text-xs sm:text-sm font-bold text-blue-900 italic tracking-wide">
            — Học tốt Tin học – Vững vàng hành trang 6–12 —
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent w-20 hidden sm:block"></div>
        </div>
      </div>
    </footer>
  );
}
