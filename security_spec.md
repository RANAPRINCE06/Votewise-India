# Security Spec for VoteWise India

## Data Invariants
1. Users can only update their own profile (name, mobile). They cannot change their role.
2. Admins are the only ones who can create, update, or delete timeline events.
3. Chat history can only be created by the user to whom it belongs. Only the owner can read their chat history.
4. Anyone (even unauthenticated) can read timeline events.

## The Dirty Dozen Payloads
1. User creates profile with `role: admin`. (Must fail)
2. User updates their profile role to admin. (Must fail)
3. User updates another user's profile. (Must fail)
4. Non-admin user creates a timeline event. (Must fail)
5. Admin creates timeline event missing required fields `title` or `date`. (Must fail)
6. Timeline event creation missing `createdAt`. (Must fail)
7. Non-admin updates timeline event. (Must fail)
8. Admin updates timeline event changing a non-existent field. (Must fail)
9. User tries to read another user's chat history. (Must fail)
10. User creates chat history for another user's ID. (Must fail)
11. Unauthenticated read of timeline. (Must pass)
12. Admin injects big strings into `TimelineItem`. (Must fail)
