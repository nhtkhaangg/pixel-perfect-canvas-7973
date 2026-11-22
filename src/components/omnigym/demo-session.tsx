import { createContext, useContext, useState, type ReactNode } from "react";
import type { Approval, DemoRole } from "@/lib/omnigym/contracts";
type Session = {
  trainerId: string;
  setTrainerId: (id: string) => void;
  role: DemoRole;
  approval: Approval;
  setRole: (role: DemoRole) => void;
  setApproval: (approval: Approval) => void;
};
const Context = createContext<Session | null>(null);
export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [trainerId, setTrainerId] = useState("maya-nguyen");
  const [role, setRole] = useState<DemoRole>("guest");
  const [approval, setApproval] = useState<Approval>("APPROVED");
  return (
    <Context.Provider value={{ trainerId, setTrainerId, role, setRole, approval, setApproval }}>
      {children}
    </Context.Provider>
  );
}
export function useDemoSession() {
  const session = useContext(Context);
  if (!session) throw new Error("DemoSessionProvider is required");
  return session;
}
