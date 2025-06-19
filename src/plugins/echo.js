import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export function createEcho(token) {
    return new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: import.meta.env.VITE_PUSHER_APP_FORCE_TLS,
      authEndpoint:import.meta.env.VITE_PUSHER_APP_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: `Bearer ${token}` // seu token de autenticação
        }
      }
    });
}

