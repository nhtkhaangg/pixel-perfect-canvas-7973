import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
export function AccessState({ trainer = false }: { trainer?: boolean }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <ShieldAlert className="size-12 text-warning" />
      <h1 className="mt-4 text-xl font-semibold">
        {trainer ? "Hồ sơ đang chờ phê duyệt" : "Không có quyền truy cập"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {trainer
          ? "Bạn có thể xem và cập nhật hồ sơ trong thời gian chờ duyệt."
          : "Vui lòng đăng nhập bằng tài khoản phù hợp."}
      </p>
      <Button className="mt-6" asChild>
        <Link to={trainer ? "/trainer/profile" : "/login"}>
          {trainer ? "Xem hồ sơ của tôi" : "Đăng nhập"}
        </Link>
      </Button>
    </div>
  );
}
