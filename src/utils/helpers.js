export function getFormattedDate(date) {  
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]
    let fullDate = new Date(date)
    return `${fullDate.getDate()} ${months[fullDate.getMonth()]} de ${fullDate.getFullYear('YYYY')}`
}