import React, { useState, useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  leftColWidth?: number;
  rightColWidth?: number;
  position?: "left" | "center" | "right";
  scroll: boolean;
}

export const MachinePage: React.FC<Props> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  leftColWidth = 150,
  rightColWidth = 420,
  position = "center",
  scroll = false,
}) => {
  const [jumpPage, setJumpPage] = useState(currentPage);

  // 👉 Scroll to top on page change (เฉพาะถ้า scroll เป็น true)
  useEffect(() => {
    if (scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, scroll]); // อย่าลืมใส่ scroll ใน dependency array ด้วย

  const justifyClass = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  }[position] || "justify-center";

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 3;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 border rounded ${
            i === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div
      className={`flex ${justifyClass} items-center flex-wrap space-x-2 mt-4 p-3 bg-gray-100 rounded shadow-md`}
      style={{ width: leftColWidth + rightColWidth + 50, whiteSpace: "nowrap" } }
    >
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
      >
        หน้าแรก
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
      >
        ก่อนหน้า
      </button>

      {/* ✅ ปุ่มเลขหน้า */}
      {renderPageButtons()}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
      >
        ถัดไป
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
      >
        หน้าสุดท้าย
      </button>

      {/* ✅ Jump ไปหน้าที่ต้องการ */}
      <div className="flex items-center space-x-2 ml-4">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={() => goToPage(jumpPage)}
          className="px-2 py-1 border rounded hover:bg-gray-200"
        >
          ไป
        </button>
      </div>
    </div>
  );
};
