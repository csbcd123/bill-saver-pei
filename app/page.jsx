"use client";

import { useEffect, useMemo, useState } from "react";
import { offerDatabase } from "@/lib/offerDatabase";

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
    hero: "先输入账单信息查看体检结果。想拿到本周可用优惠时，再提交联系方式给人工复核。",
    formTitle: "账单信息",
    province: "默认地区：Prince Edward Island",
    serviceType: "你想检查哪类账单？",
    city: "你住在哪个区域？",
    provider: "当前运营商",
    monthlyPriceInternet: "宽带月费（税前）",
    monthlyPriceMobile: "手机月费",
    monthlyPriceBoth: "每月总费用",
    monthlyPlaceholder: "例如 95",
    currentSpeed: "当前宽带速度",
    currentMobileData: "当前手机流量",
    postalPrefix: "邮编前三位",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合适的方案，你是否可以考虑更换？",
    notes: "备注",
    submit: "查看体检结果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的账单信息。我们会人工查看你填写的内容，并结合 PEI 本地本周可用优惠进行初步判断。",
    sheetError: "提交失败，请稍后再试，或直接通过电话 / 邮箱联系我们。",
    billScore: "账单评分",
    estimatedYearlySavings: "预计全年可节约",
    yearlySavingsValue: (value) => `约 $${value} / 年`,
    planTitle: "参考可选方案",
    pickType: "推荐类型：",
    providerLabel: "服务商：",
    service: "参考服务：",
    price: "参考价格：",
    savings: "预计可节约：",
    planType: "套餐类型：",
    goodFor: "适合使用：",
    note: "说明：",
    highQualityPick: "高质量推荐",
    lowestCostPick: "最省钱推荐",
    manualPick: "人工确认推荐",
    internetPick: "宽带参考方案",
    bundlePick: "组合参考方案",
    bellWinbackTitle: "Bell Winback 套餐",
    bellWinbackService: "Bell 手机回流 / Winback 方案",
    bellPrice: "本周可用优惠需人工确认",
    bellSavings: "提交信息后人工确认",
    bestPrice: "✨ 获得最佳价格 →",
    bestPriceHelp: "提交后人工确认本周可用优惠",
    cautionTitle: "不建议或需要谨慎的地方",
    groupTitle: "加入 PEI 账单省钱群",
    groupDescription:
      "我们会不定期分享 PEI 手机、宽带和家庭账单相关的省钱信息。本周可用优惠可能变化，具体价格和资格需要人工确认。",
    qrPlaceholder: "群二维码位置",
    leadTitle: "获取本周可用优惠",
    leadIntro: "留下联系方式，人工复核后再确认是否有更合适的方案。",
    name: "姓名",
    email: "邮箱",
    phone: "电话",
    preferredContact: "偏好联系方式",
    wechat: "微信（选填）",
    leadSubmit: "提交人工复核",
    close: "关闭",
    disclaimer: "最终价格、资格、地址覆盖、安装、税费、设备费和信用审核以运营商或授权销售人员确认为准。",
    footer: "请勿提交 SIN、银行卡、完整账号、完整账单或身份证件照片。本工具只需要大概账单信息来做初步判断。",
    serviceCards: { mobile: "手机账单", internet: "宽带账单", both: "宽带 + 手机" },
    options: {
      other_pei: "其他 PEI 地区",
      not_in_pei: "不在 PEI",
      not_sure: "不确定",
      can_consider: "可以考虑",
      yes: "愿意",
      no: "暂时不想",
      just_checking: "只想先看看",
      email: "Email",
      text: "短信",
      phone: "电话",
      prepaid: "预付费",
      subscription: "订阅式",
      postpaid: "后付费",
      manual_confirmation: "需人工确认",
      internal_channel: "需人工确认",
      winback: "需人工确认"
    },
    cautionItems: [
      "如果你还在合约期，提前取消可能有费用。",
      "宽带最终可用性需要按地址确认。",
      "部分优惠需要信用审核。",
      "税费、设备费、安装费可能影响最终月费。",
      "如果你对稳定性要求很高，不建议只看最低价格。",
      "如果你需要保留手机号，转网前需要确认账户信息。"
    ],
    internetGoodFor: {
      low: "日常上网、视频通话、YouTube / Netflix、1-2 人远程办公和普通高清视频。多人同时 4K、游戏、直播或大量下载时可能不够稳。",
      mid: "多数家庭日常使用、4K 视频、视频会议、在线学习、远程办公和普通游戏。多人重度使用时可考虑 500M 以上。",
      high:
        "大多数家庭使用，支持 4K 视频、多人视频会议、远程办公、在线学习、普通游戏、直播观看。对 PEI 普通家庭来说，500M 通常已经够用。",
      premium:
        "多人家庭、重度远程办公、大量下载上传、游戏、多个设备同时 4K 视频、内容创作或更高稳定性需求。如果只是普通上网和视频，可能有些超配。"
    },
    mobileGoodFor: {
      "25GB": "轻中度用户，日常社交、地图、网页、音乐、少量视频。如果经常在外看视频或开热点，建议考虑 50GB 以上。",
      "50GB": "大多数用户，日常社交、地图、音乐、短视频、YouTube、偶尔热点共享。如果不是长期用手机当家庭网络，50GB 通常够用。",
      "60GB": "多数中高用量用户，适合日常视频、社交、地图和偶尔热点。",
      "100GB": "重度手机数据用户，经常在外看视频、短视频、直播、热点共享、远程工作备用网络。如果平时大部分时间连 Wi-Fi，可能有些超配。",
      "175GB": "非常重度用户，经常热点共享、长时间视频、移动办公、没有稳定 Wi-Fi 的场景。普通用户通常不需要这么高流量。",
      default: "根据你现在的月费和使用习惯，需要人工判断是否匹配。"
    },
    publicMobileNote: "Public Mobile 更适合自带手机、能接受线上自助服务、希望压低月费的用户。",
    koodoPrepaidNote: "Koodo 预付费适合不想做信用审核、想用 4G 低价套餐、且不需要手机分期的用户。",
    bellWinbackGoodFor:
      "当前 Bell 手机用户，想判断是否有必要转出后等待回流优惠，或比较其他运营商方案。",
    bellWinbackNote:
      "Bell Winback 通常需要满足特定资格，可能需要先转出或等待回流联系。最终价格、资格、自动付款、信用审核和促销条件以运营商或授权销售人员确认为准。"
  },
  zhHant: {
    languageName: "繁體中文",
    eyebrow: "僅限 PEI · v1",
    title: "Bill Saver｜PEI 手機寬頻帳單免費體檢",
    hero: "先輸入帳單資訊查看健檢結果。想取得本週可用優惠時，再提交聯絡方式給人工複核。",
    formTitle: "帳單資訊",
    province: "預設地區：Prince Edward Island",
    serviceType: "你想檢查哪類帳單？",
    city: "你住在哪個區域？",
    provider: "目前業者",
    monthlyPriceInternet: "寬頻月費",
    monthlyPriceMobile: "手機月費",
    monthlyPriceBoth: "每月總費用",
    monthlyPlaceholder: "例如 95",
    currentSpeed: "目前寬頻速度",
    currentMobileData: "目前手機流量",
    postalPrefix: "郵遞區號前三碼",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合適的方案，你是否可以考慮更換？",
    notes: "備註",
    submit: "查看健檢結果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的帳單資訊。我們會人工查看你填寫的內容，並結合 PEI 本地本週可用優惠進行初步判斷。",
    sheetError: "提交失敗，請稍後再試，或直接透過電話 / 電郵聯絡我們。",
    billScore: "帳單評分",
    estimatedYearlySavings: "預計全年可節省",
    yearlySavingsValue: (value) => `約 $${value} / 年`,
    planTitle: "參考可選方案",
    pickType: "推薦類型：",
    providerLabel: "電信商：",
    service: "參考服務：",
    price: "參考價格：",
    savings: "預計可節省：",
    planType: "方案類型：",
    goodFor: "適合使用：",
    note: "說明：",
    highQualityPick: "高品質推薦",
    lowestCostPick: "最省錢推薦",
    manualPick: "人工確認推薦",
    internetPick: "寬頻參考方案",
    bundlePick: "組合參考方案",
    bellWinbackTitle: "Bell Winback 方案",
    bellWinbackService: "Bell 手機回流 / Winback 方案",
    bellPrice: "本週可用優惠需人工確認",
    bellSavings: "提交資訊後人工確認",
    bestPrice: "✨ 取得最佳價格 →",
    bestPriceHelp: "提交後人工確認本週可用優惠",
    cautionTitle: "不建議或需要謹慎的地方",
    groupTitle: "加入 PEI 帳單省錢群",
    groupDescription:
      "我們會不定期分享 PEI 手機、寬頻和家庭帳單相關的省錢資訊。本週可用優惠可能變化，具體價格和資格需要人工確認。",
    qrPlaceholder: "群 QR Code 位置",
    leadTitle: "取得本週可用優惠",
    leadIntro: "留下聯絡方式，人工複核後再確認是否有更合適的方案。",
    name: "姓名",
    email: "電郵",
    phone: "電話",
    preferredContact: "偏好聯絡方式",
    wechat: "微信（選填）",
    leadSubmit: "提交人工複核",
    close: "關閉",
    disclaimer: "最終價格、資格、地址覆蓋、安裝、稅費、設備費和信用審核以電信商或授權銷售人員確認為準。",
    footer: "請勿提交 SIN、銀行卡、完整帳號、完整帳單或身分證件照片。本工具只需要大概帳單資訊來做初步判斷。",
    serviceCards: { mobile: "手機帳單", internet: "寬頻帳單", both: "寬頻 + 手機" },
    options: {
      other_pei: "其他 PEI 地區",
      not_in_pei: "不在 PEI",
      not_sure: "不確定",
      can_consider: "可以考慮",
      yes: "願意",
      no: "暫時不想",
      just_checking: "只想先看看",
      email: "Email",
      text: "簡訊",
      phone: "電話",
      prepaid: "預付費",
      subscription: "訂閱式",
      postpaid: "後付費",
      manual_confirmation: "需人工確認",
      internal_channel: "需人工確認",
      winback: "需人工確認"
    },
    cautionItems: [
      "如果你還在合約期，提前取消可能有費用。",
      "寬頻最終可用性需要按地址確認。",
      "部分優惠需要信用審核。",
      "稅費、設備費、安裝費可能影響最終月費。",
      "如果你對穩定性要求很高，不建議只看最低價格。",
      "如果你需要保留手機號，轉網前需要確認帳戶資訊。"
    ],
    internetGoodFor: {
      low: "日常上網、視訊通話、YouTube / Netflix、1-2 人遠端工作和一般高畫質影片。多人同時 4K、遊戲、直播或大量下載時可能不夠穩。",
      mid: "多數家庭日常使用、4K 影片、視訊會議、線上學習、遠端工作和一般遊戲。多人重度使用時可考慮 500M 以上。",
      high:
        "大多數家庭使用，支援 4K 影片、多人視訊會議、遠端工作、線上學習、一般遊戲、直播觀看。對 PEI 一般家庭來說，500M 通常已經夠用。",
      premium:
        "多人家庭、重度遠端工作、大量下載上傳、遊戲、多個設備同時 4K 影片、內容創作或更高穩定性需求。如果只是一般上網和影片，可能有些超配。"
    },
    mobileGoodFor: {
      "25GB": "輕中度用戶，日常社交、地圖、網頁、音樂、少量影片。如果經常在外看影片或開熱點，建議考慮 50GB 以上。",
      "50GB": "大多數用戶，日常社交、地圖、音樂、短影片、YouTube、偶爾熱點分享。如果不是長期用手機當家庭網路，50GB 通常夠用。",
      "60GB": "多數中高用量用戶，適合日常影片、社交、地圖和偶爾熱點。",
      "100GB": "重度手機數據用戶，經常在外看影片、短影片、直播、熱點分享、遠端工作備用網路。如果平時大部分時間連 Wi-Fi，可能有些超配。",
      "175GB": "非常重度用戶，經常熱點分享、長時間影片、移動辦公、沒有穩定 Wi-Fi 的場景。一般用戶通常不需要這麼高流量。",
      default: "根據你現在的月費和使用習慣，需要人工判斷是否匹配。"
    },
    publicMobileNote: "Public Mobile 較適合自帶手機、能接受線上自助服務、希望降低月費的用戶。",
    koodoPrepaidNote: "Koodo 預付費適合不想做信用審核、想用 4G 低價方案、且不需要手機分期的用戶。",
    bellWinbackGoodFor:
      "目前 Bell 手機用戶，想判斷是否有必要轉出後等待回流優惠，或比較其他電信商方案。",
    bellWinbackNote:
      "Bell Winback 通常需要滿足特定資格，可能需要先轉出或等待回流聯絡。最終價格、資格、自動付款、信用審核和促銷條件以電信商或授權銷售人員確認為準。"
  },
  en: {
    languageName: "English",
    eyebrow: "PEI only · v1",
    title: "Bill Saver | Free PEI Mobile and Internet Bill Check",
    hero: "Enter bill details first to see your result. If you want available weekly offers, submit contact details for manual review afterward.",
    formTitle: "Bill details",
    province: "Default region: Prince Edward Island",
    serviceType: "Which bill do you want to check?",
    city: "Which area are you in?",
    provider: "Current provider",
    monthlyPriceInternet: "Internet monthly bill",
    monthlyPriceMobile: "Mobile monthly bill",
    monthlyPriceBoth: "Total monthly bill",
    monthlyPlaceholder: "e.g. 95",
    currentSpeed: "Current internet speed",
    currentMobileData: "Current mobile data",
    postalPrefix: "Postal code prefix",
    postalPlaceholder: "e.g. C1A",
    willingToSwitch: "If there is a better option, would you consider switching?",
    notes: "Notes",
    submit: "View My Bill Check Result",
    submitting: "Submitting...",
    sheetSuccess:
      "We have received your bill information. We will manually review your details and compare them with available weekly PEI offers.",
    sheetError: "Submission failed. Please try again later or contact us directly by phone or email.",
    billScore: "Bill Score",
    estimatedYearlySavings: "Estimated Yearly Savings",
    yearlySavingsValue: (value) => `About $${value} / year`,
    planTitle: "Reference Optional Plans",
    pickType: "Pick type:",
    providerLabel: "Provider:",
    service: "Reference service:",
    price: "Reference price:",
    savings: "Estimated savings:",
    planType: "Plan type:",
    goodFor: "Good for:",
    note: "Note:",
    highQualityPick: "Best Quality Pick",
    lowestCostPick: "Lowest Cost Pick",
    manualPick: "Manual Confirmation Pick",
    internetPick: "Internet Reference Pick",
    bundlePick: "Bundle Reference Pick",
    bellWinbackTitle: "Bell Winback Plan",
    bellWinbackService: "Bell mobile winback option",
    bellPrice: "Available weekly offer requires manual confirmation",
    bellSavings: "Confirmed after submission",
    bestPrice: "✨ Get the Best Price →",
    bestPriceHelp: "We'll manually confirm available weekly offers",
    cautionTitle: "Things to Watch Carefully",
    groupTitle: "Join the PEI Bill-Saving Group",
    groupDescription:
      "We occasionally share PEI phone, internet, and household bill-saving tips. Available weekly offers may change, and final pricing and eligibility require manual confirmation.",
    qrPlaceholder: "Group QR Code Placeholder",
    leadTitle: "Get available weekly offers",
    leadIntro: "Leave your contact details. We will manually confirm whether there is a better option.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    preferredContact: "Preferred contact",
    wechat: "WeChat (optional)",
    leadSubmit: "Submit manual review",
    close: "Close",
    disclaimer:
      "Final pricing, eligibility, address availability, installation, taxes, equipment fees, and credit approval must be confirmed by the provider or an authorized sales representative.",
    footer:
      "Do not submit SIN, bank card details, full account numbers, full bills, or identity-document photos. This tool only needs approximate bill details for a preliminary check.",
    serviceCards: { mobile: "Mobile bill", internet: "Internet bill", both: "Internet + Mobile" },
    options: {
      other_pei: "Other PEI area",
      not_in_pei: "Not in PEI",
      not_sure: "Not sure",
      can_consider: "Open to considering",
      yes: "Yes",
      no: "Not right now",
      just_checking: "Just checking",
      email: "Email",
      text: "Text message",
      phone: "Phone call",
      prepaid: "Prepaid",
      subscription: "Subscription",
      postpaid: "Postpaid",
      manual_confirmation: "Manual confirmation",
      internal_channel: "Manual confirmation",
      winback: "Manual confirmation"
    },
    cautionItems: [
      "If you are still in contract, early cancellation may involve fees.",
      "Final internet availability must be confirmed by address.",
      "Some offers require credit approval.",
      "Taxes, equipment fees, and installation fees may affect the final monthly cost.",
      "If stability is very important, do not choose by the lowest price alone.",
      "If you need to keep your phone number, confirm account details before porting."
    ],
    internetGoodFor: {
      low:
        "Daily browsing, video calls, YouTube / Netflix, 1-2 people working from home, and regular HD video. It may not be ideal for multiple 4K streams, gaming, live streaming, or heavy downloads at the same time.",
      mid:
        "Most household use, 4K video, video meetings, online learning, remote work, and casual gaming. For multiple heavy streams or large downloads, 500M or higher may be better.",
      high:
        "Most households, including 4K video, multiple video meetings, remote work, online learning, casual gaming, and live streaming. For many PEI households, 500M is usually enough.",
      premium:
        "Larger households, heavy remote work, large downloads/uploads, gaming, multiple 4K streams, content creation, or higher stability needs. It may be more than necessary for basic browsing and video."
    },
    mobileGoodFor: {
      "25GB": "Light to moderate users for social apps, maps, browsing, music, and some video. If you often watch video outside or use hotspot, 50GB or more may be better.",
      "50GB":
        "Most users, including social apps, maps, music, short videos, YouTube, and occasional hotspot sharing. If you are not using your phone as home internet, 50GB is usually enough.",
      "60GB": "Most medium to heavy users for video, social apps, maps, and occasional hotspot sharing.",
      "100GB":
        "Heavy mobile data users who often watch videos, short videos, streams, share hotspot, or use mobile data as backup for remote work. It may be more than needed if you are usually on Wi-Fi.",
      "175GB":
        "Very heavy users with frequent hotspot sharing, long video sessions, mobile work, or limited Wi-Fi access. Most users do not need this much data.",
      default: "We can manually review it based on your current bill and usage habits."
    },
    publicMobileNote:
      "Public Mobile is better for BYOD users who are comfortable with self-serve support and want to lower their monthly bill.",
    koodoPrepaidNote:
      "Koodo Prepaid is suitable for users who want a lower-cost 4G prepaid plan, no credit check, and do not need phone financing.",
    bellWinbackGoodFor:
      "Current Bell mobile users who want to check whether switching out and waiting for a winback offer may be worth it, or compare other provider options.",
    bellWinbackNote:
      "Bell winback offers usually require specific eligibility and may require switching out first or waiting for a winback contact. Final pricing, eligibility, pre-authorized payment, credit approval, and promotional terms must be confirmed by the provider or an authorized sales representative."
  }
};

