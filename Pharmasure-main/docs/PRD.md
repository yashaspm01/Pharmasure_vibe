
# Product Requirements Document (PRD): PharmaSure

**Version:** 1.0
**Date:** 2024-07-31
**Status:** In Development

---

## 1. Introduction

### 1.1. Vision
To create a smart, intuitive, and reliable medication management companion that empowers users to take control of their health, improve adherence, and bridge the communication gap with healthcare providers.

### 1.2. Mission
PharmaSure is a comprehensive mobile-first application designed to eliminate the stress and complexity of managing medications. Through intelligent reminders, AI-powered insights, and seamless tracking from scan to disposal, we aim to ensure users never miss a dose, manage their inventory effectively, and have productive, data-driven conversations with their doctors.

### 1.3. Target Audience
*   **Chronic Patients:** Individuals (often 40+) managing multiple long-term medications for conditions like diabetes, hypertension, or heart disease. They need reliability and a clear overview of their regimen.
*   **Caregivers:** Family members or professionals managing medications for others (e.g., elderly parents, children). They require robust tracking, multi-user support (future goal), and clear reporting.
*   **Short-Term Users:** Individuals on a temporary course of medication (e.g., antibiotics) who need a simple, "set-it-and-forget-it" reminder system.
*   **Health-Conscious Individuals:** Users who take regular supplements or vitamins and want a simple way to track their intake and inventory.

---

## 2. Goals & Objectives

### 2.1. User Goals
*   **"Never miss a dose":** Receive timely, configurable, and clear medication reminders.
*   **"Know what I have":** Easily track medication inventory, expiry dates, and remaining stock.
*   **"Be prepared for my doctor's visit":** Generate a comprehensive, shareable report of my medication history and adherence.
*   **"Easily add new meds":** Quickly add new medications by scanning the box or prescription.
*   **"Dispose of meds safely":** Be reminded to dispose of expired medications and track that activity.

### 2.2. Business Goals
*   Achieve high user retention through a reliable and indispensable feature set.
*   Improve medication adherence rates among our user base.
*   Establish a foundation for future premium features (e.g., pharmacist consultations, advanced AI analytics).

### 2.3. Key Performance Indicators (KPIs)
*   Daily Active Users (DAU) / Monthly Active Users (MAU).
*   Medication Adherence Rate (Ticked Doses / Scheduled Doses).
*   User Retention Rate (Week 1, Month 1, Month 3).
*   Number of Reports Generated per User.
*   Feature Adoption Rate (e.g., % of users using the Scan feature).

---

## 3. Core Features & Functional Requirements

### 3.1. Onboarding & Profile Management
*   **Language Selection:** Initial screen for users to select their preferred language.
*   **Authentication:** Secure sign-up and login using Email/Password and Google OAuth.
*   **Profile Setup:** A guided, one-time setup process to capture essential user information.
*   **User Profile (Settings):**
    *   **Personal Info:** Manage name, contact details, age, gender, etc.
    *   **Medical Info:** Manage blood group, allergies, and pre-existing conditions.
    *   **App Preferences:** Manage theme (Light/Dark mode) and notification settings.
    *   **Account Actions:** Logout.

### 3.2. Dashboard (Home Page)
The central hub for daily medication tasks.
*   **Welcome Greeting:** Personalized welcome message.
*   **Next Dosage Card:** Prominently displays the very next medication to be taken, its dosage, and time.
*   **Today's Summary:** A progress bar showing the percentage of doses taken for the current day.
*   **Active Medications List:** A list of today's scheduled medications with checkboxes to "tick" (mark as taken). Ticking a medication updates adherence stats and stock count.
*   **Alerts Card:** Displays critical, time-sensitive alerts (e.g., "Low Stock," "Medication Expired").
*   **Weekly Adherence Charts:** Visual charts (Bar and Radial) showing weekly adherence percentage and daily intake patterns.

### 3.3. Medication Management (My Meds Page)
A comprehensive library of all user medications.
*   **Add Medication:** Primary entry point is via the Scan/Upload feature.
*   **Filter & Search:** Users can search for medications by name and filter by status (Active, Completed, Expired).
*   **Medication List (Accordion View):**
    *   **Collapsed View:** Shows essential info: Name, Dosage, Status Badge, and highlighted Expiry Date.
    *   **Expanded View:** On-click, reveals detailed `scanDetails` (scanned on, batch no., mfg/expiry dates, source).

