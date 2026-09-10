import React, { useState } from "react";
import { BookOpen, Code2, Home, Menu } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import CoursesPage from "./components/CoursesPage";
import PracticePage from "./components/PracticePage";
import MaterialsPage from "./components/MaterialsPage";
import ContestsPage from "./components/ContestsPage";
import LeaderboardPage from "./components/LeaderboardPage";
import TeachersPage from "./components/TeachersPage";
import InfoPage from "./components/InfoPage";
import ActivationModal from "./components/ActivationModal";
import ClassDetailModal from "./components/ClassDetailModal";
import CodeWorkspaceModal from "./components/CodeWorkspaceModal";
import ReviewModal from "./components/ReviewModal";
import RoleWorkspace from "./components/RoleWorkspace";
import AssessmentModal from "./components/AssessmentModal";
import AccessCenterModal from "./components/AccessCenterModal";

export default function App() {
  const [activeNav, setActiveNav] = useState("Trang chủ");
  const [userRole, setUserRole] = useState("guest"); // student, teacher, parent, guest
  const [workspaceMode, setWorkspaceMode] = useState(false);

  // Modals state
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [classDetailModalOpen, setClassDetailModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [codeWorkspaceModalOpen, setCodeWorkspaceModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewTarget, setSelectedReviewTarget] = useState(null);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [accessModal, setAccessModal] = useState(null);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // Home states for goal search
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  const [selectedGoal, setSelectedGoal] = useState("Luyện thi HSG Tin học lớp 9");

  const workspacePages = new Set([
    "Tổng quan", "Khóa học của tôi", "Luyện tập", "Tài liệu của tôi", "Đánh giá của tôi", "Kết quả", "Thông báo", "Hồ sơ",
    "Lớp học", "Học liệu lớp", "Bài tập & Đề", "Kho câu hỏi của tôi", "Giao đề", "Lịch", "Con của tôi",
    "Lịch & Điểm danh", "Kết quả & Tiến độ", "Đánh giá lớp", "Người dùng", "Nội dung", "Khóa & Lớp",
    "Sản phẩm & Quyền", "Đơn hàng", "Mã kích hoạt", "Đánh giá", "Cuộc thi & BXH", "Audit log", "Báo cáo"
  ]);

  const handleNavigate = (pageName) => {
    setActiveNav(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublicNavigate = (pageName) => {
    setWorkspaceMode(false);
    handleNavigate(pageName);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    setWorkspaceMode(role !== "guest");
    handleNavigate(role === "guest" ? "Trang chủ" : "Tổng quan");
  };

  const handleOpenClassDetail = (course) => {
    setSelectedCourse(course);
    setClassDetailModalOpen(true);
  };

  const handleOpenCodeWorkspace = (problem) => {
    setSelectedProblem(problem);
    setCodeWorkspaceModalOpen(true);
  };

  const handleOpenReview = (target) => {
    setSelectedReviewTarget(target);
    setReviewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EEF5FC] text-slate-800 font-sans antialiased selection:bg-blue-100 flex flex-col justify-between">
      {/* 1. TOP HEADER & ROLE SWITCHER */}
      <Header
        activeNav={activeNav}
        setActiveNav={handlePublicNavigate}
        onOpenActivation={() => setActivationModalOpen(true)}
        onOpenAccess={(mode) => setAccessModal(mode)}
        userRole={userRole}
        setUserRole={handleRoleChange}
      />

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1780px] w-full mx-auto px-3 sm:px-5 lg:px-6 2xl:px-10 py-3 sm:py-5 flex-1">
        {workspaceMode && workspacePages.has(activeNav) && (
          <RoleWorkspace
            role={userRole}
            activeNav={activeNav}
            onNavigate={(pageName) => {
              setWorkspaceMode(true);
              handleNavigate(pageName);
            }}
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
            onOpenAssessment={() => setAssessmentModalOpen(true)}
            onOpenActivation={() => setActivationModalOpen(true)}
          />
        )}

        {activeNav === "Trang chủ" && (
          <HomePage
            onNavigate={handlePublicNavigate}
            onOpenClassDetail={handleOpenClassDetail}
            onOpenActivation={() => setActivationModalOpen(true)}
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
          />
        )}

        {(activeNav === "Khóa học" || activeNav === "Lớp học") && (
          <CoursesPage
            onOpenClassDetail={handleOpenClassDetail}
            onOpenActivation={() => setActivationModalOpen(true)}
          />
        )}

        {activeNav === "Luyện tập" && (
          <PracticePage
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
          />
        )}

        {activeNav === "Tài liệu" && (
          <MaterialsPage
            onOpenActivation={() => setActivationModalOpen(true)}
            onOpenCheckout={() => setAccessModal("checkout")}
          />
        )}

        {activeNav === "Cuộc thi" && (
          <ContestsPage
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
          />
        )}

        {activeNav === "Bảng xếp hạng" && (
          <LeaderboardPage />
        )}

        {(activeNav === "Giáo viên tiêu biểu" || activeNav === "Giáo viên & Chuyên gia") && (
          <TeachersPage
            onNavigateCourses={handlePublicNavigate}
          />
        )}

        {activeNav === "Thông tin" && (
          <InfoPage />
        )}
      </div>

      {/* 3. SHARED FOOTER */}
      <Footer onNavigate={handlePublicNavigate} />

      {!workspaceMode && !activationModalOpen && !classDetailModalOpen && !codeWorkspaceModalOpen && !reviewModalOpen && !assessmentModalOpen && !accessModal && (
        <>
          <nav className="md:hidden fixed bottom-3 left-3 right-3 z-[55] flex items-center justify-around rounded-2xl border border-sky-100 bg-white/95 p-2 shadow-xl backdrop-blur-md">
            {[["Trang chủ", Home], ["Khóa học", BookOpen], ["Luyện tập", Code2]].map(([label, Icon]) => <button key={label} onClick={() => handlePublicNavigate(label)} className={`min-w-16 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold ${activeNav === label ? "text-blue-600" : "text-slate-500"}`}><Icon className="w-4 h-4"/>{label}</button>)}
            <button onClick={() => setMobileMoreOpen(true)} className="min-w-16 py-1.5 flex flex-col items-center gap-0.5 text-[10px] font-bold text-slate-500"><Menu className="w-4 h-4"/>Thêm</button>
          </nav>
          {mobileMoreOpen && <div className="md:hidden fixed inset-0 z-[65] bg-slate-950/35 flex items-end" onClick={() => setMobileMoreOpen(false)}><div className="w-full rounded-t-3xl bg-white p-5" onClick={e => e.stopPropagation()}><div className="mx-auto h-1.5 w-10 rounded-full bg-slate-200"/><h3 className="mt-4 text-base font-black text-slate-800">Khám phá thêm</h3><div className="mt-3 grid grid-cols-2 gap-2">{["Tài liệu", "Cuộc thi", "Bảng xếp hạng", "Giáo viên tiêu biểu", "Thông tin"].map(item => <button key={item} onClick={() => { setMobileMoreOpen(false); handlePublicNavigate(item); }} className="rounded-xl bg-sky-50 px-3 py-3 text-left text-xs font-bold text-slate-700">{item}</button>)}</div></div></div>}
        </>
      )}

      {/* 4. MODALS & WORKSPACES */}
      <ActivationModal
        isOpen={activationModalOpen}
        onClose={() => setActivationModalOpen(false)}
        userRole={userRole}
      />

      <ClassDetailModal
        course={selectedCourse}
        isOpen={classDetailModalOpen}
        onClose={() => setClassDetailModalOpen(false)}
        onOpenCodeWorkspace={handleOpenCodeWorkspace}
        onOpenReview={handleOpenReview}
        onOpenLocked={() => setAccessModal("locked")}
      />

      <CodeWorkspaceModal
        problem={selectedProblem}
        isOpen={codeWorkspaceModalOpen}
        onClose={() => setCodeWorkspaceModalOpen(false)}
      />

      <ReviewModal
        target={selectedReviewTarget}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        userRole={userRole}
      />

      <AssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
      />

      <AccessCenterModal
        isOpen={Boolean(accessModal)}
        mode={accessModal || "auth"}
        userRole={userRole}
        onClose={() => setAccessModal(null)}
      />
    </div>
  );
}
