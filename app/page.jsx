"use client";

import Image from "next/image";
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
    hero: "先输入账单信息查看体检结果。想拿到可用优惠时，再提交联系方式给人工复核。",
    heroFlowTitle: "3 步免费体检流程",
    heroFlowSteps: ["输入账单信息", "查看体检结果", "提交联系方式获取可用优惠"],
    heroFlowHelper: "全程免费。先看结果，再决定是否需要人工复核。",
    formTitle: "账单信息",
    province: "默认地区：Prince Edward Island",
    serviceType: "你想检查哪类账单？",
    city: "你住在哪个区域？",
    provider: "当前运营商",
    providerInternet: "你现在用的是哪家宽带？",
    providerMobile: "你现在用的是哪家手机运营商？",
    providerBoth: "你现在主要用的是哪家运营商？",
    monthlyPriceInternet: "宽带月费（税前）",
    monthlyPriceMobile: "手机月费",
    monthlyPriceBoth: "每月总费用",
    monthlyPlaceholder: "例如 95",
    internetUsageLevel: "家庭上网使用情况",
    currentMobileData: "当前手机流量",
    currentMobileDataQuestion: "你每月大概用多少手机流量？",
    postalPrefix: "邮编前三位",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合适的方案，你是否可以考虑更换？",
    notes: "备注",
    submit: "查看体检结果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的账单信息。我们会人工查看你填写的内容，并结合 PEI 本地可用优惠进行初步判断。",
    sheetError: "提交失败，请稍后再试，或直接通过电话 / 邮箱联系我们。",
    billScore: "账单评分",
    estimatedYearlySavings: "预计全年可节约",
    yearlySavingsValue: (value) => `约 $${value} / 年`,
    scoreStatus: "还有明显优化空间",
    savingsHelper: "根据你当前账单初步估算",
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
    bellPrice: "可用优惠需人工确认",
    bellSavings: "提交信息后人工确认",
    bestPrice: "✨ 获得最佳价格 →",
    bestPriceHelp: "提交后人工确认可用优惠",
    cautionTitle: "不建议或需要谨慎的地方",
    groupTitle: "加入 PEI 账单省钱群",
    groupDescription:
      "我们会不定期分享 PEI 手机、宽带和家庭账单相关的省钱信息。可用优惠可能变化，具体价格和资格需要人工确认。",
    qrPlaceholder: "群二维码位置",
    leadTitle: "获取可用优惠",
    leadIntro: "留下联系方式，人工复核后再确认是否有更合适的方案。",
    trustTitle: "为什么可以放心提交？",
    trustItems: [
      "你提交的信息只用于帮你人工确认 PEI 本地可用的手机 / 宽带优惠",
      "我们不会向你收取任何费用",
      "价格和资格由运营商确认",
      "安装由运营商官方或授权团队完成",
      "你可以先了解方案，再决定是否继续办理"
    ],
    name: "姓名",
    email: "邮箱",
    phone: "电话（选填）",
    preferredContact: "偏好联系方式",
    installationAddress: "宽带安装地址（选填）",
    installationAddressPlaceholder: "例如：街道地址或小区名称，可不填",
    leadSubmit: "提交",
    successTitle: "提交成功",
    successBody: "已收到你的反馈，我们会在 1-2 个工作日内联系你。",
    successHelper: "你也可以返回主页，继续进行其他账单体检。",
    successButton: "返回主页",
    close: "关闭",
    disclaimer: "最终价格、资格、地址覆盖、安装、税费、设备费和信用审核以运营商或授权销售人员确认为准。",
    footer: "请勿提交 SIN、银行卡、完整账号、完整账单或身份证件照片。本工具只需要大概账单信息来做初步判断。",
    serviceCards: { mobile: "手机账单", internet: "宽带账单", both: "宽带 + 手机" },
    usageCards: {
      light: {
        title: "轻度使用",
        description: "1-2 人使用，主要刷网页、微信、邮件、YouTube 和普通视频。"
      },
      standard: {
        title: "普通家庭",
        description: "2-4 人家庭，高清视频 / 4K、视频会议、孩子上网课、普通游戏。"
      },
      heavy: {
        title: "重度家庭",
        description: "多人同时看视频、下载大文件、游戏、远程办公、电视盒子、NAS、摄像头、智能家居设备较多。"
      }
    },
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
    areaCaution:
      "如果你不在 Charlottetown / Stratford / Cornwall，建议优先考虑 Bell 或 TELUS 这类大网，并确认家里、工作地点和常用路线的信号表现，不要只看最低价格。",
    internetGoodFor: {
      low: "日常上网、微信、邮件、YouTube、视频通话、1–2 人普通高清视频。",
      mid: "普通家庭、4K 视频、视频会议、孩子上网课、多设备同时使用、普通游戏。",
      high:
        "大多数家庭、多设备同时使用、4K 视频、视频会议、远程办公、在线学习、普通游戏和较大的下载需求。",
      premium:
        "重度家庭、多人同时 4K、游戏、直播、大文件下载、远程办公、多设备同时使用。"
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
    ,
    purpleCowNote:
      "Purple Cow 适合价格敏感、希望降低宽带月费的用户。通常免安装费、免激活费，并提供首月不满意退款保证。最终可用性、速度、安装条件和退款条款以 Purple Cow 当前确认为准。",
    purpleCowBadges: ["免安装费", "免激活费", "首月不满意可退款"],
    koodoInternetNote:
      "Koodo Internet 适合希望降低宽带月费、接受自助安装、又想保留较好性价比的用户。通常无激活费，并支持免费自助安装；如需要人工指导或上门安装，可以根据地址和资格进一步确认。Koodo 也提供 30 天免费试用 / 不满意退款政策，具体安装方式、退款条件、资格和最终价格以 Koodo 当前条款确认为准。",
    koodoBadges: ["无激活费", "免费自助安装", "30 天免费试用"]
  },
  zhHant: {
    languageName: "繁體中文",
    eyebrow: "僅限 PEI · v1",
    title: "Bill Saver｜PEI 手機寬頻帳單免費體檢",
    hero: "先輸入帳單資訊查看健檢結果。想取得可用優惠時，再提交聯絡方式給人工複核。",
    heroFlowTitle: "3 步免費健檢流程",
    heroFlowSteps: ["輸入帳單資訊", "查看健檢結果", "提交聯絡方式取得可用優惠"],
    heroFlowHelper: "全程免費。先看結果，再決定是否需要人工複核。",
    formTitle: "帳單資訊",
    province: "預設地區：Prince Edward Island",
    serviceType: "你想檢查哪類帳單？",
    city: "你住在哪個區域？",
    provider: "目前業者",
    providerInternet: "你目前用的是哪家寬頻？",
    providerMobile: "你目前用的是哪家手機電信商？",
    providerBoth: "你目前主要用的是哪家電信商？",
    monthlyPriceInternet: "寬頻月費",
    monthlyPriceMobile: "手機月費",
    monthlyPriceBoth: "每月總費用",
    monthlyPlaceholder: "例如 95",
    internetUsageLevel: "家庭上網使用情況",
    currentMobileData: "目前手機流量",
    currentMobileDataQuestion: "你每月大約用多少手機流量？",
    postalPrefix: "郵遞區號前三碼",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合適的方案，你是否可以考慮更換？",
    notes: "備註",
    submit: "查看健檢結果",
    submitting: "提交中...",
    sheetSuccess: "已收到你的帳單資訊。我們會人工查看你填寫的內容，並結合 PEI 本地可用優惠進行初步判斷。",
    sheetError: "提交失敗，請稍後再試，或直接透過電話 / 電郵聯絡我們。",
    billScore: "帳單評分",
    estimatedYearlySavings: "預計全年可節省",
    yearlySavingsValue: (value) => `約 $${value} / 年`,
    scoreStatus: "還有明顯優化空間",
    savingsHelper: "根據你目前帳單初步估算",
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
    bellPrice: "可用優惠需人工確認",
    bellSavings: "提交資訊後人工確認",
    bestPrice: "✨ 取得最佳價格 →",
    bestPriceHelp: "提交後人工確認可用優惠",
    cautionTitle: "不建議或需要謹慎的地方",
    groupTitle: "加入 PEI 帳單省錢群",
    groupDescription:
      "我們會不定期分享 PEI 手機、寬頻和家庭帳單相關的省錢資訊。可用優惠可能變化，具體價格和資格需要人工確認。",
    qrPlaceholder: "群 QR Code 位置",
    leadTitle: "取得可用優惠",
    leadIntro: "留下聯絡方式，人工複核後再確認是否有更合適的方案。",
    trustTitle: "為什麼可以放心提交？",
    trustItems: [
      "你提交的資訊只用於幫你人工確認 PEI 本地可用的手機 / 寬頻優惠",
      "我們不會向你收取任何費用",
      "價格和資格由電信商確認",
      "安裝由電信商官方或授權團隊完成",
      "你可以先了解方案，再決定是否繼續辦理"
    ],
    name: "姓名",
    email: "電郵",
    phone: "電話（選填）",
    preferredContact: "偏好聯絡方式",
    installationAddress: "寬頻安裝地址（選填）",
    installationAddressPlaceholder: "例如：街道地址或社區名稱，可不填",
    leadSubmit: "提交",
    successTitle: "提交成功",
    successBody: "已收到你的回饋，我們會在 1-2 個工作日內聯絡你。",
    successHelper: "你也可以返回首頁，繼續進行其他帳單健檢。",
    successButton: "返回首頁",
    close: "關閉",
    disclaimer: "最終價格、資格、地址覆蓋、安裝、稅費、設備費和信用審核以電信商或授權銷售人員確認為準。",
    footer: "請勿提交 SIN、銀行卡、完整帳號、完整帳單或身分證件照片。本工具只需要大概帳單資訊來做初步判斷。",
    serviceCards: { mobile: "手機帳單", internet: "寬頻帳單", both: "寬頻 + 手機" },
    usageCards: {
      light: {
        title: "輕度使用",
        description: "1-2 人使用，主要瀏覽網頁、微信、電郵、YouTube 和一般影片。"
      },
      standard: {
        title: "一般家庭",
        description: "2-4 人家庭，高畫質影片 / 4K、視訊會議、孩子上網課、一般遊戲。"
      },
      heavy: {
        title: "重度家庭",
        description: "多人同時看影片、下載大型檔案、遊戲、遠端工作、電視盒、NAS、攝影機、智能家居設備較多。"
      }
    },
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
    areaCaution:
      "如果你不在 Charlottetown / Stratford / Cornwall，建議優先考慮 Bell 或 TELUS 這類大網，並確認家中、工作地點和常用路線的訊號表現，不要只看最低價格。",
    internetGoodFor: {
      low: "日常上網、微信、電郵、YouTube、視訊通話、1–2 人一般高清影片。",
      mid: "一般家庭、4K 影片、視訊會議、孩子上網課、多設備同時使用、一般遊戲。",
      high:
        "大多數家庭、多設備同時使用、4K 影片、視訊會議、遠端工作、線上學習、一般遊戲和較大型下載需求。",
      premium:
        "重度家庭、多人同時 4K、遊戲、直播、大型檔案下載、遠端工作、多設備同時使用。"
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
    ,
    purpleCowNote:
      "Purple Cow 適合價格敏感、希望降低寬頻月費的用戶。通常免安裝費、免啟用費，並提供首月不滿意退款保證。最終可用性、速度、安裝條件和退款條款以 Purple Cow 目前確認為準。",
    purpleCowBadges: ["免安裝費", "免啟用費", "首月不滿意可退款"],
    koodoInternetNote:
      "Koodo Internet 適合希望降低寬頻月費、接受自助安裝、又想保留較好性價比的用戶。通常無啟用費，並支援免費自助安裝；如需要人工指導或上門安裝，可以根據地址和資格進一步確認。Koodo 也提供 30 天免費試用 / 不滿意退款政策，具體安裝方式、退款條件、資格和最終價格以 Koodo 目前條款確認為準。",
    koodoBadges: ["無啟用費", "免費自助安裝", "30 天免費試用"]
  },
  en: {
    languageName: "English",
    eyebrow: "PEI only · v1",
    title: "Bill Saver | Free PEI Mobile and Internet Bill Check",
    hero: "Enter bill details first to see your result. If you want available offers, submit contact details for manual review afterward.",
    heroFlowTitle: "3-Step Free Bill Check",
    heroFlowSteps: ["Enter your bill", "View your result", "Submit contact details to access available offers"],
    heroFlowHelper: "Free to use. Check your result first, then decide whether you want manual follow-up.",
    formTitle: "Bill details",
    province: "Default region: Prince Edward Island",
    serviceType: "Which bill do you want to check?",
    city: "Which area are you in?",
    provider: "Current provider",
    providerInternet: "Who is your current internet provider?",
    providerMobile: "Who is your current mobile provider?",
    providerBoth: "Who is your main current provider?",
    monthlyPriceInternet: "Internet monthly bill",
    monthlyPriceMobile: "Mobile monthly bill",
    monthlyPriceBoth: "Total monthly bill",
    monthlyPlaceholder: "e.g. 95",
    internetUsageLevel: "Home internet usage",
    currentMobileData: "Current mobile data",
    currentMobileDataQuestion: "How much mobile data do you use per month?",
    postalPrefix: "Postal code prefix",
    postalPlaceholder: "e.g. C1A",
    willingToSwitch: "If there is a better option, would you consider switching?",
    notes: "Notes",
    submit: "View My Bill Check Result",
    submitting: "Submitting...",
    sheetSuccess:
      "We have received your bill information. We will manually review your details and compare them with available PEI offers.",
    sheetError: "Submission failed. Please try again later or contact us directly by phone or email.",
    billScore: "Bill Score",
    estimatedYearlySavings: "Estimated Yearly Savings",
    yearlySavingsValue: (value) => `About $${value} / year`,
    scoreStatus: "Clear room for improvement",
    savingsHelper: "Based on your current bill estimate",
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
    bellPrice: "Available offer requires manual confirmation",
    bellSavings: "Confirmed after submission",
    bestPrice: "✨ Get the Best Price →",
    bestPriceHelp: "We'll manually confirm available offers",
    cautionTitle: "Things to Watch Carefully",
    groupTitle: "Join the PEI Bill-Saving Group",
    groupDescription:
      "We occasionally share PEI phone, internet, and household bill-saving tips. Available offers may change, and final pricing and eligibility require manual confirmation.",
    qrPlaceholder: "Group QR Code Placeholder",
    leadTitle: "Get available offers",
    leadIntro: "Leave your contact details. We will manually confirm whether there is a better option.",
    trustTitle: "Why it's safe to submit",
    trustItems: [
      "Your information is only used to manually check available phone or internet offers in PEI",
      "We do not charge you any fees",
      "Pricing and eligibility are confirmed by the provider",
      "Installation is completed by the provider's official or authorized team",
      "You can review the option first before deciding whether to continue"
    ],
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    preferredContact: "Preferred contact",
    installationAddress: "Internet installation address (optional)",
    installationAddressPlaceholder: "Street address or building/community name, optional",
    leadSubmit: "Submit",
    successTitle: "Submitted successfully",
    successBody: "We've received your request and will contact you within 1-2 business days.",
    successHelper: "You can also return to the homepage to check another bill.",
    successButton: "Back to Home",
    close: "Close",
    disclaimer:
      "Final pricing, eligibility, address availability, installation, taxes, equipment fees, and credit approval must be confirmed by the provider or an authorized sales representative.",
    footer:
      "Do not submit SIN, bank card details, full account numbers, full bills, or identity-document photos. This tool only needs approximate bill details for a preliminary check.",
    serviceCards: { mobile: "Mobile bill", internet: "Internet bill", both: "Internet + Mobile" },
    usageCards: {
      light: {
        title: "Light use",
        description: "1-2 people, mainly browsing, messaging, email, YouTube, and regular video."
      },
      standard: {
        title: "Standard household",
        description: "2-4 people, HD / 4K video, video meetings, online classes, and casual gaming."
      },
      heavy: {
        title: "Heavy household",
        description: "Multiple people streaming, large downloads, gaming, remote work, TV boxes, NAS, cameras, and many smart home devices."
      }
    },
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
    areaCaution:
      "If you are outside Charlottetown / Stratford / Cornwall, consider major networks like Bell or TELUS first and confirm signal quality at home, work, and common travel routes. Do not choose based only on the lowest price.",
    internetGoodFor: {
      low:
        "Everyday browsing, messaging, email, YouTube, video calls, and regular HD video for 1–2 people.",
      mid:
        "Standard households, 4K video, video meetings, online classes, multiple devices, and casual gaming.",
      high:
        "Most households, multiple devices, 4K video, video meetings, remote work, online learning, casual gaming, and larger downloads.",
      premium:
        "Heavy households, multiple people streaming 4K, gaming, livestreaming, large downloads, remote work, and many devices."
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
    ,
    purpleCowNote:
      "Purple Cow may be a good fit for price-sensitive users who want to lower their internet bill. It typically has no installation fee, no activation fee, and a first-month money-back guarantee. Final availability, speed, installation conditions, and refund terms should be confirmed with Purple Cow.",
    purpleCowBadges: ["No installation fee", "No activation fee", "First-month money-back"],
    koodoInternetNote:
      "Koodo Internet may be a strong fit for users who want to lower their internet bill, are comfortable with self-installation, and still want good overall value. It typically has no activation fee and supports free self-installation. If technician guidance or in-home installation is needed, availability can be confirmed based on address and eligibility. Koodo also offers a 30-day free trial / money-back policy. Installation method, refund terms, eligibility, and final pricing should be confirmed with Koodo's current terms.",
    koodoBadges: ["No activation fee", "Free self-installation", "30-day free trial"]
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

const serviceOrder = ["internet", "mobile", "both"];
const providerOptionsByService = {
  internet: ["Bell", "Bell Aliant", "TELUS", "Koodo", "Eastlink", "Purple Cow", "Xplore", "Starlink", "Other", "Not sure"],
  mobile: ["Bell", "Bell Aliant", "TELUS", "Koodo", "Public Mobile", "Eastlink", "Rogers", "Fido", "Virgin Plus", "Other", "Not sure"],
  both: [
    "Bell",
    "Bell Aliant",
    "TELUS",
    "Koodo",
    "Eastlink",
    "Public Mobile",
    "Rogers",
    "Fido",
    "Virgin Plus",
    "Purple Cow",
    "Xplore",
    "Starlink",
    "Multiple providers",
    "Other",
    "Not sure"
  ]
};
const usageLevels = [
  { value: "light", currentSpeed: "100M" },
  { value: "standard", currentSpeed: "300M" },
  { value: "heavy", currentSpeed: "1G" }
];
const mobileDataOptions = ["5GB", "10GB", "20GB", "50GB", "75GB", "100GB", "150GB+", "not_sure"];

const initialForm = {
  service_type: "internet",
  city: "Charlottetown",
  current_provider: "Bell Aliant",
  monthly_price: "",
  price_type: "not_asked",
  internet_usage_level: "standard",
  current_speed: "300M",
  current_mobile_data: "50GB",
  postal_code: "",
  willing_to_switch: "",
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

function speedForUsage(level) {
  return usageLevels.find((item) => item.value === level)?.currentSpeed || "300M";
}

function speedRank(speed) {
  const ranks = { "100M": 100, "300M": 300, "350M": 350, "500M": 500, "1G": 1000, "1.5G": 1500, "3G": 3000 };
  if (ranks[speed]) return ranks[speed];
  const value = String(speed || "").trim().toLowerCase();
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  if (!numeric) return 0;
  return value.includes("g") && !value.includes("gb") ? numeric * 1000 : numeric;
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
  return Boolean(offer.show_premium_cta) || /koodo|telus|bell|purple cow/i.test(offer.provider || "");
}

function isManualPrice(offer) {
  return offer.is_sensitive_price || !offer.is_public_price || isBell(offer);
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
  if (language === "en") return `About $${saving}/month`;
  return language === "zhHant" ? `約 $${saving}/月` : `约 $${saving}/月`;
}

function relevantTargets(offers, form) {
  const relevant =
    form.service_type === "both" ? offers.filter((offer) => offer.service_type === "both") : offers.filter((offer) => offer.service_type === form.service_type);
  return relevant.filter((offer) => !isManualPrice(offer)).map((offer) => offer.bill_saver_target_price).filter((value) => typeof value === "number");
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

function localizedGoodFor(offer, t, language) {
  if (offer.service_type === "internet" || offer.service_type === "both") {
    if (!offer.speed_down) {
      return textByLanguage(
        language,
        "适合需要按地址确认可用性、速度和稳定性的用户。",
        "適合需要按地址確認可用性、速度和穩定性的用戶。",
        "Good for users who need address-specific confirmation for availability, speed, and stability."
      );
    }
    return t.internetGoodFor[speedBucket(offer.speed_down)];
  }
  if (/Public Mobile/i.test(offer.provider)) return t.publicMobileNote;
  if (/Koodo Prepaid/i.test(offer.plan_name)) return t.koodoPrepaidNote;
  if (offer.offer_id === "bell_mobile_winback_manual") return t.bellWinbackGoodFor;
  return t.mobileGoodFor[offer.mobile_data] || t.mobileGoodFor.default;
}

function localizedNote(offer, t, language) {
  if (offer.offer_id === "bell_mobile_winback_manual") return t.bellWinbackNote;
  if (/Purple Cow/i.test(offer.provider)) return t.purpleCowNote;
  if (/Koodo/i.test(offer.provider) && offer.service_type === "internet") {
    if (offer.offer_id === "koodo_internet_100") {
      return `${t.koodoInternetNote} ${textByLanguage(
        language,
        "如果家里多人同时 4K、游戏、直播或大量下载，建议考虑更高速方案。",
        "如果家中多人同時 4K、遊戲、直播或大量下載，建議考慮更高速方案。",
        "If multiple people stream 4K, game, livestream, or download large files at the same time, consider a faster plan."
      )}`;
    }
    return t.koodoInternetNote;
  }
  return offer.caution;
}

function textByLanguage(language, zhHans, zhHant, en) {
  if (language === "en") return en;
  if (language === "zhHant") return zhHant;
  return zhHans;
}

function fieldLabel(language, key) {
  const labels = {
    speed: ["速度：", "速度：", "Speed:"],
    data: ["流量：", "流量：", "Data:"],
    priceNote: ["价格备注：", "價格備註：", "Price note:"]
  };
  const [zhHans, zhHant, en] = labels[key];
  return textByLanguage(language, zhHans, zhHant, en);
}

function speedText(offer, language) {
  if (!offer.speed_down && !offer.speed_up) {
    return textByLanguage(language, "具体上下行速度需确认", "具體上下行速度需確認", "Download/upload speeds require confirmation");
  }
  if (!offer.speed_up) {
    return textByLanguage(
      language,
      `下载最高 ${offer.speed_down} / 上传速度需确认`,
      `下載最高 ${offer.speed_down} / 上傳速度需確認`,
      `Up to ${offer.speed_down} download / upload speed requires confirmation`
    );
  }
  return textByLanguage(
    language,
    `下载最高 ${offer.speed_down} / 上传最高 ${offer.speed_up}`,
    `下載最高 ${offer.speed_down} / 上傳最高 ${offer.speed_up}`,
    `Up to ${offer.speed_down} download / ${offer.speed_up} upload`
  );
}

function dataText(offer, language) {
  return offer.mobile_data || textByLanguage(language, "流量需确认", "流量需確認", "Data requires confirmation");
}

function priceNoteText(offer, language) {
  if (!/Koodo/i.test(offer.provider) || offer.service_type !== "internet") return "";
  return textByLanguage(
    language,
    "TELUS / Koodo 后付费手机用户可能额外优惠 $10/月，预付费用户不包含在内，最终资格和价格以 Koodo 确认为准。",
    "TELUS / Koodo 後付費手機用戶可能額外優惠 $10/月，預付費用戶不包含在內，最終資格和價格以 Koodo 確認為準。",
    "TELUS / Koodo postpaid mobile customers may qualify for an extra $10/month discount. Prepaid users are not included. Final eligibility and pricing must be confirmed with Koodo."
  );
}

function offerBadges(offer, language) {
  if (/Koodo/i.test(offer.provider) && offer.service_type === "internet") {
    return [
      textByLanguage(language, "无激活费", "無啟用費", "No activation fee"),
      textByLanguage(language, "免费自助安装", "免費自助安裝", "Free self-installation"),
      textByLanguage(language, "30 天免费试用", "30 天免費試用", "30-day free trial")
    ];
  }
  if (/Purple Cow/i.test(offer.provider)) {
    return [
      textByLanguage(language, "免安装费", "免安裝費", "No installation fee"),
      textByLanguage(language, "免激活费", "免啟用費", "No activation fee"),
      textByLanguage(language, "首月不满意可退款", "首月不滿意可退款", "First-month money-back")
    ];
  }
  if (isBell(offer) && offer.service_type === "internet") {
    return [
      textByLanguage(language, "光纤稳定", "光纖穩定", "Stable Fibre"),
      textByLanguage(language, "免安装费", "免安裝費", "No installation fee"),
      textByLanguage(language, "免激活费", "免啟用費", "No activation fee"),
      textByLanguage(language, "优惠需确认", "優惠需確認", "Offer confirmation")
    ];
  }
  if (isBell(offer) && offer.service_type === "mobile") {
    return [
      textByLanguage(language, "大网覆盖", "大網覆蓋", "Major network"),
      textByLanguage(language, "大流量方案", "大流量方案", "High-data option"),
      textByLanguage(language, "优惠需确认", "優惠需確認", "Offer confirmation"),
      textByLanguage(language, "适合重度用户", "適合重度用戶", "Good for heavy users")
    ];
  }
  if (/TELUS/i.test(offer.provider) && offer.service_type === "mobile") {
    return [
      textByLanguage(language, "大网覆盖", "大網覆蓋", "Major network"),
      textByLanguage(language, "5G+ 高速", "5G+ 高速", "5G+ speed"),
      textByLanguage(language, "5 年价格锁定", "5 年價格鎖定", "5-year price lock"),
      textByLanguage(language, "适合高流量用户", "適合高流量用戶", "Good for high-data users")
    ];
  }
  if (/Koodo/i.test(offer.provider) && offer.service_type === "mobile") {
    return [
      textByLanguage(language, "性价比推荐", "性價比推薦", "Good Value Pick"),
      "5G 60GB+",
      textByLanguage(language, "免费 Perk", "免費 Perk", "Free Perk")
    ];
  }
  return [];
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
  if (/Koodo/i.test(offer.provider) && offer.service_type === "internet") score += 7;
  if (/Purple Cow/i.test(offer.provider)) score += 4;
  if (offer.partner_status === "active_partner") score += 3;
  if (offer.recommendation_weight === "high") score += 5;
  if (offer.recommendation_weight === "medium_high") score += 2;
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
  const coreArea = ["Charlottetown", "Stratford", "Cornwall"].includes(form.city);
  const mobileOffers = offerDatabase.filter((offer) => offer.service_type === "mobile" && offer.status !== "inactive" && offer.provider !== "Rogers");
  const quality =
    mobileOffers
      .filter((offer) => dataRank(offer.mobile_data) >= 40 && !isBell(offer))
      .sort((a, b) => {
        if (!coreArea) {
          const aMajor = /TELUS|Bell/i.test(a.provider) ? 1 : 0;
          const bMajor = /TELUS|Bell/i.test(b.provider) ? 1 : 0;
          if (aMajor !== bMajor) return bMajor - aMajor;
        }
        return scoreOffer(b, form) - scoreOffer(a, form);
      })[0] ||
    mobileOffers
      .sort((a, b) => scoreOffer(b, form) - scoreOffer(a, form))[0] ||
    mobileOffers[0];

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
  const yearlySavings = yearlySavingsValue(offers, form);
  if (yearlySavings <= 0) return 94;
  if (yearlySavings <= 120) return Math.max(82, 89 - Math.floor(((yearlySavings - 1) / 120) * 8));
  if (yearlySavings <= 300) return Math.max(65, 81 - Math.floor(((yearlySavings - 121) / 180) * 17));
  if (yearlySavings <= 600) return Math.max(48, 64 - Math.floor(((yearlySavings - 301) / 300) * 17));
  return Math.max(35, 47 - Math.floor((yearlySavings - 601) / 50));
}

function scoreTone(score) {
  if (score >= 90) return "excellent";
  if (score >= 75) return "healthy";
  if (score >= 50) return "medium";
  return "alert";
}

function scoreStatusText(score, language) {
  if (score >= 90) return textByLanguage(language, "账单表现不错", "帳單表現不錯", "Your bill looks strong");
  if (score >= 75) return textByLanguage(language, "仍有少量优化空间", "仍有少量優化空間", "Some room to improve");
  if (score >= 50) return textByLanguage(language, "还有明显优化空间", "還有明顯優化空間", "Clear room for improvement");
  return textByLanguage(language, "优化空间较大", "優化空間較大", "Large room for improvement");
}

function savingsHelperText(yearlySavings, t, language) {
  if (yearlySavings <= 0) {
    return textByLanguage(
      language,
      "你的账单已经比较接近当前可用的好价格",
      "你的帳單已經比較接近目前可用的好價格",
      "Your bill is already close to a strong available price"
    );
  }
  return t.savingsHelper;
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
    // Temporarily using wechat field to store optional installation address until Google Sheet schema is updated.
    wechat: lead.wechat || "",
    city: form.city || "",
    postal_code: "",
    service_type: serviceType,
    current_provider: form.current_provider || "",
    monthly_price: form.monthly_price || "",
    price_type: "not_asked",
    current_speed: serviceType === "internet" || serviceType === "both" ? form.current_speed : "",
    current_mobile_data: serviceType === "mobile" || serviceType === "both" ? form.current_mobile_data : "",
    plan_details: JSON.stringify({
      internet_usage_level: form.internet_usage_level,
      selected_speed: form.current_speed,
      selected_mobile_data: form.current_mobile_data
    }),
    willing_to_switch: "",
    notes: ""
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
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    setForm((current) => {
      if (field === "internet_usage_level") {
        return { ...current, internet_usage_level: value, current_speed: speedForUsage(value) };
      }
      return { ...current, [field]: value };
    });
  }

  function updateLead(field, value) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  function openLeadFromResult() {
    setResultOpen(false);
    setLeadOpen(true);
  }

  function returnHomeAfterSuccess() {
    setSuccessOpen(false);
    setForm(initialForm);
    setLead(initialLead);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitInitial(event) {
    event.preventDefault();
    setSheetError("");
    setResultOpen(true);
  }

  async function submitLead(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
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
      setLead(initialLead);
      setLeadOpen(false);
      setSuccessOpen(true);
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
          <div className="heroLogoWrap">
            <Image
              src="/bill-saver-logo.png"
              alt="Bill Saver | PEI 手机宽带账单免费体检"
              width={1600}
              height={420}
              priority
              className="heroLogo"
            />
          </div>
          <div className="hero-flow" aria-label={t.heroFlowTitle}>
            <p className="hero-flow-title">{t.heroFlowTitle}</p>
            <div className="hero-flow-steps">
              {t.heroFlowSteps.map((step, index) => (
                <span className="hero-flow-step" key={step}>
                  {step}
                  {index < t.heroFlowSteps.length - 1 && <b aria-hidden="true">→</b>}
                </span>
              ))}
            </div>
            <p className="hero-flow-helper">{t.heroFlowHelper}</p>
          </div>
        </div>
      </section>

      <section className="workspace single-column">
        <form className="panel form-panel" onSubmit={submitInitial}>
          <div className="section-heading">
            <h2>{t.formTitle}</h2>
            <p>{t.province}</p>
          </div>

          {sheetError && <div className="error">{sheetError}</div>}

          <div className="field">
            <span>{t.serviceType}</span>
            <div className="service-card-grid">
              {serviceOrder.map((value) => (
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

          {showInternet ? (
            <div className="form-split form-grid-top">
              <div className="form-split-left">
                <div className="field">
                  <span>{t.internetUsageLevel}</span>
                  <div className="usage-card-grid compact">
                    {usageLevels.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className={form.internet_usage_level === item.value ? "usage-card active" : "usage-card"}
                        onClick={() => update("internet_usage_level", item.value)}
                      >
                        <strong>{t.usageCards[item.value].title}</strong>
                        <span>{t.usageCards[item.value].description}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="form-split-right">
                <Field label={form.service_type === "internet" ? t.providerInternet : t.providerBoth}>
                  <Select value={form.current_provider} onChange={(value) => update("current_provider", value)}>
                    {providerOptionsByService[form.service_type].map((provider) => (
                      <option key={provider} value={provider}>
                        {optionLabel(t, provider)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label={form.service_type === "internet" ? t.monthlyPriceInternet : t.monthlyPriceBoth}>
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

                {showMobile && (
                  <Field label={t.currentMobileDataQuestion}>
                    <Select value={form.current_mobile_data} onChange={(value) => update("current_mobile_data", value)}>
                      {mobileDataOptions.map((value) => (
                        <option key={value} value={value}>
                          {optionLabel(t, value)}
                        </option>
                      ))}
                    </Select>
                  </Field>
                )}

                <Field label={t.city}>
                  <Select value={form.city} onChange={(value) => update("city", value)}>
                    {areaOptions.map((area) => (
                      <option key={area.value} value={area.value}>
                        {area.labelKey ? t.options[area.labelKey] : area.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          ) : (
            <div className="grid form-grid-top">
              <Field label={t.providerMobile}>
                <Select value={form.current_provider} onChange={(value) => update("current_provider", value)}>
                  {providerOptionsByService[form.service_type].map((provider) => (
                    <option key={provider} value={provider}>
                      {optionLabel(t, provider)}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.monthlyPriceMobile}>
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

              <Field label={t.currentMobileDataQuestion}>
                <Select value={form.current_mobile_data} onChange={(value) => update("current_mobile_data", value)}>
                  {mobileDataOptions.map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(t, value)}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={t.city}>
                <Select value={form.city} onChange={(value) => update("city", value)}>
                  {areaOptions.map((area) => (
                    <option key={area.value} value={area.value}>
                      {area.labelKey ? t.options[area.labelKey] : area.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          )}

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
              <section className={`score-summary ${scoreTone(score)}`}>
                <div className="score-summary-row">
                  <div className="summary-copy">
                    <span className="summary-icon">✓</span>
                    <div>
                      <h3>{t.billScore}</h3>
                      <p>{scoreStatusText(score, language)}</p>
                    </div>
                  </div>
                  <strong className="summary-value">{score}</strong>
                </div>
                <div className="score-summary-row">
                  <div className="summary-copy">
                    <span className="summary-icon">↘</span>
                    <div>
                      <h3>{t.estimatedYearlySavings}</h3>
                      <p>{savingsHelperText(yearlySavings, t, language)}</p>
                    </div>
                  </div>
                  <strong className="summary-value savings-value">{t.yearlySavingsValue(yearlySavings)}</strong>
                </div>
              </section>

              <section>
                <h3>{t.planTitle}</h3>
                <div className="plan-list">
                  {recommendations.map((offer) => {
                    const badges = offerBadges(offer, language);
                    const priceNote = priceNoteText(offer, language);
                    const includesInternet = offer.service_type === "internet" || offer.service_type === "both";
                    const includesMobile = offer.service_type === "mobile" || (offer.service_type === "both" && offer.mobile_data);

                    return (
                      <article className="plan-card" key={offer.offer_id}>
                        <p>
                          <b>{t.providerLabel}</b> {offer.provider}
                        </p>
                        <p>
                          <b>{t.service}</b> {displayPlanName(offer, t)}
                        </p>
                        {includesInternet && (
                          <p>
                            <b>{fieldLabel(language, "speed")}</b> {speedText(offer, language)}
                          </p>
                        )}
                        {includesMobile && (
                          <p>
                            <b>{fieldLabel(language, "data")}</b> {dataText(offer, language)}
                          </p>
                        )}
                        <div className="price-with-badges">
                          <p>
                            <b>{t.price}</b> {displayPrice(offer, t, language)}
                          </p>
                          {badges.length > 0 && (
                            <div className="badge-row price-badges">
                              {badges.map((badge) => (
                                <span key={badge}>{badge}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {priceNote && (
                          <p>
                            <b>{fieldLabel(language, "priceNote")}</b> {priceNote}
                          </p>
                        )}
                        <p>
                          <b>{t.savings}</b> {savingsText(offer, form, t, language)}
                        </p>
                        <p>
                          <b>{t.goodFor}</b> {localizedGoodFor(offer, t, language)}
                        </p>
                        <p>
                          <b>{t.note}</b> {localizedNote(offer, t, language)}
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
                  {!["Charlottetown", "Stratford", "Cornwall"].includes(form.city) && showMobile && <li>{t.areaCaution}</li>}
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
          <form className="modal panel lead-modal" onSubmit={submitLead} onMouseDown={(event) => event.stopPropagation()}>
            <div className="section-heading">
              <div>
                <h2>{t.leadTitle}</h2>
                <p>{t.leadIntro}</p>
              </div>
              <button className="modal-close" type="button" onClick={() => setLeadOpen(false)} aria-label={t.close}>
                ×
              </button>
            </div>

            <div className="trust-box">
              <strong>{t.trustTitle}</strong>
              <ol>
                {t.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="grid">
              <Field label={t.name}>
                <input value={lead.name} onChange={(event) => updateLead("name", event.target.value)} required />
              </Field>
              <Field label={t.email}>
                <input type="email" value={lead.email} onChange={(event) => updateLead("email", event.target.value)} required />
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
              <Field label={t.installationAddress}>
                <input
                  value={lead.wechat}
                  onChange={(event) => updateLead("wechat", event.target.value)}
                  placeholder={t.installationAddressPlaceholder}
                />
              </Field>
            </div>

            <button className="submit-button" type="submit" disabled={submitting}>
              {submitting ? t.submitting : t.leadSubmit}
            </button>
          </form>
        </div>
      )}

      {successOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={returnHomeAfterSuccess}>
          <div className="modal panel success-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <div className="success-icon">✓</div>
            <h2>{t.successTitle}</h2>
            <p>{t.successBody}</p>
            <small>{t.successHelper}</small>
            <button className="submit-button" type="button" onClick={returnHomeAfterSuccess}>
              {t.successButton}
            </button>
          </div>
        </div>
      )}

      <footer className="site-footer">{t.footer}</footer>
    </main>
  );
}
