# GEO Landing Page — Top 5 laptop lập trình cho sinh viên CNTT (15–30 triệu) 2026

**Xem trang live: https://thanhtung111205.github.io/GEO_SEO/**

Landing page tĩnh (HTML/CSS/JS thuần, không framework, không bước build) được thiết kế
để tối ưu cho **Generative Engine Optimization (GEO)** — giúp các công cụ AI Search
(Perplexity, ChatGPT Search, Google Gemini/AI Overview, Bing Copilot) dễ đọc, trích xuất
và trích dẫn nội dung.

## 1. Cấu trúc thư mục

```
Web - GEO_SEO/
├── index.html          # Toàn bộ nội dung trang: H1/H2, FAQ, bảng so sánh, nguồn tham khảo, JSON-LD
├── css/
│   └── style.css       # CSS thuần, mobile-first, không phụ thuộc framework
├── js/
│   └── main.js         # JS tối giản: accordion cho FAQ (không ảnh hưởng tới nội dung crawl được)
├── assets/             # Thư mục chứa ảnh/logo (cover.jpg, logo.png) — tự thêm ảnh thật vào đây
├── robots.txt          # Cho phép rõ ràng các AI crawler (GPTBot, PerplexityBot, ClaudeBot, Google-Extended...)
├── sitemap.xml         # Sitemap cơ bản
├── vercel.json         # Header bảo mật cơ bản khi deploy Vercel
└── README.md           # Tệp này
```

Vì đây là site tĩnh 100%, bạn có thể deploy trực tiếp không cần bước build/npm install nào.

## 2. Triển khai (Deploy)

### Cách A — Deploy lên Vercel (khuyến nghị, nhanh nhất)

1. Cài Vercel CLI (một lần): `npm install -g vercel`
2. Trong thư mục project, chạy:
   ```
   vercel
   ```
3. Trả lời các câu hỏi cấu hình mặc định (chọn "Other" cho framework preset vì đây là static site).
4. Sau khi deploy xong, Vercel trả về một URL dạng `https://ten-project.vercel.app`.
5. **Quan trọng:** Mở `index.html`, thay tất cả `https://example.com/` bằng domain thật của bạn
   (trong `<link rel="canonical">`, JSON-LD, `og:url`, `sitemap.xml`, `robots.txt`) rồi deploy lại
   bằng `vercel --prod`.

### Cách B — Deploy lên Netlify

