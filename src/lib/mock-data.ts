// Mock data for SuccessPath AI MVP - all business data lives here

export type RiskLevel = "low" | "medium" | "high";
export type JourneyPhase = "pre-arrival" | "orientation" | "semester-1" | "ongoing";

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  program: string;
  university: string;
  phase: JourneyPhase;
  arrivalDate: string;
  readinessScore: number;
  riskLevel: RiskLevel;
  gpa: number;
  attendance: number;
  engagement: number;
  wellbeing: number;
  avatar: string;
  languages: string[];
  interests: string[];
}

export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: "s1", name: "Aditi Sharma", email: "aditi@student.edu", country: "India", flag: "🇮🇳",
    program: "MS Computer Science", university: "Northfield University", phase: "semester-1",
    arrivalDate: "2026-01-08", readinessScore: 82, riskLevel: "low",
    gpa: 3.7, attendance: 94, engagement: 88, wellbeing: 78,
    avatar: "AS", languages: ["English", "Hindi"], interests: ["AI", "Cricket", "Cooking"],
  },
  {
    id: "s2", name: "Chen Wei", email: "chen@student.edu", country: "China", flag: "🇨🇳",
    program: "MBA", university: "Northfield University", phase: "semester-1",
    arrivalDate: "2026-01-05", readinessScore: 61, riskLevel: "medium",
    gpa: 3.1, attendance: 76, engagement: 54, wellbeing: 48,
    avatar: "CW", languages: ["Mandarin", "English"], interests: ["Finance", "Photography"],
  },
  {
    id: "s3", name: "Fatima Al-Zahra", email: "fatima@student.edu", country: "UAE", flag: "🇦🇪",
    program: "BSc Biomedical Eng.", university: "Northfield University", phase: "orientation",
    arrivalDate: "2026-06-15", readinessScore: 74, riskLevel: "low",
    gpa: 3.5, attendance: 91, engagement: 82, wellbeing: 71,
    avatar: "FA", languages: ["Arabic", "English", "French"], interests: ["Medicine", "Art"],
  },
  {
    id: "s4", name: "Miguel Santos", email: "miguel@student.edu", country: "Brazil", flag: "🇧🇷",
    program: "MA Economics", university: "Northfield University", phase: "semester-1",
    arrivalDate: "2026-01-10", readinessScore: 44, riskLevel: "high",
    gpa: 2.4, attendance: 61, engagement: 38, wellbeing: 35,
    avatar: "MS", languages: ["Portuguese", "Spanish", "English"], interests: ["Football", "Music"],
  },
  {
    id: "s5", name: "Yuki Tanaka", email: "yuki@student.edu", country: "Japan", flag: "🇯🇵",
    program: "MS Data Science", university: "Northfield University", phase: "pre-arrival",
    arrivalDate: "2026-08-25", readinessScore: 58, riskLevel: "medium",
    gpa: 0, attendance: 0, engagement: 20, wellbeing: 65,
    avatar: "YT", languages: ["Japanese", "English"], interests: ["Anime", "Machine Learning"],
  },
  {
    id: "s6", name: "Kwame Mensah", email: "kwame@student.edu", country: "Ghana", flag: "🇬🇭",
    program: "MEng Civil", university: "Northfield University", phase: "ongoing",
    arrivalDate: "2025-08-20", readinessScore: 88, riskLevel: "low",
    gpa: 3.8, attendance: 96, engagement: 92, wellbeing: 84,
    avatar: "KM", languages: ["English", "Twi"], interests: ["Sustainability", "Debate"],
  },
  {
    id: "s7", name: "Priya Nair", email: "priya@student.edu", country: "India", flag: "🇮🇳",
    program: "PhD Chemistry", university: "Northfield University", phase: "ongoing",
    arrivalDate: "2024-08-18", readinessScore: 79, riskLevel: "medium",
    gpa: 3.4, attendance: 82, engagement: 60, wellbeing: 52,
    avatar: "PN", languages: ["Malayalam", "English"], interests: ["Research", "Yoga"],
  },
  {
    id: "s8", name: "Omar Haddad", email: "omar@student.edu", country: "Jordan", flag: "🇯🇴",
    program: "MS Cybersecurity", country_alt: undefined as any, university: "Northfield University",
    phase: "semester-1", arrivalDate: "2026-01-07", readinessScore: 66, riskLevel: "medium",
    gpa: 3.0, attendance: 79, engagement: 62, wellbeing: 58,
    avatar: "OH", languages: ["Arabic", "English"], interests: ["Chess", "Hiking"],
  } as StudentProfile,
];

