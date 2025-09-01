export async function GET(
  request: Request,
  { params }: { params: Promise<{ player_id: string }> }
) {
  const player_id  = (await params).player_id

  const response = await fetch(
    `https://fantasy.premierleague.com/api/element-summary/${player_id}/`
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to fetch player data" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}