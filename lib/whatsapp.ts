import { CartItem } from '@/store/cart.store';
import { formatCurrency } from '@/lib/currency';

export const WHATSAPP_NUMBER = '51929762890';

export function buildOrderWhatsAppUrl(items: CartItem[]) {
  const lines = items.map((item) => {
    const subtotal = item.product.price * item.quantity;
    return `• ${item.quantity}x ${item.product.name} (${item.product.presentation}) — ${formatCurrency(subtotal)}`;
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const message = [
    '¡Hola Naveguz! Quiero hacer el siguiente pedido:',
    '',
    ...lines,
    '',
    `*Total: ${formatCurrency(total)}*`,
    '',
    'Quedo atento(a) para coordinar el pago y la entrega. ¡Gracias!',
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
