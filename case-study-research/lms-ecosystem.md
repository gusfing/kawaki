# Case Study Research Dossier: Multi-Role LMS & School Mobility Ecosystem

**Project Slug:** `lms-ecosystem`  
**Target Route:** `/case-studies/lms-ecosystem`  
**Product Name:** Multi-Role LMS & School Mobility Ecosystem (Staff App, Student/Parent App & Fleet Mobility)  
**Public Website / Staging:** Local enterprise deployment / Client private cloud  
**Industry:** EdTech / School Management / Enterprise Learning Management / Fleet Mobility  
**Primary Discipline:** Web Applications & Platforms / Mobile Application Development (Multi-Role Ecosystem)  

---

## 1. Project Summary & Background
The **Multi-Role LMS & School Mobility Ecosystem** is a unified, cross-platform enterprise education operations system engineered by Kawaki Studios. Rather than fragmenting school operations into disconnected single-purpose tools, the ecosystem delivers an interconnected multi-role architecture spanning three dedicated interfaces:
1. **Teacher & Staff Mobile App:** A workflow-centric mobile app empowering educators with real-time class attendance, lesson planning, assignment grading, timetable scheduling, leave management, and direct communication.
2. **Student & Parent Mobile App:** A transparent, engaging academic portal for timetable tracking, online examinations, instant result access, digital fee collection, and institutional announcements.
3. **School Mobility & Fleet Transport System:** An integrated transport tracking module with driver route logging, vehicle telematics, real-time bus GPS location updates (`/transport/location/{vehicleId}`), and student boarding reporting.

All endpoints communicate with a high-performance central multi-tenant backend, ensuring cryptographic data separation, role-based access control (RBAC), and millisecond-level push synchronization across institutional stakeholders.

---

## 2. Public Sources & Verified Repository Documentation
* **Client / Repository Path:** `c:\Users\ks209\Documents\kunal saas\ai school lms`
* **Staff Mobile Application Codebase:** `c:\Users\ks209\Documents\kunal saas\ai school lms\apps\mobile_app_staff`
  * Architecture Guide: `STAFF_DOCUMENTATION.md`
  * Dependencies: Flutter SDK, BLoC / Cubit state management, Dio HTTP client, Hive local storage.
* **Student & Parent Mobile Application Codebase:** `c:\Users\ks209\Documents\kunal saas\ai school lms\apps\mobile_app_student_parent`
  * Architecture Guide: `DOCUMENTATION.md`
  * Dependencies: Flutter SDK, AwesomeNotifications, Hive, Cubit architecture.
* **Web Portal Companion:** `c:\Users\ks209\Documents\kunal saas\ai school lms\apps\student_web`
* **Central Backend & Transport API:** `c:\Users\ks209\Documents\kunal saas\ai school lms\fav-camp-backend-web-main`
  * Transport routes: `routes/api_v1.php`, `routes/parent.php`, `routes/school.php`

---

## 3. Verified Technical Architecture & Product Capabilities (Repository Verified)

### A. Mobile Application Architecture (Staff & Student/Parent Apps)
* **Framework:** Flutter (cross-platform targeting iOS and Android with unified codebase)
* **State Management:** BLoC pattern implemented cleanly via Cubits:
  * *Staff App:* `AuthCubit`, `StaffAllowedPermissionsAndModulesCubit`, `TeacherAttendanceCubit`, `TeacherMyTimetableCubit`, `TeacherAssignmentsCubit`, `SocketSettingCubit`, `ChatMessagesCubit`, `NotificationsCubit`
  * *Student App:* `AuthCubit`, `SchoolConfigurationCubit`, `NoticeBoardCubit`, `ExamsOnlineCubit`, `ResultsOnlineCubit`
* **Local Storage & Offline Caching:** Hive key-value database for offline session tokens, cached schedules, and user preferences
* **Network & API Layer:** Dio HTTP client with custom interceptors for bearer authentication, response transformation, and centralized error handling
* **Push Notifications:** AwesomeNotifications combined with Firebase Cloud Messaging (FCM) for real-time announcements, attendance alerts, and exam releases

### B. Transport & Fleet Mobility Architecture
* **Real-Time GPS Tracking Endpoint:** `/transport/location/{vehicleId}` providing parent and staff portals with live vehicle latitude/longitude coordinates
* **Driver & Vehicle Telematics:** Managed via `TransportController` and `TransportDashboardController`
* **Student Transport Reporting:** Automated route rosters and exportable transit manifests (`/student-transport-report`)
* **Role-Gated Security:** Protected by `permission:transport.manage` and `module:transport` middleware

