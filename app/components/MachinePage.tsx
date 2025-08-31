import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  leftColWidth?: number;
  rightColWidth?: number;
  position?: "left" | "center" | "right";
}

export const  MachinePage: React.FC<Props> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  leftColWidth = 150,
  rightColWidth = 420,
  position = "center"
}) => {
  // แปลงตำแหน่งเป็น class ของ Tailwind justify-*
  const justifyClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[position] || "justify-center";

  return (
    <div
      className={`flex ${justifyClass} items-center space-x-4 mt-4 p-3 bg-gray-100 rounded shadow-md`}
      style={{ width: leftColWidth + rightColWidth + 50 }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
      >
        หน้าแรก
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
      >
        ก่อนหน้า
      </button>
      <span className="font-medium">
        หน้า {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
      >
        ถัดไป
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-200 transition"
      >
        หน้าสุดท้าย
      </button>
    </div>
  );
};
