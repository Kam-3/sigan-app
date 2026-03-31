const db = require('./src/config/database');

async function identificarBanco() {
    try {
        const res = await db.query(`
            SELECT 
                current_database() AS banco, 
                current_user AS usuario, 
                inet_server_addr() AS ip, 
                inet_server_port() AS porta
        `);
        console.log("--- IDENTIDADE DA CONEXÃO ---");
        console.table(res.rows);
        
        const tabelas = await db.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("--- TABELAS ENCONTRADAS ---");
        console.table(tabelas.rows);
        
        process.exit();
    } catch (err) {
        console.error("Erro no teste:", err.message);
        process.exit();
    }
}
identificarBanco();