import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Camera,
  Save,
  Lock,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  Eye,      // 🔥 Tambah import ini
  EyeOff    // 🔥 Tambah import ini
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { toast } from "sonner";
import { profileAPI } from "../../../services/api";
import { API_SERVER_URL } from '../../../config';

interface ProfileFormData {
  nama: string;
  email: string;
  nis: string;
  kelas: string;
  telepon: string;
  alamat: string;
  tanggal_lahir: string;
  tempat_lahir: string;
}

interface PasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export function ProfilSiswa() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // 🔥 State untuk Show/Hide Password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    nama: "",
    email: "",
    nis: "",
    kelas: "",
    telepon: "",
    alamat: "",
    tanggal_lahir: "",
    tempat_lahir: "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Load profile data on mount
  useEffect(() => {
    loadProfileData();
  }, [user?.id]);

  const loadProfileData = async () => {
    if (!user?.id) return;

    try {
      const data = await profileAPI.getProfile(user.id);
      setProfileForm({
        nama: data.nama || "",
        email: data.email || "",
        nis: data.nis || "",
        kelas: data.kelas || "",
        telepon: data.telepon || "",
        alamat: data.alamat || "",
        tanggal_lahir: data.tanggal_lahir || "",
        tempat_lahir: data.tempat_lahir || "",
      });
      setPreviewPhoto(
        data.foto ? API_SERVER_URL + data.foto : null
      );
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Gagal memuat data profil");
    }
  };

  const handleProfileChange = (
    field: keyof ProfileFormData,
    value: string,
  ) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (
    field: keyof PasswordFormData,
    value: string,
  ) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewPhoto(preview);

    setUploadingPhoto(true);
    try {
      const photoUrl = await profileAPI.uploadPhoto(user!.id, file);

      toast.success("Foto profil berhasil diupload");
      setPreviewPhoto(photoUrl);

      if (user) {
        login({ ...user, foto: photoUrl });
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal upload foto");
      setPreviewPhoto(user?.foto || null);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user?.id) return;

    if (!confirm("Apakah Anda yakin ingin menghapus foto profil?")) return;

    try {
      await profileAPI.removePhoto(user.id);
      setPreviewPhoto(null);
      toast.success("Foto profil berhasil dihapus");

      if (user) {
        login({ ...user, foto: undefined });
      }
    } catch (error) {
      console.error("Error removing photo:", error);
      toast.error("Gagal menghapus foto profil");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    if (!profileForm.nama.trim()) {
      toast.error("Nama harus diisi");
      return;
    }
    if (!profileForm.email.trim()) {
      toast.error("Email harus diisi");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      toast.error("Format email tidak valid");
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await profileAPI.updateProfile(
        user.id,
        profileForm,
      );

      login(updatedUser);
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Gagal memperbarui profil");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) return;

    if (!passwordForm.current_password) {
      toast.error("Password lama harus diisi");
      return;
    }
    if (!passwordForm.new_password) {
      toast.error("Password baru harus diisi");
      return;
    }
    if (passwordForm.new_password.length < 6) {
      toast.error("Password baru minimal 6 karakter");
      return;
    }
    if (
      passwordForm.new_password !==
      passwordForm.confirm_password
    ) {
      toast.error("Password baru tidak cocok");
      return;
    }

    setLoading(true);
    try {
      await profileAPI.changePassword(user.id, {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      });

      toast.success("Password berhasil diubah");

      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      if (error.message === "Password lama tidak sesuai") {
        toast.error("Password lama tidak sesuai");
      } else {
        toast.error("Gagal mengubah password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Profil Saya
        </h1>
        <p className="text-gray-500 mt-1">
          Kelola informasi profil dan keamanan akun Anda
        </p>
      </div>

      {/* Photo Section */}
      <Card>
        <CardHeader>
          <CardTitle>Foto Profil</CardTitle>
          <CardDescription>
            Upload foto profil Anda (maksimal 2MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-16 h-16 text-gray-400" />
                )}
              </div>
              {previewPhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg transition-colors"
                  title="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={uploadingPhoto}
              />
              <label htmlFor="photo-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploadingPhoto}
                  onClick={() =>
                    document
                      .getElementById("photo-upload")
                      ?.click()
                  }
                  className="cursor-pointer"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {uploadingPhoto
                    ? "Mengupload..."
                    : "Pilih Foto"}
                </Button>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Format: JPG, PNG, atau GIF. Ukuran maksimal 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">
            <UserIcon className="w-4 h-4 mr-2" />
            Informasi Profil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="w-4 h-4 mr-2" />
            Keamanan
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>
                Update informasi pribadi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Lengkap */}
                  <div className="space-y-2">
                    <Label htmlFor="nama">
                      <UserIcon className="w-4 h-4 inline mr-2" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="nama"
                      value={profileForm.nama}
                      onChange={(e) =>
                        handleProfileChange(
                          "nama",
                          e.target.value,
                        )
                      }
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        handleProfileChange(
                          "email",
                          e.target.value,
                        )
                      }
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  {/* NIS */}
                  <div className="space-y-2">
                    <Label htmlFor="nis">NIS</Label>
                    <Input
                      id="nis"
                      value={profileForm.nis}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">
                      NIS tidak dapat diubah
                    </p>
                  </div>

                  {/* Kelas (🔥 DIUBAH JADI DROPDOWN DROPDOWN) */}
                  <div className="space-y-2">
                    <Label htmlFor="kelas">Kelas</Label>
                    <select
                      id="kelas"
                      value={profileForm.kelas}
                      onChange={(e) =>
                        handleProfileChange("kelas", e.target.value)
                      }
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">-- Pilih Kelas --</option>
                      <option value="X-A">X-A</option>
                      <option value="X-B">X-B</option>
                      <option value="X-C">X-C</option>
                      <option value="X-D">X-D</option>
                      <option value="X-E">X-E</option>
                      <option value="X-F">X-F</option>
                      <option value="X-G">X-G</option>
                    </select>
                  </div>

                  {/* Telepon */}
                  <div className="space-y-2">
                    <Label htmlFor="telepon">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Nomor Telepon
                    </Label>
                    <Input
                      id="telepon"
                      type="tel"
                      value={profileForm.telepon}
                      onChange={(e) =>
                        handleProfileChange(
                          "telepon",
                          e.target.value,
                        )
                      }
                      placeholder="08123456789"
                    />
                  </div>

                  {/* Tempat Lahir */}
                  <div className="space-y-2">
                    <Label htmlFor="tempat_lahir">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Tempat Lahir
                    </Label>
                    <Input
                      id="tempat_lahir"
                      value={profileForm.tempat_lahir}
                      onChange={(e) =>
                        handleProfileChange(
                          "tempat_lahir",
                          e.target.value,
                        )
                      }
                      placeholder="Kota/Kabupaten"
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div className="space-y-2">
                    <Label htmlFor="tanggal_lahir">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Tanggal Lahir
                    </Label>
                    <Input
                      id="tanggal_lahir"
                      type="date"
                      value={profileForm.tanggal_lahir}
                      onChange={(e) =>
                        handleProfileChange(
                          "tanggal_lahir",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                {/* Alamat */}
                <div className="space-y-2">
                  <Label htmlFor="alamat">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Alamat Lengkap
                  </Label>
                  <Textarea
                    id="alamat"
                    value={profileForm.alamat}
                    onChange={(e) =>
                      handleProfileChange(
                        "alamat",
                        e.target.value,
                      )
                    }
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>
                Ketikkan password lama untuk memverifikasi identitas Anda, lalu buat password baru.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleChangePassword}
                className="space-y-6"
              >
                {/* Current Password - 🔥 DENGAN SHOW/HIDE */}
                <div className="space-y-2 relative">
                  <Label htmlFor="current_password">Password Saat Ini (Lama)</Label>
                  <div className="relative">
                    <Input
                      id="current_password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.current_password}
                      onChange={(e) =>
                        handlePasswordChange("current_password", e.target.value)
                      }
                      placeholder="Ketik password Anda saat ini..."
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                {/* New Password - 🔥 DENGAN SHOW/HIDE */}
                <div className="space-y-2">
                  <Label htmlFor="new_password">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="new_password"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.new_password}
                      onChange={(e) =>
                        handlePasswordChange("new_password", e.target.value)
                      }
                      placeholder="Masukkan password baru"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Minimal 6 karakter</p>
                </div>

                {/* Confirm Password - 🔥 DENGAN SHOW/HIDE */}
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirm_password}
                      onChange={(e) =>
                        handlePasswordChange("confirm_password", e.target.value)
                      }
                      placeholder="Ulangi password baru"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    <Lock className="w-4 h-4 mr-2" />
                    {loading ? "Mengubah..." : "Ubah Password"}
                  </Button>
                </div>
              </form>

              {/* Security Tips */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Tips Keamanan Password:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol</li>
                  <li>• Minimal 8 karakter untuk keamanan lebih baik</li>
                  <li>• Jangan gunakan informasi pribadi yang mudah ditebak</li>
                  <li>• Ubah password secara berkala</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}