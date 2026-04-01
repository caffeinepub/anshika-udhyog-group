# Anshika Udhyog Group

## Current State
- User Dashboard (Profile.tsx): Shows account status, ID card upload, certificate upload, bank/UPI, income breakdown.
- Seller Dashboard (Seller.tsx): Shows KYC status, seller info.
- User has fields: id, name, phone, referralCode, joinDate, accountStatus, kyc, idCardUrl, certificateUrl, role.

## Requested Changes (Diff)

### Add
- **UserIDCard component** (`components/UserIDCard.tsx`): A PVC-style ID card rendered in the browser. Shows only when `accountStatus === 'approved'`. Card contains: ANSHIKA UDHYOG GROUP branding (green #0b8d4d, yellow #FFD600), company logo text, user's name, phone, member ID (referralCode), join date, 'APPROVED MEMBER' badge. Download as PNG using Canvas API (drawImage on canvas, then toDataURL download).
- **SellerCertificate component** (`components/SellerCertificate.tsx`): A formal certificate design shown when `kyc === 'approved'` in seller dashboard. Contains: 'Certificate of Authorization', ANSHIKA UDHYOG GROUP, seller name, seller ID (referralCode), date of authorization, 'Authorized Seller' designation, decorative border, company seal text. Download as PNG using Canvas API.

### Modify
- **Profile.tsx**: In the ID Card section, if `accountStatus === 'approved'`, show the `<UserIDCard>` component with a prominent 'Download ID Card' button.
- **Seller.tsx**: In the KYC/certificate section, if `kyc === 'approved'`, show the `<SellerCertificate>` component with a 'Download Certificate' button.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/UserIDCard.tsx` — PVC card UI with canvas-based PNG download.
2. Create `src/frontend/src/components/SellerCertificate.tsx` — formal certificate UI with canvas-based PNG download.
3. Modify Profile.tsx to import and render UserIDCard when approved.
4. Modify Seller.tsx to import and render SellerCertificate when kyc approved.
5. Validate (lint + typecheck + build).
