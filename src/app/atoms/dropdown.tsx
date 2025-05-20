"use client"
import { useState, useRef, useEffect } from "react";
import {
  borderRadiusStyles,
  borderRadiusTopStyles,
  borderRadiusBottomStyles,
} from "../utilities/styles"

interface DropDownProps {
  label: string;
  backgroundColor: string;
  borderRadius: string;
  selectSize: boolean;
  inputSelect: boolean;
}

const DropDown = ({
  label = "select",
  backgroundColor = "black",
  borderRadius = "md",
  selectSize = true,
  inputSelect = true,
}: DropDownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeFocusedIndex, setActiveFocusedIndex] = useState<number | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const items = [
    { name: "Ferrari", title: "Ferrari SF90 Stradale", value: 986 },
    { name: "Lamborghini", title: "Lamborghini Aventador SVJ", value: 759 },
    { name: "McLaren", title: "McLaren 765LT", value: 755 },
    { name: "Bugatti", title: "Bugatti Chiron Super Sport", value: 1578 },
    { name: "Porsche", title: "Porsche 911 Turbo S", value: 641 },
    { name: "Aston Martin", title: "Aston Martin DBS Superleggera", value: 715 },
    { name: "Koenigsegg", title: "Koenigsegg Jesko", value: 1600 },
    { name: "Pagani", title: "Pagani Huayra BC", value: 791 },
    { name: "Chevrolet", title: "Chevrolet Corvette Z06", value: 670 },
    { name: "Dodge", title: "Dodge Challenger SRT Hellcat", value: 717 },
    { name: "Tesla", title: "Tesla Model S Plaid", value: 1020 },
    { name: "Ford", title: "Ford Mustang Shelby GT500", value: 760 },
    { name: "BMW", title: "BMW M5 CS", value: 627 },
    { name: "Audi", title: "Audi RS7 Sportback", value: 591 },
    { name: "Mercedes", title: "Mercedes-AMG GT R", value: 577 },
    { name: "Nissan", title: "Nissan GT-R Nismo", value: 600 },
    { name: "Lexus", title: "Lexus LFA", value: 552 },
    { name: "Toyota", title: "Toyota GR Supra", value: 382 },
    { name: "Subaru", title: "Subaru WRX STI", value: 310 },
    { name: "Honda", title: "Honda NSX Type S", value: 600 },
    { name: "Rimac", title: "Rimac Nevera", value: 1914 },
    { name: "Lotus", title: "Lotus Evija", value: 2000 },
    { name: "Mazda", title: "Mazda RX-7 Spirit R", value: 276 },
    { name: "Alfa Romeo", title: "Alfa Romeo Giulia Quadrifoglio", value: 505 },
    { name: "Peugeot", title: "Peugeot 508 PSE", value: 355 },
    { name: "Jaguar", title: "Jaguar F-Type R", value: 575 },
    { name: "Chrysler", title: "Chrysler 300 SRT", value: 485 },
    { name: "Cadillac", title: "Cadillac CT5-V Blackwing", value: 668 },
    { name: "Hyundai", title: "Hyundai i30 N", value: 276 },
    { name: "Kia", title: "Kia Stinger GT", value: 368 },
  ];

  const handleClick = () => setOpenDropdown((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!openDropdown) {
        setOpenDropdown(true);
        setActiveFocusedIndex(0);
      } else if (openDropdown && activeFocusedIndex !== null) {
        const selectedItem = filteredItems[activeFocusedIndex];
        if (selectedItem) {
          const selectedItemIndex = items.indexOf(selectedItem);
          setSelectedIndex(selectedItemIndex);
          setSearchTerm(selectedItem.title);
        } else if (selectedItem === true) {
          setSelectedIndex(null);
        }
        setOpenDropdown(false);
      } else {
        setOpenDropdown(false);
      }
      return;
    }

    if (!openDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveFocusedIndex((prev) =>
        prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveFocusedIndex((prev) =>
        prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === "Escape") {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    if (activeFocusedIndex !== null) {
      optionRefs.current[activeFocusedIndex]?.scrollIntoView({
        block: "nearest",
      });
      selectRef.current?.focus();
    }
  }, [activeFocusedIndex]);

  const displayLabel =
    selectedIndex !== null
      ? `${items[selectedIndex].title}: ${items[selectedIndex].value} BHP`
      : label;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    setShowBottomFade(distanceFromBottom > 40);
  };

  const lowerSearchTerm = searchTerm.toLowerCase();
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerSearchTerm) ||
      item.title.toLowerCase().includes(lowerSearchTerm) ||
      item.value.toString().includes(lowerSearchTerm)
  );

  // const selectedValue = value !== null ? `${items[value].value}` : ""; (* this is the code to be linked to a onSubmit function *)

  return (
    <div className={`max-w-[500px]`}>
      <div className="relative">
        <div
          className="relative text-left"
          tabIndex={0}
          ref={selectRef}
          onKeyDown={handleKeyDown}
        >
          <div
            style={{
              color: backgroundColor,
            }}
            onClick={handleClick}
            className={`${
              selectSize === true && openDropdown
                ? borderRadiusTopStyles(borderRadius)
                : borderRadiusStyles(borderRadius)
            } transition-all duration-300 ease-in-out cursor-pointer ${
              selectSize ? "flex justify-between w-full" : "inline-flex"
            } items-center gap-2 px-3 py-1.5 text-sm font-semibold relative
            after:absolute after:inset-0 after:bg-current after:brightness-90 overflow-hidden
            `}
          >
            {inputSelect && (
              <input
                type="text"
                placeholder={displayLabel}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setOpenDropdown(true);
                  setActiveFocusedIndex(0);
                }}
                className="text-white placeholder-white z-10 w-full"
              />
            )}
            {!inputSelect && (
              <>
                <span className="text-white z-10">{displayLabel}</span>
              </>
            )}

            <svg
              className="w-4 h-4 ml-2 text-white z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div
          onScroll={handleScroll}
          style={{ ...(backgroundColor && { backgroundColor }) }}
          className={`${
            selectSize ? "" : "mt-2"
          } absolute w-full text-right transition-all duration-300 ease-in-out z-50 overflow-hidden max-h-[322px] overflow-y-auto ${
            openDropdown ? "opacity-100 max-h-[100rem]" : "opacity-0 max-h-0"
          }
            ${
              selectSize === true && openDropdown
                ? borderRadiusBottomStyles(borderRadius)
                : ""
            }
            ${selectSize ? "" : borderRadiusStyles(borderRadius)}
            relative
            `}
        >
          {filteredItems.map((item, index) => {
            const isFocused = activeFocusedIndex === index;
            const actualIndex = items.indexOf(item);
            const isSelected = selectedIndex === actualIndex;

            return (
              <div
                key={index}
                ref={(e) => {
                  optionRefs.current[index] = e;
                }}
                tabIndex={-1}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedIndex(actualIndex);
                  setOpenDropdown(false);
                }}
                onMouseEnter={() => setActiveFocusedIndex(index)}
                className={`
                  cursor-pointer text-center border border-white/5 p-3 text-sm text-white transition outline-none
                  ${isSelected ? "bg-white/10" : ""}
                  ${isFocused ? "bg-white/30" : ""}
                  hover:bg-white/20 w-full text-left overflow-hidden
                  `}
              >
                <div className="w-full bg-transparent border-none outline-none">
                  {`${item.name} — ${item.title}: ${item.value} BHP`}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            openDropdown && showBottomFade ? `opacity-100 ${borderRadiusBottomStyles(borderRadius)}` : "opacity-0"
          } pointer-events-none absolute bottom-0 left-0 w-full h-12 z-50 transition-opacity duration-300 ease-in-out`}
          style={{
            background: `linear-gradient(to top, ${backgroundColor ?? "#22c55e"} 0%, transparent 100%)`,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default DropDown;