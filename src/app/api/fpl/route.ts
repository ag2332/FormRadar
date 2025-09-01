
export async function GET() {
    const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/", {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  const data = await response.json();
  const transformed = { ...data, source: 'proxied-through-nextjs' };

  return new Response(JSON.stringify(transformed), {
    headers: { 'Content-Type': 'application/json' },
  });
}