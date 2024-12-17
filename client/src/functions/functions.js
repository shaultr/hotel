import jsPDF from 'jspdf';

export function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMillis = end - start;
    const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    return differenceInDays;
  }
  

export function print(customerName, numBeds, startDate, endDate, payment_amount, numDays, onNavigate) {
    const doc = new jsPDF();
    doc.text('Welcome ' + customerName, 10, 10);
    doc.text('____________________', 10, 20);
    doc.text('Booking details:', 10, 30);
    doc.text('- Room with ' + numBeds + ' beds', 10, 40);
    doc.text('- Dates: ' + startDate + ' to ' + endDate, 10, 50);
    doc.text('- Total days: ' + numDays, 10, 60);
    doc.text('________', 10, 70);
    doc.text('Total payable: ', 10, 90);
    doc.text(payment_amount, 10, 100);

    doc.save('your_booking.pdf');

    if (onNavigate) {
        onNavigate();
    }
}
