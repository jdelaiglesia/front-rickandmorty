import React, { useState, useEffect } from "react";

/**
 * Neonizer component applies vibrant neon color effects to text content.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The text content to be styled with neon effect.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {number} [props.time=2000] - Time interval in milliseconds for color change (default: 2000ms).
 * @param {string[]} [props.excludeColors=[]] - Colors to exclude from the random selection.
 * @param {string[]} [props.newColors=[]] - Additional colors to include in the random selection.
 * @returns {JSX.Element} - JSX element with the styled neon text.
 */
const Neonizer = ({
  children,
  className = "",
  time = 2000,
  excludeColors = [],
  newColors = [],
}) => {
  const [currentColor, setCurrentColor] = useState("");

  const baseColors = [
    "#1f51ff", // neon_blue
    "#0ff0fc", // electric_cyan
    "#bc13fe", // neon_purple
    "#8a2be2", // proton_purple
    "#ff44cc", // neon_pink
    "#ea00ff", // neon_magenta
    "#ff1493", // plastic_pink
    "#fff01f", // neon_yellow
    "#e7ee4f", // absinthe
    "#dfff00", // chartreuse_yellow
    "#ff3131", // neon_red
    "#ff5e00", // electric_orange
    "#39ff14", // neon_green
    "#7fff00", // ufo_green
    "#ccff00", // electric_lime
  ];

  const normalizeColorCode = (color) => {
    if (!color.startsWith("#")) {
      return `#${color}`;
    }
    return color;
  };

  const normalizeColors = (colors) => {
    return colors.map((color) => normalizeColorCode(color));
  };

  // Filtering out empty strings from newColors and excludeColors
  const filteredNewColors = newColors.filter((color) => color.trim() !== "");
  const filteredExcludeColors = excludeColors.filter(
    (color) => color.trim() !== ""
  );

  const colors = [
    ...normalizeColors(baseColors),
    ...normalizeColors(filteredNewColors),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(getRandomColor(colors, filteredExcludeColors));
    }, time);

    return () => clearInterval(interval);
  }, []);

  const getRandomColor = (colors, exclude) => {
    let updatedColors = colors.filter(
      (color) => !exclude.includes(normalizeColorCode(color))
    );
    return updatedColors[Math.floor(Math.random() * updatedColors.length)];
  };

  const neonStyle = {
    color: currentColor,
    transitionProperty: "all",
    transitionDuration: "500ms",
  };

  return (
    <span className={`${className}`} style={neonStyle}>
      {children}
    </span>
  );
};

export default Neonizer;
