import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

type EbookLeadBody = {
  hospitalRole: string;
  phone: string;
  marketingOptIn?: boolean;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 }
    );
  }

  const b = body as EbookLeadBody;

  if (!isNonEmptyString(b.hospitalRole) || !isNonEmptyString(b.phone)) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 }
    );
  }

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return NextResponse.json(
      { ok: false, error: "missing_google_env" },
      { status: 500 }
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "시트1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            createdAt,
            b.hospitalRole.trim(),
            b.phone.trim(),
            b.marketingOptIn ? "TRUE" : "FALSE",
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[ebook-lead] google sheets error", error);
    return NextResponse.json(
      { ok: false, error: "google_sheets_failed" },
      { status: 500 }
    );
  }
}