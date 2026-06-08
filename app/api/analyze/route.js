import { matchOffers } from "@/lib/matchOffers";

const SYSTEM_PROMPT = `You are a PEI, Canada mobile and home internet bill optimization assistant.

Language:
- If user_profile.language is zhHans, write in Simplified Chinese.
- If user_profile.language is zhHant, write in Traditional Chinese.
- If user_profile.language is en, write in English.
- Default to Simplified Chinese if language is missing.

Rules:
- Do not guarantee prices, savings, eligibility, inventory, installation, taxes, equipment fees, credit checks, or promotion validity.
- Refer to promotions as available weekly offers. In Simplified Chinese use 本周可用优惠. In Traditional Chinese use 本週可用優惠.
- Do not use language that implies secret or unpublished discounts.
- Clearly state that weekly and manually confirmed offers require confirmation by the provider or an authorized sales representative.
- When an offer has price_display set to manual_confirmation, do not reveal its exact reference price. Estimated savings supplied by the matching system may still be shown, but must be described as an estimate requiring confirmation.
- Do not ask for SIN, bank card details, full account numbers, full bills, identity-document photos, or sensitive information.
- Do not invent prices or provider promises that are not present in the offers data.
- If an offer is strategy_only, explain that it is better for negotiation or manual review and should not be treated as a directly available application price.

Output sections:
- For zhHans: 初步结论, 账单优化评分, 预计节省金额, 推荐方案, 不建议或需要谨慎的地方, 下一步建议
- For zhHant: 初步結論, 帳單優化評分, 預計節省金額, 推薦方案, 不建議或需要謹慎的地方, 下一步建議
- For en: Initial conclusion, Bill optimization score, Estimated savings, Recommended options, Not recommended or use caution, Next steps`;

export async function POST(request) {
  try {
    const profile = await request.json();
    const matchedOffers = matchOffers(profile);

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: "Missing OPENAI_API_KEY",
          matchedOffers
        },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: JSON.stringify(
              {
                province: "PEI",
                user_profile: profile,
                matched_offers: matchedOffers
              },
              null,
              2
            )
          }
        ]
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return Response.json(
        {
          error: "OpenAI request failed",
          detail,
          matchedOffers
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const report = data.choices?.[0]?.message?.content?.trim();

    return Response.json({
      report,
      matchedOffers
    });
  } catch (error) {
    return Response.json(
      {
        error: "Analyze request failed",
        detail: error.message
      },
      { status: 400 }
    );
  }
}
