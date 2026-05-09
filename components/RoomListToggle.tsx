"use client";

import { useState } from "react";

export default function RoomListToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:block">

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full px-3 py-2 rounded-lg border bg-white/70 flex items-center justify-between"
      >
        <span className="font-medium">Rooms</span>
        <span className="text-lg">{open ? "▲" : "▼"}</span>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 md:!max-h-none ${
          open ? "max-h-[1000px] mt-3" : "max-h-0"
        } md:max-h-none`}
      >
        {children}
      </div>
    </div>
  );
}