const areaOptions = [
  { value: "Charlottetown", label: "Charlottetown" },
  { value: "Stratford", label: "Stratford" },
  { value: "Cornwall", label: "Cornwall" },
  { value: "Summerside", label: "Summerside" },
  { value: "Other PEI area", labelKey: "other_pei" },
  { value: "Not in PEI", labelKey: "not_in_pei" }
];

const providerOptions = ["Bell", "Bell Aliant", "TELUS", "Koodo", "Public Mobile", "Eastlink", "Purple Cow", "Rogers", "Fido", "Virgin Plus", "Other", "Not sure"];
const speedOptions = ["100M", "300M", "500M", "1G", "1.5G", "3G", "not_sure"];
const mobileDataOptions = ["5GB", "10GB", "20GB", "50GB", "75GB", "100GB", "150GB+", "not_sure"];

const initialForm = {
  service_type: "internet",
  city: "Charlottetown",
  current_provider: "Bell Aliant",
  monthly_price: "",
  price_type: "not_asked",
  current_speed: "500M",
  current_mobile_data: "50GB",
  postal_code: "",
  willing_to_switch: "can_consider",
  notes: ""
};

const initialLead = {
  name: "",
  email: "",
  phone: "",
  preferred_contact: "email",
  wechat: ""
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
  return <select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>;
}

