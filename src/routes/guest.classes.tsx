import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DataTable, type Column } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/guest/classes")({
  head: () => ({
    meta: [
      { title: "Class Schedule — GymFit" },
      {
        name: "description",
        content: "See the weekly GymFit class timetable with trainers, times and availability.",
      },
      { property: "og:title", content: "Class Schedule — GymFit" },
      {
        property: "og:description",
        content: "Weekly GymFit class timetable with trainers, times and availability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuestClasses,
});

type GymClass = {
  id: string;
  name: string;
  trainer: string;
  day: string;
  time: string;
  spots: number;
  status: string;
};

const classes: GymClass[] = [
  {
    id: "1",
    name: "Strength Foundations",
    trainer: "Mai Le",
    day: "Monday",
    time: "07:00",
    spots: 6,
    status: "active",
  },
  {
    id: "2",
    name: "HIIT Express",
    trainer: "Duc Tran",
    day: "Monday",
    time: "18:30",
    spots: 0,
    status: "pending",
  },
  {
    id: "3",
    name: "Mobility Flow",
    trainer: "Anh Pham",
    day: "Tuesday",
    time: "09:00",
    spots: 11,
    status: "active",
  },
  {
    id: "4",
    name: "Olympic Lifting",
    trainer: "Mai Le",
    day: "Wednesday",
    time: "19:00",
    spots: 3,
    status: "active",
  },
  {
    id: "5",
    name: "Spin 45",
    trainer: "Linh Vo",
    day: "Thursday",
    time: "06:30",
    spots: 8,
    status: "active",
  },
  {
    id: "6",
    name: "Boxing Basics",
    trainer: "Duc Tran",
    day: "Friday",
    time: "17:00",
    spots: 0,
    status: "expired",
  },
  {
    id: "7",
    name: "Weekend Conditioning",
    trainer: "Linh Vo",
    day: "Saturday",
    time: "08:00",
    spots: 14,
    status: "active",
  },
];

const columns: Column<GymClass>[] = [
  {
    key: "name",
    header: "Class",
    cell: (row) => <span className="font-medium">{row.name}</span>,
  },
  { key: "trainer", header: "Trainer" },
  { key: "day", header: "Day" },
  { key: "time", header: "Time" },
  {
    key: "spots",
    header: "Spots left",
    value: (row) => row.spots,
    cell: (row) => (row.spots === 0 ? "Full" : row.spots),
  },
  {
    key: "status",
    header: "Status",
    sortable: false,
    cell: (row) => <StatusBadge status={row.status} />,
  },
];

function GuestClasses() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-14 lg:px-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Weekly schedule</h1>
        <p className="mt-2 text-muted-foreground">
          Mock timetable — booking requires a member account.
        </p>
      </div>
      <DataTable
        data={classes}
        columns={columns}
        rowKey={(row) => row.id}
        searchPlaceholder="Search classes or trainers"
        filters={[
          {
            key: "day",
            label: "Day",
            options: [...new Set(classes.map((c) => c.day))].map((day) => ({
              label: day,
              value: day,
            })),
          },
        ]}
        filterValue={(row, key) => (key === "day" ? row.day : undefined)}
        rowActions={[
          { label: "View details", onSelect: (row) => toast.info(row.name) },
          {
            label: "Request booking",
            onSelect: () => toast.success("Booking request sent (mock)"),
          },
        ]}
        toolbar={
          <Button variant="outline" onClick={() => toast.info("Export is mocked")}>
            Export
          </Button>
        }
      />
    </section>
  );
}
