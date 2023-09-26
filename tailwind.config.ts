import tailwindcssTypography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  plugins: [tailwindcssTypography(), daisyui],
} satisfies Config;
