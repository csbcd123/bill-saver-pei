import offers from "@/offers.json";

const REGIONS = new Set(["PEI", "Atlantic", "Canada"]);

const regionScore = {
  PEI: 20,
  Atlantic: 12,
  Canada: 8
};

const riskPenalty = {
  low: 0,
  medium: -5,
  high: -12
};

function normalizeProvider(provider = "") {
  return provider.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function canonicalProvider(provider = "") {
  const normalized = normalizeProvider(provider);
  if (normalized.includes("bellaliant") || normalized === "bell") return "bell";
  if (normalized.includes("publicmobile")) return "publicmobile";
  if (normalized.includes("purplecow")) return "purplecow";
  if (normalized.includes("koodo")) return "koodo";
  if (normalized.includes("telus")) return "telus";
  if (normalized.includes("eastlink")) return "eastlink";
  if (normalized.includes("xplore")) return "xplore";
  if (normalized.includes("starlink")) return "starlink";
  return normalized;
}

function isBellProvider(provider = "") {
  return canonicalProvider(provider) === "bell";
}

function getCurrentPrice(profile, serviceType) {
  if (serviceType === "internet") {
    return Number(profile.internet_monthly_price || profile.monthly_price || 0);
  }

  if (serviceType === "mobile") {
    return Number(profile.mobile_monthly_price || profile.monthly_price || 0);
  }

  return 0;
}

function getCurrentProvider(profile, serviceType) {
  return serviceType === "internet"
    ? profile.internet_provider || profile.current_provider
    : profile.mobile_provider || profile.current_provider;
}

function hasStabilitySensitiveUsage(profile) {
  const usage = Array.isArray(profile.internet_usage) ? profile.internet_usage : [];
  return usage.includes("remote_work") || usage.includes("uploading_files");
}

function getSavingScore(monthlySaving) {
  if (monthlySaving >= 50) return 35;
  if (monthlySaving >= 30) return 28;
  if (monthlySaving >= 20) return 20;
  if (monthlySaving >= 10) return 10;
  if (monthlySaving >= 0) return 0;
  return -20;
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
  if (bucket === "50to100") return gb > 50;
  if (bucket === "over100") return gb > 100;
  return true;
}

function isKoodoPrepaid(offer) {
  if (canonicalProvider(offer.provider) !== "koodo") return false;
  const searchable = `${offer.name || ""} ${offer.plan_name || ""} ${offer.plan_type || ""} ${offer.billing_type || ""}`.toLowerCase();
  return /prepaid|4g prepaid|预付费|預付費|预付卡|預付卡/.test(searchable);
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

function isMobileOfferCheaper(offer, profile) {
  const currentPrice = getCurrentPrice(profile, "mobile");
  const targetPrice = (Number(offer.min_price) + Number(offer.max_price)) / 2;
  return currentPrice <= 0 || !Number.isFinite(targetPrice) || targetPrice < currentPrice;
}

export function matchOffers(profile) {
  const selectedService = profile.service_type || "both";
  const mobileUsage = profile.current_mobile_data || profile.mobile_data_usage;

  return offers
    .filter((offer) => REGIONS.has(offer.region))
    .filter((offer) => selectedService === "both" || offer.service_type === selectedService)
    .filter((offer) => offer.service_type !== "mobile" || isPlanDataSuitableForUsage(offer.data_label, mobileUsage))
    .filter((offer) => offer.service_type !== "mobile" || (!isKoodoPrepaid(offer) && isMobileOfferCheaper(offer, profile)))
    .filter((offer) => canonicalProvider(getCurrentProvider(profile, offer.service_type)) !== canonicalProvider(offer.provider))
    .map((offer) => {
      const targetPrice = (Number(offer.min_price) + Number(offer.max_price)) / 2;
      const currentPrice = getCurrentPrice(profile, offer.service_type);
      const monthlySaving = currentPrice > 0 ? currentPrice - targetPrice : 0;
      const currentProvider = getCurrentProvider(profile, offer.service_type);
      const sameProvider = canonicalProvider(currentProvider) === canonicalProvider(offer.provider);
      const reasons = [];
      let score = 0;
      let strategyOnly = false;

      score += regionScore[offer.region] || 0;
      score += 20;
      score += getSavingScore(monthlySaving);

      if (profile.willing_to_switch === "yes") score += 15;
      if (profile.willing_to_switch === "maybe" || profile.willing_to_switch === "can_consider") score += 8;

      if (profile.willing_to_switch === "no" && !sameProvider) {
        score -= 20;
        reasons.push("用户不想换运营商，跨运营商方案需要谨慎。");
      }

      if (
        offer.service_type === "internet" &&
        isBellProvider(currentProvider) &&
        offer.requires?.includes("not_bell_30_days")
      ) {
        score -= 15;
        strategyOnly = true;
        reasons.push("当前是 Bell/Bell Aliant，winback 或本周可用优惠可能需要人工确认，只能作为谈判策略。");
      }

      if (
        offer.service_type === "internet" &&
        hasStabilitySensitiveUsage(profile) &&
        (offer.technology === "cable" || offer.technology === "cable_reseller" || offer.weak_upload)
      ) {
        score -= 15;
        reasons.push("远程办公或上传需求较高，需确认上传速度、延迟和稳定性。");
      }

      if (profile.main_priority === "save_money" && monthlySaving > 0) score += 10;

      score += Number(offer.priority_1_5 || 0);
      score += riskPenalty[offer.risk] ?? 0;
      if (offer.service_type === "mobile") {
        score += Math.max(0, monthlySaving) * 1.5;
        score -= targetPrice * 0.25;
        score -= mobileDataOverprovisionPenalty(offer.data_label, mobileUsage);
      }

      return {
        ...offer,
        target_price: Math.round(targetPrice),
        monthly_saving: Math.round(monthlySaving),
        annual_saving: Math.round(monthlySaving * 12),
        score,
        strategy_only: strategyOnly,
        match_reasons: reasons
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
