export function slugify(string) {
    return (
      string &&
      string
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map((x) => x.toLowerCase())
        .join('-')
    )
  }

  export function getFormattedDate(date) {
    console.log(date)
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
      return `${fullDate.getDay()} ${months[fullDate.getMonth()]} de ${fullDate.getFullYear('YYYY')}`
  }