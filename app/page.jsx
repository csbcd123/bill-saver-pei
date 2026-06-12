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
    hero: "先输入账单信息查看体检结果。想拿到可用优惠时，再提交联系方式给人工复核。",
    heroHeadline: "手机宽带账单免费体检",
    heroSubtitle: "快速比较运营商方案，帮您每年节省数百加元",
    heroProgressSteps: ["输入账单", "查看结果", "获取优惠"],
    formTitle: "账单信息",
    province: "默认地区：Prince Edward Island",
    serviceType: "你想检查哪类账单？",
    city: "你住在哪个区域？",
    provider: "当前运营商",
    providerInternet: "你现在用的是哪家宽带？",
    providerMobile: "你现在用的是哪家手机运营商？",
    providerBoth: "你现在主要用的是哪家运营商？",
    monthlyPriceInternet: "宽带月费（税前）",
    monthlyPriceMobile: "手机月费（税前）",
    monthlyPriceBoth: "每月总费用（税前）",
    monthlyPlaceholder: "例如：89.99",
    monthlyPlaceholderInternet: "例如：89.99",
    monthlyPlaceholderMobile: "例如：45",
    monthlyPlaceholderBoth: "例如：140",
    internetUsageLevel: "选择您的上网使用情况",
    currentMobileData: "当前手机流量",
    currentMobileDataQuestion: "你每月大概用多少手机流量？",
    mobileDataUsageTitle: "选择您的手机流量使用情况",
    providerPlaceholder: "选择您的运营商",
    areaPlaceholder: "选择您所在的区域",
    billInfoInternet: "请填写您的宽带信息",
    billInfoMobile: "请填写您的手机信息",
    billInfoBoth: "请填写您的组合账单信息",
    monthlyUnit: "加元 / 月",
    formSafetyNote: "安全可靠 · 仅用于为您找到更好优惠",
    leadSafetyNote: "安全可靠 · 仅用于为您人工确认优惠",
    validationRequired: "请先完成必填信息，再查看体检结果。",
    validationMobileLines: "请选择你家有几条手机线路。",
    validationMobileLineMinimum: "如果组合账单包含手机，请选择至少 1 条手机线路。",
    validationMobileData: "请选择您的手机流量使用情况。",
    bundleServicesTitle: "你的组合账单包含哪些服务？",
    bundleInternet: "宽带",
    bundleMobile: "手机",
    bundleTv: "TV 服务",
    bundleHomePhone: "家庭电话",
    mobileLineCount: "你家有几条手机线路？",
    mobileLinePlaceholder: "选择手机线路数量",
    mobileLineOptions: ["1 条", "2 条", "3 条", "4 条", "5 条及以上"],
    hasTvService: "是否有 TV 服务？",
    hasHomePhone: "是否有家庭电话？",
    no: "否",
    yes: "是",
    postalPrefix: "邮编前三位",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合适的方案，你是否可以考虑更换？",
    notes: "备注",
    submit: "提交账单体检",
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
    bellWinbackTitle: "Bell 人工确认方案",
    bellWinbackService: "Bell 手机可用优惠人工确认",
    bellPrice: "优惠价需人工确认",
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
    disclaimer: "Bill Saver 提供 PEI 本地手机 / 宽带账单免费分析服务。我们不会向你收取费用。部分运营商或合作渠道可能会向我们支付推荐佣金，但建议会综合考虑价格、速度、稳定性、地址可用性和你的实际需求。最终价格、资格、安装和信用审核以运营商官方或授权团队确认为准。",
    footer: "请勿提交 SIN、银行卡、完整账号、完整账单或身份证件照片。本工具只需要大概账单信息来做初步判断。",
    serviceCards: { mobile: "手机账单", internet: "宽带账单", both: "组合账单" },
    usageCards: {
      light: {
        title: "轻度使用",
        description: "浏览网页、社交媒体、收发邮件\n1–3 台设备"
      },
      standard: {
        title: "普通家庭",
        description: "高清视频、在线学习、视频通话\n3–6 台设备"
      },
      heavy: {
        title: "重度家庭",
        description: "4K 串流、游戏、智能家居、多设备\n6 台设备以上"
      }
    },
    mobileDataUsageCards: {
      "0-20GB": {
        title: "轻度使用",
        description: "微信、邮件、地图、轻度视频",
        amount: "10–20 GB"
      },
      "20-50GB": {
        title: "日常使用",
        description: "社交媒体、短视频、视频通话",
        amount: "20–60 GB"
      },
      "60GB+": {
        title: "重度使用",
        description: "高清视频、热点分享、经常外出",
        amount: "60 GB+"
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
      "希望人工确认当前可用 Bell 手机优惠，或比较其他运营商方案的用户。",
    bellWinbackNote:
      "Bell 可用优惠通常需要满足特定资格。最终价格、资格、自动付款、信用审核和促销条件以运营商或授权销售人员确认为准。"
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
    heroHeadline: "手機寬頻帳單免費健檢",
    heroSubtitle: "快速比較電信商方案，幫你每年節省數百加元",
    heroProgressSteps: ["輸入帳單", "查看結果", "取得優惠"],
    formTitle: "帳單資訊",
    province: "預設地區：Prince Edward Island",
    serviceType: "你想檢查哪類帳單？",
    city: "你住在哪個區域？",
    provider: "目前業者",
    providerInternet: "你現在用的是哪家寬頻？",
    providerMobile: "你現在用的是哪家手機電信商？",
    providerBoth: "你現在主要用的是哪家電信商？",
    monthlyPriceInternet: "寬頻月費（稅前）",
    monthlyPriceMobile: "手機月費（稅前）",
    monthlyPriceBoth: "每月總費用（稅前）",
    monthlyPlaceholder: "例如：89.99",
    monthlyPlaceholderInternet: "例如：89.99",
    monthlyPlaceholderMobile: "例如：45",
    monthlyPlaceholderBoth: "例如：140",
    internetUsageLevel: "選擇您的上網使用情況",
    currentMobileData: "目前手機流量",
    currentMobileDataQuestion: "你每月大約用多少手機流量？",
    mobileDataUsageTitle: "選擇你的手機流量使用情況",
    providerPlaceholder: "選擇你的電信商",
    areaPlaceholder: "選擇你所在的區域",
    billInfoInternet: "請填寫您的寬頻資訊",
    billInfoMobile: "請填寫您的手機資訊",
    billInfoBoth: "請填寫你的組合帳單資訊",
    monthlyUnit: "加元 / 月",
    formSafetyNote: "安全可靠 · 僅用於為你找到更好優惠",
    leadSafetyNote: "安全可靠 · 僅用於為你人工確認優惠",
    validationRequired: "請先完成必填資訊，再查看健檢結果。",
    validationMobileLines: "請選擇你家有幾條手機線路。",
    validationMobileLineMinimum: "如果組合帳單包含手機，請選擇至少 1 條手機線路。",
    validationMobileData: "請選擇你的手機流量使用情況。",
    bundleServicesTitle: "你的組合帳單包含哪些服務？",
    bundleInternet: "寬頻",
    bundleMobile: "手機",
    bundleTv: "TV 服務",
    bundleHomePhone: "家居電話",
    mobileLineCount: "你家有幾條手機線路？",
    mobileLinePlaceholder: "選擇手機線路數量",
    mobileLineOptions: ["1 條", "2 條", "3 條", "4 條", "5 條及以上"],
    hasTvService: "是否有電視服務？",
    hasHomePhone: "是否有家居電話？",
    no: "否",
    yes: "是",
    postalPrefix: "郵遞區號前三碼",
    postalPlaceholder: "例如 C1A",
    willingToSwitch: "如果有更合適的方案，你是否可以考慮更換？",
    notes: "備註",
    submit: "提交帳單健檢",
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
    bellWinbackTitle: "Bell 人工確認方案",
    bellWinbackService: "Bell 手機可用優惠人工確認",
    bellPrice: "優惠價需人工確認",
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
    disclaimer: "Bill Saver 提供 PEI 本地手機 / 寬頻帳單免費分析服務。我們不會向你收取費用。部分電信商或合作渠道可能會向我們支付推薦佣金，但建議會綜合考慮價格、速度、穩定性、地址可用性和你的實際需求。最終價格、資格、安裝和信用審核以電信商官方或授權團隊確認為準。",
    footer: "請勿提交 SIN、銀行卡、完整帳號、完整帳單或身分證件照片。本工具只需要大概帳單資訊來做初步判斷。",
    serviceCards: { mobile: "手機帳單", internet: "寬頻帳單", both: "組合帳單" },
    usageCards: {
      light: {
        title: "輕度使用",
        description: "瀏覽網頁、社交媒體、收發電郵\n1–3 台設備"
      },
      standard: {
        title: "一般家庭",
        description: "高清影片、線上學習、視訊通話\n3–6 台設備"
      },
      heavy: {
        title: "重度家庭",
        description: "4K 串流、遊戲、智能家居、多設備\n6 台設備以上"
      }
    },
    mobileDataUsageCards: {
      "0-20GB": {
        title: "輕度使用",
        description: "微信、電郵、地圖、輕度影片",
        amount: "10–20 GB"
      },
      "20-50GB": {
        title: "日常使用",
        description: "社交媒體、短影片、視訊通話",
        amount: "20–60 GB"
      },
      "60GB+": {
        title: "重度使用",
        description: "高清影片、熱點分享、經常外出",
        amount: "60 GB+"
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
      "希望人工確認目前可用 Bell 手機優惠，或比較其他電信商方案的用戶。",
    bellWinbackNote:
      "Bell 可用優惠通常需要滿足特定資格。最終價格、資格、自動付款、信用審核和促銷條件以電信商或授權銷售人員確認為準。"
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
    heroHeadline: "Free Mobile & Internet Bill Check",
    heroSubtitle: "Quickly compare carrier plans and help you save hundreds per year",
    heroProgressSteps: ["Enter Bill", "View Result", "Get Offer"],
    formTitle: "Bill details",
    province: "Default region: Prince Edward Island",
    serviceType: "Which bill do you want to check?",
    city: "Which area do you live in?",
    provider: "Current provider",
    providerInternet: "Which internet provider do you use now?",
    providerMobile: "Which mobile provider do you use now?",
    providerBoth: "Which provider do you mainly use now?",
    monthlyPriceInternet: "Internet monthly bill before tax",
    monthlyPriceMobile: "Mobile monthly bill before tax",
    monthlyPriceBoth: "Total monthly bill before tax",
    monthlyPlaceholder: "e.g. 89.99",
    monthlyPlaceholderInternet: "e.g. 89.99",
    monthlyPlaceholderMobile: "e.g. 45",
    monthlyPlaceholderBoth: "e.g. 140",
    internetUsageLevel: "Choose your internet usage",
    currentMobileData: "Current mobile data",
    currentMobileDataQuestion: "How much mobile data do you use per month?",
    mobileDataUsageTitle: "Choose your mobile data usage",
    providerPlaceholder: "Select your provider",
    areaPlaceholder: "Select your area",
    billInfoInternet: "Enter your internet bill information",
    billInfoMobile: "Enter your mobile bill information",
    billInfoBoth: "Enter your bundle bill information",
    monthlyUnit: "CAD / mo",
    formSafetyNote: "Secure · Used only to help find better offers",
    leadSafetyNote: "Secure & private · Only used to manually confirm your offer",
    validationRequired: "Please complete the required information before viewing your result.",
    validationMobileLines: "Please select how many mobile lines you have.",
    validationMobileLineMinimum: "If your bundle includes mobile service, please select at least 1 mobile line.",
    validationMobileData: "Please choose your mobile data usage.",
    bundleServicesTitle: "Which services are included in your bundle?",
    bundleInternet: "Internet",
    bundleMobile: "Mobile",
    bundleTv: "TV",
    bundleHomePhone: "Home Phone",
    mobileLineCount: "How many mobile lines do you have?",
    mobileLinePlaceholder: "Select number of mobile lines",
    mobileLineOptions: ["1 line", "2 lines", "3 lines", "4 lines", "5+ lines"],
    hasTvService: "Do you have TV service?",
    hasHomePhone: "Do you have home phone service?",
    no: "No",
    yes: "Yes",
    postalPrefix: "Postal code prefix",
    postalPlaceholder: "e.g. C1A",
    willingToSwitch: "If there is a better option, would you consider switching?",
    notes: "Notes",
    submit: "Submit Bill Check",
    submitting: "Submitting...",
    sheetSuccess:
      "We have received your bill information. We will manually review your details and compare them with available PEI offers.",
    sheetError: "Submission failed. Please try again later or contact us directly by phone or email.",
    billScore: "Bill Score",
    estimatedYearlySavings: "Estimated Yearly Savings",
    yearlySavingsValue: (value) => `About $${value} / year`,
    scoreStatus: "Clear room for improvement",
    savingsHelper: "Based on your current bill estimate",
    planTitle: "Recommended options",
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
    bellWinbackTitle: "Bell Manual Confirmation Option",
    bellWinbackService: "Bell mobile available offer confirmation",
    bellPrice: "Offer price requires confirmation",
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
      "Bill Saver provides free local PEI mobile and internet bill analysis. You do not pay us a fee. Some providers or partner channels may pay a referral commission, but recommendations consider price, speed, stability, address availability, and your needs. Final pricing, eligibility, installation, and credit approval must be confirmed by the provider or authorized team.",
    footer:
      "Do not submit SIN, bank card details, full account numbers, full bills, or identity-document photos. This tool only needs approximate bill details for a preliminary check.",
    serviceCards: { mobile: "Mobile bill", internet: "Internet bill", both: "Bundle Bill" },
    usageCards: {
      light: {
        title: "Light use",
        description: "Browsing, social media, and email\n1–3 devices"
      },
      standard: {
        title: "Standard household",
        description: "HD video, online learning, and video calls\n3–6 devices"
      },
      heavy: {
        title: "Heavy household",
        description: "4K streaming, gaming, smart home, and many devices\n6+ devices"
      }
    },
    mobileDataUsageCards: {
      "0-20GB": {
        title: "Light use",
        description: "Messaging, email, maps, and light video",
        amount: "10–20 GB"
      },
      "20-50GB": {
        title: "Everyday use",
        description: "Social media, short videos, and video calls",
        amount: "20–60 GB"
      },
      "60GB+": {
        title: "Heavy use",
        description: "HD video, hotspot sharing, and frequent outside use",
        amount: "60 GB+"
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
      "Users who want to manually confirm available Bell mobile offers or compare other provider options.",
    bellWinbackNote:
      "Available Bell offers usually require specific eligibility. Final pricing, eligibility, pre-authorized payment, credit approval, and promotional terms must be confirmed by the provider or an authorized sales representative."
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
const internetUsageSpeeds = { light: "25–100 Mbps", standard: "100–300 Mbps", heavy: "300+ Mbps" };
const providerOptionsByService = {
  internet: ["Bell Aliant", "TELUS", "Koodo", "Eastlink", "Purple Cow", "Xplore", "Starlink", "Other", "Not sure"],
  mobile: ["Bell Aliant", "TELUS", "Koodo", "Public Mobile", "Eastlink", "Rogers", "Fido", "Virgin Plus", "Other", "Not sure"],
  both: [
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
const mobileDataUsageLevels = [
  { value: "0-20GB", type: "light" },
  { value: "20-50GB", type: "daily" },
  { value: "60GB+", type: "heavy" }
];
const mainUrbanAreas = ["Charlottetown", "Stratford", "Cornwall", "Summerside"];

const initialForm = {
  service_type: "internet",
  city: "",
  current_provider: "",
  monthly_price: "",
  price_type: "not_asked",
  internet_usage_level: "",
  current_speed: "",
  current_mobile_data: "",
  bundle_includes_internet: true,
  bundle_includes_mobile: false,
  bundle_includes_tv: false,
  bundle_includes_home_phone: false,
  mobile_line_count: "0",
  has_tv_service: "no",
  has_home_phone: "no",
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

function Field({ label, children, className = "", icon = "", unit = "" }) {
  const iconClassName = icon === "$" ? "input-icon input-icon-dollar" : "input-icon";

  return (
    <label className={`field ${className}`.trim()}>
      <span>{label}</span>
      {icon ? (
        <span className="input-shell">
          <span className={iconClassName} aria-hidden="true">{icon}</span>
          {children}
          {unit && <span className="input-unit">{unit}</span>}
          {children?.type === Select && <span className="select-chevron" aria-hidden="true">⌄</span>}
        </span>
      ) : (
        children
      )}
    </label>
  );
}

function Select({ value, onChange, children }) {
  return <select value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>;
}

function LineIcon({ name, size = 32, strokeWidth = 2.4 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  if (name === "wifi") {
    return <svg {...common}><path d="M5 12.55a11 11 0 0 1 14 0" /><path d="M8.5 16a6 6 0 0 1 7 0" /><path d="M12 20h.01" /></svg>;
  }
  if (name === "smartphone") {
    return <svg {...common}><rect x="6.5" y="2" width="11" height="20" rx="2" /><path d="M10 5h4" /><path d="M11.5 18.5h1" /></svg>;
  }
  if (name === "building") {
    return <svg {...common}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" /><path d="M2 22h20" /><path d="M9 6h1" /><path d="M14 6h1" /><path d="M9 10h1" /><path d="M14 10h1" /><path d="M9 14h1" /><path d="M14 14h1" /><path d="M10 22v-4h4v4" /></svg>;
  }
  if (name === "map-pin") {
    return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
  }
  return <svg {...common}><path d="M4 20V14" /><path d="M10 20V10" /><path d="M16 20V6" /><path d="M22 20V2" /></svg>;
}

function ServiceTypeIcon({ type }) {
  if (type === "both") {
    return (
      <span className="bill-type-icon-wrap bill-type-icon-wrap-combo" aria-hidden="true">
        <span className="bill-type-combo-icon">
          <LineIcon name="wifi" size={30} strokeWidth={2.7} />
          <span>+</span>
          <LineIcon name="smartphone" size={28} strokeWidth={2.6} />
        </span>
      </span>
    );
  }

  return (
    <span className="bill-type-icon-wrap" aria-hidden="true">
      {type === "internet" && <LineIcon name="wifi" size={30} strokeWidth={2.7} />}
      {type === "mobile" && <LineIcon name="smartphone" size={28} strokeWidth={2.6} />}
    </span>
  );
}

function serviceTypeSubtitle(language, type) {
  const subtitles = {
    internet: ["仅宽带服务", "僅寬頻服務", "Internet only"],
    mobile: ["仅手机服务", "僅手機服務", "Mobile only"],
    both: ["多项服务人工复核", "多項服務人工覆核", "Manual review for multiple services"]
  };
  const [zhHans, zhHant, en] = subtitles[type];
  return language === "en" ? en : language === "zhHant" ? zhHant : zhHans;
}

function MobileUsageCard({ item, content, active, onClick, bundle = false }) {
  return (
    <button
      type="button"
      className={`mobile-usage-card${bundle ? " bundle-usage-card" : ""}${active ? " active" : ""}`}
      onClick={onClick}
    >
      <span className="mobile-usage-text">
        <span className="mobile-usage-header">
          <strong className="mobile-usage-title">{content.title}</strong>
          <span className="mobile-usage-amount">{content.amount}</span>
        </span>
        <span className="mobile-usage-desc">{content.description}</span>
      </span>
      {active && <span className="mobile-usage-check" aria-hidden="true">✓</span>}
    </button>
  );
}

function optionLabel(t, value) {
  if (value === "Other") return t.options.other || "Other";
  if (value === "Not sure" || value === "not_sure") return t.options.not_sure;
  return t.options[value] || value;
}

function speedForUsage(level) {
  return usageLevels.find((item) => item.value === level)?.currentSpeed || "300M";
}

function monthlyPlaceholder(t, serviceType) {
  if (serviceType === "mobile") return t.monthlyPlaceholderMobile;
  if (serviceType === "both") return t.monthlyPlaceholderBoth;
  return t.monthlyPlaceholderInternet;
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
  const rangeRanks = {
    "0-20GB": 20,
    "20-50GB": 50,
    "60GB+": 100,
    "50-100GB": 100,
    "100GB+": 150
  };
  if (rangeRanks[data]) return rangeRanks[data];
  return Number(String(data).replace(/[^0-9]/g, "")) || 0;
}

function isMainUrbanArea(area) {
  return mainUrbanAreas.includes(area);
}

function isMobileDataUnder50GB(value) {
  return value === "0-20GB" || value === "0–20GB" || value === "20-50GB" || value === "20–50GB";
}

function isMobileData50GBOrMore(value) {
  return value === "60GB+" || value === "50-100GB" || value === "50–100GB" || value === "100GB+" || value === "100GB 以上";
}

function parseDataGB(data) {
  if (!data) return null;
  const text = String(data).toLowerCase();
  if (text.includes("unlimited") || text.includes("无限") || text.includes("無限")) return Infinity;
  const match = text.match(/(\d+)\s*gb/i);
  return match ? Number(match[1]) : null;
}

function getMobileUsageBucket(value) {
  const normalized = String(value || "")
    .replace(/\s/g, "")
    .replace(/[–—−]/g, "-");
  if (normalized.includes("0-20")) return "under20";
  if (normalized.includes("20-50")) return "20to50";
  if (normalized.includes("60GB+")) return "over60";
  if (normalized.includes("50-100")) return "50to100";
  if (normalized.includes("100GB+") || normalized.includes("100GB以上") || normalized.includes("100以上")) return "over100";
  return null;
}

function isPlanDataSuitableForUsage(planData, usageValue) {
  const gb = parseDataGB(planData);
  const bucket = getMobileUsageBucket(usageValue);
  if (!bucket || gb === null) return true;
  if (bucket === "under20") return gb < 30;
  if (bucket === "20to50") return gb > 20;
  if (bucket === "over60") return gb > 60;
  if (bucket === "50to100") return gb > 50;
  if (bucket === "over100") return gb > 100;
  return true;
}

function mobileOfferPrice(offer) {
  const prices = [offer.bill_saver_target_price, offer.official_promo_price, offer.official_regular_price];
  return prices.find((price) => typeof price === "number" && Number.isFinite(price)) ?? null;
}

function mobileDataOverprovisionPenalty(planData, usageValue) {
  const gb = parseDataGB(planData);
  const bucket = getMobileUsageBucket(usageValue);
  if (!bucket || gb === null) return 0;

  if (bucket === "20to50") {
    if (gb <= 60) return 0;
    if (gb <= 100) return 12;
    return 25;
  }

  if (bucket === "50to100" && gb > 100) return 10;
  return 0;
}

function mobileOfferSortScore(offer, form) {
  const price = mobileOfferPrice(offer);
  if (price === null) return 9999;

  const currentPrice = monthlyPrice(form);
  const estimatedSaving = currentPrice > 0 ? Math.max(0, currentPrice - price) : 0;

  return price * 2 - estimatedSaving * 1.5 + mobileDataOverprovisionPenalty(offer.mobile_data, form.current_mobile_data);
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

function isRecommendableOffer(offer) {
  if (offer.status === "inactive" || offer.recommendable === false || offer.exclude_from_recommendations === true) return false;
  if (isBell(offer) && offer.service_type === "mobile" && parseDataGB(offer.mobile_data) === 0) return false;
  return true;
}

function normalizeProviderName(value = "") {
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  if (normalized.includes("bell aliant") || normalized === "bell") return "bell_aliant";
  if (normalized.includes("public mobile")) return "public_mobile";
  if (normalized.includes("purple cow")) return "purple_cow";
  if (normalized.includes("koodo")) return "koodo";
  if (normalized.includes("telus")) return "telus";
  if (normalized.includes("eastlink")) return "eastlink";
  if (normalized.includes("xplore")) return "xplore";
  if (normalized.includes("starlink")) return "starlink";
  return normalized.replace(/\s+/g, "_");
}

function isSameProvider(a, b) {
  const normalizedA = normalizeProviderName(a);
  return Boolean(normalizedA) && normalizedA === normalizeProviderName(b);
}

function filterOutCurrentProvider(offers, currentProvider) {
  return offers.filter((offer) => !isSameProvider(offer.provider, currentProvider));
}

function isKoodoPrepaid(offer) {
  if (!/koodo/i.test(offer.provider || "")) return false;
  if (String(offer.billing_type || "").toLowerCase() === "prepaid") return true;

  const searchableName = `${offer.plan_name || ""} ${offer.name || ""} ${offer.plan_type || ""}`.toLowerCase();
  return /prepaid|4g prepaid|预付费|預付費|预付卡|預付卡/.test(searchableName);
}

function isPremiumProvider(offer) {
  return Boolean(offer.show_premium_cta) || /koodo|telus|bell|purple cow/i.test(offer.provider || "");
}

function bellAliantDisplayText(value) {
  return String(value || "").replace(/\bBell\b(?!\s+Aliant)/g, "Bell Aliant");
}

function displayProviderName(provider) {
  return bellAliantDisplayText(provider);
}

function ruralRecommendationNote(language) {
  return textByLanguage(
    language,
    "你选择的区域不在 Charlottetown / Stratford / Cornwall / Summerside 四个主要城区内，本次宽带建议优先考虑 Bell Aliant、Starlink 和 Xplore 等覆盖更稳或更适合农村地址的方案。",
    "你選擇的區域不在 Charlottetown / Stratford / Cornwall / Summerside 四個主要城區內，本次寬頻建議優先考慮 Bell Aliant、Starlink 和 Xplore 等覆蓋更穩或更適合農村地址的方案。",
    "Your selected area is outside Charlottetown / Stratford / Cornwall / Summerside, so this internet recommendation prioritizes Bell Aliant, Starlink, and Xplore-style options that are more suitable for rural or coverage-sensitive addresses."
  );
}

function ruralOfferNote(offer, language) {
  if (isBell(offer)) {
    return textByLanguage(
      language,
      "四个主要城区以外，建议优先确认 Bell Aliant 是否可安装。对农村、半农村或覆盖敏感地址来说，稳定性和可安装性通常比最低月费更重要。",
      "四個主要城區以外，建議優先確認 Bell Aliant 是否可安裝。對農村、半農村或覆蓋敏感地址來說，穩定性和可安裝性通常比最低月費更重要。",
      "Outside PEI’s four main urban areas, Bell Aliant should be checked first. For rural, semi-rural, or coverage-sensitive addresses, stability and service availability are usually more important than the lowest monthly price."
    );
  }
  if (/Starlink/i.test(offer.provider)) {
    return textByLanguage(
      language,
      "Starlink 更适合传统光纤或有线宽带覆盖较差的农村、偏远或海边地址。它不一定是最便宜方案，但在没有稳定 Bell Aliant 服务的地方，可以作为备选。设备费用、月费、安装方式和速度表现需要按实际地址确认。",
      "Starlink 更適合傳統光纖或有線寬頻覆蓋較差的農村、偏遠或海邊地址。它不一定是最便宜方案，但在沒有穩定 Bell Aliant 服務的地方，可以作為備選。設備費用、月費、安裝方式和速度表現需要按實際地址確認。",
      "Starlink may suit rural, remote, or coastal addresses with limited wired coverage. It may not be the cheapest option, and equipment, monthly pricing, installation, and performance should be confirmed for the address."
    );
  }
  if (/Xplore/i.test(offer.provider)) {
    return textByLanguage(
      language,
      "Xplore 可作为农村或传统有线宽带覆盖不足地区的备选方案。实际可用性、速度、月费和安装条件需要按地址确认。",
      "Xplore 可作為農村或傳統有線寬頻覆蓋不足地區的備選方案。實際可用性、速度、月費和安裝條件需要按地址確認。",
      "Xplore can be an alternative for rural areas with limited wired broadband. Availability, speed, monthly pricing, and installation conditions require address confirmation."
    );
  }
  if (/Public Mobile/i.test(offer.provider)) {
    return textByLanguage(
      language,
      "Public Mobile 价格较低、不需要信用核查，但使用 TELUS 网络。农村或信号敏感用户建议先测试家里、工作地和常走路线的信号。",
      "Public Mobile 價格較低、不需要信用審查，但使用 TELUS 網絡。農村或訊號敏感用戶建議先測試家裡、工作地和常走路線的訊號。",
      "Public Mobile is lower-cost and requires no credit check, but uses the TELUS network. Rural or signal-sensitive users should test signal at home, work, and common routes first."
    );
  }
  return "";
}

function isManualPrice(offer) {
  return offer.is_sensitive_price || !offer.is_public_price || isBell(offer);
}

function calculationMonthlyPrice(offer) {
  if (offer.calculation_price_available === false || offer.use_for_savings_calc === false) return null;
  const rawPrice = offer.bill_saver_target_price ?? offer.official_promo_price;
  if (rawPrice === null || rawPrice === undefined || rawPrice === "") return null;
  const price = Number(rawPrice);
  return Number.isFinite(price) ? price : null;
}

function monthlyPrice(form) {
  return Number(form.monthly_price || 0);
}

function getAnnualSavings(form, offer) {
  const current = monthlyPrice(form);
  const recommended = calculationMonthlyPrice(offer);
  if (!Number.isFinite(current) || current <= 0 || !Number.isFinite(recommended)) return null;
  return Math.max(0, current - recommended) * 12;
}

function getRequiredInternetSpeedMbps(form) {
  if (form.internet_usage_level === "standard" || form.internet_usage_level === "heavy") return 300;
  if (form.internet_usage_level === "light") return 100;
  const explicitSpeed = speedRank(form.currentInternetSpeedMbps || form.current_speed);
  if (explicitSpeed > 0) return explicitSpeed;
  return 100;
}

function internetOfferSpeedMbps(offer) {
  return Number(offer.speedMbps || offer.downloadMbps) || speedRank(offer.speed_down || offer.speed_label);
}

function internetMeetsServiceLevel(offer, form) {
  return internetOfferSpeedMbps(offer) >= getRequiredInternetSpeedMbps(form);
}

function getRequiredMobileDataGB(form) {
  const explicitData = Number(form.currentMobileDataGB);
  if (Number.isFinite(explicitData) && explicitData > 0) return explicitData;
  const bucket = getMobileUsageBucket(form.current_mobile_data || form.mobile_data_usage);
  if (bucket === "50to100" || bucket === "over60") return 60;
  if (bucket === "over100") return 100;
  return 20;
}

function mobileOfferDataGB(offer) {
  return parseDataGB(offer.mobile_data || offer.data_label);
}

function mobileMeetsServiceLevel(offer, form) {
  const data = mobileOfferDataGB(offer);
  return data === Infinity || (typeof data === "number" && data >= getRequiredMobileDataGB(form));
}

function classifyRecommendation(offer, form) {
  const annualSavings = getAnnualSavings(form, offer);
  const includesInternet = offer.service_type === "internet" || offer.service_type === "both";
  const includesMobile = offer.service_type === "mobile" || (offer.service_type === "both" && form.bundle_includes_mobile);
  let meetsServiceLevel = true;
  let betterServiceLevel = false;

  if (includesInternet) {
    const speed = internetOfferSpeedMbps(offer);
    const requiredSpeed = getRequiredInternetSpeedMbps(form);
    meetsServiceLevel = meetsServiceLevel && speed >= requiredSpeed;
    betterServiceLevel = betterServiceLevel || speed > requiredSpeed;
  }

  if (includesMobile) {
    const data = mobileOfferDataGB(offer);
    const requiredData = getRequiredMobileDataGB(form);
    meetsServiceLevel = meetsServiceLevel && (data === Infinity || (typeof data === "number" && data >= requiredData));
    betterServiceLevel = betterServiceLevel || data === Infinity || (typeof data === "number" && data > requiredData);
  }

  const manualReview =
    offer.requires_manual_confirmation ||
    offer.display_price_requires_confirmation ||
    offer.manual_tv_direction ||
    offer.manual_home_phone_direction;
  const backupOption =
    offer.notDefaultPrimary ||
    offer.notPrimaryRecommendation ||
    /Starlink|Xplore/i.test(offer.provider || "");

  let recommendationType = "low_priority";
  if (!meetsServiceLevel) recommendationType = "low_priority";
  else if (manualReview) recommendationType = "manual_review";
  else if (backupOption) recommendationType = "backup_option";
  else if (annualSavings !== null && annualSavings >= 300) recommendationType = "strong_savings";
  else if (annualSavings !== null && annualSavings >= 150) recommendationType = "best_savings";
  else if (meetsServiceLevel && annualSavings !== null && annualSavings > 0) recommendationType = "small_savings";
  else if (betterServiceLevel) recommendationType = "upgrade_option";
  else if (meetsServiceLevel) recommendationType = "backup_option";

  return { recommendationType, annualSavings, meetsServiceLevel, betterServiceLevel };
}

function sortRecommendations(recommendations, form) {
  const typeRank = { strong_savings: 1, best_savings: 1, small_savings: 2, upgrade_option: 3, manual_review: 4, backup_option: 5, low_priority: 9 };
  const sorted = recommendations
    .filter(isRecommendableOffer)
    .map((offer, originalIndex) => {
      const classification = classifyRecommendation(offer, form);
      let sortScore = typeRank[classification.recommendationType] * 10000;
      if (classification.annualSavings !== null) sortScore -= classification.annualSavings;
      if (classification.betterServiceLevel) sortScore -= 80;
      sortScore += originalIndex;
      if (isKoodoOrTelusInternet(offer) && classification.annualSavings !== null && classification.annualSavings < 100) {
        sortScore += 80;
      }
      return { ...offer, ...classification, sortScore };
    })
    .sort((a, b) => a.sortScore - b.sortScore);

  if (sorted[0]?.notPrimaryRecommendation) {
    const firstEligibleIndex = sorted.findIndex((offer) => !offer.notPrimaryRecommendation);
    if (firstEligibleIndex > 0) sorted.unshift(sorted.splice(firstEligibleIndex, 1)[0]);
  }
  return sorted;
}

function pickVisibleRecommendations(recommendations, form) {
  return sortRecommendations(recommendations, form).filter(
    (offer) => offer.recommendationType !== "low_priority" && offer.visible !== false
  );
}

function isKoodoOrTelusInternet(offer) {
  const provider = normalizeProviderName(offer.provider);
  return offer.service_type === "internet" && (provider === "koodo" || provider === "telus");
}

function money(value, language) {
  if (typeof value !== "number") return value;
  return language === "en" ? `$${value}/mo` : `$${value}/月`;
}

function savingsText(offer, form, t, language) {
  const targetPrice = calculationMonthlyPrice(offer);
  if (targetPrice === null) return t.bellSavings;
  const saving = Math.max(0, Math.round(monthlyPrice(form) - targetPrice));
  const annualSaving = saving * 12;
  if (language === "en") return `About $${saving}/mo, about $${annualSaving}/yr`;
  return language === "zhHant" ? `約 $${saving}/月，約 $${annualSaving}/年` : `约 $${saving}/月，约 $${annualSaving}/年`;
}

function relevantTargets(offers, form) {
  const relevant =
    form.service_type === "both" ? offers.filter((offer) => offer.service_type === "both") : offers.filter((offer) => offer.service_type === form.service_type);
  return relevant.map(calculationMonthlyPrice).filter((value) => typeof value === "number");
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
  if (offer.offer_id === "bell_mobile_winback_manual") return bellAliantDisplayText(t.bellWinbackGoodFor);
  return bellAliantDisplayText(t.mobileGoodFor[offer.mobile_data] || t.mobileGoodFor.default);
}

function localizedNote(offer, t, language, form) {
  const bundleNotes = [];
  if (offer.service_type === "both" && form.bundle_includes_tv) {
    bundleNotes.push(textByLanguage(language, "TV 组合需人工确认。", "電視組合需人工確認。", "TV bundle options require manual confirmation."));
  }
  if (offer.service_type === "both" && form.bundle_includes_home_phone) {
    bundleNotes.push(
      textByLanguage(language, "家庭电话组合价格需要人工确认。", "家居電話組合價格需要人工確認。", "Home phone bundle pricing requires manual confirmation.")
    );
  }
  if (offer.offer_id === "bell_internet_mobile_bundle") {
    return textByLanguage(
      language,
      "包含宽带和 Better TV。Better TV 包含 TSN 高清频道。最终价格、资格、安装和本周可用优惠需人工确认。",
      "包含寬頻和 Better TV。Better TV 包含 TSN 高清頻道。最終價格、資格、安裝和本週可用優惠需人工確認。",
      "Includes Internet and Better TV. Better TV includes TSN HD. Final price, eligibility, installation, and available weekly offer require manual confirmation."
    );
  }
  if (offer.offer_id === "bell_internet_better_tv_home_phone_bundle") {
    return textByLanguage(
      language,
      "包含宽带、Better TV 和家庭电话。Better TV 包含 TSN 高清频道。最终价格、资格、安装和本周可用优惠需人工确认。",
      "包含寬頻、Better TV 和家居電話。Better TV 包含 TSN 高清頻道。最終價格、資格、安裝和本週可用優惠需人工確認。",
      "Includes Internet, Better TV, and Home Phone. Better TV includes TSN HD. Final price, eligibility, installation, and available weekly offer require manual confirmation."
    );
  }
  if (/Public Mobile/i.test(offer.provider)) {
    const ruralNote = !isMainUrbanArea(form.city) ? ruralOfferNote(offer, language) : "";
    const minutesNote = hasPublicMobileInternationalMinutes(offer) ? publicMobileInternationalMinutes(language) : "";
    const multiLineNote =
      offer.service_type === "both" && form.bundle_includes_mobile && getLineCountNumber(form.mobile_line_count) >= 2
        ? textByLanguage(
            language,
            "Public Mobile 每条线需要独立订阅和账户管理，适合愿意自助管理的家庭。",
            "Public Mobile 每條線需要獨立訂閱和帳戶管理，適合願意自助管理的家庭。",
            "Each Public Mobile line uses a separate subscription and account, which suits households comfortable with self-service."
          )
        : "";
    return [minutesNote, multiLineNote, ruralNote, ...bundleNotes, publicMobilePlanDisclaimer(language)].filter(Boolean).join(" ");
  }
  if (!isMainUrbanArea(form.city)) {
    const ruralNote = ruralOfferNote(offer, language);
    if (ruralNote) return [ruralNote, ...bundleNotes].filter(Boolean).join(" ");
  }
  if (offer.offer_id === "bell_mobile_winback_manual") return bellAliantDisplayText(t.bellWinbackNote);
  if (/Purple Cow/i.test(offer.provider)) {
    const description = offer.description?.[language === "zhHant" ? "zh-TW" : language === "en" ? "en" : "zh"];
    return [...bundleNotes, description || t.purpleCowNote].filter(Boolean).join(" ");
  }
  if (/Eastlink/i.test(offer.provider)) {
    const description = offer.description?.[language === "zhHant" ? "zh-TW" : language === "en" ? "en" : "zh"];
    return [...bundleNotes, description || bellAliantDisplayText(offer.caution)].filter(Boolean).join(" ");
  }
  if (offer.lowSavingsWarning) {
    return [
      ...bundleNotes,
      textByLanguage(
        language,
        "预计节省有限，是否值得切换需确认。",
        "預計節省有限，是否值得轉換需確認。",
        "Estimated savings are limited. Manual review is recommended before switching."
      )
    ].join(" ");
  }
  if (/TELUS/i.test(offer.provider)) return [...bundleNotes, telusDisclaimer(language)].filter(Boolean).join(" ");
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
  return [...bundleNotes, bellAliantDisplayText(offer.caution)].filter(Boolean).join(" ");
}

function bundleResultNotes(form, language) {
  if (form.service_type !== "both") return [];
  const services = [
    textByLanguage(language, "宽带", "寬頻", "Internet"),
    form.bundle_includes_mobile ? textByLanguage(language, "手机", "手機", "mobile") : "",
    form.bundle_includes_tv ? textByLanguage(language, "TV 服务", "TV 服務", "TV service") : "",
    form.bundle_includes_home_phone ? textByLanguage(language, "家庭电话", "家居電話", "home phone") : ""
  ].filter(Boolean);
  const notes = [
    textByLanguage(
      language,
      `你的组合账单包含：${services.join("、")}。`,
      `你的組合帳單包含：${services.join("、")}。`,
      `Your bundle includes: ${services.join(", ")}.`
    )
  ];

  if (form.bundle_includes_tv || form.bundle_includes_home_phone) {
    notes.push(
      textByLanguage(
        language,
        "这类组合价格通常需要人工确认，尤其是 TV 套餐、家庭电话是否保留、安装资格和本周可用优惠。",
        "這類組合價格通常需要人工覆核，尤其是 TV 套餐、家居電話是否保留、安裝資格和本週可用優惠。",
        "These bundle prices usually require manual review, especially TV packages, home phone retention, installation eligibility, and currently available offers."
      )
    );
  }

  if (form.bundle_includes_mobile) {
    notes.push(
      textByLanguage(
        language,
        "系统会同时参考你的手机线路数量和手机流量需求。",
        "系統會同時參考你的手機線路數量和手機流量需求。",
        "The system also considers your mobile line count and mobile data needs."
      )
    );
  } else {
    notes.push(
      textByLanguage(
        language,
        "你的组合账单不包含手机服务，因此系统不会推荐纯手机套餐。Bill Saver 会重点参考你的宽带、TV 服务和家庭电话情况进行人工确认。",
        "你的組合帳單不包含手機服務，因此系統不會推薦純手機套餐。Bill Saver 會重點參考你的寬頻、TV 服務和家居電話情況進行人工確認。",
        "Your bundle does not include mobile service, so the system will not recommend mobile-only plans. Bill Saver will focus on your internet, TV, and home phone services during manual review."
      )
    );
  }

  if (form.bundle_includes_tv) {
    notes.push(
      textByLanguage(
        language,
        "你填写了已有 TV 服务，Bill Saver 会在人工确认时同步核对是否有更合适的 Internet + TV 或 Internet + Mobile + TV 组合。",
        "你填寫了已有電視服務，Bill Saver 會在人工確認時同步核對是否有更合適的 Internet + TV 或 Internet + Mobile + TV 組合。",
        "You indicated that you have TV service. Bill Saver can also check whether an Internet + TV or Internet + Mobile + TV bundle is available."
      )
    );
  }
  if (form.bundle_includes_home_phone) {
    notes.push(
      textByLanguage(
        language,
        "你填写了已有家庭电话，人工复核时会一并确认是否需要保留家庭电话，以及是否有更合适的组合价格。",
        "你填寫了已有家居電話，人工覆核時會一併確認是否需要保留家居電話，以及是否有更合適的組合價格。",
        "You indicated that you have home phone service. During manual review, we can check whether keeping home phone is necessary and whether a better bundle price is available."
      )
    );
  }
  return notes;
}

function textByLanguage(language, zhHans, zhHant, en) {
  if (language === "en") return en;
  if (language === "zhHant") return zhHant;
  return zhHans;
}

function telusDisclaimer(language) {
  return textByLanguage(
    language,
    "TELUS 官网套餐和促销可能随时变化，以上价格、流量、漫游权益、价格锁定和资格条件仅供参考，最终以 TELUS 当前官网或授权销售人员确认为准。",
    "TELUS 官網套餐和促銷可能隨時變化，以上價格、流量、漫遊權益、價格鎖定和資格條件僅供參考，最終以 TELUS 目前官網或授權銷售人員確認為準。",
    "TELUS plans and promotions may change at any time. Prices, data, roaming benefits, price-lock terms, and eligibility are for reference only and should be confirmed on the current TELUS website or by an authorized sales representative."
  );
}

function publicMobilePlanDisclaimer(language) {
  return textByLanguage(
    language,
    "Public Mobile 官网套餐和促销经常变化，以上价格、流量、长途分钟、eSIM 优惠和可用性仅供参考，最终以 Public Mobile 官网当前显示为准。",
    "Public Mobile 官網套餐和促銷經常變化，以上價格、流量、長途分鐘、eSIM 優惠和可用性僅供參考，最終以 Public Mobile 官網目前顯示為準。",
    "Public Mobile plans and promotions change frequently. Prices, data, long-distance minutes, eSIM offers, and availability are for reference only and should be confirmed on the current Public Mobile website."
  );
}

function publicMobileInternationalMinutes(language) {
  return textByLanguage(
    language,
    "每月 1000 分钟国际长途：可拨打中国、香港、印度、巴基斯坦、菲律宾、台湾和英国。",
    "每月 1000 分鐘國際長途：可撥打中國、香港、印度、巴基斯坦、菲律賓、台灣和英國。",
    "1000 monthly international long-distance minutes to China, Hong Kong, India, Pakistan, Philippines, Taiwan, and the UK."
  );
}

function noAlternativeMessage(language) {
  return textByLanguage(
    language,
    "根据你当前填写的信息，暂时没有足够合适的替代方案。你可以提交人工复核，我们会帮你确认是否有可用优惠。",
    "根據你目前填寫的資訊，暫時沒有足夠合適的替代方案。你可以提交人工覆核，我們會幫你確認是否有可用優惠。",
    "Based on the information provided, there may not be enough suitable alternatives right now. You can submit for manual review and we’ll help check whether any offers are available."
  );
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
  if (offer.speedLabel && typeof offer.speedLabel === "object") {
    return offer.speedLabel[language === "zhHant" ? "zh-TW" : language === "en" ? "en" : "zh"];
  }
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

function offerBadges(offer, language, form) {
  const creditCheckBadge = textByLanguage(language, "需要信用核查", "需要信用審查", "Credit check required");
  const prepaidBadges = [
    textByLanguage(language, "预付卡订阅", "預付卡訂閱", "Prepaid subscription"),
    textByLanguage(language, "不需要信用核查", "不需要信用審查", "No credit check")
  ];
  const hasPostpaidMobile =
    (offer.service_type === "mobile" || (offer.service_type === "both" && Boolean(offer.mobile_data))) &&
    /TELUS|Koodo|Bell/i.test(offer.provider || "");
  const isPublicMobile = /Public Mobile/i.test(`${offer.provider || ""} ${offer.plan_name || ""}`);
  const publicMobileMinutesBadge = hasPublicMobileInternationalMinutes(offer)
    ? [textByLanguage(language, "1000 分钟国际长途", "1000 分鐘國際長途", "1000 international minutes")]
    : [];
  const mobilePlanBadges = isPublicMobile
    ? [...prepaidBadges, ...publicMobileMinutesBadge]
    : hasPostpaidMobile
      ? [creditCheckBadge]
      : [];

  if (isBell(offer) && offer.service_type === "both") {
    return [
      ...(offer.tv_package ? [offer.tv_package] : []),
      ...(offer.tv_highlights || []),
      ...(offer.bundle_services?.includes("home_phone")
        ? [textByLanguage(language, "包含家庭电话", "包含家居電話", "Includes home phone")]
        : []),
      textByLanguage(language, "需确认安装资格", "需確認安裝資格", "Installation eligibility check"),
      textByLanguage(language, "优惠需人工确认", "優惠需人工確認", "Offer confirmation required"),
      creditCheckBadge
    ];
  }

  if (/Koodo/i.test(offer.provider) && (offer.service_type === "internet" || offer.service_type === "both")) {
    return [
      textByLanguage(language, "无合约", "無合約", "No contract"),
      textByLanguage(language, "30 天可免费试用", "30 天可免費試用", "30-day risk-free trial"),
      textByLanguage(language, "免费设备租用", "免費設備租用", "Free equipment rental"),
      textByLanguage(language, "安装资格需确认", "安裝資格需確認", "Installation eligibility required"),
      ...(form?.bundle_includes_tv
        ? [textByLanguage(language, "TV 需人工确认", "TV 需人工確認", "TV requires manual confirmation")]
        : []),
      ...(form?.bundle_includes_home_phone
        ? [textByLanguage(language, "家庭电话需人工确认", "家居電話需人工確認", "Home phone requires manual confirmation")]
        : []),
      ...mobilePlanBadges
    ];
  }
  if (/Purple Cow/i.test(offer.provider)) {
    return [
      textByLanguage(language, "Bill Saver 专享免安装费", "Bill Saver 專享免安裝費", "Bill Saver exclusive installation fee waiver"),
      textByLanguage(language, "无合约", "無合約", "No contract"),
      textByLanguage(language, "不限流量", "不限流量", "No usage fees"),
      "Wireless Router",
      ...(form?.bundle_includes_tv
        ? [textByLanguage(language, "TV 需人工确认", "TV 需人工確認", "TV requires manual confirmation")]
        : []),
      ...(form?.bundle_includes_home_phone
        ? [textByLanguage(language, "家庭电话需人工确认", "家居電話需人工確認", "Home phone requires manual confirmation")]
        : []),
      ...mobilePlanBadges
    ];
  }
  if (/Eastlink/i.test(offer.provider) && offer.service_type === "internet") {
    return [
      Number(offer.speedMbps) >= 900 ? "Gig Internet" : "350 Mbps",
      textByLanguage(language, "不限流量", "不限流量", "Unlimited data"),
      textByLanguage(language, "本地运营商", "本地電信商", "Local provider"),
      textByLanguage(language, "安装资格需确认", "安裝資格需確認", "Installation eligibility required")
    ];
  }
  if (isBell(offer) && offer.service_type === "internet") {
    return [
      textByLanguage(language, "光纤稳定", "光纖穩定", "Stable Fibre"),
      textByLanguage(language, "免安装费", "免安裝費", "No installation fee"),
      textByLanguage(language, "免激活费", "免啟用費", "No activation fee"),
      textByLanguage(language, "优惠需确认", "優惠需確認", "Offer confirmation"),
      ...mobilePlanBadges
    ];
  }
  if (isBell(offer) && offer.service_type === "mobile") {
    return [
      textByLanguage(language, "大网覆盖", "大網覆蓋", "Major network"),
      textByLanguage(language, "大流量方案", "大流量方案", "High-data option"),
      ...(offer.requires_pad ? [textByLanguage(language, "需设置自动扣款", "需設定自動扣款", "Pre-authorized debit required")] : []),
      textByLanguage(language, "优惠需确认", "優惠需確認", "Offer confirmation"),
      textByLanguage(language, "适合重度用户", "適合重度用戶", "Good for heavy users"),
      ...mobilePlanBadges
    ];
  }
  if (/TELUS/i.test(offer.provider) && offer.service_type === "mobile") {
    const planSpecificBadge = /Unlimited Explore/i.test(offer.plan_name)
      ? textByLanguage(language, "适合国际旅行", "適合國際旅行", "Good for international travel")
      : /Unlimited/i.test(offer.plan_name)
        ? textByLanguage(language, "无限高速数据", "無限高速數據", "Unlimited high-speed data")
        : textByLanguage(language, "适合高流量用户", "適合高流量用戶", "Good for high-data users");
    return [
      textByLanguage(language, "大网覆盖", "大網覆蓋", "Major network"),
      textByLanguage(language, "5G+ 高速，最高约 2Gbps", "5G+ 高速，最高約 2Gbps", "5G+ speeds up to about 2Gbps"),
      textByLanguage(language, "5 年价格锁定", "5 年價格鎖定", "5-year price lock"),
      planSpecificBadge,
      ...mobilePlanBadges
    ];
  }
  if (/Koodo/i.test(offer.provider) && offer.service_type === "mobile") {
    const planBadge = /Canada-US-Mexico/i.test(offer.plan_name)
      ? textByLanguage(language, "5G 60GB / 加美墨", "5G 60GB / 加美墨", "5G 60GB / Canada-US-Mexico")
      : offer.mobile_data === "100GB"
        ? "5G 100GB"
        : "5G 60GB";
    return [
      textByLanguage(language, "性价比推荐", "性價比推薦", "Good Value Pick"),
      planBadge,
      textByLanguage(language, "免费 Perk", "免費 Perk", "Free Perk"),
      ...mobilePlanBadges
    ];
  }
  return mobilePlanBadges;
}

function displayBadge(badge, offer, index, language) {
  if (/Purple Cow/i.test(offer.provider || "") && index === 0) {
    return {
      label: textByLanguage(
        language,
        "Bill Saver 专享免安装费",
        "Bill Saver 專享免安裝費",
        "Bill Saver exclusive installation fee waiver"
      ),
      subLabel: textByLanguage(language, "Bill Saver 专享", "Bill Saver 專享", "Bill Saver exclusive")
    };
  }
  return typeof badge === "string" ? { label: badge } : badge;
}

function badgeKey(badge, index) {
  return typeof badge === "string" ? `${badge}-${index}` : `${badge.label}-${badge.subLabel || ""}-${index}`;
}

function publicMobileReferralText(language) {
  return textByLanguage(
    language,
    "使用推荐码 P8S6NX 开通 Public Mobile，可获得 $10 账户余额奖励。",
    "使用推薦碼 P8S6NX 開通 Public Mobile，可獲得 $10 帳戶餘額獎勵。",
    "Use referral code P8S6NX when activating Public Mobile to receive a $10 account credit."
  );
}

function publicMobileSourceNote(language) {
  return textByLanguage(
    language,
    "参考来源：Public Mobile 官方覆盖说明、TELUS 覆盖地图、Public Mobile Community，以及 Reddit / PEI 本地论坛公开用户反馈整理。覆盖体验会因地址、建筑、地形、手机型号和使用场景不同而变化，农村或信号敏感用户建议先测试。",
    "參考來源：Public Mobile 官方覆蓋說明、TELUS 覆蓋地圖、Public Mobile Community，以及 Reddit / PEI 本地論壇公開用戶反饋整理。覆蓋體驗會因地址、建築、地形、手機型號和使用場景不同而變化，農村或訊號敏感用戶建議先測試。",
    "Sources: Public Mobile official coverage information, TELUS coverage map, Public Mobile Community, and public user feedback from Reddit / PEI local forums. Coverage experience may vary by address, building, terrain, phone model, and usage scenario. Rural users or signal-sensitive users should test first."
  );
}

function publicMobileLocalReviewContent(language) {
  return {
    entryTitle: textByLanguage(language, "PEI 本地评价", "PEI 本地評價", "PEI Local Review"),
    entryText: textByLanguage(language, "城区更适合，农村建议先测试", "城區更適合，農村建議先測試", "Best for urban users; rural users should test first"),
    entryLink: textByLanguage(language, "查看详情 →", "查看詳情 →", "View details →"),
    title: textByLanguage(language, "Public Mobile｜PEI 本地评价", "Public Mobile｜PEI 本地評價", "Public Mobile | PEI Local Review"),
    sections: [
      {
        icon: "✓",
        heading: textByLanguage(language, "适合", "適合", "Best for"),
        items: [
          textByLanguage(language, "主要在 Charlottetown、Stratford、Summerside 和常见城区活动的用户", "主要在 Charlottetown、Stratford、Summerside 和常見城區活動的用戶", "Users mainly active in Charlottetown, Stratford, Summerside, and common urban areas"),
          textByLanguage(language, "BYOD 自带手机用户", "BYOD 自帶手機用戶", "BYOD users"),
          textByLanguage(language, "价格敏感、愿意自己用 App 管理账户的用户", "價格敏感、願意自己用 App 管理帳戶的用戶", "Price-sensitive users who are comfortable managing their account through an app"),
          textByLanguage(language, "不太依赖线下客服的人", "不太依賴線下客服的人", "Users who do not rely heavily on in-person customer service")
        ]
      },
      {
        icon: "▥",
        heading: textByLanguage(language, "信号", "訊號", "Signal"),
        items: [
          textByLanguage(language, "使用 TELUS 网络，理论上与 TELUS / Koodo 覆盖接近", "使用 TELUS 網絡，理論上與 TELUS / Koodo 覆蓋接近", "Uses the TELUS network, so coverage should generally be close to TELUS / Koodo"),
          textByLanguage(language, "PEI 主要城区通常够用", "PEI 主要城區通常夠用", "Usually good enough in PEI’s main urban areas"),
          textByLanguage(language, "郊区、低洼地、树林、海边、公路部分路段可能仍有盲区", "郊區、低窪地、樹林、海邊、公路部分路段可能仍有盲區", "Suburban areas, low-lying spots, wooded areas, coastal areas, and some highway sections may still have dead zones"),
          textByLanguage(language, "如果你家里或工作地点原本 TELUS/Koodo 信号不好，Public Mobile 通常也不会神奇变好", "如果你家裡或工作地點原本 TELUS/Koodo 訊號不好，Public Mobile 通常也不會神奇變好", "If TELUS/Koodo signal is weak at your home or workplace, Public Mobile usually will not magically improve it")
        ]
      },
      {
        icon: "!",
        heading: textByLanguage(language, "谨慎", "謹慎", "Caution"),
        items: [
          textByLanguage(language, "客服主要是线上自助，不适合非常依赖人工客服的人", "客服主要是線上自助，不適合非常依賴人工客服的人", "Support is mainly online self-serve, so it may not suit users who rely heavily on human customer service"),
          textByLanguage(language, "农村用户建议先用 eSIM/低价套餐测试，确认家里、工作地、常走路线信号后再长期使用", "農村用戶建議先用 eSIM/低價套餐測試，確認家裡、工作地、常走路線訊號後再長期使用", "Rural users should consider testing first with eSIM or a low-cost plan, and confirm signal at home, work, and common routes before using it long term")
        ]
      }
    ]
  };
}

function publicMobileButtonLabels(language) {
  return {
    copy: textByLanguage(language, "复制推荐码", "複製推薦碼", "Copy code"),
    open: textByLanguage(language, "打开 Public Mobile", "打開 Public Mobile", "Open Public Mobile")
  };
}

function usageGuidanceContent(language) {
  return {
    helpMuted: textByLanguage(language, "不确定选哪个？", "不確定選哪個？", "Not sure which one to choose?"),
    helpAction: textByLanguage(language, "了解更多使用场景建议 >", "了解更多使用場景建議 >", "View usage guidance >"),
    title: textByLanguage(language, "使用场景建议", "使用場景建議", "Usage Guidance"),
    intro: textByLanguage(
      language,
      "单个视频流并不需要很高的网速，但家庭宽带还要考虑多人同时使用、Wi-Fi 衰减、上传速度、视频会议、游戏、摄像头、电视盒子和智能家居设备等因素。",
      "單個影片串流並不需要很高的網速，但家庭寬頻還要考慮多人同時使用、Wi-Fi 衰減、上傳速度、視訊會議、遊戲、攝影機、電視盒和智能家居設備等因素。",
      "A single video stream does not require extremely high speed, but home internet also needs to account for multiple users, Wi-Fi signal loss, upload speed, video meetings, gaming, cameras, TV boxes, and smart-home devices."
    ),
    videoTitle: textByLanguage(language, "视频平台参考速度（单个视频流）", "影片平台參考速度（單個影片串流）", "Reference Speeds for Video Platforms"),
    householdTitle: textByLanguage(language, "家庭上网使用场景建议", "家庭上網使用場景建議", "Home Internet Usage Guidance"),
    ruleLabel: textByLanguage(language, "参考判断", "參考判斷", "Rule of thumb"),
    cautionLabel: textByLanguage(language, "需要注意", "需要注意", "Watch out"),
    tipTitle: textByLanguage(language, "小提示", "小提示", "Tip"),
    tip: textByLanguage(
      language,
      "如果不确定，先选“普通家庭”。我们会结合你当前月费、运营商和使用情况做初步判断。",
      "如果不確定，先選「一般家庭」。我們會結合你目前月費、電信商和使用情況做初步判斷。",
      "If you are not sure, choose “Standard household” first. We’ll use your current bill, provider, and usage level to make an initial estimate."
    ),
    source: textByLanguage(
      language,
      "参考来源：Netflix 官方网速建议、YouTube 官方系统需求、FCC Broadband Speed Guide、CRTC 50/10 Mbps 宽带目标、加拿大连接战略。实际需求会受家庭人数、设备数量、Wi-Fi 环境、上传需求和具体应用影响。",
      "參考來源：Netflix 官方網速建議、YouTube 官方系統需求、FCC Broadband Speed Guide、CRTC 50/10 Mbps 寬頻目標、加拿大連接戰略。實際需求會受家庭人數、設備數量、Wi-Fi 環境、上傳需求和具體應用影響。",
      "Sources: Netflix official speed recommendations, YouTube system requirements, FCC Broadband Speed Guide, CRTC 50/10 Mbps broadband objective, and Canada’s Connectivity Strategy. Actual needs may vary depending on household size, number of devices, Wi-Fi conditions, upload needs, and specific applications."
    ),
    speedRows: [
      ["Netflix 1080p", textByLanguage(language, "5 Mbps 以上", "5 Mbps 以上", "5 Mbps or higher")],
      ["Netflix 4K UHD", textByLanguage(language, "15 Mbps 以上", "15 Mbps 以上", "15 Mbps or higher")],
      ["YouTube 1080p", "5 Mbps"],
      ["YouTube 4K UHD", "20 Mbps"],
      [
        textByLanguage(language, "FCC 对单个 4K 视频流的参考", "FCC 對單個 4K 影片串流的參考", "FCC reference for a single 4K video stream"),
        textByLanguage(language, "约 25 Mbps", "約 25 Mbps", "About 25 Mbps")
      ],
      [
        textByLanguage(language, "CRTC / 加拿大连接战略", "CRTC / 加拿大連接戰略", "CRTC / Canada’s Connectivity Strategy"),
        textByLanguage(
          language,
          "加拿大固定宽带目标为至少 50 Mbps 下载 / 10 Mbps 上传，并提供无限流量选项",
          "加拿大固定寬頻目標為至少 50 Mbps 下載 / 10 Mbps 上傳，並提供無限流量選項",
          "Canada’s fixed broadband target is at least 50 Mbps download / 10 Mbps upload, with access to unlimited data"
        )
      ]
    ],
    cards: [
      {
        type: "light",
        marker: "1",
        title: textByLanguage(language, "轻度使用", "輕度使用", "Light use"),
        people: textByLanguage(language, "1–2 人", "1–2 人", "1–2 people"),
        body: textByLanguage(
          language,
          "微信、网页、邮件、YouTube/Netflix、普通高清视频、视频通话、刷短视频、偶尔在家办公。",
          "微信、網頁、電郵、YouTube/Netflix、一般高清影片、視訊通話、刷短影片、偶爾在家工作。",
          "Messaging, browsing, email, YouTube/Netflix, regular HD video, video calls, short videos, and occasional work from home."
        ),
        estimate: textByLanguage(language, "50–100 Mbps 通常够用。", "50–100 Mbps 通常夠用。", "50–100 Mbps is usually enough."),
        caution: textByLanguage(
          language,
          "如果多人同时 4K、游戏、直播、上传文件，100 Mbps / 上传 10 Mbps 可能不够稳。",
          "如果多人同時 4K、遊戲、直播、上傳檔案，100 Mbps / 上傳 10 Mbps 可能不夠穩。",
          "If multiple people stream 4K, game, livestream, or upload files at the same time, 100 Mbps download / 10 Mbps upload may feel less stable."
        )
      },
      {
        type: "standard",
        marker: "2",
        title: textByLanguage(language, "普通家庭", "一般家庭", "Standard household"),
        people: textByLanguage(language, "2–4 人", "2–4 人", "2–4 people"),
        body: textByLanguage(
          language,
          "4K 视频、视频会议、孩子上网课、电视盒子、多台手机和平板同时使用、普通游戏、偶尔远程办公。",
          "4K 影片、視訊會議、孩子上網課、電視盒、多台手機和平板同時使用、一般遊戲、偶爾遠端工作。",
          "4K video, video meetings, online classes, TV boxes, multiple phones/tablets, casual gaming, and occasional remote work."
        ),
        estimate: textByLanguage(
          language,
          "100–300 Mbps 比较合适。对大多数 PEI 普通家庭来说，300 Mbps 通常已经比较舒服。",
          "100–300 Mbps 比較合適。對大多數 PEI 一般家庭來說，300 Mbps 通常已經比較舒服。",
          "100–300 Mbps is usually a good range. For many PEI households, 300 Mbps is already comfortable."
        ),
        caution: textByLanguage(
          language,
          "如果家里经常多人同时 4K、下载大文件、直播、NAS、摄像头很多，可以考虑更高速度。",
          "如果家中經常多人同時 4K、下載大型檔案、直播、NAS、攝影機很多，可以考慮更高速度。",
          "If your home often has multiple 4K streams, large downloads, livestreaming, NAS, or many cameras, consider a faster plan."
        )
      },
      {
        type: "heavy",
        marker: "3",
        title: textByLanguage(language, "重度家庭", "重度家庭", "Heavy household"),
        people: textByLanguage(language, "4 人以上", "4 人以上", "4+ people"),
        body: textByLanguage(
          language,
          "多人同时 4K、在线游戏、直播、下载大文件、远程办公、上传文件、NAS、摄像头、电视盒子、智能家居设备较多。",
          "多人同時 4K、線上遊戲、直播、下載大型檔案、遠端工作、上傳檔案、NAS、攝影機、電視盒、智能家居設備較多。",
          "Multiple people streaming 4K, online gaming, livestreaming, large downloads, remote work, uploads, NAS, cameras, TV boxes, and smart-home devices."
        ),
        estimate: textByLanguage(
          language,
          "400 Mbps–1 Gbps 更合适。如果追求稳定体验，尤其是多人同时使用，Gigabit / Fibre 会更稳。",
          "400 Mbps–1 Gbps 更合適。如果追求穩定體驗，尤其是多人同時使用，Gigabit / Fibre 會更穩。",
          "400 Mbps–1 Gbps is usually more suitable. For the most stable experience, especially with many simultaneous users, Gigabit / Fibre can be a better fit."
        ),
        caution: textByLanguage(
          language,
          "这类家庭不应该只看最低月费，上传速度、稳定性、延迟和 Wi-Fi 覆盖都很重要。",
          "這類家庭不應該只看最低月費，上傳速度、穩定性、延遲和 Wi-Fi 覆蓋都很重要。",
          "Heavy households should not choose only by the lowest monthly price. Upload speed, stability, latency, and Wi-Fi coverage matter."
        )
      }
    ]
  };
}

function UsageGuidanceModal({ isOpen, onClose, language }) {
  if (!isOpen) return null;

  const content = usageGuidanceContent(language);

  return (
    <div className="usageModalBackdrop" role="presentation" onMouseDown={onClose}>
      <div className="usageModal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="usageModalClose" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="usageModalHeader">
          <h2>{content.title}</h2>
          <p>{content.intro}</p>
        </div>

        <section className="usageModalSection">
          <h3>{content.videoTitle}</h3>
          <div className="speedTable">
            {content.speedRows.map(([label, value]) => (
              <div className="speedRow" key={label}>
                <div className="speedLabel">{label}</div>
                <div className="speedValue">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="usageModalSection">
          <h3>{content.householdTitle}</h3>
          <div className="usageGuidanceGrid">
            {content.cards.map((card) => (
              <div className={`usageGuidanceCard ${card.type}`} key={card.type}>
                <div className="usageGuidanceCardTop">
                  <div className="usageGuidanceIcon">{card.marker}</div>
                  <div>
                    <h4>{card.title}</h4>
                    <span>{card.people}</span>
                  </div>
                </div>

                <p>{card.body}</p>

                <div className="usageGuidanceSubtitle">{content.ruleLabel}</div>
                <p>{card.estimate}</p>

                <div className="usageGuidanceSubtitle">{content.cautionLabel}</div>
                <p>{card.caution}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="usageTip">
          <strong>{content.tipTitle}</strong>
          <span>{content.tip}</span>
        </div>

        <p className="usageSource">{content.source}</p>
      </div>
    </div>
  );
}

function hasPublicMobileComponent(offer) {
  return /Public Mobile/i.test(`${offer.provider || ""} ${offer.plan_name || ""}`);
}

function hasPublicMobileInternationalMinutes(offer) {
  const searchable = `${offer.provider || ""} ${offer.plan_name || ""} ${offer.coverage || ""}`;
  return /Public Mobile/i.test(searchable) && /Canada-US-Mexico/i.test(searchable);
}

function premiumCtaContent(language, offer) {
  const isBundle = offer?.service_type === "both";
  return {
    buttonLabel: isBundle
      ? textByLanguage(language, "获取人工确认优惠 →", "取得人工確認優惠 →", "Get a Manually Confirmed Offer →")
      : null,
    title: textByLanguage(
      language,
      isBundle ? "通过 Bill Saver 获取组合账单人工复核" : "通过 Bill Saver 获取人工确认优惠",
      isBundle ? "透過 Bill Saver 取得組合帳單人工覆核" : "透過 Bill Saver 取得人工確認優惠",
      isBundle ? "Get a manual bundle bill review through Bill Saver" : "Get manually confirmed offers through Bill Saver"
    ),
    body: textByLanguage(
      language,
      isBundle
        ? "我们会帮你核对当前可用价格、安装资格、TV 套餐、家庭电话是否需要保留，以及是否有更合适方案。你不需要向 Bill Saver 支付任何费用。"
        : "我们会帮你核对当前可用价格、安装资格和是否有更合适方案。你不需要向 Bill Saver 支付任何费用。",
      isBundle
        ? "我們會幫你核對目前可用價格、安裝資格、TV 套餐、家居電話是否需要保留，以及是否有更合適方案。你不需要向 Bill Saver 支付任何費用。"
        : "我們會幫你核對目前可用價格、安裝資格和是否有更合適方案。你不需要向 Bill Saver 支付任何費用。",
      isBundle
        ? "We’ll help confirm available pricing, installation eligibility, TV options, whether home phone should be retained, and whether there is a better fit. You do not pay Bill Saver any fee."
        : "We’ll help confirm available pricing, installation eligibility, and whether there is a better fit. You do not pay Bill Saver any fee."
    ),
    whyTitle: textByLanguage(language, "为什么通过 Bill Saver？", "為什麼透過 Bill Saver？", "Why use Bill Saver?"),
    items: [
      textByLanguage(language, "人工确认可用优惠", "人工確認可用優惠", "Manually confirm available offers"),
      textByLanguage(language, "不收任何服务费", "不收任何服務費", "No service fee"),
      textByLanguage(language, "协助核对价格、资格和安装方式", "協助核對價格、資格和安裝方式", "Help check pricing, eligibility, and installation options"),
      textByLanguage(
        language,
        "后续涨价也可帮你重新评估替代方案",
        "後續漲價也可幫你重新評估替代方案",
        "If prices rise later, we can help reassess alternatives"
      )
    ],
    disclaimer: textByLanguage(
      language,
      "最终价格、资格、下单、安装和账单以运营商或授权销售人员确认为准。",
      "最終價格、資格、下單、安裝和帳單以電信商或授權銷售人員確認為準。",
      "Final pricing, eligibility, ordering, installation, and billing are confirmed by the provider or authorized sales representative."
    )
  };
}

function recommendationTag(offer, index, language) {
  if (offer.recommendationType === "strong_savings") return textByLanguage(language, "明显节省", "明顯節省", "Strong savings");
  if (offer.recommendationType === "best_savings") return textByLanguage(language, "明显节省", "明顯節省", "Strong savings");
  if (offer.recommendationType === "small_savings") return textByLanguage(language, "小幅节省", "小幅節省", "Modest savings");
  if (offer.recommendationType === "upgrade_option") {
    return textByLanguage(language, "价格接近，规格更好", "價格接近，規格更好", "Similar price, better service");
  }
  if (offer.recommendationType === "manual_review") return textByLanguage(language, "人工确认", "人工確認", "Manual review");
  if (offer.recommendationType === "backup_option") return textByLanguage(language, "备选方案", "備選方案", "Backup option");
  if (offer.lowSavingsWarning) return textByLanguage(language, "节省有限", "節省有限", "Limited savings");
  if (index === 0 || isBell(offer)) return textByLanguage(language, "首选推荐", "首選推薦", "Top recommendation");
  if (/Koodo|TELUS|Public Mobile/i.test(offer.provider || "")) {
    return textByLanguage(language, "性价比推荐", "性價比推薦", "Best value");
  }
  return textByLanguage(language, "预算备选", "預算備選", "Budget alternative");
}

function recommendationTagTone(offer, index) {
  if (offer.recommendationType === "strong_savings") return "primary";
  if (offer.recommendationType === "best_savings") return "primary";
  if (offer.recommendationType === "small_savings") return "value";
  if (offer.recommendationType === "upgrade_option") return "alternative";
  if (offer.recommendationType === "manual_review") return "value";
  if (offer.recommendationType === "backup_option") return "alternative";
  if (offer.lowSavingsWarning) return "alternative";
  if (index === 0 || isBell(offer)) return "primary";
  if (/Koodo|TELUS|Public Mobile/i.test(offer.provider || "")) return "value";
  return "alternative";
}

function providerCtaLabel(offer, language) {
  if (isBell(offer)) return textByLanguage(language, "获取可用优惠", "取得可用優惠", "Check available offer");
  if (/Koodo|TELUS/i.test(offer.provider || "")) return textByLanguage(language, "查看是否适合我", "查看是否適合我", "See if it fits");
  if (/Purple Cow/i.test(offer.provider || "")) return textByLanguage(language, "咨询本周方案", "諮詢本週方案", "Ask about this week's option");
  return textByLanguage(language, "人工确认优惠", "人工確認優惠", "Confirm available offer");
}

function providerMark(provider) {
  return displayProviderName(provider)
    .split(/\s|\+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function resultTrustContent(language) {
  return {
    action: textByLanguage(language, "获得最佳价格 →", "取得最佳價格 →", "Get the Best Price →"),
    title: textByLanguage(
      language,
      "通过 Bill Saver 获取人工确认优惠",
      "透過 Bill Saver 取得人工確認優惠",
      "Get manually confirmed offers through Bill Saver"
    ),
    body: textByLanguage(
      language,
      "我们会帮你核对当前可用价格、安装资格和是否有更合适方案。你不需要向 Bill Saver 支付任何费用。",
      "我們會幫你核對目前可用價格、安裝資格和是否有更合適方案。你不需要向 Bill Saver 支付任何費用。",
      "We’ll help confirm available pricing, installation eligibility, and whether there is a better fit. You do not pay Bill Saver any fee."
    ),
    whyTitle: textByLanguage(language, "为什么通过 Bill Saver？", "為什麼透過 Bill Saver？", "Why use Bill Saver?"),
    items: [
      textByLanguage(language, "人工确认可用优惠", "人工確認可用優惠", "Manually confirm available offers"),
      textByLanguage(language, "不收任何服务费", "不收任何服務費", "No service fee"),
      textByLanguage(language, "协助核对价格、资格和安装方式", "協助核對價格、資格和安裝方式", "Help check pricing, eligibility, and installation options"),
      textByLanguage(
        language,
        "后续涨价也可帮你重新评估替代方案",
        "後續漲價也可幫你重新評估替代方案",
        "If prices rise later, we can help reassess alternatives"
      )
    ]
  };
}

function resultCautionItems(language) {
  return [
    textByLanguage(
      language,
      "以上价格和预计节省金额仅供初步参考，实际结果取决于你的地址、当前账单、运营商资格和本周可用优惠。",
      "以上價格和預計節省金額僅供初步參考，實際結果取決於你的地址、目前帳單、電信商資格和本週可用優惠。",
      "Prices and estimated savings are preliminary references only. Actual results depend on your address, current bill, provider eligibility, and available weekly offers."
    ),
    textByLanguage(
      language,
      "最终价格、资格、安装方式和信用审核，以运营商官方或授权团队确认为准。",
      "最終價格、資格、安裝方式和信用審查，以電信商官方或授權團隊確認為準。",
      "Final pricing, eligibility, installation options, and credit checks must be confirmed by the provider or an authorized team."
    ),
    textByLanguage(
      language,
      "Bill Saver 不向用户收取服务费。部分运营商或合作渠道可能会向我们支付推荐佣金，但我们会综合价格、速度、稳定性、地址可用性和你的实际需求来整理建议。",
      "Bill Saver 不向用戶收取服務費。部分電信商或合作渠道可能會向我們支付推薦佣金，但我們會綜合價格、速度、穩定性、地址可用性和你的實際需求來整理建議。",
      "Bill Saver does not charge users a service fee. Some providers or partner channels may pay us a referral commission, but our recommendations consider pricing, speed, stability, address availability, and your actual needs."
    ),
    textByLanguage(
      language,
      "如果后续价格上涨超出预期，Bill Saver 也可以继续帮你重新评估替代方案。",
      "如果後續價格上漲超出預期，Bill Saver 也可以繼續幫你重新評估替代方案。",
      "If prices later rise beyond expectations, Bill Saver can also help reassess alternatives."
    )
  ];
}

function ResultStepProgress({ language, currentStep = 2 }) {
  const labels = [
    textByLanguage(language, "输入账单", "輸入帳單", "Enter bill"),
    textByLanguage(language, "查看结果", "查看結果", "View result"),
    textByLanguage(language, "获取优惠", "取得優惠", "Get offers")
  ];
  const steps = labels.map((label, index) => {
    const number = index + 1;
    return {
      number,
      label,
      status: number < currentStep ? "completed" : number === currentStep ? "active" : "pending"
    };
  });

  return (
    <nav
      className="resultStepProgress"
      aria-label={textByLanguage(language, "账单体检进度", "帳單健檢進度", "Bill check progress")}
    >
      <div className="resultStepTrack" aria-hidden="true">
        <span style={{ width: `${Math.max(0, Math.min(100, ((currentStep - 1) / 2) * 100))}%` }} />
      </div>
      {steps.map((step) => (
        <div className={`resultStep resultStep-${step.status}`} key={step.number}>
          <div className="resultStepCircle" aria-current={step.status === "active" ? "step" : undefined}>
            {step.number}
          </div>
          <div className="resultStepLabel">{step.label}</div>
        </div>
      ))}
    </nav>
  );
}

function displayPlanName(offer, t) {
  if (offer.offer_id === "bell_mobile_winback_manual") return bellAliantDisplayText(t.bellWinbackService);
  if (offer.offer_id === "bell_internet_mobile_bundle") {
    const language = t === translations.en ? "en" : t === translations.zhHant ? "zhHant" : "zhHans";
    return textByLanguage(language, "Bell Aliant 宽带 + Better TV", "Bell Aliant 寬頻 + Better TV", "Bell Aliant Internet + Better TV");
  }
  if (offer.offer_id === "bell_internet_better_tv_home_phone_bundle") {
    const language = t === translations.en ? "en" : t === translations.zhHant ? "zhHant" : "zhHans";
    return textByLanguage(
      language,
      "Bell Aliant 宽带 + Better TV + 家庭电话",
      "Bell Aliant 寬頻 + Better TV + 家居電話",
      "Bell Aliant Internet + Better TV + Home Phone"
    );
  }
  if (offer.service_type === "both" && (offer.manual_tv_direction || offer.manual_home_phone_direction)) {
    const language = t === translations.en ? "en" : t === translations.zhHant ? "zhHant" : "zhHans";
    const directions = [
      offer.manual_tv_direction ? textByLanguage(language, "TV 服务人工确认", "TV 服務人工確認", "TV service manual confirmation") : "",
      offer.manual_home_phone_direction
        ? textByLanguage(language, "家庭电话人工确认", "家居電話人工確認", "Home phone manual confirmation")
        : ""
    ].filter(Boolean);
    return `${bellAliantDisplayText(offer.display_name || offer.plan_name)} + ${directions.join(" + ")}`;
  }
  return bellAliantDisplayText(offer.display_name || offer.plan_name);
}

function displayPrice(offer, t, language) {
  if (isManualPrice(offer)) {
    if (isBell(offer)) return t.bellPrice;
    return textByLanguage(language, "价格需人工确认", "價格需人工確認", "Price requires confirmation");
  }
  return money(offer.bill_saver_target_price, language);
}

function bundleCostRows(offer, language) {
  if (offer.service_type !== "both" || !offer.mobile_data || !offer.mobile_line_count) return [];

  const isFivePlus = offer.mobile_line_count === "5+";
  const exactMobilePriceHidden = isBell(offer) || isFivePlus || typeof offer.mobile_unit_price !== "number";
  const exactBundlePriceHidden = isManualPrice(offer) || typeof offer.bundle_total_monthly_cost !== "number";
  const lineLabel = isFivePlus
    ? textByLanguage(language, "5 条及以上", "5 條及以上", "5+")
    : textByLanguage(language, `${offer.mobile_line_count} 条`, `${offer.mobile_line_count} 條`, offer.mobile_line_count);
  const mobileCost = exactMobilePriceHidden
    ? textByLanguage(language, "优惠价需人工确认", "優惠價需人工確認", "Offer price requires confirmation")
    : `${money(offer.mobile_unit_price, language)} × ${offer.mobile_line_count} = ${money(offer.mobile_total, language)}`;
  const totalCost = exactBundlePriceHidden
    ? textByLanguage(language, "组合总价需人工确认", "組合總價需人工確認", "Bundle total requires confirmation")
    : textByLanguage(
        language,
        `约 ${money(offer.bundle_total_monthly_cost, language)}`,
        `約 ${money(offer.bundle_total_monthly_cost, language)}`,
        `About ${money(offer.bundle_total_monthly_cost, language)}`
      );

  return [
    {
      label: textByLanguage(language, "手机线路：", "手機線路：", "Mobile lines:"),
      value: lineLabel
    },
    {
      label: textByLanguage(language, "手机费用：", "手機費用：", "Mobile cost:"),
      value: mobileCost
    },
    {
      label: textByLanguage(language, "宽带费用：", "寬頻費用：", "Internet cost:"),
      value:
        isBell(offer) || typeof offer.internet_monthly_price !== "number"
          ? textByLanguage(language, "价格需人工确认", "價格需人工確認", "Price requires confirmation")
          : money(offer.internet_monthly_price, language)
    },
    {
      label: textByLanguage(language, "预计组合总费用：", "預計組合總費用：", "Estimated bundle total:"),
      value: totalCost
    }
  ];
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

function internetUsageMatchScore(offer, usage) {
  const speed = Number(offer.speedMbps) || speedRank(offer.speed_down);
  if (usage === "heavy") return speed >= 900 ? 30 : speed >= 300 ? -10 : -55;
  if (usage === "standard") return speed >= 300 ? 22 : -28;
  if (usage === "light") return speed >= 100 && speed <= 300 ? 14 : speed > 300 ? 4 : -20;
  return 0;
}

function internetRecommendationScore(offer, form) {
  const annualSavings = getAnnualSavings(form, offer);
  let score = scoreOffer(offer, form) + internetUsageMatchScore(offer, form.internet_usage_level);
  if (annualSavings !== null) score += Math.min(30, annualSavings / 12);
  if (/Purple Cow/i.test(offer.provider) && offer.installationFeeWaivedByBillSaver) score += 5;
  if (offer.notPrimaryRecommendation) score -= 80;
  return score;
}

function bestProviderOffer(offers, provider, form) {
  const matches = offers.filter((offer) => (provider === "Bell Aliant" ? isBell(offer) : offer.provider === provider));
  if (provider === "Purple Cow" && matches.length) {
    const sorted = [...matches].sort(
      (a, b) => (Number(a.speedMbps) || speedRank(a.speed_down)) - (Number(b.speedMbps) || speedRank(b.speed_down))
    );
    const requiredSpeed = getRequiredInternetSpeedMbps(form);
    return sorted.find((offer) => internetOfferSpeedMbps(offer) >= requiredSpeed) || sorted[sorted.length - 1];
  }
  if (provider === "Eastlink" && matches.length) {
    const sorted = [...matches].sort(
      (a, b) => (Number(a.speedMbps) || speedRank(a.speed_down)) - (Number(b.speedMbps) || speedRank(b.speed_down))
    );
    return sorted.find((offer) => internetOfferSpeedMbps(offer) >= getRequiredInternetSpeedMbps(form)) || sorted[sorted.length - 1];
  }
  const serviceLevelMatches = matches.filter((offer) => offer.service_type !== "internet" || internetMeetsServiceLevel(offer, form));
  return (serviceLevelMatches.length ? serviceLevelMatches : matches).sort((a, b) => scoreOffer(b, form) - scoreOffer(a, form))[0];
}

function bestMobileProviderOffer(offers, provider, form) {
  const matches = offers.filter((offer) => (provider === "Bell Aliant" ? isBell(offer) : offer.provider === provider));
  return matches.sort((a, b) => mobileOfferSortScore(a, form) - mobileOfferSortScore(b, form))[0];
}

function internetPicks(form) {
  const eligibleOffers = filterOutCurrentProvider(
    offerDatabase.filter((offer) => offer.service_type === "internet" && isRecommendableOffer(offer)),
    form.current_provider
  );
  const allowedProviders = isMainUrbanArea(form.city)
    ? ["koodo", "telus", "purple_cow", "eastlink", "bell_aliant"]
    : ["bell_aliant", "starlink", "xplore"];

  const picks = eligibleOffers
    .filter((offer) => allowedProviders.includes(normalizeProviderName(offer.provider)))
    .filter((offer) => internetMeetsServiceLevel(offer, form))
    .map((offer) => {
      const annualSavings = getAnnualSavings(form, offer);
      const lowSavingsWarning =
        form.service_type === "internet" && isKoodoOrTelusInternet(offer) && annualSavings !== null && annualSavings < 100;
      return {
        ...offer,
        annualSavings,
        notPrimaryRecommendation: lowSavingsWarning,
        lowSavingsWarning,
        pickTypeKey: "internetPick"
      };
    });

  return picks.sort((a, b) => {
    if (a.notPrimaryRecommendation !== b.notPrimaryRecommendation) return a.notPrimaryRecommendation ? 1 : -1;
    return internetRecommendationScore(b, form) - internetRecommendationScore(a, form);
  });
}

function mobilePicks(form) {
  const offers = filterOutCurrentProvider(
    offerDatabase.filter(
      (offer) => {
        return (
          offer.service_type === "mobile" &&
          isRecommendableOffer(offer) &&
          !isKoodoPrepaid(offer) &&
          mobileMeetsServiceLevel(offer, form) &&
          !["Rogers", "Fido", "Virgin Plus"].includes(offer.provider)
        );
      }
    ),
    form.current_provider
  );
  const allowedProviders = isMainUrbanArea(form.city)
    ? ["public_mobile", "koodo", "telus", "bell_aliant", "eastlink"]
    : ["public_mobile", "telus", "bell_aliant"];

  return offers
    .filter((offer) => allowedProviders.includes(normalizeProviderName(offer.provider)))
    .sort((a, b) => mobileOfferSortScore(a, form) - mobileOfferSortScore(b, form))
    .map((offer, index) => ({
      ...offer,
      pickTypeKey: index === 0 ? "highQualityPick" : /Public Mobile/i.test(offer.provider) ? "lowestCostPick" : "manualPick"
    }));
}

function getLineCountNumber(value) {
  if (value === "5+") return 5;
  const count = Number(value);
  return Number.isFinite(count) && count >= 0 ? count : 0;
}

function calculateBundleMonthlyCost(internetOffer, mobileOffer, form) {
  const includesMobile = Boolean(form.bundle_includes_mobile);
  const mobileLineCount = includesMobile ? Math.max(1, getLineCountNumber(form.mobile_line_count)) : 0;
  const internetPrice =
    typeof internetOffer.bill_saver_target_price === "number" ? internetOffer.bill_saver_target_price : null;
  const mobileUnitPrice =
    typeof mobileOffer.bill_saver_target_price === "number" ? mobileOffer.bill_saver_target_price : null;
  const mobileTotal = includesMobile && mobileUnitPrice !== null ? mobileUnitPrice * mobileLineCount : null;
  const totalMonthlyCost = internetPrice !== null && mobileTotal !== null ? internetPrice + mobileTotal : null;

  return {
    internetPrice,
    mobileUnitPrice,
    mobileLineCount,
    mobileTotal,
    totalMonthlyCost
  };
}

function bundleProviderPreference(provider, form) {
  if (!form.bundle_includes_mobile) return 0;
  const lines = getLineCountNumber(form.mobile_line_count);
  const isPublicMobile = /Public Mobile/i.test(provider);
  const isKoodo = /Koodo/i.test(provider);
  const isTelus = /TELUS/i.test(provider);
  const isBellAliant = /Bell/i.test(provider);
  let preference = 0;

  if (lines === 1) {
    if (isPublicMobile) preference -= 8;
    if (isKoodo) preference -= 5;
    if (isTelus) preference -= 3;
  } else if (lines <= 4) {
    if (isKoodo) preference -= 8;
    if (isTelus) preference -= 7;
    if (isBellAliant) preference -= 5;
    if (isPublicMobile) preference += 6;
  } else {
    if (isTelus) preference -= 10;
    if (isKoodo) preference -= 8;
    if (isBellAliant) preference -= 6;
    if (isPublicMobile) preference += 12;
  }

  return preference;
}

function bellBundleDirections(form, internet) {
  if (isBell(form.current_provider)) return [];

  const bellBundles = offerDatabase.filter(
    (offer) => offer.service_type === "both" && isBell(offer) && isRecommendableOffer(offer)
  );

  if (form.bundle_includes_tv && form.bundle_includes_home_phone) {
    return bellBundles.filter((offer) => offer.bundle_services?.includes("tv") && offer.bundle_services?.includes("home_phone"));
  }

  if (form.bundle_includes_tv) {
    return bellBundles.filter((offer) => offer.bundle_services?.includes("tv") && !offer.bundle_services?.includes("home_phone"));
  }

  if (form.bundle_includes_home_phone) {
    const bellInternet = internet.find((offer) => isBell(offer));
    if (!bellInternet) return [];
    return [
      {
        ...bellInternet,
        offer_id: `bundle_${bellInternet.offer_id}_home_phone`,
        service_type: "both",
        plan_name: "Bell Aliant Internet + Home Phone",
        is_bundle: true,
        requires_manual_confirmation: true,
        display_price_requires_confirmation: true,
        bundle_services: ["internet", "home_phone"],
        pickTypeKey: "bundlePick"
      }
    ];
  }

  return [];
}

function bundleServiceMatchScore(offer, form) {
  let score = 0;
  const speed = speedRank(offer.speed_down);
  const supportsTv = offer.bundle_services?.includes("tv") || offer.manual_tv_direction;
  const supportsHomePhone = offer.bundle_services?.includes("home_phone") || offer.manual_home_phone_direction;
  const estimatedMonthlySaving = Math.max(0, monthlyPrice(form) - (calculationMonthlyPrice(offer) ?? monthlyPrice(form)));

  if (form.bundle_includes_tv) score += supportsTv ? -25 : 25;
  if (form.bundle_includes_home_phone) score += supportsHomePhone ? -25 : 25;
  if (!isBell(form.current_provider) && isBell(offer) && form.bundle_includes_tv && form.bundle_includes_home_phone) score -= 60;
  else if (!isBell(form.current_provider) && isBell(offer) && form.bundle_includes_tv) score -= 50;
  if (form.bundle_includes_tv) {
    if (/Purple Cow/i.test(offer.provider)) score -= 8;
    if (/Koodo/i.test(offer.provider)) score -= 5;
    if (/Eastlink/i.test(offer.provider)) score -= 3;
  }
  if (form.bundle_includes_home_phone && /Eastlink/i.test(offer.provider)) score -= 8;

  if (form.internet_usage_level === "heavy") {
    if (speed >= 900) score -= 20;
    else if (speed >= 300) score += 5;
    else score += 40;
  } else if (form.internet_usage_level === "standard") {
    if (speed >= 300) score -= 15;
    else if (speed < 100) score += 30;
  }

  if (offer.requires_manual_confirmation) score += 2;
  score -= Math.min(estimatedMonthlySaving, 80) * 0.5;
  return score;
}

function bundlePicks(form) {
  const internet = internetPicks(form);
  if (!form.bundle_includes_mobile) {
    const genericDirections = internet
      .filter((offer) => !(isBell(offer) && (form.bundle_includes_tv || form.bundle_includes_home_phone)))
      .map((offer) => {
        const hasManualAddOn = form.bundle_includes_tv || form.bundle_includes_home_phone;
        const keepPurpleCowInternetPriceVisible = /Purple Cow/i.test(offer.provider) && hasManualAddOn;
        return {
          ...offer,
          offer_id: `bundle_${offer.offer_id}`,
          service_type: "both",
          is_bundle: true,
          is_sensitive_price: keepPurpleCowInternetPriceVisible ? false : hasManualAddOn || offer.is_sensitive_price,
          is_public_price: keepPurpleCowInternetPriceVisible ? true : hasManualAddOn ? false : offer.is_public_price,
          display_price_requires_confirmation:
            keepPurpleCowInternetPriceVisible ? false : hasManualAddOn || offer.display_price_requires_confirmation,
          manual_tv_direction: Boolean(form.bundle_includes_tv),
          manual_home_phone_direction: Boolean(form.bundle_includes_home_phone),
          bundle_services: [
            "internet",
            ...(form.bundle_includes_tv ? ["tv"] : []),
            ...(form.bundle_includes_home_phone ? ["home_phone"] : [])
          ],
          requires_manual_confirmation: offer.requires_manual_confirmation || hasManualAddOn,
          calculation_price_available: !hasManualAddOn,
          bundle_sort_score: 0,
          pickTypeKey: "bundlePick"
        };
      })
      .map((offer) => ({ ...offer, bundle_sort_score: bundleServiceMatchScore(offer, form) }))
      .sort((a, b) => a.bundle_sort_score - b.bundle_sort_score);

    const preferredBellDirections = bellBundleDirections(form, internet).map((offer) => ({
      ...offer,
      pickTypeKey: "bundlePick",
      bundle_sort_score: bundleServiceMatchScore(offer, form) - 20
    }));

    return [...preferredBellDirections, ...genericDirections].filter(
      (offer, index, offers) => offers.findIndex((candidate) => candidate.offer_id === offer.offer_id) === index
    ).sort((a, b) => a.bundle_sort_score - b.bundle_sort_score);
  }

  const mobile = mobilePicks(form);
  const pairOrder = internet.flatMap((_, internetIndex) => mobile.map((__, mobileIndex) => [internetIndex, mobileIndex]));

  return pairOrder
    .map(([internetIndex, mobileIndex]) => {
      const internetOffer = internet[internetIndex];
      const mobileOffer = mobile[mobileIndex];
      if (!internetOffer || !mobileOffer) return null;

      const bundleCost = calculateBundleMonthlyCost(internetOffer, mobileOffer, form);
      const lineCountRequiresManualReview = form.mobile_line_count === "5+";

      return {
        ...internetOffer,
        offer_id: `bundle_${internetOffer.offer_id}_${mobileOffer.offer_id}`,
        provider: `${displayProviderName(internetOffer.provider)} + ${displayProviderName(mobileOffer.provider)}`,
        service_type: "both",
        plan_name: `${displayPlanName(internetOffer, translations.en)} + ${displayPlanName(mobileOffer, translations.en)}`,
        mobile_provider: mobileOffer.provider,
        mobile_data: mobileOffer.mobile_data,
        bill_saver_target_price: bundleCost.totalMonthlyCost,
        internet_monthly_price: bundleCost.internetPrice,
        mobile_unit_price: bundleCost.mobileUnitPrice,
        mobile_line_count: form.mobile_line_count,
        mobile_line_count_number: bundleCost.mobileLineCount,
        mobile_total: bundleCost.mobileTotal,
        bundle_total_monthly_cost: bundleCost.totalMonthlyCost,
        official_regular_price: null,
        official_promo_price: null,
        is_bundle: true,
        is_sensitive_price:
          isManualPrice(internetOffer) ||
          isManualPrice(mobileOffer) ||
          form.bundle_includes_tv ||
          form.bundle_includes_home_phone ||
          lineCountRequiresManualReview,
        is_public_price:
          !form.bundle_includes_tv &&
          !form.bundle_includes_home_phone &&
          !lineCountRequiresManualReview &&
          internetOffer.is_public_price &&
          mobileOffer.is_public_price,
        display_price_requires_confirmation:
          form.bundle_includes_tv ||
          form.bundle_includes_home_phone ||
          internetOffer.display_price_requires_confirmation ||
          mobileOffer.display_price_requires_confirmation,
        manual_tv_direction: Boolean(form.bundle_includes_tv),
        manual_home_phone_direction: Boolean(form.bundle_includes_home_phone),
        bundle_services: [
          "internet",
          "mobile",
          ...(form.bundle_includes_tv ? ["tv"] : []),
          ...(form.bundle_includes_home_phone ? ["home_phone"] : [])
        ],
        requires_manual_confirmation:
          internetOffer.requires_manual_confirmation ||
          mobileOffer.requires_manual_confirmation ||
          lineCountRequiresManualReview ||
          form.bundle_includes_tv ||
          form.bundle_includes_home_phone,
        calculation_price_available:
          !lineCountRequiresManualReview && !form.bundle_includes_tv && !form.bundle_includes_home_phone,
        caution: `${internetOffer.caution || ""} ${mobileOffer.caution || ""}`.trim(),
        bundle_sort_score:
          bundleProviderPreference(mobileOffer.provider, form) +
          (typeof bundleCost.totalMonthlyCost === "number" ? bundleCost.totalMonthlyCost / 1000 : 1),
        pickTypeKey: "bundlePick"
      };
    })
    .filter(Boolean)
    .map((offer) => ({ ...offer, bundle_sort_score: offer.bundle_sort_score + bundleServiceMatchScore(offer, form) }))
    .sort((a, b) => a.bundle_sort_score - b.bundle_sort_score);
}

function getRecommendations(form) {
  const visible =
    form.service_type === "internet"
      ? pickVisibleRecommendations(internetPicks(form), form)
      : form.service_type === "mobile"
        ? pickVisibleRecommendations(mobilePicks(form), form)
        : pickVisibleRecommendations(bundlePicks(form), form);
  return visible.map((offer, index) => ({ ...offer, rank: index + 1 }));
}

function calculateScore(form, offers) {
  const current = monthlyPrice(form);
  const targets = relevantTargets(offers, form);
  if (!current || !targets.length) return 70;

  const monthlySaving = Math.max(0, current - Math.min(...targets));
  const savingsRatio = monthlySaving / current;

  if (savingsRatio >= 0.4) return 55;
  if (savingsRatio >= 0.3) return 62;
  if (savingsRatio >= 0.2) return 70;
  if (savingsRatio >= 0.1) return 80;
  if (savingsRatio >= 0.05) return 88;
  return 94;
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

function payloadOfferName(offer, language) {
  const localized = offer.serviceName || offer.service_name;
  if (localized && typeof localized === "object") {
    const key = language === "en" ? "en" : language === "zhHant" ? "zh-TW" : "zh";
    if (localized[key]) return localized[key];
  }
  return offer.plan_name || offer.display_name || offer.name || "";
}

function buildSheetPayload({ form, language, source, lead, selectedOffer, recommendations }) {
  const serviceType = form.service_type || "";
  const sortedRecommendations = Array.isArray(recommendations) ? recommendations : [];
  const topRecommendation = sortedRecommendations[0] || {};
  const selected = selectedOffer || {};
  const selectedMonthlyPrice = selected.monthlyPrice ?? "";
  const selectedTotalMonthlyCost = selected.totalMonthlyCost ?? "";
  const selectedMonthlySavings = selected.estimatedMonthlySavings ?? "";
  const selectedAnnualSavings = selected.estimatedAnnualSavings ?? "";
  return {
    // Legacy fields retained for compatibility with the existing Sheet.
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
    current_mobile_data:
      serviceType === "mobile" || (serviceType === "both" && form.bundle_includes_mobile) ? form.current_mobile_data : "",
    bundle_includes_internet: serviceType === "both" ? true : serviceType === "internet",
    bundle_includes_mobile: serviceType === "both" ? Boolean(form.bundle_includes_mobile) : serviceType === "mobile",
    bundle_includes_tv: serviceType === "both" ? Boolean(form.bundle_includes_tv) : false,
    bundle_includes_home_phone: serviceType === "both" ? Boolean(form.bundle_includes_home_phone) : false,
    mobile_line_count: serviceType === "both" ? (form.bundle_includes_mobile ? form.mobile_line_count : "0") : "",
    mobile_data_usage:
      serviceType === "mobile" || (serviceType === "both" && form.bundle_includes_mobile) ? form.current_mobile_data : "",
    has_tv_service: serviceType === "both" && form.bundle_includes_tv ? "yes" : "no",
    has_home_phone: serviceType === "both" && form.bundle_includes_home_phone ? "yes" : "no",
    plan_details: JSON.stringify({
      internet_usage_level: form.internet_usage_level,
      selected_speed: form.current_speed,
      selected_mobile_data: form.current_mobile_data,
      bundle_includes_internet: form.bundle_includes_internet,
      bundle_includes_mobile: form.bundle_includes_mobile,
      bundle_includes_tv: form.bundle_includes_tv,
      bundle_includes_home_phone: form.bundle_includes_home_phone,
      mobile_line_count: form.bundle_includes_mobile ? form.mobile_line_count : "0",
      has_tv_service: form.bundle_includes_tv ? "yes" : "no",
      has_home_phone: form.bundle_includes_home_phone ? "yes" : "no"
    }),
    willing_to_switch: "",
    notes: "",

    // Expanded lead and recommendation tracking fields.
    submitted_at: new Date().toISOString(),
    page_version: "bill_saver_pei_v1",
    lead_source: "bill_saver_result",
    click_source: selected.clickSource || "general_cta",
    customer_name: lead.name || "",
    customer_phone: lead.phone || "",
    customer_email: lead.email || "",
    preferred_contact_method: lead.preferred_contact || "",
    best_contact_time: "",
    customer_note: "",
    current_monthly_bill: form.monthly_price || "",
    region: "PEI",
    city_or_area: form.city || "",
    postal_code_or_address: lead.wechat || form.postal_code || "",
    internet_usage: form.internet_usage_level || "",
    current_internet_speed_mbps: form.current_speed || "",
    internet_required_speed_mbps:
      serviceType === "internet" || serviceType === "both" ? getRequiredInternetSpeedMbps(form) : "",
    current_mobile_data_gb: form.current_mobile_data || "",
    mobile_required_data_gb:
      serviceType === "mobile" || (serviceType === "both" && form.bundle_includes_mobile) ? getRequiredMobileDataGB(form) : "",
    selected_offer_id: selected.offerId || "",
    selected_offer_provider: selected.provider || "",
    selected_offer_category: selected.category || "",
    selected_offer_service_type: selected.serviceType || "",
    selected_offer_name: selected.serviceName || "",
    selected_offer_display_price: selected.displayPrice || "",
    selected_offer_monthly_price: selectedMonthlyPrice,
    selected_offer_total_monthly_cost: selectedTotalMonthlyCost,
    selected_offer_estimated_monthly_savings: selectedMonthlySavings,
    selected_offer_estimated_annual_savings: selectedAnnualSavings,
    selected_offer_recommendation_type: selected.recommendationType || "",
    selected_offer_rank: selected.rank ?? "",
    selected_offer_requires_manual_review: Boolean(selected.requiresManualReview),
    selected_offer_price_hidden: Boolean(selected.displayPriceRequiresConfirmation),
    selected_offer_tags: selected.tags || "",
    all_recommendation_ids: sortedRecommendations.map((offer) => offer.offer_id).filter(Boolean).join(", "),
    all_recommendation_names: sortedRecommendations.map((offer) => payloadOfferName(offer, language)).filter(Boolean).join(" | "),
    all_recommendation_providers: sortedRecommendations.map((offer) => offer.provider).filter(Boolean).join(" | "),
    all_recommendation_count: sortedRecommendations.length,
    top_recommendation_id: topRecommendation.offer_id || "",
    top_recommendation_name: payloadOfferName(topRecommendation, language),
    top_recommendation_provider: topRecommendation.provider || "",
    top_recommendation_annual_savings: topRecommendation.annualSavings ?? getAnnualSavings(form, topRecommendation) ?? "",
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    landing_page: typeof window !== "undefined" ? window.location.href : "",
    utm_source: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") || "" : "",
    utm_medium: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_medium") || "" : "",
    utm_campaign: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_campaign") || "" : ""
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
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [resultOpen, setResultOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [peiReviewOpen, setPeiReviewOpen] = useState(false);
  const [showUsageGuidance, setShowUsageGuidance] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sheetError, setSheetError] = useState("");
  const [missingFields, setMissingFields] = useState([]);
  const t = translations[language];
  const isBundle = form.service_type === "both";
  const showInternet = form.service_type === "internet" || isBundle;
  const showMobile = form.service_type === "mobile" || (isBundle && form.bundle_includes_mobile);
  const recommendations = useMemo(() => getRecommendations(form), [form]);
  const score = useMemo(() => calculateScore(form, recommendations), [form, recommendations]);
  const yearlySavings = useMemo(() => yearlySavingsValue(recommendations, form), [recommendations, form]);
  const savingsRequiresManualReview =
    recommendations.length > 0 && recommendations.every((offer) => calculationMonthlyPrice(offer) === null);
  const resultTrust = resultTrustContent(language);
  const currentStep = leadOpen ? 3 : resultOpen ? 2 : 1;
  const publicMobileReview = publicMobileLocalReviewContent(language);
  const usageGuidance = usageGuidanceContent(language);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setResultOpen(false);
        setLeadOpen(false);
        setPeiReviewOpen(false);
        setShowUsageGuidance(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const shouldLockBodyScroll = resultOpen || leadOpen || peiReviewOpen || showUsageGuidance || successOpen;

  useEffect(() => {
    if (!shouldLockBodyScroll) return;

    const scrollY = window.scrollY;
    const originalStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      document.body.style.overflow = originalStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [shouldLockBodyScroll]);

  function update(field, value) {
    setForm((current) => {
      if (field === "service_type" && value === "both") {
        return {
          ...current,
          service_type: value,
          bundle_includes_internet: true,
          bundle_includes_mobile: false,
          bundle_includes_tv: false,
          bundle_includes_home_phone: false,
          current_mobile_data: "",
          mobile_line_count: "0",
          has_tv_service: "no",
          has_home_phone: "no"
        };
      }
      if (field === "internet_usage_level") {
        return { ...current, internet_usage_level: value, current_speed: speedForUsage(value) };
      }
      return { ...current, [field]: value };
    });
    setMissingFields((current) => current.filter((item) => item !== field));
    if ([t.validationRequired, t.validationMobileLines, t.validationMobileLineMinimum, t.validationMobileData].includes(sheetError)) {
      setSheetError("");
    }
  }

  function toggleBundleMobile() {
    setForm((current) => {
      const next = !current.bundle_includes_mobile;
      return {
        ...current,
        bundle_includes_mobile: next,
        mobile_line_count: next ? "" : "0",
        current_mobile_data: ""
      };
    });
    setMissingFields((current) => current.filter((item) => item !== "mobile_line_count" && item !== "current_mobile_data"));
  }

  function toggleBundleTv() {
    setForm((current) => {
      const next = !current.bundle_includes_tv;
      return { ...current, bundle_includes_tv: next, has_tv_service: next ? "yes" : "no" };
    });
  }

  function toggleBundleHomePhone() {
    setForm((current) => {
      const next = !current.bundle_includes_home_phone;
      return { ...current, bundle_includes_home_phone: next, has_home_phone: next ? "yes" : "no" };
    });
  }

  function updateLead(field, value) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  function openLeadFromResult() {
    setSelectedOffer({
      offerId: "",
      provider: "",
      category: "",
      serviceType: "",
      serviceName: "General Bill Saver Review",
      displayPrice: "",
      monthlyPrice: "",
      totalMonthlyCost: "",
      estimatedMonthlySavings: "",
      estimatedAnnualSavings: "",
      recommendationType: "general_review",
      rank: "",
      requiresManualReview: true,
      displayPriceRequiresConfirmation: true,
      tags: "",
      clickSource: "general_cta"
    });
    setResultOpen(false);
    setLeadOpen(true);
  }

  function openLeadForOffer(offer) {
    const monthlyCost = calculationMonthlyPrice(offer);
    const monthlySavings =
      monthlyCost === null ? "" : Math.max(0, Math.round(monthlyPrice(form) - monthlyCost));
    const tags = offerBadges(offer, language, form)
      .map((badge, index) => displayBadge(badge, offer, index, language).label)
      .filter(Boolean)
      .join(", ");
    setSelectedOffer({
      offerId: offer.offer_id || "",
      provider: displayProviderName(offer.provider || ""),
      category: offer.category || offer.service_type || "",
      serviceType: offer.service_type || "",
      serviceName: displayPlanName(offer, t),
      displayPrice: displayPrice(offer, t, language),
      monthlyPrice: monthlyCost ?? "",
      totalMonthlyCost: offer.bundle_total_monthly_cost ?? monthlyCost ?? "",
      estimatedMonthlySavings: monthlySavings,
      estimatedAnnualSavings: offer.annualSavings ?? (monthlySavings === "" ? "" : monthlySavings * 12),
      recommendationType: offer.recommendationType || "",
      rank: offer.rank ?? "",
      requiresManualReview: Boolean(offer.requires_manual_confirmation),
      displayPriceRequiresConfirmation: Boolean(
        offer.display_price_requires_confirmation || isManualPrice(offer)
      ),
      tags,
      clickSource: "offer_card_cta"
    });
    setResultOpen(false);
    setLeadOpen(true);
  }

  function returnHomeAfterSuccess() {
    setSuccessOpen(false);
    setForm(initialForm);
    setLead(initialLead);
    setSelectedOffer(null);
    setMissingFields([]);
    setSheetError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyPublicMobileReferralCode() {
    try {
      await navigator.clipboard.writeText("P8S6NX");
    } catch {
      // Clipboard access can be blocked by the browser; the code remains visible for manual copy.
    }
  }

  function submitInitial(event) {
    event.preventDefault();
    setSheetError("");
    const requiredFields = ["current_provider", "monthly_price", "city"];
    if (showInternet) requiredFields.push("internet_usage_level");
    if (showMobile) requiredFields.push("current_mobile_data");
    if (isBundle && form.bundle_includes_mobile) requiredFields.push("mobile_line_count");
    const missing = requiredFields.filter((field) => !String(form[field] || "").trim());
    if (missing.length) {
      setMissingFields(missing);
      setSheetError(
        missing.includes("mobile_line_count")
          ? t.validationMobileLines
          : missing.includes("current_mobile_data") && isBundle
            ? t.validationMobileData
            : t.validationRequired
      );
      return;
    }
    if (isBundle && form.bundle_includes_mobile && getLineCountNumber(form.mobile_line_count) < 1) {
      setMissingFields(["mobile_line_count"]);
      setSheetError(t.validationMobileLineMinimum);
      return;
    }
    setMissingFields([]);
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
          lead,
          selectedOffer,
          recommendations
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
    <main className="page-shell billSaverPage" lang={language === "en" ? "en" : language === "zhHant" ? "zh-Hant" : "zh-CN"}>
      <section className="hero heroSection">
        <div className="heroInner">
          <div className="heroTopBar">
            <div className="heroBrandText" aria-label="Bill Saver PEI">
              <div className="heroBrandIcon" aria-hidden="true">
                <span className="heroBrandSignal" />
                <span className="heroBrandPaper" />
                <span className="heroBrandDollar">$</span>
              </div>
              <div className="heroBrandWords">
                <div className="heroBrandMain">
                  <span>Bill Saver</span>
                  <strong>PEI</strong>
                </div>
              </div>
            </div>
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
          </div>

          <div className="heroContent">
            <h1 className="heroTitle">{t.heroHeadline}</h1>
            <p className="heroSubtitle">{t.heroSubtitle}</p>
            <div className="stepProgress" aria-label={t.heroProgressSteps.join(" → ")}>
              <div className="stepTrack" aria-hidden="true">
                <div
                  className="stepTrackActive"
                  style={{ width: `${((currentStep - 1) / (t.heroProgressSteps.length - 1)) * 100}%` }}
                />
              </div>
              {t.heroProgressSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isComplete = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                  <div className={`stepNode stepNode${stepNumber} ${isComplete ? "done" : ""} ${isCurrent ? "active" : ""}`} key={step}>
                    <span className="stepCircle">{isComplete ? "✓" : stepNumber}</span>
                    <span className="stepLabel">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="workspace single-column">
        <form className="panel form-panel" onSubmit={submitInitial} noValidate>
          {sheetError && <div className="error">{sheetError}</div>}

          <div className="field bill-type-field">
            <div className="service-card-grid bill-type-grid">
              {serviceOrder.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={form.service_type === value ? "service-card bill-type-card active" : "service-card bill-type-card"}
                  onClick={() => update("service_type", value)}
                >
                  <ServiceTypeIcon type={value} />
                  <span className="bill-type-text">
                    <span className="service-card-title bill-type-title">{t.serviceCards[value]}</span>
                    <span className="bill-type-sub">{serviceTypeSubtitle(language, value)}</span>
                  </span>
                  {form.service_type === value && <span className="service-card-check bill-type-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {showInternet ? (
            <div className={`form-split form-grid-top ${isBundle ? "bundle-form-split" : "internet-form-split"}`}>
              <div className="form-split-left form-column">
                {isBundle && (
                  <div className="bundle-services-block">
                    <h3 className="form-side-title">{t.bundleServicesTitle}</h3>
                    <div className="bundle-service-grid">
                      <button type="button" className="bundle-service-chip active disabled" disabled>
                        {t.bundleInternet}
                      </button>
                      <button
                        type="button"
                        className={form.bundle_includes_mobile ? "bundle-service-chip active" : "bundle-service-chip"}
                        onClick={toggleBundleMobile}
                      >
                        {t.bundleMobile}
                      </button>
                      <button
                        type="button"
                        className={form.bundle_includes_tv ? "bundle-service-chip active" : "bundle-service-chip"}
                        onClick={toggleBundleTv}
                      >
                        {t.bundleTv}
                      </button>
                      <button
                        type="button"
                        className={form.bundle_includes_home_phone ? "bundle-service-chip active" : "bundle-service-chip"}
                        onClick={toggleBundleHomePhone}
                      >
                        {t.bundleHomePhone}
                      </button>
                    </div>
                  </div>
                )}

                <div className={`field ${isBundle ? "bundle-usage-group" : ""} ${missingFields.includes("internet_usage_level") ? "missing" : ""}`.trim()}>
                  <span>{t.internetUsageLevel}</span>
                  <div className="usage-card-grid compact">
                    {usageLevels.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        className={`${form.internet_usage_level === item.value ? "usage-card active" : "usage-card"} ${isBundle ? "bundle-usage-card" : "internet-usage-card"}`}
                        onClick={() => update("internet_usage_level", item.value)}
                      >
                        <span className="usage-card-copy">
                          <strong>{t.usageCards[item.value].title}</strong>
                          <span>{t.usageCards[item.value].description}</span>
                        </span>
                        <span className="usage-card-speed">
                          <small>{language === "en" ? "Recommended" : language === "zhHant" ? "建議頻寬" : "推荐带宽"}</small>
                          <strong>{internetUsageSpeeds[item.value]}</strong>
                        </span>
                        {form.internet_usage_level === item.value && <span className="usage-card-check" aria-hidden="true">✓</span>}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="usageHelpLink" onClick={() => setShowUsageGuidance(true)}>
                    <span className="usageHelpIcon">i</span>
                    <span className="usageHelpMuted">{usageGuidance.helpMuted}</span>
                    <span className="usageHelpAction">{usageGuidance.helpAction}</span>
                  </button>
                </div>

                {isBundle && form.bundle_includes_mobile && (
                  <div className={`field usage-section bundle-usage-group ${missingFields.includes("current_mobile_data") ? "missing" : ""}`.trim()}>
                    <span>{t.mobileDataUsageTitle}</span>
                    <div className="usage-card-grid compact">
                      {mobileDataUsageLevels.map((item) => (
                        <MobileUsageCard
                          key={item.value}
                          item={item}
                          content={t.mobileDataUsageCards[item.value]}
                          active={form.current_mobile_data === item.value}
                          onClick={() => update("current_mobile_data", item.value)}
                          bundle
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>

              <div className="form-split-right form-column">
                <h3 className="form-side-title">
                  {form.service_type === "internet" ? t.billInfoInternet : t.billInfoBoth}
                </h3>
                <Field icon={<LineIcon name="building" size={22} strokeWidth={2.2} />} label={form.service_type === "internet" ? t.providerInternet : t.providerBoth} className={missingFields.includes("current_provider") ? "missing" : ""}>
                  <Select value={form.current_provider} onChange={(value) => update("current_provider", value)}>
                    <option value="" disabled>
                      {t.providerPlaceholder}
                    </option>
                    {providerOptionsByService[form.service_type].map((provider) => (
                      <option key={provider} value={provider}>
                        {optionLabel(t, provider)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field icon="$" unit={t.monthlyUnit} label={form.service_type === "internet" ? t.monthlyPriceInternet : t.monthlyPriceBoth} className={missingFields.includes("monthly_price") ? "missing" : ""}>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.monthly_price}
                    onChange={(event) => update("monthly_price", event.target.value)}
                    placeholder={monthlyPlaceholder(t, form.service_type)}
                    required
                  />
                </Field>

                {isBundle && form.bundle_includes_mobile && (
                    <Field icon="#" label={t.mobileLineCount} className={missingFields.includes("mobile_line_count") ? "missing compact-field" : "compact-field"}>
                      <Select value={form.mobile_line_count} onChange={(value) => update("mobile_line_count", value)}>
                        <option value="" disabled>
                          {t.mobileLinePlaceholder}
                        </option>
                        {["1", "2", "3", "4", "5+"].map((value, index) => (
                          <option key={value} value={value}>
                            {t.mobileLineOptions[index]}
                          </option>
                        ))}
                      </Select>
                    </Field>
                )}

                <Field icon={<LineIcon name="map-pin" size={22} strokeWidth={2.2} />} label={t.city} className={missingFields.includes("city") ? "missing" : ""}>
                  <Select value={form.city} onChange={(value) => update("city", value)}>
                    <option value="" disabled>
                      {t.areaPlaceholder}
                    </option>
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
            <div className="form-split form-grid-top mobile-form-split">
              <div className="form-split-left form-column">
                <div className={`field ${missingFields.includes("current_mobile_data") ? "missing" : ""}`.trim()}>
                  <span>{t.mobileDataUsageTitle}</span>
                  <div className="usage-card-grid compact">
                    {mobileDataUsageLevels.map((item) => (
                      <MobileUsageCard
                        key={item.value}
                        item={item}
                        content={t.mobileDataUsageCards[item.value]}
                        active={form.current_mobile_data === item.value}
                        onClick={() => update("current_mobile_data", item.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-split-right form-column">
                <h3 className="form-side-title">{t.billInfoMobile}</h3>
                <Field icon={<LineIcon name="building" size={22} strokeWidth={2.2} />} label={t.providerMobile} className={missingFields.includes("current_provider") ? "missing" : ""}>
                  <Select value={form.current_provider} onChange={(value) => update("current_provider", value)}>
                    <option value="" disabled>
                      {t.providerPlaceholder}
                    </option>
                    {providerOptionsByService[form.service_type].map((provider) => (
                      <option key={provider} value={provider}>
                        {optionLabel(t, provider)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field icon="$" unit={t.monthlyUnit} label={t.monthlyPriceMobile} className={missingFields.includes("monthly_price") ? "missing" : ""}>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.monthly_price}
                    onChange={(event) => update("monthly_price", event.target.value)}
                    placeholder={monthlyPlaceholder(t, form.service_type)}
                    required
                  />
                </Field>

                <Field icon={<LineIcon name="map-pin" size={22} strokeWidth={2.2} />} label={t.city} className={missingFields.includes("city") ? "missing" : ""}>
                  <Select value={form.city} onChange={(value) => update("city", value)}>
                    <option value="" disabled>
                      {t.areaPlaceholder}
                    </option>
                    {areaOptions.map((area) => (
                      <option key={area.value} value={area.value}>
                        {area.labelKey ? t.options[area.labelKey] : area.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            </div>
          )}

          <button className="submit-button" type="submit">
            <span>{t.submit}</span>
            <span aria-hidden="true">›</span>
          </button>
          <p className="form-safe-note">
            <span aria-hidden="true">🔒</span>
            {t.formSafetyNote}
          </p>
        </form>
      </section>

      {resultOpen && (
        <div className="modal-backdrop result-modal-backdrop" role="presentation" onMouseDown={() => setResultOpen(false)}>
          <div
            className="modal panel result-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t.billScore}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="section-heading result-modal-header">
              <button className="modal-close" type="button" onClick={() => setResultOpen(false)} aria-label={t.close}>
                ×
              </button>
              <ResultStepProgress language={language} currentStep={2} />
              <span className="result-modal-header-spacer" aria-hidden="true" />
            </div>

            <div className="result-modal-body" onTouchMove={(event) => event.stopPropagation()}>
              <div className="result-stack">
              <section className={`resultSummaryGrid ${scoreTone(score)}`}>
                <div className="resultSummaryCard">
                  <div className="summaryIcon scoreIcon" aria-hidden="true">
                    <span className="scoreNeedle" />
                  </div>
                  <div className="summaryText">
                    <div className="summaryTitle">{t.billScore}</div>
                    <div className="summarySub">{scoreStatusText(score, language)}</div>
                  </div>
                  <div className="summaryValue">
                    <strong>{score}</strong>
                    <span>/100</span>
                  </div>
                </div>

                <div className="resultSummaryCard">
                  <div className="summaryIcon savingsIcon" aria-hidden="true">$</div>
                  <div className="summaryText">
                    <div className="summaryTitle">{t.estimatedYearlySavings}</div>
                    <div className="summarySub">{savingsHelperText(yearlySavings, t, language)}</div>
                  </div>
                  <div className="summaryValue savingsValue">
                    {savingsRequiresManualReview ? (
                      <strong className="manualSummaryValue">
                        {textByLanguage(language, "人工确认", "人工確認", "Manual review")}
                      </strong>
                    ) : (
                      <>
                        <span>{language === "en" ? "~" : language === "zhHant" ? "約" : "约"}</span>
                        <strong>${yearlySavings}</strong>
                        <em>{language === "en" ? "/ yr" : "/ 年"}</em>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {form.service_type !== "both" && !isMainUrbanArea(form.city) && showInternet && (
                <div className="rural-recommendation-note">{ruralRecommendationNote(language)}</div>
              )}

              <section className="result-trust-section">
                <div className="result-trust-intro">
                  <button type="button" onClick={openLeadFromResult}>{resultTrust.action}</button>
                  <strong>{resultTrust.title}</strong>
                  <p>{resultTrust.body}</p>
                </div>
                <div className="result-trust-why">
                  <strong>{resultTrust.whyTitle}</strong>
                  <ul>
                    {resultTrust.items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
                  </ul>
                </div>
              </section>

              <section className="recommendation-section">
                <div className="recommendation-list-heading">
                  <div>
                    <h2>{textByLanguage(language, "参考可选方案", "參考可選方案", "Available options")}</h2>
                    <p>
                      {textByLanguage(
                        language,
                        "已按节省空间、服务匹配度和人工确认需求排序",
                        "已按節省空間、服務匹配度和人工確認需求排序",
                        "Sorted by savings, service fit, and manual review needs"
                      )}
                    </p>
                  </div>
                  <strong>
                    {textByLanguage(
                      language,
                      `共找到 ${recommendations.length} 个参考方案`,
                      `共找到 ${recommendations.length} 個參考方案`,
                      `${recommendations.length} available options found`
                    )}
                  </strong>
                </div>
                <div className="plan-list">
                  {recommendations.length === 0 && <div className="rural-recommendation-note">{noAlternativeMessage(language)}</div>}
                  {recommendations.map((offer, recommendationIndex) => {
                    const badges = offerBadges(offer, language, form);
                    const priceNote = priceNoteText(offer, language);
                    const includesInternet = offer.service_type === "internet" || offer.service_type === "both";
                    const includesMobile = offer.service_type === "mobile" || (offer.service_type === "both" && offer.mobile_data);
                    const referralLabels = publicMobileButtonLabels(language);
                    const ctaContent = premiumCtaContent(language, offer);
                    const bundleCosts = bundleCostRows(offer, language);

                    return (
                      <article className="plan-card" key={offer.offer_id}>
                        <div className="plan-card-overview">
                          <div className="plan-provider">
                            <span className="provider-mark" aria-hidden="true">{providerMark(offer.provider)}</span>
                            <div>
                              <strong>{displayProviderName(offer.provider)}</strong>
                              <span className={`recommendation-tag ${recommendationTagTone(offer, recommendationIndex)}`}>
                                {recommendationTag(offer, recommendationIndex, language)}
                              </span>
                            </div>
                          </div>
                          <div className="plan-field">
                            <span>{t.service}</span>
                            <strong>{displayPlanName(offer, t)}</strong>
                          </div>
                          <div className="plan-field">
                            <span>{includesMobile && !includesInternet ? fieldLabel(language, "data") : fieldLabel(language, "speed")}</span>
                            <strong>{includesMobile && !includesInternet ? dataText(offer, language) : speedText(offer, language)}</strong>
                          </div>
                          <div className="plan-price-area">
                            <span>{t.price}</span>
                            <strong>{displayPrice(offer, t, language)}</strong>
                            <div className="badge-row">
                              {badges.map((badge, index) => {
                                const visibleBadge = displayBadge(badge, offer, index, language);
                                return <span key={badgeKey(visibleBadge, index)}>{visibleBadge.label}</span>;
                              })}
                            </div>
                            <p>{localizedGoodFor(offer, t, language)}</p>
                          </div>
                          <div className="plan-conversion">
                            <span>{t.savings}</span>
                            <strong>{savingsText(offer, form, t, language)}</strong>
                            <button type="button" onClick={() => openLeadForOffer(offer)}>{providerCtaLabel(offer, language)}</button>
                          </div>
                        </div>
                        <p>
                          <b>{t.providerLabel}</b> {displayProviderName(offer.provider)}
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
                        {bundleCosts.length > 0 && (
                          <div className="bundle-cost-breakdown">
                            {bundleCosts.map((row) => (
                              <p key={row.label}>
                                <b>{row.label}</b> {row.value}
                              </p>
                            ))}
                          </div>
                        )}
                        <div className="price-with-badges">
                          <p>
                            <b>{t.price}</b> {displayPrice(offer, t, language)}
                          </p>
                          {badges.length > 0 && (
                            <div className="badge-row price-badges">
                              {badges.map((badge, index) => {
                                const visibleBadge = displayBadge(badge, offer, index, language);

                                return (
                                  <span className={visibleBadge.subLabel ? "badge-with-sub-label" : ""} key={badgeKey(visibleBadge, index)}>
                                    <span>{visibleBadge.label}</span>
                                    {visibleBadge.subLabel && <small>{visibleBadge.subLabel}</small>}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        {priceNote && (
                          <p>
                            <b>{fieldLabel(language, "priceNote")}</b> {priceNote}
                          </p>
                        )}
                        {hasPublicMobileComponent(offer) && (
                          <div className="referral-box">
                            <p>{publicMobileReferralText(language)}</p>
                            <div className="referral-actions">
                              <button type="button" onClick={copyPublicMobileReferralCode}>
                                {referralLabels.copy}
                              </button>
                              <a href="https://publicmobile.ca/en/pe/plans?referral=P8S6NX" target="_blank" rel="noreferrer">
                                {referralLabels.open}
                              </a>
                            </div>
                          </div>
                        )}
                        {hasPublicMobileComponent(offer) && (
                          <div className="local-review-entry">
                            <div>
                              <strong>{publicMobileReview.entryTitle}</strong>
                              <p>{publicMobileReview.entryText}</p>
                            </div>
                            <button type="button" onClick={() => setPeiReviewOpen(true)}>
                              {publicMobileReview.entryLink}
                            </button>
                          </div>
                        )}
                        <p>
                          <b>{t.savings}</b> {savingsText(offer, form, t, language)}
                        </p>
                        <p>
                          <b>{t.goodFor}</b> {localizedGoodFor(offer, t, language)}
                        </p>
                        <p className="plan-note">
                          <b>{t.note}</b> {localizedNote(offer, t, language, form)}
                        </p>
                        {false && isPremiumProvider(offer) && (
                          <div className="premium-cta-wrap">
                            <div className="premium-cta-main">
                              <button className="premium-cta" type="button" onClick={() => openLeadForOffer(offer)}>
                                {ctaContent.buttonLabel || t.bestPrice}
                              </button>
                              <div>
                                <strong>{ctaContent.title}</strong>
                                <p>{ctaContent.body}</p>
                              </div>
                            </div>
                            <div className="premium-why-card">
                              <strong>{ctaContent.whyTitle}</strong>
                              <ul>
                                {ctaContent.items.map((item) => (
                                  <li key={item}>✓ {item}</li>
                                ))}
                              </ul>
                            </div>
                            <small>{ctaContent.disclaimer}</small>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="caution-box result-caution-box">
                <div className="result-caution-heading">
                  <h3>{t.cautionTitle}</h3>
                </div>
                <ul>
                  {resultCautionItems(language).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                  {!isMainUrbanArea(form.city) && showMobile && <li>{bellAliantDisplayText(t.areaCaution)}</li>}
                </ul>
                <div className="result-caution-action">
                  <div>
                    <strong>
                      {textByLanguage(language, "需要进一步确认？", "需要進一步確認？", "Need a closer review?")}
                    </strong>
                    <span>
                      {textByLanguage(
                        language,
                        "Bill Saver 可以免费帮你核对当前可用价格、资格和安装方式。",
                        "Bill Saver 可以免費幫你核對目前可用價格、資格和安裝方式。",
                        "Bill Saver can help confirm current pricing, eligibility, and installation options at no cost."
                      )}
                    </span>
                  </div>
                  <button type="button" onClick={openLeadFromResult}>
                    {textByLanguage(language, "帮我人工确认方案", "幫我人工確認方案", "Help confirm my options")}
                  </button>
                </div>
              </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {peiReviewOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPeiReviewOpen(false)}>
          <div className="modal panel pei-review-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <div className="section-heading">
              <div>
                <h2>{publicMobileReview.title}</h2>
              </div>
              <button className="modal-close" type="button" onClick={() => setPeiReviewOpen(false)} aria-label={t.close}>
                ×
              </button>
            </div>

            <div className="pei-review-stack">
              {publicMobileReview.sections.map((section) => (
                <section className="pei-review-section" key={section.heading}>
                  <h3>
                    <span aria-hidden="true">{section.icon}</span>
                    {section.heading}
                  </h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
              <small className="public-mobile-source-note modal-source-note">{publicMobileSourceNote(language)}</small>
            </div>
          </div>
        </div>
      )}

      {leadOpen && (
        <div className="modal-backdrop lead-modal-backdrop" role="presentation" onMouseDown={() => setLeadOpen(false)}>
          <form className="modal panel lead-modal" onSubmit={submitLead} onMouseDown={(event) => event.stopPropagation()}>
            <div className="lead-modal-header">
              <button className="modal-close" type="button" onClick={() => setLeadOpen(false)} aria-label={t.close}>
                ×
              </button>
              <ResultStepProgress language={language} currentStep={3} />
              <span className="lead-modal-header-spacer" aria-hidden="true" />
            </div>

            <div className="lead-modal-body">
              <div className="lead-modal-intro">
                <span className="lead-modal-kicker">
                  {textByLanguage(language, "第 3 步 · 人工确认", "第 3 步 · 人工確認", "Step 3 · Manual confirmation")}
                </span>
                <h2>{t.leadTitle}</h2>
                <p>{t.leadIntro}</p>
              </div>

              <div className="lead-modal-content">
                <div className="trust-box lead-trust-panel">
                  <strong>{t.trustTitle}</strong>
                  <ol>
                    {t.trustItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                <div className="lead-form-panel">
                  {selectedOffer?.serviceName && selectedOffer.recommendationType !== "general_review" && (
                    <div className="selectedOfferSummary">
                      <div className="selectedOfferLabel">
                        {textByLanguage(language, "你选择的是：", "你選擇的是：", "Selected option:")}
                      </div>
                      <div className="selectedOfferName">
                        {selectedOffer.provider} · {selectedOffer.serviceName}
                      </div>
                      <div className="selectedOfferPrice">
                        {selectedOffer.displayPriceRequiresConfirmation
                          ? textByLanguage(language, "优惠价需人工确认", "優惠價需人工確認", "Offer price requires manual confirmation")
                          : selectedOffer.displayPrice}
                      </div>
                    </div>
                  )}
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
                  <p className="form-safe-note contact-safe-note">
                    <span aria-hidden="true">🔒</span>
                    {t.leadSafetyNote}
                  </p>
                </div>
              </div>
            </div>
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

      <UsageGuidanceModal isOpen={showUsageGuidance} onClose={() => setShowUsageGuidance(false)} language={language} />

      <footer className="site-footer">{t.footer}</footer>
    </main>
  );
}
