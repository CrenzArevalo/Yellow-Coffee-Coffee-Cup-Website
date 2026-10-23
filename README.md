# ☕ Yellow Coffee Cup — Printable Vault

Welcome to your official **Printable Vault** repository! This lightweight, decoupled web application serves as a cozy public gallery where visitors can browse and download your printables, backed by a secure administrative dashboard.

---

## 🌟 Features

* **Cozy Public Gallery (`index.html`):** Automatically displays all published printables in a responsive, beautifully styled grid with instant category filtering and download tracking.
* **Admin Dashboard (`admin.html`):** A protected backend portal allowing you to securely upload new printables, manage descriptions, link Canva/Google Drive templates, and delete outdated items.
* **Real-Time Database & Storage:** Powered by Supabase for lightning-fast data retrieval and secure asset hosting.
* **Serverless Architecture:** Built on Vercel API routes to ensure your database credentials remain completely secure and hidden from the public.

---

## 🚀 Getting Started / Local Development

If you ever need to run or test updates locally on your machine:

1. Clone this repository to your local machine.
2. Open the folder in your code editor (such as VS Code).
3. Use a local server extension (like **Live Server** in VS Code) to view `index.html` and `admin.html`. *(Note: Avoid opening files directly via `file:///` paths to prevent local browser security restrictions).*

---

## 🛠️ Managing Your Website (Admin Guide)

To add or manage printables on your live site:

1. Navigate to your live website URL followed by `/admin.html` (e.g., `https://your-domain.vercel.app/admin.html`).
2. Enter your secure **Admin Secret PIN** to unlock the dashboard.
3. Fill out the printable details:
   * **Title & Category:** Name your creation and assign a category tag (e.g., *Journal Page*, *Reflection Cards*).
   * **Description:** A short, cozy description of what the printable includes.
   * **Format:** Specify file types (e.g., `PDF • A4 & Letter`).
   * **Image & Download Link:** Paste your cover image URL and your downloadable file link (such as a Canva template or Google Drive link).
4. Click **Publish** to instantly update your live vault!

---

## ⚙️ Environment Configuration (For Deployment)

If you redeploy this project on Vercel, ensure the following **Environment Variables** are configured in your Vercel project settings:

* `SUPABASE_URL` — Your Supabase project URL.
* `SUPABASE_SERVICE_ROLE_KEY` — Your Supabase secret service role key.
* `ADMIN_SECRET_PIN` — The passcode required to access the admin portal.

---
*Made with warmth and coffee for Yellow Coffee Cup.*