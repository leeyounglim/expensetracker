import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { decrypt } from "@/lib/imap/encryption";

export async function POST() {
    console.log("yes")
  const supabase = await createClient();

  // get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // get credentials from supabase
  const { data: setting, error } = await supabase
  .from("email_sync_settings")
  .select("email, app_password, email_sync_banks(bank_id, enabled, banks(bank_email))")
  .eq("user_id", user.id)
  .single();

  if (error || !setting) return NextResponse.json({ error: "No email settings found" }, { status: 404 });

  // decrypt password
  const password = decrypt(setting.app_password);

  // today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: setting.email,
      pass: password,
    },
    logger: false,
  });

  await client.connect();

  const lock = await client.getMailboxLock("INBOX");
  try {
    const uids = await client.search({ since: today });
    if (!uids) return;

    if (uids.length === 0) {
      console.log("No emails today");
      return NextResponse.json({ fetched: 0 });
    }

    for await (const msg of client.fetch(uids, {
      envelope: true,
      source: true,
    })) {

    if(!msg.source) continue
      const parsed = await simpleParser(msg.source);
      console.log("Subject:", msg.envelope?.subject);
      console.log("From:", msg.envelope?.from?.[0]?.address);
      console.log("Text:", parsed.text);
      console.log("---");
    }

    return NextResponse.json({ fetched: uids.length });

  } finally {
    lock.release();
    await client.logout();
  }
}