### C. Central Management Backend
* **Architecture:** Modular, multi-tenant backend architecture with granular role-based access control (Superadmin, School Admin, Teacher, Student, Parent, Transport Manager)
* **Real-Time Communication:** WebSockets for instantaneous staff messaging and administrative broadcast notices

---

## 4. Kawaki-Confirmed Technical Facts & Role
* **Role:** Full-Cycle Engineering & Architecture across Mobile Applications and Central Service APIs.
* **Architecture Strategy:** Engineered as one cohesive multi-role ecosystem rather than isolated disparate apps, ensuring unified authentication, shared data contracts, and seamless parent-to-school transparency.
* **Design Philosophy:** Clean, responsive, high-contrast UI tailored for mobile ergonomics in classroom and on-the-road environments.

---

## 5. Unknowns & "Needs Confirmation"
* [NEEDS CONFIRMATION] Exact count of active schools / campuses deployed on this specific build (omit unverified institutional counts; focus on demonstrated enterprise multi-role capabilities).
* [NEEDS CONFIRMATION] Public App Store / Google Play Store store links (maintain as enterprise/client-managed distribution).

---

## 6. Internal Evidence Table

| Claim / Detail | Source | Evidence Label | Publish Status |
| :--- | :--- | :--- | :--- |
| Flutter cross-platform architecture (iOS/Android) | `mobile_app_staff/pubspec.yaml` | `REPOSITORY-VERIFIED` | **YES** |
| BLoC / Cubit state management pattern | `STAFF_DOCUMENTATION.md` | `REPOSITORY-VERIFIED` | **YES** |
| Role-specific modules: Teacher, Student, Parent, Transport | Codebase directory structure | `REPOSITORY-VERIFIED` | **YES** |
| Live vehicle location API `/transport/location/{vehicleId}` | `routes/api_v1.php` | `REPOSITORY-VERIFIED` | **YES** |
| Teacher attendance, timetable, assignments modules | `mobile_app_staff/lib/cubits` | `REPOSITORY-VERIFIED` | **YES** |
| Student online exams and live result tracking | `mobile_app_student_parent/lib/cubits` | `REPOSITORY-VERIFIED` | **YES** |
| "Used by 1,000,000+ students across 500 schools" | Unverified speculation | `DO NOT PUBLISH` | **NO** |

---

## 7. Recommended Case Study Narrative
1. **The Core Architectural Challenge:** Institutional education software is notoriously fragmented: teachers use one app for attendance, parents check a portal for grades, and bus transport runs on third-party hardware trackers. Kawaki unified this into a synchronized multi-role ecosystem.
2. **Role-Specific Ergonomics:**
   * *For Teachers:* Fast, thumb-friendly classroom workflows (tap-to-mark attendance, instant lesson attachments, automated schedule alerts).
   * *For Students & Parents:* Real-time clarity on exam dates, progress reports, payment dues, and immediate school circulars.
   * *For Transport & Operations:* Driver route verification, vehicle safety telematics, and parent-accessible live bus tracking.
3. **Engineering with Flutter & Clean BLoC:** How the team structured scalable Flutter Cubits to maintain predictability, offline state resilience, and reactive UI updates across diverse Android and iOS hardware.

---

## 8. Recommended Visual Assets & Branding
* **Ecosystem Diagram:** High-level schematic illustrating the central multi-tenant backend synchronizing the Staff App, Student/Parent App, and Transport subsystem.
* **UI Screen Captures:**
  * Teacher Attendance & Timetable workflow screens (`mobile_app_staff`)
  * Student Exam & Results dashboard (`mobile_app_student_parent`)
  * Bus transit tracking & transport report interface

---

## 9. SEO & Metadata Specifications
* **Slug:** `lms-ecosystem`
* **Canonical URL:** `https://www.kawaki.co.in/case-studies/lms-ecosystem`
* **SEO Title:** `Multi-Role LMS & School Mobility Ecosystem | Kawaki Studios Case Study`
* **Meta Description:** `How Kawaki Studios engineered a multi-role Flutter LMS and school mobility ecosystem connecting teachers, students, parents, and campus transport.`
* **Schema.org:** `@type: SoftwareApplication` and `@type: CreativeWork` with `applicationCategory: EducationalApplication` and `creator: Kawaki Studios`.
* **Internal Linking:**
  * Inbound: `/services/web-application-development`, `/services/mobile-app-development` (Featured Ecosystem)
  * Outbound: `/services/web-application-development`, `/services/mobile-app-development`, `/contact`