function optionLabel(t, value) {
  if (value === "Other") return t.options.other || "Other";
  if (value === "Not sure" || value === "not_sure") return t.options.not_sure;
  return t.options[value] || value;
}

function speedRank(speed) {
  const ranks = { "100M": 100, "300M": 300, "350M": 350, "500M": 500, "1G": 1000, "1.5G": 1500, "3G": 3000 };
  return ranks[speed] || 0;
}

function dataRank(data) {
  if (!data || data === "not_sure") return 50;
  return Number(String(data).replace(/[^0-9]/g, "")) || 0;
}

function speedBucket(speed) {
  const rank = speedRank(speed);
  if (rank <= 150) return "low";
  if (rank <= 350) return "mid";
  if (rank <= 500) return "high";
  return "premium";
}

function isBell(offerOrProvider) {
  const provider = typeof offerOrProvider === "string" ? offerOrProvider : offerOrProvider.provider;
  return /bell/i.test(provider || "");
}

function isPremiumProvider(offer) {
  return /koodo|telus|bell/i.test(offer.provider || "");
}

function isManualPrice(offer) {
  return offer.requires_manual_confirmation || offer.is_sensitive_price || !offer.is_public_price || isBell(offer);
}

function planTypeLabel(offer, t) {
  return t.options[offer.billing_type] || offer.billing_type || t.options.manual_confirmation;
}