### 3.4. Medication Detail Page
A deep-dive view accessible from the "My Meds" page.
*   **Header:** Displays medicine name, brand, and status.
*   **Scan Details:** Information captured during the OCR/barcode scan.
*   **Medication Duration:** Start/end dates, total course days, and completion status.
*   **Reminder & Tick Activity:** Tracks reminders sent, last tick time, and next scheduled reminder.
*   **Stock & Consumption:** A progress bar for remaining stock, predicted finish date, and a low-stock alert.
*   **Expiry & Disposal:** Tracks expiry date, days remaining, and disposal status with a "Dispose Now" action.
*   **Notes:** Sections for both doctor's remarks and user's personal feedback.

### 3.5. Scan & Upload (Prescription Upload)
The primary method for adding new medications.
*   **Dual Mode:** Allows users to either upload an existing photo or use the device's camera.
*   **AI-Powered OCR:** An AI flow analyzes the image of a medicine label.
*   **Data Extraction:** The flow extracts Medicine Name, Strength, Manufacturer, Batch No., Mfg. Date, and Expiry Date.
*   **Review & Confirm:** Presents the extracted data to the user in an editable form before saving.
*   **Recent Scans:** A history of recently scanned items is maintained for quick reference.

### 3.6. Reminders Page
Manages the user's notification schedule and preferences.
*   **Calendar View:** A monthly calendar that visually flags dates with dots indicating medication events (e.g., taken, missed, expiring).
*   **Upcoming Reminders List:** A searchable list of all future scheduled reminders.
*   **Notification Settings:** Granular control over pill alerts, disposal alerts, and notification types (sound, vibrate, silent).

### 3.7. AI & Reporting
*   **AI Chatbot:** A conversational assistant ("PharmaSure Assistant") that can answer questions about app features and provide summaries of the user's health data.
*   **Health Report Generation:**
    *   A user can trigger an AI flow to generate a comprehensive health report.
    *   The flow synthesizes data from the user's profile, adherence stats, disposal history, and medication notes.
    *   **Preview:** The generated report is displayed in-app within a dialog.
    *   **Actions:** The dialog includes "Download PDF" and "Share" buttons for consultation with doctors.

---

## 4. Technical Architecture & Stack

### 4.1. Frontend
*   **Framework:** Next.js 15 with App Router
*   **Language:** TypeScript
*   **UI Components:** ShadCN UI, Tailwind CSS
*   **State Management:** React Hooks (useState, useEffect, useMemo, useContext)
*   **Charting:** Recharts
*   **Forms:** React Hook Form with Zod for validation

### 4.2. Backend & AI
*   **Backend-as-a-Service (BaaS):** Firebase
    *   **Database:** Firestore for storing all application data.
    *   **Authentication:** Firebase Authentication (Email/Password, Google).
    *   **Storage:** Firebase Storage for storing generated PDF reports.
    *   **Serverless:** Firebase Cloud Functions for scheduled jobs (e.g., sending reminders, daily data updates).
*   **AI Integration:** Genkit
    *   **Model:** Google's Gemini models.
    *   **Flows:** Server-side `use server` functions for OCR (`analyzeMedicineLabel`), chatbot logic (`chatWithBot`), and report generation (`generateHealthReport`).

### 4.3. Data Schema
*   The Firestore database schema is strictly defined in `docs/backend.json`. It includes collections for `users`, `medications`, `reminders`, `scans`, and `reports`. The schema details all fields, types, and nested objects required to support the features above.

---

## 5. User Flow Summary

1.  **Onboarding:** A new user selects a language, signs up/logs in, and completes a profile setup form.
2.  **Adding a Medication:** The user navigates to the "Scan" tab, takes a picture of a new medicine box, reviews the AI-extracted details, and saves it. The medication now appears on the "My Meds" page.
3.  **Daily Usage:** The user opens the app, checks the "Home" page for their next dose, and marks medications as "taken" throughout the day.
4.  **Reviewing History:** The user navigates to "My Meds," filters for an "Active" medication, and expands its accordion to review its scan details and consumption history.
5.  **Generating a Report:** Before a doctor's appointment, the user goes to "Settings," clicks "Generate Full Health Report," previews the AI-generated summary, and downloads it.
6.  **Settings Page & Report Generation:** A user opens the Settings Page. Profile details and statistics load from Firebase. The user clicks “Generate Report,” triggering a backend process to compile data. The system then creates a downloadable summary report (PDF), which the user can view or share with a doctor.