export const READINESS_MODULES = [
  { id: "visa", title: "Visa & Documentation", icon: "📄", progress: 100, status: "complete" },
  { id: "housing", title: "Housing & Accommodation", icon: "🏠", progress: 80, status: "in-progress" },
  { id: "finance", title: "Banking & Finance", icon: "💳", progress: 60, status: "in-progress" },
  { id: "culture", title: "Cultural Orientation", icon: "🌍", progress: 45, status: "in-progress" },
  { id: "academic", title: "Academic Expectations", icon: "🎓", progress: 30, status: "started" },
  { id: "health", title: "Health & Insurance", icon: "🏥", progress: 90, status: "in-progress" },
  { id: "language", title: "Language & Communication", icon: "💬", progress: 55, status: "in-progress" },
  { id: "safety", title: "Safety & Emergency", icon: "🛡️", progress: 20, status: "started" },
];

export const READINESS_QUESTIONS = [
  { id: "q1", category: "Academic", text: "How confident are you with academic writing in English?" },
  { id: "q2", category: "Cultural", text: "How familiar are you with campus culture and norms?" },
  { id: "q3", category: "Financial", text: "Do you have a clear monthly budget planned?" },
  { id: "q4", category: "Social", text: "How comfortable are you meeting new people?" },
  { id: "q5", category: "Emotional", text: "How prepared do you feel to manage homesickness?" },
  { id: "q6", category: "Practical", text: "Do you know how to open a local bank account?" },
  { id: "q7", category: "Language", text: "How confident is your spoken English in group settings?" },
  { id: "q8", category: "Health", text: "Do you understand the local healthcare system?" },
];

export const JOURNEY_MILESTONES = [
  { id: "m1", phase: "pre-arrival", title: "Accept offer & pay deposit", date: "2025-11-01", complete: true },
  { id: "m2", phase: "pre-arrival", title: "Apply for student visa", date: "2025-11-15", complete: true },
  { id: "m3", phase: "pre-arrival", title: "Book flight & accommodation", date: "2025-12-10", complete: true },
  { id: "m4", phase: "orientation", title: "Attend welcome week", date: "2026-01-05", complete: true },
  { id: "m5", phase: "orientation", title: "Register for classes", date: "2026-01-06", complete: true },
  { id: "m6", phase: "semester-1", title: "Midterm check-in", date: "2026-02-20", complete: false },
  { id: "m7", phase: "semester-1", title: "Career fair", date: "2026-03-15", complete: false },
  { id: "m8", phase: "ongoing", title: "Internship search", date: "2026-04-01", complete: false },
];

export const REPORT_STRENGTHS = ["Academic curiosity", "Language foundations", "Support network"];
export const REPORT_IMPROVE = ["Financial planning", "Cultural orientation", "Healthcare literacy"];
export const REPORT_NEXT_STEPS = [
  "Complete the Cultural Orientation module this week",
  "Book a 1:1 with your international advisor",
  "Set up a local bank account before arrival",
  "Join one student club matching your interests",
];

export const COMPANION_STARTERS = [
  "I'm feeling homesick — what can I do?",
  "Help me plan my week",
  "How do I open a bank account here?",
  "I don't understand my professor's feedback",
  "How can I make friends on campus?",
  "What are the rules on part-time work?",
];

export const COMPANION_RESPONSES: Record<string, string> = {
  homesick: "That's completely normal, especially in your first semester. Try: (1) schedule a weekly video call with family, (2) join one cultural student club this week, (3) recreate one comfort meal from home. Would you like me to find your country's student association?",
  bank: "You'll typically need: passport, I-20/visa, proof of address (dorm letter works), and SSN or ITIN. Chase, Bank of America, and local credit unions all have student accounts with no minimum balance. Want me to draft an email to the campus international office for an intro letter?",
  friends: "Three high-signal moves: (1) attend 2 club fair booths this week, (2) form a study group in your hardest class — proximity + shared goals build faster friendships than parties, (3) say yes to the first three social invites, even if tired. Which class feels hardest right now?",
  default: "I hear you. Let's break this down — can you tell me a bit more about what's on your mind? I can help with academics, wellbeing, cultural adjustment, finances, or connecting you with campus resources.",
};

