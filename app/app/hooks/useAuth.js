'use client';

import { useEffect, useState } from 'react';
import API_URL from '@/app/config/api';

export default function useAuth() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        let uid = localStorage.getItem('fitUserId');
        if (!uid) {
          uid = 'user_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('fitUserId', uid);
        }

        const userName = localStorage.getItem('fitUserName') || 'FitTrack User';

        const res = await fetch(`${API_URL}/user/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: uid,
            name: userName
          })
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('fitToken', data.token);
          setToken(data.token);
          setUserId(uid);
          setUser(data.user);
        }
      } catch (err) {
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return { token, userId, user, loading };
}
