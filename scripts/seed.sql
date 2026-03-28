-- Seed data for Strataspheric
-- Strata: Oceanview Towers (a 24-unit condo building in Vancouver)

-- ============================================================
-- Clean existing data
-- ============================================================

DELETE FROM widget_info;
DELETE FROM widget_events;
DELETE FROM widget_files;
DELETE FROM meeting_minutes;
DELETE FROM meeting_files;
DELETE FROM meeting_agenda_items;
DELETE FROM meeting_attendees;
DELETE FROM amenity_bookings;
DELETE FROM inbox_thread_chats;
DELETE FROM thread_emails;
DELETE FROM inbox_messages;
DELETE FROM invoices;
DELETE FROM meetings;
DELETE FROM events;
DELETE FROM amenities;
DELETE FROM files;
DELETE FROM strata_widgets;
DELETE FROM strata_plans;
DELETE FROM strata_memberships;
DELETE FROM user_password_reset_tokens;
DELETE FROM emails;
DELETE FROM stratas;
DELETE FROM users;

-- ============================================================
-- Users (password for all: "password123")
-- Pre-hashed with pbkdf2 v01 format
-- ============================================================

INSERT INTO users (id, email, password, name, status, accountType, isAdmin) VALUES
  ('019579a0-0001-7000-8000-000000000001', 'tills13+sarah.chen@gmail.com',    'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Sarah Chen',       'active', 'user', 0),
  ('019579a0-0002-7000-8000-000000000002', 'tills13+james.wilson@gmail.com',  'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'James Wilson',     'active', 'user', 0),
  ('019579a0-0003-7000-8000-000000000003', 'tills13+maria.garcia@gmail.com',  'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Maria Garcia',     'active', 'user', 0),
  ('019579a0-0004-7000-8000-000000000004', 'tills13+david.kim@gmail.com',     'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'David Kim',        'active', 'user', 0),
  ('019579a0-0005-7000-8000-000000000005', 'tills13+emma.thompson@gmail.com', 'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Emma Thompson',    'active', 'user', 0),
  ('019579a0-0006-7000-8000-000000000006', 'tills13+alex.patel@gmail.com',    'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Alex Patel',       'active', 'user', 0),
  ('019579a0-0007-7000-8000-000000000007', 'tills13+lisa.nguyen@gmail.com',   'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Lisa Nguyen',      'active', 'user', 0),
  ('019579a0-0008-7000-8000-000000000008', 'tills13+mike.brown@gmail.com',    'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Mike Brown',       'active', 'user', 0),
  ('019579a0-0009-7000-8000-000000000009', 'tills13+rachel.lee@gmail.com',    'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Rachel Lee',       'active', 'user', 0),
  ('019579a0-000a-7000-8000-000000000010', 'tills13+tom.martinez@gmail.com',  'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Tom Martinez',     'active', 'user', 0),
  ('019579a0-000b-7000-8000-000000000011', 'tills13+admin@gmail.com',   'djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==', 'Admin User',       'active', 'user', 1);

-- ============================================================
-- Strata
-- ============================================================

INSERT INTO stratas (id, name, domain, domainRecordId, numUnits, strataId, streetAddress, postalCode, city, provinceState, isPublic, status, strataActiveEmailSent, latitude, longitude, stripeCustomerId, stripeAccountId, stripeAccountStatus, createdAt, inboxEmail) VALUES
  ('019579a0-1000-7000-8000-000000000001', 'Oceanview Towers', 'oceanview.strataspheric.local:3000', 'dns_rec_seed_001', 24, 'VIS1234', '1250 Pacific Boulevard', 'V6Z 3G1', 'Vancouver', 'BC', 1, 'active', 1, 49.2757, -123.1152, 'cus_seed_oceanview', NULL, 'none', strftime('%s', '2024-06-15'), 'tills13+oceanview.inbox@gmail.com');

-- ============================================================
-- Strata Plan (Standard plan - all features enabled)
-- ============================================================

INSERT INTO strata_plans (id, strataId, subscriptionId, enableInbox, enableInvoices, enableAmenities, enableDirectory, enableEmailNotifications, enableMeetings) VALUES
  ('019579a0-2000-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', 'sub_seed_oceanview', 1, 1, 1, 1, 1, 1);

-- ============================================================
-- Strata Memberships
-- ============================================================

INSERT INTO strata_memberships (strataId, userId, unit, role, phoneNumber, monthlyFee, notifyEvents) VALUES
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', '101', 'administrator', '604-555-0101', 45000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', '102', 'president',     '604-555-0102', 45000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0003-7000-8000-000000000003', '201', 'treasurer',     '604-555-0201', 52000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0004-7000-8000-000000000004', '202', 'secretary',     '604-555-0202', 52000, 0),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0005-7000-8000-000000000005', '301', 'owner',         '604-555-0301', 58000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0006-7000-8000-000000000006', '302', 'owner',         '604-555-0302', 58000, 0),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0007-7000-8000-000000000007', '401', 'owner',         '604-555-0401', 62000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0008-7000-8000-000000000008', '402', 'owner',         NULL,           62000, 0),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-0009-7000-8000-000000000009', '501', 'owner',         '604-555-0501', 68000, 1),
  ('019579a0-1000-7000-8000-000000000001', '019579a0-000a-7000-8000-000000000010', NULL,  'pending',       NULL,           NULL,  0);

