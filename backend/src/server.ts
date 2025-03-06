import { Database } from 'bun:sqlite';

const db = new Database("data/bitqueue.db");
const query = db.query("select 'BitQueue!' as message");

console.log(query.get())
