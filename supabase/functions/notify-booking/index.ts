import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: "bookingId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();

    if (error || !booking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const dateFormatted = new Date(booking.preferred_date).toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const emailBody = `
New Booking Received - Denteez Panel Beating

A new appointment has been booked through the website.

Customer Details:
- Name: ${booking.name}
- Phone: ${booking.phone}
- Email: ${booking.email || "Not provided"}

Vehicle Details:
- Make: ${booking.vehicle_make}
- Model: ${booking.vehicle_model}
- Year: ${booking.vehicle_year || "Not provided"}

Damage Description:
${booking.damage_description}

Appointment Requested:
- Date: ${dateFormatted}
- Time: ${booking.preferred_time}

Booking ID: ${booking.id}
Status: ${booking.status}

Please contact the customer to confirm the appointment.
    `.trim();

    // Use Supabase's built-in email or log for the business owner
    // In production, this would integrate with an email service
    // For now, we store a notification record and log it
    console.log("Booking notification email prepared:", emailBody);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Booking notification prepared",
        booking: {
          id: booking.id,
          name: booking.name,
          date: dateFormatted,
          time: booking.preferred_time,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
