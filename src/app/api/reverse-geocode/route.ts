// app/api/reverse-geocode/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return new Response(
      JSON.stringify({ error: "lat and lng parameters are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Attempt Nominatim first
    const nominatimRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your@email.com)", // Update this
        },
        next: { revalidate: 60 }, // Optional: cache response for 60s
      }
    );

    if (nominatimRes.ok) {
      const data = await nominatimRes.json();
      if (data.display_name) {
        return Response.json({ address: data.display_name });
      }
    }

    // Fallback to BigDataCloud
    const fallbackRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      const address = [
        data.locality,
        data.principalSubdivision,
        data.countryName,
      ]
        .filter(Boolean)
        .join(", ");

      return Response.json({
        address: address || `Location (${lat}, ${lng})`,
      });
    }

    // Final fallback
    return Response.json({ address: `Location (${lat}, ${lng})` });
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return new Response(
      JSON.stringify({
        error: "Reverse geocoding failed",
        address: `Location (${lat}, ${lng})`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
