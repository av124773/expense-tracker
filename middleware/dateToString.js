function DateToString(date) {
  // getMonth() 是從 0 開始計算的所以要 +1
  const mm = (date.getMonth() + 1).toString()
  const dd = date.getDate().toString()
  return [
    date.getFullYear(), '-',              // year
    mm.length === 2 ? '' : '0', mm, '-',  // month
    dd.length === 2 ? '' : '0', dd        // date
  ].join('')
}

module.exports = DateToString()