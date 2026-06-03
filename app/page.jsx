"use client";

import { useMemo, useState } from "react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyIzob_u06H4LUyIE783HC9O9K_XmCckwyKz3u8y2h05MHX__C4XZ-9DskK__XBcBltxw/exec";

const languages = [
  { code: "zhHans", label: "简" },
  { code: "zhHant", label: "繁" },
  { code: "en", label: "EN" }
];

const translations = {
  zhHans: {
    languageName: "简体中文",
    eyebrow: "仅限 PEI · v1",
    title: "Bill Saver｜PEI 手机宽带账单免费体检",
    hero:
      "输入你现在的宽带或手机套餐，系统会匹配本周可用优惠，保守估算可能节省金额，并生成账单优化报告。",
    formTitle: "套餐信息",
    province: "默认地区：Prince Edward Island",
    serviceType: "服务类型",
    city: "城市",
    internetTitle: "家庭宽带",
    internetProvider: "当前宽带运营商",
    internetMonthlyPrice: "宽带月费",
    internetPricePlaceholder: "例如 95",
    priceType: "价格类型",
    internetSpeed: "当前速度",
    internetBundle: "捆绑情况",
    householdSize: "家庭人数",
    internetUsage: "宽带用途",
    mobileTitle: "手机套餐",
    mobileProvider: "当前手机运营商",
    mobileMonthlyPrice: "手机月费",
    mobilePricePlaceholder: "例如 55",
    mobileData: "每月流量",
    isByod: "是否自带手机 BYOD",
    mobileNeeds: "手机需求",
    otherTitle: "其他信息",
    postalPrefix: "邮编前三位",
    postalPlaceholder: "例如 C1A",
    contractStatus: "合约状态",
    willingToSwitch: "是否愿意换运营商",
    mainPriority: "主要优先级",
    contact: "联系方式（选填）",
    name: "姓名（选填）",
    email: "邮箱（选填）",
    phone: "电话（选填）",
    preferredContact: "偏好联系方式",
    wechat: "微信（选填）",
    referralCode: "推荐码（选填）",
    notes: "备注",
    submit: "生成免费体检报告",
    submitting: "提交中...",
    sheetSuccess: "已收到你的账单信息。我们会人工查看你填写的内容，并结合 PEI 本地本周可用优惠进行初步判断。",
    sheetError: "提交失败，请稍后再试，或直接通过电话 / 邮箱联系我们。",
    loading: "正在分析你的套餐……",
    resultTitle: "分析结果",
    resultSubtitle: "报告会显示在这里",
    emptyState: "填写左侧信息后，系统会生成初步节省建议。",
    fallbackError: "分析失败，请稍后再试。",
    fallbackReport: "暂时没有生成结果，请稍后再试。",
    disclaimer:
      "本工具仅提供初步分析。本周可用优惠、最终价格、资格、地址可用性、安装、税费、设备费和信用审核，均必须由运营商或授权销售代表确认。",
    manualReview: "我想人工复核",
    groupCta: "加入 PEI 账单省钱群",
    modalTitle: "人工复核",
    modalIntro: "留下联系方式和补充说明，我们会按你填写的账单信息进行人工初步判断。",
    modalSubmit: "提交人工复核",
    modalClose: "关闭",
    footer:
      "请勿提交 SIN、银行卡、完整账号、完整账单或身份证件照片。本工具只需要大概套餐信息来做初步判断。",
    options: {
      internet: "宽带",
      mobile: "手机",
      both: "两者都看",
      other: "其他",
      notSure: "不确定",
      before_tax: "税前",
      after_tax: "税后",
      not_sure: "不确定",
      under_100: "低于 100 Mbps",
      "100_300": "100-300 Mbps",
      "500": "500 Mbps",
      "1g": "1 Gbps",
      "1_5g": "1.5 Gbps",
      "3g": "3 Gbps",
      internet_only: "仅宽带",
      internet_tv: "宽带 + 电视",
      internet_home_phone: "宽带 + 家庭电话",
      internet_tv_home_phone: "宽带 + 电视 + 家庭电话",
      "1": "1 人",
      "2": "2 人",
      "3_4": "3-4 人",
      "5_plus": "5 人以上",
      normal_browsing: "日常浏览",
      streaming_4k: "4K 视频",
      remote_work: "远程办公",
      gaming: "游戏",
      uploading_files: "上传文件",
      many_users: "多人使用",
      online_school: "网课",
      under_10gb: "低于 10GB",
      "10_30gb": "10-30GB",
      "30_60gb": "30-60GB",
      "60_100gb": "60-100GB",
      "100gb_plus": "100GB 以上",
      unlimited: "无限流量",
      yes: "是",
      no: "否",
      cheapest: "越便宜越好",
      needs_5g: "需要 5G",
      us_roaming: "美国漫游",
      lots_of_data: "大流量",
      stable_signal: "信号稳定",
      in_store_support: "需要门店支持",
      family_lines: "家庭多条线",
      just_checking: "先了解一下",
      no_contract: "无合约",
      contract: "有合约",
      promo_ending: "优惠快结束",
      maybe: "可以考虑",
      save_money: "省钱优先",
      stability: "稳定优先",
      speed_or_data: "速度/流量优先",
      low_hassle: "少折腾",
      retention_first: "先谈保留优惠",
      email: "邮箱",
      phone: "电话",
      wechat: "微信"
    }
  },
  zhHant: {
    languageName: "繁體中文",
    eyebrow: "僅限 PEI · v1",
    title: "Bill Saver｜PEI 手機寬頻帳單免費體檢",
    hero:
      "輸入你現在的寬頻或手機方案，系統會匹配本週可用優惠，保守估算可能節省金額，並生成帳單優化報告。",
    formTitle: "方案資訊",
    province: "預設地區：Prince Edward Island",
    serviceType: "服務類型",
    city: "城市",
    internetTitle: "家庭寬頻",
    internetProvider: "目前寬頻業者",
    internetMonthlyPrice: "寬頻月費",
    internetPricePlaceholder: "例如 95",
    priceType: "價格類型",
    internetSpeed: "目前速度",
    internetBundle: "綁定情況",
    householdSize: "家庭人數",
    internetUsage: "寬頻用途",
    mobileTitle: "手機方案",
    mobileProvider: "目前手機業者",
    mobileMonthlyPrice: "手機月費",
    mobilePricePlaceholder: "例如 55",
    mobileData: "每月流量",
    isByod: "是否自備手機 BYOD",
    mobileNeeds: "手機需求",
    otherTitle: "其他資訊",
    postalPrefix: "郵遞區號前三碼",
    postalPlaceholder: "例如 C1A",
    contractStatus: "合約狀態",
    willingToSwitch: "是否願意轉業者",
    mainPriority: "主要優先順序",
    contact: "聯絡方式（選填）",
    name: "姓名（選填）",
    email: "電郵（選填）",
    phone: "電話（選填）",
    preferredContact: "偏好聯絡方式",
    wechat: "微信（選填）",
    referralCode: "推薦碼（選填）",
    notes: "備註",
    submit: "生成免費體檢報告",
    submitting: "提交中...",
    sheetSuccess: "已收到你的帳單資訊。我們會人工查看你填寫的內容，並結合 PEI 本地本週可用優惠進行初步判斷。",
    sheetError: "提交失敗，請稍後再試，或直接透過電話 / 電郵聯絡我們。",
    loading: "正在分析你的方案……",
    resultTitle: "分析結果",
    resultSubtitle: "報告會顯示在這裡",
    emptyState: "填寫左側資訊後，系統會生成初步節省建議。",
    fallbackError: "分析失敗，請稍後再試。",
    fallbackReport: "暫時沒有生成結果，請稍後再試。",
    disclaimer:
      "本工具僅提供初步分析。本週可用優惠、最終價格、資格、地址可用性、安裝、稅費、設備費和信用審核，均必須由營運商或授權銷售代表確認。",
    manualReview: "我想人工複核",
    groupCta: "加入 PEI 帳單省錢群",
    modalTitle: "人工複核",
    modalIntro: "留下聯絡方式和補充說明，我們會按你填寫的帳單資訊進行人工初步判斷。",
    modalSubmit: "提交人工複核",
    modalClose: "關閉",
    footer:
      "請勿提交 SIN、銀行卡、完整帳號、完整帳單或身分證件照片。本工具只需要大概方案資訊來做初步判斷。",
    options: {
      internet: "寬頻",
      mobile: "手機",
      both: "兩者都看",
      other: "其他",
      notSure: "不確定",
      before_tax: "稅前",
      after_tax: "稅後",
      not_sure: "不確定",
      under_100: "低於 100 Mbps",
      "100_300": "100-300 Mbps",
      "500": "500 Mbps",
      "1g": "1 Gbps",
      "1_5g": "1.5 Gbps",
      "3g": "3 Gbps",
      internet_only: "僅寬頻",
      internet_tv: "寬頻 + 電視",
      internet_home_phone: "寬頻 + 家庭電話",
      internet_tv_home_phone: "寬頻 + 電視 + 家庭電話",
      "1": "1 人",
      "2": "2 人",
      "3_4": "3-4 人",
      "5_plus": "5 人以上",
      normal_browsing: "日常瀏覽",
      streaming_4k: "4K 影片",
      remote_work: "遠端工作",
      gaming: "遊戲",
      uploading_files: "上傳檔案",
      many_users: "多人使用",
      online_school: "網課",
      under_10gb: "低於 10GB",
      "10_30gb": "10-30GB",
      "30_60gb": "30-60GB",
      "60_100gb": "60-100GB",
      "100gb_plus": "100GB 以上",
      unlimited: "無限流量",
      yes: "是",
      no: "否",
      cheapest: "越便宜越好",
      needs_5g: "需要 5G",
      us_roaming: "美國漫遊",
      lots_of_data: "大流量",
      stable_signal: "訊號穩定",
      in_store_support: "需要門市支援",
      family_lines: "家庭多條線",
      just_checking: "先了解一下",
      no_contract: "無合約",
      contract: "有合約",
      promo_ending: "優惠快結束",
      maybe: "可以考慮",
      save_money: "省錢優先",
      stability: "穩定優先",
      speed_or_data: "速度/流量優先",
      low_hassle: "少折騰",
      retention_first: "先談保留優惠",
      email: "電郵",
      phone: "電話",
      wechat: "微信"
    }
  },
  en: {
    languageName: "English",
    eyebrow: "PEI only · v1",
    title: "Bill Saver | Free PEI Mobile and Internet Bill Check",
    hero:
      "Enter your current internet or mobile plan. We match it against available weekly offers, estimate possible savings conservatively, and generate a bill-savings report.",
    formTitle: "Plan details",
    province: "Default region: Prince Edward Island",
    serviceType: "Service type",
    city: "City",
    internetTitle: "Home internet",
    internetProvider: "Current internet provider",
    internetMonthlyPrice: "Internet monthly price",
    internetPricePlaceholder: "e.g. 95",
    priceType: "Price type",
    internetSpeed: "Current speed",
    internetBundle: "Bundle",
    householdSize: "Household size",
    internetUsage: "Internet usage",
    mobileTitle: "Mobile plan",
    mobileProvider: "Current mobile provider",
    mobileMonthlyPrice: "Mobile monthly price",
    mobilePricePlaceholder: "e.g. 55",
    mobileData: "Monthly data",
    isByod: "BYOD phone",
    mobileNeeds: "Mobile needs",
    otherTitle: "Other details",
    postalPrefix: "Postal code prefix",
    postalPlaceholder: "e.g. C1A",
    contractStatus: "Contract status",
    willingToSwitch: "Willing to switch",
    mainPriority: "Main priority",
    contact: "Contact (optional)",
    name: "Name (optional)",
    email: "Email (optional)",
    phone: "Phone (optional)",
    preferredContact: "Preferred contact",
    wechat: "WeChat (optional)",
    referralCode: "Referral code (optional)",
    notes: "Notes",
    submit: "Generate free bill check",
    submitting: "Submitting...",
    sheetSuccess:
      "We have received your bill information. We will manually review your details and compare them with available weekly PEI offers.",
    sheetError: "Submission failed. Please try again later or contact us directly by phone or email.",
    loading: "Analyzing your plan...",
    resultTitle: "Analysis result",
    resultSubtitle: "Your report will appear here",
    emptyState: "Fill in the form to generate preliminary savings suggestions.",
    fallbackError: "Analysis failed. Please try again later.",
    fallbackReport: "No report was generated. Please try again later.",
    disclaimer:
      "This tool provides preliminary analysis only. Available weekly offers, final pricing, eligibility, address availability, installation, taxes, equipment fees, and credit checks must be confirmed by the provider or an authorized sales representative.",
    manualReview: "Request manual review",
    groupCta: "Join PEI bill-savings group",
    modalTitle: "Manual review",
    modalIntro: "Leave your contact details and extra notes. We will manually review the bill information you provided.",
    modalSubmit: "Submit manual review",
    modalClose: "Close",
    footer:
      "Do not submit SIN, bank card details, full account numbers, full bills, or identity-document photos. This tool only needs approximate plan details for a preliminary check.",
    options: {
      internet: "Internet",
      mobile: "Mobile",
      both: "Both",
      other: "Other",
      notSure: "Not sure",
      before_tax: "Before tax",
      after_tax: "After tax",
      not_sure: "Not sure",
      under_100: "Under 100 Mbps",
      "100_300": "100-300 Mbps",
      "500": "500 Mbps",
      "1g": "1 Gbps",
      "1_5g": "1.5 Gbps",
      "3g": "3 Gbps",
      internet_only: "Internet only",
      internet_tv: "Internet + TV",
      internet_home_phone: "Internet + home phone",
      internet_tv_home_phone: "Internet + TV + home phone",
      "1": "1 person",
      "2": "2 people",
      "3_4": "3-4 people",
      "5_plus": "5+ people",
      normal_browsing: "Normal browsing",
      streaming_4k: "4K streaming",
      remote_work: "Remote work",
      gaming: "Gaming",
      uploading_files: "Uploading files",
      many_users: "Many users",
      online_school: "Online school",
      under_10gb: "Under 10GB",
      "10_30gb": "10-30GB",
      "30_60gb": "30-60GB",
      "60_100gb": "60-100GB",
      "100gb_plus": "100GB+",
      unlimited: "Unlimited",
      yes: "Yes",
      no: "No",
      cheapest: "Cheapest",
      needs_5g: "Needs 5G",
      us_roaming: "US roaming",
      lots_of_data: "Lots of data",
      stable_signal: "Stable signal",
      in_store_support: "In-store support",
      family_lines: "Family lines",
      just_checking: "Just checking",
      no_contract: "No contract",
      contract: "In contract",
      promo_ending: "Promo ending",
      maybe: "Maybe",
      save_money: "Save money",
      stability: "Stability",
      speed_or_data: "Speed or data",
      low_hassle: "Low hassle",
      retention_first: "Try retention first",
      email: "Email",
      phone: "Phone",
      wechat: "WeChat"
    }
  }
};

