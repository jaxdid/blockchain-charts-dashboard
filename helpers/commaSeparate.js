export default function commaSeparate (numberString) {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