function monthlyPrice(form) {
  return Number(form.monthly_price || 0);
}

function money(value, language) {
  if (typeof value !== "number") return value;
  return language === "en" ? `$${value}/mo` : `$${value}/月`;
}

function savingsText(offer, form, t, language) {
  if (isManualPrice(offer)) return t.bellSavings;
  const saving = Math.max(0, Math.round(monthlyPrice(form) - Number(offer.bill_saver_target_price || offer.official_promo_price || 0)));
  if (!saving) return language === "en" ? "Needs manual review" : language === "zhHant" ? "需要人工確認" : "需要人工确认";
  return language === "en" ? `About $${saving}/mo before confirmation` : `约 $${saving}/月，需确认`;
}

function relevantTargets(offers, form) {
  const relevant =
    form.service_type === "both" ? offers.filter((offer) => offer.service_type === "both") : offers.filter((offer) => offer.service_type === form.service_type);
  return relevant.map((offer) => offer.bill_saver_target_price).filter((value) => typeof value === "number");
}

function yearlySavingsValue(offers, form) {
  const targets = relevantTargets(offers, form);
  if (!targets.length || !monthlyPrice(form)) return 0;
  const bestTarget = Math.min(...targets);
  return Math.max(0, Math.round((monthlyPrice(form) - bestTarget) * 12));
}