export const COMMUNITY_POSTS = [
  { id: "p1", author: "Chen Wei", avatar: "CW", flag: "🇨🇳", time: "2h", title: "Anyone want to try the new ramen place downtown?", body: "Thinking Saturday 7pm, group of 4-5. First time trying real US-style ramen 😅", likes: 12, comments: 5, tag: "Social" },
  { id: "p2", author: "Aditi Sharma", avatar: "AS", flag: "🇮🇳", time: "5h", title: "Study group for CS 5040 — Distributed Systems?", body: "Midterm coming up. I have Prof. Miller's old exams. Library, Sundays 2pm.", likes: 24, comments: 11, tag: "Academic" },
  { id: "p3", author: "Fatima Al-Zahra", avatar: "FA", flag: "🇦🇪", time: "1d", title: "Where to find halal groceries near campus?", body: "Just arrived, need recommendations! Also open to cooking swaps.", likes: 18, comments: 9, tag: "Life" },
  { id: "p4", author: "Miguel Santos", avatar: "MS", flag: "🇧🇷", time: "1d", title: "Feeling overwhelmed by academic writing", body: "In Brazil we write very differently. Any tutors that helped you?", likes: 31, comments: 14, tag: "Support" },
];

export const WELLBEING_TIPS = [
  { id: "w1", title: "5-minute grounding exercise", desc: "Notice 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.", tag: "Anxiety" },
  { id: "w2", title: "Sleep reset protocol", desc: "No screens 30 min before bed, same wake time daily for one week.", tag: "Sleep" },
  { id: "w3", title: "Homesickness ritual", desc: "Cook one home dish per week. Send a voice note to one person from home.", tag: "Belonging" },
  { id: "w4", title: "Study without burnout", desc: "50 min focus + 10 min walk outside. Repeat 4x, then longer break.", tag: "Focus" },
];

export const INTERVENTIONS = [
  { id: "i1", studentId: "s4", type: "Academic tutoring", status: "scheduled", date: "2026-02-05", note: "Assigned Econ tutor for 4 weeks." },
  { id: "i2", studentId: "s2", type: "Wellbeing check-in", status: "completed", date: "2026-01-28", note: "Counseling referral accepted." },
  { id: "i3", studentId: "s7", type: "Mentor pairing", status: "in-progress", date: "2026-01-22", note: "Paired with senior PhD peer." },
  { id: "i4", studentId: "s4", type: "Financial aid review", status: "open", date: "2026-02-08", note: "Application submitted, waiting on committee." },
];

export const RISK_FACTORS = [
  { factor: "Attendance below 70%", weight: 0.28 },
  { factor: "GPA drop > 0.5", weight: 0.22 },
  { factor: "Low engagement (chat/portal)", weight: 0.18 },
  { factor: "Wellbeing score < 50", weight: 0.17 },
  { factor: "Missed advisor meetings", weight: 0.09 },
  { factor: "Financial holds", weight: 0.06 },
];

export const RETENTION_TREND = [
  { month: "Aug", retention: 96, atRisk: 8 },
  { month: "Sep", retention: 94, atRisk: 12 },
  { month: "Oct", retention: 93, atRisk: 15 },
  { month: "Nov", retention: 91, atRisk: 19 },
  { month: "Dec", retention: 90, atRisk: 22 },
  { month: "Jan", retention: 92, atRisk: 17 },
  { month: "Feb", retention: 93, atRisk: 14 },
];

export const COHORT_BREAKDOWN = [
  { country: "India", count: 84, atRisk: 9 },
  { country: "China", count: 71, atRisk: 14 },
  { country: "Brazil", count: 22, atRisk: 6 },
  { country: "UAE", count: 18, atRisk: 2 },
  { country: "Japan", count: 15, atRisk: 3 },
  { country: "Ghana", count: 12, atRisk: 1 },
  { country: "Jordan", count: 9, atRisk: 2 },
];

export function respondToPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("homesick") || p.includes("miss home")) return COMPANION_RESPONSES.homesick;
  if (p.includes("bank") || p.includes("money") || p.includes("account")) return COMPANION_RESPONSES.bank;
  if (p.includes("friend") || p.includes("lonely") || p.includes("meet")) return COMPANION_RESPONSES.friends;
  if (p.includes("plan") || p.includes("week") || p.includes("schedule")) return "Let's map your week. Share your fixed classes and I'll suggest study blocks, one social event, and two wellbeing windows.";
  if (p.includes("professor") || p.includes("feedback") || p.includes("grade")) return "Ask for a 15-min office hours slot. Bring the specific comment and one question: 'Can you show me an example of what strong looks like here?' That single question reframes feedback from criticism to craft.";
  if (p.includes("work") || p.includes("job") || p.includes("intern")) return "On an F-1 visa you're limited to 20 hrs/week on-campus during term. CPT/OPT open off-campus work later. Want me to link to the international office's work policy PDF?";
  return COMPANION_RESPONSES.default;
}
