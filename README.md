Perfect 👍 — here’s a **university submission–ready version** of your README (formal, structured, and professional, without emojis):

---

# Student Merit Portal – Maitreyi College

## 1. Introduction

The *Student Merit Portal* is a web-based application developed for **Maitreyi College** to support the **IQAC Meritorious Student Award** process.
It automates the collection, evaluation, and scoring of student achievements through a role-based system, ensuring transparency and efficiency in the merit assessment process.

The portal provides separate interfaces for students and teachers. Students can upload academic and co-curricular documents, while teachers can verify submissions, review assigned points, and generate the final merit list.

---

## 2. Objectives

* To automate the merit evaluation process of students.
* To provide a transparent, data-driven scoring mechanism.
* To reduce manual effort in calculating CGPA and verifying certificates.
* To enable teachers to view, filter, and manage student submissions efficiently.
* To generate a consolidated and ranked merit list automatically.

---

## 3. Key Features

### Student Module

* Upload of academic marksheets and event certificates (supported formats: PNG, JPG, JPEG).
* Automatic extraction of CGPA and certificate details using OCR.
* Real-time calculation of points based on predefined IQAC criteria.
* Display of cumulative merit points and submission history.

### Teacher Module

* Access to all student submissions, categorized by department, course, and year.
* View extracted details and assigned points for each submission.
* Option to approve or verify submissions.
* Automatic generation of ranked merit lists.
* Export functionality for reports (PDF/CSV).

---

## 4. System Workflow

1. The student uploads a document (marksheet or certificate).
2. The system uses **Python’s Tesseract OCR** to extract text and identify key details such as CGPA or achievement level.
3. Points are assigned automatically based on the extracted data.
4. The teacher reviews the submissions, validates the scores, and finalizes the merit list.

---

## 5. Technology Stack

| Component            | Technology                           |
| -------------------- | ------------------------------------ |
| Frontend             | Next.js 14, TypeScript, Tailwind CSS |
| Backend              | Next.js API Routes                   |
| OCR & Processing     | Python (Tesseract OCR, Pillow)       |
| Testing / Validation | Streamlit                            |
| Hosting & Deployment | Vercel                               |

---

## 6. Implementation Details

* **OCR Integration:** The Python backend uses Tesseract OCR to extract text from uploaded images.
* **Automatic Scoring:** Based on extracted CGPA and event details, the system applies the IQAC-defined point criteria.
* **Data Synchronization:** Both student and teacher dashboards are dynamically updated to reflect new uploads or verifications.
* **Security:** Role-based access ensures that students can only view their own submissions, while teachers have broader access for evaluation.

---

## 7. Deployment

The application is hosted and deployed on **Vercel** for seamless integration and automatic updates.

**Live Portal:**
https://merit-portal-final-version.vercel.app/
---

## 8. Conclusion

The *Student Merit Portal* successfully automates the process of collecting, evaluating, and ranking student achievements.
By integrating modern web technologies with OCR-based automation, the system minimizes manual errors and ensures transparency in the merit selection process.
It serves as a scalable model for digital evaluation systems in educational institutions.

---

## 9. Developer

Perfect 👍 — here’s the **final formatted section** with your name and details on **separate lines** (Markdown-safe and GitHub/Word compatible):

---

## **9. Developer**

**Developed by:** *Anjali*
**Department of Computer Science**
*Maitreyi College, University of Delhi*

---