function offerDistance(offer, form) {
  if (offer.service_type === "internet") {
    const selected = form.current_speed === "not_sure" ? 500 : speedRank(form.current_speed);
    return Math.abs((speedRank(offer.speed_down) || selected) - selected);
  }
  if (offer.service_type === "mobile") {
    const selected = dataRank(form.current_mobile_data);
    return Math.abs((dataRank(offer.mobile_data) || selected) - selected);
  }
  return 0;
}

function localizedGoodFor(offer, form, t) {
  if (offer.service_type === "internet") return t.internetGoodFor[speedBucket(offer.speed_down || form.current_speed)];
  if (/Public Mobile/i.test(offer.provider)) return t.publicMobileNote;
  if (/Koodo Prepaid/i.test(offer.plan_name)) return t.koodoPrepaidNote;
  if (offer.offer_id === "bell_mobile_winback_manual") return t.bellWinbackGoodFor;
  return t.mobileGoodFor[offer.mobile_data] || t.mobileGoodFor.default;
}

function localizedNote(offer, t) {
  if (offer.offer_id === "bell_mobile_winback_manual") return t.bellWinbackNote;
  return offer.caution;
}

function displayPlanName(offer, t) {
  if (offer.offer_id === "bell_mobile_winback_manual") return t.bellWinbackService;
  return offer.plan_name;
}

