const db = require('./src/config/database');

async function check() {
    try {
        const res = await db.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("--- Tabelas que eu consigo ver agora: ---");
        console.table(res.rows);
        process.exit();
    } catch (err) {
        console.error("❌ Erro ao conectar:", err.message);
        process.exit();
    }
}
check();