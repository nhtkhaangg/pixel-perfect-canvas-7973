import { facilityStatuses, trainerTiers } from "./contracts";
export type Field = {
  key: string;
  label: string;
  type?:
    | "number"
    | "textarea"
    | "date"
    | "email"
    | "password"
    | "select"
    | "boolean"
    | "list"
    | "richtext";
  required?: boolean;
  max?: number;
  options?: readonly string[];
  default?: string | number | boolean;
  createOnly?: boolean;
};
export type Workspace = {
  title: string;
  description: string;
  fields: Field[];
  columns: string[];
  editable: boolean;
  statusKey?: string;
};
const status: Field = {
  key: "status",
  label: "Trạng thái",
  type: "select",
  options: ["ACTIVE", "LOCKED"],
  default: "ACTIVE",
};
const people: Field[] = [
  { key: "fullName", label: "Họ và tên", required: true, max: 100 },
  { key: "email", label: "Email", type: "email", required: true, max: 100 },
  { key: "phone", label: "Số điện thoại", max: 20 },
  { key: "password", label: "Mật khẩu", type: "password", required: true, createOnly: true },
  { key: "gender", label: "Giới tính", type: "select", options: ["MALE", "FEMALE"] },
  { key: "dob", label: "Ngày sinh", type: "date" },
  { key: "hometown", label: "Quê quán", max: 255 },
];
export const workspaces: Record<string, Workspace> = {
  packages: {
    title: "Gói tập",
    description: "Danh mục gói hội viên và huấn luyện cá nhân.",
    editable: true,
    columns: ["name", "type", "trainerTier", "price", "durationDays", "totalSessions", "isActive"],
    fields: [
      { key: "name", label: "Tên gói tập", required: true, max: 100 },
      {
        key: "type",
        label: "Loại gói",
        type: "select",
        options: ["MEMBERSHIP", "PT"],
        default: "MEMBERSHIP",
        required: true,
      },
      { key: "price", label: "Giá (VNĐ)", type: "number", required: true },
      {
        key: "durationDays",
        label: "Thời hạn (ngày)",
        type: "number",
        required: true,
        default: 30,
      },
      { key: "totalSessions", label: "Tổng số buổi", type: "number", default: 0 },
      {
        key: "trainerTier",
        label: "Cấp bậc huấn luyện viên",
        type: "select",
        options: trainerTiers,
        default: "ALL",
      },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "benefits", label: "Quyền lợi", type: "list" },
      { key: "facilityPrivileges", label: "Quyền sử dụng khu tập", type: "list" },
      { key: "isActive", label: "Đang hoạt động", type: "boolean", default: true },
    ],
  },
  facilities: {
    title: "Cơ sở vật chất",
    description: "Thiết bị, tình trạng sử dụng và lịch bảo trì.",
    editable: true,
    statusKey: "status",
    columns: ["name", "location", "serialNumber", "nextMaintenanceDate", "status"],
    fields: [
      { key: "name", label: "Tên thiết bị", required: true, max: 100 },
      { key: "description", label: "Mô tả", type: "textarea" },
      { key: "imageUrl", label: "Đường dẫn ảnh", max: 255 },
      {
        key: "status",
        label: "Tình trạng",
        type: "select",
        options: facilityStatuses,
        default: "AVAILABLE",
      },
      { key: "mgrId", label: "Quản lý phụ trách", type: "select", options: ["manager-1"] },
      { key: "category", label: "Danh mục", default: "STRENGTH", max: 50 },
      { key: "serialNumber", label: "Số sê-ri", max: 100 },
      { key: "manufacturer", label: "Nhà sản xuất", max: 100 },
      { key: "purchaseDate", label: "Ngày mua", type: "date" },
      { key: "warrantyExpiration", label: "Hết hạn bảo hành", type: "date" },
      { key: "maintenanceInterval", label: "Chu kỳ bảo trì (ngày)", type: "number", default: 90 },
      { key: "lastMaintenanceDate", label: "Bảo trì gần nhất", type: "date" },
      { key: "nextMaintenanceDate", label: "Bảo trì tiếp theo", type: "date" },
      { key: "maintenanceNotes", label: "Ghi chú bảo trì", type: "textarea" },
      { key: "location", label: "Vị trí", max: 100 },
    ],
  },
  exercises: {
    title: "Thư viện bài tập",
    description: "Bài tập hệ thống và hướng dẫn kỹ thuật.",
    editable: true,
    columns: ["name", "muscle_group", "equipment", "level", "isCustom"],
    fields: [
      { key: "name", label: "Tên bài tập", required: true, max: 100 },
      { key: "muscle_group", label: "Nhóm cơ", required: true, max: 50 },
      { key: "equipment", label: "Dụng cụ", max: 50 },
      { key: "level", label: "Trình độ", default: "Mới bắt đầu", max: 50 },
      { key: "videoUrl", label: "Đường dẫn video", max: 255 },
      { key: "instruction", label: "Hướng dẫn", type: "textarea", required: true },
    ],
  },
  customers: {
    title: "Hội viên",
    description: "Hồ sơ hội viên và thông tin tài khoản.",
    editable: false,
    columns: ["customerCode", "fullName", "email", "phone", "gender"],
    fields: [
      { key: "fullName", label: "Họ và tên" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Số điện thoại" },
      { key: "gender", label: "Giới tính" },
      { key: "dob", label: "Ngày sinh" },
      { key: "address", label: "Địa chỉ" },
      { key: "health_notes", label: "Ghi chú sức khỏe" },
    ],
  },
  staff: {
    title: "Nhân viên",
    description: "Danh sách và hồ sơ nhân viên phòng gym.",
    editable: true,
    statusKey: "status",
    columns: ["staffCode", "fullName", "email", "phone", "status"],
    fields: [...people, { key: "staffCode", label: "Mã nhân viên", required: true, max: 50 }],
  },
  managers: {
    title: "Quản lý",
    description: "Hồ sơ quản lý và trạng thái tài khoản.",
    editable: true,
    statusKey: "status",
    columns: ["managerCode", "fullName", "email", "phone", "status"],
    fields: [...people, { key: "managerCode", label: "Mã quản lý", required: true, max: 50 }],
  },
  trainers: {
    title: "Huấn luyện viên",
    description: "Xét duyệt hồ sơ và thông tin chuyên môn.",
    editable: false,
    statusKey: "approval_status",
    columns: ["fullName", "specialization", "trainerTier", "ratingAvg", "approval_status"],
    fields: [
      { key: "fullName", label: "Họ và tên" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Số điện thoại" },
      { key: "specialization", label: "Chuyên môn" },
      { key: "trainerTier", label: "Cấp bậc" },
      { key: "bio", label: "Giới thiệu" },
    ],
  },
  payments: {
    title: "Thanh toán",
    description: "Giao dịch và yêu cầu hoàn tiền.",
    editable: false,
    statusKey: "status",
    columns: ["invoice_code", "amount", "payment_method", "status", "payment_time"],
    fields: [
      { key: "invoice_code", label: "Mã hóa đơn" },
      { key: "amount", label: "Số tiền" },
      { key: "payment_method", label: "Phương thức" },
      { key: "transaction_ref", label: "Mã đối soát" },
      { key: "refund_reason", label: "Lý do hoàn tiền" },
    ],
  },
  blogs: {
    title: "Bài viết",
    description: "Quản lý nội dung tập luyện, dinh dưỡng và phục hồi.",
    editable: true,
    statusKey: "status",
    columns: ["title", "category", "status", "createdAt"],
    fields: [
      { key: "title", label: "Tiêu đề", required: true, max: 200 },
      {
        key: "category",
        label: "Danh mục",
        type: "select",
        options: ["NUTRITION", "WORKOUT", "RECOVERY", "MINDSET"],
        required: true,
      },
      { key: "summary", label: "Tóm tắt", type: "textarea", max: 500 },
      { key: "content", label: "Nội dung", type: "richtext", required: true },
      { key: "thumbnailUrl", label: "Đường dẫn ảnh bìa" },
      {
        key: "status",
        label: "Trạng thái",
        type: "select",
        options: ["DRAFT", "PENDING_REVIEW", "PUBLISHED", "ARCHIVED"],
        default: "DRAFT",
      },
    ],
  },
  "blog-reviews": {
    title: "Đánh giá",
    description: "Đánh giá của hội viên và phản hồi.",
    editable: false,
    columns: ["customerId", "rating", "comment", "reply_comment", "createdAt"],
    fields: [
      { key: "rating", label: "Đánh giá" },
      { key: "comment", label: "Bình luận" },
      { key: "reply_comment", label: "Phản hồi" },
    ],
  },
  "check-in": {
    title: "Check-in",
    description: "Lịch sử vào phòng và đối soát thẻ hội viên.",
    editable: false,
    statusKey: "status",
    columns: ["customerId", "checkInTime", "checkOutTime", "method", "status"],
    fields: [
      { key: "customerId", label: "Hội viên" },
      { key: "checkInTime", label: "Giờ vào" },
      { key: "checkOutTime", label: "Giờ ra" },
      { key: "method", label: "Phương thức" },
      { key: "status", label: "Trạng thái" },
    ],
  },
  schedule: {
    title: "Lịch tập",
    description: "Lịch huấn luyện và các buổi tập đã đặt.",
    editable: false,
    statusKey: "status",
    columns: ["cus_id", "startTime", "endTime", "session_notes", "status"],
    fields: [
      { key: "cus_id", label: "Hội viên" },
      { key: "startTime", label: "Bắt đầu" },
      { key: "endTime", label: "Kết thúc" },
      { key: "session_notes", label: "Nội dung" },
      { key: "status", label: "Trạng thái" },
    ],
  },
};
export const fieldLabels: Record<string, string> = {
  id: "Mã",
  type: "Loại gói",
  trainerTier: "Cấp bậc",
  durationDays: "Thời hạn (ngày)",
  totalSessions: "Số buổi",
  price: "Giá",
  isActive: "Hoạt động",
  status: "Trạng thái",
  approval_status: "Xét duyệt",
  customerCode: "Mã hội viên",
  staffCode: "Mã nhân viên",
  managerCode: "Mã quản lý",
  ratingAvg: "Đánh giá",
  isCustom: "Tùy chỉnh",
  createdAt: "Ngày tạo",
  location: "Vị trí",
  serialNumber: "Số sê-ri",
  nextMaintenanceDate: "Bảo trì tiếp theo",
  muscle_group: "Nhóm cơ",
  equipment: "Dụng cụ",
  level: "Trình độ",
  fullName: "Họ và tên",
  email: "Email",
  phone: "Điện thoại",
  gender: "Giới tính",
  name: "Tên",
  title: "Tiêu đề",
  category: "Danh mục",
  invoice_code: "Mã hóa đơn",
  amount: "Số tiền",
  payment_method: "Phương thức",
  payment_time: "Thời gian",
  comment: "Bình luận",
  reply_comment: "Phản hồi",
  rating: "Số sao",
  customerId: "Hội viên",
  checkInTime: "Giờ vào",
  checkOutTime: "Giờ ra",
  method: "Phương thức",
  cus_id: "Hội viên",
  startTime: "Bắt đầu",
  endTime: "Kết thúc",
  session_notes: "Nội dung",
};
export const valueLabels: Record<string, string> = {
  MALE: "Nam",
  FEMALE: "Nữ",
  MEMBERSHIP: "Hội viên",
  PT: "PT",
  ALL: "Tất cả cấp bậc",
  JUNIOR: "Sơ cấp",
  SENIOR: "Chuyên nghiệp",
  MASTER: "Chuyên gia",
  WORKOUT: "Tập luyện",
  NUTRITION: "Dinh dưỡng",
  RECOVERY: "Phục hồi",
  MINDSET: "Tinh thần",
  CASH: "Tiền mặt",
  PAYOS: "PayOS",
  MANUAL: "Thủ công",
  FACE: "Nhận diện khuôn mặt",
  "manager-1": "Trần Thanh Phong",
};
export { status };
