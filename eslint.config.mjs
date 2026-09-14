import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // prefers-reduced-motion 을 마운트 뒤 동기화하는 패턴이 저장소 전반에 있다.
      // window 는 렌더에서 읽을 수 없어 effect 안의 setState 가 맞는 자리다.
      // 오류가 아니라 경고로 두고, 새로 쓰는 자리에서만 피한다.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]);

export default eslintConfig;