const cities = [
  { value: "Charlottetown", label: "Charlottetown" },
  { value: "Stratford", label: "Stratford" },
  { value: "Cornwall", label: "Cornwall" },
  { value: "Summerside", label: "Summerside" },
  { value: "Montague", label: "Montague" },
  { value: "Kensington", label: "Kensington" },
  { value: "Souris", label: "Souris" },
  { value: "Alberton", label: "Alberton" },
  { value: "Tignish", label: "Tignish" },
  { value: "O'Leary", label: "O'Leary" },
  { value: "Borden-Carleton", label: "Borden-Carleton" },
  { value: "Other", labelKey: "other" }
];

const internetProviders = [
  "Bell / Bell Aliant",
  "Eastlink",
  "Koodo Internet",
  "Purple Cow",
  "Xplore",
  "Starlink",
  "CityWide",
  "Rogers",
  "Other",
  "Not sure"
];

const mobileProviders = [
  "TELUS",
  "Koodo",
  "Public Mobile",
  "Bell",
  "Virgin Plus",
  "Rogers",
  "Fido",
  "Freedom Mobile",
  "Lucky Mobile",
  "Chatr",
  "Other",
  "Not sure"
];

const initialForm = {
  service_type: "both",
  city: "Charlottetown",
  internet_provider: "Bell / Bell Aliant",
  internet_monthly_price: "",
  internet_price_type: "after_tax",
  internet_speed: "not_sure",
  internet_bundle: "internet_only",
  household_size: "2",
  internet_usage: [],
  mobile_provider: "TELUS",
  mobile_monthly_price: "",
  mobile_price_type: "after_tax",
  mobile_data: "not_sure",
  is_byod: "not_sure",
  mobile_needs: [],
  postal_prefix: "",
  contract_status: "not_sure",
  willing_to_switch: "maybe",
  main_priority: "save_money",
  notes: "",
  contact: "",
  name: "",
  email: "",
  phone: "",
  preferred_contact: "email",
  wechat: "",
  referral_code: ""
};

