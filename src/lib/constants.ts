export const BUSINESS = {
  name: 'Denteez Panel Beating',
  tagline: 'Accidents happen, but damage doesn\u2019t have to last.',
  address: '1124 Malie Str, Booysens, Pretoria',
  phone: '072 745 9081',
  phoneIntl: '27727459081',
  email: 'antonie.denteez@gmail.com',
  owner: 'Antonie Botes',
  hours: [
    { day: 'Monday \u2013 Friday', time: '07:00 \u2013 17:00' },
    { day: 'Saturday', time: '08:00 \u2013 13:00' },
    { day: 'Sunday', time: 'Closed' },
  ],
  social: {
    hashtags: ['#Denteez', '#PanelBeating', '#AutoBodyRepair', '#DentRepair', '#CollisionRepair', '#CarCare', '#AutoBodyShop'],
  },
};

export const WHATSAPP_NUMBER = '27727459081';

export const TIME_SLOTS = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
];

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
