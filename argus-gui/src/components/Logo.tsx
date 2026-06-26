import React from "react";
import { SvgXml } from "react-native-svg";

/**
 * Inlined as a string (rather than imported from assets/argus-logo.svg)
 * to avoid needing react-native-svg-transformer + Metro config changes.
 * Keep this in sync with assets/argus-logo.svg if you edit the mark —
 * that file is the source of truth for design tools/exports; this is
 * just the in-app render path.
 */
const LOGO_XML = `
<svg width="220" height="64" viewBox="0 0 220 64" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(2,2)">
    <path
      d="M30 4 C42 4 52 12 56 22 C58 27 57 32 53 35 L44 41 C46 45 45 49 41 51 L33 55 C28 57 22 56 18 52 C10 47 5 38 6 28 C7 16 17 5 30 4 Z"
      fill="#1f6f78"
    />
    <path d="M53 35 L60 33 L54 40 Z" fill="#e8a23c" />
    <circle cx="32" cy="24" r="10" fill="#fdf6ec" />
    <circle cx="33" cy="24" r="6" fill="#1a1a1a" />
    <circle cx="35.5" cy="21.5" r="1.6" fill="#fdf6ec" />
    <path
      d="M22 15 C27 11 36 11 41 15"
      stroke="#0f4a50"
      stroke-width="2.5"
      fill="none"
      stroke-linecap="round"
    />
  </g>
  <text
    x="78"
    y="42"
    font-family="Helvetica Neue, Arial, sans-serif"
    font-size="30"
    font-weight="600"
    letter-spacing="0.5"
    fill="#1f2937"
  >argus</text>
</svg>
`;

type Props = {
  width?: number;
  height?: number;
};

export default function Logo({ width = 180, height = 52 }: Props) {
  return <SvgXml xml={LOGO_XML} width={width} height={height} />;
}
