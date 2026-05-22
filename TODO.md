# TODO Fix Error 500 /api/profile/4

## Status: 🚀 Sedang dikerjakan oleh BLACKBOXAI

### Plan Detail:
1. **✅ Buat TODO.md** - Tracking progress (Sekarang)
2. **⏳ Fix backend/createUser.js** - Ubah `user.nama` → `user.name` di query
3. **⏳ Fix backend/routes/profile.js** - Ganti semua SQL `name` → `nama`
4. **⏳ Buat user ID 4** - Jalankan SQL INSERT user siswa
5. **⏳ Test endpoint** - Cek `/api/profile/4` return 200
6. **⏳ Restart backend** - `cd backend && node index.js`
7. **⏳ Test frontend** - Login siswa → ProfilSiswa tanpa error

### Commands untuk User:
```
# Windows CMD
cd backend & node createUser.js
cd backend & node index.js

# Test endpoint manual
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/profile/4
```


- [✅] Step 2: createUser.js fixed
- [ ] Step 3: profile.js fixed
- [ ] Step 4: User ID 4 created