1. Cài Netlify CLI: `npm install -g netlify-cli`
2. Chạy: `netlify deploy` (chọn thư mục hiện tại làm publish directory: `.`)
3. Kiểm tra bản preview, sau đó chạy `netlify deploy --prod` để lên production.
4. Hoặc kéo-thả toàn bộ thư mục vào [app.netlify.com/drop](https://app.netlify.com/drop) để deploy tức thì không cần CLI.

### Cách C — GitHub Pages

1. Push thư mục này lên một GitHub repository.
2. Vào **Settings → Pages**, chọn branch `main` và root `/` làm nguồn.
3. Trang sẽ có địa chỉ dạng `https://<username>.github.io/<repo>/`.

## 3. Kiểm thử SEO kỹ thuật (bắt buộc trước khi kiểm thử GEO)

Trước khi kiểm tra khả năng hiển thị trên AI Search, hãy xác nhận nền tảng kỹ thuật đạt chuẩn:

| Công cụ | Mục đích | Link |
|---|---|---|
| Google Rich Results Test | Kiểm tra JSON-LD (WebPage/Article/FAQPage) hợp lệ | search.google.com/test/rich-results |
| Schema.org Validator | Xác thực cấu trúc dữ liệu chuẩn schema.org | validator.schema.org |
| Google PageSpeed Insights | Đo tốc độ tải, Core Web Vitals | pagespeed.web.dev |
| Lighthouse (Chrome DevTools) | Audit SEO/Performance/Accessibility offline | Mở DevTools → tab Lighthouse |

**Các bước cụ thể:**

1. Deploy trang lên URL công khai (xem mục 2).
2. Dán URL vào **search.google.com/test/rich-results** → xác nhận cả 3 schema (`WebPage`, `Article`, `FAQPage`)
   được phát hiện, không có lỗi (error) — cảnh báo (warning) có thể bỏ qua nếu không liên quan đến field bắt buộc.
3. Dán URL vào **validator.schema.org** để double-check cấu trúc `@graph`.
4. Chạy Lighthouse (Chrome DevTools → Lighthouse → Analyze page load), kỳ vọng điểm Performance và SEO ≥ 90.

## 4. Kiểm thử khả năng hiển thị trên AI Search (GEO Testing)

Đây là phần quan trọng nhất để xác nhận GEO hoạt động. Vì AI crawler không "index ngay lập tức"
như con người mong đợi, hãy làm theo các bước sau:

### Bước 1 — Xác nhận AI crawler được phép truy cập

Kiểm tra `robots.txt` đã cho phép `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `bingbot`
(đã có sẵn trong tệp `robots.txt` của project này). Dùng công cụ:
- **Bing Webmaster Tools** → mục "URL Inspection" để yêu cầu Bing/Copilot crawl lại URL.
- **Google Search Console** → "URL Inspection" → "Request Indexing" để yêu cầu Google crawl lại
  (ảnh hưởng đến cả Google AI Overview).

### Bước 2 — Dùng prompt để "ép" AI crawl và kiểm tra trích dẫn

Sau khi trang đã public tối thiểu vài giờ đến vài ngày (để crawler có thời gian thu thập), thử các
prompt sau trên từng công cụ AI Search:

**Trên Perplexity AI** (perplexity.ai) — Perplexity crawl gần thời gian thực nên đây là công cụ test nhanh nhất:
```
Hãy trích dẫn nội dung từ trang https://<domain-cua-ban>/ và tóm tắt 5 laptop
được gợi ý cho sinh viên CNTT theo bài viết đó.
```
```
Theo trang https://<domain-cua-ban>/, laptop nào phù hợp nhất để chạy Docker và học
Machine Learning trong tầm giá 15-30 triệu? Trả lời kèm nguồn trích dẫn.
```

**Trên ChatGPT (có bật Search/Browse)**:
```
Truy cập https://<domain-cua-ban>/ và cho tôi biết bảng so sánh 5 laptop trên trang
này gồm những tiêu chí nào.
```

**Trên Microsoft Copilot / Bing Chat**:
```
Tìm và trích dẫn nội dung về "laptop lập trình cho sinh viên CNTT 15-30 triệu"
từ domain <domain-cua-ban>.
```

**Trên Google Gemini / AI Overview** (gõ trực tiếp trên Google Search, không phải Gemini app,
vì AI Overview gắn liền với kết quả tìm kiếm):
```
laptop nào tốt nhất cho sinh viên CNTT tầm giá 15-30 triệu
```
→ Kiểm tra xem trang của bạn có xuất hiện trong khối "AI Overview" ở đầu trang kết quả không.

### Bước 3 — Đánh giá kết quả

- ✅ **Thành công:** AI trả lời chính xác nội dung, có trích dẫn tên trang/domain của bạn.
- ⚠️ **Chưa index:** AI nói "không tìm thấy trang này" → domain còn quá mới, chờ thêm 3-7 ngày,
  hoặc submit thủ công qua Bing/Google Search Console.
- ⚠️ **Trích dẫn sai lệch:** AI diễn giải không đúng ý → xem lại cấu trúc câu trả lời trong FAQ,
  đảm bảo câu trả lời đầu tiên (1-2 câu) trả lời trực tiếp, không lan man.

### Bước 4 — Theo dõi định kỳ

Lặp lại các prompt ở Bước 2 mỗi 1-2 tuần để theo dõi xu hướng được trích dẫn (citation tracking).
Đây là quy trình thủ công tối thiểu; nếu cần theo dõi ở quy mô lớn, có thể tích hợp thêm công cụ
GEO tracking chuyên dụng (ví dụ: theo dõi log server để phát hiện user-agent của GPTBot/PerplexityBot/ClaudeBot).

## 5. Checklist trước khi public chính thức

- [x] Đã thay domain placeholder bằng domain thật `https://thanhtung111205.github.io/GEO_SEO/`
- [ ] Kiểm tra lại giá và cấu hình 5 laptop trên trang nhà sản xuất (dữ liệu trong bài chỉ mang tính tham khảo)
- [ ] Chạy Rich Results Test — không còn lỗi schema
- [ ] Chạy Lighthouse — điểm Performance/SEO/Accessibility ≥ 90
- [ ] Submit sitemap qua Google Search Console và Bing Webmaster Tools
- [ ] Test bằng prompt GEO ở mục 4 sau khi trang đã được index

## 6. Hướng dẫn kiểm tra trang đã được index chưa

Index là điều kiện bắt buộc: trang chưa nằm trong index thì AI Search không thể trích dẫn.

### 6.1. Google Search Console (chính xác nhất)

1. Vào https://search.google.com/search-console, chọn đúng property `https://thanhtung111205.github.io/GEO_SEO/`.
2. Dán URL vào ô **"Kiểm tra mọi URL trong ..."** trên cùng, nhấn Enter.
3. Đọc tab **"Chỉ mục của Google"**:
   - **"URL nằm trên Google"** → đã index, kiểm tra xong.
   - **"URL không nằm trên Google"** + lý do **"Đã thu thập dữ liệu – hiện chưa được lập chỉ mục"** → Google đã crawl nhưng chưa xếp vào index, đây là trạng thái chờ bình thường của site mới.
   - **"Đã phát hiện – hiện chưa được lập chỉ mục"** → Google biết URL nhưng chưa crawl, chờ thêm.
4. Nhấn **"Kiểm tra URL đang hoạt động"** để xác nhận Google đọc được bản mới nhất (không bị chặn robots/noindex).
5. Sau khi sửa nội dung lớn, nhấn **"Yêu cầu lập chỉ mục"** để Google crawl lại.
6. Mục **Lập chỉ mục → Trang** cho biết tổng số trang đã index và lý do các trang chưa index.

### 6.2. Tìm trực tiếp trên Google

- Gõ `site:thanhtung111205.github.io/GEO_SEO` → có kết quả trỏ đúng trang landing là đã index.
- Gõ nguyên tiêu đề bài viết trong dấu ngoặc kép, ví dụ `"Top 5 Laptop Lập Trình Cho Sinh Viên CNTT"`.
- Lưu ý: repo GitHub (`github.com/thanhtung111205/GEO_SEO`) có thể được index trước, đó không phải trang web thật.

### 6.3. Bing Webmaster Tools

1. Vào https://www.bing.com/webmasters, chọn site.
2. Mục **URL Inspection** → dán URL → **Inspect**. Trạng thái "Indexed" là đã index.
3. Nếu chưa, dùng **URL Submission** để gửi lại (hạn mức hằng ngày).
4. Kiểm tra nhanh: gõ `site:thanhtung111205.github.io/GEO_SEO` trên bing.com.

### 6.4. Nếu sau 7 ngày vẫn chưa index

- Xác nhận `robots.txt` và thẻ `<meta name="robots">` không chặn (đang là `index, follow`).
- Đảm bảo sitemap đã submit và không báo lỗi trong mục **Sơ đồ trang web**.
- Đặt link đến trang từ các nơi có sẵn: README của repo, hồ sơ GitHub, LinkedIn, bài đăng diễn đàn. Backlink là tín hiệu giúp Google ưu tiên crawl.
- Cân nhắc dùng domain riêng thay cho `github.io` để tăng độ tin cậy.
