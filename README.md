# 订婚喜宴邀请网站（新中式风格）

新郎 ♡ 新娘 · 农历八月初二（阳历九月十二日）· 同福楼

## 如何修改信息

所有姓名、日期等占位信息都集中在 `js/main.js` 顶部的 `CONFIG`：

```js
const CONFIG = {
  groom: "新郎",              // ← 新郎姓名
  bride: "新娘",              // ← 新娘姓名
  dateLabel: "阳历九月十二日", // ← 公历日期（封面 + 吉日卡片）
  dateLunar: "农历八月初二",   // ← 农历日期（盟书 + 吉日卡片）
  coupleLine: "新郎 & 新娘"   // ← 页脚显示的名字
};
```

改完保存，刷新浏览器即可全站生效（封面、新人卡片、盟书、吉日卡片、页脚会自动同步）。

## 其他可改内容（在 index.html 中）

- 封面标题「吾家有喜」、副标题邀请语
- 新人卡片里的描述语
- 盟书正文（繁体竖排经典誓词）
- 「喜址」卡片里的地点「同福楼」及地址说明

## 如何打开

- 直接双击 `index.html` 用浏览器打开
- 或本地起服务：`node serve.mjs`，访问 `http://localhost:4173`
- 线上地址：https://hergebechine.github.io/engagement-site/

## 文件结构

```
engagement-site/
├── index.html      # 页面结构（文案、区块）
├── css/style.css   # 全部样式与动画
├── js/main.js      # 交互脚本 + CONFIG（姓名/日期）
└── README.md
```

## 已包含的功能

- 新中式深酒红 × 米白 × 鎏金配色，纸张噪点质感
- 封面：书法渐变标题、飘落花瓣、旋转囍字水印、金色 CTA
- 滚动显现 / 逐字动画 / 印章盖印动画
- 盟书：繁体竖排经典誓词、落款
- 移动端自适应 + 无障碍（prefers-reduced-motion）
