import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
const { Pool } = pg;

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'bagas3005',
    port: 5432,
});

app.get('/', (req, res, next) => { // Fungsi GET untuk menampilkan data dari tabel biodata
    console.log("TEST DATA: ");
    pool.query('SELECT * FROM biodata') // Menampilkan semua data dari tabel biodata
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
        .catch(err => { // Menangani error jika terjadi kesalahan saat query
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => { // Menjalankan server pada port yang ditentukan
    console.log(`Server is running on port ${port}`);
});