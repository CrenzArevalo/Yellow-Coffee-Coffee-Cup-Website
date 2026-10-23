module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { action, item, adminPin } = req.body;

    // Verify Admin PIN
    const expectedPin = process.env.ADMIN_SECRET_PIN || 'coffee2026!';
    if (!adminPin || adminPin !== expectedPin) {
        return res.status(401).json({ error: 'Invalid PIN' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

            if (!response.ok) throw new Error('Failed to create item');
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

            if (!response.ok) throw new Error('Failed to update item');
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

            if (!response.ok) throw new Error('Failed to delete item');
            return res.status(200).json({ success: true });
        }

        return res.status(400).json({ error: 'Invalid action' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