const initialManualReview = {
  name: "",
  email: "",
  phone: "",
  preferred_contact: "email",
  wechat: "",
  notes: ""
};

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {children}
    </select>
  );
}

function MultiSelect({ label, options, value, onChange }) {
  function toggle(optionValue) {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  return (
    <div className="field field-full">
      <span>{label}</span>
      <div className="chip-grid">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value.includes(option.value) ? "chip active" : "chip"}
            onClick={() => toggle(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function optionLabel(t, value) {
  if (value === "Other") return t.options.other;
  if (value === "Not sure") return t.options.notSure;
  return t.options[value] || value;
}

function getCurrentProvider(form) {
  if (form.service_type === "internet") return form.internet_provider;
  if (form.service_type === "mobile") return form.mobile_provider;
  return `Internet: ${form.internet_provider || ""}; Mobile: ${form.mobile_provider || ""}`;
}

function getMonthlyPrice(form) {
  if (form.service_type === "internet") return form.internet_monthly_price;
  if (form.service_type === "mobile") return form.mobile_monthly_price;
  return `Internet: ${form.internet_monthly_price || ""}; Mobile: ${form.mobile_monthly_price || ""}`;
}

function buildSheetPayload({ form, language, source, manualReview = {} }) {
  return {
    source: source,
    language: language,
    name: manualReview.name || form.name || "",
    email: manualReview.email || form.email || "",
    phone: manualReview.phone || form.phone || "",
    preferred_contact: manualReview.preferred_contact || form.preferred_contact || "",
    wechat: manualReview.wechat || form.wechat || "",
    city: form.city || "",
    postal_code: form.postal_prefix || "",
    service_type: form.service_type || "",
    current_provider: getCurrentProvider(form),
    monthly_price: getMonthlyPrice(form),
    plan_details: JSON.stringify({
      internet_price_type: form.internet_price_type,
      internet_speed: form.internet_speed,
      internet_bundle: form.internet_bundle,
      household_size: form.household_size,
      internet_usage: form.internet_usage,
      mobile_price_type: form.mobile_price_type,
      mobile_data: form.mobile_data,
      is_byod: form.is_byod,
      mobile_needs: form.mobile_needs,
      contract_status: form.contract_status,
      main_priority: form.main_priority,
      referral_code: form.referral_code
    }),
    willing_to_switch: form.willing_to_switch || "",
    notes: [form.notes, manualReview.notes].filter(Boolean).join("\n\n")
  };
}

async function submitToGoogleSheet(payload) {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });
}

export default function Home() {
  const [language, setLanguage] = useState("zhHans");
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [sheetSubmitting, setSheetSubmitting] = useState(false);
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [showManualReview, setShowManualReview] = useState(false);
  const [manualReview, setManualReview] = useState(initialManualReview);
  const [sheetMessage, setSheetMessage] = useState("");
  const [sheetError, setSheetError] = useState("");
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const t = translations[language];

  const showInternet = form.service_type === "internet" || form.service_type === "both";
  const showMobile = form.service_type === "mobile" || form.service_type === "both";

  const canSubmit = useMemo(() => {
    if (showInternet && !form.internet_monthly_price) return false;
    if (showMobile && !form.mobile_monthly_price) return false;
    return true;
  }, [form.internet_monthly_price, form.mobile_monthly_price, showInternet, showMobile]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateManualReview(field, value) {
    setManualReview((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (loading || sheetSubmitting) return;

    setLoading(true);
    setSheetSubmitting(true);
    setReport("");
    setError("");
    setSheetMessage("");
    setSheetError("");

    try {
      await submitToGoogleSheet(
        buildSheetPayload({
          form,
          language,
          source: "main_bill_check"
        })
      );
      setSheetMessage(t.sheetSuccess);
    } catch {
      setSheetError(t.sheetError);
      setLoading(false);
      setSheetSubmitting(false);
      return;
    }

    setSheetSubmitting(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.fallbackError);
      }

      setReport(data.report || t.fallbackReport);
    } catch (submitError) {
      setError(submitError.message || t.fallbackError);
    } finally {
      setLoading(false);
    }
  }

  async function submitManualReview(event) {
    event.preventDefault();
    if (manualSubmitting) return;

    setManualSubmitting(true);
    setSheetMessage("");
    setSheetError("");

    try {
      await submitToGoogleSheet(
        buildSheetPayload({
          form,
          language,
          source: "manual_review",
          manualReview
        })
      );
      setSheetMessage(t.sheetSuccess);
      setManualReview(initialManualReview);
      setShowManualReview(false);
    } catch {
      setSheetError(t.sheetError);
    } finally {
      setManualSubmitting(false);
    }
  }

  return (
    <main className="page-shell" lang={language === "en" ? "en" : language === "zhHant" ? "zh-Hant" : "zh-CN"}>
      <div className="language-switcher" aria-label="Language switcher">
        {languages.map((item) => (
          <button
            key={item.code}
            type="button"
            className={language === item.code ? "active" : ""}
            onClick={() => setLanguage(item.code)}
            aria-label={translations[item.code].languageName}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="hero-copy">{t.hero}</p>
        </div>
      </section>

      <section className="workspace">
        <form className="panel form-panel" onSubmit={submit}>
          <div className="section-heading">
            <h2>{t.formTitle}</h2>
            <p>{t.province}</p>
          </div>

          <div className="grid">
            <Field label={t.serviceType}>
              <Select value={form.service_type} onChange={(value) => update("service_type", value)}>
                {["internet", "mobile", "both"].map((value) => (
                  <option key={value} value={value}>
                    {t.options[value]}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label={t.city}>
              <Select value={form.city} onChange={(value) => update("city", value)}>
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.labelKey ? t.options[city.labelKey] : city.label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          {showInternet && (
            <div className="subsection">
              <h3>{t.internetTitle}</h3>
              <div className="grid">
                <Field label={t.internetProvider}>
                  <Select value={form.internet_provider} onChange={(value) => update("internet_provider", value)}>
                    {internetProviders.map((provider) => (
                      <option key={provider} value={provider}>
                        {optionLabel(t, provider)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={t.internetMonthlyPrice}>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.internet_monthly_price}
                    onChange={(event) => update("internet_monthly_price", event.target.value)}
                    placeholder={t.internetPricePlaceholder}
                  />
                </Field>

                <Field label={t.priceType}>
                  <Select value={form.internet_price_type} onChange={(value) => update("internet_price_type", value)}>
                    {["before_tax", "after_tax", "not_sure"].map((value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={t.internetSpeed}>
                  <Select value={form.internet_speed} onChange={(value) => update("internet_speed", value)}>
                    {["under_100", "100_300", "500", "1g", "1_5g", "3g", "not_sure"].map((value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={t.internetBundle}>
                  <Select value={form.internet_bundle} onChange={(value) => update("internet_bundle", value)}>
                    {["internet_only", "internet_tv", "internet_home_phone", "internet_tv_home_phone", "not_sure"].map(
                      (value) => (
                        <option key={value} value={value}>
                          {t.options[value]}
                        </option>
                      )
                    )}
                  </Select>
                </Field>

                <Field label={t.householdSize}>
                  <Select value={form.household_size} onChange={(value) => update("household_size", value)}>
                    {["1", "2", "3_4", "5_plus"].map((value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <MultiSelect
                label={t.internetUsage}
                value={form.internet_usage}
                onChange={(value) => update("internet_usage", value)}
                options={[
                  "normal_browsing",
                  "streaming_4k",
                  "remote_work",
                  "gaming",
                  "uploading_files",
                  "many_users",
                  "online_school",
                  "not_sure"
                ].map((value) => ({ value, label: t.options[value] }))}
              />
            </div>
          )}

          {showMobile && (
            <div className="subsection">
              <h3>{t.mobileTitle}</h3>
              <div className="grid">
                <Field label={t.mobileProvider}>
                  <Select value={form.mobile_provider} onChange={(value) => update("mobile_provider", value)}>
                    {mobileProviders.map((provider) => (
                      <option key={provider} value={provider}>
                        {optionLabel(t, provider)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={t.mobileMonthlyPrice}>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.mobile_monthly_price}
                    onChange={(event) => update("mobile_monthly_price", event.target.value)}
                    placeholder={t.mobilePricePlaceholder}
                  />
                </Field>

                <Field label={t.priceType}>
                  <Select value={form.mobile_price_type} onChange={(value) => update("mobile_price_type", value)}>
                    {["before_tax", "after_tax", "not_sure"].map((value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={t.mobileData}>
                  <Select value={form.mobile_data} onChange={(value) => update("mobile_data", value)}>
                    {["under_10gb", "10_30gb", "30_60gb", "60_100gb", "100gb_plus", "unlimited", "not_sure"].map(
                      (value) => (
                        <option key={value} value={value}>
                          {t.options[value]}
                        </option>
                      )
                    )}
                  </Select>
                </Field>

                <Field label={t.isByod}>
                  <Select value={form.is_byod} onChange={(value) => update("is_byod", value)}>
                    {["yes", "no", "not_sure"].map((value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              <MultiSelect
                label={t.mobileNeeds}
                value={form.mobile_needs}
                onChange={(value) => update("mobile_needs", value)}
                options={[
                  "cheapest",
                  "needs_5g",
                  "us_roaming",
                  "lots_of_data",
                  "stable_signal",
                  "in_store_support",
                  "family_lines",
                  "just_checking"
                ].map((value) => ({ value, label: t.options[value] }))}
              />
            </div>
          )}

          <div className="subsection">
            <h3>{t.otherTitle}</h3>
            <div className="grid">
              <Field label={t.postalPrefix}>
                <input
                  value={form.postal_prefix}
                  onChange={(event) => update("postal_prefix", event.target.value.toUpperCase().slice(0, 3))}
                  placeholder={t.postalPlaceholder}
                />
              </Field>

              <Field label={t.contractStatus}>
                <Select value={form.contract_status} onChange={(value) => update("contract_status", value)}>
                  {["no_contract", "contract", "promo_ending", "not_sure"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.willingToSwitch}>
                <Select value={form.willing_to_switch} onChange={(value) => update("willing_to_switch", value)}>
                  {["yes", "maybe", "no", "just_checking"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.mainPriority}>
                <Select value={form.main_priority} onChange={(value) => update("main_priority", value)}>
                  {["save_money", "stability", "speed_or_data", "low_hassle", "retention_first", "not_sure"].map(
                    (value) => (
                      <option key={value} value={value}>
                        {t.options[value]}
                      </option>
                    )
                  )}
                </Select>
              </Field>

              <Field label={t.name}>
                <input value={form.name} onChange={(event) => update("name", event.target.value)} />
              </Field>

              <Field label={t.email}>
                <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
              </Field>

              <Field label={t.phone}>
                <input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
              </Field>

              <Field label={t.preferredContact}>
                <Select value={form.preferred_contact} onChange={(value) => update("preferred_contact", value)}>
                  {["email", "phone", "wechat"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.wechat}>
                <input value={form.wechat} onChange={(event) => update("wechat", event.target.value)} />
              </Field>

              <Field label={t.referralCode}>
                <input value={form.referral_code} onChange={(event) => update("referral_code", event.target.value)} />
              </Field>
            </div>

            <Field label={t.notes}>
              <textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} rows="4" />
            </Field>
          </div>

          <button className="submit-button" type="submit" disabled={loading || !canSubmit}>
            {sheetSubmitting ? t.submitting : loading ? t.loading : t.submit}
          </button>
        </form>

        <aside className="panel result-panel">
          <div className="section-heading">
            <h2>{t.resultTitle}</h2>
            <p>{t.resultSubtitle}</p>
          </div>

          {loading && <div className="loading">{t.loading}</div>}
          {sheetMessage && <div className="success">{sheetMessage}</div>}
          {sheetError && <div className="error">{sheetError}</div>}
          {error && <div className="error">{error}</div>}
          {report && <pre className="report">{report}</pre>}
          {!loading && !error && !report && <div className="empty-state">{t.emptyState}</div>}

          <p className="disclaimer">{t.disclaimer}</p>

          <div className="action-row">
            <button type="button" onClick={() => setShowManualReview(true)}>
              {t.manualReview}
            </button>
            <button type="button">{t.groupCta}</button>
          </div>
        </aside>
      </section>

      {showManualReview && (
        <div className="modal-backdrop" role="presentation">
          <form className="modal panel" onSubmit={submitManualReview}>
            <div className="section-heading">
              <div>
                <h2>{t.modalTitle}</h2>
                <p>{t.modalIntro}</p>
              </div>
              <button
                className="modal-close"
                type="button"
                onClick={() => setShowManualReview(false)}
                aria-label={t.modalClose}
              >
                ×
              </button>
            </div>

            <div className="grid">
              <Field label={t.name}>
                <input value={manualReview.name} onChange={(event) => updateManualReview("name", event.target.value)} />
              </Field>

              <Field label={t.email}>
                <input
                  type="email"
                  value={manualReview.email}
                  onChange={(event) => updateManualReview("email", event.target.value)}
                />
              </Field>

              <Field label={t.phone}>
                <input
                  type="tel"
                  value={manualReview.phone}
                  onChange={(event) => updateManualReview("phone", event.target.value)}
                />
              </Field>

              <Field label={t.preferredContact}>
                <Select
                  value={manualReview.preferred_contact}
                  onChange={(value) => updateManualReview("preferred_contact", value)}
                >
                  {["email", "phone", "wechat"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.wechat}>
                <input
                  value={manualReview.wechat}
                  onChange={(event) => updateManualReview("wechat", event.target.value)}
                />
              </Field>
            </div>

            <Field label={t.notes}>
              <textarea
                value={manualReview.notes}
                onChange={(event) => updateManualReview("notes", event.target.value)}
                rows="4"
              />
            </Field>

            <button className="submit-button" type="submit" disabled={manualSubmitting}>
              {manualSubmitting ? t.submitting : t.modalSubmit}
            </button>
          </form>
        </div>
      )}

      <footer className="site-footer">{t.footer}</footer>
    </main>
  );
}
