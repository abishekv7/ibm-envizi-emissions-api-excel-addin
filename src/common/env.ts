// Copyright IBM Corp. 2025, 2026

export type EnvType = "prod";
export type ApiId = "saascore" | "ghgemissions";

declare global {
  interface Window {
    envType?: EnvType;
    enableEnviziLogin?: boolean;
  }
}

export const apiUrls: Record<ApiId, Record<EnvType, string>> = {
  saascore: {
    prod: "https://api.ibm.com/saascore/run",
  },
  ghgemissions: {
    prod: "https://api.ibm.com/ghgemissions/run",
  },
};

export const apiHomeUrls: Record<EnvType, string> = {
  prod: "https://www.app.ibm.com/envizi/emissions-api-home",
};

export const enviziUiOrigins: Record<EnvType, string> = {
  prod: "https://envizi.ibm.com",
};

export const enviziApiOrigins: Record<EnvType, string> = {
  prod: "https://envizi.ibm.com",
};

export const enviziGraphQLUrls: Record<string, string> = {
  "https://envizi.ibm.com": "https://envizi.ibm.com/graphqlapi-uxm",
};

export const enviziApiHomeUrls: Record<EnvType, string> = {
  prod: `${getEnviziUiOrigin("prod")}/emissions`,
};

function detectEnvType(): EnvType {
  return "prod";
}

export function getEnvType(): EnvType {
  if (!window.envType) {
    window.envType = detectEnvType();
  }
  return window.envType;
}

export function getApiUrl(api: ApiId, envType?: EnvType) {
  return apiUrls[api][envType || getEnvType()];
}

export function getApiHomeUrl(): string {
  const envType = getEnvType();
  return apiHomeUrls[envType];
}

export function getEnviziApiHomeUrl(): string {
  const envType = getEnvType();
  return enviziApiHomeUrls[envType];
}

/**
 * Gets the CUI overview dashboard URL for API key authentication
 * @deprecated This function will be removed once Preview is over
 */
export function getOverviewDashboardUrl(): string {
  return `${getApiHomeUrl()}/overview`;
}

/**
 * Gets the Envizi Excel add-in overview URL for token-based authentication (GA)
 */
export function getEnviziExcelAddInOverviewUrl(): string {
  return `${getEnviziApiHomeUrl()}/excel-add-in-overview`;
}

export function getAccountUsageUrl(): string {
  return `${getEnviziApiHomeUrl()}/account-usage`;
}

export function getEnviziUiOrigin(envType?: EnvType): string {
  const override = window.localStorage.getItem("enviziUiOrigin");
  return override || enviziUiOrigins[envType || getEnvType()];
}

export function getEnviziApiOrigin(envType?: EnvType): string {
  const override = window.localStorage.getItem("enviziApiOrigin");
  return override || enviziApiOrigins[envType || getEnvType()];
}

export function getEnviziGraphQLUrl(envType?: EnvType): string {
  const apiOrigin = getEnviziApiOrigin(envType);
  return enviziGraphQLUrls[apiOrigin];
}

export function getEnableEnviziLogin(): boolean {
  if (window.enableEnviziLogin === undefined) {
    const enableOverride = window.localStorage.getItem("enableEnviziLogin");
    window.enableEnviziLogin = enableOverride ? enableOverride === "true" : true;
  }
  return window.enableEnviziLogin;
}

/**
 * Gets the IBM Store URL for purchasing the Envizi Excel add-in
 * This function can be extended to support language/locale-specific URLs in the future
 */
export function getBuyNowUrl(): string {
  return "https://www.ibm.com/store/en/us/products/EIDSBEJC";
}

export function getPricingPageUrl(): string {
  return "https://www.ibm.com/products/envizi/pricing";
}
