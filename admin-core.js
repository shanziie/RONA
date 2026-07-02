// RONA Admin Suite Core Javascript
// Stores database logic, sidebar generation, custom modal logic, and toast notifications.

(function() {
    // 1. CORE DATABASE SEED
    const defaultProducts = [
        {
            sku: "RONA-SPIN-01",
            name: "Fidget Spinner Terapi Sensorik",
            category: "Fokus & Motorik",
            price: 145000,
            stock: 12,
            active: true,
            rating: 4.8,
            image: "images/spinner.png",
            description: "Fidget spinner kayu dirancang khusus untuk meningkatkan konsentrasi anak-anak dengan kecenderungan ADHD dan meredakan ketegangan motorik halus.",
            benefits: "Membantu menstabilkan fokus, menyalurkan energi motorik berlebih, meredakan kecemasan.",
            instructions: "Pegang di bagian tengah dan putar perlahan menggunakan jari tangan kanan atau kiri. Gunakan selama 5-10 menit saat anak mulai terlihat gelisah.",
            ageRecommendation: "3 Tahun ke atas",
            weight: 120
        },
        {
            sku: "RONA-BLKT-02",
            name: "Rona Sensory Calming Blanket",
            category: "Tidur & Tenang",
            price: 249000,
            stock: 4, // Critical stock warning trigger (< 5)
            active: true,
            rating: 4.9,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-V7nyw6dbIxfy_dwf1EKvYNHkVxTXD0g0mWXRO1Mvv7W8Xgq11WMYegmKPVm9_79acj_C48SB3P_kqwZ8X0sWvXDTnKS2cqpXpwDDyqiPX_Ad-G8zo3Svow1wApEWUeVu5cAgYhtHbZhp-2VMrhUMuUOF3mGazNk6vfgXonUNX9NmPvKxcuSha2P31avNTTR6iVMPTDOZFisCBv1l9jQi_dWuJM8gS8IxpGttcdB84tTjR5i0mQqPIPLk56Sxty6IIyxMBDmTSkL",
            description: "Selimut pemberat yang memberikan tekanan sensorik mendalam (Deep Pressure Therapy) untuk menenangkan sistem saraf yang terlalu aktif di malam hari.",
            benefits: "Meningkatkan produksi hormon penenang, menstabilkan pernapasan, meredakan Sensory Overload.",
            instructions: "Selimuti seluruh tubuh anak dari pundak hingga kaki saat bersiap tidur atau saat anak mengalami tantrum akibat overload auditori/visual.",
            ageRecommendation: "5-12 Tahun",
            weight: 3200
        },
        {
            sku: "RONA-POPB-03",
            name: "Fidget Pop-It Board Premium",
            category: "Taktil & Kunyah",
            price: 45000,
            stock: 35,
            active: true,
            rating: 4.6,
            image: "images/popit.png",
            description: "Papan silikon pop-it dengan feedback taktil lembut. Cocok digunakan di sekolah atau selama perjalanan untuk menjaga stabilitas emosi anak.",
            benefits: "Menstimulasi sensor taktil pada ujung jari, mengalihkan kebiasaan merusak barang saat tantrum.",
            instructions: "Tekan gelembung secara berurutan. Setelah semua tertekan, balikkan papan untuk mulai menekan kembali dari sisi sebaliknya.",
            ageRecommendation: "2 Tahun ke atas",
            weight: 80
        },
        {
            sku: "RONA-SNDM-04",
            name: "CalmBounds Sound Machine White Noise",
            category: "Tidur & Tenang",
            price: 320000,
            stock: 8,
            active: true,
            rating: 4.7,
            image: "images/sound.jpg",
            description: "Mesin terapi audio portable dengan pilihan white noise, suara hujan, dan detak jantung ibu untuk membantu anak rileks sebelum tidur.",
            benefits: "Menyamarkan kebisingan luar yang mengganggu sensitivitas auditori anak sensory-avoidance.",
            instructions: "Letakkan dalam jarak 1-2 meter dari ranjang anak. Nyalakan mode white noise atau suara alam dengan volume sedang 30 menit sebelum jam tidur.",
            ageRecommendation: "Semua Umur",
            weight: 450
        },
        {
            sku: "RONA-BRSH-05",
            name: "Sensory Therapy Brush (Wilbarger)",
            category: "Taktil & Kunyah",
            price: 65000,
            stock: 2, // Critical Stock
            active: true,
            rating: 4.5,
            image: "images/brush.jpg",
            description: "Sikat terapi sensori khusus untuk metode Wilbarger Deep Pressure. Bulu sikat lembut namun kokoh untuk menstimulasi sensor taktil kulit.",
            benefits: "Membantu mengatasi defensivitas taktil (anak sensitif terhadap sentuhan pakaian/tekstur tertentu).",
            instructions: "Gunakan sikat dengan tekanan konstan sepanjang lengan, punggung, dan kaki anak secara berulang. Hindari bagian wajah dan dada.",
            ageRecommendation: "1 Tahun ke atas",
            weight: 90
        },
        {
            sku: "RONA-VIBR-06",
            name: "Oral Motor Vibrating Chew Tool",
            category: "Taktil & Kunyah",
            price: 120000,
            stock: 14,
            active: true,
            rating: 4.7,
            image: "images/chew.png",
            description: "Alat pengunyah terapi oral dengan getaran mikro untuk merangsang reseptor sensori mulut anak.",
            benefits: "Menyediakan input propioseptif oral, mengurangi kebiasaan menggigit kuku atau pakaian.",
            instructions: "Masukkan ujung silikon lembut ke dalam mulut anak dan biarkan anak mengunyah secara perlahan saat belajar.",
            ageRecommendation: "3 Tahun ke atas",
            weight: 110
        },
        {
            sku: "RONA-BALL-07",
            name: "Weighted Sensory Ball",
            category: "Tidur & Tenang",
            price: 85000,
            stock: 3, // Critical Stock
            active: true,
            rating: 4.6,
            image: "images/ball.png",
            description: "Bola pemberat taktil berisi butiran khusus untuk meredakan ketegangan motorik halus anak.",
            benefits: "Menenangkan sistem saraf yang hiperaktif melalui terapi tekanan taktil.",
            instructions: "Squeeze atau genggam bola secara konstan saat anak merasa cemas atau bosan.",
            ageRecommendation: "2 Tahun ke atas",
            weight: 500
        },
        {
            sku: "RONA-SWNG-08",
            name: "Sensory Therapy Hammock Swing",
            category: "Tidur & Tenang",
            price: 380000,
            stock: 7,
            active: true,
            rating: 4.9,
            image: "images/swing.png",
            description: "Ayunan gantung terapi sensori dalam ruangan berbahan elastis tinggi.",
            benefits: "Menyediakan stimulus vestibular mendalam untuk menenangkan anak ADHD.",
            instructions: "Gantungkan ayunan pada plafon atau palang yang kuat. Biarkan anak duduk atau berbaring di dalamnya.",
            ageRecommendation: "4-15 Tahun",
            weight: 1200
        },
        {
            sku: "RONA-RING-09",
            name: "Taktil Sensory Rings Set",
            category: "Taktil & Kunyah",
            price: 30000,
            stock: 45,
            active: true,
            rating: 4.4,
            image: "images/rings.png",
            description: "Cincin jari taktil bertekstur bergerigi mikro untuk mengalihkan kecemasan motorik.",
            benefits: "Meningkatkan sirkulasi motorik halus dan atensi visual.",
            instructions: "Gulung cincin naik turun pada jari anak selama proses terapi belajar.",
            ageRecommendation: "3 Tahun ke atas",
            weight: 20
        },
        {
            sku: "RONA-SAND-10",
            name: "Therapeutic Kinetic Play Sand Set",
            category: "Taktil & Kunyah",
            price: 95000,
            stock: 19,
            active: true,
            rating: 4.8,
            image: "images/sand.png",
            description: "Pasir kinetik terapeutik dengan wadah cetakan khusus terapi taktil sensorik anak.",
            benefits: "Melatih motorik halus dan imajinasi visual anak autis/ADHD.",
            instructions: "Biarkan anak membentuk pasir kinetik menggunakan tangan atau cetakan di atas wadah.",
            ageRecommendation: "2 Tahun ke atas",
            weight: 1000
        }
    ];

    const defaultArticles = [
        {
            id: "ART-01",
            thumbnail: "images/art_stimulation.jpg",
            title: "Pentingnya Stimulasi Sensorik pada Balita",
            author: "dr. Shima Maharani, Sp.A",
            date: "28 Juni 2026",
            category: "Sensory",
            status: "Publish",
            views: 1245,
            summary: "Materi stimulasi sensori bagi balita dengan diagnosa kecenderungan perilaku hiperaktif.",
            content: "Stimulasi sensorik adalah proses penting untuk balita dalam mengenali dan memproses informasi dari lingkungan sekitarnya. Bagi anak dengan ADHD, stimulasi yang tepat dapat meredakan kecemasan dan membantu pemusatan fokus belajar.",
            tags: "Sensory, ADHD, Terapi"
        },
        {
            id: "ART-02",
            thumbnail: "images/art_focus.png",
            title: "Meningkatkan Fokus Anak dengan Terapi Bermain",
            author: "dr. Shima Maharani, Sp.A",
            date: "29 Juni 2026",
            category: "Focus",
            status: "Publish",
            views: 890,
            summary: "Metode bermain terapeutik yang efektif untuk memperpanjang rentang fokus anak ADHD.",
            content: "Terapi bermain (play therapy) bukan sekadar bermain biasa. Aktivitas terstruktur dengan mainan sensori tertentu dapat mengaktifkan sirkuit otak depan yang bertugas mengelola konsentrasi dan atensi anak.",
            tags: "Focus, PlayTherapy, Atensi"
        },
        {
            id: "ART-03",
            thumbnail: "images/art_tantrum.png",
            title: "Strategi Menenangkan Anak yang Mengalami Tantrum",
            author: "Nabila Fitria, M.Psi",
            date: "30 Juni 2026",
            category: "Calming",
            status: "Publish",
            views: 2450,
            summary: "Langkah empatik bagi orang tua dalam meredakan tantrum akibat sensory overload.",
            content: "Saat anak mengalami overload sensori karena kebisingan atau keramaian, respon pertamanya sering kali berupa ledakan emosi atau tantrum. Mengisolasi anak ke ruang tenang dengan selimut pemberat atau mainan pemutar taktil dapat memicu penurunan hormon kortisol secara efektif.",
            tags: "Calming, Parenting, Tantrum"
        },
        {
            id: "ART-04",
            thumbnail: "images/art_sensory.jpg",
            title: "Sensory-Avoidance vs Sensory-Seeking pada ADHD",
            author: "dr. Shima Maharani, Sp.A",
            date: "27 Juni 2026",
            category: "Sensory",
            status: "Publish",
            views: 1332,
            summary: "Membedakan perilaku menghindar dan mencari rangsangan sensorik pada anak berkebutuhan khusus.",
            content: "Anak dengan sensory-avoidance cenderung menutup telinga atau mata saat berada di lingkungan yang ramai. Sebaliknya, anak dengan sensory-seeking akan terus-menerus mencari rangsangan sentuhan atau gerakan.",
            tags: "Sensory, ADHD, Terapi"
        },
        {
            id: "ART-05",
            thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
            title: "Nutrisi dan Diet Tepat untuk Mendukung Fokus Anak",
            author: "dr. Zulfikar Sp.GK",
            date: "25 Juni 2026",
            category: "Focus",
            status: "Publish",
            views: 955,
            summary: "Bagaimana makanan bergizi seimbang membantu regulasi emosi anak dengan ADHD.",
            content: "Diet rendah gula dan kaya omega-3 sangat direkomendasikan oleh ahli klinis untuk mendukung kestabilan gelombang otak frontal anak.",
            tags: "Diet, Nutrisi, Fokus"
        },
        {
            id: "ART-06",
            thumbnail: "images/art_motoric.jpg",
            title: "Aktivitas Motorik Kasar di Rumah untuk Anak Hiperaktif",
            author: "Nabila Fitria, M.Psi",
            date: "24 Juni 2026",
            category: "Sensory",
            status: "Draft",
            views: 24,
            summary: "Latihan fisik sederhana dalam rumah untuk membantu anak menyalurkan energinya.",
            content: "Melompat di atas trampolin mini atau merayap di bawah meja dapat memberikan input proprioseptif yang menstabilkan emosi anak.",
            tags: "Hiperaktif, LatihanFisik"
        },
        {
            id: "ART-07",
            thumbnail: "images/art_toys.png",
            title: "Cara Memilih Mainan Sensorik Berdasarkan Usia",
            author: "Rian Hidayat, S.Tr.T",
            date: "22 Juni 2026",
            category: "Sensory",
            status: "Publish",
            views: 412,
            summary: "Tips praktis memilih mainan terapeutik taktil untuk rentang umur 2 hingga 12 tahun.",
            content: "Mainan harus disesuaikan dengan kekuatan motorik halus anak. Balita lebih membutuhkan papan pop-it, sedangkan anak sekolah butuh cincin taktil.",
            tags: "Parenting, MainanSensorik"
        },
        {
            id: "ART-08",
            thumbnail: "images/art_speech.png",
            title: "Kolaborasi Terapis Wicara dengan Orang Tua",
            author: "dr. Shima Maharani, Sp.A",
            date: "20 Juni 2026",
            category: "Focus",
            status: "Publish",
            views: 624,
            summary: "Pentingnya kesinambungan latihan wicara di klinik dan rumah untuk anak ADHD.",
            content: "Terapi di klinik hanya berjalan 1-2 jam per minggu. Sisanya, peran orang tua di rumah yang sangat menentukan kesuksesan latihan komunikasi anak.",
            tags: "TerapiWicara, Parenting"
        }
    ];

    const defaultUsers = [
        {
            id: "USR-01",
            parentName: "Andy Suryawijaya",
            email: "andy.surabaya@mhs.unair.ac.id",
            role: "Parent",
            status: "Active",
            joinDate: "12 Januari 2026",
            transactionCount: 3,
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150",
            phone: "081234567890",
            location: "Surabaya",
            job: "Arsitek",
            childName: "Leo",
            childAge: "6 Tahun",
            childCondition: "Suspect ADHD Kombinasi, Sensory Avoidance (Auditori), Butuh Regulasi Emosi Berkala",
            lastActivity: "1 Juli 2026, 18:00",
            transactionHistory: ["TX-9734", "TX-7024", "TX-6102"]
        },
        {
            id: "USR-02",
            parentName: "Sarah",
            email: "parent@gmail.com",
            role: "Parent",
            status: "Active",
            joinDate: "14 Februari 2026",
            transactionCount: 1,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
            phone: "081234567891",
            location: "Jakarta",
            job: "Ibu Rumah Tangga",
            childName: "Rara",
            childAge: "4 Tahun",
            childCondition: "Sensory Seeking (Taktil), Butuh Regulasi Emosi Berkala",
            lastActivity: "30 Juni 2026, 21:00",
            transactionHistory: ["TX-5512"]
        },
        {
            id: "USR-03",
            parentName: "dr. Shima Maharani, Sp.A",
            email: "shima@rona.id",
            role: "Therapist",
            status: "Active",
            joinDate: "01 Januari 2026",
            transactionCount: 0,
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150",
            phone: "08119023456",
            location: "Jakarta",
            job: "Dokter Spesialis Anak",
            childName: "-",
            childAge: "-",
            childCondition: "-",
            lastActivity: "1 Juli 2026, 17:30",
            transactionHistory: []
        },
        {
            id: "USR-04",
            parentName: "Budi Santoso",
            email: "budi@gmail.com",
            role: "Parent",
            status: "Inactive",
            joinDate: "10 Maret 2026",
            transactionCount: 1,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150",
            phone: "081399887766",
            location: "Semarang",
            job: "Wirausaha",
            childName: "Dafa",
            childAge: "8 Tahun",
            childCondition: "Diagnosa ASD Ringan, Suka Melakukan Gerakan Berulang",
            lastActivity: "15 Juni 2026, 10:15",
            transactionHistory: ["TX-1299"]
        },
        {
            id: "USR-05",
            parentName: "Citra Kirana",
            email: "citra@gmail.com",
            role: "Parent",
            status: "Active",
            joinDate: "20 Maret 2026",
            transactionCount: 2,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150",
            phone: "085299448822",
            location: "Bandung",
            job: "Ibu Rumah Tangga",
            childName: "Arka",
            childAge: "5 Tahun",
            childCondition: "Diagnosa Sensory Seeking (Oral & Vestibular)",
            lastActivity: "1 Juli 2026, 14:00",
            transactionHistory: ["TX-2301", "TX-8890"]
        },
        {
            id: "USR-06",
            parentName: "David Beckham",
            email: "david@gmail.com",
            role: "Parent",
            status: "Active",
            joinDate: "28 April 2026",
            transactionCount: 1,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
            phone: "089877665544",
            location: "Jakarta",
            job: "Pebisnis",
            childName: "Cruz",
            childAge: "7 Tahun",
            childCondition: "ASD Ringan, defisit motorik kasar",
            lastActivity: "29 Juni 2026, 11:30",
            transactionHistory: ["TX-4412"]
        },
        {
            id: "USR-07",
            parentName: "Eka Wijaya",
            email: "eka@gmail.com",
            role: "Parent",
            status: "Active",
            joinDate: "05 Mei 2026",
            transactionCount: 3,
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150",
            phone: "081299881122",
            location: "Yogyakarta",
            job: "Dosen",
            childName: "Gita",
            childAge: "6 Tahun",
            childCondition: "Kecemasan Motorik Halus, Suspect ADHD",
            lastActivity: "1 Juli 2026, 16:30",
            transactionHistory: ["TX-7711", "TX-9023", "TX-6102"]
        },
        {
            id: "USR-08",
            parentName: "Fitri Astuti",
            email: "fitri@gmail.com",
            role: "Parent",
            status: "Active",
            joinDate: "18 Mei 2026",
            transactionCount: 0,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150",
            phone: "081344556677",
            location: "Surabaya",
            job: "Pegawai Swasta",
            childName: "Bimo",
            childAge: "3 Tahun",
            childCondition: "Speech Delay Ringan",
            lastActivity: "1 Juli 2026, 10:00",
            transactionHistory: []
        }
    ];

    const defaultTransactions = [
        {
            id: "TX-9734",
            date: "29 Juni 2026",
            customerName: "Andy Suryawijaya",
            customerPhone: "081234567890",
            address: "Jl. Dharmahusada No. 12, Gubeng, Kota Surabaya, Jawa Timur 60285",
            total: 264000,
            status: "Refund Diproses",
            resi: "JNT38498302",
            courier: "J&T Express",
            items: [{ name: "Rona Sensory Calming Blanket", price: 249000, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-V7nyw6dbIxfy_dwf1EKvYNHkVxTXD0g0mWXRO1Mvv7W8Xgq11WMYegmKPVm9_79acj_C48SB3P_kqwZ8X0sWvXDTnKS2cqpXpwDDyqiPX_Ad-G8zo3Svow1wApEWUeVu5cAgYhtHbZhp-2VMrhUMuUOF3mGazNk6vfgXonUNX9NmPvKxcuSha2P31avNTTR6iVMPTDOZFisCBv1l9jQi_dWuJM8gS8IxpGttcdB84tTjR5i0mQqPIPLk56Sxty6IIyxMBDmTSkL" }],
            file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C4AAAAASUVORK5CYII=",
            refundReason: "Ukuran selimut yang dikirim tidak sesuai dengan berat badan anak saya, terlalu berat.",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "29 Juni 2026, 10:00", note: "Pesanan dibuat oleh pelanggan." },
                { status: "Diproses", time: "29 Juni 2026, 10:30", note: "Pembayaran otomatis berhasil diverifikasi." },
                { status: "Dikirim", time: "29 Juni 2026, 14:00", note: "Nomor resi kurir diinput oleh sistem." },
                { status: "Diterima", time: "30 Juni 2026, 09:00", note: "Konfirmasi penerimaan kurir." },
                { status: "Refund Diproses", time: "30 Juni 2026, 11:00", note: "Pelanggan mengajukan refund dengan alasan kesesuaian berat selimut." }
            ],
            chatHistory: [
                { sender: "customer", text: "Halo min, ini blanketnya kok berat sekali ya? Boleh ditukar atau refund?", time: "29 Juni 2026, 10:55", status: "read" },
                { sender: "admin", text: "Halo Kak Andy, silakan ajukan refund di sistem dengan menyertakan alasannya ya. Nanti tim kami akan proses.", time: "29 Juni 2026, 11:02", status: "read" },
                { sender: "customer", text: "Baik min, sudah saya ajukan refund. Mohon dibantu approval-nya ya.", time: "30 Juni 2026, 11:05", status: "unread" }
            ]
        },
        {
            id: "TX-7024",
            date: "28 Juni 2026",
            customerName: "Andy Suryawijaya",
            customerPhone: "081234567890",
            address: "Jl. Dharmahusada No. 12, Gubeng, Kota Surabaya, Jawa Timur 60285",
            total: 762000,
            status: "Selesai",
            resi: "JNT77893452",
            courier: "J&T Express",
            items: [
                { name: "Fidget Spinner Terapi Sensorik", price: 145000, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-4ShPNQvrQSzt78m-oAC5BVdJweA1ggsl_OPavMk2FzcvUo6RN77YO5dLYFJbKJXobJHACHTiuVTM2KRCpBw6FVN2xUUeOWwCqc8r8PEwbqtiQtIFUsyow9zckf3uv5LNqkDJ69BJUNiYA5jCqm0yS6prIWJDy9UpG8lQgSznkeCxTlnxvbuXc7gMAGrO4jgIaO1uJAd-J8Uf23i70SaQixs5Bf9omxTAhRUSkTql9IbjX-6K1-Q5mz1r9FrpeeuXSfcegNvqut7" },
                { name: "CalmBounds Sound Machine White Noise", price: 320000, qty: 1, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=400&q=80" }
            ],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "28 Juni 2026, 15:00", note: "Order manual diinput." },
                { status: "Diproses", time: "28 Juni 2026, 15:10", note: "Konfirmasi pembayaran sukses." },
                { status: "Dikirim", time: "28 Juni 2026, 17:00", note: "Paket dijemput kurir." },
                { status: "Selesai", time: "29 Juni 2026, 13:00", note: "Pelanggan menandai pesanan selesai." }
            ],
            chatHistory: []
        },
        {
            id: "TX-5512",
            date: "1 Juli 2026",
            customerName: "Sarah",
            customerPhone: "081234567891",
            address: "Jl. Melati No. 45, Cluster Lavender, Jakarta Barat, DKI Jakarta 11470",
            total: 190000,
            status: "Diproses",
            resi: "-",
            courier: "JNE REG",
            items: [{ name: "Fidget Spinner Terapi Sensorik", price: 145000, qty: 1, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ-4ShPNQvrQSzt78m-oAC5BVdJweA1ggsl_OPavMk2FzcvUo6RN77YO5dLYFJbKJXobJHACHTiuVTM2KRCpBw6FVN2xUUeOWwCqc8r8PEwbqtiQtIFUsyow9zckf3uv5LNqkDJ69BJUNiYA5jCqm0yS6prIWJDy9UpG8lQgSznkeCxTlnxvbuXc7gMAGrO4jgIaO1uJAd-J8Uf23i70SaQixs5Bf9omxTAhRUSkTql9IbjX-6K1-Q5mz1r9FrpeeuXSfcegNvqut7" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "1 Juli 2026, 09:00", note: "Dibuat via checkout katalog." },
                { status: "Diproses", time: "1 Juli 2026, 09:12", note: "Pembayaran terkonfirmasi." }
            ],
            chatHistory: [
                { sender: "customer", text: "Selamat pagi admin, pesanan saya apakah bisa langsung diproses kirim hari ini?", time: "1 Juli 2026, 09:30", status: "unread" }
            ]
        },
        {
            id: "TX-1299",
            date: "30 Juni 2026",
            customerName: "Budi Santoso",
            customerPhone: "081399887766",
            address: "Jl. Pemuda No. 100, Semarang, Jawa Tengah",
            total: 385000,
            status: "Menunggu Pembayaran",
            resi: "-",
            courier: "J&T Express",
            items: [{ name: "CalmBounds Sound Machine White Noise", price: 320000, qty: 1, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=400&q=80" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "30 Juni 2026, 22:00", note: "Checkout manual." }
            ],
            chatHistory: []
        },
        {
            id: "TX-2301",
            date: "1 Juli 2026",
            customerName: "Citra Kirana",
            customerPhone: "085299448822",
            address: "Jl. Riau No. 88, Sumur Bandung, Kota Bandung, Jawa Barat 40111",
            total: 135000,
            status: "Dikemas",
            resi: "-",
            courier: "JNE YES",
            items: [{ name: "Oral Motor Vibrating Chew Tool", price: 120000, qty: 1, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=100" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "1 Juli 2026, 12:00", note: "Order dibuat via aplikasi mobile." },
                { status: "Diproses", time: "1 Juli 2026, 12:10", note: "Verifikasi pembayaran otomatis berhasil." },
                { status: "Dikemas", time: "1 Juli 2026, 13:00", note: "Pesanan masuk antrean pengemasan logistik RONA." }
            ],
            chatHistory: [
                { sender: "customer", text: "Min, tolong dibungkus kado ya untuk ulang tahun anak saya, makasih.", time: "1 Juli 2026, 13:10", status: "unread" }
            ]
        },
        {
            id: "TX-8890",
            date: "30 Juni 2026",
            customerName: "Citra Kirana",
            customerPhone: "085299448822",
            address: "Jl. Riau No. 88, Sumur Bandung, Kota Bandung, Jawa Barat 40111",
            total: 110000,
            status: "Dikirim",
            resi: "JNE8893902345",
            courier: "JNE REG",
            items: [{ name: "Therapeutic Kinetic Play Sand Set", price: 95000, qty: 1, image: "images/sand.png" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "30 Juni 2026, 14:00", note: "Checkout." },
                { status: "Diproses", time: "30 Juni 2026, 14:15", note: "Pembayaran terkonfirmasi." },
                { status: "Dikemas", time: "30 Juni 2026, 16:00", note: "Pesanan dikemas rapi." },
                { status: "Dikirim", time: "30 Juni 2026, 18:00", note: "Paket dijemput kurir JNE." }
            ],
            chatHistory: []
        },
        {
            id: "TX-4412",
            date: "29 Juni 2026",
            customerName: "David Beckham",
            customerPhone: "089877665544",
            address: "Kebayoran Baru, Jakarta Selatan, DKI Jakarta",
            total: 395000,
            status: "Diterima",
            resi: "JNT99008811",
            courier: "J&T Express",
            items: [{ name: "Sensory Therapy Hammock Swing", price: 380000, qty: 1, image: "images/swing.png" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Menunggu Pembayaran", time: "29 Juni 2026, 08:00", note: "Checkout manual." },
                { status: "Diproses", time: "29 Juni 2026, 08:15", note: "Pembayaran sukses." },
                { status: "Dikirim", time: "29 Juni 2026, 10:00", note: "Diserahkan ke logistik J&T." },
                { status: "Diterima", time: "30 Juni 2026, 14:00", note: "Diterima di alamat tujuan." }
            ],
            chatHistory: []
        },
        {
            id: "TX-7711",
            date: "28 Juni 2026",
            customerName: "Eka Wijaya",
            customerPhone: "081299881122",
            address: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
            total: 185000,
            status: "Refund Disetujui",
            resi: "JNT77881122",
            courier: "J&T Express",
            items: [
                { name: "Weighted Sensory Ball", price: 85000, qty: 1, image: "images/ball.png" },
                { name: "Taktil Sensory Rings Set", price: 30000, qty: 2, image: "images/rings.png" }
            ],
            file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C4AAAAASUVORK5CYII=",
            refundReason: "Cincin jari taktil robek saat pertama kali dibuka dari kemasan.",
            rejectReason: "",
            statusHistory: [
                { status: "Diproses", time: "28 Juni 2026, 09:00", note: "Pembayaran sukses." },
                { status: "Diterima", time: "28 Juni 2026, 16:00", note: "Diterima pelanggan." },
                { status: "Refund Diproses", time: "28 Juni 2026, 17:00", note: "Pelanggan mengajukan retur produk rusak." },
                { status: "Refund Disetujui", time: "29 Juni 2026, 10:00", note: "Admin menyetujui refund setelah verifikasi foto nota." }
            ],
            chatHistory: [
                { sender: "customer", text: "Min, cincin taktilnya robek satu. Mohon bantuannya.", time: "28 Juni 2026, 16:30", status: "read" },
                { sender: "admin", text: "Mohon maaf kak atas ketidaknyamanannya. Silakan ajukan tombol refund ya kak, biar kami ganti.", time: "28 Juni 2026, 16:45", status: "read" }
            ]
        },
        {
            id: "TX-9023",
            date: "27 Juni 2026",
            customerName: "Eka Wijaya",
            customerPhone: "081299881122",
            address: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
            total: 100000,
            status: "Refund Ditolak",
            resi: "JNT77221199",
            courier: "J&T Express",
            items: [{ name: "Weighted Sensory Ball", price: 85000, qty: 1, image: "images/ball.png" }],
            file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C4AAAAASUVORK5CYII=",
            refundReason: "Ingin ditukar dengan produk lain karena anak bosan.",
            rejectReason: "Refund hanya berlaku untuk produk cacat produksi atau salah kirim. Produk yang sudah sesuai deskripsi and digunakan tidak bisa direfund hanya karena anak bosan.",
            statusHistory: [
                { status: "Diterima", time: "27 Juni 2026, 12:00", note: "Konfirmasi penerimaan kurir." },
                { status: "Refund Diproses", time: "27 Juni 2026, 14:00", note: "Pelanggan mengajukan refund dengan alasan anak bosan." },
                { status: "Refund Ditolak", time: "27 Juni 2026, 15:30", note: "Admin menolak karena syarat refund tidak terpenuhi." }
            ],
            chatHistory: []
        },
        {
            id: "TX-6102",
            date: "1 Juli 2026",
            customerName: "Eka Wijaya",
            customerPhone: "081299881122",
            address: "Jl. Kaliurang KM 5, Sleman, Yogyakarta",
            total: 160000,
            status: "Selesai",
            resi: "JNT77883344",
            courier: "J&T Express",
            items: [{ name: "Fidget Spinner Terapi Sensorik", price: 145000, qty: 1, image: "images/spinner.png" }],
            file: "",
            refundReason: "",
            rejectReason: "",
            statusHistory: [
                { status: "Diproses", time: "1 Juli 2026, 10:00", note: "Pembayaran terverifikasi." },
                { status: "Dikirim", time: "1 Juli 2026, 11:30", note: "Nomor resi diinput." },
                { status: "Selesai", time: "1 Juli 2026, 16:30", note: "Konfirmasi pesanan diterima dan selesai." }
            ],
            chatHistory: []
        }
    ];

    const defaultActivities = [
        { type: "user_reg", text: "Pelanggan baru Andy Suryawijaya telah terdaftar.", time: "1 Juli 2026, 18:00" },
        { type: "order_in", text: "Pesanan masuk baru #TX-5512 dari Sarah.", time: "1 Juli 2026, 09:00" },
        { type: "refund_req", text: "Pengajuan refund diajukan untuk transaksi #TX-9734.", time: "30 Juni 2026, 11:00" },
        { type: "product_add", text: "Produk 'Sensory Therapy Brush' berhasil ditambahkan ke katalog.", time: "28 Juni 2026, 10:00" },
        { type: "user_reg", text: "Pelanggan baru Citra Kirana telah terdaftar.", time: "20 Maret 2026, 10:00" },
        { type: "order_in", text: "Pesanan masuk baru #TX-2301 dari Citra Kirana.", time: "1 Juli 2026, 12:00" }
    ];

    // Initialize LocalStorage database if keys do not exist or are outdated
    function initDatabase() {
        let db = JSON.parse(localStorage.getItem('rona_db')) || {};
        let updated = false;

        // Force upgrade database to version 1.9 to update final article cover images
        if (!db.version || db.version !== "1.9") {
            db.products = defaultProducts;
            db.articles = defaultArticles;
            db.users = defaultUsers;
            db.transactions = defaultTransactions;
            db.activities = defaultActivities;
            db.version = "1.9";
            updated = true;
        }

        if (updated) {
            localStorage.setItem('rona_db', JSON.stringify(db));
        }
    }

    // Call init immediately on include
    initDatabase();

    // 2. EXPOSED DB METHODS
    window.ronaDb = {
        get: function() {
            return JSON.parse(localStorage.getItem('rona_db')) || {};
        },
        save: function(db) {
            localStorage.setItem('rona_db', JSON.stringify(db));
        },
        addActivity: function(type, text) {
            const db = this.get();
            const time = new Date().toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            }) + ', ' + new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
            }) + ' WIB';
            
            db.activities = db.activities || [];
            db.activities.unshift({ type, text, time });
            // keep max 50 activities
            if (db.activities.length > 50) db.activities.pop();
            this.save(db);
        }
    };

    // 3. TOAST NOTIFICATION UTILITY
    window.ronaToast = {
        show: function(message, type = 'success') {
            let container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toastContainer';
                container.className = 'fixed top-6 right-6 z-[10000] flex flex-col gap-3 pointer-events-none';
                document.body.appendChild(container);
            }
            
            const toast = document.createElement('div');
            toast.className = `pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border transition-all duration-300 transform translate-x-12 opacity-0 font-semibold text-sm ${
                type === 'success' ? 'bg-[#ebefec] text-[#0d6a5c] border-[#0d6a5c]/20 shadow-[#0d6a5c]/5' :
                type === 'error' ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]/20 shadow-[#ba1a1a]/5' :
                type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200 shadow-blue-500/5' :
                'bg-orange-50 text-orange-800 border-orange-200 shadow-orange-500/5'
            }`;
            
            const icon = type === 'success' ? 'check_circle' :
                         type === 'error' ? 'error' :
                         type === 'info' ? 'info' : 'warning';
                         
            toast.innerHTML = `<span class="material-symbols-outlined text-[20px] shrink-0">${icon}</span> <span>${message}</span>`;
            container.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.remove('translate-x-12', 'opacity-0');
            }, 10);
            
            setTimeout(() => {
                toast.classList.add('translate-x-12', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };

    // 4. COMMON DYNAMIC SIDEBAR NAV GENERATOR
    window.ronaAdmin = {
        renderSidebar: function(activePageId) {
            const container = document.getElementById('sidebarContainer');
            if (!container) return;

            const menuItems = [
                { id: 'dashboard', name: 'Dashboard', icon: 'dashboard', url: 'dashboard.html' },
                { id: 'kelola-artikel', name: 'Kelola Artikel', icon: 'article', url: 'kelola-artikel.html' },
                { id: 'kelola-produk', name: 'Kelola Produk', icon: 'inventory_2', url: 'kelola-produk.html' },
                { id: 'kelola-user', name: 'Kelola Pengguna', icon: 'group', url: 'kelola-user.html' },
                { id: 'kelola-transaksi', name: 'Kelola Transaksi', icon: 'receipt_long', url: 'kelola-transaksi.html' }
            ];

            let sidebarHtml = `
                <div class="p-8 flex items-center gap-3">
                    <img alt="RONA Logo" class="h-10 w-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgIbGSRqH0qZyiuiq7hoVM0edbPazkiGScH5SQu4WqqTQoAzxBF4k2MxfZr2lOdz-BD3DZeoL4sim82ViCc-91D0g5X4D-zs9Qznw0ru8uYt5VV0xi3awAVeUziJVn1J6gkngp7PbIOVsKZccNPkHRPNZAfoTR1nJKUvZjtOkVTqOMvqHhLDojhHI9S41CsLP4p0AAiqxLp1EBwZ42xgBqIwIaE0Srqr5kjHHSWDFD3SGki6T1hzlw0W-tlrAAeZdqu82g4v88Q258"/>
                    <span class="text-2xl font-extrabold text-primary tracking-tight">RONA.</span>
                </div>
                
                <nav class="flex-grow px-4 space-y-2">
            `;

            menuItems.forEach(item => {
                const isActive = item.id === activePageId;
                const linkClass = isActive 
                    ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all shadow-sm'
                    : 'flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-primary font-semibold transition-all hover:translate-x-1';
                
                sidebarHtml += `
                    <a href="${item.url}" class="${linkClass}">
                        <span class="material-symbols-outlined">${item.icon}</span>
                        ${item.name}
                    </a>
                `;
            });

            sidebarHtml += `
                </nav>
                
                <div class="p-6 mt-auto border-t border-outline-variant/30">
                    <a href="index.html" class="flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-all hover:translate-x-1" onclick="handleAdminLogout(event)">
                        <span class="material-symbols-outlined text-red-600">logout</span>
                        Keluar
                    </a>
                </div>
            `;

            container.className = "w-full md:w-[280px] bg-white border-r border-outline-variant/30 flex flex-col shrink-0 sticky top-0 h-screen z-40";
            container.innerHTML = sidebarHtml;
        }
    };

    // 5. CUSTOM COMMON CLIENT NAVBAR GENERATOR
    window.ronaNav = {
        renderNavbar: function(activePageId) {
            const container = document.getElementById('navbarContainer');
            if (!container) return;

            const role = localStorage.getItem('rona_role') || 'guest';
            const db = ronaDb.get();
            const parentEmail = localStorage.getItem('rona_active_parent_email') || 'parent@gmail.com';
            const activeParent = db.users ? db.users.find(u => u.email === parentEmail) : null;
            const avatar = activeParent ? activeParent.avatar : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150";

            const activeClass = (id) => activePageId === id 
                ? 'text-[#c65f47] font-bold border-b-2 border-[#c65f47] pb-1' 
                : 'text-[#243130]/75 hover:text-[#c65f47] transition-colors font-semibold';
                
            const drawerActiveClass = (id) => activePageId === id 
                ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-[#c65f47]/10 text-[#c65f47] font-bold transition-all shadow-sm' 
                : 'flex items-center gap-3 px-4 py-3 rounded-xl text-[#243130]/80 hover:bg-[#243130]/5 hover:text-[#c65f47] font-semibold transition-all hover:translate-x-1';

            let desktopLinks = '';
            let drawerLinks = '';
            let rightActions = '';

            if (role === 'parent') {
                desktopLinks = `
                    <div class="hidden lg:flex gap-8 items-center">
                        <a class="text-sm ${activeClass('beranda')}" href="index.html">Beranda</a>
                        <a class="text-sm ${activeClass('artikel')}" href="artikel.html">Artikel</a>
                        <a class="text-sm ${activeClass('katalog')}" href="katalog.html">Katalog</a>
                        <a class="text-sm ${activeClass('perjalanan')}" href="history.html">Perjalanan</a>
                    </div>
                `;

                drawerLinks = `
                    <div class="px-2 py-2 space-y-1">
                        <a class="${drawerActiveClass('beranda')}" href="index.html">
                            <span class="material-symbols-outlined text-[20px]">home</span> Beranda
                        </a>
                        <a class="${drawerActiveClass('artikel')}" href="artikel.html">
                            <span class="material-symbols-outlined text-[20px]">menu_book</span> Artikel
                        </a>
                        <a class="${drawerActiveClass('katalog')}" href="katalog.html">
                            <span class="material-symbols-outlined text-[20px]">storefront</span> Katalog
                        </a>
                        <a class="${drawerActiveClass('perjalanan')}" href="history.html">
                            <span class="material-symbols-outlined text-[20px]">timeline</span> Perjalanan
                        </a>
                    </div>
                    <div class="mt-auto px-4 py-6 border-t border-[#243130]/10">
                        <button onclick="handleLogout()" class="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-red-200 text-red-600 text-sm font-bold rounded-2xl hover:bg-red-50 transition-colors">
                            <span class="material-symbols-outlined text-[18px]">logout</span> Keluar
                        </button>
                    </div>
                `;

                rightActions = `
                    <div class="flex items-center gap-3">
                        <!-- Notifikasi (Terracotta dot) -->
                        <div class="relative cursor-pointer dot-btn-orange" onclick="alert('Notifikasi: Rara menunjukkan kemajuan fokus +15% minggu ini!')" title="Notifikasi">
                            <span class="material-symbols-outlined text-white">notifications</span>
                            <span class="absolute -top-1 -right-1 bg-white text-[#c65f47] text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#c65f47]">1</span>
                        </div>
                        <!-- Keranjang (Sage green dot) -->
                        <div class="relative cursor-pointer dot-btn-sage" onclick="window.location.href='keranjang.html'" title="Keranjang">
                            <span class="material-symbols-outlined text-white">shopping_cart</span>
                            <span id="cartBadgeCount" class="absolute -top-1 -right-1 bg-white text-[#7da095] text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#7da095]">0</span>
                        </div>
                        <!-- Profil (Slate blue dot) -->
                        <a href="dashboard-parent.html?tab=profile" class="dot-btn-blue" title="Profil Rara & Bunda Sarah">
                            <span class="material-symbols-outlined text-white">person</span>
                        </a>
                        <!-- Logout -->
                        <button onclick="handleLogout()" class="hidden lg:inline-block text-xs font-bold text-[#243130]/75 hover:text-[#c65f47] px-3.5 py-1.5 rounded-full border border-[#243130]/30 hover:bg-[#c65f47]/10 transition-colors">Keluar</button>
                        
                        <!-- Hamburger Menu Button -->
                        <button id="ronaHamburger" onclick="ronaNav.toggleDrawer()" class="lg:hidden p-2 rounded-full hover:bg-[#243130]/10 transition-colors flex items-center" aria-label="Menu">
                            <span class="material-symbols-outlined text-[#243130] text-[26px]">menu</span>
                        </button>
                    </div>
                `;
            } else {
                desktopLinks = `
                    <div class="hidden lg:flex gap-8 items-center">
                        <a class="text-sm ${activeClass('beranda')}" href="index.html">Beranda</a>
                        <a class="text-sm ${activeClass('artikel')}" href="artikel.html">Artikel</a>
                        <a class="text-sm ${activeClass('katalog')}" href="katalog.html">Katalog</a>
                    </div>
                `;

                drawerLinks = `
                    <div class="px-2 py-2 space-y-1">
                        <a class="${drawerActiveClass('beranda')}" href="index.html">
                            <span class="material-symbols-outlined text-[20px]">home</span> Beranda
                        </a>
                        <a class="${drawerActiveClass('artikel')}" href="artikel.html">
                            <span class="material-symbols-outlined text-[20px]">menu_book</span> Artikel
                        </a>
                        <a class="${drawerActiveClass('katalog')}" href="katalog.html">
                            <span class="material-symbols-outlined text-[20px]">storefront</span> Katalog
                        </a>
                    </div>
                    <div class="mt-auto px-4 py-6 space-y-3 border-t border-[#243130]/10">
                        <a href="login.html" class="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#c65f47] text-[#c65f47] text-sm font-bold rounded-2xl hover:bg-[#c65f47]/5 transition-colors">
                            <span class="material-symbols-outlined text-[18px]">login</span> Masuk
                        </a>
                        <a href="register.html" class="flex items-center justify-center gap-2 w-full py-3.5 bg-[#c65f47] text-white text-sm font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg">
                            <span class="material-symbols-outlined text-[18px]">person_add</span> Daftar Gratis
                        </a>
                    </div>
                `;

                rightActions = `
                    <div class="flex items-center gap-2 lg:gap-4">
                        <!-- Desktop Auth Buttons -->
                        <div class="hidden lg:flex items-center gap-3">
                            <a href="login.html" class="text-sm font-bold text-[#243130]/75 hover:text-[#c65f47] px-4 py-2 transition-colors">Masuk</a>
                            <a href="register.html" class="text-sm font-bold text-white bg-[#c65f47] px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-transform">Daftar Gratis</a>
                        </div>
                        
                        <!-- Hamburger Menu Button -->
                        <button id="ronaHamburger" onclick="ronaNav.toggleDrawer()" class="lg:hidden p-2 rounded-xl hover:bg-[#243130]/10 transition-colors flex items-center" aria-label="Menu">
                            <span class="material-symbols-outlined text-[#243130] text-[26px]">menu</span>
                        </button>
                    </div>
                `;
            }

            // Full navbar HTML
            const navHtml = `
                <div class="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    <div class="flex items-center gap-2.5">
                        <img alt="RONA Logo" class="h-9 w-9 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgIbGSRqH0qZyiuiq7hoVM0edbPazkiGScH5SQu4WqqTQoAzxBF4k2MxfZr2lOdz-BD3DZeoL4sim82ViCc-91D0g5X4D-zs9Qznw0ru8uYt5VV0xi3awAVeUziJVn1J6gkngp7PbIOVsKZccNPkHRPNZAfoTR1nJKUvZjtOkVTqOMvqHhLDojhHI9S41CsLP4p0AAiqxLp1EBwZ42xgBqIwIaE0Srqr5kjHHSWDFD3SGki6T1hzlw0W-tlrAAeZdqu82g4v88Q258"/>
                        <a href="index.html" class="text-2xl font-bold font-vintage italic text-[#c65f47] tracking-wider">rona</a>
                    </div>
                    ${desktopLinks}
                    ${rightActions}
                </div>

                <!-- Mobile Drawer Overlay -->
                <div id="ronaDrawerOverlay" onclick="ronaNav.closeDrawer()" 
                     style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:9998; backdrop-filter:blur(3px);">
                </div>

                <!-- Mobile Drawer Panel -->
                <div id="ronaDrawerPanel"
                     style="display:none; position:fixed; top:0; right:0; bottom:0; width:min(320px, 88vw); background:#f6f0e5; z-index:9999; box-shadow:-8px 0 40px rgba(0,0,0,0.25); overflow-y:auto; flex-direction:column; border-radius:24px 0 0 24px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid rgba(36,49,48,0.1);">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <img alt="RONA" style="height:32px; width:32px; object-fit:contain;" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgIbGSRqH0qZyiuiq7hoVM0edbPazkiGScH5SQu4WqqTQoAzxBF4k2MxfZr2lOdz-BD3DZeoL4sim82ViCc-91D0g5X4D-zs9Qznw0ru8uYt5VV0xi3awAVeUziJVn1J6gkngp7PbIOVsKZccNPkHRPNZAfoTR1nJKUvZjtOkVTqOMvqHhLDojhHI9S41CsLP4p0AAiqxLp1EBwZ42xgBqIwIaE0Srqr5kjHHSWDFD3SGki6T1hzlw0W-tlrAAeZdqu82g4v88Q258"/>
                            <span class="font-vintage italic text-xl font-bold text-[#c65f47]">rona</span>
                        </div>
                        <button onclick="ronaNav.closeDrawer()" style="padding:8px; border-radius:12px; background:transparent; border:none; cursor:pointer;">
                            <span class="material-symbols-outlined" style="color:#243130;">close</span>
                        </button>
                    </div>
                    <div style="display:flex; flex-direction:column; flex:1; padding:8px 8px 24px; font-family:'Plus Jakarta Sans',sans-serif; font-size:14px;">
                        ${drawerLinks}
                    </div>
                </div>
            `;

            container.innerHTML = navHtml;
            container.className = "fixed top-0 w-full z-50 glass-nav shadow-sm border-b border-outline-variant/20";
            
            // Update cart badge
            if (role === 'parent') {
                const cart = JSON.parse(localStorage.getItem('rona_cart')) || [];
                const count = cart.reduce((sum, item) => sum + item.qty, 0);
                const badgeCount = document.getElementById('cartBadgeCount');
                if (badgeCount) badgeCount.innerText = count;
            }
        },

        toggleDrawer: function() {
            const overlay = document.getElementById('ronaDrawerOverlay');
            const panel = document.getElementById('ronaDrawerPanel');
            if (!overlay || !panel) return;
            const isOpen = overlay.style.display === 'block';
            if (isOpen) {
                this.closeDrawer();
            } else {
                overlay.style.display = 'block';
                panel.style.display = 'flex';
                panel.style.animation = 'ronaDrawerSlideIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards';
                document.body.style.overflow = 'hidden';
            }
        },

        closeDrawer: function() {
            const overlay = document.getElementById('ronaDrawerOverlay');
            const panel = document.getElementById('ronaDrawerPanel');
            if (!overlay || !panel) return;
            panel.style.animation = 'ronaDrawerSlideOut 0.25s ease forwards';
            setTimeout(() => {
                overlay.style.display = 'none';
                panel.style.display = 'none';
                document.body.style.overflow = '';
            }, 240);
        }
    };

    // Inject drawer animations + global responsive utilities into document head once
    if (!document.getElementById('ronaDrawerStyle')) {
        const s = document.createElement('style');
        s.id = 'ronaDrawerStyle';
        s.textContent = `
            @keyframes ronaDrawerSlideIn {
                from { transform: translateX(100%); opacity: 0.6; }
                to   { transform: translateX(0);    opacity: 1; }
            }
            @keyframes ronaDrawerSlideOut {
                from { transform: translateX(0);    opacity: 1; }
                to   { transform: translateX(100%); opacity: 0; }
            }
            /* Bottom-sheet modals on mobile */
            @media (max-width: 767px) {
                .modal-responsive .modal-content {
                    position: fixed !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    top: auto !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    border-radius: 24px 24px 0 0 !important;
                    max-height: 92vh !important;
                    overflow-y: auto !important;
                    animation: ronaSheetUp 0.35s cubic-bezier(0.34,1.56,0.64,1) !important;
                    margin: 0 !important;
                    transform: none !important;
                }
                @keyframes ronaSheetUp {
                    from { transform: translateY(100%) !important; }
                    to   { transform: translateY(0) !important; }
                }
            }
            /* Consistent image containers used across pages */
            .rona-img-product { aspect-ratio: 4/3; object-fit: cover; width:100%; }
            .rona-img-article { aspect-ratio: 16/9; object-fit: cover; width:100%; }
            /* Touch-friendly tap targets on mobile */
            @media (max-width: 767px) {
                a, button { min-height: 40px; }
            }
            /* Smooth scroll global */
            html { scroll-behavior: smooth; }
        `;
        document.head.appendChild(s);
    };

    window.handleLogout = function() {
        localStorage.setItem('rona_role', 'guest');
        localStorage.removeItem('rona_parent_logged_in');
        localStorage.removeItem('rona_active_parent_email');
        window.location.href = 'index.html';
    };

    window.handleAdminLogout = function(e) {
        e.preventDefault();
        localStorage.setItem('rona_role', 'guest');
        window.location.href = 'index.html';
    };

    // 6. ACCESS ACCESS GUARD
    function checkPageAccess() {
        if (!localStorage.getItem('rona_role')) {
            localStorage.setItem('rona_role', 'guest');
        }
        const role = localStorage.getItem('rona_role');
        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1);

        const parentPages = ['history.html', 'profil-anak.html', 'dashboard-parent.html', 'keranjang.html', 'pembayaran.html', 'sukses.html'];
        const adminPages = ['dashboard.html', 'kelola-artikel.html', 'kelola-produk.html', 'kelola-user.html', 'kelola-transaksi.html'];

        if (parentPages.includes(pageName) && role !== 'parent') {
            alert('Akses Ditolak. Silakan masuk sebagai orang tua terlebih dahulu.');
            window.location.href = 'login.html';
        } else if (adminPages.includes(pageName) && role !== 'admin') {
            alert('Akses Ditolak. Halaman ini khusus untuk administrator.');
            window.location.href = 'login.html';
        }
    }

    checkPageAccess();
})();
