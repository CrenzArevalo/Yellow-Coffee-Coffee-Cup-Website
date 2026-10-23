module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Missing item ID' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    try {
        const getRes = await fetch(`${supabaseUrl}/rest/v1/printables?id=eq.${id}&select=downloads`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        });
        const items = await getRes.json();
        if (!items || items.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const newDownloads = (items[0].downloads || 0) + 1;

        const patchRes = await fetch(`${supabaseUrl}/rest/v1/printables?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ downloads: newDownloads })
        });

        if (!patchRes.ok) throw new Error('Failed to update download count');

        return res.status(200).json({ success: true, downloads: newDownloads });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
