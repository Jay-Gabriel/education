import React, { useState } from "react";
import { X, KeyRound, CheckCircle2, AlertCircle, ShieldCheck, BookOpen, Clock, Sparkles } from "lucide-react";

export default function ActivationModal({ isOpen, onClose, userRole }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle, checking, success, error
  const [activatedInfo, setActivatedInfo] = useState(null);

  if (!isOpen) return null;

  const handleActivate = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setStatus("checking");
    setTimeout(() => {
      const cleanCode = code.trim().toUpperCase();
      if (cleanCode.includes("HSG") || cleanCode.includes("CHUYEN") || cleanCode.includes("360") || cleanCode.length >= 8) {
        setStatus("success");
        setActivatedInfo({
          productName: cleanCode.includes("CHUYEN") ? "Luyện thi vào lớp 10 Chuyên Tin" : "Chuyên đề Thuật toán HSG Quốc Gia",
          scope: userRole === "teacher" ? "Quyền dùng để dạy (Mọi lớp phụ trách)" : "Quyền học cá nhân",
          duration: "365 ngày (đến ngày 10/09/2027)",
          code: cleanCode
        });
      } else {
        setStatus("error");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-sky-100 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-sky-400 to-blue-600"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-xs shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0B3C78]">Kích hoạt mã bản quyền</h3>
            <p className="text-xs text-slate-500">Mở khóa toàn bộ bài tập, đề thi & học liệu có bản quyền</p>
          </div>
        </div>

        {status !== "success" ? (
          <form onSubmit={handleActivate} className="flex flex-col gap-4">
            <div className="bg-[#F8FBFE] border border-sky-100 rounded-2xl p-3.5 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-[#0066CC] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Quy tắc kích hoạt quyền:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500">
                <li>Thời hạn tính từ thời điểm kích hoạt mã hợp lệ.</li>
                <li>Học sinh: Nhận <strong>Quyền học cá nhân</strong> tự luyện và xem bài.</li>
                <li>Giáo viên: Nhận <strong>Quyền dùng để dạy</strong> cho mọi lớp phụ trách.</li>
              </ul>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nhập mã kích hoạt (16 ký tự hoặc mã voucher)
              </label>
              <input
                type="text"
                placeholder="VD: ONTHI360-HSG9-2026-X8K9"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  if (status === "error") setStatus("idle");
                }}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F0F6FC] border border-sky-200 text-slate-800 font-mono text-sm uppercase placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {status === "error" && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>Mã kích hoạt không hợp lệ hoặc đã hết lượt sử dụng. Vui lòng thử lại! (Gợi ý mã thử: <strong>ONTHI360-HSG</strong>)</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={status === "checking" || !code.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {status === "checking" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Đang kiểm tra...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Kích hoạt ngay</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-2 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-1">Kích hoạt thành công!</h4>
            <p className="text-xs text-slate-500 mb-4">Quyền truy cập học liệu đã được mở khóa ngay trên tài khoản của bạn.</p>

            <div className="w-full bg-[#F0F8FF] border border-sky-200 rounded-2xl p-4 text-left text-xs mb-4">
              <div className="flex justify-between py-1 border-b border-sky-100">
                <span className="text-slate-500">Sản phẩm:</span>
                <span className="font-bold text-[#0B3C78]">{activatedInfo?.productName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sky-100">
                <span className="text-slate-500">Loại quyền:</span>
                <span className="font-bold text-blue-600">{activatedInfo?.scope}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Thời hạn:</span>
                <span className="font-bold text-emerald-600">{activatedInfo?.duration}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Bắt đầu học ngay →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
