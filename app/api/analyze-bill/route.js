const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILE_COUNT = 3;

export const runtime = "nodejs";

const BILL_ANALYSIS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    provider: {
      type: "string",
      enum: ["bell_aliant", "eastlink", "koodo", "telus", "public_mobile", "purple_cow", "xplore", "starlink", "other", "unknown"]
    },
    serviceType: {
      type: "string",
      enum: ["internet", "mobile", "bundle", "unknown"]
    },
    bundleType: {
      type: "string",
      enum: ["internet_tv", "internet_tv_home_phone", "internet_mobile", "internet_mobile_tv", "other_or_not_sure", ""]
    },
    monthlyBill: { type: ["number", "null"] },
    internetSpeedMbps: { type: ["number", "null"] },
    mobileDataGB: { type: ["number", "null"] },
    mobileLineCount: { type: ["number", "null"] },
    hasTvService: { type: ["boolean", "null"] },
    hasHomePhone: { type: ["boolean", "null"] },
    contractStatus: {
      type: "string",
      enum: ["no_contract", "in_contract", "not_sure"]
    },
    contractEndDate: { type: "string" },
    confidence: { type: "number", minimum: 0, maximum: 1 },
    notes: { type: "string" }
  },
  required: [
    "provider",
    "serviceType",
    "bundleType",
    "monthlyBill",
    "internetSpeedMbps",
    "mobileDataGB",
    "mobileLineCount",
    "hasTvService",
    "hasHomePhone",
    "contractStatus",
    "contractEndDate",
    "confidence",
    "notes"
  ]
};

const SYSTEM_PROMPT = `You are extracting structured data from Canadian telecom bills or screenshots for a bill comparison tool in Prince Edward Island, Canada.

Extract only facts visible or strongly implied from the bill.
Do not invent missing information.
If a value is not visible, use null or "unknown".
Return JSON only.

Fields:
provider, serviceType, bundleType, monthlyBill, internetSpeedMbps, mobileDataGB, mobileLineCount, hasTvService, hasHomePhone, contractStatus, contractEndDate, confidence, notes.
Use an empty string for contractEndDate if it is not visible.

Provider mapping:
- Bell Aliant / Bell = bell_aliant
- Eastlink = eastlink
- Koodo = koodo
- TELUS = telus
- Public Mobile = public_mobile
- Purple Cow = purple_cow
- Xplore = xplore
- Starlink = starlink

Service type:
- internet if only internet is visible
- mobile if only mobile service is visible
- bundle if multiple services are visible, such as internet + TV, internet + mobile, TV, home phone, or bundle charges
- unknown if unclear

Bundle type:
- internet_tv if internet and TV are visible
- internet_tv_home_phone if internet, TV, and home phone are visible
- internet_mobile if internet and mobile are visible
- internet_mobile_tv if internet, mobile, and TV are visible
- other_or_not_sure if multiple services exist but exact type is unclear

Monthly bill:
Extract the recurring monthly amount, preferably before one-time charges.
If taxes are included, still extract the visible monthly total and mention tax ambiguity in notes.`;

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

async function fileToDataUrl(file) {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${file.type};base64,${base64}`;
}

function getOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function normalizeResult(value) {
  return {
    provider: value.provider || "unknown",
    serviceType: value.serviceType || "unknown",
    bundleType: value.bundleType || "",
    monthlyBill: typeof value.monthlyBill === "number" ? value.monthlyBill : null,
    internetSpeedMbps: typeof value.internetSpeedMbps === "number" ? value.internetSpeedMbps : null,
    mobileDataGB: typeof value.mobileDataGB === "number" ? value.mobileDataGB : null,
    mobileLineCount: typeof value.mobileLineCount === "number" ? value.mobileLineCount : null,
    hasTvService: typeof value.hasTvService === "boolean" ? value.hasTvService : null,
    hasHomePhone: typeof value.hasHomePhone === "boolean" ? value.hasHomePhone : null,
    contractStatus: value.contractStatus || "not_sure",
    contractEndDate: value.contractEndDate || "",
    confidence: typeof value.confidence === "number" ? Math.max(0, Math.min(1, value.confidence)) : 0,
    notes: value.notes || ""
  };
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = [...formData.getAll("files[]"), ...formData.getAll("files")].filter(
      (file) => file && typeof file.arrayBuffer === "function"
    );

    if (!files.length) return jsonResponse({ success: false, error: "Please select at least one file." }, 400);
    if (files.length > MAX_FILE_COUNT) return jsonResponse({ success: false, error: "Please upload no more than 3 files." }, 400);

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return jsonResponse({ success: false, error: "Only JPG, PNG, WEBP, or PDF files are supported." }, 400);
      }
      if (file.size > MAX_FILE_SIZE) {
        return jsonResponse({ success: false, error: "Each file must be under 10MB." }, 400);
      }
    }

    if (!process.env.OPENAI_API_KEY) {
      return jsonResponse({ success: false, error: "Missing OPENAI_API_KEY" }, 500);
    }

    const content = [
      {
        type: "input_text",
        text: "Analyze the attached PEI telecom bill file(s). Return JSON only."
      }
    ];

    for (const file of files) {
      const dataUrl = await fileToDataUrl(file);
      if (file.type === "application/pdf") {
        content.push({
          type: "input_file",
          filename: file.name || "bill.pdf",
          file_data: dataUrl
        });
      } else {
        content.push({
          type: "input_image",
          image_url: dataUrl
        });
      }
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_BILL_ANALYSIS_MODEL || process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: [
          { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
          { role: "user", content }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "bill_analysis",
            schema: BILL_ANALYSIS_SCHEMA,
            strict: true
          }
        }
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return jsonResponse({ success: false, error: "Could not analyze bill.", detail }, 502);
    }

    const data = await response.json();
    const text = getOutputText(data);
    const parsed = JSON.parse(text);

    return jsonResponse({
      success: true,
      data: normalizeResult(parsed)
    });
  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: "Could not analyze bill.",
        detail: error.message
      },
      400
    );
  }
}
