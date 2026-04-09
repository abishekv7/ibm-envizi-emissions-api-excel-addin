// Copyright IBM Corp. 2026

import { EnvType, getEnviziUiOrigin, getEnvType } from "../common/env";

/* global Office */

export const loginUrls: Record<EnvType, string> = {
  prod: `${getEnviziUiOrigin("prod")}/emissions-excel-login/login`,
};

Office.onReady(() => {
  window.location.href = loginUrls[getEnvType()];
});
