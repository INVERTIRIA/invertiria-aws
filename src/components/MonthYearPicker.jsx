import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const MonthYearPicker = ({ value, onChange }) => {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    value?.getFullYear() ?? today.getFullYear()
  );

  const handleSelect = (monthIndex) => {
    const selectedDate = new Date(selectedYear, monthIndex);
    onChange?.(selectedDate);
    setOpen(false);
  };

  const selectedLabel = value
    ? `${months[value.getMonth()]} ${value.getFullYear()}`
    : "Selecciona mes y año";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start text-left">
          {selectedLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedYear((y) => y - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-semibold">{selectedYear}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedYear((y) => y + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full"
              onClick={() => handleSelect(index)}
            >
              {month.substring(0, 3)}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MonthYearPicker;
