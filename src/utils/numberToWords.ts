export function numberToWords(num: number): string {
  if (num === 0) return 'Zero ETB and  zero Cents .';

  const units = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  function convertInteger(n: number): string {
    if (n === 0) return '';
    if (n < 20) return units[n];
    if (n < 100) {
      const rem = n % 10;
      return tens[Math.floor(n / 10)] + (rem ? ' ' + units[rem] : '');
    }
    if (n < 1000) {
      const rem = n % 100;
      return units[Math.floor(n / 100)] + ' Hundred' + (rem ? ' ' + convertInteger(rem) : '');
    }
    if (n < 1000000) {
      const rem = n % 1000;
      return convertInteger(Math.floor(n / 1000)) + ' Thousand' + (rem ? ' ' + convertInteger(rem) : '');
    }
    if (n < 1000000000) {
      const rem = n % 1000000;
      return convertInteger(Math.floor(n / 1000000)) + ' Million' + (rem ? ' ' + convertInteger(rem) : '');
    }
    return n.toString();
  }

  const integerPart = Math.floor(num);
  const cents = Math.round((num - integerPart) * 100);

  const integerWords = convertInteger(integerPart) || 'Zero';
  const centsWords = cents === 0 ? 'zero' : convertInteger(cents).toLowerCase();

  return `${integerWords} ETB and  ${centsWords} Cents .`;
}
