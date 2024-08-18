"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";

import "@/app/CusCalendar.css";

const CusCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[] | Date | null>(
    null,
  );
  const [showCalculation, setShowCalculation] = useState(false);
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = Array.isArray(selectedDates) ? selectedDates[0] : null;
  const endDate = Array.isArray(selectedDates) ? selectedDates[1] : null;
  const pricePerNight = 100;

  const nights =
    startDate && endDate
      ? Math.floor(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
        )
      : 0;
  const totalPrice = nights * pricePerNight;

  const isDateSelected = (date: Date) => {
    return startDate && endDate && date >= startDate && date <= endDate;
  };

  const handleDateChange = (date: Date | Date[]) => {
    if (!startDate || (startDate && endDate)) {
      setSelectedDates(Array.isArray(date) ? date : [date]);
    } else {
      if (Array.isArray(date) && date[0] >= startDate) {
        setSelectedDates(date);
      } else {
        setSelectedDates(Array.isArray(date) ? date : [date]);
      }
    }
  };

  const handleCalculate = () => {
    if (startDate && endDate) {
      const numberOfNights = Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      );
      const totalPrice = numberOfNights * pricePerNight;
      setShowCalculation(true);
    }
  };

  const handleClearDates = () => {
    setSelectedDates(null);
  };

  const handleReserve = () => {
    if (startDate && endDate) {
      setShowReservationPopup(true);
    }
  };

  const handleReserveClick = () => {
    setShowReservationPopup(true);
  };

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  return (
    <div className="text-start border-4 rounded-[30px] solid border-[#ebebeb] w-[478px] h-full">
      {!showCalculation ? (
        <div>
          <div className="text-[28px] font-bold text-[#313131] leading-normal uppercase pl-7 pt-7 pb-3">
            SELECT CHECK-IN DATE
          </div>
          <div className="text-[18px] font-normal leading-normal text-[#969696] pl-7 pb-7">
            Add your travel dates for exact pricing
          </div>
        </div>
      ) : null}
      <div className="mx-7">
        {!showCalculation ? (
          <Calendar
            onChange={handleDateChange as any}
            selectRange={true}
            tileContent={({ date, view }) => {
              if (view === "month") {
                if (selectedDates === null || isDateSelected(date)) {
                  return null;
                } else if (date < new Date()) {
                  return null;
                } else if (
                  startDate &&
                  endDate &&
                  (date.getMonth() !== startDate.getMonth() ||
                    date.getMonth() !== endDate.getMonth())
                ) {
                  return null;
                }
              }
              return null;
            }}
            tileDisabled={({ date }) => {
              const current = new Date();
              current.setDate(current.getDate() - 1);
              return date < current;
            }}
          />
        ) : null}
      </div>
      {!showCalculation ? (
        <div className="text-right px-10 pt-5">
          <button
            className="text-[20px] font-medium leading-normal underline text-[#313131]"
            onClick={handleClearDates}
          >
            Clear dates
          </button>
        </div>
      ) : null}
      {!showCalculation ? (
        <div>
          <button
            onClick={handleCalculate}
            className="bg-[#313131] rounded-[30px] w-[438px] h-[60px] text-white text-[20px] font-bold leading-normal mt-10 mb-7 mx-5"
          >
            Calculate
          </button>
        </div>
      ) : null}
      {showCalculation && (
        <div className="w-[478px]">
          <div className="text-[38px] font-extrabold leading-[54px] tracking-[7.6px] uppercase text-[#313131] mt-7 mx-7 mb-3">
            Calculation
          </div>
          <div className="mx-7 mb-5 font-medium leading-normal text-[24px] text-[#313131]">
            {startDate?.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}{" "}
            —{" "}
            {endDate?.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="w-[438px] h-[4px] bg-[#ebebeb] mx-5 mt-5">
            {/*underline*/}
          </div>
          <div className="flex flex-row items-center justify-between pt-7 pb-5 px-7">
            <div className="text-[24px] font-medium leading-normal text-[#313131]">
              {`${pricePerNight} $ x ${nights} nights`}
            </div>
            <div className="text-[28px] font-medium leading-normal text-[#313131]">
              {`${totalPrice.toFixed(2)} $`}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between px-7">
            <div className="text-[24px] font-medium leading-normal text-[#313131]">
              Discount
            </div>
            <div className="text-[28px] font-medium leading-normal text-[#313131]">
              20.00 $
            </div>
          </div>
          <div className="w-[438px] h-[4px] bg-[#ebebeb] mx-5 mt-7">
            {/*underline*/}
          </div>
          <div className="pt-8 px-7 pb-10 flex flex-row items-center justify-between">
            <div className="text-[24px] font-medium leading-normal text-[#313131] uppercase">
              total
            </div>
            <div className="text-[28px] font-bold leading-normal text-[#313131]">
              {`${(totalPrice - 20).toFixed(2)} $`}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="">
              <button
                onClick={handleReserve}
                className="bg-[#313131] rounded-[30px] w-[438px] h-[60px] text-white text-[20px] font-bold leading-normal text-center"
              >
                Reserve
              </button>
            </div>
            <div className="pt-7 pb-10">
              <button
                onClick={() => setShowCalculation(false)}
                className="text-[#313131] text-[24px] font-medium leading-normal underline"
              >
                Go back to calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CusCalendar;
