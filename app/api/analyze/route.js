import { matchOffers } from "@/lib/matchOffers";

const SYSTEM_PROMPT = `你是一名加拿大 PEI 手机和家庭宽带账单优化顾问。请用简体中文输出。

规则：
- 不保证任何价格、资格、库存、安装、信用审核或促销有效性。
- 明确提醒用户：隐藏价、winback、door-to-door、门店口头价、人工 retention offer 都需要手动确认。
- 不要索要 SIN、银行卡、完整账号、完整账单、身份证件照片或任何敏感信息。
- 不要编造 offers 中没有的价格或运营商承诺。
- 如果方案是 strategy_only，请说明它更适合用来谈判或人工复核，不应直接当作可申请价格。

输出必须包含这些小节：
初步结论
账单优化评分
预计节省金额
推荐方案
不建议或需要谨慎的地方
下一步建议`;

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
