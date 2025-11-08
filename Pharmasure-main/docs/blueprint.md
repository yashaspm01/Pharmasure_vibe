# **App Name**: PharmaSure

## Core Features:

- User Authentication: Email/password sign-up & login, Phone OTP sign-in, Google Sign-In integration. Progressive auth screens: lightweight login first, expanded profile on first sign-up. Guest sandbox mode with limited features (optional). Deep-link handling for OTP or verification links (scaffold only). Inline validation, friendly error messages, and accessible labels.
- Product Search & Discovery: Search bar with debounce & typeahead suggestions (recent searches & suggested keywords). Product listing with category chips, sorting and filter modal (brand, price range, rxRequired, nearest). Pagination/infinite scroll for lists (Firestore pagination, limit + startAfter). Product cards show image, name, brand, price, rating, and stock badge (low/medium/high). Quick actions: add-to-cart, favorite/save.
- Smart Cart with Prescription Handling: Cart persisted locally and optionally synced to Firestore when authenticated. Attach one or multiple prescription images (camera/gallery) to the cart and link to specific cart items. UI to redact/blur sensitive parts of uploaded images (client-side preview + basic redaction toggle). Optimistic UI updates for add/remove quantity with rollback on failure.
- OCR-Powered Prescription Analysis: Upload flow: capture + preview + compress image -> upload to Firebase Storage. Optional OCR module: call ML Kit or Cloud Vision (scaffold/integration stub) to extract text and parse likely medicine names. Auto-suggest matching products based on OCR-extracted medicine names (show confidence scores). Allow the user to accept suggestions to add to cart or ignore them.
- Order Management & Tracking: Checkout flow (address selection, schedule slot selection, payment placeholder). Place order: create `orders/{orderId}` in Firestore with order items, totals, attached prescription IDs. Real-time updates: order status field stream-listened by client with a timeline UI (placed -> confirmed -> packed -> out-for-delivery -> delivered). Reorder from past orders UI. Admin scaffolding for pharmacies to update order statuses.
- Personalized Notifications & Reminders: FCM integration for push notifications (order updates, promotions). Local scheduled reminders for medication intake (using flutter_local_notifications); allow scheduling per medication in “My Medicines”. In-app notifications center with categories and mute toggles. Notification preference settings in Profile.
- Secure Firestore Database: Collections: `users`, `pharmacies`, `products`, `orders`, `prescriptions`, `notifications`. Provide a starter schema and example documents (see Sample schema below). Firestore security rules sample: Only authenticated users can write to their `users/{uid}` doc. Only pharmacy accounts can write to their `pharmacies/{id}` and `products` where `product.pharmacyId == request.auth.uid`. Orders can be created by authenticated users; order updates restricted to pharmacy or admin roles. Prescriptions upload path restricted to authenticated users and readable by the user + assigned pharmacy. Document how to extend rules for production (policy notes).

## Style Guidelines:

- Primary color: A gentle sky blue (#7DD3FC) to evoke feelings of trust and dependability in healthcare.
- Background color: Very light blue (#F0F9FF) for a clean and calming effect.
- Accent color: A muted periwinkle (#A3A7FA), providing a subtle contrast while remaining soothing.
- Body font: 'PT Sans' (sans-serif) for clarity and legibility in body text.
- Headline font: 'Alegreya' (serif) adds a touch of elegance and sophistication to headings, ensuring readability.
- Use a set of clear, minimalist icons sourced from a consistent library like Material Icons, enhanced with subtle animations on interaction.
- Employ a grid-based layout with ample spacing to ensure content is easily digestible and responsive across different screen sizes.
- Subtle animations, like Hero transitions between product list and detail views, and skeleton loaders, to enhance user experience without being distracting.