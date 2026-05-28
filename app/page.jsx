"use client";

import { useMemo, useState } from "react";

const cities = [
  "Charlottetown",
  "Stratford",
  "Cornwall",
  "Summerside",
  "Montague",
  "Kensington",
  "Souris",
  "Alberton",
  "Tignish",
  "O’Leary",
  "Borden-Carleton",
  "Other"
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
  referral_code: ""
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

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

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

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setReport("");
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "分析失败，请稍后再试。");
      }

      setReport(data.report || "暂时没有生成结果，请稍后再试。");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">PEI only · v1</p>
          <h1>Bill Saver｜PEI 手机宽带账单免费体检</h1>
          <p className="hero-copy">
            输入你现在的宽带或手机套餐，系统会匹配本地报价库，估算可省金额，并生成中文账单优化报告。
          </p>
        </div>
      </section>

      <section className="workspace">
        <form className="panel form-panel" onSubmit={submit}>
          <div className="section-heading">
            <h2>套餐信息</h2>
            <p>默认地区：Prince Edward Island</p>
          </div>

          <div className="grid">
            <Field label="服务类型">
              <Select value={form.service_type} onChange={(value) => update("service_type", value)}>
                <option value="internet">internet</option>
                <option value="mobile">mobile</option>
                <option value="both">both</option>
              </Select>
            </Field>

            <Field label="城市">
              <Select value={form.city} onChange={(value) => update("city", value)}>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          {showInternet && (
            <div className="subsection">
              <h3>家庭宽带</h3>
              <div className="grid">
                <Field label="当前宽带运营商">
                  <Select value={form.internet_provider} onChange={(value) => update("internet_provider", value)}>
                    {[
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
                    ].map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="宽带月费">
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.internet_monthly_price}
                    onChange={(event) => update("internet_monthly_price", event.target.value)}
                    placeholder="例如 95"
                  />
                </Field>

                <Field label="价格类型">
                  <Select value={form.internet_price_type} onChange={(value) => update("internet_price_type", value)}>
                    <option value="before_tax">before_tax</option>
                    <option value="after_tax">after_tax</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>

                <Field label="当前速度">
                  <Select value={form.internet_speed} onChange={(value) => update("internet_speed", value)}>
                    <option value="under_100">under_100</option>
                    <option value="100_300">100_300</option>
                    <option value="500">500</option>
                    <option value="1g">1g</option>
                    <option value="1_5g">1_5g</option>
                    <option value="3g">3g</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>

                <Field label="捆绑情况">
                  <Select value={form.internet_bundle} onChange={(value) => update("internet_bundle", value)}>
                    <option value="internet_only">internet_only</option>
                    <option value="internet_tv">internet_tv</option>
                    <option value="internet_home_phone">internet_home_phone</option>
                    <option value="internet_tv_home_phone">internet_tv_home_phone</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>

                <Field label="家庭人数">
                  <Select value={form.household_size} onChange={(value) => update("household_size", value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3_4">3_4</option>
                    <option value="5_plus">5_plus</option>
                  </Select>
                </Field>
              </div>

              <MultiSelect
                label="宽带用途"
                value={form.internet_usage}
                onChange={(value) => update("internet_usage", value)}
                options={[
                  { value: "normal_browsing", label: "normal_browsing" },
                  { value: "streaming_4k", label: "streaming_4k" },
                  { value: "remote_work", label: "remote_work" },
                  { value: "gaming", label: "gaming" },
                  { value: "uploading_files", label: "uploading_files" },
                  { value: "many_users", label: "many_users" },
                  { value: "online_school", label: "online_school" },
                  { value: "not_sure", label: "not_sure" }
                ]}
              />
            </div>
          )}

          {showMobile && (
            <div className="subsection">
              <h3>手机套餐</h3>
              <div className="grid">
                <Field label="当前手机运营商">
                  <Select value={form.mobile_provider} onChange={(value) => update("mobile_provider", value)}>
                    {[
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
                    ].map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="手机月费">
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={form.mobile_monthly_price}
                    onChange={(event) => update("mobile_monthly_price", event.target.value)}
                    placeholder="例如 55"
                  />
                </Field>

                <Field label="价格类型">
                  <Select value={form.mobile_price_type} onChange={(value) => update("mobile_price_type", value)}>
                    <option value="before_tax">before_tax</option>
                    <option value="after_tax">after_tax</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>

                <Field label="每月流量">
                  <Select value={form.mobile_data} onChange={(value) => update("mobile_data", value)}>
                    <option value="under_10gb">under_10gb</option>
                    <option value="10_30gb">10_30gb</option>
                    <option value="30_60gb">30_60gb</option>
                    <option value="60_100gb">60_100gb</option>
                    <option value="100gb_plus">100gb_plus</option>
                    <option value="unlimited">unlimited</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>

                <Field label="是否自带手机 BYOD">
                  <Select value={form.is_byod} onChange={(value) => update("is_byod", value)}>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="not_sure">not_sure</option>
                  </Select>
                </Field>
              </div>

              <MultiSelect
                label="手机需求"
                value={form.mobile_needs}
                onChange={(value) => update("mobile_needs", value)}
                options={[
                  { value: "cheapest", label: "cheapest" },
                  { value: "needs_5g", label: "needs_5g" },
                  { value: "us_roaming", label: "us_roaming" },
                  { value: "lots_of_data", label: "lots_of_data" },
                  { value: "stable_signal", label: "stable_signal" },
                  { value: "in_store_support", label: "in_store_support" },
                  { value: "family_lines", label: "family_lines" },
                  { value: "just_checking", label: "just_checking" }
                ]}
              />
            </div>
          )}

          <div className="subsection">
            <h3>其他信息</h3>
            <div className="grid">
              <Field label="邮编前三位">
                <input
                  value={form.postal_prefix}
                  onChange={(event) => update("postal_prefix", event.target.value.toUpperCase().slice(0, 3))}
                  placeholder="例如 C1A"
                />
              </Field>

              <Field label="合约状态">
                <Select value={form.contract_status} onChange={(value) => update("contract_status", value)}>
                  <option value="no_contract">no_contract</option>
                  <option value="contract">contract</option>
                  <option value="promo_ending">promo_ending</option>
                  <option value="not_sure">not_sure</option>
                </Select>
              </Field>

              <Field label="是否愿意换运营商">
                <Select value={form.willing_to_switch} onChange={(value) => update("willing_to_switch", value)}>
                  <option value="yes">yes</option>
                  <option value="maybe">maybe</option>
                  <option value="no">no</option>
                  <option value="just_checking">just_checking</option>
                </Select>
              </Field>

              <Field label="主要优先级">
                <Select value={form.main_priority} onChange={(value) => update("main_priority", value)}>
                  <option value="save_money">save_money</option>
                  <option value="stability">stability</option>
                  <option value="speed_or_data">speed_or_data</option>
                  <option value="low_hassle">low_hassle</option>
                  <option value="retention_first">retention_first</option>
                  <option value="not_sure">not_sure</option>
                </Select>
              </Field>

              <Field label="联系方式（选填）">
                <input value={form.contact} onChange={(event) => update("contact", event.target.value)} />
              </Field>

              <Field label="推荐码（选填）">
                <input value={form.referral_code} onChange={(event) => update("referral_code", event.target.value)} />
              </Field>
            </div>

            <Field label="备注">
              <textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} rows="4" />
            </Field>
          </div>

          <button className="submit-button" type="submit" disabled={loading || !canSubmit}>
            {loading ? "正在分析你的套餐……" : "生成免费体检报告"}
          </button>
        </form>

        <aside className="panel result-panel">
          <div className="section-heading">
            <h2>分析结果</h2>
            <p>中文报告会显示在这里</p>
          </div>

          {loading && <div className="loading">正在分析你的套餐……</div>}
          {error && <div className="error">{error}</div>}
          {report && <pre className="report">{report}</pre>}
          {!loading && !error && !report && (
            <div className="empty-state">填写左侧信息后，系统会生成初步节省建议。</div>
          )}

          <p className="disclaimer">
            本工具仅提供初步分析，最终价格、资格、安装和信用审核以运营商实际确认为准。
          </p>

          <div className="action-row">
            <button type="button">我想人工复核</button>
            <button type="button">加入 PEI 账单省钱群</button>
          </div>
        </aside>
      </section>
    </main>
  );
}
