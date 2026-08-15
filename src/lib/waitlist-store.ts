import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getFirebaseDb } from "@/lib/firebase-admin";
import type { WaitlistSubmission } from "@/lib/waitlist";

export async function saveWaitlistSignup(
  submission: WaitlistSubmission,
): Promise<"created" | "duplicate"> {
  const db = getFirebaseDb();
  const documentId = createHash("sha256").update(submission.email).digest("hex");
  const reference = db.collection("waitlistSignups").doc(documentId);

  return db.runTransaction(async (transaction) => {
    const existing = await transaction.get(reference);

    if (existing.exists) {
      return "duplicate";
    }

    transaction.create(reference, {
      email: submission.email,
      role: submission.role,
      projectSummary: submission.projectSummary,
      locale: submission.locale,
      source: "landing_page",
      createdAt: FieldValue.serverTimestamp(),
    });

    return "created";
  });
}
