const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const agent = chai.request.agent(`${process.env.API_URL}`)
const expect = chai.expect


describe('Populate lessons using API', function () {

    describe('setup admin', function () {
        it('should login as admin', function (done) {
            agent
            .post('/login')
            .send({
                username: 'admin',
                password: 'admin123'
            })
            .end(function (err, res) {
                // Create admin if err
                if (err) {
                    agent
                    .post('/users')
                    .send({
                        fullname: 'Global Admin',
                        username: 'admin',
                        password: 'admin123'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        // Login as admin
                        agent
                        .post('/login')
                        .send({
                            username: 'admin',
                            password: 'admin123'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                // Else done
                else {
                    done()
                }
            })
        })
    })

    describe('populate chapters', function () {
        it('should create chapter 1', function (done) {
            agent
            .get('/chapters/1')
            .end(function (err, res) {
                // Create HTML Chapter if not exist
                if (err) {
                    agent
                    .post('/chapters')
                    .send({
                        title: 'Perkenalan HTML',
                        order: 1,
                        description: 'HTML atau *Hyper Text Markup Language* adalah *file* sederhana yang digunakan oleh *browser* (Firefox/Chrome) untuk menampilkan sebuah situs web.\n\nKita akan mencoba membuat HTML sederhana sehingga WebGL kita dapat dijalankan di *browser* kita.'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        done()
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })

        it('should create chapter 2', function (done) {
            agent
            .get('/chapters/2')
            .end(function (err, res) {
                // Create Javascript chapter if not exist
                if (err) {
                    agent
                    .post('/chapters')
                    .send({
                        title: 'Perkenalan Javascript',
                        order: 2,
                        description: 'Anda akan belajar bagaimana program dapat dijalankan pada HTML dengan menggunakan bahasa Javascript.'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        done()
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })

        it('should create chapter 3', function (done) {
            agent
            .get('/chapters/3')
            .end(function (err, res) {
                // Create Javascript chapter if not exist
                if (err) {
                    agent
                    .post('/chapters')
                    .send({
                        title: 'Perkenalan WebGL',
                        order: 3,
                        description: 'Anda akan berkenalan dengan WebGL, pemrogramman grafik untuk web.'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        done()
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
    })

    describe('populate lesson', function () {
        it('should create chapter 1 lesson 1', function (done) {
            agent
            .get('/lessons/1')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/1/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/1')
                        .send({
                            title: 'HTML Intro',
                            order: 1,
                            description: 'Kita akan membuat sebuah *file* HTML sederhana.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2', function (done) {
            agent
            .get('/lessons/2')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/1/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/2')
                        .send({
                            title: 'HTML Sederhana',
                            order: 2,
                            description: 'Kita akan membuat sebuah *file* HTML sederhana.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 3', function (done) {
            agent
            .get('/lessons/3')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/1/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/3')
                        .send({
                            title: 'HTML Tag',
                            order: 3,
                            description: 'HTML terdiri dari *tag*. Kita akan mempelajari bagaimana HTML dapat dibuat dengan menggunakan *tag*-*tag* berikut ini.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4', function (done) {
            agent
            .get('/lessons/4')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/1/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/4')
                        .send({
                            title: 'Tag Attribute',
                            order: 4,
                            description: '*Tag* HTML dapat memiliki *attribute* untuk mengubah cara kerja/tampilannya. Kita akan melihat bagaimana *attribute* dapat berpengaruh pada *tag* yang kita pelajari sebelumnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 1', function (done) {
            agent
            .get('/lessons/5')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/2/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/5')
                        .send({
                            title: 'Persiapan awal Javascript',
                            order: 1,
                            description: 'Javascript digunakan di atas HTML. Kita akan melihat bagaimana cara untuk memasang Javascript di atas HTML.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2', function (done) {
            agent
            .get('/lessons/6')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/2/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/6')
                        .send({
                            title: 'Pemrograman',
                            order: 2,
                            description: 'Kita akan belajar bagaimana pemrograman dapat dilakukan dengan menggunakan Javascript.\nBeberapa topik yang akan kita lakukan:\n\n1. Menampilkan hasil\n2. Menggunakan variabel untuk menampung hasil sementara\n3. Melakukan operasi matematika\n4. Melakukan perulangan otomatis\n5. Melakukan pemilihan'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 3', function (done) {
            agent
            .get('/lessons/7')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/2/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/7')
                        .send({
                            title: 'Function dalam Javascript',
                            order: 3,
                            description: 'Kita akan membuat *function* atau fungsi dalam bahasa matematika menggunakan Javascript. *Function* berguna untuk memisahkan *code* kita dalam satu baris sehingga dapat dipakai berulang-ulang. Sanggat ber-fungsi! (canda).'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 0', function (done) {
            agent
            .get('/lessons/8')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/3/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/8')
                        .send({
                            title: 'Contoh WebGL',
                            order: 0,
                            description: 'Anda akan melihat berbagai contoh program dengan WebGL. Perhatikan penulisannya dan *file*-*file* yang dibutuhkan.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 1', function (done) {
            agent
            .get('/lessons/9')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/3/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/9')
                        .send({
                            title: 'Persiapan awal WebGL',
                            order: 1,
                            description: 'Pemrograman grafik adalah membuat sebuah gambar atau grafik pada media digital dengan menggunakan *code* program.\n\nKita akan membuat persiapan awal sebelum kita memulai pemrograman grafik. Pada *lesson* ini, kita akan `canvas` di mana gambar kita akan di letakkan.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2', function (done) {
            agent
            .get('/lessons/10')
            .end(function (err, res) {
                // Create HTML Intro lesson if not exist
                if (err) {
                    agent
                    .post('/chapters/3/lessons')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/lessons/10')
                        .send({
                            title: 'Menggambar Segitiga',
                            order: 2,
                            description: 'Kita akan menggambar sebuah segitiga berwarna menggunakan WebGL.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            done()
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        // it('should create chapter 3 lesson 1', function (done) {
        //     agent
        //     .get('/lessons/8')
        //     .end(function (err, res) {
        //         // Create HTML Intro lesson if not exist
        //         if (err) {
        //             agent
        //             .post('/chapters/3/lessons')
        //             .send({})
        //             .end(function (err, res) {
        //                 expect(res).to.have.status(200)
        //                 agent
        //                 .put('/lessons/8')
        //                 .send({
        //                     title: 'zzzz',
        //                     order: 1,
        //                     description: 'zzzz'
        //                 })
        //                 .end(function (err, res) {
        //                     expect(res).to.have.status(200)
        //                     done()
        //                 })
        //             })
        //         }
        //         else {
        //             expect(res).to.have.status(200)
        //             done()
        //         }

        //     })
        // })
    })

    describe('populate step', function () {
        it('should create chapter 1 lesson 1 step 1', function (done) {
            agent
            .get('/steps/1')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/1/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/1')
                        .send({
                            order: 1,
                            title: 'HTML Kosong',
                            description: 'Bisa dilihat di samping, *file* **index.html** berisi konten minimal yang dibutuhkan HTML.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/1/steps/1/sources')
                            .send({
                                content: '<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2 step 1', function (done) {
            agent
            .get('/steps/2')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/2/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/2')
                        .send({
                            order: 1,
                            title: 'Nama file',
                            description: 'Setiap halaman web yang Anda temukan internet adalah *file* HTML. *File* HTML dapat dengan mudah dibuat dengan membuat sebuah *file* dengan nama diakhiri dengan ".html" (Perhatikan titik diawal).\n\nContohnya:\n* index.html (Umumnya untuk halaman utama)\n* about.html\n* contact-us.html'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/2/steps/2/sources')
                            .send({
                                content: '<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2 step 2', function (done) {
            agent
            .get('/steps/3')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/2/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/3')
                        .send({
                            order: 2,
                            title: 'Definisi file',
                            description: 'Sesuai dengan ketentuan terbaru HTML, HTML5, setiap *file* HTML harus dimulai dengan `<!DOCTYPE html>`. Hal ini bertujuan untuk mengatakan bahwa *file* HTML mengikuti ketentuan HTML5.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/2/steps/3/sources')
                            .send({
                                content: '<!DOCTYPE html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2 step 3', function (done) {
            agent
            .get('/steps/4')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/2/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/4')
                        .send({
                            order: 3,
                            title: 'HTML yang isinya kosong',
                            description: 'Selanjutnya, *file* harus diikuti dengan sebuah *tag* yang bernama `html`. Semua *tag* harus dilingkupi kurung siku ("`<>`").\n\nUntuk itu, "index.html" kita tambahkan `<html>` kemudian ditutup dengan `</html>` (perhatikan garis miring di depan). Bentuk ini memungkinkan kita untuk "memasukan" sesuatu "ke dalam" HTML dengan meletakkannya di antara  `<html>` dan `</html>`.\n\nSelain itu, menurut ketentuan HTML, kita akan memasukkan *tag* head dan body ke dalam *tag* html.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/2/steps/4/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2 step 4', function (done) {
            agent
            .get('/steps/5')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/2/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/5')
                        .send({
                            order: 4,
                            title: 'HTML dengan isi "Halo, dunia"',
                            description: 'Kita dapat dengan mudah mengisi HTML kita dengan kalimat. Cukup dengan memasukkan kalimat tersebut ke dalam *tag* `<body></body>`.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/2/steps/5/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        Halo, dunia\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 2 step 5', function (done) {
            agent
            .get('/steps/6')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/2/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/6')
                        .send({
                            order: 5,
                            title: 'Latihan membuat HTML',
                            description: 'Kita akan mencoba menguji pemahaman Anda melalui tes singkat berikut.\n\nCoba isilah *file* "index.html" berikut sehingga berisi struktur yang baik dan berisi kalimat "Halo, pesan" (ganti "pesan" dengan nama anda).\n\nPastikan ketika dijalankan muncul sambutan kepada Anda.\n\n> Selamat mencoba!'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/2/steps/6/sources')
                            .send({
                                content: '',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 3 step 1', function (done) {
            agent
            .get('/steps/7')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/3/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/7')
                        .send({
                            order: 1,
                            title: 'Mengenai tag',
                            description: 'HTML terdiri dari *tag*. `<html></html>` adalah salah satu contohnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/3/steps/7/sources')
                            .send({
                                content: '<html>\n    <head></head>\n    <body>\n        April fool!\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 3 step 2', function (done) {
            agent
            .get('/steps/8')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/3/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/8')
                        .send({
                            order: 2,
                            title: 'Isi dari tag',
                            description: 'Semua *tag* yang di dalam *tag* lain disebut *child* sedangkan *tag* yang melingkupinya disebut *parent*.\n\n`<html>` selalu menjadi *parent* dari `<head>` dan `<body>`. Semua isi dari `<body>` akan ditampilkan ke browser.\n\nContoh di samping menunjukkan kalimat `Halo, dunia` yang berada di dalam `<body>`.\n\nLihatlah hasil, kita akan melihat tulisan "Halo, dunia". Setelah itu lanjutlah ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/3/steps/8/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        Halo, dunia\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 3 step 3', function (done) {
            agent
            .get('/steps/9')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/3/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/9')
                        .send({
                            order: 3,
                            title: 'Latihan membuat tag <script>',
                            description: 'Tes singkat ini kita lakukan untuk menguji pemahaman *tag*.\n\nDi dalam `<body>`, cobalah membuat *tag* `<script>` (lengkap dengan tutupnya) dan isi *tag* tersebut dengan `alert(\'halo, dunia\');`. Anda tidak harus mengerti tujuan dari *code* tersebut.\n\nKlik tombol "Lihat hasil" dan pastikan muncul notifikasi "halo, dunia".\n\n> Selamat mencoba.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/3/steps/9/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4 step 1', function (done) {
            agent
            .get('/steps/10')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/4/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/10')
                        .send({
                            order: 1,
                            title: '<body> tanpa attribute',
                            description: 'Sebelum kita menggunakan *attribute*, berikut contoh HTML yang `<body>`-nya belum memiliki *attribute*.\n\nHasilnya harusnya berupa kalimat "halo, dunia".'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/4/steps/10/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4 step 2', function (done) {
            agent
            .get('/steps/11')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/4/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/11')
                        .send({
                            order: 2,
                            title: '<body> dengan attribute',
                            description: 'Sekarang kita tambahkan *attribute* yang bernama `bgcolor` ke dalam `<body>`. `bgcolor` mengubah warna latar dari isi `<body>` menjadi sesuai dengan nilai `bgcolor`, yaitu "palegreen". Anda dapat menggunakan warna lain seperti "red", "green", atau "white".\n\nCara menambahkan *attribute* adalah memasukkan nama *attribute* di antara nama *tag* dan kurung siku "`>`" di *tag* pembuka. Simbol sama dengan (`=`) diikuti dengan nilai *attribute* yang dibungkus dengan simbol kutip dua (`"`).\n\nContohnya:\n\n`bgcolor` dengan nilai "palegreen", ditulis `bgcolor="palegreen"` kemudian ditambahkan ke `<body>` menjadi `<body bgcolor="palegreen"></body>`.\m\nLihatlah hasil dari "index.html" di samping dan Anda akan melihat warna latar hijau pada tulisan "halo, dunia".'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/4/steps/11/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body bgcolor="palegreen">\n        halo, dunia\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4 step 3', function (done) {
            agent
            .get('/steps/12')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/4/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/12')
                        .send({
                            order: 3,
                            title: '<script> tanpa attribute',
                            description: '*Tag* `<script>` juga dapat ditambahkan *attribute*, tetapi cara bekerjanya juga berbeda.\n\nContoh disamping adalah `<script>` tanpa *attribute* yang cara kerjanya adalah menjalankan program Javascript yang ada di dalamnya.\n\nCatatan: `alert(\'halo, dunia\');` adalah *code* Javascript untuk menampilkan kalimat "halo, dunia".'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/4/steps/12/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script>\n            alert(\'halo, dunia\');\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4 step 4', function (done) {
            agent
            .get('/steps/13')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/4/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/13')
                        .send({
                            order: 4,
                            title: '<script> dengan attribute src',
                            description: 'Kita akan belajar tentang *attribute* `src` yang apabila ditambahkan pada `<script>` akan mengubah cara kerja `<script>`.\n\n`<script>` dengan *attribute* `src` tidak akan menjalankan program Javascript di dalamnya, melainkan menjalankan program Javascript yang ada di **file yang ditunjuk `src`**. Pada contoh di samping, `src` menunjuk pada *file* yang bernama "main.js".\n\nPerhatikan bahwa `alert(\'halo, src\');` yang ada di "main.js" yang dijalankan, sedangkan `alert(\'halo, dunia\');` tidak pernah dijalankan.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/4/steps/13/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js">\n            alert(\'halo, dunia\');\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/1/lessons/4/steps/13/sources')
                                .send({
                                    content: 'alert(\'halo, src\');',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 1 lesson 4 step 5', function (done) {
            agent
            .get('/steps/14')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/4/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/14')
                        .send({
                            order: 5,
                            title: 'Latihan mengubah ukuran <canvas>',
                            description: 'Kita akan latihan menggunakan *attribute*. `<canvas>` dapat dimodifikasikan dengan menggunakan *attribute* `width` (lebar) dan `height` (tinggi) untuk ukurannya.\n\nUbahlah contoh di samping sehingga yang ditampilkan adalah `<canvas>` dengan ukuran 100 (lebar) x 200 (tinggi).\n\nCatatan: tag `style="..."` di samping tidak perlu dipedulikan. Kita cukup menambahkan *attribute* baru.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/1/lessons/4/steps/14/sources')
                            .send({
                                content: '<!DOCTYPE html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 1 step 1', function (done) {
            agent
            .get('/steps/15')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/5/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent

                        .put('/steps/15')
                        .send({
                            order: 1,
                            title: 'HTML kosong',
                            description: 'Ini adalah contoh HTML yang tidak ada Javascript-nya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/5/steps/15/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 1 step 2', function (done) {
            agent
            .get('/steps/16')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/5/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/16')
                        .send({
                            order: 2,
                            title: 'HTML dengan Javascript',
                            description: 'Untuk memasang Javascript, tambahkanlah tag `<script></script>` ke dalam HTML Anda.\n\nAnda tidak perlu tahu untuk apa `alert(\'halo, dunia\');`. Anggaplah *code* itu untuk menampilkan "halo, dunia" ke layar Anda.\n\n> Coba Anda tulis ulang `<script></script>` yang sama di bawah tag tersebut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/5/steps/16/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <!-- Javascript membutuhkan tag <script></script> seperti di bawah ini -->\n        <script>\n            alert(\'halo, dunia\');\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 1 step 3', function (done) {
            agent
            .get('/steps/17')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/5/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/17')
                        .send({
                            order: 3,
                            title: 'File js yang terpisah',
                            description: 'Kali ini kita akan memisahkan Javascript kita dari HTML. Hal ini memudahkan kita karena Javascript tidak mengandung tag yang ada di HTML.\n\nCara untuk misahkannya adalah:\n\n1. Buat *file* baru bernama "main.js"\n2. Pindahkan *code* dalam `<script></script>` ke *file* tersebut.\n3. Tambahkan *attribute* `src="<nama file javascript>"` ke tag `<script></script>`\n4. Selesai.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/5/steps/17/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <!-- Hampir sama dengan yang sebelumnya, tetapi tambahkan attribute src dan isi dengan nama file javascript yang diberikan -->\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/5/steps/17/sources')
                                .send({
                                    content: 'alert(\'halo, dunia\');',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2 step 1', function (done) {
            agent
            .get('/steps/18')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/6/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/18')
                        .send({
                            order: 1,
                            title: 'Menampilkan hasil',
                            description: 'Kita menyadari bahwa perintah `alert(\'halo, dunia\');` membuat sebuah notifikasi yaitu "halo, dunia".\n\nKali ini kita akan membuat beberapa notifikasi baru untuk menyambut pengunjung.\n\nPerhatikan *file* "main.js", terdapat beberapa `alert(\'<pesan>\');` baru. Kita menulis *code* ini setiap kali kita ingin menampilkan sesuatu.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/6/steps/18/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/6/steps/18/sources')
                                .send({
                                    content: 'alert(\'Halo!\');\nalert(\'Selamat datang di website saya\');\nalert(\'Selamat menikmati\');',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2 step 2', function (done) {
            agent
            .get('/steps/19')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/6/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/19')
                        .send({
                            order: 2,
                            title: 'Variabel untuk menampung hasil sementara',
                            description: 'Kita akan berkenalan dengan variabel di Javascript. Untuk menggunakannya ketiklah `var namaVariabel`, ganti `namaVariabel` dengan apapun yang Anda suka. Apabila lebih dari dua kata, gabungkan dan huruf besarkan huruf pertama dari kata kedua tersebut.\n\nOperator sama dengan (`=`) kita gunakan untuk mengisi variabel kita dengan sesuatu.\n\nSalah satu kegunaan dari variabel adalah daur ulang! Seperti pada *file* "main.js" dengan menggunakan variabel pesan kita dapat mengulang baris `alert(pesan);` dengan mudah.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/6/steps/19/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/6/steps/19/sources')
                                .send({
                                    content: 'var pesan = "Demo variabel";\nalert(pesan);\npesan = "string atau kalimat";\n\nalert(pesan);\npesan = 10;\nalert(pesan);\npesan = .7;\nalert(pesan);',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2 step 3', function (done) {
            agent
            .get('/steps/20')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/6/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/20')
                        .send({
                            order: 3,
                            title: 'Operasi matematika',
                            description: 'Operasi matematika dapat dilakukan dengan Javascript.\n\nBeberapa hal yang perlu diketahui:\n\n* Operasi yang tersedia adalah:\n    * tambah\n    * kurang\n    * kali\n    * bagi\n* Operasi kali menggunakan simbol bintang (`*`) bukan huruf x\n* Operasi bagi menggunakan simbol "atau" (`/`)\n* Operasi kali dan bagi dilakukan dahulu dibanding tambah dan kurang. Namun, dapat ubah dengan simbol kurung "`()`"'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/6/steps/20/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/6/steps/20/sources')
                                .send({
                                    content: 'var pesan = "Demo operasi matematika";\nalert(pesan);\n\npesan = 1 + 1;\nalert(pesan);\n\npesan = 2 - 3;\nalert(pesan);\n\npesan = 7 * 8;\nalert(pesan);\n\npesan = 3 / 2;\nalert(pesan);\n\npesan = 1 + 2 * 3 - 4;\nalert(pesan);\n\npesan = (1 + 2) * 3 - 4;\nalert(pesan);',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2 step 4', function (done) {
            agent
            .get('/steps/21')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/6/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/21')
                        .send({
                            order: 4,
                            title: 'Array atau variabel dengan isi lebih dari satu',
                            description: '*Array* adalah tipe variabel yang dapat menampung isi lebih dari satu. Bisa digunakan untuk menampung nama-nama.\n\nUntuk membuat *array*, kita menggunakan simbol kurung tegak (`[]`). Kemudian di dalam kurung tersebut kita masukan isinya satu persatu dipisahkan dengan koma.\n\nUntuk mengambil isi ke sekian (dimulai dari 0), kita menulis nama *array* tersebut diikuti dengan simbol kurung tegak (`[]`) yang berisi nomor urutan isi yang kita inginkan.\n\nContohnya:\n* membuat *array* kumpulan nama `var kumpulanNama = [\'adi\', \'budi\', \'candi\'];`\n* menggambil nama "budi" urutan ke-1 `kumpulanNama[1]`'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/6/steps/21/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/6/steps/21/sources')
                                .send({
                                    content: 'var kumpulanNama = [\'adi\', \'budi\', \'candi\'];\nalert(kumpulanNama[0]);\nalert(kumpulanNama[1]);\nalert(kumpulanNama[2]);',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 2 step 5', function (done) {
            agent
            .get('/steps/22')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/6/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/22')
                        .send({
                            order: 5,
                            title: 'Membuat pengulangan otomatis',
                            description: 'Dari langkah sebelumnya, cukup repot bagi kita untuk mengulang `alert(kumpulanNama[...]);` untuk tiga nama. Hal ini akan lebih sulit jika nama yang tersedia bertambah. Oleh karena itu, kita membutuhkan cara yang lebih otomatis dan singkat.\n\nKita akan menggunakan perulangan **for**:\n```\nfor (...; ...; ...) {\n    // Melakukan sesuatu\n}\n```\n\nKeterangan dari **for** adalah:\b```\nfor ([1]; [2]; [3]) {\n    [4]\n}\n```\n1. [1] adalah bagian untuk membuat variabel yang dapat digunakan di [4]. Pada contoh di samping, kita membuat variabel `i` dan kita mulai dari 0 karena urutan isi di *array* dimulai dari 0.\n2. [2] adalah syarat untuk [4] dijalankan. Pada contoh di samping [4] dan [3] akan dijalankan selama `i` kurang dari jumlah isi kumpulanNama.\n3. [3] adalah *code* yang dijalankan setelah [4]. Pada contoh di samping, kita membuat `i` menjadi `i` ditambah 1 sehingga [4] berikutnya berisi `i` baru tersebut.\n4. [4] adalah *code* yang dijalankan apabila [2] adalah benar.\n\n'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/6/steps/22/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/6/steps/22/sources')
                                .send({
                                    content: 'var kumpulanNama = [\'adi\', \'budi\', \'candi\'];\nfor (var i = 0; i < kumpulanNama.length; i = i + 1) {\n    alert(kumpulanNama[i]);\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 3 step 1', function (done) {
            agent
            .get('/steps/23')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/7/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/23')
                        .send({
                            order: 1,
                            title: 'Contoh tanpa function',
                            description: 'Sebelum kita memulai membuat *function* perhatikan contoh *code* Javascript tanpa *function* berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/7/steps/23/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/7/steps/23/sources')
                                .send({
                                    content: 'var beratAdi = 68;\nvar tinggiAdi = 1.75;\nvar bmiAdi = beratAdi / (tinggiAdi * tinggiAdi);\nalert("bmi: " + bmiAdi);\n\nvar beratBudi = 87;\nvar tinggiBudi = 1.65;\nvar bmiBudi = beratBudi / (tinggiBudi * tinggiBudi);\nalert("bmi: " + bmiBudi);',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 3 step 2', function (done) {
            agent
            .get('/steps/24')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/7/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/24')
                        .send({
                            order: 2,
                            title: 'Bentuk function',
                            description: 'Sebelum membuat *function* yang dapat digunakan, kita akan melihat bagaimana *function* dapat digunakan.\n\n`hitungBmi(...)` adalah *function* yang kita inginkan untuk menganti potongan *code* dari yang sebelumnya. *Function* selalu terdiri dari nama *function* diikuti dengan dua kurung. Di dalam kurung, kita akan memasukan variabel yang diperlukan oleh *function* yang pada contoh ini, berat dan tinggi.\n\nLihatlah hasil, tetapi tidak akan muncul hasil yang sama seperti sebelumnya. Hal ini disebabkan karena kita belum membuat bagaimana `hitungBmi()` bekerja, yang akan kita buat pada langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/7/steps/24/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/7/steps/24/sources')
                                .send({
                                    content: 'var beratAdi = 68;\nvar tinggiAdi = 1.70;\nhitungBmi(beratAdi, tinggiAdi);\n\nvar beratBudi = 87;\nvar tinggiBudi = 1.65;\nhitungBmi(beratBudi, tinggiBudi);',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 3 step 3', function (done) {
            agent
            .get('/steps/25')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/7/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/25')
                        .send({
                            order: 3,
                            title: 'Mengisi cara kerja function',
                            description: 'Kita akan mengisi bagaimana `hitungBmi()` bekerja.\n\nUntuk mengisi bagaimana cara kerja sebuah *function*, pertama-tama kita sebut *function* tersebut menggunakan format berikut.\n```\nfunction namaFungsi() {\n    //Cara kerja di sini\n}\n```\nDi dalam kurung setelah `namaFungsi` kita masukkan variabel-variabel yang diperlukan. Nama variabel yang ditulis di dalam kurung kita sebut *parameter* karena mereka tidak membutuhkan kata `var`.\n```\nfunction hitungBmi(berat, tinggi) {\n    // Cara kerja hitungBmi\n    // Terdapat var berat dan tinggi\n}\n```\nDi dalam kurung kurawal (`{}`) kita kemudian masukan *code* yang akan dijalankan *function*. Hasilnya adalah *function* seperti pada contoh di samping.\n\nLihatlah hasil dan kita akan melihat hasil yang sama dengan contoh tanpa *function* sebelumnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/7/steps/25/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/7/steps/25/sources')
                                .send({
                                    content: 'var beratAdi = 68;\nvar tinggiAdi = 1.70;\nhitungBmi(beratAdi, tinggiAdi);\n\nvar beratBudi = 87;\nvar tinggiBudi = 1.65;\nhitungBmi(beratBudi, tinggiBudi);\n\nfunction hitungBmi(berat, tinggi) {\n    var bmi = berat / (tinggi * tinggi);\n    alert("bmi: " + bmi);\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 2 lesson 3 step 4', function (done) {
            agent
            .get('/steps/26')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/7/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/26')
                        .send({
                            order: 4,
                            title: 'Latihan memodifikasi function',
                            description: 'Kita akan memodifikasi *function* sehingga dapat menampilkan nama dari pemilik bmi.\n\nPerhatikan `alert("bmi " + nama + " : " + bmi);`. Kita kini membutuhkan `var` dengan nama "nama". Namun, variabel ini tidak ada di kurung dan ketika *function* digunakan, variabel yang kita berikan hanya berat dan tinggi.\n\nUbahlah `function hitungBmi(...)` sehingga terdapat variabel ketiga, "nama", sebelum variabel berat.\n\nUbahlah `hitungBmi(beratAdi, tinggiAdi)` sehingga sebelum `beratAdi` diberikan, kita memberikan *String* "Adi".\n\nLihatlah hasil dan pastikan hasilnya adalah dua notifikasi berikut.\n\n1. bmi Adi : 23.529411764705884\n2. bmi Budi : 31.95592286501378\n\nSelamat mencoba!'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/7/steps/26/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/7/steps/26/sources')
                                .send({
                                    content: 'var beratAdi = 68;\nvar tinggiAdi = 1.70;\nhitungBmi(beratAdi, tinggiAdi);\n\nvar beratBudi = 87;\nvar tinggiBudi = 1.65;\nhitungBmi(beratBudi, tinggiBudi);\n\nfunction hitungBmi(berat, tinggi) {\n    var bmi = berat / (tinggi * tinggi);\n    alert("bmi: " + bmi);\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 1 step 1', function (done) {
            agent
            .get('/steps/27')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/8/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/27')
                        .send({
                            order: 1,
                            title: 'Segitiga Sederhana',
                            description: 'Program ini akan menampilkan sebuah segitiga berwarna.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/8/steps/27/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head>\n        <script src="main.js"></script>\n    </head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="480" height="320"></canvas>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            varying vec3 vertexColor;\n            void main(void) {\n                gl_FragColor = vec4(vertexColor, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            attribute vec3 color;\n            \n            varying vec3 vertexColor;\n            void main(void) {\n                gl_Position = vec4(position, .0, 1.0);\n                vertexColor = color;\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/3/lessons/8/steps/27/sources')
                                .send({
                                    content: 'function main() {\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'Browser Anda tidak mendukung WebGL\');\n        gl = null;\n    }\n    \n    if (gl) {\n        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\n        var fragmentShaderScript = document.getElementById(\'fragment-shader\').textContent;\n        gl.shaderSource(fragmentShader, fragmentShaderScript);\n        gl.compileShader(fragmentShader);\n        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {\n            alert(\'Terdapat kesalahan dalam script fragment-shader: \' + gl.getShaderInfoLog(fragmentShader));\n        } \n        \n        var vertexShader = gl.createShader(gl.VERTEX_SHADER);\n        var vertexShaderScript = document.getElementById(\'vertex-shader\').textContent;\n        gl.shaderSource(vertexShader, vertexShaderScript);\n        gl.compileShader(vertexShader);\n        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {\n            alert(\'Terdapat kesalahan pada script vertex-shader: \' + gl.getShaderInfoLog(vertexShader));\n        }\n        \n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        gl.linkProgram(shaderProgram);\n        \n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Tidak dapat menghubungkan kedua shader: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        gl.useProgram(shaderProgram);\n        \n        var vertexColorAttribute = gl.getAttribLocation(shaderProgram, \'color\');\n        gl.enableVertexAttribArray(vertexColorAttribute);\n        var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, \'position\');\n        gl.enableVertexAttribArray(vertexPositionAttribute);\n        \n        var triangleVertexes = [\n            // position\n            -1, -1,\n            // color RGB\n            1, 0, 0,\n            1, 1,\n            0, 1, 0,\n            1, -1,\n            0, 0, 1\n        ];\n        var triangleVertexBuffer = gl.createBuffer();\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        gl.bufferData(\n            gl.ARRAY_BUFFER,\n            new Float32Array(triangleVertexes),\n            gl.STATIC_DRAW\n        );\n        \n        var triangleIndices = [0, 1, 2];\n        var triangleIndicesBuffer = gl.createBuffer();\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesBuffer);\n        gl.bufferData(\n            gl.ELEMENT_ARRAY_BUFFER,\n            new Uint16Array(triangleIndices),\n            gl.STATIC_DRAW\n        );\n        \n        gl.clearColor(.0, .0, .0, .0);\n        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n        \n        gl.viewport(.0, .0, canvas.width, canvas.height);\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        gl.vertexAttribPointer(\n            vertexPositionAttribute,\n            2,\n            gl.FLOAT,\n            false,\n            4 * (2 + 3),\n            0\n        );\n        gl.vertexAttribPointer(\n            vertexColorAttribute,\n            3,\n            gl.FLOAT,\n            false,\n            4 * (2 + 3),\n            2 * 4\n        );\n        \n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndicesBuffer);\n        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);\n        gl.flush();\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 1', function (done) {
            agent
            .get('/steps/28')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/28')
                        .send({
                            order: 1,
                            title: 'HTML Kosong',
                            description: 'WebGL adalah pemrograman grafik di web. Oleh karena itu, media yang kita pakai adalah HTML.\n\nSebelum kita memulai, terlebih dahulu kita buat sebuah *file* HTML seperti di samping.\n\nLihatlah hasil untuk lanjut ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/28/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body></body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 2', function (done) {
            agent
            .get('/steps/29')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/29')
                        .send({
                            order: 2,
                            title: 'Tag canvas',
                            description: 'WebGL hanya dapat digambar di sebuah *tag* khusus yang bernama "canvas". `<canvas>` dapat ubah ukurannya dengan menggunakan *attribute* "width" untuk lebar dan "height" untuk tinggi. Selain itu, untuk membedakan `<canvas>` yang satu dengan yang lain, kita berikan *attribute* "id" sebagai penanda.\n\nLihatlah hasil untuk lanjut ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/29/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body>\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                done()
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 3', function (done) {
            agent
            .get('/steps/30')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/30')
                        .send({
                            order: 3,
                            title: 'File Javascript terpisah',
                            description: 'Selanjutnya kita akan menambahkan sisi pemrograman dari WebGL dengan menambahkan sebuah *file* Javascript. *File* ini kita pisah dari HTML sehingga lebih teratur.\n\nCaranya cukup mudah yaitu:\n\n1. Buat *file* baru dengan nama "main.js".\n2. Pada "index.html" di bawah `<canvas>` tambahkan tag `<script>` dengan *attribute* `src="main.js"`.\n\nSehingga lebih teratur, kita menambahkan *attribute* baru yaitu `onload` pada *tag* `<body>`. `onload="main()"` berfungsi untuk memanggil *function* Javascript yang bernama "main" ketika `<body>` selesai dibuat di *browser*.\n\nKarena *function* "main()" tidak ada sebelumnya, maka kita tambahkan *function* tersebut pada "main.js" dengan isinya `alert(\'halo, dunia\');` untuk memastikan semuanya berjalan dengan sempurna (*code* ini akan kita hapus pada langkah berikutnya).\n\nLihatlah hasil, pastikan muncul notifikasi "halo, dunia", dan lanjut ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/30/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/3/lessons/9/steps/30/sources')
                                .send({
                                    content: 'function main() {\n    alert(\'halo, dunia\');\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 4', function (done) {
            agent
            .get('/steps/31')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/31')
                        .send({
                            order: 4,
                            title: 'Mengaktifkan WebGL',
                            description: 'Langkah-langkah untuk mengaktifkan WebGL adalah:\n\n1. Kita menggambil "canvas" yang ada di "index.html" kita dengan menggunakan \n```\nvar canvas = document.getElementById(\'glcanvas\');\n```\n2. WebGL dapat diaktifkan dan digunakan dengan memanggil *method* `getContext(\'webgl\');` dari variabel "canvas" kita.\n```\nvar gl = null;\ntry {\n    gl = canvas.getContext(\'webgl\');\n}\ncatch (e) {\n    alert(\'browser Anda tidak mendukung WebGL\');\n}\n```\n3. Pastikan `gl` dapat digunakan sehingga kita tahu bahwa WebGL sudah aktif.\n```\nif (gl) {\n    alert(\'WebGL telah di aktifkan\');\n}\n```',
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/31/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/3/lessons/9/steps/31/sources')
                                .send({
                                    content: 'function main() {\n    var canvas = document.getElementById(\'glcanvas\');\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    if (gl) {\n        alert(\'WebGL telah di aktifkan\');\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 5', function (done) {
            agent
            .get('/steps/32')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/32')
                        .send({
                            order: 5,
                            title: 'Uji Fungsi WebGL',
                            description: 'Kita akan menggunakan beberapa *function* WebGL yaitu `clearColor(red, green, blue, alpha)` dan `clear(bufferType)`\n\n`clearColor()` adalah *function* untuk mengatur warna *default* apabila `clear()` dipanggil.\n\n`clear()` adalah *function* untuk menghapus isi dari "canvas" berdasarkan `bufferType` yang diberikan (`gl.COLOR_BUFFER_BIT` untuk menghapus warna dan `gl.DEPTH_BUFFER_BIT` untuk menghapus informasi kedalaman).\n\nLihatlah hasil, dan apabila muncul kotak warna merah, berarti Anda sukses menggunakan WebGL. Lanjutlah ke langkah berikut untuk latihan.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/32/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/3/lessons/9/steps/32/sources')
                                .send({
                                    content: 'function main() {\n    var canvas = document.getElementById(\'glcanvas\');\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    if (gl) {\n        gl.clearColor(1.0, .0, .0, 1.0);\n        gl.clear(gl.COLOR_BUFFER_BIT);\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 2 step 6', function (done) {
            agent
            .get('/steps/33')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/9/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/33')
                        .send({
                            order: 6,
                            title: 'Latihan membuat warna hijau',
                            description: 'Kita akan mencoba mengulang apa yang kita pelajari mengenai persiapan awal.\n\nCobalah untuk membuat ulang dari awal hingga muncul sebuah kotak hijau.\n\nKombinasi warna untuk hijau adalah:\n\n* red: 0.0\n* green: 1.0\n* blue: 0.0\n* alpha: 1.0\n\nSelamat mencoba!',
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/3/lessons/9/steps/33/sources')
                            .send({
                                content: '',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/3/lessons/9/steps/33/sources')
                                .send({
                                    content: '',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 1', function (done) {
            agent
            .get('/steps/34')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/34')
                        .send({
                            order: 1,
                            title: 'Persiapan awal',
                            description: 'Sebelum kita memulai menggambar segitiga, terlebih dahulu kita siapkan WebGL kita.\n\nKita gunakan hasil dari *lesson* sebelumnya dengan modifikasi pada bagian berikut:\n\n1. `/* ... */` penambahan komentar untuk memperjelas tujuan *code* di bawahnya.\n2. Mengubah isi `gl.clearColor(...)` sehingga menghasilkan warna putih.\n\nLihatlah hasil dan lanjutlah ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/34/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/34/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 2', function (done) {
            agent
            .get('/steps/35')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/35')
                        .send({
                            order: 2,
                            title: 'Menambahkan fragment shader',
                            description: 'Menggambar grafika komputer menggunakan beberapa program kecil yang bernama *shader*. Untuk menggambar segitiga, salah satu *shader* yang kita perlukan adalah *fragment shader*. *Shader* ini berfungsi untuk menentukan warna dari *fragment*, atau kita kenal sebagai *pixel* di layar, yang posisinya berada di dalam segitiga yang kita gambar. Sederhananya adalah warna dari segitiga kita.\n\nKita tidak akan membahas mengenai cara membuat *fragment shader*, tetapi beberapa hal berikut harus Anda ketahui:\n\n* *Shader* dapat dimasukkan ke HTML dengan menggunakan *tag* `<script>` dengan *attribute* `type="x-shader/<tipe shader>"`, yang di mana tipe shader kita adalah `x-fragment`\n* Isi dari *shader* adalah *code* yang berdasarkan bahasa pemrograman "GLSL"\n* `gl_FragColor` adalah variabel yang mengatur hasil warna *fragment* (*pixel*) dari badan segitiga. Variabel ini hanya ada di "GLSL" dan sudah dibuat secara otomatis di *fragment shader*\n\nLihatlah hasil, hasil tidak akan menunjukkan apa-apa jadi Anda dapat lanjut ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/35/sources')
                            .send({
                                content: '<!DOCTYPE html>\n                                <html>\n                                    <head></head>\n                                    <body onload="main()">\n                                        <canvas id="glcanvas" width="320" height="240"></canvas>\n                                        <script src="main.js"></script>\n\n                                        <script id="fragment-shader" type="x-shader/x-fragment">\n                                            precision mediump float;\n                                            void main(void) {\n                                                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                                            }\n                                        </script>\n\n                                    </body>\n                                </html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/35/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 3', function (done) {
            agent
            .get('/steps/36')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/36')
                        .send({
                            order: 3,
                            title: 'Menambahkan vertex shader',
                            description: 'Kemudian kita tambah *shader* berikutnya yang kita perlukan yaitu *vertex shader*. Seperti namanya, *shader* ini berfungsi untuk mengatur posisi *vertex* atau titik. WebGL menggambar berdasarkan titik. Pada langkah-langkah berikutnya kita akan membuat titik-titik segitiga (terdapat 3 titik). Perlu diperhatikan bahwa *vertex* tidak hanya menyimpan informasi tentang posisi titik, tetapi juga warna dari titik tersebut.\n\nLihatlah hasil, dan lanjutkan ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/36/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            void main(void) {\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n            }\n        </script>\n\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            void main(void) {\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/36/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 4', function (done) {
            agent
            .get('/steps/37')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/37')
                        .send({
                            order: 4,
                            title: 'Mengambil shader ke Javascript',
                            description: '*Shader* yang kita buat sebelumnya hanyalah berbentuk kalimat di *file* HTML. Kita harus memindahkan isi *shader* ke Javascript untuk dapat digunakan di program kita. Untuk itu, kita gunakan `document.getElementById(...)` untuk mengambil *tag* yang ada di "index.html" dan `.textContent` untuk mengambil isi dari *tag* tersebut. Perhatikan `id` dari kedua *shader* digunakan di sini.\n\nPerlu diketahui bahwa *shader* kita masih berupa tulisan. Kita akan membuat tulisan ini menjadi program kecil pada langkah berikut.\n\nLihatlah hasil, dan lanjutkan ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/37/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            void main(void) {\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            void main(void) {\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/37/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n\n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n\n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 5', function (done) {
            agent
            .get('/steps/38')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/38')
                        .send({
                            order: 5,
                            title: 'Membuat fragment dan vertex shader',
                            description: 'Kita akan mengubah *source* yang kita peroleh dari "index.html" menjadi *shader* yang bisa kita gunakan. Untuk itu, kita buat *function* untuk membantu kita yaitu\n\n```\nfunction createShader(...) {\n    ...\n}\n```\n\n*Function* ini akan memberikan hasil yaitu *shader* apabila berhasil dan `false` apabila gagal. Berikut deskripsi apa yang dilakukan oleh *function* ini:\n\n1. `var shader = gl.createShader(type);` kita gunakan untuk membuat *shader* berdasarkan `type` yang kita berikan (kita hanya menggunakan `gl.FRAGMENT_SHADER` dan `gl.VERTEX_SHADER`.\n2. `gl.shaderSource(shader, source);` adalah *function* untuk memasukan `source` ke dalam `shader`.\n3. `gl.compileShader(shader);` meng-compile atau membuat *shader* bekerja sesuai dengan `source` yang kita masukkan ke dalamnya.\n4. `if (!...)` kita gunakan untuk menjalankan *code* di dalamnya apabila terjadi kesalahan pada `source`.\n\nLihatlah hasil, apa bila tidak ada notifikasi berarti tidak ada kesalahan pada *source* dan kita dapat lanjut ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/38/sources')
                            .send({
                                content: '<!DOCTYPE html>\n                                <html>\n                                    <head></head>\n                                    <body onload="main()">\n                                        <canvas id="glcanvas" width="320" height="240"></canvas>\n                                        <script src="main.js"></script>\n                                        <script id="fragment-shader" type="x-shader/x-fragment">\n                                            precision mediump float;\n                                            void main(void) {\n                                                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                                            }\n                                        </script>\n                                        <script id="vertex-shader" type="x-shader/x-vertex">\n                                            attribute vec2 position;\n                                            void main(void) {\n                                                gl_Position = vec4(position, 1.0, 1.0);\n                                            }\n                                        </script>\n                                    </body>\n                                </html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/38/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n'
 + '\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n\n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);'
 + '\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n\n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n\n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 6', function (done) {
            agent
            .get('/steps/39')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/39')
                        .send({
                            order: 6,
                            title: 'Menggabungkan semua shader menjadi satu program',
                            description: 'Kedua *shader* yang kita buat sebelumnya akan kita gabungkan dalam satu program yaitu `shaderProgram`. Program ini lah yang akan digunakah oleh WebGL ketika akan menggambar. Untuk membuat program yang dapat digunakan kita harus melakukan langkah berikut:\n\n1. Membuat *shader program* menggunakan *function* `gl.createProgram()`\n2. Pasangkan *shader* yang ada ke program menggunakan *function* `gl.attachShader(programYangAkanDipasang, shaderYangAkanDipasang)`\n3. Setelah semua *shader* terpasang, semua harus di-*link* menggunakan *function* `gl.linkProgram(...)`\n4. `if (...)` terakhir kita gunakan untuk mendeteksi apakah terdapat kesalahan dalam menggabungkan *shader*\n\nLihatlah hasil, saat ini tidak ada hal yang muncul kecuali terdapat kesalahan. Silahkan lanjut ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/39/sources')
                            .send({
                                content: '<!DOCTYPE html>\n                                <html>\n                                    <head></head>\n                                    <body onload="main()">\n                                        <canvas id="glcanvas" width="320" height="240"></canvas>\n                                        <script src="main.js"></script>\n                                        <script id="fragment-shader" type="x-shader/x-fragment">\n                                            precision mediump float;\n                                            void main(void) {\n                                                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                                            }\n                                        </script>\n                                        <script id="vertex-shader" type="x-shader/x-vertex">\n                                            attribute vec2 position;\n                                            void main(void) {\n                                                gl_Position = vec4(position, 1.0, 1.0);\n                                            }\n                                        </script>\n                                    </body>\n                                </html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/39/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n'
 + '\n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n\n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */'
 + '\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n\n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n\n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 1', function (done) {
            agent
            .get('/steps/40')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/40')
                        .send({
                            order: 7,
                            title: 'Memasukkan variabel shader ke code Javascript',
                            description: 'Jika kita perhatikan baik-baik, terdapat `attribute vec2 position` di `<script id="vertex-shader" ...>` pada "index.html". `attribute vec2 position` ini bukanlah *attribute* di HTML, melainkan variabel yang dimiliki oleh *shader* yang kita buat. Variabel ini tentu bisa kita isi dan berikut ini cara kita mengisinya.\n\nVariabel ini harus kita isi dengan informasi posisi dari *vertex* atau titik segitiga kita nanti. Namun, sebelumnya kita harus memperoleh akses ke variabel ini dahulu. Caranya adalah:\n\n1. Pada *code* Javascript, kita gunakan *function* `gl.getAttribLocation(...)` untuk menggambil variabel tersebut.\n2. Variabel itu kini bisa kita gunakan melalui variabel `positionAttribute`\n3. *Shader program* kini bisa kita gunakan dalam WebGL dengan menggunakan `gl.useProgram(...);`\n\nLihatlah hasil, saat ini belum ada tampilan dan kita lanjutkan ke langkah berikutnya.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/40/sources')
                            .send({
                                content: '<!DOCTYPE html>\n                                <html>\n                                    <head></head>\n                                    <body onload="main()">\n                                        <canvas id="glcanvas" width="320" height="240"></canvas>\n                                        <script src="main.js"></script>\n                                        <script id="fragment-shader" type="x-shader/x-fragment">\n                                            precision mediump float;\n                                            void main(void) {\n                                                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                                            }\n                                        </script>\n                                        <script id="vertex-shader" type="x-shader/x-vertex">\n                                            attribute vec2 position;\n                                            void main(void) {\n                                                gl_Position = vec4(position, 1.0, 1.0);\n                                            }\n                                        </script>\n                                    </body>\n                                </html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/40/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n\n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n\n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n\n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n\n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */'
 + '\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n\n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n\n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n\n        /* Membuat shader program dari shader-shader yang ada */'
 + '\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n\n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n\n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 8', function (done) {
            agent
            .get('/steps/41')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/41')
                        .send({
                            order: 8,
                            title: 'Membuat buffer untuk posisi titik-titik segitiga',
                            description: 'Kita ingin memasukkan informasi tentang posisi dari setiap titik dalam segitiga. Informasi ini akan kita masukkan ke `positionAttribute` yang kita peroleh sebelumnya. Syarat untuk memasukkan informasi ke dalam variabel WebGL adalah melalui *buffer*.\n\nLangkah-langkah yang akan kita lakukan adalah:\n\n1. Siapkan *array* untuk posisi setiap titik segitiga.\n2. Buat *buffer* menggunakan `gl.createBuffer()`\n3. Mengubah WebGL untuk menggunakan *buffer* kita dengan `gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer)`\n4. Masukkan data dari *array* ke *buffer* yang aktif menggunakan `gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexBuffer), gl.STATIC_DRAW)`.\n\nSelamat, kita telah membuat sebuah *buffer* untuk *vertex* segitiga.\n\nCatatan:\n\n* `new Float32Array(...)` kita gunakan untuk memastikan *array* kita dalam bentuk `float` sebelum dimasukkan ke *buffer*.\n* `gl.STATIC_DRAW` adalah perintah untuk mengatakan data yang dimasukkan adalah untuk proses penggambaran.\n\nLihatlah hasil, jika tidak ada notifikasi, silahkan lanjut ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/41/sources')
                            .send({
                                content: '<!DOCTYPE html>\n                                <html>\n                                    <head></head>\n                                    <body onload="main()">\n                                        <canvas id="glcanvas" width="320" height="240"></canvas>\n                                        <script src="main.js"></script>\n                                        <script id="fragment-shader" type="x-shader/x-fragment">\n                                            precision mediump float;\n                                            void main(void) {\n                                                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                                            }\n                                        </script>\n                                        <script id="vertex-shader" type="x-shader/x-vertex">\n                                            attribute vec2 position;\n                                            void main(void) {\n                                                gl_Position = vec4(position, 1.0, 1.0);\n                                            }\n                                        </script>\n                                    </body>\n                                </html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/41/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n        \n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        \n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */'
 + '\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n        \n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n        \n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n        \n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);'
 + '\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n        \n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n        \n        /**\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah\n         * canvas. Nilai x dan y maksimum adalah 1.\n         */\n        var triangleVertexes = [\n            1, 1,\n            1, -1,\n            -1, -1\n        ];\n        \n        /* Membuat buffer */\n        var triangleVertexBuffer = gl.createBuffer();\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);\n        \n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 9', function (done) {
            agent
            .get('/steps/42')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/42')
                        .send({
                            order: 9,
                            title: 'Membuat buffer untuk urutan gambar titik-titik segitiga',
                            description: 'Mirip dengan langkah sebelumnya, kita akan membuat *buffer* lagi untuk menampung informasi *index*. *Index* adalah informasi mengenai urutan titik yang digambar. Grafika komputer umumnya hanya menggambar bidang yang urutan *vertex*-nya searah jarum jam terhadap titik tengah bidang. Untuk itu, kita gunakan *index* untuk menggambar dari *vertex* ke-0 (kanan-atas) hingga ke-2 (kiri-bawah).\n\nBeberapa hal yang perlu kita ketahui dari contoh di samping:\n\n* Berbeda dengan *vertex*, *index* berupa bilangan bulat positif.\n* `gl.ELEMENT_ARRAY_BUFFER` menandakan bahwa *index* menunjuk pada *element* (setiap isi dari *array* disebut *element*) pada *array* *vertex*\n* `new Uint16Array(...)` sesuai dengan tipe data *index* yang berupa bilangan positif (*unsigned integer*)\n\nLihatlah hasil dan apabila tidak ada notifikasi *error* lanjutlah ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/42/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            void main(void) {\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            void main(void) {\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/42/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n        \n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        '
 + '\n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n        \n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */'
 + '\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n        \n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n        \n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n        \n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n        \n        /**\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah'
 + '\n         * canvas. Nilai x dan y maksimum adalah 1.\n         */\n        var triangleVertexes = [\n            1, 1,\n            1, -1,\n            -1, -1\n        ];\n        \n        /* Membuat buffer */\n        var triangleVertexBuffer = gl.createBuffer();\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);\n        \n        \n        /* Urutan vertex yang digunakan ketika menggambar segitiga */\n        var triangleIndices = [\n            0, 1, 2\n        ];\n        \n        /* Membuat buffer untuk indices */\n        var triangleIndexBuffer = gl.createBuffer();\n        /* Ganti buffer WebGL menjadi buffer indices */\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n        /* Masukkan data ke dalam buffer indices */\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);\n        \n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 10', function (done) {
            agent
            .get('/steps/43')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/43')
                        .send({
                            order: 10,
                            title: 'Persiapan untuk menggambar',
                            description: 'Sebelum kita menggambar segitiga, terlebih dahulu kita buat sebuat *function* `draw()`. *Function* ini akan mempermudah kita untuk menggambar lagi.\n\nBeberapa hal yang perlu kita ketahui:\n\n* `gl.viewport(x, y, width, height)` kita gunakan untuk membuat kotak gambar untuk WebGL. Kita gunakan `canvas`.\n* `gl.clear(...)` kita gunakan untuk menghapus kotak gambar kita sehingga gambar kita tidak menimpa gambar-gambar sebelumnya. `gl.COLOR_BUFFER_BIT` dipakai sehingga semua warna di kotak gambar kita dihapus.\n* `gl.flush()` digunakan untuk menghemat memori, *function* ini biasanya dipanggil setelah menggambar\n\nLihatlah hasil, pastikan terdapat notifikasi "siap menggambar" dan lanjutkan ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/43/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            void main(void) {\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            void main(void) {\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/43/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);'
 + '\n        \n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        \n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */'
 + '\n            return shader;\n        }\n        \n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n        \n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n        \n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */'
 + '\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n        \n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n        \n        /**\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah\n         * canvas. Nilai x dan y maksimum adalah 1.\n         */\n        var triangleVertexes = [\n            1, 1,\n            1, -1,\n            -1, -1'
 + '\n        ];\n        \n        /* Membuat buffer */\n        var triangleVertexBuffer = gl.createBuffer();\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);\n        \n        \n        /* Urutan vertex yang digunakan ketika menggambar segitiga */\n        var triangleIndices = [\n            0, 1, 2\n        ];\n        \n        /* Membuat buffer untuk indices */\n        var triangleIndexBuffer = gl.createBuffer();\n        /* Ganti buffer WebGL menjadi buffer indices */\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n        /* Masukkan data ke dalam buffer indices */'
 + '\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);\n        \n        /* Function untuk menggambar */\n        function draw() {\n            /* Pasang ukuran canvas sebagai kotak gambar untuk WebGL */\n            gl.viewport(0.0, 0.0, canvas.width, canvas.height);\n            /* Hapus semua warna yang ada di kotak gambar */\n            gl.clear(gl.COLOR_BUFFER_BIT);\n            \n            // Baris di bawah akan diisi pada langkah berikut\n            alert(\'siap menggambar\');\n            \n            /* Bersihkan WebGL supaya hemat memori */\n            gl.flush();\n        }\n        \n        /* Panggil function draw() untuk menggambar */\n        draw();\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 11', function (done) {
            agent
            .get('/steps/44')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/44')
                        .send({
                            order: 11,
                            title: 'Menggambar segitiga',
                            description: 'Kita akan mulai menggambar segitiga kita. Sebelum itu, kita harus mengisi `positionAttribute` dahulu. Caranya adalah dengan `gl.bindBuffer(..)` diikuti dengan `gl.vertexAttribPointer(...)` untuk mengajarkan WebGL bagaimana cara membaca `triangleVertexes`.\n\nSetelah mengisi `positionAttribute`, kita akan menggambar segitiga kita. Cara menggambar adalah menggunakan `gl.drawElements(...)`. Namun, *function* ini membutuhkan informasi urutan vertex. Oleh karena itu, kita `gl.bindBuffer(...)` dahulu `triangleIndexBuffer` kita sehingga WebGL kini tahu urutan *vertex* kita.\n\nLihatlah hasil, dan kita akan menemukan sebuah segitiga hitam. Hal ini dikarenakan\n```\ngl_FragColor = vec4(0.0, 0.0, 0.0, 1.0)\n```\nyang ada di "index.html". *Vector* yang digunakan adalah warna hitam berdasarkan RGBA. Coba Anda ubah menjadi `vec4(1.0, 0.0, 0.0, 1.0)` untuk warna merah.\n\nPada langkah berikut kita akan membuat segitiga kita menjadi berwarna-warni.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/44/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            void main(void) {\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            void main(void) {\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/44/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n        \n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        \n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {'
 + '\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shaderSource(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }'
 + '\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n        \n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n        \n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");'
 + '\n        \n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */'
 + '\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n        \n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n        \n        /**\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah\n         * canvas. Nilai x dan y maksimum adalah 1.\n         */'
 + '\n        var triangleVertexes = [\n            1, 1,\n            1, -1,\n            -1, -1\n        ];\n        \n        /* Membuat buffer */\n        var triangleVertexBuffer = gl.createBuffer();\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);\n        \n        '
 + '\n        /* Urutan vertex yang digunakan ketika menggambar segitiga */\n        var triangleIndices = [\n            0, 1, 2\n        ];\n        \n        /* Membuat buffer untuk indices */\n        var triangleIndexBuffer = gl.createBuffer();\n        /* Ganti buffer WebGL menjadi buffer indices */\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n        /* Masukkan data ke dalam buffer indices */\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);\n        \n        /* Function untuk menggambar */\n        function draw() {\n            /* Pasang ukuran canvas sebagai kotak gambar untuk WebGL */\n            gl.viewport(0.0, 0.0, canvas.width, canvas.height);'
 + '\n            /* Hapus semua warna yang ada di kotak gambar */\n            gl.clear(gl.COLOR_BUFFER_BIT);\n            \n            /* Siapkan WebGL untuk mengutamakan vertex buffer */\n            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n            /**\n             * Penjelasan setiap parameter:\n             * 1. attribute yang akan diakses\n             * 2. position adalah vec2 sehingga kita ubah hanya 2 elemen\n             * 3. tipe data dari position adalah float\n             * 4. kita tidak menggunakan normalisasi jadi kita gunakan false\n             * 5. tidak ada jarak element antar vertex jadi kita buat 0\n             * 6. posisi langsung dimulai dari element pertama jadi kita buat 0\n             */\n            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);\n            \n            /* Gunakan index buffer sebelum menggambar */\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n            /**'
 + '\n             * Menggambar segitiga dengan buffer yang aktif. Keterangan parameter:\n             * 1. Kita gunakan TRIANGLES sebagai bidang primitive\n             * 2. Jumlah index yang kita gunakan ada 3 untuk 3 vertex\n             * 3. Tipe data index yang kita gunakan adalah SHORT (UINT16)\n             * 4. Index kita langsung dimulai dari element pertama jadi offset kita 0\n             */\n            gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);\n            \n            /* Bersihkan WebGL supaya hemat memori */\n            gl.flush();\n        }\n        \n        /* Panggil function draw() untuk menggambar */\n        draw();\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 12', function (done) {
            agent
            .get('/steps/45')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/45')
                        .send({
                            order: 12,
                            title: 'Menyiapkan fragment dan vertex shader untuk warna',
                            description: 'Kita akan membuat warna-warni pada segitiga kita. Untuk itu, pertama-tama kita modifikasi *shader* kita. Kita atur sehingga ketika *vertex* diberi warna, maka warna tersebut akan diberikan ke *Fragment* untuk digambar.\n\nModifikasi yang kita lakukan pada *fragment shader*:\n\n* Variabel tipe `varying` untuk memperoleh nilai dari *shader* lain. Variabel ini kita beri nama "vertexColor"\n* `gl_FragColor` kini menggunakan `vertexColor` dengan tambahan `1.0` alpha sehingga tepat 4 element untuk `vec4`\n\nModifikasi yang kita lakukan pada *vertex shader*:\n\n* Variabel tipe `attribute` "color" untuk memperoleh data warna dari Javascript.\n* Variabel tipe `varying` untuk mengirim warna ke *shader* lain (*fragment shader*).\n* `vertexColor = color` untuk mengambil data dari `color` dan berikan ke `vertexColor`.\n\nLihatlah hasil, di sini masih belum ada tampilan jadi kita langsung lanjut ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/45/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            \n            varying vec3 vertexColor;\n            \n            void main(void) {\n                //gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                gl_FragColor = vec4(vertexColor, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            \n            attribute vec3 color;\n            varying vec3 vertexColor;\n            \n            void main(void) {\n                vertexColor = color;\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/45/sources')
                                .send({
                                    content: 'function main() {'
+ '\n    /* Menggambil canvas yang ada di html */'
+ '\n    var canvas = document.getElementById(\'glcanvas\');'
+ '\n    '
+ '\n    /* Mengaktifkan WebGL */'
+ '\n    var gl = null;'
+ '\n    try {'
+ '\n        gl = canvas.getContext(\'webgl\');'
+ '\n    }'
+ '\n    catch (e) {'
+ '\n        alert(\'browser Anda tidak mendukung WebGL\');'
+ '\n    }'
+ '\n    '
+ '\n    /* Menjalankan program grafik apabila WebGL telah aktif */'
+ '\n    if (gl) {'
+ '\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */'
+ '\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);'
+ '\n        '
+ '\n        /* Menghapus isi canvas */'
+ '\n        gl.clear(gl.COLOR_BUFFER_BIT);'
+ '\n        '
+ '\n        /* function untuk membuat shader */'
+ '\n        function createShader(source, type, typeString) {'
+ '\n            /* Membuat shader berdasarkan tipe yang diinginkan */'
+ '\n            var shader = gl.createShader(type);'
+ '\n            /* Mengisi shader dengan source-nya */'
+ '\n            gl.shaderSource(shader, source);'
+ '\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */'
+ '\n            gl.compileShader(shader);'
+ '\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */'
+ '\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {'
+ '\n                /* Notifikasi penyebab kegagalan */'
+ '\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));'
+ '\n                /* Function harus selesai dengan hasil false yang menandakan gagal */'
+ '\n                return false;'
+ '\n            }'
+ '\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */'
+ '\n            return shader;'
+ '\n        }'
+ '\n        '
+ '\n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */'
+ '\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;'
+ '\n        /* Membuat shader dari fragment source */'
+ '\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");'
+ '\n        '
+ '\n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */'
+ '\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;'
+ '\n        /* Membuat shader dari vertex source */'
+ '\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");'
+ '\n        '
+ '\n        /* Membuat shader program dari shader-shader yang ada */'
+ '\n        var shaderProgram = gl.createProgram();'
+ '\n        gl.attachShader(shaderProgram, fragmentShader);'
+ '\n        gl.attachShader(shaderProgram, vertexShader);'
+ '\n        /* Gunakan shaderProgram sebagai program utama */'
+ '\n        gl.linkProgram(shaderProgram);'
+ '\n        /* Apabila terjadi kesalahan pada program, notifikasi error */'
+ '\n        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {'
+ '\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));'
+ '\n        }'
+ '\n        '
+ '\n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */'
+ '\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");'
+ '\n        gl.enableVertexAttribArray(positionAttribute);'
+ '\n        '
+ '\n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */'
+ '\n        gl.useProgram(shaderProgram);'
+ '\n        '
+ '\n        /**'
+ '\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan'
+ '\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah'
+ '\n         * canvas. Nilai x dan y maksimum adalah 1.'
+ '\n         */'
+ '\n        var triangleVertexes = ['
+ '\n            1, 1,'
+ '\n            1, -1,'
+ '\n            -1, -1'
+ '\n        ];'
+ '\n        '
+ '\n        /* Membuat buffer */'
+ '\n        var triangleVertexBuffer = gl.createBuffer();'
+ '\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */'
+ '\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);'
+ '\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */'
+ '\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);'
+ '\n        '
+ '\n        '
+ '\n        /* Urutan vertex yang digunakan ketika menggambar segitiga */'
+ '\n        var triangleIndices = ['
+ '\n            0, 1, 2'
+ '\n        ];'
+ '\n        '
+ '\n        /* Membuat buffer untuk indices */'
+ '\n        var triangleIndexBuffer = gl.createBuffer();'
+ '\n        /* Ganti buffer WebGL menjadi buffer indices */'
+ '\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);'
+ '\n        /* Masukkan data ke dalam buffer indices */'
+ '\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);'
+ '\n        '
+ '\n        /* Function untuk menggambar */'
+ '\n        function draw() {'
+ '\n            /* Pasang ukuran canvas sebagai kotak gambar untuk WebGL */'
+ '\n            gl.viewport(0.0, 0.0, canvas.width, canvas.height);'
+ '\n            /* Hapus semua warna yang ada di kotak gambar */'
+ '\n            gl.clear(gl.COLOR_BUFFER_BIT);'
+ '\n            '
+ '\n            /* Siapkan WebGL untuk mengutamakan vertex buffer */'
+ '\n            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);'
+ '\n            /**'
+ '\n             * Penjelasan setiap parameter:'
+ '\n             * 1. attribute yang akan diakses'
+ '\n             * 2. position adalah vec2 sehingga kita ubah hanya 2 elemen'
+ '\n             * 3. tipe data dari position adalah float'
+ '\n             * 4. kita tidak menggunakan normalisasi jadi kita gunakan false'
+ '\n             * 5. ukuran dari satu vertex dalam byte (float = 4byte)'
+ '\n             * 6. posisi langsung dimulai dari element pertama jadi kita buat 0'
+ '\n             */'
+ '\n            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);'
+ '\n            '
+ '\n            /* Gunakan index buffer sebelum menggambar */'
+ '\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);'
+ '\n            /**'
+ '\n             * Menggambar segitiga dengan buffer yang aktif. Keterangan parameter:'
+ '\n             * 1. Kita gunakan TRIANGLES sebagai bidang primitive'
+ '\n             * 2. Jumlah index yang kita gunakan ada 3 untuk 3 vertex'
+ '\n             * 3. Tipe data index yang kita gunakan adalah SHORT (UINT16)'
+ '\n             * 4. Index kita langsung dimulai dari element pertama jadi offset kita 0'
+ '\n             */'
+ '\n            gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);'
+ '\n            '
+ '\n            /* Bersihkan WebGL supaya hemat memori */'
+ '\n            gl.flush();'
+ '\n        }'
+ '\n        '
+ '\n        /* Panggil function draw() untuk menggambar */'
+ '\n        draw();'
+ '\n    }'
+ '\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
        it('should create chapter 3 lesson 3 step 13', function (done) {
            agent
            .get('/steps/46')
            .end(function (err, res) {
                if (err) {
                    agent
                    .post('/lessons/10/steps')
                    .send({})
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        agent
                        .put('/steps/46')
                        .send({
                            order: 13,
                            title: 'Menyiapkan fragment dan vertex shader untuk warna',
                            description: 'Kita akan membuat warna-warni pada segitiga kita. Untuk itu, pertama-tama kita modifikasi *shader* kita. Kita atur sehingga ketika *vertex* diberi warna, maka warna tersebut akan diberikan ke *Fragment* untuk digambar.\n\nModifikasi yang kita lakukan pada *fragment shader*:\n\n* Variabel tipe `varying` untuk memperoleh nilai dari *shader* lain. Variabel ini kita beri nama "vertexColor"\n* `gl_FragColor` kini menggunakan `vertexColor` dengan tambahan `1.0` alpha sehingga tepat 4 element untuk `vec4`\n\nModifikasi yang kita lakukan pada *vertex shader*:\n\n* Variabel tipe `attribute` "color" untuk memperoleh data warna dari Javascript.\n* Variabel tipe `varying` untuk mengirim warna ke *shader* lain (*fragment shader*).\n* `vertexColor = color` untuk mengambil data dari `color` dan berikan ke `vertexColor`.\n\nLihatlah hasil, di sini masih belum ada tampilan jadi kita langsung lanjut ke langkah berikut.'
                        })
                        .end(function (err, res) {
                            expect(res).to.have.status(200)
                            agent
                            .post('/chapters/2/lessons/10/steps/46/sources')
                            .send({
                                content: '<!DOCTYPE html>\n<html>\n    <head></head>\n    <body onload="main()">\n        <canvas id="glcanvas" width="320" height="240"></canvas>\n        <script src="main.js"></script>\n        <script id="fragment-shader" type="x-shader/x-fragment">\n            precision mediump float;\n            \n            varying vec3 vertexColor;\n            \n            void main(void) {\n                //gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n                gl_FragColor = vec4(vertexColor, 1.0);\n            }\n        </script>\n        <script id="vertex-shader" type="x-shader/x-vertex">\n            attribute vec2 position;\n            \n            attribute vec3 color;\n            varying vec3 vertexColor;\n            \n            void main(void) {\n                vertexColor = color;\n                gl_Position = vec4(position, 1.0, 1.0);\n            }\n        </script>\n    </body>\n</html>',
                                name: 'index.html'
                            })
                            .end(function (err, res) {
                                expect(res).to.have.status(200)
                                agent
                                .post('/chapters/2/lessons/10/steps/46/sources')
                                .send({
                                    content: 'function main() {\n    /* Menggambil canvas yang ada di html */\n    var canvas = document.getElementById(\'glcanvas\');\n    \n    /* Mengaktifkan WebGL */\n    var gl = null;\n    try {\n        gl = canvas.getContext(\'webgl\');\n    }\n    catch (e) {\n        alert(\'browser Anda tidak mendukung WebGL\');\n    }\n    \n    /* Menjalankan program grafik apabila WebGL telah aktif */\n    if (gl) {\n        /* Mengatur sehingga warna dasar adalah putih RGBA: 1, 1, 1, 1 */\n        gl.clearColor(1.0, 1.0, 1.0, 1.0);\n        \n        /* Menghapus isi canvas */\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        \n        /* function untuk membuat shader */\n        function createShader(source, type, typeString) {\n            /* Membuat shader berdasarkan tipe yang diinginkan */\n            var shader = gl.createShader(type);\n            /* Mengisi shader dengan source-nya */\n            gl.shader'
                                    + 'Source(shader, source);\n            /* Meng-compile shader untuk memperoleh shader yang dapat digunakan */\n            gl.compileShader(shader);\n            /* Apabila compile gagal, notifikasikan informasi penyebab gagal */\n            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n                /* Notifikasi penyebab kegagalan */\n                alert("Terdapat kesalahan pada " + typeString + ": " + gl.getShaderInfoLog(shader));\n                /* Function harus selesai dengan hasil false yang menandakan gagal */\n                return false;\n            }\n            /* Apabila tidak ada kesalahan hasil function adalah shader yang telah dibuat */\n            return shader;\n        }\n        \n        /* Mengambil source dari fragment shader dari html ke variabel Javascript */\n        var fragmentShaderSource = document.getElementById(\'fragment-shader\').textContent;\n        /* '
                                    + 'Membuat shader dari fragment source */\n        var fragmentShader = createShader(fragmentShaderSource, gl.FRAGMENT_SHADER, "fragment");\n        \n        /* Mengambil source dari vertex shader dari html ke variabel Javascript */\n        var vertexShaderSource = document.getElementById(\'vertex-shader\').textContent;\n        /* Membuat shader dari vertex source */\n        var vertexShader = createShader(vertexShaderSource, gl.VERTEX_SHADER, "vertex");\n        \n        /* Membuat shader program dari shader-shader yang ada */\n        var shaderProgram = gl.createProgram();\n        gl.attachShader(shaderProgram, fragmentShader);\n        gl.attachShader(shaderProgram, vertexShader);\n        /* Gunakan shaderProgram sebagai program utama */\n        gl.linkProgram(shaderProgram);\n        /* Apabila terjadi kesalahan pada program, notifikasi error */\n        if (!gl.getProgramParameter(shaderProgram, gl'
                                    + '.LINK_STATUS)) {\n            alert(\'Shader program tidak dapat diaktifkan: \' + gl.getProgramInfoLog(shaderProgram));\n        }\n        \n        /* Menggambil variabel dari shader dan mengaktifkan mode array dari attribute vertex tersebut */\n        var positionAttribute = gl.getAttribLocation(shaderProgram, "position");\n        gl.enableVertexAttribArray(positionAttribute);\n        \n        /* WebGL akan menggunakan shaderProgram yang sudah di-link sebelumnya */\n        gl.useProgram(shaderProgram);\n        \n        /**\n         * Posisi dari segitiga dimulai dari kanan-atas, kanan-bawah, dan\n         * kiri-bawah. Perlu diketahui bahwa titik (0,0) berada di tengah\n         * canvas. Nilai x dan y maksimum adalah 1.\n         */\n        var triangleVertexes = [\n            1, 1,\n            1, -1,\n            -1, -1\n        ];\n        \n        /* Membuat buffer */\n        var triangleVe'
                                    + 'rtexBuffer = gl.createBuffer();\n        /* Buffer yang digunakan WebGL adalah buffer yang dibuat sebelumnya */\n        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n        /* Memasukkan data ke buffer yang sedang digunakan WebGL, dalam bentuk yang benar */\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertexes), gl.STATIC_DRAW);\n        \n        \n        /* Urutan vertex yang digunakan ketika menggambar segitiga */\n        var triangleIndices = [\n            0, 1, 2\n        ];\n        \n        /* Membuat buffer untuk indices */\n        var triangleIndexBuffer = gl.createBuffer();\n        /* Ganti buffer WebGL menjadi buffer indices */\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n        /* Masukkan data ke dalam buffer indices */\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangleIndices), gl.STATIC_DRAW);\n        \n       '
                                    +' /* Function untuk menggambar */\n        function draw() {\n            /* Pasang ukuran canvas sebagai kotak gambar untuk WebGL */\n            gl.viewport(0.0, 0.0, canvas.width, canvas.height);\n            /* Hapus semua warna yang ada di kotak gambar */\n            gl.clear(gl.COLOR_BUFFER_BIT);\n            \n            /* Siapkan WebGL untuk mengutamakan vertex buffer */\n            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBuffer);\n            /**\n             * Penjelasan setiap parameter:\n             * 1. attribute yang akan diakses\n             * 2. position adalah vec2 sehingga kita ubah hanya 2 elemen\n             * 3. tipe data dari position adalah float\n             * 4. kita tidak menggunakan normalisasi jadi kita gunakan false\n             * 5. ukuran dari satu vertex dalam byte (float = 4byte)\n             * 6. posisi langsung dimulai dari element pertama jadi kita buat 0\n             */\n            gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);\n            \n            /* Gunakan index buffer sebelum menggambar */\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndexBuffer);\n            /**\n             * Menggambar segitiga dengan buffer yang aktif. Keterangan parameter:\n             * 1. Kita gunakan TRIANGLES sebagai bidang primitive\n             * 2. Jumlah index yang kita gunakan ada 3 untuk 3 vertex\n             * 3. Tipe data index yang kita gunakan adalah SHORT (UINT16)\n             * 4. Index kita langsung dimulai dari element pertama jadi offset kita 0\n             */\n            gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);\n            \n            /* Bersihkan WebGL supaya hemat memori */\n            gl.flush();\n        }\n        \n        /* Panggil function draw() untuk menggambar */\n        draw();\n    }\n}',
                                    name: 'main.js'
                                })
                                .end(function (err, res) {
                                    expect(res).to.have.status(200)
                                    done()
                                })
                            })
                        })
                    })
                }
                else {
                    expect(res).to.have.status(200)
                    done()
                }
            })
        })
    })

    describe('populate lesson relations', function () {
        it('should create lesson 1 relations', function (done) {
            agent
            .put('/lessons/1/cpds')
            .send([{"rules":[],"probability":0.7}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 2 relations', function (done) {
            agent
            .put('/lessons/2/cpds')
            .send([{"rules":[],"probability":0.7}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 3 relations', function (done) {
            agent
            .put('/lessons/3/cpds')
            .send([{"rules":[{"lesson":{"id":2},"state":true}],"probability":0.7}, {"rules":[{"lesson":{"id":2},"state":false}],"probability": 0.5}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 4 relations', function (done) {
            agent
            .put('/lessons/4/cpds')
            .send([{"rules":[{"lesson":{"id":3,"order":3,"title":"HTML Tag","description":"HTML terdiri dari *tag*. Kita akan mempelajari bagaimana HTML dapat dibuat dengan menggunakan *tag*-*tag* berikut ini.","createdAt":"2016-06-29T09:39:01.000Z","updatedAt":"2016-07-07T07:33:31.000Z","ChapterId":1,"cpd":[{"rules":[{"lesson":{"id":2,"order":2,"title":"HTML Sederhana","description":"Kita akan membuat sebuah *file* HTML sederhana.","createdAt":"2016-06-29T09:37:26.000Z","updatedAt":"2016-07-04T09:53:05.000Z","ChapterId":1,"cpd":null},"state":true}],"probability":0.7,"negProbability":0.30000000000000004},{"rules":[{"lesson":{"id":2,"order":2,"title":"HTML Sederhana","description":"Kita akan membuat sebuah *file* HTML sederhana.","createdAt":"2016-06-29T09:37:26.000Z","updatedAt":"2016-07-04T09:53:05.000Z","ChapterId":1,"cpd":null},"state":false}],"probability":"0.5","negProbability":0.5}]},"state":true}],"probability":0.7},{"rules":[{"lesson":{"id":3,"order":3,"title":"HTML Tag","description":"HTML terdiri dari *tag*. Kita akan mempelajari bagaimana HTML dapat dibuat dengan menggunakan *tag*-*tag* berikut ini.","createdAt":"2016-06-29T09:39:01.000Z","updatedAt":"2016-07-07T07:33:31.000Z","ChapterId":1,"cpd":[{"rules":[{"lesson":{"id":2,"order":2,"title":"HTML Sederhana","description":"Kita akan membuat sebuah *file* HTML sederhana.","createdAt":"2016-06-29T09:37:26.000Z","updatedAt":"2016-07-04T09:53:05.000Z","ChapterId":1,"cpd":null},"state":true}],"probability":0.7,"negProbability":0.30000000000000004},{"rules":[{"lesson":{"id":2,"order":2,"title":"HTML Sederhana","description":"Kita akan membuat sebuah *file* HTML sederhana.","createdAt":"2016-06-29T09:37:26.000Z","updatedAt":"2016-07-04T09:53:05.000Z","ChapterId":1,"cpd":null},"state":false}],"probability":"0.5","negProbability":0.5}]},"state":false}],"probability":"0.5"}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 5 relations', function (done) {
            agent
            .put('/lessons/5/cpds')
            .send([{"rules":[{"lesson":{"id":3},"state":true},{"lesson":{"id":4},"state":true}],"probability":0.7},{"rules":[{"lesson":{"id":3},"state":true},{"lesson":{"id":4},"state":false}],"probability":0.5},{"rules":[{"lesson":{"id":3},"state":false},{"lesson":{"id":4},"state":true}],"probability":0.3},{"rules":[{"lesson":{"id":3},"state":false},{"lesson":{"id":4},"state":false}],"probability":0.1}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 6 relations', function (done) {
            agent
            .put('/lessons/6/cpds')
            .send([{"rules":[{"lesson":{"id":5},"state":true}],"probability":0.7}, {"rules":[{"lesson":{"id":5},"state":false}],"probability": 0.5}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 7 relations', function (done) {
            agent
            .put('/lessons/7/cpds')
            .send([{"rules":[{"lesson":{"id":6},"state":true}],"probability":0.7}, {"rules":[{"lesson":{"id":6},"state":false}],"probability": 0.5}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 8 relations', function (done) {
            agent
            .put('/lessons/8/cpds')
            .send([{"rules":[],"probability":0.7}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 9 relations', function (done) {
            agent
            .put('/lessons/9/cpds')
            .send([{"rules":[{"lesson":{"id":4},"state":true},{"lesson":{"id":7},"state":true}],"probability":0.7},{"rules":[{"lesson":{"id":4},"state":true},{"lesson":{"id":7},"state":false}],"probability":0.3},{"rules":[{"lesson":{"id":4},"state":false},{"lesson":{"id":7},"state":true}],"probability":0.6},{"rules":[{"lesson":{"id":4},"state":false},{"lesson":{"id":7},"state":false}],"probability":0.1}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
        it('should create lesson 10 relations', function (done) {
            agent
            .put('/lessons/10/cpds')
            .send([{"rules":[{"lesson":{"id":9},"state":true}],"probability":0.7}, {"rules":[{"lesson":{"id":9},"state":false}],"probability": 0.5}])
            .end(function (err, res) {
                expect(res).to.have.status(200)
                done()
            })
        })
    })
    // describe('populate sources', function () {
    //     it('should create step 1')
    // })
})
