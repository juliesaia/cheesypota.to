import solid from "solid-start/vite";
import Unocss from "unocss/vite";
import viteCompression from "vite-plugin-compression";
import { defineConfig } from "vite";
import {
  presetWind,
  presetAttributify,
  presetIcons,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  plugins: [
    solid(),
    Unocss({
      presets: [presetWind(), presetAttributify(), presetIcons()],
      shortcuts: [
        {
          input:
            "pl-2 py-2 my-5 rounded-md focus-visible:outline-0 focus-visible:bg-gray-200 transition-colors",
          logos:
            "w-full p-6 flex justify-evenly children:w-full children:text-5xl",
          labels:
            "w-full bg-green-300 h-8 text-black flex justify-evenly text-center px-6 children:w-full",
          link: "border-4 mx-4 px-6 py-3 rounded-xl flex items-center transition-colors hover:(text-black)",
        },
      ],
      transformers: [transformerVariantGroup()],
      safelist: [
        '[min-h="[calc(100vh_-_0px)]"]',
        '[min-h="[calc(100vh_-_64px)]"]',
        '[h="16"]',
      ],
      preflights: [
        {
          getCSS: ({ theme }) => `
        @font-face {
          font-family: 'Nunito';
          font-style: normal;
          font-weight: 300;
          src: url(https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhdTQ3jw.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          font-display: swap;
        }
        body {
          font-family: nunito, sans-serif; 
          overflow-y: overlay;
          
        }
        ::-webkit-scrollbar {
          width: 0.6rem;
        }
        
        ::-webkit-scrollbar-track {
          background: auto;
          border-radius: 1rem;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,.5);
          border-radius: 1rem;
          box-shadow: inset 0 0 0.6rem rgba(0, 0, 0, 0.2);
          transition: all 500ms;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,.15);
        }
      `,
        },
      ],
    }),
    viteCompression({ algorithm: "brotliCompress" }),
  ],
});
