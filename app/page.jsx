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
    hero: "输入当前手机或宽带账单，查看账单评分、参考可选方案，并提交给人工结合本周可用优惠复核。",
    formTitle: "账单信息",
    province: "默认地区：Prince Edward Island",
    serviceType: "你想检查哪类账单？",
    city: "你住在哪个区域？",
    internetTitle: "宽带账单",
    internetProvider: "当前宽带运营商",
    internetMonthlyPrice: "宽带月费",
    internetPricePlaceholder: "例如 95",
    mobileTitle: "手机账单",
    mobileProvider: "当前手机运营商",
    mobileMonthlyPrice: "手机月费",
    mobilePricePlaceholder: "例如 55",
    priceType: "价格类型",
    currentSpeed: "当前宽带速度",
    currentMobileData: "当前手机流量",
    otherTitle: "联系方式和偏好",
    postalPrefix: "邮编前三位",
    postalPlaceholder: "例如 C1A",
    contractStatus: "合约状态",
    willingToSwitch: "如果有更合适的方案，你是否可以考虑更换？",
    mainPriority: "主要优先级",
    name: "姓名（选填）",
    email: "邮箱（选填）",
    phone: "电话（选填）",
    preferredContact: "偏好联系方式",
    wechat: "微信（选填）",
    referralCode: "推荐码（选填）",
    notes: "备注",
    submit: "查看账单体检结果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的账单信息。我们会人工查看你填写的内容，并结合 PEI 本地本周可用优惠进行初步判断。",
    sheetError: "提交失败，请稍后再试，或直接通过电话 / 邮箱联系我们。",
    resultTitle: "体检结果",
    emptyState: "填写左侧信息后，这里会显示账单评分和参考方案。",
    billScore: "账单评分",
    scoreHelper: "分数仅作为账单体检参考，最终节省空间需要结合本周可用优惠人工确认。",
    planTitle: "参考可选方案",
    provider: "服务商：",
    service: "参考服务：",
    price: "参考价格：",
    savings: "预计可节约：",
    goodFor: "适合使用：",
    note: "说明：",
    bellPrice: "本周可用优惠需人工确认",
    bellSavings: "提交信息后人工确认",
    bestPrice: "✓ 获得最佳价格 →",
    bestPriceHelp: "提交后人工确认本周可用优惠",
    cautionTitle: "不建议或需要谨慎的地方",
    groupTitle: "加入 PEI 账单省钱群",
    groupDescription:
      "我们会不定期分享 PEI 手机、宽带和家庭账单相关的省钱信息。本周可用优惠可能变化，具体价格和资格需要人工确认。",
    qrPlaceholder: "群二维码位置",
    modalTitle: "人工复核",
    modalIntro: "留下联系方式和补充说明，我们会按你填写的账单信息进行人工初步判断。",
    modalSubmit: "提交人工复核",
    modalClose: "关闭",
    disclaimer:
      "最终价格、资格、地址覆盖、安装、税费、设备费和信用审核以运营商或授权销售人员确认为准。",
    footer:
      "请勿提交 SIN、银行卡、完整账号、完整账单或身份证件照片。本工具只需要大概套餐信息来做初步判断。",
    serviceCards: {
      mobile: "手机账单",
      internet: "宽带账单",
      both: "宽带 + 手机"
    },
    options: {
      before_tax: "税前",
      after_tax: "税后",
      not_sure: "不确定",
      other_pei: "其他 PEI 地区",
      not_in_pei: "不在 PEI",
      no_contract: "无合约",
      contract: "有合约",
      promo_ending: "优惠快结束",
      can_consider: "可以考虑",
      yes: "愿意",
      no: "暂时不想",
      just_checking: "只想先看看",
      save_money: "省钱优先",
      stability: "稳定优先",
      speed_or_data: "速度/流量优先",
      low_hassle: "少折腾",
      retention_first: "先谈保留优惠",
      email: "邮箱",
      phone: "电话",
      wechat: "微信",
      other: "其他",
      notSure: "不确定"
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
      low:
        "日常上网、微信视频、YouTube / Netflix、1-2 人远程办公、普通高清视频。如果多人同时 4K、游戏、直播或大量下载，可能不够稳。",
      mid:
        "多数家庭日常使用、4K 视频、视频会议、在线学习、远程办公、普通游戏。如果多人同时高清直播或大量下载，建议考虑 500M 以上。",
      high:
        "大多数家庭使用，支持 4K 视频、多人视频会议、远程办公、在线学习、普通游戏、直播观看。对 PEI 普通家庭来说，500M 通常已经够用。",
      premium:
        "多人家庭、重度远程办公、大量下载上传、游戏、多个设备同时 4K 视频、内容创作或更高稳定性需求。如果只是普通上网和视频，可能有些超配。"
    },
    mobileGoodFor: {
      "5GB": "主要连 Wi-Fi，偶尔用手机数据查地图、微信、邮件、网页。如果经常刷视频或出门办公，可能不够。",
      "10GB": "轻度手机数据用户，日常聊天、地图、邮件、网页、少量短视频。如果经常看视频、直播或热点共享，可能不够。",
      "20GB": "轻中度用户，日常社交、地图、网页、音乐、少量视频。如果经常在外看视频或开热点，建议考虑 50GB 以上。",
      "50GB": "大多数用户，日常社交、地图、音乐、短视频、YouTube、偶尔热点共享。如果不是长期用手机当家庭网络，50GB 通常够用。",
      "75GB": "重度手机数据用户，经常在外看视频、短视频、直播、热点共享、远程工作备用网络。如果平时大部分时间连 Wi-Fi，可能有些超配。",
      "100GB": "重度手机数据用户，经常在外看视频、短视频、直播、热点共享、远程工作备用网络。如果平时大部分时间连 Wi-Fi，可能有些超配。",
      "150GB+": "非常重度用户，经常热点共享、长时间视频、移动办公、没有稳定 Wi-Fi 的场景。普通用户通常不需要这么高流量。",
      not_sure: "不确定的话，可以先根据你现在的月费和使用习惯人工判断。"
    }
  },
  zhHant: {
    languageName: "繁體中文",
    eyebrow: "僅限 PEI · v1",
    title: "Bill Saver｜PEI 手機寬頻帳單免費體檢",
    hero: "輸入目前手機或寬頻帳單，查看帳單評分、參考可選方案，並提交給人工結合本週可用優惠複核。",
    formTitle: "帳單資訊",
    province: "預設地區：Prince Edward Island",
    serviceType: "你想檢查哪類帳單？",
    city: "你住在哪個區域？",
    internetTitle: "寬頻帳單",
    internetProvider: "目前寬頻業者",
    internetMonthlyPrice: "寬頻月費",
    internetPricePlaceholder: "例如 95",
    mobileTitle: "手機帳單",
    mobileProvider: "目前手機業者",
    mobileMonthlyPrice: "手機月費",
    mobilePricePlaceholder: "例如 55",
    priceType: "價格類型",
    currentSpeed: "目前寬頻速度",
    currentMobileData: "目前手機流量",
    otherTitle: "聯絡方式和偏好",
    postalPrefix: "郵遞區號前三碼",
    postalPlaceholder: "例如 C1A",
    contractStatus: "合約狀態",
    willingToSwitch: "如果有更合適的方案，你是否可以考慮更換？",
    mainPriority: "主要優先順序",
    name: "姓名（選填）",
    email: "電郵（選填）",
    phone: "電話（選填）",
    preferredContact: "偏好聯絡方式",
    wechat: "微信（選填）",
    referralCode: "推薦碼（選填）",
    notes: "備註",
    submit: "查看帳單體檢結果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的帳單資訊。我們會人工查看你填寫的內容，並結合 PEI 本地本週可用優惠進行初步判斷。",
    sheetError: "提交失敗，請稍後再試，或直接透過電話 / 電郵聯絡我們。",
    resultTitle: "體檢結果",
    emptyState: "填寫左側資訊後，這裡會顯示帳單評分和參考方案。",
    billScore: "帳單評分",
    scoreHelper: "分數僅作為帳單健檢參考，最終節省空間需要結合本週可用優惠人工確認。",
    planTitle: "參考可選方案",
    provider: "電信商：",
    service: "參考服務：",
    price: "參考價格：",
    savings: "預計可節省：",
    goodFor: "適合使用：",
    note: "說明：",
    bellPrice: "本週可用優惠需人工確認",
    bellSavings: "提交資訊後人工確認",
    bestPrice: "✓ 取得最佳價格 →",
    bestPriceHelp: "提交後人工確認本週可用優惠",
    cautionTitle: "不建議或需要謹慎的地方",
    groupTitle: "加入 PEI 帳單省錢群",
    groupDescription:
      "我們會不定期分享 PEI 手機、寬頻和家庭帳單相關的省錢資訊。本週可用優惠可能變化，具體價格和資格需要人工確認。",
    qrPlaceholder: "群 QR Code 位置",
    modalTitle: "人工複核",
    modalIntro: "留下聯絡方式和補充說明，我們會按你填寫的帳單資訊進行人工初步判斷。",
    modalSubmit: "提交人工複核",
    modalClose: "關閉",
    disclaimer:
      "最終價格、資格、地址覆蓋、安裝、稅費、設備費和信用審核以電信商或授權銷售人員確認為準。",
    footer:
      "請勿提交 SIN、銀行卡、完整帳號、完整帳單或身分證件照片。本工具只需要大概方案資訊來做初步判斷。",
    serviceCards: {
      mobile: "手機帳單",
      internet: "寬頻帳單",
      both: "寬頻 + 手機"
    },
    options: {
      before_tax: "稅前",
      after_tax: "稅後",
      not_sure: "不確定",
      other_pei: "其他 PEI 地區",
      not_in_pei: "不在 PEI",
      no_contract: "無合約",
      contract: "有合約",
      promo_ending: "優惠快結束",
      can_consider: "可以考慮",
      yes: "願意",
      no: "暫時不想",
      just_checking: "只想先看看",
      save_money: "省錢優先",
      stability: "穩定優先",
      speed_or_data: "速度/流量優先",
      low_hassle: "少折騰",
      retention_first: "先談保留優惠",
      email: "電郵",
      phone: "電話",
      wechat: "微信",
      other: "其他",
      notSure: "不確定"
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
      low:
        "日常上網、微信視訊、YouTube / Netflix、1-2 人遠端工作、一般高畫質影片。如果多人同時 4K、遊戲、直播或大量下載，可能不夠穩。",
      mid:
        "多數家庭日常使用、4K 影片、視訊會議、線上學習、遠端工作、一般遊戲。如果多人同時高畫質直播或大量下載，建議考慮 500M 以上。",
      high:
        "大多數家庭使用，支援 4K 影片、多人視訊會議、遠端工作、線上學習、一般遊戲、直播觀看。對 PEI 一般家庭來說，500M 通常已經夠用。",
      premium:
        "多人家庭、重度遠端工作、大量下載上傳、遊戲、多個設備同時 4K 影片、內容創作或更高穩定性需求。如果只是一般上網和影片，可能有些超配。"
    },
    mobileGoodFor: {
      "5GB": "主要連 Wi-Fi，偶爾用手機數據查地圖、微信、電郵、網頁。如果經常刷影片或外出辦公，可能不夠。",
      "10GB": "輕度手機數據用戶，日常聊天、地圖、電郵、網頁、少量短影片。如果經常看影片、直播或熱點分享，可能不夠。",
      "20GB": "輕中度用戶，日常社交、地圖、網頁、音樂、少量影片。如果經常在外看影片或開熱點，建議考慮 50GB 以上。",
      "50GB": "大多數用戶，日常社交、地圖、音樂、短影片、YouTube、偶爾熱點分享。如果不是長期用手機當家庭網路，50GB 通常夠用。",
      "75GB": "重度手機數據用戶，經常在外看影片、短影片、直播、熱點分享、遠端工作備用網路。如果平時大部分時間連 Wi-Fi，可能有些超配。",
      "100GB": "重度手機數據用戶，經常在外看影片、短影片、直播、熱點分享、遠端工作備用網路。如果平時大部分時間連 Wi-Fi，可能有些超配。",
      "150GB+": "非常重度用戶，經常熱點分享、長時間影片、移動辦公、沒有穩定 Wi-Fi 的場景。一般用戶通常不需要這麼高流量。",
      not_sure: "不確定的話，可以先根據你現在的月費和使用習慣人工判斷。"
    }
  },
  en: {
    languageName: "English",
    eyebrow: "PEI only · v1",
    title: "Bill Saver | Free PEI Mobile and Internet Bill Check",
    hero:
      "Enter your current phone or internet bill to see a bill score, reference optional plans, and submit for manual review against available weekly offers.",
    formTitle: "Bill details",
    province: "Default region: Prince Edward Island",
    serviceType: "Which bill do you want to check?",
    city: "Which area are you in?",
    internetTitle: "Internet bill",
    internetProvider: "Current internet provider",
    internetMonthlyPrice: "Internet monthly price",
    internetPricePlaceholder: "e.g. 95",
    mobileTitle: "Mobile bill",
    mobileProvider: "Current mobile provider",
    mobileMonthlyPrice: "Mobile monthly price",
    mobilePricePlaceholder: "e.g. 55",
    priceType: "Price type",
    currentSpeed: "Current internet speed",
    currentMobileData: "Current mobile data",
    otherTitle: "Contact and preferences",
    postalPrefix: "Postal code prefix",
    postalPlaceholder: "e.g. C1A",
    contractStatus: "Contract status",
    willingToSwitch: "If there is a better option, would you consider switching?",
    mainPriority: "Main priority",
    name: "Name (optional)",
    email: "Email (optional)",
    phone: "Phone (optional)",
    preferredContact: "Preferred contact",
    wechat: "WeChat (optional)",
    referralCode: "Referral code (optional)",
    notes: "Notes",
    submit: "View bill check result",
    submitting: "Submitting...",
    sheetSuccess:
      "We have received your bill information. We will manually review your details and compare them with available weekly PEI offers.",
    sheetError: "Submission failed. Please try again later or contact us directly by phone or email.",
    resultTitle: "Check Result",
    emptyState: "Fill in the form to see your bill score and reference options.",
    billScore: "Bill Score",
    scoreHelper:
      "This score is only a bill check reference. Final savings depend on available weekly offers and manual confirmation.",
    planTitle: "Reference Optional Plans",
    provider: "Provider:",
    service: "Reference service:",
    price: "Reference price:",
    savings: "Estimated savings:",
    goodFor: "Good for:",
    note: "Note:",
    bellPrice: "Available weekly offer requires manual confirmation",
    bellSavings: "Confirmed after submission",
    bestPrice: "✓ Get the Best Price →",
    bestPriceHelp: "We'll manually confirm available weekly offers",
    cautionTitle: "Things to Watch Carefully",
    groupTitle: "Join the PEI Bill-Saving Group",
    groupDescription:
      "We occasionally share PEI phone, internet, and household bill-saving tips. Available weekly offers may change, and final pricing and eligibility require manual confirmation.",
    qrPlaceholder: "Group QR Code Placeholder",
    modalTitle: "Manual review",
    modalIntro: "Leave your contact details and extra notes. We will manually review the bill information you provided.",
    modalSubmit: "Submit manual review",
    modalClose: "Close",
    disclaimer:
      "Final pricing, eligibility, address availability, installation, taxes, equipment fees, and credit approval must be confirmed by the provider or an authorized sales representative.",
    footer:
      "Do not submit SIN, bank card details, full account numbers, full bills, or identity-document photos. This tool only needs approximate plan details for a preliminary check.",
    serviceCards: {
      mobile: "Mobile bill",
      internet: "Internet bill",
      both: "Internet + Mobile"
    },
    options: {
      before_tax: "Before tax",
      after_tax: "After tax",
      not_sure: "Not sure",
      other_pei: "Other PEI area",
      not_in_pei: "Not in PEI",
      no_contract: "No contract",
      contract: "In contract",
      promo_ending: "Promo ending",
      can_consider: "Open to considering",
      yes: "Yes",
      no: "Not right now",
      just_checking: "Just checking",
      save_money: "Save money",
      stability: "Stability",
      speed_or_data: "Speed or data",
      low_hassle: "Low hassle",
      retention_first: "Try retention first",
      email: "Email",
      phone: "Phone",
      wechat: "WeChat",
      other: "Other",
      notSure: "Not sure"
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
      "5GB": "Mostly Wi-Fi users who occasionally use mobile data for maps, messaging, email, and browsing. It may not be enough for frequent video or mobile work.",
      "10GB": "Light data users for messaging, maps, email, browsing, and limited short videos. It may not be enough for frequent video, streaming, or hotspot sharing.",
      "20GB": "Light to moderate users for social apps, maps, browsing, music, and some video. If you often watch video outside or use hotspot, 50GB or more may be better.",
      "50GB": "Most users, including social apps, maps, music, short videos, YouTube, and occasional hotspot sharing. If you are not using your phone as home internet, 50GB is usually enough.",
      "75GB": "Heavy mobile data users who often watch videos, short videos, streams, share hotspot, or use mobile data as backup for remote work. It may be more than needed if you are usually on Wi-Fi.",
      "100GB": "Heavy mobile data users who often watch videos, short videos, streams, share hotspot, or use mobile data as backup for remote work. It may be more than needed if you are usually on Wi-Fi.",
      "150GB+": "Very heavy users with frequent hotspot sharing, long video sessions, mobile work, or limited Wi-Fi access. Most users do not need this much data.",
      not_sure: "If you are not sure, we can manually review it based on your current bill and usage habits."
    }
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

const internetProviders = ["Bell / Bell Aliant", "Eastlink", "Koodo Internet", "Purple Cow", "Xplore", "Starlink", "Rogers", "Other", "Not sure"];
const mobileProviders = ["TELUS", "Koodo", "Public Mobile", "Bell", "Virgin Plus", "Rogers", "Fido", "Freedom Mobile", "Lucky Mobile", "Chatr", "Other", "Not sure"];
const speedOptions = ["100M", "300M", "500M", "1G", "1.5G", "3G", "not_sure"];
const mobileDataOptions = ["5GB", "10GB", "20GB", "50GB", "75GB", "100GB", "150GB+", "not_sure"];

const initialForm = {
  service_type: "both",
  city: "Charlottetown",
  internet_provider: "Bell / Bell Aliant",
  internet_monthly_price: "",
  mobile_provider: "TELUS",
  mobile_monthly_price: "",
  price_type: "before_tax",
  current_speed: "500M",
  current_mobile_data: "50GB",
  postal_prefix: "",
  contract_status: "not_sure",
  willing_to_switch: "can_consider",
  main_priority: "save_money",
  notes: "",
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

function optionLabel(t, value) {
  if (value === "Other") return t.options.other;
  if (value === "Not sure" || value === "not_sure") return t.options.not_sure;
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

function averagePrice(form) {
  const prices = [];
  if (form.service_type !== "mobile" && Number(form.internet_monthly_price)) prices.push(Number(form.internet_monthly_price));
  if (form.service_type !== "internet" && Number(form.mobile_monthly_price)) prices.push(Number(form.mobile_monthly_price));
  if (!prices.length) return 0;
  return prices.reduce((sum, price) => sum + price, 0) / prices.length;
}

function benchmarkFor(form) {
  if (form.service_type === "internet") return 75;
  if (form.service_type === "mobile") return 45;
  return 115;
}

function calculateScore(form) {
  const price =
    form.service_type === "both"
      ? Number(form.internet_monthly_price || 0) + Number(form.mobile_monthly_price || 0)
      : averagePrice(form);
  if (!price) return 62;
  const benchmark = benchmarkFor(form);
  const overage = price - benchmark;
  const score = Math.round(74 - overage * 0.55);
  return Math.max(32, Math.min(88, score));
}

function scoreTone(score) {
  if (score >= 76) return "healthy";
  if (score >= 50) return "medium";
  return "alert";
}

function speedBucket(speed) {
  if (speed === "100M") return "low";
  if (speed === "300M") return "mid";
  if (speed === "500M") return "high";
  return "premium";
}

function money(value, language) {
  if (typeof value !== "number") return value;
  return language === "en" ? `$${value}/mo` : `$${value}/月`;
}

function estimateSavings(current, target, language) {
  if (typeof target !== "number") return target;
  const saving = Math.max(0, Math.round(Number(current || 0) - target));
  if (!saving) return language === "en" ? "Needs manual review" : "需要人工确认";
  return language === "en" ? `Up to about $${saving}/mo before confirmation` : `约 $${saving}/月，需确认`;
}

function getReferencePlans(form, t, language) {
  const plans = [];
  const showInternet = form.service_type === "internet" || form.service_type === "both";
  const showMobile = form.service_type === "mobile" || form.service_type === "both";

  if (showInternet) {
    plans.push({
      provider: "Koodo Internet",
      service: `Home Internet ${form.current_speed === "not_sure" ? "500M" : form.current_speed}`,
      price: 70,
      savings: estimateSavings(form.internet_monthly_price, 70, language),
      goodFor: t.internetGoodFor[speedBucket(form.current_speed)],
      note:
        language === "en"
          ? "Reference only. Address availability, taxes, equipment, installation, and eligibility must be confirmed."
          : "仅作参考。地址覆盖、税费、设备、安装和资格都需要确认。"
    });
    plans.push({
      provider: "Bell",
      service: language === "en" ? "Internet offer requiring manual confirmation" : "需人工确认的宽带优惠",
      price: t.bellPrice,
      savings: t.bellSavings,
      goodFor: t.internetGoodFor[speedBucket(form.current_speed)],
      note:
        language === "en"
          ? "Bell pricing is not shown as a guaranteed offer. Submit details for manual review."
          : "Bell 价格不作为保证报价展示，提交信息后人工复核。"
    });
  }

  if (showMobile) {
    plans.push({
      provider: "Public Mobile",
      service: `${form.current_mobile_data === "not_sure" ? "50GB" : form.current_mobile_data} BYOD`,
      price: 39,
      savings: estimateSavings(form.mobile_monthly_price, 39, language),
      goodFor: t.mobileGoodFor[form.current_mobile_data],
      note:
        language === "en"
          ? "Often a low-cost BYOD reference. Support and exact plan terms should be confirmed."
          : "常作为低价 BYOD 参考，支持方式和具体条款需确认。"
    });
    plans.push({
      provider: "TELUS",
      service: `${form.current_mobile_data === "not_sure" ? "50GB+" : form.current_mobile_data} mobile plan`,
      price: 55,
      savings: estimateSavings(form.mobile_monthly_price, 55, language),
      goodFor: t.mobileGoodFor[form.current_mobile_data],
      note:
        language === "en"
          ? "Useful when network, 5G, family lines, or store support matter. Final pricing must be confirmed."
          : "适合重视网络、5G、家庭多线或门店支持的用户，最终价格需确认。"
    });
  }

  return plans.slice(0, 3);
}

function buildSheetPayload({ form, language, source, manualReview = {} }) {
  const serviceType = form.service_type || "";
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
    service_type: serviceType,
    current_provider: getCurrentProvider(form),
    monthly_price: getMonthlyPrice(form),
    price_type: form.price_type || "",
    current_speed: serviceType === "internet" || serviceType === "both" ? form.current_speed : "",
    current_mobile_data: serviceType === "mobile" || serviceType === "both" ? form.current_mobile_data : "",
    plan_details: JSON.stringify({
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
  const [sheetSubmitting, setSheetSubmitting] = useState(false);
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [showManualReview, setShowManualReview] = useState(false);
  const [manualReview, setManualReview] = useState(initialManualReview);
  const [sheetMessage, setSheetMessage] = useState("");
  const [sheetError, setSheetError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const t = translations[language];

  const showInternet = form.service_type === "internet" || form.service_type === "both";
  const showMobile = form.service_type === "mobile" || form.service_type === "both";
  const score = useMemo(() => calculateScore(form), [form]);
  const referencePlans = useMemo(() => getReferencePlans(form, t, language), [form, t, language]);
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
    if (sheetSubmitting) return;

    setSheetSubmitting(true);
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
      setHasSubmitted(true);
    } catch {
      setSheetError(t.sheetError);
    } finally {
      setSheetSubmitting(false);
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
      setHasSubmitted(true);
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

            <Field label={t.priceType}>
              <Select value={form.price_type} onChange={(value) => update("price_type", value)}>
                {["before_tax", "after_tax"].map((value) => (
                  <option key={value} value={value}>
                    {t.options[value]}
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

                <Field label={t.currentSpeed}>
                  <Select value={form.current_speed} onChange={(value) => update("current_speed", value)}>
                    {speedOptions.map((value) => (
                      <option key={value} value={value}>
                        {optionLabel(t, value)}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
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

                <Field label={t.currentMobileData}>
                  <Select value={form.current_mobile_data} onChange={(value) => update("current_mobile_data", value)}>
                    {mobileDataOptions.map((value) => (
                      <option key={value} value={value}>
                        {optionLabel(t, value)}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
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
                  {["not_sure", "no_contract", "contract", "promo_ending"].map((value) => (
                    <option key={value} value={value}>
                      {t.options[value]}
                    </option>
                  ))}
                </Select>
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

          <button className="submit-button" type="submit" disabled={sheetSubmitting || !canSubmit}>
            {sheetSubmitting ? t.submitting : t.submit}
          </button>
        </form>

        <aside className="panel result-panel">
          <div className="section-heading">
            <h2>{t.resultTitle}</h2>
          </div>

          {sheetMessage && <div className="success">{sheetMessage}</div>}
          {sheetError && <div className="error">{sheetError}</div>}

          {!hasSubmitted && !sheetMessage && <div className="empty-state">{t.emptyState}</div>}

          {(hasSubmitted || sheetMessage) && (
            <div className="result-stack">
              <section className={`score-box ${scoreTone(score)}`}>
                <div>
                  <span>{t.billScore}</span>
                  <strong>{score} / 100</strong>
                </div>
                <p>{t.scoreHelper}</p>
              </section>

              <section>
                <h3>{t.planTitle}</h3>
                <div className="plan-list">
                  {referencePlans.map((plan) => {
                    const premium = /Koodo|TELUS|Bell/i.test(plan.provider);
                    const bell = /Bell/i.test(plan.provider);
                    return (
                      <article className="plan-card" key={`${plan.provider}-${plan.service}`}>
                        <p>
                          <b>{t.provider}</b> {plan.provider}
                        </p>
                        <p>
                          <b>{t.service}</b> {plan.service}
                        </p>
                        <p>
                          <b>{t.price}</b> {bell ? t.bellPrice : money(plan.price, language)}
                        </p>
                        <p>
                          <b>{t.savings}</b> {bell ? t.bellSavings : plan.savings}
                        </p>
                        <p>
                          <b>{t.goodFor}</b> {plan.goodFor}
                        </p>
                        <p>
                          <b>{t.note}</b> {plan.note}
                        </p>
                        {premium && (
                          <div className="premium-cta-wrap">
                            <button className="premium-cta" type="button" onClick={() => setShowManualReview(true)}>
                              {t.bestPrice}
                            </button>
                            <small>{t.bestPriceHelp}</small>
                          </div>
                        )}
                      </article>
                    );
                  })}
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

              <p className="disclaimer">{t.disclaimer}</p>
            </div>
          )}
        </aside>
      </section>

      <section className="group-section">
        <h2>{t.groupTitle}</h2>
        <p>{t.groupDescription}</p>
        <div className="qr-placeholder">{t.qrPlaceholder}</div>
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
