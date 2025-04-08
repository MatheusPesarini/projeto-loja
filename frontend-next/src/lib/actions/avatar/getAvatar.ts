'use server'

export async function getAvatarAction() {
  const result = await fetch(`https://avatar.vercel.sh/${}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  }
}