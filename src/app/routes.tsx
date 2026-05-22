import { createBrowserRouter, Navigate } from "react-router";
import { Login } from './components/Login';
import { NotFound } from './components/NotFound';
import ForgotPassword from "./components/ForgotPassword";
import { ResetPassword } from './ResetPassword';

// Layouts
import { AdminLayout } from './components/admin/AdminLayout';
import { SiswaLayout } from './components/layouts/SiswaLayout';
import { GuruLayout } from './components/layouts/GuruLayout';

// Admin Pages
import { Dashboard } from './components/admin/Dashboard';
import { DataTraining } from './components/admin/DataTraining';
import { DataSiswa } from './components/admin/DataSiswa';
import { HasilRekomendasi as HasilRekomendasiAdmin } from './components/admin/HasilRekomendasi';
import { KontrolUser } from './components/admin/KontrolUser';

// Siswa Pages
import { SiswaDashboard } from './components/siswa/SiswaDashboard';
import { ProfilSiswa } from './components/siswa/ProfilSiswa';
import { HasilRekomendasi } from './components/siswa/HasilRekomendasi';

// Guru Pages
import { GuruDashboard } from './components/guru/GuruDashboard';
import { DataSiswaGuru } from './components/guru/DataSiswaGuru';


// Shared Pages
import { SistemRekomendasiJurusan } from './components/shared/SistemRekomendasiJurusan';

export const router = createBrowserRouter([
  {
    path: '/',
    // Component: Root udah dihapus dari sini, jadi langsung ke children-nya
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: 'login', Component: Login },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'reset-password/:token', Component: ResetPassword },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/siswa',
    Component: SiswaLayout,
    children: [
      { index: true, Component: SiswaDashboard },
      { path: 'dashboard', Component: SiswaDashboard },
      { path: 'rekomendasi-jurusan', Component: SistemRekomendasiJurusan },
      { path: 'riwayat', Component: HasilRekomendasi },
      { path: 'profil', Component: ProfilSiswa },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/guru',
    Component: GuruLayout,
    children: [
      { index: true, Component: GuruDashboard },
      { path: 'dashboard', Component: GuruDashboard },
      { path: 'data-siswa', Component: DataSiswaGuru },
      { path: 'rekomendasi-jurusan', Component: SistemRekomendasiJurusan },
      { path: 'laporan', Component: NotFound }, // TODO: Create later
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'dashboard', Component: Dashboard },
      { path: 'data-training', Component: DataTraining },
      { path: 'data-siswa', Component: DataSiswa },
      { path: 'rekomendasi-jurusan', Component: SistemRekomendasiJurusan },
      { path: 'hasil-rekomendasi', Component: HasilRekomendasiAdmin },
      { path: 'KontrolUser', Component: KontrolUser }, // TODO: Create later
      { path: '*', Component: NotFound },
    ],
  },
]);