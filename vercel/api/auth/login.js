// vercel/api/auth/login.js
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Config Supabase (variables de entorno)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { legajo, password } = req.body;

  // Validación básica
  if (!legajo || !password) {
    return res.status(400).json({ error: 'Legajo y contraseña son requeridos' });
  }

  try {
    // Buscar usuario en Supabase por legajo
    const { data: usuario, error } = await supabase
      .from('usuarios_app')
      .select('id, legajo, rol, password_hash, bombero: bombero_id (id, legajo, nombre, apellido, jerarquia, cuartel)')
      .eq('legajo', legajo)
      .eq('activo', true)
      .single();

    if (error || !usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, usuario.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Preparar respuesta (sin password_hash)
    const userData = {
      id: usuario.id,
      legajo: usuario.legajo,
      rol: usuario.rol,
      bombero: usuario.bombero
    };

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}