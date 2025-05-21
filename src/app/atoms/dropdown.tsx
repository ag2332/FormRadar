"use client";
import { useState, useRef, useEffect } from "react";
import {
  borderRadiusStyles,
  borderRadiusTopStyles,
  borderRadiusBottomStyles,
} from "../utilities/styles";

interface DropDownProps {
  label: string;
  backgroundColor: string;
  borderRadius: string;
  selectSize: boolean;
  inputSelect: boolean;
}

const DropDown = ({
  label = "select",
  backgroundColor = "white",
  borderRadius = "3xl",
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
    { name: "Erling Haaland", title: "Manchester City - Forward", value: 14.0 },
    { name: "Mohamed Salah", title: "Liverpool - Midfielder", value: 13.0 },
    { name: "Bukayo Saka", title: "Arsenal - Midfielder", value: 9.0 },
    { name: "Son Heung-min", title: "Tottenham - Midfielder", value: 9.5 },
    { name: "Bruno Fernandes", title: "Manchester United - Midfielder", value: 8.5 },
    { name: "Ollie Watkins", title: "Aston Villa - Forward", value: 8.0 },
    { name: "Kevin De Bruyne", title: "Manchester City - Midfielder", value: 10.5 },
    { name: "Jarrod Bowen", title: "West Ham - Midfielder", value: 7.5 },
    { name: "Dominic Solanke", title: "Bournemouth - Forward", value: 7.0 },
    { name: "James Maddison", title: "Tottenham - Midfielder", value: 7.5 },
    { name: "Darwin Núñez", title: "Liverpool - Forward", value: 7.5 },
    { name: "Eberechi Eze", title: "Crystal Palace - Midfielder", value: 6.5 },
    { name: "Marcus Rashford", title: "Manchester United - Midfielder", value: 8.5 },
    { name: "James Ward-Prowse", title: "West Ham - Midfielder", value: 6.0 },
    { name: "Kai Havertz", title: "Arsenal - Midfielder", value: 7.0 },
    { name: "Alexander Isak", title: "Newcastle - Forward", value: 8.0 },
    { name: "Cole Palmer", title: "Chelsea - Midfielder", value: 6.0 },
    { name: "Morgan Gibbs-White", title: "Nottingham Forest - Midfielder", value: 6.0 },
    { name: "Anthony Gordon", title: "Newcastle - Midfielder", value: 6.5 },
    { name: "Luis Díaz", title: "Liverpool - Midfielder", value: 7.5 },
    { name: "Phil Foden", title: "Manchester City - Midfielder", value: 8.5 },
    { name: "Bryan Mbeumo", title: "Brentford - Midfielder", value: 6.5 },
    { name: "Douglas Luiz", title: "Aston Villa - Midfielder", value: 5.5 },
    { name: "João Pedro", title: "Brighton - Forward", value: 5.5 },
    { name: "James Tarkowski", title: "Everton - Defender", value: 4.5 },
    { name: "Joachim Andersen", title: "Crystal Palace - Defender", value: 4.5 },
    { name: "Leon Bailey", title: "Aston Villa - Midfielder", value: 5.5 },
    { name: "Pedro Neto", title: "Wolves - Midfielder", value: 5.5 },
    { name: "Hwang Hee-chan", title: "Wolves - Forward", value: 5.5 },
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
      ? `${items[selectedIndex].name}, ${items[selectedIndex].title}: ${items[selectedIndex].value} Mil`
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
    <div className="w-full">
      <div className="relative w-full">
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
            } items-center gap-2 px-6 py-5.5 text-md font-semibold relative
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
                className="text-[#38003c] z-10 w-full"
              />
            )}
            {!inputSelect && (
              <>
                <span className="text-[#38003c] z-10">{displayLabel}</span>
              </>
            )}

            <svg
              className="w-8 h-8 ml-2 text-[#38003c] z-10"
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
          } absolute w-full text-right transition-all duration-300 ease-in-out z-50 overflow-hidden overflow-y-auto ${
            openDropdown ? "opacity-100 max-h-[322px]" : "opacity-0 max-h-0"
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
                  cursor-pointer text-center border border-white/5 p-3 text-sm text-[#38003c] transition outline-none
                  ${isSelected ? "bg-white/10" : ""}
                  ${isFocused ? "bg-white/30" : ""}
                  hover:bg-white/20 w-full text-left overflow-hidden
                  `}
              >
                <div className="w-full bg-transparent border-none outline-none">
                  {`${item.name} — ${item.title}: ${item.value} Mil`}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${
            openDropdown && showBottomFade
              ? `opacity-100 ${borderRadiusBottomStyles(borderRadius)}`
              : "opacity-0"
          } pointer-events-none absolute bottom-0 left-0 w-full h-12 z-50 transition-opacity duration-300 ease-in-out`}
          style={{
            background: `linear-gradient(to top, ${
              backgroundColor ?? "#22c55e"
            } 0%, transparent 100%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DropDown;