-- ============================================================
-- Files (documents uploaded to the strata)
-- ============================================================

INSERT INTO files (id, strataId, uploaderId, name, description, isPublic, sizeBytes, path, mimeType, createdAt) VALUES
  ('019579a0-3001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Strata Bylaws 2024.pdf',           'Current bylaws effective January 2024',       1, 2458000, 'oceanview/bylaws-2024.pdf',           'application/pdf', strftime('%s', '2024-07-01')),
  ('019579a0-3001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Insurance Certificate 2025.pdf',   'Building insurance policy certificate',       0, 1845000, 'oceanview/insurance-2025.pdf',        'application/pdf', strftime('%s', '2025-01-15')),
  ('019579a0-3001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', '019579a0-0003-7000-8000-000000000003', 'Q4 2025 Financial Report.pdf',     'Quarterly financial statements',               0, 987000,  'oceanview/q4-2025-financials.pdf',    'application/pdf', strftime('%s', '2026-01-10')),
  ('019579a0-3001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', 'Parking Rules.pdf',                'Updated parking garage rules and assignments', 1, 523000,  'oceanview/parking-rules.pdf',         'application/pdf', strftime('%s', '2025-03-20')),
  ('019579a0-3001-7000-8000-000000000005', '019579a0-1000-7000-8000-000000000001', '019579a0-0004-7000-8000-000000000004', 'AGM Minutes March 2026.pdf',       'Annual General Meeting minutes',               0, 1230000, 'oceanview/agm-minutes-2026-03.pdf',   'application/pdf', strftime('%s', '2026-03-16')),
  ('019579a0-3001-7000-8000-000000000006', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Roof Inspection Report.pdf',       'Annual roof inspection by Pacific Roofing',    0, 3420000, 'oceanview/roof-inspection-2026.pdf',  'application/pdf', strftime('%s', '2026-02-28')),
  ('019579a0-3001-7000-8000-000000000007', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Pool Area Photo.jpg',              'Rooftop pool amenity photo',                   1, 4500000, 'oceanview/pool-photo.jpg',            'image/jpeg',      strftime('%s', '2024-08-10')),
  ('019579a0-3001-7000-8000-000000000008', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'BBQ Area Photo.jpg',               'Rooftop BBQ area photo',                       1, 3800000, 'oceanview/bbq-photo.jpg',             'image/jpeg',      strftime('%s', '2024-08-10')),
  ('019579a0-3001-7000-8000-000000000009', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Party Room Photo.jpg',             'Ground floor party room',                      1, 3200000, 'oceanview/party-room-photo.jpg',      'image/jpeg',      strftime('%s', '2024-08-10')),
  ('019579a0-3001-7000-8000-000000000010', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Guest Suite Photo.jpg',            'Guest suite on 6th floor',                     1, 2900000, 'oceanview/guest-suite-photo.jpg',     'image/jpeg',      strftime('%s', '2024-08-10'));

-- Set bylaws file on strata
UPDATE stratas SET bylawsFileId = '019579a0-3001-7000-8000-000000000001' WHERE id = '019579a0-1000-7000-8000-000000000001';

-- ============================================================
-- Amenities
-- ============================================================

INSERT INTO amenities (id, strataId, name, description, status, costPerHour, imageFileId) VALUES
  ('019579a0-4001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', 'Rooftop Pool',   'Heated rooftop pool with panoramic ocean views. Open May through September. Capacity: 20 people.',                         'active',   0,    '019579a0-3001-7000-8000-000000000007'),
  ('019579a0-4001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', 'BBQ Area',       'Rooftop BBQ area with two gas grills, seating for 12, and covered dining area. Available year-round.',                     'active',   15,   '019579a0-3001-7000-8000-000000000008'),
  ('019579a0-4001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', 'Party Room',     'Ground floor party room with kitchen, sound system, and seating for 40. Perfect for celebrations and gatherings.',         'active',   25,   '019579a0-3001-7000-8000-000000000009'),
  ('019579a0-4001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', 'Guest Suite',    'Fully furnished one-bedroom guest suite on the 6th floor. Includes kitchenette, bathroom, and wifi. Max 2 night stay.',    'active',   50,   '019579a0-3001-7000-8000-000000000010');

-- ============================================================
-- Events (mix of past and future)
-- ============================================================

INSERT INTO events (id, strataId, creatorId, name, description, startDate, endDate, isPublic) VALUES
  -- Past events
  ('019579a0-5001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', 'Annual General Meeting',          'Mandatory AGM for all unit owners. Budget review, board elections, and bylaw amendments.',  strftime('%s', '2026-03-15 10:00:00'), strftime('%s', '2026-03-15 13:00:00'), 0),
  ('019579a0-5001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Fire Alarm Testing',             'Annual fire alarm system testing. Expect intermittent alarms between 9am-3pm.',              strftime('%s', '2026-03-10 09:00:00'), strftime('%s', '2026-03-10 15:00:00'), 1),
  ('019579a0-5001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', '019579a0-0005-7000-8000-000000000005', 'Community BBQ',                  'Spring community BBQ on the rooftop. Burgers, hot dogs, and drinks provided.',               strftime('%s', '2026-03-22 12:00:00'), strftime('%s', '2026-03-22 16:00:00'), 1),
  -- Future events
  ('019579a0-5001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Elevator Maintenance',           'Elevator #2 will be out of service for scheduled maintenance.',                              strftime('%s', '2026-04-05 08:00:00'), strftime('%s', '2026-04-05 17:00:00'), 1),
  ('019579a0-5001-7000-8000-000000000005', '019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', 'Council Meeting',                'Monthly strata council meeting. Open to all residents.',                                     strftime('%s', '2026-04-10 19:00:00'), strftime('%s', '2026-04-10 21:00:00'), 0),
  ('019579a0-5001-7000-8000-000000000006', '019579a0-1000-7000-8000-000000000001', '019579a0-0003-7000-8000-000000000003', 'Budget Review Session',          'Mid-year budget review with the treasurer. All council members requested.',                  strftime('%s', '2026-04-18 18:00:00'), strftime('%s', '2026-04-18 19:30:00'), 0),
  ('019579a0-5001-7000-8000-000000000007', '019579a0-1000-7000-8000-000000000001', '019579a0-0005-7000-8000-000000000005', 'Pool Opening Day',               'Summer pool season begins! Join us for the opening day celebration.',                        strftime('%s', '2026-05-01 10:00:00'), strftime('%s', '2026-05-01 18:00:00'), 1),
  ('019579a0-5001-7000-8000-000000000008', '019579a0-1000-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'Window Cleaning',                'Exterior window cleaning for all units. Please close windows on scheduled day.',             strftime('%s', '2026-05-12 07:00:00'), strftime('%s', '2026-05-14 17:00:00'), 1),
  -- Amenity booking events
  ('019579a0-5001-7000-8000-000000000009', '019579a0-1000-7000-8000-000000000001', '019579a0-0005-7000-8000-000000000005', 'Party Room - Thompson Birthday',  'Birthday party for Emma Thompson',                                                          strftime('%s', '2026-04-12 14:00:00'), strftime('%s', '2026-04-12 20:00:00'), 0),
  ('019579a0-5001-7000-8000-000000000010', '019579a0-1000-7000-8000-000000000001', '019579a0-0007-7000-8000-000000000007', 'BBQ Area - Nguyen Family Dinner',  'Family dinner gathering',                                                                  strftime('%s', '2026-04-06 17:00:00'), strftime('%s', '2026-04-06 21:00:00'), 0),
  ('019579a0-5001-7000-8000-000000000011', '019579a0-1000-7000-8000-000000000001', '019579a0-0009-7000-8000-000000000009', 'Guest Suite - Lee Visitors',      'Guest suite booking for visiting parents',                                                  strftime('%s', '2026-04-20 15:00:00'), strftime('%s', '2026-04-22 11:00:00'), 0);

-- ============================================================
-- Amenity Bookings
-- ============================================================

INSERT INTO amenity_bookings (id, amenityId, eventId, requesterId, deciderId, decision) VALUES
  ('019579a0-4501-7000-8000-000000000001', '019579a0-4001-7000-8000-000000000003', '019579a0-5001-7000-8000-000000000009', '019579a0-0005-7000-8000-000000000005', '019579a0-0001-7000-8000-000000000001', 'approved'),
  ('019579a0-4501-7000-8000-000000000002', '019579a0-4001-7000-8000-000000000002', '019579a0-5001-7000-8000-000000000010', '019579a0-0007-7000-8000-000000000007', '019579a0-0001-7000-8000-000000000001', 'approved'),
  ('019579a0-4501-7000-8000-000000000003', '019579a0-4001-7000-8000-000000000004', '019579a0-5001-7000-8000-000000000011', '019579a0-0009-7000-8000-000000000009', NULL,                                   NULL);

-- ============================================================
-- Meetings
-- ============================================================

INSERT INTO meetings (id, strataId, callerId, eventId, purpose, notes) VALUES
  ('019579a0-6001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', '019579a0-5001-7000-8000-000000000001', 'Annual General Meeting 2026', 'Please review the budget package distributed via email prior to attending.'),
  ('019579a0-6001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', '019579a0-5001-7000-8000-000000000005', 'April Council Meeting',       'Monthly council meeting to discuss ongoing building matters.');

-- ============================================================
-- Meeting Attendees
-- ============================================================

INSERT INTO meeting_attendees (meetingId, userId, status, respondedAt) VALUES
  -- AGM attendees
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0001-7000-8000-000000000001', 'confirmed', strftime('%s', '2026-03-05')),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0002-7000-8000-000000000002', 'confirmed', strftime('%s', '2026-03-04')),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0003-7000-8000-000000000003', 'confirmed', strftime('%s', '2026-03-06')),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0004-7000-8000-000000000004', 'confirmed', strftime('%s', '2026-03-07')),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0005-7000-8000-000000000005', 'declined',  strftime('%s', '2026-03-08')),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0006-7000-8000-000000000006', 'invited',   NULL),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-0007-7000-8000-000000000007', 'confirmed', strftime('%s', '2026-03-10')),
  -- Council meeting attendees
  ('019579a0-6001-7000-8000-000000000002', '019579a0-0001-7000-8000-000000000001', 'confirmed', strftime('%s', '2026-03-28')),
  ('019579a0-6001-7000-8000-000000000002', '019579a0-0002-7000-8000-000000000002', 'confirmed', strftime('%s', '2026-03-28')),
  ('019579a0-6001-7000-8000-000000000002', '019579a0-0003-7000-8000-000000000003', 'invited',   NULL),
  ('019579a0-6001-7000-8000-000000000002', '019579a0-0004-7000-8000-000000000004', 'confirmed', strftime('%s', '2026-03-29'));

-- ============================================================
-- Meeting Agenda Items
-- ============================================================

INSERT INTO meeting_agenda_items (id, meetingId, title, description, minutes, done) VALUES
  -- AGM agenda
  ('019579a0-6101-7000-8000-000000000001', '019579a0-6001-7000-8000-000000000001', 'Call to Order',                    'Establish quorum and call meeting to order.',                                        'Meeting called to order at 10:05 AM. Quorum established with 7 of 10 units represented.', 1),
  ('019579a0-6101-7000-8000-000000000002', '019579a0-6001-7000-8000-000000000001', 'Approval of Previous Minutes',     'Review and approve minutes from the 2025 AGM.',                                      'Minutes approved unanimously.',                                                           1),
  ('019579a0-6101-7000-8000-000000000003', '019579a0-6001-7000-8000-000000000001', 'Financial Report',                 'Treasurer to present Q4 2025 financials and proposed 2026 budget.',                   'Maria presented the financial report. Operating surplus of $12,400. Budget approved.',     1),
  ('019579a0-6101-7000-8000-000000000004', '019579a0-6001-7000-8000-000000000001', 'Roof Repair Update',               'Status update on the roof repair project approved at last AGM.',                      'Roof repairs completed in February. Final cost $45,000 - under budget by $5,000.',        1),
  ('019579a0-6101-7000-8000-000000000005', '019579a0-6001-7000-8000-000000000001', 'Elevator Modernization Proposal',  'Discussion of elevator modernization quote from Pacific Elevators.',                  'Council to obtain two additional quotes before May council meeting.',                     1),
  ('019579a0-6101-7000-8000-000000000006', '019579a0-6001-7000-8000-000000000001', 'Board Elections',                  'Election of council members for 2026-2027 term.',                                    'All current council members re-elected by acclamation.',                                  1),
  -- Council meeting agenda
  ('019579a0-6101-7000-8000-000000000007', '019579a0-6001-7000-8000-000000000002', 'Elevator Quotes Review',           'Review additional quotes for elevator modernization.',                                NULL, 0),
  ('019579a0-6101-7000-8000-000000000008', '019579a0-6001-7000-8000-000000000002', 'Parking Enforcement',              'Discuss recurring parking violations in visitor spots.',                               NULL, 0),
  ('019579a0-6101-7000-8000-000000000009', '019579a0-6001-7000-8000-000000000002', 'Summer Pool Schedule',             'Finalize pool hours and lifeguard schedule for summer season.',                        NULL, 0),
  ('019579a0-6101-7000-8000-000000000010', '019579a0-6001-7000-8000-000000000002', 'Landscaping Contract Renewal',     'Review bids for landscaping maintenance contract.',                                   NULL, 0);

-- AGM agenda item referencing financial report file
UPDATE meeting_agenda_items SET fileId = '019579a0-3001-7000-8000-000000000003' WHERE id = '019579a0-6101-7000-8000-000000000003';

-- ============================================================
-- Meeting Files
-- ============================================================

INSERT INTO meeting_files (meetingId, fileId) VALUES
  ('019579a0-6001-7000-8000-000000000001', '019579a0-3001-7000-8000-000000000003'),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-3001-7000-8000-000000000005'),
  ('019579a0-6001-7000-8000-000000000001', '019579a0-3001-7000-8000-000000000006');

-- ============================================================
-- Meeting Minutes
-- ============================================================

INSERT INTO meeting_minutes (meetingId, fileId, approverId, state) VALUES
  ('019579a0-6001-7000-8000-000000000001', '019579a0-3001-7000-8000-000000000005', '019579a0-0002-7000-8000-000000000002', 'approved');

-- ============================================================
-- Invoices
-- ============================================================

INSERT INTO invoices (id, strataId, type, status, identifier, description, amount, payee, isPaid, dueBy, createdAt, updatedAt) VALUES
  ('019579a0-7001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', 'outgoing', 'final', 'INV-2026-001', 'Roof repair - Pacific Roofing Ltd.',             45000.00, 'Pacific Roofing Ltd.',       1, strftime('%s', '2026-03-01'), strftime('%s', '2026-02-15'), strftime('%s', '2026-03-01')),
  ('019579a0-7001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', 'outgoing', 'final', 'INV-2026-002', 'Monthly landscaping - Green Thumb Services',     1200.00,  'Green Thumb Services',       1, strftime('%s', '2026-03-15'), strftime('%s', '2026-03-01'), strftime('%s', '2026-03-15')),
  ('019579a0-7001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', 'outgoing', 'final', 'INV-2026-003', 'Fire alarm inspection and testing',              3500.00,  'FireSafe Inspections Inc.',   1, strftime('%s', '2026-03-20'), strftime('%s', '2026-03-10'), strftime('%s', '2026-03-20')),
  ('019579a0-7001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', 'outgoing', 'final', 'INV-2026-004', 'Elevator maintenance contract - Q2 2026',        8500.00,  'Pacific Elevators Inc.',      0, strftime('%s', '2026-04-30'), strftime('%s', '2026-03-25'), strftime('%s', '2026-03-25')),
  ('019579a0-7001-7000-8000-000000000005', '019579a0-1000-7000-8000-000000000001', 'outgoing', 'draft', 'INV-2026-005', 'Window cleaning - all units exterior',           4200.00,  'Crystal Clear Windows',       0, strftime('%s', '2026-05-20'), strftime('%s', '2026-03-28'), strftime('%s', '2026-03-28')),
  ('019579a0-7001-7000-8000-000000000006', '019579a0-1000-7000-8000-000000000001', 'incoming', 'final', 'RCV-2026-001', 'Insurance claim - water damage unit 301',        12500.00, NULL,                          1, NULL,                         strftime('%s', '2026-01-20'), strftime('%s', '2026-02-10'));

-- ============================================================
-- Inbox Messages (threads with replies)
-- ============================================================

-- Thread 1: Noise complaint
INSERT INTO inbox_messages (id, strataId, threadId, subject, message, senderUserId, senderName, senderEmail, sentAt, isUnread) VALUES
  ('019579a0-8001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', 'thread-001', 'Noise Complaint - Unit 402',
   'Hi Council,\n\nI wanted to report ongoing noise issues from unit 402. There has been loud music playing past 11pm on multiple weeknights this month. I have tried speaking with the resident directly but the issue persists.\n\nCould the council please address this?\n\nThanks,\nEmma',
   '019579a0-0005-7000-8000-000000000005', 'Emma Thompson', 'tills13+emma.thompson@gmail.com', strftime('%s', '2026-03-20 22:15:00'), 0),

  ('019579a0-8001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', 'thread-001', 'RE: Noise Complaint - Unit 402',
   'Hi Emma,\n\nThank you for bringing this to our attention. I will send a formal notice to unit 402 regarding quiet hours (10pm-8am as per our bylaws). If the issue continues after the notice, we will escalate the matter.\n\nBest regards,\nSarah Chen\nStrata Administrator',
   '019579a0-0001-7000-8000-000000000001', 'Sarah Chen', 'tills13+sarah.chen@gmail.com', strftime('%s', '2026-03-21 09:30:00'), 0);

-- Thread 2: Maintenance request
INSERT INTO inbox_messages (id, strataId, threadId, subject, message, senderUserId, senderName, senderEmail, sentAt, isUnread) VALUES
  ('019579a0-8001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', 'thread-002', 'Hallway Light Out - 3rd Floor',
   'The light at the east end of the 3rd floor hallway has been out for about a week. Could maintenance please replace it?\n\nThanks,\nAlex',
   '019579a0-0006-7000-8000-000000000006', 'Alex Patel', 'tills13+alex.patel@gmail.com', strftime('%s', '2026-03-23 14:20:00'), 0),

  ('019579a0-8001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', 'thread-002', 'RE: Hallway Light Out - 3rd Floor',
   'Thanks for reporting this Alex. I have put in a work order with our maintenance contractor. Should be fixed within 48 hours.\n\n- Sarah',
   '019579a0-0001-7000-8000-000000000001', 'Sarah Chen', 'tills13+sarah.chen@gmail.com', strftime('%s', '2026-03-23 16:45:00'), 0),

  ('019579a0-8001-7000-8000-000000000005', '019579a0-1000-7000-8000-000000000001', 'thread-002', 'RE: Hallway Light Out - 3rd Floor',
   'Fixed! Thank you for the quick turnaround.',
   '019579a0-0006-7000-8000-000000000006', 'Alex Patel', 'tills13+alex.patel@gmail.com', strftime('%s', '2026-03-25 11:00:00'), 1);

-- Thread 3: Parking issue
INSERT INTO inbox_messages (id, strataId, threadId, subject, message, senderUserId, senderName, senderEmail, sentAt, isUnread) VALUES
  ('019579a0-8001-7000-8000-000000000006', '019579a0-1000-7000-8000-000000000001', 'thread-003', 'Visitor Parking Abuse',
   'Council,\n\nThere is a silver Honda Civic that has been parked in visitor spot #3 for over two weeks now. I believe it belongs to someone in the building and is not actually a visitor vehicle. This is unfair to residents who have legitimate guests needing parking.\n\nPlease investigate.\n\nDavid Kim, Unit 202',
   '019579a0-0004-7000-8000-000000000004', 'David Kim', 'tills13+david.kim@gmail.com', strftime('%s', '2026-03-25 08:00:00'), 1);

-- Thread 4: External contact (from a vendor)
INSERT INTO inbox_messages (id, strataId, threadId, subject, message, senderName, senderEmail, sentAt, isUnread) VALUES
  ('019579a0-8001-7000-8000-000000000007', '019579a0-1000-7000-8000-000000000001', 'thread-004', 'Elevator Modernization Quote Follow-up',
   'Dear Oceanview Towers Strata Council,\n\nFollowing up on our site visit last week, please find our detailed quote for the elevator modernization project. We are proposing a full cab interior renovation and controller upgrade for both elevators.\n\nTotal estimated cost: $185,000\nTimeline: 8-10 weeks per elevator\n\nPlease do not hesitate to reach out with any questions.\n\nBest regards,\nMark Stevens\nPacific Elevators Inc.',
   'Mark Stevens', 'tills13+mark.stevens@gmail.com', strftime('%s', '2026-03-26 10:30:00'), 1);

-- Thread 5: Move-in notification
INSERT INTO inbox_messages (id, strataId, threadId, subject, message, senderUserId, senderName, senderEmail, sentAt, isUnread) VALUES
  ('019579a0-8001-7000-8000-000000000008', '019579a0-1000-7000-8000-000000000001', 'thread-005', 'Move-in Notification - Unit 301',
   'Hi Sarah,\n\nJust a heads up that I will be moving some new furniture into my unit on April 8th. The movers are scheduled between 9am and 2pm. I will make sure they use the service elevator and protect the hallway floors.\n\nDo I need to fill out any forms or book the elevator?\n\nThanks,\nEmma',
   '019579a0-0005-7000-8000-000000000005', 'Emma Thompson', 'tills13+emma.thompson@gmail.com', strftime('%s', '2026-03-27 16:00:00'), 1);

-- ============================================================
-- Inbox Thread Chats (internal council discussion on threads)
-- ============================================================

INSERT INTO inbox_thread_chats (id, threadId, messageId, message, userId, sentAt) VALUES
  ('019579a0-8501-7000-8000-000000000001', 'thread-001', '019579a0-8001-7000-8000-000000000001', 'I have heard this as well from my unit. The noise is definitely excessive.', '019579a0-0007-7000-8000-000000000007', strftime('%s', '2026-03-21 08:00:00')),
  ('019579a0-8501-7000-8000-000000000002', 'thread-001', '019579a0-8001-7000-8000-000000000001', 'Formal notice sent to unit 402 today. Will follow up in a week.', '019579a0-0001-7000-8000-000000000001', strftime('%s', '2026-03-21 10:00:00')),
  ('019579a0-8501-7000-8000-000000000003', 'thread-003', '019579a0-8001-7000-8000-000000000006', 'I checked the registration - the car belongs to someone in unit 201. I will send them a warning.', '019579a0-0001-7000-8000-000000000001', strftime('%s', '2026-03-25 12:00:00'));

-- ============================================================
-- Strata Widgets (dashboard widgets)
-- ============================================================

INSERT INTO strata_widgets (id, strataId, type, title) VALUES
  ('019579a0-9001-7000-8000-000000000001', '019579a0-1000-7000-8000-000000000001', 'events_upcoming', 'Upcoming Events'),
  ('019579a0-9001-7000-8000-000000000002', '019579a0-1000-7000-8000-000000000001', 'info_contact',    'Building Contact Info'),
  ('019579a0-9001-7000-8000-000000000003', '019579a0-1000-7000-8000-000000000001', 'info',            'Welcome'),
  ('019579a0-9001-7000-8000-000000000004', '019579a0-1000-7000-8000-000000000001', 'files_recent',    'Recent Documents');

-- ============================================================
-- Widget Info (content for info widgets)
-- ============================================================

INSERT INTO widget_info (widgetId, body) VALUES
  ('019579a0-9001-7000-8000-000000000002', '<p><strong>Building Manager:</strong> Sarah Chen</p><p>Email: tills13+sarah.chen@gmail.com</p><p>Phone: 604-555-0101</p><p><strong>Emergency Maintenance:</strong> 604-555-9999</p><p><strong>Concierge Hours:</strong> 8am - 10pm daily</p>'),
  ('019579a0-9001-7000-8000-000000000003', '<p>Welcome to Oceanview Towers! This is your strata dashboard where you can find important documents, upcoming events, and communicate with the strata council.</p><p>If you are new to the building, please review the bylaws and parking rules in the Files section.</p>');