function displayPrice(offer, t, language) {
  if (isManualPrice(offer)) return t.bellPrice;
  return money(offer.bill_saver_target_price, language);
}

function scoreOffer(offer, form) {
  let score = 0;
  if (offer.status === "active") score += 8;
  if (offer.region === "PEI" || offer.region === "Rural PEI") score += 8;
  if (offer.region === "Canada") score += 4;
  score -= Math.min(20, offerDistance(offer, form) / 40);
  if (offer.is_public_price && typeof offer.official_regular_price === "number") score -= 4;
  if (offer.requires_manual_confirmation) score -= 2;
  if (typeof offer.bill_saver_target_price === "number") score += Math.max(0, 16 - offer.bill_saver_target_price / 8);
  return score;
}

function internetPicks(form) {
  return offerDatabase
    .filter((offer) => offer.service_type === "internet")
    .filter((offer) => offer.status !== "inactive")
    .sort((a, b) => scoreOffer(b, form) - scoreOffer(a, form))
    .slice(0, 3)
    .map((offer) => ({ ...offer, pickTypeKey: "internetPick" }));
}

function mobilePicks(form) {
  const mobileOffers = offerDatabase.filter((offer) => offer.service_type === "mobile" && offer.status !== "inactive");
  const quality =
    mobileOffers
      .filter((offer) => dataRank(offer.mobile_data) >= 40 && !isBell(offer))
      .sort((a, b) => scoreOffer(b, form) - scoreOffer(a, form))[0] ||
    mobileOffers.sort((a, b) => scoreOffer(b, form) - scoreOffer(a, form))[0];

  const cheapest =
    mobileOffers
      .filter((offer) => typeof offer.bill_saver_target_price === "number" && offer.bill_saver_target_price <= 35 && dataRank(offer.mobile_data) >= 20)
      .sort((a, b) => a.bill_saver_target_price - b.bill_saver_target_price)[0] ||
    mobileOffers.filter((offer) => typeof offer.bill_saver_target_price === "number").sort((a, b) => a.bill_saver_target_price - b.bill_saver_target_price)[0];

  const provider = (form.current_provider || "").toLowerCase();
  let manual;
  if (provider.includes("bell")) {
    manual = mobileOffers.find((offer) => offer.offer_id === "bell_mobile_winback_manual");
  } else if (provider.includes("telus") || provider.includes("koodo")) {
    manual = mobileOffers.find((offer) => offer.provider === "Bell" && offer.offer_id !== "bell_mobile_winback_manual");
  } else {
    manual = mobileOffers.find((offer) => offer.provider === "TELUS");
  }

  return [
    quality && { ...quality, pickTypeKey: "highQualityPick" },
    cheapest && { ...cheapest, pickTypeKey: "lowestCostPick" },
    manual && { ...manual, pickTypeKey: "manualPick" }
  ].filter(Boolean);
}

function bundlePicks() {
  return offerDatabase
    .filter((offer) => offer.service_type === "both")
    .slice(0, 2)
    .map((offer) => ({ ...offer, pickTypeKey: "bundlePick" }));
}

function getRecommendations(form) {
  if (form.service_type === "internet") return internetPicks(form);
  if (form.service_type === "mobile") return mobilePicks(form);
  return [...bundlePicks(), ...internetPicks(form).slice(0, 1), ...mobilePicks(form)].slice(0, 5);
}

