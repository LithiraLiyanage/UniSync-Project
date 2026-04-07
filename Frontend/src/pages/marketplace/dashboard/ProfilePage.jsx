import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import useAuth from '../../utils/useAuth';
import { Button, Input, Textarea, Card, Avatar } from '../../components/UI';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    university: user?.university || '',
    bio:       user?.bio || '',
  });
  const [pwd, setPwd] = useState({ current:'', newPwd:'', confirm:'' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPwd, setSavingPwd] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});
  const [pwdErrors, setPwdErrors] = useState({});

  const setF = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const setP = (k) => (e) => setPwd(p => ({ ...p, [k]: e.target.value }));

  const saveProfile = async () => {
    const e = {};
    if (!form.firstName || form.firstName.length < 2) e.firstName = 'Min 2 characters';
    if (!form.lastName  || form.lastName.length  < 2) e.lastName  = 'Min 2 characters';
    if (Object.keys(e).length) { setProfileErrors(e); return; }
    setProfileErrors({});
    setSavingProfile(true);
    try {
      const { data } = await api.put('/users/profile', {
        firstName: form.firstName, lastName: form.lastName,
        university: form.university, bio: form.bio,
      });
      updateUser(data);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async () => {
    const e = {};
    if (!pwd.current) e.current = 'Current password required';
    if (!pwd.newPwd || pwd.newPwd.length < 6) e.newPwd = 'New password min 6 chars';
    if (!pwd.confirm) e.confirm = 'Please confirm new password';
    else if (pwd.newPwd !== pwd.confirm) e.confirm = 'Passwords do not match';
    if (Object.keys(e).length) { setPwdErrors(e); return; }
    setPwdErrors({});
    setSavingPwd(true);
    try {
      await api.put('/users/password', { currentPassword: pwd.current, newPassword: pwd.newPwd });
      toast.success('Password changed!');
      setPwd({ current:'', newPwd:'', confirm:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPwd(false);
    }
  };

  const initials = ((form.firstName[0] || '') + (form.lastName[0] || '')).toUpperCase() || '?';

  return (
    <div className="animate-up" style={{ maxWidth:680 }}>
      <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:24, color:'var(--text2)', marginBottom:24 }}>
        My Profile
      </h1>

      {/* Avatar + info card */}
      <Card style={{ marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:24 }}>
          <Avatar initials={initials} size={72} style={{ borderRadius:20 }} />
          <div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, color:'var(--text2)' }}>
              {form.firstName} {form.lastName}
            </h2>
            <p style={{ color:'var(--muted)', fontSize:14, marginTop:4 }}>{user?.email}</p>
            {user?.university && (
              <p style={{ color:'var(--p)', fontSize:13, fontWeight:600, marginTop:4 }}>🎓 {user.university}</p>
            )}
            <div style={{ display:'flex', gap:16, marginTop:8 }}>
              <span style={{ fontSize:13, color:'var(--muted)' }}>
                ⭐ {user?.rating ? user.rating.toFixed(1) : '—'} rating
              </span>
              <span style={{ fontSize:13, color:'var(--muted)' }}>
                💰 ${user?.walletBalance?.toFixed(2)} balance
              </span>
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <Input id="firstName" label="First Name" value={form.firstName} onChange={setF('firstName')}
            error={profileErrors.firstName} required />
          <Input id="lastName" label="Last Name" value={form.lastName} onChange={setF('lastName')}
            error={profileErrors.lastName} required />
        </div>
        <Input id="university" label="University" placeholder="e.g. MIT, Stanford, Oxford"
          value={form.university} onChange={setF('university')} />
        <Textarea id="bio" label="Bio" placeholder="Tell others about yourself, your skills, and what you offer…"
          value={form.bio} onChange={setF('bio')} rows={3} />

        <Button onClick={saveProfile} loading={savingProfile}>
          Save Profile
        </Button>
      </Card>

      {/* Password change card */}
      <Card>
        <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:17, color:'var(--text2)', marginBottom:20 }}>
          Change Password
        </h3>
        <Input id="currentPwd" label="Current Password" type="password"
          value={pwd.current} onChange={setP('current')} error={pwdErrors.current} required />
        <Input id="newPwd" label="New Password" type="password" placeholder="Min. 6 characters"
          value={pwd.newPwd} onChange={setP('newPwd')} error={pwdErrors.newPwd} required />
        <Input id="confirmPwd" label="Confirm New Password" type="password"
          value={pwd.confirm} onChange={setP('confirm')} error={pwdErrors.confirm} required />

        <Button onClick={savePassword} loading={savingPwd}>
          Update Password
        </Button>
      </Card>

      {/* Account info */}
      <Card style={{ marginTop:20 }}>
        <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:17, color:'var(--text2)', marginBottom:16 }}>
          Account Information
        </h3>
        <div style={{ display:'grid', gap:12 }}>
          {[
            { label:'Email',        value: user?.email },
            { label:'Role',         value: user?.role === 'admin' ? '👑 Admin' : '🎓 Student' },
            { label:'Member since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month:'long', year:'numeric' }) : '—' },
          ].map(row => (
            <div key={row.label} style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 14px', background:'var(--card2)', borderRadius:12,
            }}>
              <span style={{ fontSize:13, color:'var(--muted)' }}>{row.label}</span>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
