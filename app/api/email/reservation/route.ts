import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function buildEmailHtml(data: {
  personalInfo: { fullName: string; email: string; phone: string };
  reservation: {
    serviceType: string;
    pickup: string;
    dropoff?: string;
    date: string;
    time: string;
    passengers: number;
    vehicleName?: string;
    tourName?: string;
    tourCategory?: string;
    extras?: string[];
    notes?: string;
    estimatedTotal: string;
  };
}) {
  const { personalInfo, reservation } = data;

  const extrasHtml =
    reservation.extras && reservation.extras.length > 0
      ? `<div class="section">
          <div class="section-title">Extras</div>
          <div class="extras-list">
            ${reservation.extras.map((e) => `<span class="extra-tag">${escapeHtml(e)}</span>`).join("")}
          </div>
        </div>`
      : "";

  const notesHtml = reservation.notes
    ? `<div class="section">
        <div class="section-title">Special Requests</div>
        <div class="info">${escapeHtml(reservation.notes)}</div>
      </div>`
    : "";

  const tourHtml = reservation.tourName
    ? `<div class="highlight"><strong>Tour:</strong> ${escapeHtml(reservation.tourName)}</div>`
    : "";

  const categoryHtml = reservation.tourCategory
    ? `<div class="info"><strong>Category:</strong> ${escapeHtml(reservation.tourCategory)}</div>`
    : "";

  const vehicleHtml = reservation.vehicleName
    ? `<div class="info"><strong>Vehicle:</strong> ${escapeHtml(reservation.vehicleName)}</div>`
    : "";

  const dropoffHtml = reservation.dropoff
    ? `<div class="info"><strong>Drop-off:</strong> ${escapeHtml(reservation.dropoff)}</div>`
    : "";

  return `<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reservation Request</title>
  <style>
    body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; color: #333; padding: 40px 20px; }
    .container { background-color: #ffffff; padding: 40px; border-radius: 12px; max-width: 700px; margin: 0 auto; box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px; }
    .header h2 { color: #2c3e50; font-size: 28px; margin-bottom: 5px; }
    .header p { color: #777; font-size: 16px; }
    .badge { display: inline-block; background-color: #e97730; color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 14px; font-weight: 600; text-transform: capitalize; margin-top: 8px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 15px; border-left: 4px solid #e97730; padding-left: 10px; }
    .info { background-color: #f9fafb; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; font-size: 15px; }
    .info strong { color: #2c3e50; }
    .highlight { background-color: #fff7ed; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; font-size: 15px; border-left: 3px solid #e97730; }
    .extras-list { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px; }
    .extra-tag { background-color: #eef2ff; padding: 6px 12px; border-radius: 20px; font-size: 13px; color: #4338ca; }
    .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #aaa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Ashab Tours</h2>
      <p>New Reservation Request</p>
      <span class="badge">${escapeHtml(reservation.serviceType)}</span>
    </div>

    <div class="section">
      <div class="section-title">Customer Information</div>
      <div class="info"><strong>Name:</strong> ${escapeHtml(personalInfo.fullName)}</div>
      <div class="info"><strong>Email:</strong> ${escapeHtml(personalInfo.email)}</div>
      <div class="info"><strong>Phone:</strong> ${escapeHtml(personalInfo.phone)}</div>
    </div>

    <div class="section">
      <div class="section-title">Trip Details</div>
      <div class="info"><strong>Service:</strong> ${escapeHtml(reservation.serviceType)}</div>
      ${tourHtml}
      ${categoryHtml}
      ${vehicleHtml}
      <div class="info"><strong>Pick-up:</strong> ${escapeHtml(reservation.pickup)}</div>
      ${dropoffHtml}
      <div class="info"><strong>Date:</strong> ${escapeHtml(reservation.date)}</div>
      <div class="info"><strong>Time:</strong> ${escapeHtml(reservation.time)}</div>
      <div class="info"><strong>Passengers:</strong> ${escapeHtml(String(reservation.passengers))}</div>
    </div>

    ${extrasHtml}
    ${notesHtml}

    <div class="section">
      <div class="section-title">Price</div>
      <div class="highlight"><strong>Estimated Total:</strong> ${escapeHtml(reservation.estimatedTotal)}</div>
    </div>

    <div class="footer">
      Ashab Tours &mdash; Premium Transport Services in Morocco
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (
      !data.personalInfo?.fullName ||
      !data.personalInfo?.email ||
      !data.personalInfo?.phone ||
      !data.reservation
    ) {
      return NextResponse.json(
        { error: "Missing required reservation fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const serviceLabel =
      {
        transfer: "Transfer",
        tour: "Tour",
        disposal: "Private Driver",
      }[data.reservation.serviceType as string] || "Reservation";

    const subject = `New ${serviceLabel} Reservation - ${data.personalInfo.fullName}`;

    await transporter.sendMail({
      from: `"Ashab Tours Reservations" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.EMAIL_RECIPIENT || "reservationashabtours@gmail.com",
      replyTo: data.personalInfo.email,
      subject,
      html: buildEmailHtml(data),
    });

    return NextResponse.json(
      { success: true, message: "Reservation email sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
