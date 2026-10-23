module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Destructure action, item, and adminPin from the incoming request body
    const { action, item, adminPin } = req.body;

    // Temporary bypass for testing (skipping strict PIN check)
    console.log("Bypassing PIN check for testing. Received PIN:", adminPin);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

    try {
        if (action === 'create') {
            const response = await fetch(`${supabaseUrl}/rest/v1/printables`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase Create Failed (${response.status}): ${errText}`);
            }
            const data = await response.json();
            return res.status(200).json({ success: true, data });
        } 
        else if (action === 'update') {
            const response = await fetch(`${supabaseUrl}/rest/v1/printables?id=eq.${item.id}`, {
                method: 'PATCH',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase Update Failed (${response.status}): ${errText}`);
            }
            const data = await response.json();
            return res.status(200).json({ success: true, data });
        }
        else if (action === 'delete') {
            const response = await fetch(`${supabaseUrl}/rest/v1/printables?id=eq.${req.body.id}`, {
                method: 'DELETE',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`
                }
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Supabase Delete Failed (${response.status}): ${errText}`);
            }
            return res.status(200).json({ success: true });
        }

        return res.status(400).json({ error: 'Invalid action' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