function calculateScore(form, offers) {
  const price = monthlyPrice(form);
  if (!price || !offers.length) return 62;
  const comparisonOffers =
    form.service_type === "both" ? offers.filter((offer) => offer.service_type === "both") : offers.filter((offer) => offer.service_type === form.service_type);
  const targets = comparisonOffers.map((offer) => offer.bill_saver_target_price).filter((value) => typeof value === "number");
  const regulars = comparisonOffers.map((offer) => offer.official_regular_price).filter((value) => typeof value === "number");
  const target = targets.length ? Math.min(...targets) : price;
  const regular = regulars.length ? Math.min(...regulars) : target + 25;
  let score = 76 - Math.max(0, price - target) * 0.7;
  if (price >= regular) score = Math.min(score, 68);
  if (price > target + 40) score = Math.min(score, 54);
  if (price <= target + 5) score = Math.max(score, 78);
  return Math.max(35, Math.min(88, Math.round(score)));
}

function scoreTone(score) {
  if (score >= 76) return "healthy";
  if (score >= 50) return "medium";
  return "alert";
}

function buildSheetPayload({ form, language, source, lead }) {
  const serviceType = form.service_type || "";
  return {
    source: source,
    language: language,
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "",
    preferred_contact: lead.preferred_contact || "",
    wechat: lead.wechat || "",
    city: form.city || "",
    postal_code: form.postal_code || "",
    service_type: serviceType,
    current_provider: form.current_provider || "",
    monthly_price: form.monthly_price || "",
    price_type: "not_asked",
    current_speed: serviceType === "internet" || serviceType === "both" ? form.current_speed : "",
    current_mobile_data: serviceType === "mobile" || serviceType === "both" ? form.current_mobile_data : "",
    plan_details: JSON.stringify({
      selected_speed: form.current_speed,
      selected_mobile_data: form.current_mobile_data
    }),
    willing_to_switch: form.willing_to_switch || "",
    notes: form.notes || ""
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
  const [lead, setLead] = useState(initialLead);
  const [resultOpen, setResultOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sheetMessage, setSheetMessage] = useState("");
  const [sheetError, setSheetError] = useState("");
  const t = translations[language];
  const showInternet = form.service_type === "internet" || form.service_type === "both";
  const showMobile = form.service_type === "mobile" || form.service_type === "both";
  const recommendations = useMemo(() => getRecommendations(form), [form]);
  const score = useMemo(() => calculateScore(form, recommendations), [form, recommendations]);
  const yearlySavings = useMemo(() => yearlySavingsValue(recommendations, form), [recommendations, form]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setResultOpen(false);
        setLeadOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateLead(field, value) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  function openLeadFromResult() {
    setResultOpen(false);
    setLeadOpen(true);
  }

  function submitInitial(event) {
    event.preventDefault();
    setSheetMessage("");
    setSheetError("");
    setResultOpen(true);
  }

  async function submitLead(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSheetMessage("");
    setSheetError("");
    try {
      await submitToGoogleSheet(
        buildSheetPayload({
          form,
          language,
          source: "lead_contact_modal",
          lead
        })
      );
      setSheetMessage(t.sheetSuccess);
      setLead(initialLead);
      setLeadOpen(false);
    } catch {
      setSheetError(t.sheetError);
    } finally {
      setSubmitting(false);
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

      <section className="workspace single-column">
        <form className="panel form-panel" onSubmit={submitInitial}>
          <div className="section-heading">
            <h2>{t.formTitle}</h2>
            <p>{t.province}</p>
          </div>

          {sheetMessage && <div className="success">{sheetMessage}</div>}
          {sheetError && <div className="error">{sheetError}</div>}

          <div className="field">
            <span>{t.serviceType}</span>
            <div className="service-card-grid">
              {["mobile", "internet", "both"].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={form.service_type === value ? "service-card active" : "service-card"}
                  onClick={() => update("service_type", value)}
                >
                  {t.serviceCards[value]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid form-grid-top">
            <Field label={t.city}>
              <Select value={form.city} onChange={(value) => update("city", value)}>
                {areaOptions.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.labelKey ? t.options[area.labelKey] : area.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label={t.provider}>
              <Select value={form.current_provider} onChange={(value) => update("current_provider", value)}>
                {providerOptions.map((provider) => (
                  <option key={provider} value={provider}>
                    {optionLabel(t, provider)}
                  </option>
                ))}
              </Select>
            </Field>

            <Field
              label={
                form.service_type === "internet"
                  ? t.monthlyPriceInternet
                  : form.service_type === "mobile"
                    ? t.monthlyPriceMobile
                    : t.monthlyPriceBoth
              }
            >
              <input
                type="number"
                min="0"
                inputMode="decimal"
                value={form.monthly_price}
                onChange={(event) => update("monthly_price", event.target.value)}
                placeholder={t.monthlyPlaceholder}
                required
              />
            </Field>

            {showInternet && (
              <Field label={t.currentSpeed}>
                <Select value={form.current_speed} onChange={(value) => update("current_speed", value)}>
                  {speedOptions.map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(t, value)}
                    </option>
                  ))}
                </Select>
              </Field>
            )}

            {showMobile && (
              <Field label={t.currentMobileData}>
                <Select value={form.current_mobile_data} onChange={(value) => update("current_mobile_data", value)}>
                  {mobileDataOptions.map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(t, value)}
                    </option>
                  ))}
                </Select>
              </Field>
            )}

            <Field label={t.postalPrefix}>
              <input
                value={form.postal_code}
                onChange={(event) => update("postal_code", event.target.value.toUpperCase().slice(0, 3))}
                placeholder={t.postalPlaceholder}
              />
            </Field>

            <Field label={t.willingToSwitch}>
              <Select value={form.willing_to_switch} onChange={(value) => update("willing_to_switch", value)}>
                {["can_consider", "yes", "no", "just_checking"].map((value) => (
                  <option key={value} value={value}>
                    {t.options[value]}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label={t.notes}>
            <textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} rows="4" />
          </Field>

          <button className="submit-button" type="submit">
            {t.submit}
          </button>
        </form>
      </section>

      {resultOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setResultOpen(false)}>
          <div className="modal panel result-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <div className="section-heading">
              <div>
                <h2>{t.billScore}</h2>
              </div>
              <button className="modal-close" type="button" onClick={() => setResultOpen(false)} aria-label={t.close}>
                ×
              </button>
            </div>

            <div className="result-stack">
              <section className={`score-box ${scoreTone(score)}`}>
                <div>
                  <span>{t.billScore}</span>
                  <strong>{score}</strong>
                </div>
                <div className="savings-line">
                  <span>{t.estimatedYearlySavings}</span>
                  <strong>{t.yearlySavingsValue(yearlySavings)}</strong>
                </div>
              </section>

              <section>
                <h3>{t.planTitle}</h3>
                <div className="plan-list">
                  {recommendations.map((offer) => (
                    <article className="plan-card" key={offer.offer_id}>
                      <p>
                        <b>{t.pickType}</b> {t[offer.pickTypeKey]}
                      </p>
                      <p>
                        <b>{t.providerLabel}</b> {offer.provider}
                      </p>
                      <p>
                        <b>{t.service}</b> {displayPlanName(offer, t)}
                      </p>
                      <p>
                        <b>{t.price}</b> {displayPrice(offer, t, language)}
                      </p>
                      <p>
                        <b>{t.savings}</b> {savingsText(offer, form, t, language)}
                      </p>
                      <p>
                        <b>{t.planType}</b> {planTypeLabel(offer, t)}
                      </p>
                      <p>
                        <b>{t.goodFor}</b> {localizedGoodFor(offer, form, t)}
                      </p>
                      <p>
                        <b>{t.note}</b> {localizedNote(offer, t)}
                      </p>
                      {isPremiumProvider(offer) && (
                        <div className="premium-cta-wrap">
                          <button className="premium-cta" type="button" onClick={openLeadFromResult}>
                            {t.bestPrice}
                          </button>
                          <small>{t.bestPriceHelp}</small>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section className="caution-box">
                <h3>{t.cautionTitle}</h3>
                <ul>
                  {t.cautionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="group-section in-modal">
                <h2>{t.groupTitle}</h2>
                <p>{t.groupDescription}</p>
                <div className="qr-placeholder">{t.qrPlaceholder}</div>
              </section>

              <p className="disclaimer">{t.disclaimer}</p>
            </div>
          </div>
        </div>
      )}

      {leadOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setLeadOpen(false)}>
          <form className="modal panel" onSubmit={submitLead} onMouseDown={(event) => event.stopPropagation()}>
            <div className="section-heading">
              <div>
                <h2>{t.leadTitle}</h2>
                <p>{t.leadIntro}</p>
              </div>
              <button className="modal-close" type="button" onClick={() => setLeadOpen(false)} aria-label={t.close}>
                ×
              </button>
            </div>

            <div className="grid">
              <Field label={t.name}>
                <input value={lead.name} onChange={(event) => updateLead("name", event.target.value)} required />
              </Field>
              <Field label={t.email}>
                <input type="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} />
              </Field>
              <Field label={t.phone}>
                <input type="tel" value={lead.phone} onChange={(event) => updateLead("phone", event.target.value)} />
              </Field>
              <Field label={t.preferredContact}>
                <Select value={lead.preferred_contact} onChange={(value) => updateLead("preferred_contact", value)}>
                  {["email", "text", "phone"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t.wechat}>
                <input value={lead.wechat} onChange={(event) => updateLead("wechat", event.target.value)} />
              </Field>
            </div>

            <button className="submit-button" type="submit" disabled={submitting}>
              {submitting ? t.submitting : t.leadSubmit}
            </button>
          </form>
        </div>
      )}

      <footer className="site-footer">{t.footer}</footer>
    </main>
  );
}
