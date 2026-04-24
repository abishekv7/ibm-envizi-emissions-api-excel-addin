// Copyright IBM Corp. 2026

import axios from "axios";

export class CoreEnviziAuth {
  async exchangeToken(token: string): Promise<string> {
    const tokenExchangeUrl = "https://api.ibm.com/saascore/bluerun/envizi-auth/exchange";
    const enviziTokenExchangeClientId = "[REDACTED]";
    const response = await axios.post<string>(tokenExchangeUrl, null, {
      headers: { authorization: `Bearer ${token}`, "x-ibm-client-id": enviziTokenExchangeClientId },
      responseType: "text",
    });
    return response.data;
  }
}

export const coreEnviziAuth = new CoreEnviziAuth();
