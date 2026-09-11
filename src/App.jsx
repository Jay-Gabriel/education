import React, { useState } from "react";

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

        {!workspaceMode && activeNav === "Trang chủ" && (
          <HomePage
            onNavigate={handlePublicNavigate}
            onOpenClassDetail={handleOpenClassDetail}
            onOpenActivation={() => setActivationModalOpen(true)}
            onOpenAccess={(mode) => setAccessModal(mode)}
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
            selectedGoal={selectedGoal}
            setSelectedGoal={setSelectedGoal}
            userRole={userRole}
          />
        )}

        {!workspaceMode && (activeNav === "Khóa học" || activeNav === "Lớp học") && (
          <CoursesPage
            onOpenClassDetail={handleOpenClassDetail}
            onOpenActivation={() => setActivationModalOpen(true)}
          />
        )}

        {!workspaceMode && activeNav === "Luyện tập" && (
          <PracticePage
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
          />
        )}

        {!workspaceMode && activeNav === "Tài liệu" && (
          <MaterialsPage
            onOpenActivation={() => setActivationModalOpen(true)}
            onOpenCheckout={() => setAccessModal("checkout")}
          />
        )}

        {!workspaceMode && activeNav === "Cuộc thi" && (
          <ContestsPage
            onOpenCodeWorkspace={handleOpenCodeWorkspace}
          />
        )}

        {!workspaceMode && activeNav === "Bảng xếp hạng" && (
          <LeaderboardPage />
        )}

        {!workspaceMode && (activeNav === "Giáo viên & chuyên gia" || activeNav === "Giáo viên & Chuyên gia") && (
          <TeachersPage
            onNavigateCourses={handlePublicNavigate}
          />
        )}

        {!workspaceMode && activeNav === "Thông tin" && (
          <InfoPage />
        )}
      </div>

      {/* 3. SHARED FOOTER — workspace có shell riêng, không lặp lại footer public */}
      {!workspaceMode && <Footer onNavigate={handlePublicNavigate} />}


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
        onNextProblem={handleOpenCodeWorkspace}
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
