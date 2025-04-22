// components/ui/DateTimeInput.tsx
import React, { useState, useEffect } from "react";
import { cn } from "../../../../../lib/utils";

interface DateTimeInputProps {
  initialDate?: string; // Formato ISO (YYYY-MM-DDTHH:MM:SSZ)
  onChange: (isoString: string | undefined) => void;
  dateLabel?: string;
  timeLabel?: string;
  className?: string;
  required?: boolean;
}

export const DateTimeInput = ({
  initialDate,
  onChange,
  dateLabel = "Data (dd/mm/aaaa)",
  timeLabel = "Hora (hh:mm)",
  className = "",
  required = false,
}: DateTimeInputProps) => {
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  // Inicializa os valores sem conversão de fuso horário
  useEffect(() => {
    if (initialDate) {
      try {
        const dateObj = new Date(initialDate);
        if (!isNaN(dateObj.getTime())) {
          // Extrai os valores diretamente da string ISO (sem conversão de fuso)
          const isoDate = initialDate.split("T")[0];
          const [year, month, day] = isoDate.split("-");
          setDateValue(`${day}/${month}/${year}`);

          // Pega o horário exato da string ISO (sem conversão)
          const isoTime = initialDate.split("T")[1]?.substring(0, 5);
          if (isoTime) setTimeValue(isoTime);
        }
      } catch (e) {
        console.error("Error parsing initial date:", e);
      }
    } else {
      setTimeValue("");
      setDateValue("");
    }
  }, [initialDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
    updateDateTime(e.target.value, timeValue);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
    updateDateTime(dateValue, e.target.value);
  };

  const updateDateTime = (dateStr: string, timeStr: string) => {
    if (!dateStr && !timeStr) {
      onChange(undefined);
      return;
    }

    if (!dateStr || !timeStr) {
      return;
    }

    try {
      const [day, month, year] = dateStr.split("/");
      const [hours, minutes] = timeStr.split(":");

      // Cria a string ISO diretamente, sem conversão de fuso
      const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

      // Valida se a data é válida
      const dateObj = new Date(isoString);
      if (isNaN(dateObj.getTime())) {
        onChange(undefined);
      } else {
        onChange(isoString);
      }
    } catch {
      onChange(undefined);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <label className={cn("block text-sm font-medium text-gray-700")}>
          {dateLabel} {required && <span className="text-red-600">*</span>}
        </label>
        <input
          type="text"
          placeholder="dd/mm/aaaa"
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          onBlur={handleDateChange}
          className={cn(
            "w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
          )}
        />
      </div>

      <div>
        <label className={cn("block text-sm font-medium text-gray-700")}>
          {timeLabel} {required && <span className="text-red-600">*</span>}
        </label>
        <input
          type="time"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
          onBlur={handleTimeChange}
          className={cn(
            "w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
          )}
        />
      </div>
    </div>
  );
};
