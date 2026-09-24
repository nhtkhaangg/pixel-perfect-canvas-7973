import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const segmentLabels: Record<string, string> = {
  admin: "Quản trị viên", manager: "Quản lý", staff: "Nhân viên", trainer: "Huấn luyện viên",
  customer: "Hội viên", guest: "Khách", users: "Người dùng", roles: "Phân quyền", settings: "Cài đặt",
  branches: "Cơ sở vật chất", memberships: "Gói tập", reports: "Báo cáo", members: "Hội viên",
  classes: "Lớp tập", "check-in": "Check-in", "check-in-screen": "Màn hình check-in",
  profile: "Hồ sơ", "change-password": "Đổi mật khẩu", assessment: "Đánh giá ban đầu",
  availability: "Lịch rảnh", metrics: "Chỉ số cơ thể", review: "Đánh giá phòng gym",
  purchase: "Mua gói tập", "book-pt": "Đặt gói PT", packages: "Gói đã mua", refund: "Yêu cầu hoàn tiền",
  schedule: "Lịch tập", reschedule: "Đổi lịch", roadmap: "Lộ trình tập luyện", exercises: "Bài tập",
  chat: "Trò chuyện", sessions: "Buổi tập", "trainer-match": "Gợi ý huấn luyện viên",
  progress: "Tiến độ", notifications: "Thông báo", workouts: "Bài tập mẫu", certificates: "Chứng chỉ",
  "days-off": "Ngày nghỉ", verify: "Xác nhận buổi tập", lessons: "Giáo án", customers: "Hội viên của tôi",
  reviews: "Đánh giá", live: "Buổi tập trực tiếp", feedback: "Phản hồi sau buổi tập",
  plans: "Kế hoạch tập luyện", ai: "Gợi ý AI", nutrition: "Kế hoạch dinh dưỡng", hub: "Điều hướng kiểm thử",
};

function titleize(segment: string) {
  if (segmentLabels[segment]) return segmentLabels[segment];
  if (/^[a-z]+-?\d+$/i.test(segment) || segment.length > 12) return "Chi tiết";
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function AppBreadcrumbs() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
        GymFit
      </Link>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span
            className={
              index === segments.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            }
          >
            {titleize(segment)}
          </span>
        </span>
      ))}
    </nav>
  );
}
