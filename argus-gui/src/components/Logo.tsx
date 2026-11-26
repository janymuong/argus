import React from "react";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  compact?: boolean;
};

export default function Logo({
  width = 176,
  height = 52,
  compact = false,
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 220 64">
      <Path
        d="M30 4 C42 4 52 12 56 22 C58 27 57 32 53 35 L44 41 C46 45 45 49 41 51 L33 55 C28 57 22 56 18 52 C10 47 5 38 6 28 C7 16 17 5 30 4 Z"
        fill="#2A9DA6"
      />
      <Path d="M53 35 L61 33 L54 41 Z" fill="#E8A23C" />
      <Circle cx="32" cy="25" r="12" fill="#E8F1F2" />
      <Circle cx="33" cy="25" r="7" fill="#0B252B" />
      <Circle cx="35.5" cy="22.5" r="2" fill="#FFFFFF" />
      <Path
        d="M21 15 C27 10 37 10 43 15"
        stroke="#0B252B"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {!compact && (
        <SvgText
          x="78"
          y="43"
          fill="#E8F1F2"
          fontSize="30"
          fontWeight="700"
          letterSpacing="0.4"
        >
          argus
        </SvgText>
      )}
    </Svg>
  );
}
